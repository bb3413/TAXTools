/**
 * Class: ExifParser
 * Low-level binary parser for extracting EXIF metadata from JPEG ArrayBuffers.
 */
class ExifParser {
    static parse(arrayBuffer) {
        const dataView = new DataView(arrayBuffer);
        const metadata = {
            title: null,
            author: null,
            caption: null,
            camera: null,
            exposure: null,
            date: null
        };

        // Check JPEG Start of Image (SOI) marker (0xFFD8)
        if (dataView.getUint16(0) !== 0xFFD8) {
            return metadata;
        }

        let offset = 2;
        const length = dataView.byteLength;

        while (offset < length) {
            const marker = dataView.getUint16(offset);
            offset += 2;

            // APP1 Marker (0xFFE1) - EXIF Metadata Header
            if (marker === 0xFFE1) {
                offset += 2; // Skip APP1 length
                
                // Confirm 'Exif\0\0' header signature
                if (dataView.getUint32(offset) === 0x45786966 && dataView.getUint16(offset + 4) === 0x0000) {
                    const tiffOffset = offset + 6;
                    ExifParser.parseTiffHeader(dataView, tiffOffset, metadata);
                }
                break;
            } else if ((marker & 0xFF00) === 0xFF00) {
                offset += dataView.getUint16(offset);
            } else {
                break;
            }
        }

        return metadata;
    }

    static parseTiffHeader(view, tiffOffset, metadata) {
        const littleEndian = view.getUint16(tiffOffset) === 0x4949; // 'II' = Little Endian, 'MM' = Big Endian
        const firstIfdOffset = view.getUint32(tiffOffset + 4, littleEndian);

        if (firstIfdOffset) {
            ExifParser.parseIFD(view, tiffOffset + firstIfdOffset, tiffOffset, littleEndian, metadata);
        }
    }

    static parseIFD(view, ifdOffset, tiffOffset, littleEndian, metadata) {
        try {
            const entries = view.getUint16(ifdOffset, littleEndian);
            let currentOffset = ifdOffset + 2;
            let exifSubIfdOffset = null;
            let make = '', model = '', fnumber = '', iso = '';

            for (let i = 0; i < entries; i++) {
                const tag = view.getUint16(currentOffset, littleEndian);
                const numValues = view.getUint32(currentOffset + 4, littleEndian);
                const valueOffset = currentOffset + 8;

                switch (tag) {
                    case 0x010E: // ImageDescription Tag
                        metadata.caption = ExifParser.getString(view, valueOffset, numValues, tiffOffset, littleEndian);
                        if (!metadata.title) metadata.title = metadata.caption;
                        break;
                    case 0x013B: // Artist / Author Tag
                        metadata.author = ExifParser.getString(view, valueOffset, numValues, tiffOffset, littleEndian);
                        break;
                    case 0x010F: // Camera Make
                        make = ExifParser.getString(view, valueOffset, numValues, tiffOffset, littleEndian).trim();
                        break;
                    case 0x0110: // Camera Model
                        model = ExifParser.getString(view, valueOffset, numValues, tiffOffset, littleEndian).trim();
                        break;
                    case 0x9C9F: // Windows XP Title Tag
                        metadata.title = ExifParser.getUnicodeString(view, valueOffset, numValues, tiffOffset, littleEndian);
                        break;
                    case 0x9C9D: // Windows XP Author Tag
                        metadata.author = ExifParser.getUnicodeString(view, valueOffset, numValues, tiffOffset, littleEndian);
                        break;
                    case 0x8769: // Pointer to Exif SubIFD
                        exifSubIfdOffset = view.getUint32(valueOffset, littleEndian);
                        break;
                }
                currentOffset += 12;
            }

            if (make || model) {
                metadata.camera = `${make} ${model}`.trim();
            }

            // SubIFD Parsing for EXIF exposure & date tags
            if (exifSubIfdOffset) {
                const subIfdAddr = tiffOffset + exifSubIfdOffset;
                const subEntries = view.getUint16(subIfdAddr, littleEndian);
                let subOffset = subIfdAddr + 2;

                for (let j = 0; j < subEntries; j++) {
                    const tag = view.getUint16(subOffset, littleEndian);
                    const valueOffset = subOffset + 8;

                    if (tag === 0x9003 || tag === 0x9004) { // DateTimeOriginal
                        metadata.date = ExifParser.getString(view, valueOffset, 19, tiffOffset, littleEndian);
                    } else if (tag === 0x829D) { // F-Number / Aperture
                        const num = view.getUint32(tiffOffset + view.getUint32(valueOffset, littleEndian), littleEndian);
                        const den = view.getUint32(tiffOffset + view.getUint32(valueOffset, littleEndian) + 4, littleEndian);
                        if (den !== 0) fnumber = `f/${(num / den).toFixed(1)}`;
                    } else if (tag === 0x8827) { // ISO Speed Rating
                        iso = `ISO ${view.getUint16(valueOffset, littleEndian)}`;
                    }

                    subOffset += 12;
                }

                if (fnumber || iso) {
                    metadata.exposure = [fnumber, iso].filter(Boolean).join(' • ');
                }
            }
        } catch (err) {
            console.warn("EXIF Parsing encountered non-critical error:", err);
        }
    }

