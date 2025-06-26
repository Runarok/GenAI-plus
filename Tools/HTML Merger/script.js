class HTMLJoiner {
    constructor() {
        this.initializeElements();
        this.setupEventListeners();
        this.setupThemeSystem();
        this.setupInputTabSystem();
        this.setupSoftWrapToggle();
        this.combineHTML(); // Initial combine
    }

    initializeElements() {
        this.htmlInput = document.getElementById('html-input');
        this.cssInput = document.getElementById('css-input');
        this.jsInput = document.getElementById('js-input');
        this.combinedOutput = document.getElementById('combined-output');
        this.settingsBtn = document.getElementById('settings-btn');
        this.settingsMenu = document.getElementById('settings-menu');
        this.downloadAllBtn = document.getElementById('download-all-btn');
        this.softWrapToggle = document.getElementById('soft-wrap-toggle');
        this.themeOptions = document.querySelectorAll('.theme-option');
        this.modeButtons = document.querySelectorAll('.mode-btn');
        this.inputTabBtns = document.querySelectorAll('.input-tab-btn');
        this.inputTabContents = document.querySelectorAll('.input-tab-content');
        this.inputTabActionBtns = document.querySelectorAll('.input-tab-action-btn');
        this.outputActionBtns = document.querySelectorAll('.output-action-btn');
    }

    setupEventListeners() {
        // Live combining on input
        this.htmlInput.addEventListener('input', () => {
            this.combineHTML();
        });

        this.cssInput.addEventListener('input', () => {
            this.combineHTML();
        });

        this.jsInput.addEventListener('input', () => {
            this.combineHTML();
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
            this.downloadCombinedHTML();
        });

        // Input tab action buttons
        this.inputTabActionBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const action = btn.dataset.action;
                const type = btn.dataset.type;
                
                if (action === 'clear') {
                    this.clearInput(type);
                }
            });
        });

        // Output action buttons
        this.outputActionBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const action = btn.dataset.action;
                
                if (action === 'download') {
                    this.downloadCombinedHTML();
                } else if (action === 'copy') {
                    this.copyToClipboard();
                } else if (action === 'preview') {
                    this.previewHTML();
                }
            });
        });

        // Prevent default paste behavior and handle it manually
        [this.htmlInput, this.cssInput, this.jsInput].forEach(input => {
            input.addEventListener('paste', (e) => {
                setTimeout(() => this.combineHTML(), 10);
            });
        });
    }

    setupThemeSystem() {
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme') || 'blue';
        const savedMode = localStorage.getItem('theme-mode') || 'dark';
        this.setTheme(savedTheme, savedMode);

        // Theme option listeners
        this.themeOptions.forEach(option => {
            option.addEventListener('click', () => {
                const theme = option.dataset.theme;
                const currentMode = document.documentElement.getAttribute('data-mode') || 'dark';
                this.setTheme(theme, currentMode);
                localStorage.setItem('theme', theme);
            });
        });

        // Mode button listeners
        this.modeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const mode = btn.dataset.mode;
                const currentTheme = document.documentElement.getAttribute('data-theme') || 'blue';
                this.setTheme(currentTheme, mode);
                localStorage.setItem('theme-mode', mode);
            });
        });
    }

    setTheme(theme, mode) {
        document.documentElement.setAttribute('data-theme', theme);
        document.documentElement.setAttribute('data-mode', mode);
        
        // Update active theme option
        this.themeOptions.forEach(option => {
            option.classList.toggle('active', option.dataset.theme === theme);
        });

        // Update active mode button
        this.modeButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.mode === mode);
        });
    }

    setupInputTabSystem() {
        this.inputTabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const tabId = btn.dataset.tab;
                this.switchInputTab(tabId);
            });
        });
    }

    switchInputTab(tabId) {
        // Update tab buttons
        this.inputTabBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tabId);
        });

        // Update tab contents
        this.inputTabContents.forEach(content => {
            content.classList.toggle('active', content.id === `${tabId}-input-tab`);
        });
    }

    setupSoftWrapToggle() {
        // Check for saved soft wrap preference
        const savedSoftWrap = localStorage.getItem('soft-wrap') !== 'false';
        this.softWrapToggle.checked = savedSoftWrap;
        this.applySoftWrap(savedSoftWrap);

        // Soft wrap toggle listener
        this.softWrapToggle.addEventListener('change', (e) => {
            const enabled = e.target.checked;
            this.applySoftWrap(enabled);
            localStorage.setItem('soft-wrap', enabled);
        });
    }

    applySoftWrap(enabled) {
        const textareas = [this.htmlInput, this.cssInput, this.jsInput, this.combinedOutput];
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

    toggleSettingsMenu() {
        this.settingsMenu.classList.toggle('active');
    }

    closeSettingsMenu() {
        this.settingsMenu.classList.remove('active');
    }

    combineHTML() {
        const htmlContent = this.htmlInput.value.trim();
        const cssContent = this.cssInput.value.trim();
        const jsContent = this.jsInput.value.trim();

        if (!htmlContent && !cssContent && !jsContent) {
            this.combinedOutput.value = '';
            return;
        }

        try {
            let combinedHTML = this.createCombinedHTML(htmlContent, cssContent, jsContent);
            this.updateOutput(combinedHTML);
        } catch (error) {
            console.error('Error combining HTML:', error);
            this.showNotification('Error combining HTML. Please check your input.', 'error');
        }
    }

    createCombinedHTML(htmlContent, cssContent, jsContent) {
        let baseHTML = htmlContent;

        // If no HTML is provided, create a basic structure
        if (!baseHTML) {
            baseHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Combined Document</title>
</head>
<body>
    <h1>Welcome</h1>
    <p>This is a combined HTML document.</p>
</body>
</html>`;
        }

        // Parse the HTML to inject CSS and JS
        try {
            const parser = new DOMParser();
            const doc = parser.parseFromString(baseHTML, 'text/html');
            
            // Check for parsing errors
            const parserError = doc.querySelector('parsererror');
            if (parserError) {
                return this.createCombinedHTMLWithRegex(baseHTML, cssContent, jsContent);
            }

            return this.createCombinedHTMLWithDOM(doc, cssContent, jsContent);
        } catch (error) {
            console.warn('DOM parsing failed, falling back to regex:', error);
            return this.createCombinedHTMLWithRegex(baseHTML, cssContent, jsContent);
        }
    }

    createCombinedHTMLWithDOM(doc, cssContent, jsContent) {
        // Inject CSS into head
        if (cssContent) {
            const head = doc.head || doc.querySelector('head');
            if (head) {
                const styleElement = doc.createElement('style');
                styleElement.textContent = '\n' + this.indentCode(cssContent, 8) + '\n    ';
                head.appendChild(styleElement);
            }
        }

        // Inject JS into body (before closing body tag)
        if (jsContent) {
            const body = doc.body || doc.querySelector('body');
            if (body) {
                const scriptElement = doc.createElement('script');
                scriptElement.textContent = '\n' + this.indentCode(jsContent, 8) + '\n    ';
                body.appendChild(scriptElement);
            }
        }

        // Format and return the combined HTML
        return this.formatHTMLOutput(doc);
    }

    createCombinedHTMLWithRegex(htmlContent, cssContent, jsContent) {
        let combinedHTML = htmlContent;

        // Inject CSS before </head>
        if (cssContent) {
            const headCloseIndex = combinedHTML.toLowerCase().indexOf('</head>');
            if (headCloseIndex !== -1) {
                const indentedCSS = this.indentCode(cssContent, 8);
                const styleTag = `    <style>\n${indentedCSS}\n    </style>\n`;
                combinedHTML = combinedHTML.slice(0, headCloseIndex) + styleTag + combinedHTML.slice(headCloseIndex);
            } else {
                // If no </head> found, add it after <head> or at the beginning
                const headOpenIndex = combinedHTML.toLowerCase().indexOf('<head>');
                if (headOpenIndex !== -1) {
                    const insertIndex = combinedHTML.indexOf('>', headOpenIndex) + 1;
                    const indentedCSS = this.indentCode(cssContent, 8);
                    const styleTag = `\n    <style>\n${indentedCSS}\n    </style>`;
                    combinedHTML = combinedHTML.slice(0, insertIndex) + styleTag + combinedHTML.slice(insertIndex);
                }
            }
        }

        // Inject JS before </body>
        if (jsContent) {
            const bodyCloseIndex = combinedHTML.toLowerCase().lastIndexOf('</body>');
            if (bodyCloseIndex !== -1) {
                const indentedJS = this.indentCode(jsContent, 8);
                const scriptTag = `    <script>\n${indentedJS}\n    </script>\n`;
                combinedHTML = combinedHTML.slice(0, bodyCloseIndex) + scriptTag + combinedHTML.slice(bodyCloseIndex);
            } else {
                // If no </body> found, add it at the end
                const indentedJS = this.indentCode(jsContent, 8);
                const scriptTag = `\n<script>\n${indentedJS}\n</script>`;
                combinedHTML += scriptTag;
            }
        }

        return combinedHTML;
    }

    formatHTMLOutput(doc) {
        const indent = '    '; // 4 spaces for indentation
        let result = '';
        
        // Add DOCTYPE if present
        if (doc.doctype) {
            result += '<!DOCTYPE html>\n';
        }
        
        // Format the document element
        result += this.formatNodeRecursive(doc.documentElement, 0, indent);
        
        return result;
    }

    formatNodeRecursive(node, level, indent) {
        const indentation = indent.repeat(level);
        let result = '';
        
        if (node.nodeType === Node.ELEMENT_NODE) {
            const tagName = node.tagName.toLowerCase();
            const attributes = this.formatAttributes(node);
            
            // Self-closing tags
            const selfClosingTags = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'];
            
            if (selfClosingTags.includes(tagName)) {
                result += `${indentation}<${tagName}${attributes}>\n`;
            } else {
                // Check if element has only text content (no child elements)
                const hasOnlyTextContent = node.childNodes.length === 1 && 
                                         node.childNodes[0].nodeType === Node.TEXT_NODE;
                
                if (hasOnlyTextContent) {
                    const textContent = node.textContent.trim();
                    if (textContent) {
                        result += `${indentation}<${tagName}${attributes}>${textContent}</${tagName}>\n`;
                    } else {
                        result += `${indentation}<${tagName}${attributes}></${tagName}>\n`;
                    }
                } else {
                    result += `${indentation}<${tagName}${attributes}>\n`;
                    
                    // Process child nodes
                    for (const child of node.childNodes) {
                        if (child.nodeType === Node.ELEMENT_NODE) {
                            result += this.formatNodeRecursive(child, level + 1, indent);
                        } else if (child.nodeType === Node.TEXT_NODE) {
                            const textContent = child.textContent.trim();
                            if (textContent) {
                                result += `${indent.repeat(level + 1)}${textContent}\n`;
                            }
                        } else if (child.nodeType === Node.COMMENT_NODE) {
                            result += `${indent.repeat(level + 1)}<!--${child.textContent}-->\n`;
                        }
                    }
                    
                    result += `${indentation}</${tagName}>\n`;
                }
            }
        }
        
        return result;
    }

    formatAttributes(element) {
        let attributes = '';
        for (const attr of element.attributes) {
            attributes += ` ${attr.name}="${attr.value}"`;
        }
        return attributes;
    }

    indentCode(code, indentSize = 4) {
        if (!code || !code.trim()) return code;
        
        const indent = ' '.repeat(indentSize);
        return code
            .split('\n')
            .map(line => {
                const trimmed = line.trim();
                return trimmed ? indent + trimmed : '';
            })
            .join('\n');
    }

    updateOutput(combinedHTML) {
        // Add updating class for smooth transition
        this.combinedOutput.classList.add('updating');

        setTimeout(() => {
            this.combinedOutput.value = combinedHTML;
            this.combinedOutput.classList.remove('updating');
        }, 100);
    }

    clearInput(type) {
        switch (type) {
            case 'html':
                this.htmlInput.value = '';
                this.htmlInput.focus();
                break;
            case 'css':
                this.cssInput.value = '';
                this.cssInput.focus();
                break;
            case 'js':
                this.jsInput.value = '';
                this.jsInput.focus();
                break;
        }
        this.combineHTML();
    }

    downloadCombinedHTML() {
        const content = this.combinedOutput.value;

        if (!content.trim()) {
            this.showNotification('No content to download', 'warning');
            return;
        }

        try {
            const blob = new Blob([content], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'combined.html';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            this.showNotification('combined.html downloaded successfully!', 'success');
        } catch (error) {
            console.error('Download failed:', error);
            this.showNotification('Download failed. Please try again.', 'error');
        }
    }

    async copyToClipboard() {
        const content = this.combinedOutput.value;

        if (!content.trim()) {
            this.showNotification('No content to copy', 'warning');
            return;
        }

        try {
            await navigator.clipboard.writeText(content);
            this.showNotification('Combined HTML copied to clipboard!', 'success');
        } catch (error) {
            console.error('Copy failed:', error);
            // Fallback for older browsers
            try {
                const textarea = document.createElement('textarea');
                textarea.value = content;
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
                this.showNotification('Combined HTML copied to clipboard!', 'success');
            } catch (fallbackError) {
                console.error('Fallback copy failed:', fallbackError);
                this.showNotification('Copy failed. Please try again.', 'error');
            }
        }
    }

    previewHTML() {
        const content = this.combinedOutput.value;

        if (!content.trim()) {
            this.showNotification('No content to preview', 'warning');
            return;
        }

        try {
            const blob = new Blob([content], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            const newWindow = window.open(url, '_blank');
            
            if (newWindow) {
                this.showNotification('Preview opened in new tab!', 'success');
                // Clean up the URL after a delay
                setTimeout(() => {
                    URL.revokeObjectURL(url);
                }, 1000);
            } else {
                this.showNotification('Please allow popups to preview the HTML', 'warning');
            }
        } catch (error) {
            console.error('Preview failed:', error);
            this.showNotification('Preview failed. Please try again.', 'error');
        }
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
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

// Initialize the joiner when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new HTMLJoiner();
});

// Add some sample content for demonstration
document.addEventListener('DOMContentLoaded', () => {
    const sampleHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Awesome Website</title>
</head>
<body>
    <div class="container">
        <h1>Welcome to My Website</h1>
        <p>This is a sample page created with the HTML Joiner.</p>
        <button id="clickMe" class="button">Click Me!</button>
        <div id="output"></div>
    </div>
</body>
</html>`;

    const sampleCSS = `body {
    font-family: Arial, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    margin: 0;
    padding: 20px;
    min-height: 100vh;
}

.container {
    max-width: 800px;
    margin: 0 auto;
    background: white;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.1);
    text-align: center;
}

h1 {
    color: #333;
    margin-bottom: 20px;
    font-size: 2.5rem;
}

p {
    color: #666;
    font-size: 1.1rem;
    margin-bottom: 30px;
}

.button {
    background: linear-gradient(45deg, #667eea, #764ba2);
    color: white;
    padding: 15px 30px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    transition: all 0.3s ease;
}

.button:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

#output {
    margin-top: 20px;
    padding: 15px;
    background: #f8f9fa;
    border-radius: 8px;
    min-height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
}`;

    const sampleJS = `document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('clickMe');
    const output = document.getElementById('output');
    let clickCount = 0;
    
    button.addEventListener('click', function() {
        clickCount++;
        output.innerHTML = \`
            <div style="color: #667eea; font-weight: bold; font-size: 1.2rem;">
                🎉 Button clicked \${clickCount} time(s)! 🎉
            </div>
        \`;
        
        // Add some animation
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
        }, 150);
        
        // Add confetti effect
        if (clickCount % 5 === 0) {
            showConfetti();
        }
    });
    
    function showConfetti() {
        const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c'];
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                createConfetti(colors[Math.floor(Math.random() * colors.length)]);
            }, i * 50);
        }
    }
    
    function createConfetti(color) {
        const confetti = document.createElement('div');
        confetti.style.cssText = \`
            position: fixed;
            width: 10px;
            height: 10px;
            background: \${color};
            top: -10px;
            left: \${Math.random() * 100}vw;
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            animation: fall 3s linear forwards;
        \`;
        
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 3000);
    }
    
    // Add CSS animation for confetti
    const style = document.createElement('style');
    style.textContent = \`
        @keyframes fall {
            to {
                transform: translateY(100vh) rotate(360deg);
                opacity: 0;
            }
        }
    \`;
    document.head.appendChild(style);
    
    console.log('HTML Joiner demo loaded successfully!');
});`;

    // Set sample content after a short delay
    setTimeout(() => {
        const htmlInput = document.getElementById('html-input');
        const cssInput = document.getElementById('css-input');
        const jsInput = document.getElementById('js-input');
        
        if (htmlInput && !htmlInput.value.trim()) {
            htmlInput.value = sampleHTML;
        }
        if (cssInput && !cssInput.value.trim()) {
            cssInput.value = sampleCSS;
        }
        if (jsInput && !jsInput.value.trim()) {
            jsInput.value = sampleJS;
        }
        
        // Trigger combining
        if (htmlInput) {
            htmlInput.dispatchEvent(new Event('input'));
        }
    }, 500);
});