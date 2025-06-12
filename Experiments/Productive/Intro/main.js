// Theme management
const THEMES = [
  'dark-default', 'dark-blue', 'dark-purple', 'dark-green', 'dark-orange',
  'light-default', 'light-blue', 'light-purple', 'light-green', 'light-orange'
];

// Global state
let chapters = [];
let currentChapter = null;

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
  initializeTheme();
  initializeEventListeners();
  loadChapters();
});

// Theme initialization
function initializeTheme() {
  const savedTheme = localStorage.getItem('theme') || 'dark-default';
  applyTheme(savedTheme);
}

function applyTheme(theme) {
  document.body.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  
  // Update active theme button
  const themeButtons = document.querySelectorAll('.theme-btn');
  themeButtons.forEach(btn => {
    btn.classList.remove('active');
    if (btn.getAttribute('data-theme') === theme) {
      btn.classList.add('active');
    }
  });
}

// Event listeners
function initializeEventListeners() {
  // Settings button
  const settingsBtn = document.getElementById('settingsBtn');
  const modalOverlay = document.getElementById('modalOverlay');
  const modalClose = document.getElementById('modalClose');
  
  settingsBtn.addEventListener('click', () => {
    modalOverlay.classList.add('active');
  });
  
  modalClose.addEventListener('click', () => {
    modalOverlay.classList.remove('active');
  });
  
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.classList.remove('active');
    }
  });
  
  // Theme buttons
  const themeButtons = document.querySelectorAll('.theme-btn');
  themeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const theme = btn.getAttribute('data-theme');
      applyTheme(theme);
    });
  });
  
  // Escape key to close modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      modalOverlay.classList.remove('active');
    }
  });
}

// Chapter loading
async function loadChapters() {
  try {
    // Simulate loading chapters from a folder
    // In a real implementation, you'd need a server endpoint or file system access
    const sampleChapters = [
      { name: 'introduction.md', title: 'Introduction' },
      { name: 'getting-started.md', title: 'Getting Started' },
      { name: 'advanced-features.md', title: 'Advanced Features' },
      { name: 'troubleshooting.md', title: 'Troubleshooting' },
      { name: 'conclusion.md', title: 'Conclusion' }
    ];
    
    chapters = sampleChapters;
    renderChapterList();
  } catch (error) {
    console.error('Error loading chapters:', error);
    document.getElementById('chapterList').innerHTML = '<li class="loading">Error loading chapters</li>';
  }
}

function renderChapterList() {
  const chapterList = document.getElementById('chapterList');
  
  if (chapters.length === 0) {
    chapterList.innerHTML = '<li class="loading">No chapters found</li>';
    return;
  }
  
  const listHTML = chapters.map(chapter => 
    `<li><a href="#" onclick="loadChapter('${chapter.name}')">${chapter.title}</a></li>`
  ).join('');
  
  chapterList.innerHTML = listHTML;
}

async function loadChapter(chapterName) {
  try {
    // Update active chapter
    const links = document.querySelectorAll('.chapter-list a');
    links.forEach(link => link.classList.remove('active'));
    event.target.classList.add('active');
    
    // Show loading state
    const contentTitle = document.getElementById('contentTitle');
    const contentBody = document.getElementById('contentBody');
    
    const chapter = chapters.find(c => c.name === chapterName);
    contentTitle.textContent = chapter ? chapter.title : 'Loading...';
    contentBody.innerHTML = '<div class="loading">Loading chapter...</div>';
    
    // Simulate loading chapter content
    // In a real implementation, you'd fetch the actual file
    const content = await getChapterContent(chapterName);
    
    // Render markdown content
    const htmlContent = marked.parse(content);
    contentBody.innerHTML = htmlContent;
    
    currentChapter = chapterName;
    
  } catch (error) {
    console.error('Error loading chapter:', error);
    document.getElementById('contentBody').innerHTML = '<div class="loading">Error loading chapter</div>';
  }
}

