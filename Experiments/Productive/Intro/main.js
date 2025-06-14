// File configuration
const FileNames = [
  { file: 'Chapters/Introduction.md', title: 'Introduction' },
  { file: 'Chapters/Chapter_1.md', title: 'Chapter 1' },
  { file: 'Chapters/Chapter_2.md', title: 'Chapter 2' },
  { file: 'Chapters/Chapter_3.md', title: 'Chapter 3' },
  { file: 'Chapters/Chapter_4.md', title: 'Chapter 4' },
  { file: 'Chapters/Chapter_5.md', title: 'Chapter 5' },
  { file: 'Chapters/Chapter_6.md', title: 'Chapter 6' },
  { file: 'Chapters/Chapter_7.md', title: 'Chapter 7' },
  { file: 'Chapters/Chapter_8.md', title: 'Chapter 8' },
  { file: 'Chapters/Chapter_9.md', title: 'Chapter 9' },
  { file: 'Chapters/Chapter_10.md', title: 'Chapter 10' },
  { file: 'Chapters/Chapter_11.md', title: 'Chapter 11' }
];

// Theme management
const THEMES = [
  'black-gray', 'black-purple', 'black-navy', 'black-green', 'black-gold', 'black-teal', 'black-red', 'black-brown',
  'white-gold', 'white-mint', 'white-pink', 'white-yellow', 'white-blue', 'white-lavender', 'white-peach', 'white-cream'
];

// Global state
let currentChapter = null;

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
  initializeTheme();
  initializeEventListeners();
  renderChapterList();
  loadInitialChapter();
});

// Theme initialization
function initializeTheme() {
  const savedTheme = localStorage.getItem('theme') || 'black-gray';
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

  // Listen for browser history navigation
  window.addEventListener('popstate', () => {
    loadInitialChapter(true);
  });
}

// Chapter loading helpers
function renderChapterList() {
  const chapterList = document.getElementById('chapterList');

  if (FileNames.length === 0) {
    chapterList.innerHTML = '<li class="loading">No chapters found</li>';
    return;
  }

  const listHTML = FileNames.map((chapter, index) =>
    `<li><a href="#" onclick="loadChapter('${chapter.file}', '${chapter.title}', ${index}, true); return false;">${chapter.title}</a></li>`
  ).join('');

  chapterList.innerHTML = listHTML;
}

// Parse chapter query parameter from URL
function getChapterParamFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('chapter');
}

// Find chapter index by file path, returns -1 if not found
function getChapterIndexByFile(filePath) {
  return FileNames.findIndex(ch => ch.file === filePath);
}

// Load initial chapter based on URL param or fallback to default
function loadInitialChapter(isPopState = false) {
  // Ensure chapter list is rendered
  // (If you use frameworks or late DOM, ensure renderChapterList is called before this)
  const chapterParam = getChapterParamFromURL();
  let chapterIndex = getChapterIndexByFile(chapterParam);
  let chapter;
  let shouldReplace = false;

  if (chapterIndex !== -1) {
    chapter = FileNames[chapterIndex];
  } else {
    // Fallback to first chapter
    chapterIndex = 0;
    chapter = FileNames[0];
    shouldReplace = !!chapterParam; // Only replace if param is present but invalid
  }

  // Load the chapter (replaceState for initial loads/corrections, not pushState)
  loadChapter(chapter.file, chapter.title, chapterIndex, false, shouldReplace && !isPopState);
}

// Main chapter loader
async function loadChapter(filePath, title, index, userInitiated = false, replaceState = false) {
  try {
    // Update active chapter in sidebar
    const links = document.querySelectorAll('.chapter-list a');
    if (links.length) {
      links.forEach(link => link.classList.remove('active'));
      if (typeof index === 'number' && links[index]) {
        links[index].classList.add('active');
      }
    }

    // Show loading state
    const contentTitle = document.getElementById('contentTitle');
    const contentBody = document.getElementById('contentBody');
    contentTitle.textContent = title;
    contentBody.innerHTML = '<div class="loading">Loading chapter...</div>';

    // Fetch the actual markdown file
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`Failed to load ${filePath}: ${response.status}`);
    }

    const markdownContent = await response.text();

    // Render markdown content
    const htmlContent = marked.parse(markdownContent);
    contentBody.innerHTML = htmlContent;

    currentChapter = filePath;

    // Update URL
    if (userInitiated) {
      // User clicked chapter: push a new history state
      history.pushState({}, '', updateURLWithChapter(filePath));
    } else if (replaceState) {
      // Invalid/missing param: replace current state
      history.replaceState({}, '', updateURLWithChapter(filePath));
    }
  } catch (error) {
    console.error('Error loading chapter:', error);
    document.getElementById('contentBody').innerHTML = `
      <div class="error-message">
        <h3>⚠️ Error Loading Chapter</h3>
        <p>Could not load the chapter "${title}". Please make sure the file exists at: <code>${filePath}</code></p>
        <p class="error-details">${error.message}</p>
      </div>
    `;
  }
}

// Utility: update URL with chapter param
function updateURLWithChapter(filePath) {
  const url = new URL(window.location.href);
  url.searchParams.set('chapter', filePath);
  return url.pathname + url.search;
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

// Expose loadChapter for inline onclick
window.loadChapter = loadChapter;