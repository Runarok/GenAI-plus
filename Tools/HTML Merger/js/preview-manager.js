class PreviewManager {
    constructor() {
        this.previewFrame = document.getElementById('preview-frame');
        this.previewContainer = document.querySelector('.preview-container');
        this.previewModeBtns = document.querySelectorAll('.preview-mode-btn');
        this.combinedOutput = document.getElementById('combined-output');
        this.currentMode = 'desktop';
        
        this.setupEventListeners();
        this.updatePreview();
    }

    setupEventListeners() {
        this.previewModeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const mode = btn.dataset.mode;
                this.setPreviewMode(mode);
            });
        });

        // Listen for direct input changes in the combined output textarea
        this.combinedOutput.addEventListener('input', () => {
            this.updatePreview();
        });

        // Listen for paste events
        this.combinedOutput.addEventListener('paste', () => {
            // Use setTimeout to ensure the pasted content is processed
            setTimeout(() => {
                this.updatePreview();
            }, 0);
        });
    }

    setPreviewMode(mode) {
        this.currentMode = mode;
        
        // Update button states
        this.previewModeBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.mode === mode);
        });

        // Update preview container class
        if (mode === 'mobile') {
            this.previewContainer.classList.add('mobile-mode');
        } else {
            this.previewContainer.classList.remove('mobile-mode');
        }

        // Save preference
        localStorage.setItem('preview-mode', mode);
        
        // Update preview to reflect new mode
        this.updatePreview();
    }

    getCurrentMode() {
        return this.currentMode;
    }

    updatePreview() {
        const content = this.combinedOutput.value;
        
        if (!content.trim()) {
            this.previewFrame.srcdoc = this.getEmptyPreviewHTML();
            return;
        }

        try {
            // Enhance the content with responsive meta tag if missing
            let enhancedContent = content;
            
            // Check if viewport meta tag exists
            if (!enhancedContent.includes('viewport')) {
                // Add viewport meta tag for better mobile preview
                const viewportMeta = '<meta name="viewport" content="width=device-width, initial-scale=1.0">';
                
                if (enhancedContent.includes('<head>')) {
                    enhancedContent = enhancedContent.replace('<head>', `<head>\n    ${viewportMeta}`);
                } else if (enhancedContent.includes('<html>')) {
                    enhancedContent = enhancedContent.replace('<html>', `<html>\n<head>\n    ${viewportMeta}\n</head>`);
                }
            }
            
            // Add mobile-specific styles if in mobile mode
            if (this.currentMode === 'mobile') {
                const mobileStyles = `
                    <style>
                        /* Mobile preview enhancements */
                        body {
                            -webkit-text-size-adjust: 100%;
                            -ms-text-size-adjust: 100%;
                        }
                        
                        /* Ensure content fits mobile viewport */
                        * {
                            max-width: 100%;
                            box-sizing: border-box;
                        }
                        
                        img, video, iframe {
                            max-width: 100%;
                            height: auto;
                        }
                        
                        /* Touch-friendly buttons */
                        button, input[type="button"], input[type="submit"] {
                            min-height: 44px;
                            min-width: 44px;
                        }
                    </style>
                `;
                
                if (enhancedContent.includes('</head>')) {
                    enhancedContent = enhancedContent.replace('</head>', `    ${mobileStyles}\n</head>`);
                }
            }
            
            this.previewFrame.srcdoc = enhancedContent;
        } catch (error) {
            console.error('Preview update failed:', error);
            this.previewFrame.srcdoc = this.getErrorPreviewHTML();
        }
    }

    getEmptyPreviewHTML() {
        return `
            <html>
                <head>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <style>
                        body {
                            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            height: 100vh;
                            margin: 0;
                            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
                            color: #666;
                            text-align: center;
                        }
                        .empty-state {
                            max-width: 300px;
                            padding: 2rem;
                        }
                        .empty-state h2 {
                            margin-bottom: 1rem;
                            color: #333;
                            font-weight: 300;
                        }
                        .empty-state p {
                            line-height: 1.6;
                            opacity: 0.8;
                        }
                        .icon {
                            font-size: 3rem;
                            margin-bottom: 1rem;
                            opacity: 0.5;
                        }
                    </style>
                </head>
                <body>
                    <div class="empty-state">
                        <div class="icon">📄</div>
                        <h2>No Content</h2>
                        <p>Add HTML, CSS, or JavaScript to see the live preview</p>
                    </div>
                </body>
            </html>
        `;
    }

    getErrorPreviewHTML() {
        return `
            <html>
                <head>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <style>
                        body {
                            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            height: 100vh;
                            margin: 0;
                            background: linear-gradient(135deg, #ffe6e6 0%, #ffcccc 100%);
                            color: #cc0000;
                            text-align: center;
                        }
                        .error-state {
                            max-width: 300px;
                            padding: 2rem;
                        }
                        .error-state h2 {
                            margin-bottom: 1rem;
                            font-weight: 300;
                        }
                        .error-state p {
                            line-height: 1.6;
                            opacity: 0.8;
                        }
                        .icon {
                            font-size: 3rem;
                            margin-bottom: 1rem;
                        }
                    </style>
                </head>
                <body>
                    <div class="error-state">
                        <div class="icon">⚠️</div>
                        <h2>Preview Error</h2>
                        <p>There was an error rendering the preview. Please check your HTML syntax.</p>
                    </div>
                </body>
            </html>
        `;
    }

    loadSavedPreviewMode() {
        const savedMode = localStorage.getItem('preview-mode') || 'desktop';
        this.setPreviewMode(savedMode);
    }
}