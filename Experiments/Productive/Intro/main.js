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
let ignoreHashChange = false;

// Helper: get chapter index from filename or title
function getChapterIndexByFile(filePath) {
  return FileNames.findIndex(chap => chap.file === filePath);
}
function getChapterIndexByTitle(title) {
  return FileNames.findIndex(chap => chap.title === title);
}

// Helper: Change URL (without reloading)
function setChapterUrlParam(index, replace = false) {
  const params = new URLSearchParams(window.location.search);
  params.set('chapter', index);
  const newUrl = `${window.location.pathname}?${params.toString()}`;
  ignoreHashChange = true;
  if (replace) {
    window.history.replaceState({}, '', newUrl);
  } else {
    window.history.pushState({}, '', newUrl);
  }
}

// On initial load, use URL param to load chapter
window.addEventListener('DOMContentLoaded', function() {
  initializeTheme();
  initializeEventListeners();
  loadChapters();

  // Only on first load, check URL param
  const params = new URLSearchParams(window.location.search);
  const chapterParam = params.get('chapter');
  if (chapterParam !== null) {
    const idx = parseInt(chapterParam, 10);
    if (!isNaN(idx) && idx >= 0 && idx < FileNames.length) {
      // Slight delay to allow sidebar to render
      setTimeout(() => loadChapter(FileNames[idx].file, FileNames[idx].title, idx, true), 0);
    }
  }
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

  // Browser back/forward navigation (popstate)
  window.addEventListener('popstate', () => {
    // On popstate, only reload if chapter param is set
    const params = new URLSearchParams(window.location.search);
    const chapterParam = params.get('chapter');
    if (chapterParam !== null) {
      const idx = parseInt(chapterParam, 10);
      if (!isNaN(idx) && idx >= 0 && idx < FileNames.length) {
        loadChapter(FileNames[idx].file, FileNames[idx].title, idx, true);
      }
    } else {
      // No chapter param: show welcome
      showWelcome();
      clearActiveChapter();
      currentChapter = null;
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case ',':
          e.preventDefault();
          document.getElementById('settingsBtn').click();
          break;
        case 'ArrowLeft':
        case 'ArrowRight':
          navigateChapter(e.key === 'ArrowRight' ? 1 : -1);
          break;
      }
    }
  });
}

// Chapter navigation
function navigateChapter(direction) {
  if (currentChapter === null) return;
  const currentIdx = getChapterIndexByFile(currentChapter);
  if (currentIdx === -1) return;
  const newIdx = currentIdx + direction;
  if (newIdx >= 0 && newIdx < FileNames.length) {
    loadChapter(FileNames[newIdx].file, FileNames[newIdx].title, newIdx);
  }
}

// Chapter loading
function loadChapters() {
  try {
    renderChapterList();
  } catch (error) {
    console.error('Error loading chapters:', error);
    document.getElementById('chapterList').innerHTML = '<li class="loading">Error loading chapters</li>';
  }
}

function renderChapterList() {
  const chapterList = document.getElementById('chapterList');

  if (FileNames.length === 0) {
    chapterList.innerHTML = '<li class="loading">No chapters found</li>';
    return;
  }

  const listHTML = FileNames.map((chapter, index) =>
    `<li><a href="#" data-index="${index}" onclick="return false;">${chapter.title}</a></li>`
  ).join('');

  chapterList.innerHTML = listHTML;

  // Add click listeners (for safety, to avoid reloads)
  const links = chapterList.querySelectorAll('a');
  links.forEach((link, idx) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      loadChapter(FileNames[idx].file, FileNames[idx].title, idx);
    });
  });
}

// Show welcome message
function showWelcome() {
  const contentTitle = document.getElementById('contentTitle');
  const contentBody = document.getElementById('contentBody');
  contentTitle.textContent = "Welcome to Markdown Hub";
  contentBody.innerHTML = `
    <div class="welcome-message">
      <h3>📚 Select a Chapter</h3>
      <p>Choose a chapter from the sidebar to begin reading. This hub automatically loads and renders markdown files from the chapters folder.</p>
    </div>
  `;
}

// Set active chapter in sidebar
function setActiveChapter(index) {
  const links = document.querySelectorAll('.chapter-list a');
  links.forEach(link => link.classList.remove('active'));
  if (typeof index === "number" && index >= 0 && index < links.length) {
    links[index].classList.add('active');
  }
}
function clearActiveChapter() {
  const links = document.querySelectorAll('.chapter-list a');
  links.forEach(link => link.classList.remove('active'));
}

// Load and display chapter
async function loadChapter(filePath, title, index, fromUrl = false) {
  try {
    // Update active chapter in sidebar
    setActiveChapter(index);

    // Show loading state
    const contentTitle = document.getElementById('contentTitle');
    const contentBody = document.getElementById('contentBody');

    contentTitle.textContent = title;
    contentBody.innerHTML = '<div class="loading">Loading chapter...</div>';

    // Fetch markdown file
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`Failed to load ${filePath}: ${response.status}`);
    }

    const markdownContent = await response.text();

    // Render markdown content
    const htmlContent = marked.parse(markdownContent);
    contentBody.innerHTML = htmlContent;

    currentChapter = filePath;

    // Only update URL if not loading due to URL param
    if (!fromUrl) {
      setChapterUrlParam(index);
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

// Expose loadChapter in global scope for old onclick (if needed)
window.loadChapter = loadChapter;