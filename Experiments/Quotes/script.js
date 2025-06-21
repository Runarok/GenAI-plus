// State management
let readQuotes = new Set();
let currentView = 'all';
let currentFilters = {
  author: '',
  source: ''
};
let settings = {
  theme: 'dark'
};
let quotes = [];  // Will be loaded dynamically

// DOM elements
const themeSelect = document.getElementById('theme-select');
const authorFilter = document.getElementById('author-filter');
const sourceFilter = document.getElementById('source-filter');
const viewAllBtn = document.getElementById('view-all');
const viewReadBtn = document.getElementById('view-read');
const viewUnreadBtn = document.getElementById('view-unread');
const quotesGrid = document.getElementById('quotes-grid');
const emptyState = document.getElementById('empty-state');
const totalQuotesEl = document.getElementById('total-quotes');
const readQuotesEl = document.getElementById('read-quotes');
const unreadQuotesEl = document.getElementById('unread-quotes');
const exportBtn = document.getElementById('export-btn');
const importFile = document.getElementById('import-file');
const clearDataBtn = document.getElementById('clear-data-btn');
const toast = document.getElementById('toast');
const toastContent = document.getElementById('toast-content');

// Load quotes data from remote JS file using CORS proxy
async function loadQuotes() {
  try {
    const url = 'https://raw.githubusercontent.com/Runarok/Guides/refs/heads/main/Code%20Reference/GenAI-plus/Experiments-Quotes/quotes-data.js';
    const proxyUrl = 'https://api.allorigins.win/raw?url=' + encodeURIComponent(url);

    const response = await fetch(proxyUrl);
    const text = await response.text();

    // Extract the quotes array from the JS file text using regex
    const matches = text.match(/quotes\s*=\s*(\[[\s\S]*?\]);/);
    if (matches && matches[1]) {
      quotes = JSON.parse(matches[1]);
    } else {
      throw new Error('Could not parse quotes data');
    }
  } catch (error) {
    console.error('Error loading quotes:', error);
    showToast('Failed to load quotes data', 'error');
  }
}

// Initialize the app
async function init() {
  await loadQuotes();  // Load quotes before continuing
  loadSettings();
  loadReadQuotes();
  populateFilters();
  setupEventListeners();
  updateStats();
  renderQuotes();
}

// Load settings from localStorage
function loadSettings() {
  const savedSettings = localStorage.getItem('quoteManagerSettings');
  if (savedSettings) {
    settings = JSON.parse(savedSettings);
    themeSelect.value = settings.theme;
    changeTheme(settings.theme);
  }
}

// Save settings to localStorage
function saveSettings() {
  localStorage.setItem('quoteManagerSettings', JSON.stringify(settings));
}

// Load read quotes from localStorage
function loadReadQuotes() {
  const savedReadQuotes = localStorage.getItem('quoteManagerReadQuotes');
  if (savedReadQuotes) {
    readQuotes = new Set(JSON.parse(savedReadQuotes));
  }
}

// Save read quotes to localStorage
function saveReadQuotes() {
  localStorage.setItem('quoteManagerReadQuotes', JSON.stringify([...readQuotes]));
}

// Populate filter dropdowns
function populateFilters() {
  const authors = [...new Set(quotes.map(q => q.author))].sort();
  const sources = [...new Set(quotes.map(q => q.source))].sort();

  // Clear existing options (except "All")
  authorFilter.innerHTML = '<option value="">All Authors</option>';
  sourceFilter.innerHTML = '<option value="">All Sources</option>';

  authors.forEach(author => {
    const option = document.createElement('option');
    option.value = author;
    option.textContent = author;
    authorFilter.appendChild(option);
  });

  sources.forEach(source => {
    const option = document.createElement('option');
    option.value = source;
    option.textContent = source;
    sourceFilter.appendChild(option);
  });
}

// Filter quotes based on current filters and view
function getFilteredQuotes() {
  return quotes.filter(quote => {
    // Apply author and source filters
    const matchesAuthor = !currentFilters.author || quote.author === currentFilters.author;
    const matchesSource = !currentFilters.source || quote.source === currentFilters.source;

    // Apply view filter
    const isRead = readQuotes.has(quote.id);
    let matchesView = true;

    if (currentView === 'read') {
      matchesView = isRead;
    } else if (currentView === 'unread') {
      matchesView = !isRead;
    }

    return matchesAuthor && matchesSource && matchesView;
  });
}

