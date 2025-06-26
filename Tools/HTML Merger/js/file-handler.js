class FileHandler {
    constructor() {
        this.uploadedFiles = new Map(); // Track uploaded files to prevent duplicates
        this.setupFileInputs();
        this.setupDropZones();
        this.setupDirectInput();
    }

    setupFileInputs() {
        this.htmlFileInput = document.getElementById('html-file-input');
        this.cssFileInput = document.getElementById('css-file-input');
        this.jsFileInput = document.getElementById('js-file-input');

        this.htmlFileInput.addEventListener('change', (e) => this.handleFileInput(e, 'html'));
        this.cssFileInput.addEventListener('change', (e) => this.handleFileInput(e, 'css'));
        this.jsFileInput.addEventListener('change', (e) => this.handleFileInput(e, 'js'));
    }

    setupDropZones() {
        const dropZones = document.querySelectorAll('.drop-zone');
        
        dropZones.forEach(zone => {
            const type = zone.dataset.type;
            const textarea = zone.querySelector('textarea');
            
            // Update empty state
            this.updateDropZoneState(zone, textarea);
            
            // Listen for textarea changes
            textarea.addEventListener('input', () => {
                this.updateDropZoneState(zone, textarea);
            });

            // Click to upload (only when clicking on drop zone content, not textarea)
            zone.addEventListener('click', (e) => {
                if (e.target.closest('textarea')) return;
                if (e.target.closest('.drop-zone-content')) {
                    this.triggerFileInput(type);
                }
            });

            // Drag and drop events
            zone.addEventListener('dragover', (e) => {
                e.preventDefault();
                zone.classList.add('drag-over');
            });

            zone.addEventListener('dragleave', (e) => {
                e.preventDefault();
                if (!zone.contains(e.relatedTarget)) {
                    zone.classList.remove('drag-over');
                }
            });

            zone.addEventListener('drop', (e) => {
                e.preventDefault();
                zone.classList.remove('drag-over');
                this.handleFileDrop(e, type);
            });
        });
    }

    setupDirectInput() {
        // Enable direct typing in all textareas
        const textareas = ['html-input', 'css-input', 'js-input'];
        
        textareas.forEach(id => {
            const textarea = document.getElementById(id);
            if (textarea) {
                // Disable autocorrect and spellcheck for code inputs
                textarea.setAttribute('autocorrect', 'off');
                textarea.setAttribute('autocapitalize', 'off');
                textarea.setAttribute('spellcheck', 'false');
                
                // Make sure textarea is always accessible for typing
                textarea.style.pointerEvents = 'auto';
                textarea.style.zIndex = '20';
                
                // Focus handling
                textarea.addEventListener('focus', () => {
                    const dropZone = textarea.closest('.drop-zone');
                    if (dropZone) {
                        dropZone.classList.add('focused');
                    }
                });

                textarea.addEventListener('blur', () => {
                    const dropZone = textarea.closest('.drop-zone');
                    if (dropZone) {
                        dropZone.classList.remove('focused');
                    }
                });

                // Clear placeholder behavior when typing
                textarea.addEventListener('input', () => {
                    const dropZone = textarea.closest('.drop-zone');
                    this.updateDropZoneState(dropZone, textarea);
                });
            }
        });
    }

    updateDropZoneState(zone, textarea) {
        if (textarea.value.trim() === '') {
            zone.classList.add('empty');
            zone.classList.remove('has-content');
        } else {
            zone.classList.remove('empty');
            zone.classList.add('has-content');
        }
    }

    triggerFileInput(type) {
        switch (type) {
            case 'html':
                this.htmlFileInput.click();
                break;
            case 'css':
                this.cssFileInput.click();
                break;
            case 'js':
                this.jsFileInput.click();
                break;
        }
    }

    async handleFileInput(event, type) {
        const files = Array.from(event.target.files);
        await this.processFiles(files, type);
        event.target.value = ''; // Reset input
    }

    async handleFileDrop(event, type) {
        const files = Array.from(event.dataTransfer.files);
        await this.processFiles(files, type);
    }

    async processFiles(files, type) {
        if (files.length === 0) return;

        const allowedTypes = FILE_TYPES[type.toUpperCase()];
        const validFiles = files.filter(file => 
            Utils.isValidFileType(file, allowedTypes)
        );

        if (validFiles.length === 0) {
            Utils.showNotification(`No valid ${type.toUpperCase()} files found`, 'warning');
            return;
        }

        if (validFiles.length !== files.length) {
            Utils.showNotification(
                `${files.length - validFiles.length} files were skipped (invalid type)`, 
                'warning'
            );
        }

        // Check for duplicate files
        const newFiles = this.filterDuplicateFiles(validFiles, type);
        
        if (newFiles.length === 0) {
            Utils.showNotification('All files have already been uploaded', 'warning');
            return;
        }

        if (newFiles.length !== validFiles.length) {
            const duplicateCount = validFiles.length - newFiles.length;
            Utils.showNotification(
                `${duplicateCount} duplicate file(s) were skipped`, 
                'warning'
            );
        }

        try {
            const contents = await Promise.all(
                newFiles.map(file => Utils.readFileAsText(file))
            );

            const mergedContent = this.mergeFileContents(contents, type);
            this.updateInput(type, mergedContent, newFiles);
            this.updateFileInfo(type, newFiles);

            // Track uploaded files
            newFiles.forEach(file => {
                const fileKey = `${type}-${file.name}-${file.size}-${file.lastModified}`;
                this.uploadedFiles.set(fileKey, true);
            });

            Utils.showNotification(
                `${newFiles.length} ${type.toUpperCase()} file(s) loaded successfully`, 
                'success'
            );

            // Trigger HTML combination
            if (window.htmlJoiner) {
                window.htmlJoiner.combineHTML();
            }

        } catch (error) {
            console.error('Error processing files:', error);
            Utils.showNotification('Error reading files', 'error');
        }
    }

    filterDuplicateFiles(files, type) {
        return files.filter(file => {
            const fileKey = `${type}-${file.name}-${file.size}-${file.lastModified}`;
            return !this.uploadedFiles.has(fileKey);
        });
    }

    mergeFileContents(contents, type) {
        if (contents.length === 1) {
            return contents[0];
        }

        // Add separators between files for better organization
        const separator = type === 'css' ? '\n\n/* ===== Next File ===== */\n\n' :
                         type === 'js' ? '\n\n// ===== Next File =====\n\n' :
                         '\n\n<!-- ===== Next File ===== -->\n\n';

        return contents.join(separator);
    }

    updateInput(type, content, files) {
        const textarea = document.getElementById(`${type}-input`);
        const currentContent = textarea.value.trim();
        
        if (type === 'html') {
            // For HTML, replace content instead of merging
            textarea.value = content;
        } else {
            // For CSS and JS, merge with existing content
            if (currentContent) {
                const separator = type === 'css' ? '\n\n/* ===== Uploaded Files ===== */\n\n' :
                                 '\n\n// ===== Uploaded Files =====\n\n';
                textarea.value = currentContent + separator + content;
            } else {
                textarea.value = content;
            }
        }

        // Update drop zone state
        const dropZone = textarea.closest('.drop-zone');
        this.updateDropZoneState(dropZone, textarea);
    }

    updateFileInfo(type, files) {
        const fileInfo = document.getElementById(`${type}-file-info`);
        if (files.length === 1) {
            const file = files[0];
            fileInfo.innerHTML = `
                <i class="fas fa-file"></i>
                <span>${file.name} (${Utils.formatFileSize(file.size)})</span>
            `;
        } else {
            const totalSize = files.reduce((sum, file) => sum + file.size, 0);
            fileInfo.innerHTML = `
                <i class="fas fa-files"></i>
                <span>${files.length} files (${Utils.formatFileSize(totalSize)})</span>
            `;
        }
    }

    clearFileInfo(type) {
        const fileInfo = document.getElementById(`${type}-file-info`);
        fileInfo.innerHTML = '';
        
        // Clear tracked files for this type
        const keysToDelete = [];
        for (const key of this.uploadedFiles.keys()) {
            if (key.startsWith(`${type}-`)) {
                keysToDelete.push(key);
            }
        }
        keysToDelete.forEach(key => this.uploadedFiles.delete(key));
    }
}