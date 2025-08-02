        // Theme Management
        const themeToggle = document.getElementById('theme-toggle');
        const body = document.body;
        
        // Load saved theme or default to dark
        const savedTheme = localStorage.getItem('theme') || 'dark';
        body.setAttribute('data-theme', savedTheme);

        themeToggle.addEventListener('click', () => {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });

        // Markdown to HTML Conversion
        const markdownInput = document.getElementById('markdown-input');
        const htmlOutput = document.getElementById('html-output');
        const convertBtn = document.getElementById('convert-btn');
        const downloadBtn = document.getElementById('download-pdf');
        const status = document.getElementById('status');

        function showStatus(message, type = 'success') {
            status.textContent = message;
            status.className = `status ${type}`;
            status.style.display = 'block';
            
            setTimeout(() => {
                status.style.display = 'none';
            }, 3000);
        }

        function convertMarkdown() {
            const markdownText = markdownInput.value.trim();
            
            if (!markdownText) {
                showStatus('Please enter some Markdown content first.', 'error');
                return;
            }

            try {
                // Configure marked options
                marked.setOptions({
                    breaks: true,
                    gfm: true,
                    sanitize: false
                });

                const htmlContent = marked.parse(markdownText);
                htmlOutput.innerHTML = htmlContent;
                showStatus('Markdown converted successfully!');
            } catch (error) {
                console.error('Conversion error:', error);
                showStatus('Error converting Markdown. Please check your syntax.', 'error');
            }
        }

        // Auto-resize textarea functionality
        function autoResize() {
            markdownInput.style.height = 'auto';
            const newHeight = Math.min(Math.max(markdownInput.scrollHeight, 200), window.innerHeight * 0.8);
            markdownInput.style.height = newHeight + 'px';
        }

        // Auto-convert on input (debounced) with auto-resize
        let debounceTimer;
        markdownInput.addEventListener('input', () => {
            autoResize();
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                if (markdownInput.value.trim()) {
                    convertMarkdown();
                }
            }, 500);
        });

        // Initial resize
        markdownInput.addEventListener('focus', autoResize);
        window.addEventListener('resize', autoResize);

        // Manual convert button
        convertBtn.addEventListener('click', convertMarkdown);

        // PDF Download Functionality with simplified approach
        downloadBtn.addEventListener('click', () => {
            const outputContent = htmlOutput.innerHTML;
            
            if (!outputContent || outputContent.includes('Your converted HTML will appear here')) {
                showStatus('Please convert some Markdown content first.', 'error');
                return;
            }

            showStatus('Generating PDF...', 'success');

            // Create PDF-optimized content container
            const pdfContainer = document.createElement('div');
            pdfContainer.innerHTML = outputContent;
            
            // Apply clean PDF styling
            pdfContainer.style.cssText = `
                font-family: 'Times New Roman', serif;
                font-size: 14px;
                line-height: 1.6;
                color: #000;
                background: #fff;
                padding: 40px;
                max-width: 700px;
                margin: 0 auto;
                word-wrap: break-word;
            `;

            // Style all elements for PDF
            const allElements = pdfContainer.querySelectorAll('*');
            allElements.forEach(el => {
                // Remove any existing styles that might conflict
                el.removeAttribute('style');
                
                switch(el.tagName) {
                    case 'H1':
                        el.style.cssText = 'font-size: 24px; font-weight: bold; margin: 20px 0 15px 0; color: #000; page-break-after: avoid;';
                        break;
                    case 'H2':
                        el.style.cssText = 'font-size: 20px; font-weight: bold; margin: 18px 0 12px 0; color: #000; page-break-after: avoid;';
                        break;
                    case 'H3':
                        el.style.cssText = 'font-size: 18px; font-weight: bold; margin: 16px 0 10px 0; color: #000; page-break-after: avoid;';
                        break;
                    case 'H4':
                    case 'H5':
                    case 'H6':
                        el.style.cssText = 'font-size: 16px; font-weight: bold; margin: 14px 0 8px 0; color: #000; page-break-after: avoid;';
                        break;
                    case 'P':
                        el.style.cssText = 'margin: 0 0 12px 0; line-height: 1.6; color: #000;';
                        break;
                    case 'UL':
                    case 'OL':
                        el.style.cssText = 'margin: 12px 0; padding-left: 20px; color: #000;';
                        break;
                    case 'LI':
                        el.style.cssText = 'margin: 4px 0; line-height: 1.5; color: #000;';
                        break;
                    case 'BLOCKQUOTE':
                        el.style.cssText = 'border-left: 3px solid #ccc; padding-left: 15px; margin: 15px 0; font-style: italic; color: #555;';
                        break;
                    case 'CODE':
                        el.style.cssText = 'font-family: Courier, monospace; background: #f5f5f5; padding: 2px 4px; border-radius: 3px; font-size: 13px; color: #000;';
                        break;
                    case 'PRE':
                        el.style.cssText = 'background: #f5f5f5; padding: 12px; border-radius: 4px; margin: 12px 0; overflow: visible; font-family: Courier, monospace; font-size: 12px; color: #000; white-space: pre-wrap;';
                        // Fix code inside pre
                        const codeInPre = el.querySelector('code');
                        if (codeInPre) {
                            codeInPre.style.cssText = 'background: none; padding: 0; font-family: Courier, monospace; color: #000;';
                        }
                        break;
                    case 'TABLE':
                        el.style.cssText = 'border-collapse: collapse; width: 100%; margin: 15px 0; color: #000;';
                        break;
                    case 'TH':
                        el.style.cssText = 'border: 1px solid #ddd; padding: 8px; background: #f0f0f0; font-weight: bold; text-align: left; color: #000;';
                        break;
                    case 'TD':
                        el.style.cssText = 'border: 1px solid #ddd; padding: 8px; text-align: left; color: #000;';
                        break;
                    case 'A':
                        el.style.cssText = 'color: #0066cc; text-decoration: underline;';
                        break;
                    case 'STRONG':
                    case 'B':
                        el.style.cssText = 'font-weight: bold; color: #000;';
                        break;
                    case 'EM':
                    case 'I':
                        el.style.cssText = 'font-style: italic; color: #000;';
                        break;
                }
            });

            // PDF generation options
            const options = {
                margin: 0.5,
                filename: `document-${new Date().toISOString().slice(0, 10)}.pdf`,
                image: { type: 'jpeg', quality: 0.95 },
                html2canvas: { 
                    scale: 2,
                    useCORS: true,
                    allowTaint: true,
                    backgroundColor: '#ffffff'
                },
                jsPDF: { 
                    unit: 'in', 
                    format: 'letter', 
                    orientation: 'portrait' 
                }
            };

            // Generate and download PDF
            html2pdf()
                .set(options)
                .from(pdfContainer)
                .save()
                .then(() => {
                    showStatus('PDF downloaded successfully!');
                })
                .catch((error) => {
                    console.error('PDF Error:', error);
                    showStatus('Error generating PDF. Please try again.', 'error');
                });
        });

        // Initial conversion if there's content
        if (markdownInput.value.trim()) {
            convertMarkdown();
        }