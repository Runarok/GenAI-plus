import Prism from 'prismjs';
import 'prismjs/components/prism-markup-templating';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-javascript';

class HTMLEditor {
  constructor() {
    this.htmlEditor = document.getElementById('htmlEditor');
    this.cssEditor = document.getElementById('cssEditor');
    this.jsEditor = document.getElementById('jsEditor');
    this.htmlHighlight = document.getElementById('htmlHighlight');
    this.cssHighlight = document.getElementById('cssHighlight');
    this.jsHighlight = document.getElementById('jsHighlight');
    this.preview = document.getElementById('preview');
    this.refreshBtn = document.getElementById('refreshBtn');
    this.refreshBtnFloat = document.getElementById('refreshBtnFloat');
    this.statusText = document.getElementById('statusText');
    this.errorCount = document.getElementById('errorCount');
    this.settingsBtn = document.getElementById('settingsBtn');
    this.settingsBtnFloat = document.getElementById('settingsBtnFloat');
    this.settingsOverlay = document.getElementById('settingsOverlay');
    this.closeSettings = document.getElementById('closeSettings');
    this.header = document.getElementById('header');
    this.mainContainer = document.getElementById('mainContainer');
    this.editorSection = document.getElementById('editorSection');
    this.previewSection = document.getElementById('previewSection');
    this.resizeHandle = document.getElementById('resizeHandle');
    
    this.currentTab = 'html';
    this.updateTimeout = null;
    this.liveUpdate = true;
    this.isResizing = false;
    
    this.init();
  }
  
  init() {
    this.setupTabSwitching();
    this.setupEventListeners();
    this.setupSyntaxHighlighting();
    this.setupSettings();
    this.setupResizing();
    this.updatePreview();
    this.updateStatus('Ready');
  }
  
  setupTabSwitching() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        const tabName = button.getAttribute('data-tab');
        
        // Remove active class from all tabs and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding content
        button.classList.add('active');
        document.querySelector(`.tab-content[data-tab="${tabName}"]`).classList.add('active');
        
