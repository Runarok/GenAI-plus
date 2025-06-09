// Initialize the markdown editor and previewer
class MarkdownEditor {
  constructor() {
    this.input = document.getElementById('markdown-input');
    this.preview = document.getElementById('markdown-preview');
    this.debounceTimer = null;
    
    this.init();
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
      this.syncScroll();
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
  
  console.log('Markdown Editor initialized successfully!');
});

// Export for potential future use
window.MarkdownEditor = MarkdownEditor;