    static getString(view, valueOffset, length, tiffOffset, littleEndian) {
        const offset = length > 4 ? tiffOffset + view.getUint32(valueOffset, littleEndian) : valueOffset;
        let str = '';
        for (let i = 0; i < length; i++) {
            const charCode = view.getUint8(offset + i);
            if (charCode === 0) break;
            str += String.fromCharCode(charCode);
        }
        return str.trim();
    }

    static getUnicodeString(view, valueOffset, length, tiffOffset, littleEndian) {
        const offset = length > 4 ? tiffOffset + view.getUint32(valueOffset, littleEndian) : valueOffset;
        let str = '';
        for (let i = 0; i < length; i += 2) {
            const charCode = view.getUint16(offset + i, true);
            if (charCode === 0) break;
            str += String.fromCharCode(charCode);
        }
        return str.trim();
    }
}

/**
 * Class: GalleryModel
 * Encapsulates single image state, file source, and lazy EXIF parsing.
 */
class GalleryModel {
    constructor(id, name, url, file = null) {
        this.id = id;
        this.name = name;
        this.url = url;
        this.file = file;
        this.title = name;
        this.author = 'Unknown Author';
        this.caption = 'No metadata embedded.';
        this.camera = 'Standard Capture';
        this.exposure = 'N/A';
        this.date = 'N/A';
        this.width = 0;
        this.height = 0;
        this.isParsed = false;
    }

    async parseMetadata() {
        if (this.isParsed) return;

        try {
            let buffer;
            if (this.file) {
                buffer = await this.file.arrayBuffer();
            } else {
                const response = await fetch(this.url);
                buffer = await response.arrayBuffer();
            }

            const exif = ExifParser.parse(buffer);
            if (exif.title) this.title = exif.title;
            if (exif.author) this.author = exif.author;
            if (exif.caption) this.caption = exif.caption;
            if (exif.camera) this.camera = exif.camera;
            if (exif.exposure) this.exposure = exif.exposure;
            if (exif.date) this.date = exif.date;

            this.isParsed = true;
        } catch (e) {
            console.log(`Note: Metadata skipped for ${this.name}:`, e.message);
        }
    }
}

/**
 * Class: GalleryUI
 * Manages UI DOM interactions, sidebar thumbnail list, main image viewport, and metadata footer.
 */
class GalleryUI {
    constructor(onSelectCallback) {
        this.onSelect = onSelectCallback;
        
        // DOM Element Cache
        this.thumbContainer = document.getElementById('thumbnail-container');
        this.thumbCount = document.getElementById('thumb-count');
        this.mainImage = document.getElementById('main-image');
        this.loader = document.getElementById('main-loader');
        
        // Metadata elements
        this.authorHeader = document.getElementById('author-value');
        this.metaTitle = document.getElementById('meta-title');
        this.metaCaption = document.getElementById('meta-caption');
        this.metaResolution = document.getElementById('meta-resolution');
        this.metaCamera = document.getElementById('meta-camera');
        this.metaExposure = document.getElementById('meta-exposure');
        this.metaDate = document.getElementById('meta-date');

        this.activeId = null;
    }

    renderThumbnails(items) {
        this.thumbContainer.innerHTML = '';
        this.thumbCount.textContent = items.length;

        items.forEach((item, index) => {
            const thumbNode = document.createElement('div');
            thumbNode.className = 'thumb-item';
            thumbNode.id = `thumb-${item.id}`;
            
            thumbNode.innerHTML = `
                <div class="thumb-preview">
                    <span class="thumb-index">#${index + 1}</span>
                    <img src="${item.url}" alt="${item.name}" loading="lazy">
                </div>
                <div class="thumb-details">
                    <h4 id="thumb-title-${item.id}">${item.title}</h4>
                    <p id="thumb-author-${item.id}">${item.author}</p>
                </div>
            `;

            thumbNode.addEventListener('click', () => this.onSelect(index));
            this.thumbContainer.appendChild(thumbNode);
        });
    }

    setActiveThumbnail(id) {
        if (this.activeId !== null) {
            const prev = document.getElementById(`thumb-${this.activeId}`);
            if (prev) prev.classList.remove('active');
        }

        this.activeId = id;
        const current = document.getElementById(`thumb-${id}`);
        if (current) {
            current.classList.add('active');
            current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }

    updateThumbnailDetails(item) {
        const titleEl = document.getElementById(`thumb-title-${item.id}`);
        const authorEl = document.getElementById(`thumb-author-${item.id}`);
        if (titleEl) titleEl.textContent = item.title;
        if (authorEl) authorEl.textContent = item.author;
    }

    showLoader() {
        this.loader.classList.remove('hidden');
    }

    hideLoader() {
        this.loader.classList.add('hidden');
    }

    displayImage(item) {
        this.mainImage.classList.add('hidden');
        this.mainImage.src = item.url;

        this.mainImage.onload = () => {
            item.width = this.mainImage.naturalWidth;
            item.height = this.mainImage.naturalHeight;
            this.metaResolution.textContent = `${item.width} × ${item.height}`;
            this.mainImage.classList.remove('hidden');
        };

        // Render metadata
        this.authorHeader.textContent = item.author;
        this.metaTitle.textContent = item.title;
        this.metaCaption.textContent = item.caption;
        this.metaCamera.textContent = item.camera;
        this.metaExposure.textContent = item.exposure;
        this.metaDate.textContent = item.date;
    }
}

/**
 * Class: AppController
 * Orchestrates event handlers, server folder fetching, local files, drag-drop, and arrow navigation.
 */
class AppController {
    constructor() {
        this.images = [];
        this.currentIndex = 0;
        this.ui = new GalleryUI((index) => this.selectImage(index));

        this.bindEvents();
        this.loadServerFolder('./images/');
    }

