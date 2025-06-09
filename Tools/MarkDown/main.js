// Initialize the markdown editor and previewer
class MarkdownEditor {
  constructor() {
    this.input = document.getElementById('markdown-input');
    this.preview = document.getElementById('markdown-preview');
    this.debounceTimer = null;
    this.syncScrollEnabled = true;
    this.wordWrapEnabled = true;
    
    this.init();
    this.initSettings();
  }
  
  init() {
    // Configure marked.js options for GitHub-like rendering
    marked.setOptions({
      breaks: true,
      gfm: true,
      headerIds: true,
      mangle: false,
      pedantic: false,
      sanitize: false,
      silent: false,
      smartLists: true,
      smartypants: false,
      xhtml: false,
      highlight: function(code, lang) {
        // Basic syntax highlighting would go here
        // For now, we'll just return the code as-is
        return code;
      }
    });
    
    // Set up event listeners
    this.setupEventListeners();
    
    // Initial render with placeholder content
    this.updatePreview();
    
    // Focus on the input
    this.input.focus();
  }
  
  initSettings() {
    const settingsBtn = document.getElementById('settings-btn');
    const settingsPanel = document.getElementById('settings-panel');
    const settingsOverlay = document.getElementById('settings-overlay');
    const closeSettings = document.getElementById('close-settings');
    
    // Theme buttons
    const themeButtons = document.querySelectorAll('.theme-btn');
    const fitToScreenToggle = document.getElementById('fit-to-screen');
    const syncScrollToggle = document.getElementById('sync-scroll');
    const wordWrapToggle = document.getElementById('word-wrap');
    
    // Load saved settings
    this.loadSettings();
    
    // Settings panel toggle
    settingsBtn.addEventListener('click', () => {
      settingsPanel.classList.add('active');
      settingsOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
    
    const closeSettingsPanel = () => {
      settingsPanel.classList.remove('active');
      settingsOverlay.classList.remove('active');
      document.body.style.overflow = '';
    };
    
    closeSettings.addEventListener('click', closeSettingsPanel);
    settingsOverlay.addEventListener('click', closeSettingsPanel);
    
    // Theme switching
    themeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const theme = btn.dataset.theme;
        this.setTheme(theme);
        
        // Update active state
        themeButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });
    
    // Fit to screen toggle
    fitToScreenToggle.addEventListener('change', (e) => {
      this.toggleFitToScreen(e.target.checked);
    });
    
    // Sync scroll toggle
    syncScrollToggle.addEventListener('change', (e) => {
      this.syncScrollEnabled = e.target.checked;
      this.saveSettings();
    });
    
    // Word wrap toggle
    wordWrapToggle.addEventListener('change', (e) => {
      this.wordWrapEnabled = e.target.checked;
      this.toggleWordWrap(e.target.checked);
    });
    
    // Keyboard shortcut for settings
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.key === ',') {
        e.preventDefault();
        settingsBtn.click();
      }
      if (e.key === 'Escape' && settingsPanel.classList.contains('active')) {
        closeSettingsPanel();
      }
    });
  }
  
  setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('markdown-editor-theme', theme);
  }
  
  toggleFitToScreen(enabled) {
    const header = document.getElementById('main-header');
    const container = document.querySelector('.editor-container');
    
    if (enabled) {
      header.classList.add('hidden');
      container.classList.add('fit-to-screen');
    } else {
      header.classList.remove('hidden');
      container.classList.remove('fit-to-screen');
    }
    
    localStorage.setItem('markdown-editor-fit-to-screen', enabled);
  }
  
  toggleWordWrap(enabled) {
    if (enabled) {
      this.input.classList.remove('no-wrap');
    } else {
      this.input.classList.add('no-wrap');
    }
    
    localStorage.setItem('markdown-editor-word-wrap', enabled);
  }
  
  loadSettings() {
    // Load theme
    const savedTheme = localStorage.getItem('markdown-editor-theme') || 'dark';
    this.setTheme(savedTheme);
    
    // Update active theme button
    const themeBtn = document.querySelector(`[data-theme="${savedTheme}"]`);
    if (themeBtn) {
      document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
      themeBtn.classList.add('active');
    }
    
    // Load fit to screen
    const fitToScreen = localStorage.getItem('markdown-editor-fit-to-screen') === 'true';
    document.getElementById('fit-to-screen').checked = fitToScreen;
    this.toggleFitToScreen(fitToScreen);
    
    // Load sync scroll
    const syncScroll = localStorage.getItem('markdown-editor-sync-scroll') !== 'false';
    this.syncScrollEnabled = syncScroll;
    document.getElementById('sync-scroll').checked = syncScroll;
    
    // Load word wrap
    const wordWrap = localStorage.getItem('markdown-editor-word-wrap') !== 'false';
    this.wordWrapEnabled = wordWrap;
    document.getElementById('word-wrap').checked = wordWrap;
    this.toggleWordWrap(wordWrap);
  }
  
  saveSettings() {
    localStorage.setItem('markdown-editor-sync-scroll', this.syncScrollEnabled);
  }
  
  setupEventListeners() {
    // Update preview on input with debouncing for better performance
    this.input.addEventListener('input', () => {
      this.debounceUpdate();
    });
    
    // Handle tab key for better textarea experience
    this.input.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        this.insertTab();
      }
    });
    
    // Sync scroll positions (optional enhancement)
    this.input.addEventListener('scroll', () => {
      if (this.syncScrollEnabled) {
        this.syncScroll();
      }
    });
  }
  
  debounceUpdate() {
    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      this.updatePreview();
    }, 150); // 150ms debounce
  }
  
  updatePreview() {
    const markdownText = this.input.value;
    
    if (!markdownText.trim()) {
      this.preview.innerHTML = '<div class="preview-loading">Start typing to see the preview...</div>';
      return;
    }
    
    try {
      // Convert markdown to HTML
      const html = marked.parse(markdownText);
      this.preview.innerHTML = html;
    } catch (error) {
      console.error('Error parsing markdown:', error);
      this.preview.innerHTML = '<div class="preview-loading">Error parsing markdown. Please check your syntax.</div>';
    }
  }
  
  insertTab() {
    const start = this.input.selectionStart;
    const end = this.input.selectionEnd;
    const value = this.input.value;
    
    // Insert tab character
    this.input.value = value.substring(0, start) + '  ' + value.substring(end);
    
    // Move cursor to after the inserted tab
    this.input.selectionStart = this.input.selectionEnd = start + 2;
    
    // Trigger update
    this.debounceUpdate();
  }
  
  syncScroll() {
    // Sync scroll position between editor and preview
    const scrollPercentage = this.input.scrollTop / (this.input.scrollHeight - this.input.clientHeight);
    const previewScrollTop = scrollPercentage * (this.preview.scrollHeight - this.preview.clientHeight);
    
    if (isFinite(previewScrollTop)) {
      this.preview.scrollTop = previewScrollTop;
    }
  }
}

// Utility function to handle window resize and update layout
function handleResize() {
  // Force a repaint to handle any layout issues
  document.body.style.display = 'none';
  document.body.offsetHeight; // Trigger reflow
  document.body.style.display = 'block';
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new MarkdownEditor();
  
  // Handle window resize
  window.addEventListener('resize', handleResize);
  
  console.log('Markdown Editor with Settings initialized successfully!');
});

// Export for potential future use
window.MarkdownEditor = MarkdownEditor;