// Simulate getting chapter content
async function getChapterContent(chapterName) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Sample content for each chapter
  const sampleContent = {
    'introduction.md': `# Introduction

Welcome to this comprehensive guide! This document will walk you through everything you need to know.

## What You'll Learn

- Basic concepts and terminology
- Step-by-step tutorials
- Advanced techniques
- Best practices

> This is a **markdown** document that supports all standard markdown features including *italic text*, **bold text**, and \`inline code\`.

## Getting Started

To begin, simply select a chapter from the sidebar navigation. Each chapter builds upon the previous one, so we recommend reading them in order.

### Features

- 📚 **Rich Content**: Full markdown support with HTML integration
- 🎨 **Beautiful Themes**: Choose from 10 carefully crafted themes
- 📱 **Responsive**: Works perfectly on all devices
- ⚡ **Fast Loading**: Optimized for performance

\`\`\`javascript
// Sample code block
function hello() {
  console.log("Hello, world!");
}
\`\`\`

Let's dive in!`,

    'getting-started.md': `# Getting Started

This chapter will help you set up everything you need to begin your journey.

## Prerequisites

Before we start, make sure you have:

1. A modern web browser
2. Basic understanding of web technologies
3. Enthusiasm to learn!

## Installation

There's no installation required! This is a web-based application that runs directly in your browser.

### Browser Compatibility

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

## First Steps

1. **Explore the Interface**: Take a moment to familiarize yourself with the layout
2. **Try Different Themes**: Click the settings button to explore different color schemes
3. **Navigate Chapters**: Use the sidebar to jump between different sections

### Tips for Success

> **Pro Tip**: Bookmark this page for easy access later!

Remember, learning is a journey. Take your time and don't hesitate to revisit previous chapters if needed.

## What's Next?

In the next chapter, we'll explore the advanced features available in this hub.`,

    'advanced-features.md': `# Advanced Features

Now that you're familiar with the basics, let's explore some of the more advanced capabilities.

## Theme Customization

This hub includes 10 carefully designed themes:

### Dark Themes
- **Dark Default**: The classic dark theme with blue accents
- **Midnight Blue**: Deep blue tones for a calming experience
- **Deep Purple**: Rich purple hues for creativity
- **Forest Green**: Natural green colors for focus
- **Dark Orange**: Warm orange tones for energy

### Light Themes
- **Light Default**: Clean and bright with blue accents
- **Sky Blue**: Airy and spacious feeling
- **Lavender**: Soft purple for gentle reading
- **Mint Green**: Fresh and clean appearance
- **Warm Orange**: Cozy and inviting atmosphere

## Markdown Support

This hub supports full Markdown syntax including:

### Text Formatting
- *Italic text*
- **Bold text**
- ***Bold and italic***
- ~~Strikethrough~~
- \`Inline code\`

### Lists
- Unordered lists
- Ordered lists
- Nested lists
  - Like this one
  - And this

### Code Blocks

\`\`\`html
<div class="example">
  <h2>HTML is also supported!</h2>
  <p>You can mix HTML with Markdown seamlessly.</p>
</div>
\`\`\`

### Tables

| Feature | Supported | Notes |
|---------|-----------|-------|
| Headers | ✅ | All levels |
| Lists | ✅ | Ordered and unordered |
| Code | ✅ | Inline and blocks |
| Tables | ✅ | Like this one! |

## Responsive Design

The interface automatically adapts to your screen size, providing an optimal reading experience on any device.`,

    'troubleshooting.md': `# Troubleshooting

Having issues? This chapter covers common problems and their solutions.

## Common Issues

### Theme Not Loading
If themes aren't applying correctly:
1. Clear your browser cache
2. Refresh the page
3. Try a different browser

### Chapters Not Loading
If chapters aren't appearing:
1. Check your internet connection
2. Try refreshing the page
3. Ensure JavaScript is enabled

### Content Not Displaying
If markdown content isn't rendering:
1. Verify the file format is correct
2. Check for syntax errors in the markdown
3. Ensure the file is properly encoded

## Browser Compatibility

### Supported Browsers
- Google Chrome (recommended)
- Mozilla Firefox
- Safari
- Microsoft Edge

### Unsupported Browsers
- Internet Explorer (all versions)
- Very old browser versions

## Getting Help

If you're still experiencing issues:

1. **Check the Console**: Open browser developer tools and look for error messages
2. **Try Incognito Mode**: Test if the issue persists in a private browsing window
3. **Update Your Browser**: Ensure you're using the latest version

### Contact Information

For additional support, please reach out through the appropriate channels in your organization.

## FAQ

**Q: Can I add my own chapters?**
A: Yes! Simply add markdown files to the chapters folder.

**Q: Can I customize the themes?**
A: The themes are pre-defined, but you can modify the CSS for custom styling.

**Q: Is this mobile-friendly?**
A: Absolutely! The interface is fully responsive and works great on mobile devices.`,

    'conclusion.md': `# Conclusion

Congratulations! You've reached the end of this guide.

## What You've Learned

Throughout this guide, you've discovered:

- ✅ How to navigate the interface
- ✅ How to switch between themes
- ✅ How to read markdown content
- ✅ How to troubleshoot common issues

## Key Takeaways

1. **Flexibility**: This hub can handle both Markdown and HTML content
2. **Customization**: Choose from 10 beautiful themes to suit your preference
3. **Accessibility**: Responsive design ensures a great experience on any device
4. **Simplicity**: No complex setup required - just open and read

## Next Steps

Now that you're familiar with the basics, consider:

- Exploring all available themes
- Adding your own content
- Sharing this with others who might find it useful

## Final Thoughts

> "The best way to learn is by doing. The best way to teach is by example."

This markdown hub represents a simple yet powerful way to organize and present documentation. Whether you're creating user guides, technical documentation, or educational content, this tool provides a clean and professional presentation.

### Thank You

Thank you for taking the time to explore this guide. We hope you find this tool useful for your documentation needs!

---

*Happy reading! 📚*`
  };
  
  return sampleContent[chapterName] || `# Chapter Not Found\n\nThe requested chapter "${chapterName}" could not be found.`;
}

// Utility functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Handle window resize
window.addEventListener('resize', debounce(() => {
  // Adjust layout if needed
}, 250));

// Handle keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey || e.metaKey) {
    switch(e.key) {
      case ',':
        e.preventDefault();
        document.getElementById('settingsBtn').click();
        break;
    }
  }
});