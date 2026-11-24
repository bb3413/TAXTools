/**
 * Lightweight native parser for reading JPEG EXIF metadata tags.
 */
class ExifParser {
  /**
   * Extract title, artist, and caption EXIF tags from a JPEG ArrayBuffer.
   * @param {ArrayBuffer} buffer 
   * @returns {Object} Extracted metadata key-value pairs
   */
  static parse(buffer) {
    const dataView = new DataView(buffer);
    const result = { title: null, artist: null, caption: null };

    // Verify JPEG SOI marker (0xFFD8)
    if (dataView.getUint16(0) !== 0xFFD8) return result;

    let offset = 2;
    const length = dataView.byteLength;

    while (offset < length) {
      const marker = dataView.getUint16(offset);
      
      // EXIF APP1 Marker (0xFFE1)
      if (marker === 0xFFE1) {
        const segmentLength = dataView.getUint16(offset + 2);
        // Verify Exif\0\0 header
        if (dataView.getUint32(offset + 4) === 0x45786966 && dataView.getUint16(offset + 8) === 0x0000) {
          const tiffOffset = offset + 10;
          this._parseTiffHeader(dataView, tiffOffset, result);
          break;
        }
        offset += 2 + segmentLength;
      } else if ((marker & 0xFF00) === 0xFF00) {
        // Skip other markers
        if (marker === 0xFFDA) break; // Start of Scan, no more metadata header
        const segmentLength = dataView.getUint16(offset + 2);
        offset += 2 + segmentLength;
      } else {
        break;
      }
    }

    return result;
  }

  static _parseTiffHeader(dataView, tiffOffset, result) {
    const littleEndian = dataView.getUint16(tiffOffset) === 0x4949;
    const ifd0Offset = dataView.getUint32(tiffOffset + 4, littleEndian);
    const dirStart = tiffOffset + ifd0Offset;

    const entries = dataView.getUint16(dirStart, littleEndian);
    for (let i = 0; i < entries; i++) {
      const entryOffset = dirStart + 2 + (i * 12);
      const tag = dataView.getUint16(entryOffset, littleEndian);
      
      // Standard TIFF Tags: 0x010E (Caption), 0x013B (Artist), 0x9C9B / 0x0320 (Title)
      if (tag === 0x010E) {
        result.caption = this._getStringValue(dataView, tiffOffset, entryOffset, littleEndian);
      } else if (tag === 0x013B) {
        result.artist = this._getStringValue(dataView, tiffOffset, entryOffset, littleEndian);
      } else if (tag === 0x9C9B || tag === 0x0320) {
        result.title = this._getStringValue(dataView, tiffOffset, entryOffset, littleEndian);
      }
    }
  }

  static _getStringValue(dataView, tiffOffset, entryOffset, littleEndian) {
    const count = dataView.getUint32(entryOffset + 4, littleEndian);
    const valueOffset = dataView.getUint32(entryOffset + 8, littleEndian);
    const dataStart = count > 4 ? tiffOffset + valueOffset : entryOffset + 8;
    
    let str = '';
    for (let i = 0; i < count; i++) {
      const charCode = dataView.getUint8(dataStart + i);
      if (charCode === 0) break; // Null terminator
      str += String.fromCharCode(charCode);
    }
    return str.trim();
  }
}

/**
 * Handles image collection loading from a dynamic folder path and resolves metadata.
 */
class GalleryModel {
  constructor() {
    // Read folder parameter from URL query string (e.g., ?folder=vacation2026)
    const params = new URLSearchParams(window.location.search);
    this.folder = params.get('folder') || '';

    // Clean up trailing slash if user included one
    if (this.folder.endsWith('/')) {
      this.folder = this.folder.slice(0, -1);
    }

    // Set manifest path relative to the specified folder
    this.jsonPath = this.folder ? `${this.folder}/images.json` : 'images.json';
    this.items = [];
  }

