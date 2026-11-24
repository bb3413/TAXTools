/**
 * ExifParser - Parses EXIF metadata from JPEG files client-side using DataViews.
 */
class ExifParser {
    static async parse(fileOrUrl) {
        try {
            let buffer;
            if (fileOrUrl instanceof File) {
                const blob = fileOrUrl.slice(0, 65536);
                buffer = await blob.arrayBuffer();
            } else {
                const response = await fetch(fileOrUrl);
                const blob = await response.blob();
                buffer = await blob.slice(0, 65536).arrayBuffer();
            }

            const view = new DataView(buffer);
            if (view.getUint16(0) !== 0xFFD8) return {};

            let offset = 2;
            let length = view.byteLength;

            while (offset < length) {
                const marker = view.getUint16(offset);
                offset += 2;

                if (marker === 0xFFE1) {
                    const app1Length = view.getUint16(offset);
                    offset += 2;
                    return ExifParser.parseExifData(view, offset);
                } else if ((marker & 0xFF00) !== 0xFF00) {
                    break;
                } else {
                    offset += view.getUint16(offset);
                }
            }
        } catch (e) {
            console.warn("Could not parse EXIF metadata:", e);
        }
        return {};
    }

    static parseExifData(view, offset) {
        if (view.getUint32(offset) !== 0x45786966) return {};
        offset += 6;

        const tiffHeader = offset;
        const littleEndian = view.getUint16(tiffHeader) === 0x4949;
        const firstIFDOffset = view.getUint32(tiffHeader + 4, littleEndian);

        return ExifParser.readIFD(view, tiffHeader, tiffHeader + firstIFDOffset, littleEndian);
    }

    static readIFD(view, tiffHeader, entryOffset, littleEndian) {
        const metadata = {};
        try {
            const numEntries = view.getUint16(entryOffset, littleEndian);
            let offset = entryOffset + 2;

            for (let i = 0; i < numEntries; i++) {
                const tag = view.getUint16(offset, littleEndian);
                const type = view.getUint16(offset + 2, littleEndian);
                const count = view.getUint32(offset + 4, littleEndian);
                const valueOffset = view.getUint32(offset + 8, littleEndian);

                // Tag 0x010E or 0x9286: Image Description / Title
                if (tag === 0x010E || tag === 0x9286 || tag === 0x0320) {
                    metadata.title = ExifParser.readStringValue(view, tiffHeader, count, valueOffset, offset + 8, littleEndian);
                }
                offset += 12;
            }
        } catch (e) {
            console.warn("Error reading IFD tags", e);
        }
        return metadata;
    }

    static readStringValue(view, tiffHeader, count, valueOffset, offsetLocation, littleEndian) {
        let stringOffset = count > 4 ? tiffHeader + valueOffset : offsetLocation;
        let chars = [];
        for (let i = 0; i < count; i++) {
            const charCode = view.getUint8(stringOffset + i);
            if (charCode === 0) break;
            chars.push(String.fromCharCode(charCode));
        }
        return chars.join('').trim();
    }
}

/**
 * GalleryModel - Manages image collection state and active indices.
 */
class GalleryModel {
    constructor() {
        this.images = [];
        this.currentIndex = -1;
    }

    async loadImagesFromFolder(folderUrl) {
        const baseUrl = folderUrl.endsWith('/') ? folderUrl : folderUrl + '/';
        const response = await fetch(baseUrl + 'images.json');
        if (!response.ok) {
            throw new Error(`Failed to load images.json manifest (Status: ${response.status})`);
        }

        const filenames = await response.json();
        
        this.images = filenames.map((filename, index) => ({
            id: index,
            filename: filename,
            url: baseUrl + filename,
            title: filename.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
            author: "Unknown"
        }));

        this.currentIndex = this.images.length > 0 ? 0 : -1;
        return this.images;
    }

    setImages(customImages) {
        this.images = customImages.map((img, index) => ({
            id: index,
            filename: img.filename || `image_${index}.jpg`,
            url: img.url,
            title: img.title || `Image ${index + 1}`,
            author: img.author || "Unknown"
        }));
        this.currentIndex = this.images.length > 0 ? 0 : -1;
        return this.images;
    }

    getCurrentImage() {
        if (this.currentIndex >= 0 && this.currentIndex < this.images.length) {
            return this.images[this.currentIndex];
        }
        return null;
    }

    setIndex(index) {
        if (index >= 0 && index < this.images.length) {
            this.currentIndex = index;
            return true;
        }
        return false;
    }

    next() {
        if (this.currentIndex < this.images.length - 1) {
            this.currentIndex++;
            return true;
        }
        return false;
    }

    prev() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            return true;
        }
        return false;
    }
}

/**
 * GalleryUI - Handles DOM updates and user interactions.
 */