// Render quotes grid
function renderQuotes() {
  const filteredQuotes = getFilteredQuotes();

  if (filteredQuotes.length === 0) {
    quotesGrid.style.display = 'none';
    emptyState.style.display = 'block';
    return;
  }

  quotesGrid.style.display = 'grid';
  emptyState.style.display = 'none';

  quotesGrid.innerHTML = filteredQuotes.map(quote => {
    const isRead = readQuotes.has(quote.id);
    return `
      <div class="quote-card ${isRead ? 'read' : ''} fade-in">
        <div class="quote-text">${quote.quote}</div>
        <div class="quote-author">— ${quote.author}</div>
        <div class="quote-source">Source: ${quote.source}</div>
        <div class="quote-actions">
          <button class="action-btn mark-read-btn ${isRead ? 'read' : ''}" onclick="toggleReadStatus(${quote.id})">
            ${isRead ? 'Mark Unread' : 'Mark as Read'}
          </button>
          <a href="${quote.url}" target="_blank" class="action-btn">
            View Source
          </a>
        </div>
      </div>
    `;
  }).join('');
}

// Toggle read status of a quote
function toggleReadStatus(quoteId) {
  if (readQuotes.has(quoteId)) {
    readQuotes.delete(quoteId);
    showToast('Quote marked as unread', 'success');
  } else {
    readQuotes.add(quoteId);
    showToast('Quote marked as read', 'success');
  }

  saveReadQuotes();
  updateStats();
  renderQuotes();
}

// Update statistics
function updateStats() {
  const total = quotes.length;
  const read = readQuotes.size;
  const unread = total - read;

  totalQuotesEl.textContent = total;
  readQuotesEl.textContent = read;
  unreadQuotesEl.textContent = unread;
}

// Change view
function changeView(view) {
  currentView = view;

  // Update active button
  document.querySelectorAll('.view-toggle button').forEach(btn => {
    btn.classList.remove('active');
  });

  if (view === 'all') viewAllBtn.classList.add('active');
  else if (view === 'read') viewReadBtn.classList.add('active');
  else if (view === 'unread') viewUnreadBtn.classList.add('active');

  renderQuotes();
}

// Change theme
function changeTheme(theme) {
  document.body.setAttribute('data-theme', theme);
  settings.theme = theme;
  saveSettings();
}

// Show toast notification
function showToast(message, type = 'info') {
  toastContent.textContent = message;
  toast.className = `toast show ${type}`;

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// Export data
function exportData() {
  const data = {
    readQuotes: [...readQuotes],
    settings: settings,
    exportDate: new Date().toISOString()
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `quote-manager-backup-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  showToast('Data exported successfully', 'success');
}

// Import data
function importData(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const data = JSON.parse(e.target.result);

      if (data.readQuotes) {
        readQuotes = new Set(data.readQuotes);
        saveReadQuotes();
      }

      if (data.settings) {
        settings = { ...settings, ...data.settings };
        saveSettings();
        themeSelect.value = settings.theme;
        changeTheme(settings.theme);
      }

      updateStats();
      renderQuotes();
      showToast('Data imported successfully', 'success');
    } catch (error) {
      showToast('Error importing data: Invalid file format', 'error');
    }
  };
  reader.readAsText(file);

  // Reset file input
  event.target.value = '';
}

// Clear all data
function clearAllData() {
  if (confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
    readQuotes.clear();
    settings = { theme: 'dark' };

    localStorage.removeItem('quoteManagerReadQuotes');
    localStorage.removeItem('quoteManagerSettings');

    themeSelect.value = 'dark';
    changeTheme('dark');
    authorFilter.value = '';
    sourceFilter.value = '';
    currentFilters = { author: '', source: '' };
    changeView('all');

    updateStats();
    renderQuotes();
    showToast('All data cleared', 'success');
  }
}

// Setup event listeners
function setupEventListeners() {
  themeSelect.addEventListener('change', (e) => {
    changeTheme(e.target.value);
  });

  authorFilter.addEventListener('change', (e) => {
    currentFilters.author = e.target.value;
    renderQuotes();
  });

  sourceFilter.addEventListener('change', (e) => {
    currentFilters.source = e.target.value;
    renderQuotes();
  });

  viewAllBtn.addEventListener('click', () => changeView('all'));
  viewReadBtn.addEventListener('click', () => changeView('read'));
  viewUnreadBtn.addEventListener('click', () => changeView('unread'));

  exportBtn.addEventListener('click', exportData);
  importFile.addEventListener('change', importData);
  clearDataBtn.addEventListener('click', clearAllData);

  // Hide toast when clicking outside
  document.addEventListener('click', (e) => {
    if (!toast.contains(e.target)) {
      toast.classList.remove('show');
    }
  });
}

// Start the application
init();
