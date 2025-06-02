// Load quotes from JSON file
let quotes = [];

async function loadQuotes() {
    try {
        // Use relative path to quotes.json
        const response = await fetch('quotes.json');
        if (!response.ok) {
            throw new Error('Failed to fetch quotes');
        }
        quotes = await response.json();
        populateQuotesList();
        showToast('Quotes loaded successfully');
    } catch (error) {
        console.error('Error loading quotes:', error);
        showToast('Error loading quotes. Using default quotes.');
        // Fallback to default quotes if loading fails
        quotes = [
            {
                quote: "The only way to do great work is to love what you do.",
                author: "Steve Jobs",
                source: "Apple Inc.",
                url: "https://www.apple.com/steve-jobs-quotes/"
            },
            {
                quote: "Innovation distinguishes between a leader and a follower.",
                author: "Steve Jobs",
                source: "Apple Inc.",
                url: "https://www.apple.com/steve-jobs-quotes/"
            }
        ];
        populateQuotesList();
    }
}

// Theme toggle functionality
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Set default theme to dark
function setDefaultTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (!savedTheme) {
        localStorage.setItem('theme', 'dark-theme');
    }
    
    const currentTheme = savedTheme || 'dark-theme';
    body.classList.add(currentTheme);
    updateThemeIcon(currentTheme);
}

// Initialize theme on page load
setDefaultTheme();

themeToggle.addEventListener('click', () => {
    const currentTheme = body.classList.contains('dark-theme') ? 'light-theme' : 'dark-theme';
    body.classList.toggle('dark-theme');
    updateThemeIcon(currentTheme);
    
    // Save theme preference
    localStorage.setItem('theme', body.classList.contains('dark-theme') ? 'dark-theme' : 'light-theme');
    
    // Show toast notification
    showToast(`Switched to ${currentTheme}`);
});

// Initialize the app
window.addEventListener('load', () => {
    // Wait for both DOM and resources to be loaded
    loadQuotes();
});

// Re-check theme after everything is loaded
window.addEventListener('load', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.add(savedTheme);
        updateThemeIcon(savedTheme);
    }
});

themeToggle.addEventListener('click', () => {
    const currentTheme = body.classList.contains('dark-theme') ? 'light-theme' : 'dark-theme';
    body.classList.toggle('dark-theme');
    updateThemeIcon(currentTheme);
    
    // Save theme preference
    localStorage.setItem('theme', body.classList.contains('dark-theme') ? 'dark-theme' : 'light-theme');
    
    // Show toast notification
    showToast(`Switched to ${currentTheme}`);
});

function updateThemeIcon(currentTheme) {
    const icon = themeToggle.querySelector('.icon');
    icon.textContent = currentTheme === 'light-theme' ? '🌙' : '☀️';
}

// Enhanced toast functionality with clickable links
function showToast(message, url = null) {
    const toastContainer = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = 'toast';
    
    if (url) {
        const link = document.createElement('a');
        link.href = url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = message;
        toast.appendChild(link);
    } else {
        toast.textContent = message;
    }
    
    toastContainer.appendChild(toast);
    toast.classList.add('show');
    
    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

function populateQuotesList() {
    const quotesList = document.getElementById('quotesList');
    quotesList.innerHTML = '';
    
    quotes.forEach(quote => {
        const quoteCard = document.createElement('div');
        quoteCard.className = 'quote-card';
        quoteCard.innerHTML = `
            <div class="quote-content">
                <p class="quote">"${quote.quote}"</p>
                <p class="author">- ${quote.author}</p>
            </div>
            <button class="info-btn" aria-label="Show quote source information">
                <span class="icon">ℹ️</span>
            </button>
        `;
        
        // Add info button click handler
        const infoBtn = quoteCard.querySelector('.info-btn');
        infoBtn.addEventListener('click', () => {
            const message = `Source: ${quote.source}`;
            showToast(message, quote.url);
        });
        
        quotesList.appendChild(quoteCard);
    });
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    loadQuotes();
});