class GalleryUI {
    constructor() {
        this.headerTitleEl = document.getElementById('header-title');
        this.headerAuthorEl = document.getElementById('header-author');
        this.thumbnailListEl = document.getElementById('thumbnail-list');
        this.mainImageEl = document.getElementById('main-image');
        this.mainCaptionEl = document.getElementById('main-caption');
        this.folderInputEl = document.getElementById('folder-url-input');
        this.loadBtnEl = document.getElementById('load-folder-btn');
    }

    renderThumbnails(images, activeIndex, onThumbnailClick) {
        this.thumbnailListEl.innerHTML = '';
        
        images.forEach((image, index) => {
            const thumbItem = document.createElement('div');
            thumbItem.className = `thumbnail-item ${index === activeIndex ? 'active' : ''}`;
            thumbItem.tabIndex = 0;

            const imgTag = document.createElement('img');
            imgTag.src = image.url;
            imgTag.alt = image.title;
            imgTag.loading = 'lazy';

            thumbItem.appendChild(imgTag);
            thumbItem.addEventListener('click', () => onThumbnailClick(index));

            this.thumbnailListEl.appendChild(thumbItem);
        });
    }

    updateMainDisplay(image) {
        if (!image) {
            this.mainImageEl.src = '';
            this.mainImageEl.alt = 'No image selected';
            this.mainCaptionEl.textContent = '';
            this.headerTitleEl.textContent = 'JPEG Viewer';
            this.headerAuthorEl.textContent = 'Author: —';
            return;
        }

        this.mainImageEl.src = image.url;
        this.mainImageEl.alt = image.title;
        this.headerTitleEl.textContent = image.title;
        this.headerAuthorEl.textContent = `Author: ${image.author || 'Unknown'}`;

        if (image.title && image.title !== image.filename) {
            this.mainCaptionEl.textContent = image.title;
            this.mainCaptionEl.style.display = 'block';
        } else {
            this.mainCaptionEl.textContent = '';
            this.mainCaptionEl.style.display = 'none';
        }
    }

    highlightThumbnail(index) {
        const items = this.thumbnailListEl.querySelectorAll('.thumbnail-item');
        items.forEach((item, idx) => {
            if (idx === index) {
                item.classList.add('active');
                item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } else {
                item.classList.remove('active');
            }
        });
    }
}

/**
 * AppController - Coordinates actions between Model and UI.
 */
class AppController {
    constructor() {
        this.model = new GalleryModel();
        this.ui = new GalleryUI();
        this.initListeners();
    }

    initListeners() {
        // Load Folder button click
        this.ui.loadBtnEl.addEventListener('click', async () => {
            const url = this.ui.folderInputEl.value.trim();
            if (!url) return;
            try {
                await this.model.loadImagesFromFolder(url);
                this.refreshView();
                await this.parseMetadataForBatch();
            } catch (err) {
                alert(`Error loading images: ${err.message}`);
            }
        });

        // Enter key in input field
        this.ui.folderInputEl.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.ui.loadBtnEl.click();
            }
        });

        // Keyboard navigation (Arrow keys when no input is focused)
        document.addEventListener('keydown', (e) => {
            if (document.activeElement.tagName === 'INPUT') return;

            let changed = false;
            if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                changed = this.model.next();
                e.preventDefault();
            } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                changed = this.model.prev();
                e.preventDefault();
            }

            if (changed) {
                const newIndex = this.model.currentIndex;
                this.ui.highlightThumbnail(newIndex);
                this.ui.updateMainDisplay(this.model.getCurrentImage());
            }
        });

        // Drag and drop local fallback
        window.addEventListener('dragover', (e) => e.preventDefault());
        window.addEventListener('drop', async (e) => {
            e.preventDefault();
            const files = Array.from(e.dataTransfer.files).filter(f => f.type === 'image/jpeg');
            if (files.length === 0) return;

            const customImages = files.map(file => ({
                filename: file.name,
                url: URL.createObjectURL(file),
                title: file.name.replace(/\.[^/.]+$/, ""),
                author: "Local User"
            }));

            this.model.setImages(customImages);
            this.refreshView();
            await this.parseMetadataForBatch();
        });
    }

    refreshView() {
        const images = this.model.images;
        const activeIndex = this.model.currentIndex;

        this.ui.renderThumbnails(images, activeIndex, (index) => {
            this.model.setIndex(index);
            this.ui.highlightThumbnail(index);
            this.ui.updateMainDisplay(this.model.getCurrentImage());
        });

        this.ui.updateMainDisplay(this.model.getCurrentImage());
    }

    async parseMetadataForBatch() {
        for (let i = 0; i < this.model.images.length; i++) {
            const imgObj = this.model.images[i];
            const exif = await ExifParser.parse(imgObj.url);
            if (exif.title) {
                imgObj.title = exif.title;
            }
        }
        this.ui.updateMainDisplay(this.model.getCurrentImage());
    }
}

// Initialize Application on DOM Load
document.addEventListener('DOMContentLoaded', () => {
    window.app = new AppController();
});