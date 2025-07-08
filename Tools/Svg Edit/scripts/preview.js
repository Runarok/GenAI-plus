// Zoom functions
function zoomIn() {
    currentZoom = Math.min(currentZoom * 1.2, 5);
    updateZoom();
}

function zoomOut() {
    currentZoom = Math.max(currentZoom / 1.2, 0.1);
    updateZoom();
}

function resetZoom() {
    currentZoom = 1;
    updateZoom();
}

function updateZoom() {
    document.getElementById('zoomLevel').textContent = Math.round(currentZoom * 100) + '%';
    updatePreview();
}

// Fullscreen toggle
function toggleFullscreen() {
    const previewContent = document.getElementById('previewContent');
    previewContent.classList.toggle('fullscreen');
}

// Resizer functionality
function initResizer() {
    const resizer = document.getElementById('resizer');
    const editorPane = document.querySelector('.editor-pane');
    const previewPane = document.querySelector('.preview-pane');
    let isResizing = false;
    
    resizer.addEventListener('mousedown', (e) => {
        isResizing = true;
        document.addEventListener('mousemove', handleResize);
        document.addEventListener('mouseup', stopResize);
        e.preventDefault();
    });
    
    function handleResize(e) {
        if (!isResizing) return;
        
        const container = document.querySelector('.container');
        const containerRect = container.getBoundingClientRect();
        const newEditorWidth = e.clientX - containerRect.left;
        const minWidth = 300;
        const maxWidth = containerRect.width - minWidth - 4;
        
        if (newEditorWidth >= minWidth && newEditorWidth <= maxWidth) {
            editorPane.style.flex = `0 0 ${newEditorWidth}px`;
            previewPane.style.flex = '1';
        }
    }
    
    function stopResize() {
        isResizing = false;
        document.removeEventListener('mousemove', handleResize);
        document.removeEventListener('mouseup', stopResize);
    }
}