        this.currentTab = tabName;
        this.updateStatus(`Editing ${tabName.toUpperCase()}`);
        this.updateSyntaxHighlighting();
      });
    });
  }
  
  setupEventListeners() {
    // Auto-update on typing (with debounce)
    [this.htmlEditor, this.cssEditor, this.jsEditor].forEach(editor => {
      editor.addEventListener('input', () => {
        this.updateSyntaxHighlighting();
        if (this.liveUpdate) {
          clearTimeout(this.updateTimeout);
          this.updateTimeout = setTimeout(() => {
            this.updatePreview();
          }, 300); // Reduced debounce for better responsiveness
        }
      });
      
      editor.addEventListener('keydown', (e) => {
        // Handle Tab key for indentation
        if (e.key === 'Tab') {
          e.preventDefault();
          this.insertTab(editor);
        }
      });
      
      editor.addEventListener('scroll', () => {
        this.syncScroll(editor);
      });
    });
    
    // Refresh buttons (both header and floating)
    [this.refreshBtn, this.refreshBtnFloat].forEach(btn => {
      if (btn) {
        btn.addEventListener('click', () => {
          this.updatePreview();
          this.updateStatus('Preview refreshed');
        });
      }
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
      this.debounce(() => {
        this.updateStatus('Layout adjusted for screen size');
      }, 300);
    });
  }
  
  setupSyntaxHighlighting() {
    this.updateSyntaxHighlighting();
  }
  
  updateSyntaxHighlighting() {
    const editors = [
      { editor: this.htmlEditor, highlight: this.htmlHighlight, language: 'html' },
      { editor: this.cssEditor, highlight: this.cssHighlight, language: 'css' },
      { editor: this.jsEditor, highlight: this.jsHighlight, language: 'javascript' }
    ];
    
    editors.forEach(({ editor, highlight, language }) => {
      if (editor && highlight) {
        const code = editor.value;
        const highlightedCode = Prism.highlight(code, Prism.languages[language], language);
        highlight.querySelector('code').innerHTML = highlightedCode;
        this.syncScroll(editor);
      }
    });
  }
  
  syncScroll(editor) {
    let highlight;
    if (editor === this.htmlEditor) highlight = this.htmlHighlight;
    else if (editor === this.cssEditor) highlight = this.cssHighlight;
    else if (editor === this.jsEditor) highlight = this.jsHighlight;
    
    if (highlight) {
      highlight.scrollTop = editor.scrollTop;
      highlight.scrollLeft = editor.scrollLeft;
    }
  }
  
  setupSettings() {
    // Settings buttons (both header and floating)
    [this.settingsBtn, this.settingsBtnFloat].forEach(btn => {
      if (btn) {
        btn.addEventListener('click', () => {
          this.settingsOverlay.classList.add('active');
        });
      }
    });
    
    // Close settings
    this.closeSettings.addEventListener('click', () => {
      this.settingsOverlay.classList.remove('active');
    });
    
    // Close on overlay click
    this.settingsOverlay.addEventListener('click', (e) => {
      if (e.target === this.settingsOverlay) {
        this.settingsOverlay.classList.remove('active');
      }
    });
    
    // Theme switching
    const themeOptions = document.querySelectorAll('.theme-option');
    themeOptions.forEach(option => {
      option.addEventListener('click', () => {
        const theme = option.getAttribute('data-theme');
        this.setTheme(theme);
        
        // Update active state
        themeOptions.forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');
      });
    });
    
    // Toggle header
    const toggleHeader = document.getElementById('toggleHeader');
    toggleHeader.addEventListener('change', () => {
      if (toggleHeader.checked) {
        this.header.classList.remove('hidden');
      } else {
        this.header.classList.add('hidden');
      }
    });
    
    // Toggle live update
    const toggleLiveUpdate = document.getElementById('toggleLiveUpdate');
    toggleLiveUpdate.addEventListener('change', () => {
      this.liveUpdate = toggleLiveUpdate.checked;
      this.updateStatus(this.liveUpdate ? 'Live updates enabled' : 'Live updates disabled');
    });
    
    // View mode buttons
    const viewModeButtons = document.querySelectorAll('.view-mode-btn');
    viewModeButtons.forEach(button => {
      button.addEventListener('click', () => {
        const mode = button.getAttribute('data-mode');
        this.setViewMode(mode);
        
        // Update active state
        viewModeButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
      });
    });
  }
  
  setupResizing() {
    let startX, startWidth;
    
    this.resizeHandle.addEventListener('mousedown', (e) => {
      this.isResizing = true;
      startX = e.clientX;
      startWidth = this.editorSection.offsetWidth;
      
      // Add resizing class for performance optimization
      this.mainContainer.classList.add('resizing');
      
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
      
      e.preventDefault();
    });
    
    const handleMouseMove = (e) => {
      if (!this.isResizing) return;
      
      const deltaX = e.clientX - startX;
      const newWidth = startWidth + deltaX;
      const containerWidth = this.mainContainer.offsetWidth;
      const minWidth = 300;
      const maxWidth = containerWidth - 300 - 4; // 4px for resize handle
      
      if (newWidth >= minWidth && newWidth <= maxWidth) {
        const percentage = (newWidth / containerWidth) * 100;
        const remainingPercentage = 100 - percentage;
        
        // Use transform for smoother performance during drag
        requestAnimationFrame(() => {
          this.mainContainer.style.gridTemplateColumns = `${percentage}% auto ${remainingPercentage}%`;
        });
      }
      
      e.preventDefault();
    };
    
    const handleMouseUp = () => {
      this.isResizing = false;
      
      // Remove resizing class
      this.mainContainer.classList.remove('resizing');
      
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }
  
  setTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('editor-theme', theme);
    this.updateStatus(`Theme changed to ${theme}`);
  }
  
  setViewMode(mode) {
    this.mainContainer.className = `main-container ${mode === 'split' ? '' : mode + '-only'}`;
    this.updateStatus(`View mode: ${mode}`);
  }
  
  insertTab(editor) {
    const start = editor.selectionStart;
    const end = editor.selectionEnd;
    const value = editor.value;
    
    editor.value = value.substring(0, start) + '  ' + value.substring(end);
    editor.selectionStart = editor.selectionEnd = start + 2;
    
    this.updateSyntaxHighlighting();
  }
  
  updatePreview() {
    try {
      const html = this.htmlEditor.value;
      const css = this.cssEditor.value;
      const js = this.jsEditor.value;
      
      const fullHTML = this.combineCode(html, css, js);
      
      // Create a blob URL for the iframe
      const blob = new Blob([fullHTML], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      
      // Update iframe source
      this.preview.src = url;
      
      // Clean up previous blob URL
      this.preview.onload = () => {
        URL.revokeObjectURL(url);
      };
      
      this.updateStatus('Preview updated successfully');
      this.hideErrors();
      
    } catch (error) {
      this.showError('Error updating preview: ' + error.message);
      console.error('Preview update error:', error);
    }
  }
  
  combineCode(html, css, js) {
    // If HTML already contains a complete document, inject CSS and JS into it
    if (html.toLowerCase().includes('<!doctype') || html.toLowerCase().includes('<html')) {
      let combinedHTML = html;
      
      // Inject CSS
      if (css.trim()) {
        const cssTag = `<style>${css}</style>`;
        if (combinedHTML.toLowerCase().includes('</head>')) {
          combinedHTML = combinedHTML.replace(/<\/head>/i, `${cssTag}\n</head>`);
        } else if (combinedHTML.toLowerCase().includes('<head>')) {
          combinedHTML = combinedHTML.replace(/<head>/i, `<head>\n${cssTag}`);
        } else {
          // If no head tag, add it
          combinedHTML = combinedHTML.replace(/<html[^>]*>/i, '$&\n<head>\n' + cssTag + '\n</head>');
        }
      }
      
      // Inject JS
      if (js.trim()) {
        const jsTag = `<script>${js}</script>`;
        if (combinedHTML.toLowerCase().includes('</body>')) {
          combinedHTML = combinedHTML.replace(/<\/body>/i, `${jsTag}\n</body>`);
        } else {
          combinedHTML += `\n${jsTag}`;
        }
      }
      
      return combinedHTML;
    } else {
      // Create a complete HTML document
      return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Live Preview</title>
    ${css.trim() ? `<style>${css}</style>` : ''}
</head>
<body>
    ${html}
    ${js.trim() ? `<script>${js}</script>` : ''}
</body>
</html>`;
    }
  }
  
  updateStatus(message) {
    this.statusText.textContent = message;
    
    // Clear status after 3 seconds
    setTimeout(() => {
      if (this.statusText.textContent === message) {
        this.statusText.textContent = 'Ready';
      }
    }, 3000);
  }
  
  showError(message) {
    this.statusText.textContent = message;
    this.statusText.style.color = 'var(--error-color)';
    this.errorCount.textContent = '1 error';
    this.errorCount.classList.remove('hidden');
    
    setTimeout(() => {
      this.hideErrors();
    }, 5000);
  }
  
  hideErrors() {
    this.statusText.style.color = '';
    this.errorCount.classList.add('hidden');
  }
  
  debounce(func, wait) {
    clearTimeout(this.updateTimeout);
    this.updateTimeout = setTimeout(func, wait);
  }
}

// Initialize the editor when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const editor = new HTMLEditor();
  
  // Load saved theme
  const savedTheme = localStorage.getItem('editor-theme');
  if (savedTheme) {
    editor.setTheme(savedTheme);
    const themeOption = document.querySelector(`[data-theme="${savedTheme}"]`);
    if (themeOption) {
      document.querySelectorAll('.theme-option').forEach(opt => opt.classList.remove('active'));
      themeOption.classList.add('active');
    }
  }
});

// Add some helpful console messages
console.log('🚀 HTML Editor Pro loaded successfully!');
console.log('💡 Features:');
console.log('   - Real-time syntax highlighting with Prism.js');
console.log('   - 8 beautiful themes (4 dark, 4 light)');
console.log('   - Resizable panels with drag handle');
console.log('   - Toggle header and live updates');
console.log('   - Multiple view modes (split, code-only, preview-only)');
console.log('   - Professional code editor experience');

// Global error handler for the iframe content
window.addEventListener('error', (event) => {
  console.warn('Preview error:', event.error);
});

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
  // Ctrl/Cmd + Enter to refresh preview
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
    e.preventDefault();
    const refreshBtn = document.getElementById('refreshBtn') || document.getElementById('refreshBtnFloat');
    if (refreshBtn) refreshBtn.click();
  }
  
  // Ctrl/Cmd + 1/2/3 to switch tabs
  if ((e.ctrlKey || e.metaKey) && ['1', '2', '3'].includes(e.key)) {
    e.preventDefault();
    const tabIndex = parseInt(e.key) - 1;
    const tabs = ['html', 'css', 'js'];
    const tabButton = document.querySelector(`[data-tab="${tabs[tabIndex]}"]`);
    if (tabButton) {
      tabButton.click();
    }
  }
  
  // Ctrl/Cmd + , to open settings
  if ((e.ctrlKey || e.metaKey) && e.key === ',') {
    e.preventDefault();
    const settingsBtn = document.getElementById('settingsBtn') || document.getElementById('settingsBtnFloat');
    if (settingsBtn) settingsBtn.click();
  }
  
  // Escape to close settings
  if (e.key === 'Escape') {
    const settingsOverlay = document.getElementById('settingsOverlay');
    if (settingsOverlay.classList.contains('active')) {
      settingsOverlay.classList.remove('active');
    }
  }
});