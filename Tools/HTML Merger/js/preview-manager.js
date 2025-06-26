class PreviewManager {
    constructor() {
        this.previewFrame = document.getElementById('preview-frame');
        this.previewContainer = document.querySelector('.preview-container');
        this.previewModeBtns = document.querySelectorAll('.preview-mode-btn');
        this.combinedOutput = document.getElementById('combined-output');
        
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
    }

    updatePreview() {
        const content = this.combinedOutput.value;
        
        if (!content.trim()) {
            this.previewFrame.srcdoc = `
                <html>
                    <body style="
                        font-family: Arial, sans-serif;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        height: 100vh;
                        margin: 0;
                        background: #f5f5f5;
                        color: #666;
                    ">
                        <div style="text-align: center;">
                            <h2>No Content</h2>
                            <p>Add HTML, CSS, or JavaScript to see the preview</p>
                        </div>
                    </body>
                </html>
            `;
            return;
        }

        try {
            this.previewFrame.srcdoc = content;
        } catch (error) {
            console.error('Preview update failed:', error);
            this.previewFrame.srcdoc = `
                <html>
                    <body style="
                        font-family: Arial, sans-serif;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        height: 100vh;
                        margin: 0;
                        background: #ffe6e6;
                        color: #cc0000;
                    ">
                        <div style="text-align: center;">
                            <h2>Preview Error</h2>
                            <p>There was an error rendering the preview</p>
                        </div>
                    </body>
                </html>
            `;
        }
    }

    loadSavedPreviewMode() {
        const savedMode = localStorage.getItem('preview-mode') || 'desktop';
        this.setPreviewMode(savedMode);
    }
}