  async load() {
    const response = await fetch(this.jsonPath);
    if (!response.ok) {
      throw new Error(`Failed to load manifest file: ${this.jsonPath}`);
    }
    const manifest = await response.json();

    // Process each image and resolve metadata
    this.items = await Promise.all(manifest.map(async (item) => {
      const fullImagePath = this.folder ? `${this.folder}/${item.filename}` : item.filename;
      const metadata = await this._extractMetadata(fullImagePath);
      
      return {
        filename: fullImagePath, // Store full relative path for loading
        displayName: item.filename,
        title: metadata.title || item.title || item.filename,
        artist: metadata.artist || item.artist || 'Unknown Artist',
        caption: metadata.caption || item.caption || ''
      };
    }));
  }

  async _extractMetadata(imagePath) {
    try {
      const res = await fetch(imagePath);
      const buffer = await res.arrayBuffer();
      return ExifParser.parse(buffer);
    } catch (err) {
      console.warn(`Could not parse EXIF data for ${imagePath}:`, err);
      return {};
    }
  }

  getItem(index) {
    return this.items[index];
  }

  get total() {
    return this.items.length;
  }
}

/**
 * Controller and UI Manager for the Gallery application.
 */
class JPEGGalleryApp {
  constructor() {
    this.model = new GalleryModel();
    this.currentIndex = 0;

    // Cache DOM Elements
    this.headerTitle = document.getElementById('header-title');
    this.headerArtist = document.getElementById('header-artist');
    this.thumbnailContainer = document.getElementById('thumbnail-container');
    this.mainImage = document.getElementById('main-image');
    this.captionBox = document.getElementById('image-caption-box');
    this.imageCaption = document.getElementById('image-caption');
    this.btnPrev = document.getElementById('btn-prev');
    this.btnNext = document.getElementById('btn-next');

    this._bindEvents();
  }

  async init() {
    try {
      await this.model.load();
      if (this.model.total > 0) {
        this._renderThumbnails();
        this.selectImage(0);
      } else {
        this.headerTitle.textContent = 'No images found in manifest.';
      }
    } catch (err) {
      console.error(err);
      this.headerTitle.textContent = 'Error loading gallery folder.';
    }
  }

  _bindEvents() {
    // Navigation Buttons
    this.btnPrev.addEventListener('click', () => this.previous());
    this.btnNext.addEventListener('click', () => this.next());

    // Keyboard Arrow Controls
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        this.previous();
      } else if (e.key === 'ArrowRight') {
        this.next();
      }
    });
  }

  _renderThumbnails() {
    this.thumbnailContainer.innerHTML = '';
    
    this.model.items.forEach((item, index) => {
      const thumbDiv = document.createElement('div');
      thumbDiv.className = 'thumb-item';
      thumbDiv.dataset.index = index;

      const img = document.createElement('img');
      img.src = item.filename;
      img.alt = item.title;
      img.loading = 'lazy';

      thumbDiv.appendChild(img);
      thumbDiv.addEventListener('click', () => this.selectImage(index));

      this.thumbnailContainer.appendChild(thumbDiv);
    });
  }

  selectImage(index) {
    if (index < 0 || index >= this.model.total) return;

    this.currentIndex = index;
    const item = this.model.getItem(index);

    // 1. Update Header
    this.headerTitle.textContent = item.title;
    this.headerArtist.textContent = item.artist ? `By ${item.artist}` : '';

    // 2. Update Main Display Image
    this.mainImage.src = item.filename;
    this.mainImage.alt = item.title;

    // 3. Update Caption Box
    if (item.caption) {
      this.imageCaption.textContent = item.caption;
      this.captionBox.classList.remove('hidden');
    } else {
      this.captionBox.classList.add('hidden');
    }

    // 4. Highlight Active Thumbnail & Auto-Scroll Sidebar
    const thumbnails = this.thumbnailContainer.querySelectorAll('.thumb-item');
    thumbnails.forEach((thumb, idx) => {
      if (idx === index) {
        thumb.classList.add('active');
        thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        thumb.classList.remove('active');
      }
    });
  }

  next() {
    const nextIdx = (this.currentIndex + 1) % this.model.total;
    this.selectImage(nextIdx);
  }

  previous() {
    const prevIdx = (this.currentIndex - 1 + this.model.total) % this.model.total;
    this.selectImage(prevIdx);
  }
}

// Instantiate and start application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const app = new JPEGGalleryApp();
  app.init();
});