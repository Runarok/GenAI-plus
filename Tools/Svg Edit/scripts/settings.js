// Theme management
function changeTheme() {
    const theme = document.getElementById('themeSelect').value;
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('svg-editor-theme', theme);
}

function changeEditorTheme() {
    const theme = document.getElementById('editorThemeSelect').value;
    editor.setOption('theme', theme);
    localStorage.setItem('svg-editor-editor-theme', theme);
}

function changeFontSize() {
    const fontSize = document.getElementById('fontSizeSelect').value;
    editor.getWrapperElement().style.fontSize = fontSize + 'px';
    localStorage.setItem('svg-editor-font-size', fontSize);
}

// Quality of life features
function toggleLineWrapping() {
    const enabled = document.getElementById('lineWrappingToggle').checked;
    editor.setOption('lineWrapping', enabled);
    localStorage.setItem('svg-editor-line-wrapping', enabled);
}

function toggleAutoSave() {
    autoSaveEnabled = document.getElementById('autoSaveToggle').checked;
    localStorage.setItem('svg-editor-auto-save', autoSaveEnabled);
    
    if (autoSaveEnabled) {
        localStorage.setItem('svg-editor-code', editor.getValue());
        showNotification('Auto-save enabled');
    } else {
        showNotification('Auto-save disabled');
    }
}

function toggleLivePreview() {
    livePreviewEnabled = document.getElementById('livePreviewToggle').checked;
    localStorage.setItem('svg-editor-live-preview', livePreviewEnabled);
    
    if (livePreviewEnabled) {
        updatePreview();
        showNotification('Live preview enabled');
    } else {
        document.getElementById('svgContainer').innerHTML = '<div style="color: var(--text-muted); text-align: center;">Live preview disabled</div>';
        showNotification('Live preview disabled');
    }
}

// Load saved settings
function loadSettings() {
    const savedTheme = localStorage.getItem('svg-editor-theme') || 'dark';
    const savedEditorTheme = localStorage.getItem('svg-editor-editor-theme') || 'dracula';
    const savedFontSize = localStorage.getItem('svg-editor-font-size') || '14';
    const savedLineWrapping = localStorage.getItem('svg-editor-line-wrapping') === 'true';
    const savedAutoSave = localStorage.getItem('svg-editor-auto-save') !== 'false';
    const savedLivePreview = localStorage.getItem('svg-editor-live-preview') !== 'false';
    
    document.getElementById('themeSelect').value = savedTheme;
    document.getElementById('editorThemeSelect').value = savedEditorTheme;
    document.getElementById('fontSizeSelect').value = savedFontSize;
    document.getElementById('lineWrappingToggle').checked = savedLineWrapping;
    document.getElementById('autoSaveToggle').checked = savedAutoSave;
    document.getElementById('livePreviewToggle').checked = savedLivePreview;
    
    document.body.setAttribute('data-theme', savedTheme);
    autoSaveEnabled = savedAutoSave;
    livePreviewEnabled = savedLivePreview;
    
    // Apply settings after editor is initialized
    setTimeout(() => {
        editor.setOption('theme', savedEditorTheme);
        editor.setOption('lineWrapping', savedLineWrapping);
        editor.getWrapperElement().style.fontSize = savedFontSize + 'px';
    }, 100);
}

// Settings panel
function toggleSettings() {
    const panel = document.getElementById('settingsPanel');
    const overlay = document.getElementById('settingsOverlay');
    panel.classList.toggle('open');
    overlay.classList.toggle('open');
}