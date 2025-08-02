// Morse Code Mapping
const MORSE_CODE_MAP = {
  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
  'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
  'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
  'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
  'Y': '-.--', 'Z': '--..', '1': '.----', '2': '..---', '3': '...--',
  '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..',
  '9': '----.', '0': '-----', '.': '.-.-.-', ',': '--..--', '?': '..--..',
  "'": '.----.', '!': '-.-.--', '/': '-..-.', '(': '-.--.', ')': '-.--.-',
  '&': '.-...', ':': '---...', ';': '-.-.-.', '=': '-...-', '+': '.-.-.',
  '-': '-....-', '_': '..--.-', '"': '.-..-.', '$': '...-..-', '@': '.--.-.',
  ' ': '/'
};

// Create reverse mapping
const REVERSE_MORSE_MAP = Object.entries(MORSE_CODE_MAP)
  .reduce((acc, [char, morse]) => {
    acc[morse] = char;
    return acc;
  }, {});

// Theme configurations
const THEMES = {
  dark: {
    name: 'Dark',
    colors: ['#0f172a', '#1e293b', '#6366f1', '#f8fafc']
  },
  light: {
    name: 'Light',
    colors: ['#ffffff', '#f8fafc', '#6366f1', '#1e293b']
  },
  blue: {
    name: 'Ocean Blue',
    colors: ['#0c1426', '#1e2a47', '#3b82f6', '#f0f9ff']
  },
  green: {
    name: 'Forest Green',
    colors: ['#0c1f17', '#1a2e23', '#059669', '#f0fdf4']
  },
  purple: {
    name: 'Royal Purple',
    colors: ['#1a0b2e', '#2d1b4e', '#8b5cf6', '#faf5ff']
  },
  orange: {
    name: 'Sunset Orange',
    colors: ['#1c1410', '#322617', '#ea580c', '#fefce8']
  }
};

// Application state
let currentSignals = {
  dot: '•',
  dash: '−',
  letterSeparator: ' ',
  wordSeparator: ' / '
};

// DOM elements
const textInput = document.getElementById('textInput');
const morseInput = document.getElementById('morseInput');
const textCharCount = document.getElementById('textCharCount');
const morseCharCount = document.getElementById('morseCharCount');
const copyTextBtn = document.getElementById('copyTextBtn');
const copyMorseBtn = document.getElementById('copyMorseBtn');
const clearBtn = document.getElementById('clearBtn');
const themeBtn = document.getElementById('themeBtn');
const settingsBtn = document.getElementById('settingsBtn');
const infoBtn = document.getElementById('infoBtn');
const themeModal = document.getElementById('themeModal');
const settingsModal = document.getElementById('settingsModal');
const infoModal = document.getElementById('infoModal');
const themeGrid = document.getElementById('themeGrid');
const legendGrid = document.getElementById('legendGrid');
const morseTable = document.getElementById('morseTable');
const toastContainer = document.getElementById('toastContainer');

// Settings inputs
const dotSymbol = document.getElementById('dotSymbol');
const dashSymbol = document.getElementById('dashSymbol');
const letterSeparator = document.getElementById('letterSeparator');
const wordSeparator = document.getElementById('wordSeparator');
const resetSignals = document.getElementById('resetSignals');

// Utility functions
function saveToLocalStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
}

function loadFromLocalStorage(key, defaultValue) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return defaultValue;
  }
}

function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  
  toastContainer.appendChild(toast);
  
  setTimeout(() => {
    toast.style.animation = 'slideInRight 0.3s ease reverse';
    setTimeout(() => {
      if (toastContainer.contains(toast)) {
        toastContainer.removeChild(toast);
      }
    }, 300);
  }, 3000);
}

// Conversion functions
function textToMorse(text) {
  return text
    .toUpperCase()
    .split('')
    .map(char => {
      const morse = MORSE_CODE_MAP[char];
      if (!morse) return char === ' ' ? currentSignals.wordSeparator : '';
      return morse
        .replace(/\./g, currentSignals.dot)
        .replace(/-/g, currentSignals.dash);
    })
    .filter(Boolean)
    .join(currentSignals.letterSeparator);
}

