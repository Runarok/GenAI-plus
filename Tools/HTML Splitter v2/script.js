const fileInput = document.getElementById('fileInput');
        const uploadArea = document.getElementById('uploadArea');
        const outputContainer = document.getElementById('outputContainer');
        const errorMessage = document.getElementById('errorMessage');
        const successMessage = document.getElementById('successMessage');

        // Drag and drop functionality
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('dragover');
        });

        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('dragover');
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                handleFile(files[0]);
            }
        });

        uploadArea.addEventListener('click', () => {
            fileInput.click();
        });

        fileInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                handleFile(e.target.files[0]);
            }
        });

        function handleFile(file) {
            if (!file.name.match(/\.(html|htm)$/i)) {
                showError('Please upload a valid HTML file (.html or .htm)');
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const content = e.target.result;
                    splitHTML(content);
                    showSuccess('HTML file processed successfully!');
                } catch (error) {
                    showError('Error processing file: ' + error.message);
                }
            };

            reader.onerror = () => {
                showError('Error reading file');
            };

            reader.readAsText(file);
        }

        function splitHTML(htmlContent) {
            const cssRegex = /<style[^>]*>([\s\S]*?)<\/style>/gi;
            const jsRegex = /<script[^>]*>([\s\S]*?)<\/script>/gi;

            let css = '';
            let js = '';
            let html = htmlContent;

            // Extract CSS
            let cssMatch;
            while ((cssMatch = cssRegex.exec(htmlContent)) !== null) {
                css += cssMatch[1] + '\n\n';
            }

            // Extract JS
            let jsMatch;
            while ((jsMatch = jsRegex.exec(htmlContent)) !== null) {
                js += jsMatch[1] + '\n\n';
            }

            // Remove style and script tags from HTML, preserve proper indentation
            html = html.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '<link rel="stylesheet" href="styles.css">');
            html = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '<script src="script.js"><\/script>');

            // Preserve indentation by formatting
            css = css.trim();
            js = js.trim();
            html = formatHTML(html);

            // Display results
            document.getElementById('htmlOutput').textContent = html;
            document.getElementById('cssOutput').textContent = css || '/* No CSS found */';
            document.getElementById('jsOutput').textContent = js || '// No JavaScript found';

            // Update stats
            updateStats(html, css, js);

            outputContainer.style.display = 'block';
        }

        function formatHTML(html) {
            // Basic HTML formatting to preserve indentation
            let indentLevel = 0;
            const lines = html.split('\n');
            const formatted = lines.map(line => {
                const trimmed = line.trim();
                if (!trimmed) return '';

                // Decrease indent for closing tags
                if (trimmed.startsWith('</')) {
                    indentLevel = Math.max(0, indentLevel - 1);
                }

                const formatted = '    '.repeat(indentLevel) + trimmed;

                // Increase indent for opening tags (but not self-closing)
                if (trimmed.startsWith('<') && !trimmed.startsWith('</') && !trimmed.endsWith('/>') && !['meta', 'link', 'img', 'br', 'hr', 'input'].some(tag => trimmed.includes(`<${tag}`))) {
                    indentLevel++;
                }

                return formatted;
            }).filter(line => line);

            return formatted.join('\n');
        }

        function updateStats(html, css, js) {
            const stats = document.getElementById('stats');
            stats.innerHTML = `
                <div class="stat-card">
                    <div class="stat-value">${html.split('\n').length}</div>
                    <div class="stat-label">HTML Lines</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${css ? css.split('\n').length : 0}</div>
                    <div class="stat-label">CSS Lines</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${js ? js.split('\n').length : 0}</div>
                    <div class="stat-label">JS Lines</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${(html + css + js).length}</div>
                    <div class="stat-label">Total Chars</div>
                </div>
            `;
        }

        function copyCode(elementId) {
            const code = document.getElementById(elementId).textContent;
            navigator.clipboard.writeText(code).then(() => {
                const btn = event.target;
                btn.textContent = '✓ Copied!';
                btn.classList.add('copied');
                setTimeout(() => {
                    btn.textContent = 'Copy';
                    btn.classList.remove('copied');
                }, 2000);
            });
        }

        function copyAllCode() {
            const html = document.getElementById('htmlOutput').textContent;
            const css = document.getElementById('cssOutput').textContent;
            const js = document.getElementById('jsOutput').textContent;
            const allCode = `<!-- HTML -->\n${html}\n\n/* CSS */\n${css}\n\n// JavaScript\n${js}`;
            navigator.clipboard.writeText(allCode);
            showSuccess('All code copied to clipboard!');
        }

        function downloadAllFiles() {
            const html = document.getElementById('htmlOutput').textContent;
            const css = document.getElementById('cssOutput').textContent;
            const js = document.getElementById('jsOutput').textContent;

            downloadFile(html, 'index.html', 'text/html');
            downloadFile(css, 'styles.css', 'text/css');
            downloadFile(js, 'script.js', 'text/javascript');
        }

        function downloadFile(content, filename, type) {
            const blob = new Blob([content], { type });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }

        function clearOutput() {
            outputContainer.style.display = 'none';
            fileInput.value = '';
            uploadArea.classList.remove('dragover');
        }

        function showError(message) {
            errorMessage.textContent = message;
            errorMessage.classList.add('show');
            setTimeout(() => errorMessage.classList.remove('show'), 5000);
        }

        function showSuccess(message) {
            successMessage.textContent = message;
            successMessage.classList.add('show');
            setTimeout(() => successMessage.classList.remove('show'), 5000);
        }