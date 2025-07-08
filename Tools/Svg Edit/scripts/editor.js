let editor;
let currentZoom = 1;
let debounceTimer;
let autoSaveEnabled = true;
let livePreviewEnabled = true;

// Initialize CodeMirror editor
function initEditor() {
    // Load saved SVG code or use default
    const savedCode = localStorage.getItem('svg-editor-code') || `<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <circle cx="100" cy="100" r="80" fill="#007acc" stroke="#ffffff" stroke-width="2"/>
  <text x="100" y="110" text-anchor="middle" fill="white" font-family="Arial" font-size="16">
    Hello SVG!
  </text>
</svg>`;

    editor = CodeMirror(document.getElementById('editor'), {
        mode: 'xml',
        theme: 'dracula',
        lineNumbers: true,
        lineWrapping: false,
        autoCloseTags: true,
        indentUnit: 2,
        tabSize: 2,
        value: savedCode
    });

    editor.on('change', function() {
        if (autoSaveEnabled) {
            localStorage.setItem('svg-editor-code', editor.getValue());
            showAutoSaveIndicator();
        }
        
        if (livePreviewEnabled) {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(updatePreview, 300);
        }
        
        updateStatusBar();
    });

    editor.on('cursorActivity', function() {
        updateCursorPosition();
    });

    // Initial updates
    updatePreview();
    updateStatusBar();
    updateCursorPosition();
}

// Update SVG preview
function updatePreview() {
    if (!livePreviewEnabled) return;
    
    const svgCode = editor.getValue();
    const container = document.getElementById('svgContainer');
    
    try {
        // Clear previous content
        container.innerHTML = '';
        
        if (svgCode.trim() === '') {
            container.innerHTML = '<div style="color: var(--text-muted); text-align: center;">Enter SVG code to see preview</div>';
            return;
        }

        // Create a temporary div to parse SVG
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = svgCode;
        
        // Find SVG element
        const svgElement = tempDiv.querySelector('svg');
        
        if (svgElement) {
            // Apply zoom
            svgElement.style.transform = `scale(${currentZoom})`;
            svgElement.style.transformOrigin = 'center';
            container.appendChild(svgElement);
        } else {
            throw new Error('No valid SVG element found');
        }
    } catch (error) {
        container.innerHTML = `<div class="error-message">
            <strong>SVG Error:</strong><br>
            ${error.message || 'Invalid SVG markup'}
        </div>`;
    }
}

// Editor utility functions
function clearEditor() {
    if (confirm('Are you sure you want to clear the editor?')) {
        editor.setValue('');
        localStorage.removeItem('svg-editor-code');
        updatePreview();
        updateStatusBar();
    }
}

function formatSVG() {
    const svgCode = editor.getValue();
    try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(svgCode, 'image/svg+xml');
        const serializer = new XMLSerializer();
        const formatted = serializer.serializeToString(doc);
        
        // Basic formatting
        const lines = formatted.split('><');
        let indentLevel = 0;
        const formattedLines = lines.map((line, index) => {
            if (index > 0) line = '<' + line;
            if (index < lines.length - 1) line = line + '>';
            
            if (line.includes('</')) indentLevel--;
            const indented = '  '.repeat(Math.max(0, indentLevel)) + line;
            if (line.includes('<') && !line.includes('</') && !line.endsWith('/>')) indentLevel++;
            
            return indented;
        });
        
        editor.setValue(formattedLines.join('\n'));
        showNotification('SVG formatted successfully!');
    } catch (error) {
        showNotification('Failed to format SVG', 'error');
    }
}

function copySVG() {
    const svgCode = editor.getValue();
    navigator.clipboard.writeText(svgCode).then(() => {
        showNotification('SVG copied to clipboard!');
    }).catch(() => {
        showNotification('Failed to copy SVG', 'error');
    });
}

function downloadSVG() {
    const svgCode = editor.getValue();
    const blob = new Blob([svgCode], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'drawing.svg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showNotification('SVG downloaded!');
}

function downloadTXT() {
    const svgCode = editor.getValue();
    const blob = new Blob([svgCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'svg-code.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showNotification('Text file downloaded!');
}