    bindEvents() {
        // Controls
        document.getElementById('btn-load-server').addEventListener('click', () => {
            const url = document.getElementById('server-url-input').value.trim();
            if (url) this.loadServerFolder(url);
        });

        const localInput = document.getElementById('local-file-input');
        document.getElementById('btn-browse-local').addEventListener('click', () => localInput.click());
        document.getElementById('drag-drop-zone').addEventListener('click', () => localInput.click());

        localInput.addEventListener('change', (e) => this.handleLocalFiles(e.target.files));

        // Arrow Navigation Buttons
        document.getElementById('btn-prev').addEventListener('click', () => this.navigate(-1));
        document.getElementById('btn-next').addEventListener('click', () => this.navigate(1));

        // Keyboard Navigation (Arrow Keys)
        window.addEventListener('keydown', (e) => {
            if (this.images.length === 0) return;
            if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                e.preventDefault();
                this.navigate(-1);
            } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                e.preventDefault();
                this.navigate(1);
            }
        });

        // Drag and Drop support
        const dropZone = document.body;
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(evt => {
            dropZone.addEventListener(evt, (e) => {
                e.preventDefault();
                e.stopPropagation();
            });
        });

        dropZone.addEventListener('drop', (e) => {
            const files = e.dataTransfer.files;
            if (files && files.length > 0) {
                this.handleLocalFiles(files);
            }
        });
    }

    async loadServerFolder(folderUrl) {
        this.ui.showLoader();
        this.images = [];

        // Ensure trailing slash
        if (!folderUrl.endsWith('/')) folderUrl += '/';

        try {
            const response = await fetch(folderUrl);
            if (response.ok) {
                const htmlText = await response.text();
                // Regex to discover JPEG files in server directory listing HTML
                const matches = [...htmlText.matchAll(/href=["']([^"']+\.(?:jpg|jpeg))["']/gi)];
                const filenames = [...new Set(matches.map(m => m[1]))];

                if (filenames.length > 0) {
                    this.images = filenames.map((file, idx) => new GalleryModel(idx, file, `${folderUrl}${file}`));
                }
            }
        } catch (e) {
            console.log('Server directory fetch failed, fallback sample images loaded.');
        }

        // Fallback sample set if folder search yields no files or is offline
        if (this.images.length === 0) {
            this.images = [
                new GalleryModel(0, 'alpine-landscape.jpg', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80'),
                new GalleryModel(1, 'misty-forest.jpg', 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80'),
                new GalleryModel(2, 'coastal-sunset.jpg', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'),
                new GalleryModel(3, 'architectural-lines.jpg', 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80'),
                new GalleryModel(4, 'desert-dunes.jpg', 'https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?auto=format&fit=crop&w=1200&q=80')
            ];
        }

        this.ui.renderThumbnails(this.images);
        await this.selectImage(0);
        this.ui.hideLoader();
    }

    async handleLocalFiles(fileList) {
        const jpegs = Array.from(fileList).filter(f => f.type === 'image/jpeg' || f.name.toLowerCase().endsWith('.jpg') || f.name.toLowerCase().endsWith('.jpeg'));

        if (jpegs.length === 0) {
            alert('Please select valid JPEG files.');
            return;
        }

        this.ui.showLoader();
        this.images = jpegs.map((file, idx) => new GalleryModel(idx, file.name, URL.createObjectURL(file), file));

        this.ui.renderThumbnails(this.images);
        await this.selectImage(0);
        this.ui.hideLoader();
    }

    async selectImage(index) {
        if (index < 0 || index >= this.images.length) return;

        this.currentIndex = index;
        const currentModel = this.images[index];

        this.ui.showLoader();
        await currentModel.parseMetadata();

        this.ui.setActiveThumbnail(currentModel.id);
        this.ui.updateThumbnailDetails(currentModel);
        this.ui.displayImage(currentModel);

        this.ui.hideLoader();
    }

    navigate(direction) {
        let nextIndex = this.currentIndex + direction;
        if (nextIndex < 0) nextIndex = this.images.length - 1;
        if (nextIndex >= this.images.length) nextIndex = 0;
        this.selectImage(nextIndex);
    }
}

// Bootstrap Application on DOM Ready
window.addEventListener('DOMContentLoaded', () => {
    window.galleryApp = new AppController();
});
