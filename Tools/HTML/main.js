class HTMLEditor {
  constructor() {
    this.htmlEditor = document.getElementById('htmlEditor');
    this.cssEditor = document.getElementById('cssEditor');
    this.jsEditor = document.getElementById('jsEditor');
    this.preview = document.getElementById('preview');
    this.refreshBtn = document.getElementById('refreshBtn');
    this.statusText = document.getElementById('statusText');
    this.errorCount = document.getElementById('errorCount');
    
    this.currentTab = 'html';
    this.updateTimeout = null;
    
    this.init();
  }
  
  init() {
    this.setupTabSwitching();
    this.setupEventListeners();
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
      });
    });
  }
  
  setupEventListeners() {
    // Auto-update on typing (with debounce)
    [this.htmlEditor, this.cssEditor, this.jsEditor].forEach(editor => {
      editor.addEventListener('input', () => {
        clearTimeout(this.updateTimeout);
        this.updateTimeout = setTimeout(() => {
          this.updatePreview();
        }, 500); // 500ms debounce
      });
      
      editor.addEventListener('keydown', (e) => {
        // Handle Tab key for indentation
        if (e.key === 'Tab') {
          e.preventDefault();
          this.insertTab(editor);
        }
      });
    });
    
    // Refresh button
    this.refreshBtn.addEventListener('click', () => {
      this.updatePreview();
      this.updateStatus('Preview refreshed');
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
      this.debounce(() => {
        this.updateStatus('Layout adjusted for screen size');
      }, 300);
    });
  }
  
  insertTab(editor) {
    const start = editor.selectionStart;
    const end = editor.selectionEnd;
    const value = editor.value;
    
    editor.value = value.substring(0, start) + '  ' + value.substring(end);
    editor.selectionStart = editor.selectionEnd = start + 2;
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
  new HTMLEditor();
});

// Add some helpful console messages
console.log('🚀 HTML Compiler/Editor loaded successfully!');
console.log('💡 Tips:');
console.log('   - Use Tab key for indentation in editors');
console.log('   - Auto-save occurs 500ms after you stop typing');
console.log('   - Click "Refresh" to manually update preview');
console.log('   - Switch between HTML, CSS, and JS tabs to edit different code types');
console.log('   - The preview updates automatically as you type');

// Global error handler for the iframe content
window.addEventListener('error', (event) => {
  console.warn('Preview error:', event.error);
});

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
  // Ctrl/Cmd + Enter to refresh preview
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
    e.preventDefault();
    document.getElementById('refreshBtn').click();
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
});