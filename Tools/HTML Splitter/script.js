class HTMLParser {
    constructor() {
        this.initializeElements();
        this.setupEventListeners();
        this.setupThemeSystem();
        this.setupTabSystem();
        this.setupActionMenus();
        this.parseHTML(); // Initial parse
    }

    initializeElements() {
        this.htmlInput = document.getElementById('html-input');
        this.htmlOutput = document.getElementById('html-output');
        this.cssOutput = document.getElementById('css-output');
        this.jsOutput = document.getElementById('js-output');
        this.clearBtn = document.getElementById('clear-input');
        this.settingsBtn = document.getElementById('settings-btn');
        this.settingsMenu = document.getElementById('settings-menu');
        this.downloadAllBtn = document.getElementById('download-all-btn');
        this.themeOptions = document.querySelectorAll('.theme-option');
        this.tabBtns = document.querySelectorAll('.tab-btn');
        this.tabContents = document.querySelectorAll('.tab-content');
        this.actionBtns = document.querySelectorAll('.action-btn');
        this.actionMenus = document.querySelectorAll('.action-menu');
        this.actionItems = document.querySelectorAll('.action-item');
    }

    setupEventListeners() {
        // Live parsing on input
        this.htmlInput.addEventListener('input', () => {
            this.parseHTML();
        });

        // Clear input
        this.clearBtn.addEventListener('click', () => {
            this.clearInput();
        });

        // Settings dropdown
        this.settingsBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleSettingsMenu();
        });

        // Close settings menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.settingsMenu.contains(e.target) && !this.settingsBtn.contains(e.target)) {
                this.closeSettingsMenu();
            }
        });

        // Download all button
        this.downloadAllBtn.addEventListener('click', () => {
            this.downloadAllFiles();
        });

        // Action items
        this.actionItems.forEach(item => {
            item.addEventListener('click', (e) => {
                const action = e.currentTarget.dataset.action;
                const type = e.currentTarget.dataset.type;
                
                if (action === 'download') {
                    this.downloadFile(type);
                }
                
                this.closeAllActionMenus();
            });
        });

        // Prevent default paste behavior and handle it manually
        this.htmlInput.addEventListener('paste', (e) => {
            setTimeout(() => this.parseHTML(), 10);
        });
    }

    setupThemeSystem() {
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme') || 'dark';
        this.setTheme(savedTheme);

        // Theme option listeners
        this.themeOptions.forEach(option => {
            option.addEventListener('click', () => {
                const theme = option.dataset.theme;
                this.setTheme(theme);
                localStorage.setItem('theme', theme);
            });
        });
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        
        // Update active theme option
        this.themeOptions.forEach(option => {
            option.classList.toggle('active', option.dataset.theme === theme);
        });
    }

    setupTabSystem() {
        this.tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const tabId = btn.dataset.tab;
                this.switchTab(tabId);
            });
        });
    }

    switchTab(tabId) {
        // Update tab buttons
        this.tabBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tabId);
        });

        // Update tab contents
        this.tabContents.forEach(content => {
            content.classList.toggle('active', content.id === `${tabId}-tab`);
        });
    }

    setupActionMenus() {
        this.actionBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const menuId = btn.id.replace('-download', '-menu');
                const menu = document.getElementById(menuId);
                
                // Close other menus
                this.actionMenus.forEach(m => {
                    if (m !== menu) {
                        m.classList.remove('active');
                    }
                });
                
                // Toggle current menu
                menu.classList.toggle('active');
            });
        });

        // Close action menus when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.tab-actions')) {
                this.closeAllActionMenus();
            }
        });
    }

    closeAllActionMenus() {
        this.actionMenus.forEach(menu => {
            menu.classList.remove('active');
        });
    }

    toggleSettingsMenu() {
        this.settingsMenu.classList.toggle('active');
    }

    closeSettingsMenu() {
        this.settingsMenu.classList.remove('active');
    }

    parseHTML() {
        const inputHTML = this.htmlInput.value.trim();
        
        if (!inputHTML) {
            this.clearOutputs();
            return;
        }

        try {
            const parser = new DOMParser();
            const doc = parser.parseFromString(inputHTML, 'text/html');
            
            // Check for parsing errors
            const parserError = doc.querySelector('parsererror');
            if (parserError) {
                // If DOMParser fails, fall back to string manipulation
                this.parseHTMLWithRegex(inputHTML);
                return;
            }

            this.parseHTMLWithDOM(doc, inputHTML);
        } catch (error) {
            console.warn('DOM parsing failed, falling back to regex:', error);
            this.parseHTMLWithRegex(inputHTML);
        }
    }

    parseHTMLWithDOM(doc, originalHTML) {
        // Extract CSS from style tags
        const styleTags = doc.querySelectorAll('style');
        const cssContent = Array.from(styleTags).map(style => {
            const content = style.textContent || style.innerHTML;
            return content.trim();
        }).filter(content => content).join('\n\n');

        // Extract JavaScript from script tags without src attribute
        const scriptTags = doc.querySelectorAll('script:not([src])');
        const jsContent = Array.from(scriptTags).map(script => {
            const content = script.textContent || script.innerHTML;
            return content.trim();
        }).filter(content => content).join('\n\n');

        // Create clean HTML by removing embedded style and script tags
        const cleanDoc = doc.cloneNode(true);
        cleanDoc.querySelectorAll('style').forEach(style => style.remove());
        cleanDoc.querySelectorAll('script:not([src])').forEach(script => script.remove());

        // Get the clean HTML
        const cleanHTML = this.formatHTML(cleanDoc.documentElement.outerHTML);

        // Update outputs
        this.updateOutputs(cleanHTML, cssContent, jsContent);
    }

    parseHTMLWithRegex(inputHTML) {
        // Extract CSS from style tags using regex
        const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/gi;
        const cssMatches = [];
        let styleMatch;
        
        while ((styleMatch = styleRegex.exec(inputHTML)) !== null) {
            const content = styleMatch[1].trim();
            if (content) {
                cssMatches.push(content);
            }
        }
        const cssContent = cssMatches.join('\n\n');

        // Extract JavaScript from script tags without src attribute
        const scriptRegex = /<script(?![^>]*src\s*=)[^>]*>([\s\S]*?)<\/script>/gi;
        const jsMatches = [];
        let scriptMatch;
        
        while ((scriptMatch = scriptRegex.exec(inputHTML)) !== null) {
            const content = scriptMatch[1].trim();
            if (content) {
                jsMatches.push(content);
            }
        }
        const jsContent = jsMatches.join('\n\n');

        // Create clean HTML by removing embedded style and script tags
        let cleanHTML = inputHTML;
        cleanHTML = cleanHTML.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
        cleanHTML = cleanHTML.replace(/<script(?![^>]*src\s*=)[^>]*>[\s\S]*?<\/script>/gi, '');
        
        // Clean up extra whitespace
        cleanHTML = this.formatHTML(cleanHTML);

        // Update outputs
        this.updateOutputs(cleanHTML, cssContent, jsContent);
    }

    formatHTML(html) {
        // Basic HTML formatting
        return html
            .replace(/>\s*</g, '>\n<')
            .replace(/^\s*\n/gm, '')
            .trim();
    }

    updateOutputs(html, css, js) {
        // Add updating class for smooth transition
        this.htmlOutput.classList.add('updating');
        this.cssOutput.classList.add('updating');
        this.jsOutput.classList.add('updating');

        setTimeout(() => {
            this.htmlOutput.value = html;
            this.cssOutput.value = css;
            this.jsOutput.value = js;

            // Remove updating class
            this.htmlOutput.classList.remove('updating');
            this.cssOutput.classList.remove('updating');
            this.jsOutput.classList.remove('updating');
        }, 100);
    }

    clearOutputs() {
        this.htmlOutput.value = '';
        this.cssOutput.value = '';
        this.jsOutput.value = '';
    }

    clearInput() {
        this.htmlInput.value = '';
        this.clearOutputs();
        this.htmlInput.focus();
    }

    downloadFile(type) {
        let content = '';
        let filename = '';
        let mimeType = 'text/plain';

        switch (type) {
            case 'html':
                content = this.htmlOutput.value;
                filename = 'index.html';
                mimeType = 'text/html';
                break;
            case 'css':
                content = this.cssOutput.value;
                filename = 'styles.css';
                mimeType = 'text/css';
                break;
            case 'js':
                content = this.jsOutput.value;
                filename = 'script.js';
                mimeType = 'text/javascript';
                break;
        }

        if (!content.trim()) {
            this.showNotification(`No ${type.toUpperCase()} content to download`, 'warning');
            return;
        }

        try {
            const blob = new Blob([content], { type: mimeType });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            this.showNotification(`${filename} downloaded successfully!`, 'success');
        } catch (error) {
            console.error('Download failed:', error);
            this.showNotification('Download failed. Please try again.', 'error');
        }
    }

    downloadAllFiles() {
        const files = [
            { content: this.htmlOutput.value, filename: 'index.html', type: 'HTML' },
            { content: this.cssOutput.value, filename: 'styles.css', type: 'CSS' },
            { content: this.jsOutput.value, filename: 'script.js', type: 'JavaScript' }
        ];

        const filesToDownload = files.filter(file => file.content.trim());

        if (filesToDownload.length === 0) {
            this.showNotification('No content to download', 'warning');
            return;
        }

        // Download each file with a small delay
        filesToDownload.forEach((file, index) => {
            setTimeout(() => {
                try {
                    const blob = new Blob([file.content], { type: 'text/plain' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = file.filename;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                } catch (error) {
                    console.error(`Failed to download ${file.filename}:`, error);
                }
            }, index * 200); // 200ms delay between downloads
        });

        this.showNotification(`Downloading ${filesToDownload.length} files...`, 'success');
        this.closeSettingsMenu();
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 1000;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
            max-width: 300px;
            word-wrap: break-word;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
        `;

        // Set background color based on type
        const colors = {
            success: '#4caf50',
            warning: '#ff9800',
            error: '#f44336',
            info: '#2196f3'
        };
        notification.style.backgroundColor = colors[type] || colors.info;

        // Add to DOM
        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 10);

        // Remove after delay
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Initialize the parser when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new HTMLParser();
});

// Add some sample content for demonstration
document.addEventListener('DOMContentLoaded', () => {
    const sampleHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sample Document</title>
    <link rel="stylesheet" href="external-styles.css">
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
            margin: 0;
            padding: 20px;
        }
        
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        h1 {
            color: #333;
            text-align: center;
        }
        
        .button {
            background: linear-gradient(45deg, #007acc, #00d4ff);
            color: white;
            padding: 12px 24px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 16px;
            transition: transform 0.3s ease;
        }
        
        .button:hover {
            transform: translateY(-2px);
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome to My Website</h1>
        <p>This is a sample HTML document with embedded CSS and JavaScript.</p>
        <button id="clickMe" class="button">Click Me!</button>
        <div id="output"></div>
    </div>
    
    <script>
        // This is embedded JavaScript
        document.addEventListener('DOMContentLoaded', function() {
            const button = document.getElementById('clickMe');
            const output = document.getElementById('output');
            let clickCount = 0;
            
            button.addEventListener('click', function() {
                clickCount++;
                output.innerHTML = \`<p style="margin-top: 20px; color: #007acc;">Button clicked \${clickCount} time(s)!</p>\`;
                
                // Add some animation
                button.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    button.style.transform = '';
                }, 150);
            });
            
            console.log('Page loaded successfully');
            
            // Add some dynamic styling
            setTimeout(() => {
                document.body.style.background = 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)';
            }, 1000);
        });
        
        // Another script block
        function showAlert() {
            alert('Hello from embedded JavaScript!');
        }
    </script>
    
    <script src="external-script.js"></script>
</body>
</html>`;

    // Set sample content after a short delay to show the parsing in action
    setTimeout(() => {
        const htmlInput = document.getElementById('html-input');
        if (htmlInput && !htmlInput.value.trim()) {
            htmlInput.value = sampleHTML;
            // Trigger parsing
            htmlInput.dispatchEvent(new Event('input'));
        }
    }, 500);
});