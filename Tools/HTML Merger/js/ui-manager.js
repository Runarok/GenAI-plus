class UIManager {
    constructor() {
        this.setupSettingsDropdown();
        this.setupInputTabs();
        this.setupOutputTabs();
        this.setupSoftWrapToggle();
        this.setupInputActions();
        this.setupOutputActions();
    }

    setupSettingsDropdown() {
        this.settingsBtn = document.getElementById('settings-btn');
        this.settingsMenu = document.getElementById('settings-menu');

        this.settingsBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleSettingsMenu();
        });

        document.addEventListener('click', (e) => {
            if (!this.settingsMenu.contains(e.target) && !this.settingsBtn.contains(e.target)) {
                this.closeSettingsMenu();
            }
        });
    }

    toggleSettingsMenu() {
        this.settingsMenu.classList.toggle('active');
    }

    closeSettingsMenu() {
        this.settingsMenu.classList.remove('active');
    }

    setupInputTabs() {
        this.inputTabBtns = document.querySelectorAll('.input-tab-btn');
        this.inputTabContents = document.querySelectorAll('.input-tab-content');

        this.inputTabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const tabId = btn.dataset.tab;
                this.switchInputTab(tabId);
            });
        });
    }

    switchInputTab(tabId) {
        this.inputTabBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tabId);
        });

        this.inputTabContents.forEach(content => {
            content.classList.toggle('active', content.id === `${tabId}-input-tab`);
        });
    }

    setupOutputTabs() {
        this.outputTabBtns = document.querySelectorAll('.output-tab-btn');
        this.outputTabContents = document.querySelectorAll('.output-tab-content');

        this.outputTabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const tabId = btn.dataset.tab;
                this.switchOutputTab(tabId);
            });
        });
    }

    switchOutputTab(tabId) {
        this.outputTabBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tabId);
        });

        this.outputTabContents.forEach(content => {
            content.classList.toggle('active', content.id === `${tabId}-output-tab`);
        });

        // Update preview when switching to preview tab
        if (tabId === 'preview' && window.previewManager) {
            window.previewManager.updatePreview();
        }
    }

    setupSoftWrapToggle() {
        this.softWrapToggle = document.getElementById('soft-wrap-toggle');
        
        const savedSoftWrap = localStorage.getItem('soft-wrap') !== 'false';
        this.softWrapToggle.checked = savedSoftWrap;
        this.applySoftWrap(savedSoftWrap);

        this.softWrapToggle.addEventListener('change', (e) => {
            const enabled = e.target.checked;
            this.applySoftWrap(enabled);
            localStorage.setItem('soft-wrap', enabled);
        });
    }

    applySoftWrap(enabled) {
        const textareas = document.querySelectorAll('textarea');
        textareas.forEach(textarea => {
            if (enabled) {
                textarea.classList.add('soft-wrap');
                textarea.classList.remove('no-wrap');
            } else {
                textarea.classList.add('no-wrap');
                textarea.classList.remove('soft-wrap');
            }
        });
    }

    setupInputActions() {
        const inputTabActionBtns = document.querySelectorAll('.input-tab-action-btn');
        
        inputTabActionBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const action = btn.dataset.action;
                const type = btn.dataset.type;
                
                this.handleInputAction(action, type);
            });
        });
    }

    async handleInputAction(action, type) {
        const textarea = document.getElementById(`${type}-input`);
        const content = textarea.value;

        switch (action) {
            case 'upload':
                if (window.fileHandler) {
                    window.fileHandler.triggerFileInput(type);
                }
                break;

            case 'download':
                if (!content.trim()) {
                    Utils.showNotification(`No ${type.toUpperCase()} content to download`, 'warning');
                    return;
                }
                
                const extension = type === 'js' ? 'js' : type;
                const filename = `${type}-content.${extension}`;
                const mimeType = MIME_TYPES[type.toUpperCase()];
                
                if (Utils.downloadFile(content, filename, mimeType)) {
                    Utils.showNotification(`${filename} downloaded successfully!`, 'success');
                } else {
                    Utils.showNotification('Download failed', 'error');
                }
                break;

            case 'copy':
                if (!content.trim()) {
                    Utils.showNotification(`No ${type.toUpperCase()} content to copy`, 'warning');
                    return;
                }
                
                if (await Utils.copyToClipboard(content)) {
                    Utils.showNotification(`${type.toUpperCase()} content copied to clipboard!`, 'success');
                } else {
                    Utils.showNotification('Copy failed', 'error');
                }
                break;

            case 'clear':
                textarea.value = '';
                textarea.focus();
                
                // Clear file info
                if (window.fileHandler) {
                    window.fileHandler.clearFileInfo(type);
                }
                
                // Update drop zone state
                const dropZone = textarea.closest('.drop-zone');
                if (dropZone && window.fileHandler) {
                    window.fileHandler.updateDropZoneState(dropZone, textarea);
                }
                
                // Trigger HTML combination
                if (window.htmlJoiner) {
                    window.htmlJoiner.combineHTML();
                }
                break;
        }
    }

    setupOutputActions() {
        const outputActionBtns = document.querySelectorAll('.output-action-btn');
        
        outputActionBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const action = btn.dataset.action;
                this.handleOutputAction(action);
            });
        });

        // Download all button
        const downloadAllBtn = document.getElementById('download-all-btn');
        downloadAllBtn.addEventListener('click', () => {
            this.handleOutputAction('download');
        });
    }

    async handleOutputAction(action) {
        const combinedOutput = document.getElementById('combined-output');
        const content = combinedOutput.value;

        switch (action) {
            case 'copy':
                if (!content.trim()) {
                    Utils.showNotification('No content to copy', 'warning');
                    return;
                }
                
                if (await Utils.copyToClipboard(content)) {
                    Utils.showNotification('Combined HTML copied to clipboard!', 'success');
                } else {
                    Utils.showNotification('Copy failed', 'error');
                }
                break;

            case 'download':
                if (!content.trim()) {
                    Utils.showNotification('No content to download', 'warning');
                    return;
                }
                
                if (Utils.downloadFile(content, 'combined.html', MIME_TYPES.HTML)) {
                    Utils.showNotification('combined.html downloaded successfully!', 'success');
                } else {
                    Utils.showNotification('Download failed', 'error');
                }
                break;

            case 'preview':
                if (!content.trim()) {
                    Utils.showNotification('No content to preview', 'warning');
                    return;
                }
                
                try {
                    // Get current preview mode
                    const previewMode = window.previewManager ? window.previewManager.getCurrentMode() : 'desktop';
                    
                    const blob = new Blob([content], { type: MIME_TYPES.HTML });
                    const url = URL.createObjectURL(blob);
                    
                    // Open in new window with appropriate size based on preview mode
                    const windowFeatures = previewMode === 'mobile' 
                        ? 'width=375,height=667,scrollbars=yes,resizable=yes'
                        : 'width=1200,height=800,scrollbars=yes,resizable=yes';
                    
                    const newWindow = window.open(url, '_blank', windowFeatures);
                    
                    if (newWindow) {
                        Utils.showNotification(`Preview opened in new ${previewMode} window!`, 'success');
                        setTimeout(() => URL.revokeObjectURL(url), 1000);
                    } else {
                        Utils.showNotification('Please allow popups to preview the HTML', 'warning');
                    }
                } catch (error) {
                    console.error('Preview failed:', error);
                    Utils.showNotification('Preview failed', 'error');
                }
                break;
        }
    }
}