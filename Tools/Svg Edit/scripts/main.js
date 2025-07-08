// Initialize everything
document.addEventListener('DOMContentLoaded', function() {
    initEditor();
    initResizer();
    setupKeyboardShortcuts();
    loadSettings();
    
    // Close settings panel when clicking outside
    document.addEventListener('click', (e) => {
        const panel = document.getElementById('settingsPanel');
        const settingsBtn = e.target.closest('[onclick="toggleSettings()"]');
        
        if (!panel.contains(e.target) && !settingsBtn && panel.classList.contains('open')) {
            toggleSettings();
        }
    });
});