function morseToText(morse) {
  // Normalize the morse code back to standard format
  const normalized = morse
    .replace(new RegExp(escapeRegExp(currentSignals.wordSeparator), 'g'), ' / ')
    .replace(new RegExp(escapeRegExp(currentSignals.dot), 'g'), '.')
    .replace(new RegExp(escapeRegExp(currentSignals.dash), 'g'), '-');
  
  return normalized
    .split(' / ')
    .map(word => 
      word
        .split(' ')
        .filter(Boolean)
        .map(morseChar => REVERSE_MORSE_MAP[morseChar] || '')
        .join('')
    )
    .join(' ');
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function updateCharCount(element, countElement) {
  const count = element.value.length;
  countElement.textContent = `${count} character${count === 1 ? '' : 's'}`;
}

// Event handlers
function handleTextInput() {
  const text = textInput.value;
  const morse = textToMorse(text);
  morseInput.value = morse;
  updateCharCount(textInput, textCharCount);
  updateCharCount(morseInput, morseCharCount);
}

function handleMorseInput() {
  const morse = morseInput.value;
  const text = morseToText(morse);
  textInput.value = text;
  updateCharCount(textInput, textCharCount);
  updateCharCount(morseInput, morseCharCount);
}

async function copyToClipboard(text, buttonName) {
  try {
    await navigator.clipboard.writeText(text);
    showToast(`${buttonName} copied to clipboard!`);
  } catch (error) {
    console.error('Failed to copy:', error);
    showToast('Failed to copy to clipboard', 'error');
  }
}

function clearAll() {
  textInput.value = '';
  morseInput.value = '';
  updateCharCount(textInput, textCharCount);
  updateCharCount(morseInput, morseCharCount);
  showToast('All fields cleared');
}

function setTheme(themeId) {
  document.body.setAttribute('data-theme', themeId);
  saveToLocalStorage('theme', themeId);
  updateThemeSelection(themeId);
  showToast(`${THEMES[themeId].name} theme applied`);
}

function updateThemeSelection(activeTheme) {
  document.querySelectorAll('.theme-option').forEach(option => {
    option.classList.toggle('active', option.dataset.theme === activeTheme);
  });
}

function updateSignals() {
  currentSignals = {
    dot: dotSymbol.value || '•',
    dash: dashSymbol.value || '−',
    letterSeparator: letterSeparator.value || ' ',
    wordSeparator: wordSeparator.value || ' / '
  };
  
  saveToLocalStorage('signals', currentSignals);
  
  // Re-convert current content
  if (textInput.value) {
    handleTextInput();
  } else if (morseInput.value) {
    handleMorseInput();
  }
  
  updateLegend();
  showToast('Signal settings updated');
}

function resetSignalsToDefault() {
  currentSignals = {
    dot: '•',
    dash: '−',
    letterSeparator: ' ',
    wordSeparator: ' / '
  };
  
  dotSymbol.value = currentSignals.dot;
  dashSymbol.value = currentSignals.dash;
  letterSeparator.value = currentSignals.letterSeparator;
  wordSeparator.value = currentSignals.wordSeparator;
  
  saveToLocalStorage('signals', currentSignals);
  
  // Re-convert current content
  if (textInput.value) {
    handleTextInput();
  } else if (morseInput.value) {
    handleMorseInput();
  }
  
  updateLegend();
  showToast('Signals reset to default');
}

function showModal(modal) {
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function hideModal(modal) {
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

// Initialize functions
function initializeThemes() {
  Object.entries(THEMES).forEach(([id, theme]) => {
    const option = document.createElement('div');
    option.className = 'theme-option';
    option.dataset.theme = id;
    
    const preview = document.createElement('div');
    preview.className = 'theme-preview';
    
    theme.colors.forEach(color => {
      const colorDiv = document.createElement('div');
      colorDiv.className = 'theme-color';
      colorDiv.style.backgroundColor = color;
      preview.appendChild(colorDiv);
    });
    
    const name = document.createElement('div');
    name.className = 'theme-name';
    name.textContent = theme.name;
    
    option.appendChild(preview);
    option.appendChild(name);
    option.addEventListener('click', () => {
      setTheme(id);
      hideModal(themeModal);
    });
    
    themeGrid.appendChild(option);
  });
}

function updateLegend() {
  legendGrid.innerHTML = '';
  
  // Show a selection of common characters
  const commonChars = ['A', 'B', 'C', 'D', 'E', 'S', 'O', 'S', '1', '2', '3'];
  
  commonChars.forEach(char => {
    if (MORSE_CODE_MAP[char] && char !== ' ') {
      const item = document.createElement('div');
      item.className = 'legend-item';
      
      const charSpan = document.createElement('span');
      charSpan.className = 'legend-char';
      charSpan.textContent = char;
      
      const morseSpan = document.createElement('span');
      morseSpan.className = 'legend-morse';
      const morse = MORSE_CODE_MAP[char]
        .replace(/\./g, currentSignals.dot)
        .replace(/-/g, currentSignals.dash);
      morseSpan.textContent = morse;
      
      item.appendChild(charSpan);
      item.appendChild(morseSpan);
      legendGrid.appendChild(item);
    }
  });
}

function populateMorseTable() {
  morseTable.innerHTML = '';
  
  Object.entries(MORSE_CODE_MAP)
    .filter(([char]) => char !== ' ')
    .sort(([a], [b]) => {
      // Sort letters first, then numbers, then symbols
      const getOrder = (char) => {
        if (char >= 'A' && char <= 'Z') return 1;
        if (char >= '0' && char <= '9') return 2;
        return 3;
      };
      const orderA = getOrder(a);
      const orderB = getOrder(b);
      if (orderA !== orderB) return orderA - orderB;
      return a.localeCompare(b);
    })
    .forEach(([char, morse]) => {
      const item = document.createElement('div');
      item.className = 'morse-table-item';
      
      const charSpan = document.createElement('span');
      charSpan.className = 'morse-table-char';
      charSpan.textContent = char;
      
      const morseSpan = document.createElement('span');
      morseSpan.className = 'morse-table-code';
      morseSpan.textContent = morse;
      
      item.appendChild(charSpan);
      item.appendChild(morseSpan);
      morseTable.appendChild(item);
    });
}

function loadSettings() {
  const savedTheme = loadFromLocalStorage('theme', 'dark');
  const savedSignals = loadFromLocalStorage('signals', {
    dot: '•',
    dash: '−',
    letterSeparator: ' ',
    wordSeparator: ' / '
  });
  
  currentSignals = savedSignals;
  
  dotSymbol.value = currentSignals.dot;
  dashSymbol.value = currentSignals.dash;
  letterSeparator.value = currentSignals.letterSeparator;
  wordSeparator.value = currentSignals.wordSeparator;
  
  setTheme(savedTheme);
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  // Initialize
  initializeThemes();
  populateMorseTable();
  loadSettings();
  updateLegend();
  
  // Text input events
  textInput.addEventListener('input', handleTextInput);
  morseInput.addEventListener('input', handleMorseInput);
  
  // Copy buttons
  copyTextBtn.addEventListener('click', () => {
    copyToClipboard(textInput.value, 'Text');
  });
  
  copyMorseBtn.addEventListener('click', () => {
    copyToClipboard(morseInput.value, 'Morse code');
  });
  
  // Clear button
  clearBtn.addEventListener('click', clearAll);
  
  // Modal triggers
  themeBtn.addEventListener('click', () => showModal(themeModal));
  settingsBtn.addEventListener('click', () => showModal(settingsModal));
  infoBtn.addEventListener('click', () => showModal(infoModal));
  
  // Modal close buttons
  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const modal = e.target.closest('.modal');
      hideModal(modal);
    });
  });
  
  // Close modals on outside click
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        hideModal(modal);
      }
    });
  });
  
  // Settings
  [dotSymbol, dashSymbol, letterSeparator, wordSeparator].forEach(input => {
    input.addEventListener('input', updateSignals);
  });
  
  resetSignals.addEventListener('click', resetSignalsToDefault);
  
  // Initial character count
  updateCharCount(textInput, textCharCount);
  updateCharCount(morseInput, morseCharCount);
  
  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K to clear
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      clearAll();
    }
    
    // Escape to close modals
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal.active').forEach(modal => {
        hideModal(modal);
      });
    }
  });
});

// Service worker registration (optional, for PWA features)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}