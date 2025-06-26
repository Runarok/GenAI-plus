class HTMLCombiner {
    constructor() {
        this.htmlInput = document.getElementById('html-input');
        this.cssInput = document.getElementById('css-input');
        this.jsInput = document.getElementById('js-input');
        this.combinedOutput = document.getElementById('combined-output');
        
        this.setupEventListeners();
        this.combineHTML(); // Initial combine
    }

    setupEventListeners() {
        // Live combining on input with debouncing
        const debouncedCombine = Utils.debounce(() => this.combineHTML(), 300);
        
        this.htmlInput.addEventListener('input', debouncedCombine);
        this.cssInput.addEventListener('input', debouncedCombine);
        this.jsInput.addEventListener('input', debouncedCombine);

        // Handle paste events
        [this.htmlInput, this.cssInput, this.jsInput].forEach(input => {
            input.addEventListener('paste', () => {
                setTimeout(() => this.combineHTML(), 10);
            });
        });
    }

    combineHTML() {
        const htmlContent = this.htmlInput.value.trim();
        const cssContent = this.cssInput.value.trim();
        const jsContent = this.jsInput.value.trim();

        if (!htmlContent && !cssContent && !jsContent) {
            this.updateOutput('');
            return;
        }

        try {
            const combinedHTML = this.createCombinedHTML(htmlContent, cssContent, jsContent);
            this.updateOutput(combinedHTML);
        } catch (error) {
            console.error('Error combining HTML:', error);
            Utils.showNotification('Error combining HTML. Please check your input.', 'error');
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
            
            // Update preview if it's active
            if (window.previewManager) {
                window.previewManager.updatePreview();
            }
        }, 100);
    }
}