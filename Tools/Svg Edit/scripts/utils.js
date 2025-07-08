// Status bar updates
function updateStatusBar() {
    const content = editor.getValue();
    const size = new Blob([content]).size;
    document.getElementById('fileSize').textContent = `${size} bytes`;
}

function updateCursorPosition() {
    const cursor = editor.getCursor();
    document.getElementById('cursorPosition').textContent = `Line ${cursor.line + 1}, Col ${cursor.ch + 1}`;
}

function showAutoSaveIndicator() {
    const indicator = document.getElementById('autoSaveIndicator');
    indicator.classList.add('show');
    setTimeout(() => {
        indicator.classList.remove('show');
    }, 2000);
}

// Notification system
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = 'notification show';
    
    if (type === 'error') {
        notification.style.backgroundColor = 'var(--error)';
    } else {
        notification.style.backgroundColor = 'var(--success)';
    }
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Keyboard shortcuts
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey || e.metaKey) {
            switch (e.key) {
                case 's':
                    e.preventDefault();
                    downloadSVG();
                    break;
                case 'c':
                    if (e.shiftKey) {
                        e.preventDefault();
                        copySVG();
                    }
                    break;
                case 'l':
                    e.preventDefault();
                    clearEditor();
                    break;
                case 'f':
                    if (e.shiftKey) {
                        e.preventDefault();
                        formatSVG();
                    }
                    break;
            }
        }
        
        if (e.key === 'F11') {
            e.preventDefault();
            toggleFullscreen();
        }
    });
}