// Search functionality
const searchToggle = document.getElementById('searchToggle');
const searchContainer = document.getElementById('searchContainer');
const searchInput = document.getElementById('searchInput');
const clearSearch = document.getElementById('clearSearch');
const clearFilter = document.getElementById('clearFilter');

// Search functionality
function searchQuotes() {
    const searchTerm = searchInput.value.toLowerCase();
    
    if (!searchTerm) {
        // Show all quotes
        const quoteCards = document.querySelectorAll('.quote-card');
        quoteCards.forEach(card => {
            card.classList.remove('search-hidden');
        });
        return;
    }

    // Get all quote cards
    const quoteCards = document.querySelectorAll('.quote-card');
    
    // First hide all quotes
    quoteCards.forEach(card => {
        card.classList.add('search-hidden');
    });

    // Show matching quotes
    quoteCards.forEach(card => {
        const searchText = card.getAttribute('data-search-text');
        if (searchText.includes(searchTerm)) {
            card.classList.remove('search-hidden');
            
            // Get quote text and author
            const quoteText = card.querySelector('.quote').textContent;
            
            // Highlight search terms in quote
            const highlightedQuote = quoteText.replace(
                new RegExp(`(${searchTerm})`, 'gi'),
                `<span class="highlight">$1</span>`
            );
            
            // Update quote text with highlighted terms
            card.querySelector('.quote').innerHTML = highlightedQuote;
        }
    });
}

// Clear search functionality
function clearSearchResults() {
    searchInput.value = '';
    searchResults.classList.remove('visible');
    
    // Show all quotes again
    const quoteCards = document.querySelectorAll('.quote-card');
    quoteCards.forEach(card => {
        card.classList.remove('search-hidden');
    });
    
    // Remove all highlights
    const highlightedSpans = document.querySelectorAll('.highlight');
    highlightedSpans.forEach(span => {
        span.outerHTML = span.textContent;
    });
}

// Function to reload quotes
function reloadQuotes() {
    const quotesList = document.getElementById('quotesList');
    quotesList.innerHTML = '';
    populateQuotesList();
}

// Clear filter button
clearFilter.addEventListener('click', () => {
    // Clear search input
    searchInput.value = '';
    
    // Hide search container
    searchContainer.classList.add('hidden');
    searchContainer.classList.remove('visible');
    
    // Reset search active state
    searchActive = false;
    
    // Reload quotes
    reloadQuotes();
});

// Handle clear search button
clearSearch.addEventListener('click', () => {
    // Clear search input
    searchInput.value = '';
    
    // Hide search container
    searchContainer.classList.add('hidden');
    searchContainer.classList.remove('visible');
    
    // Reload quotes
    reloadQuotes();
});

// Toggle search container
searchToggle.addEventListener('click', () => {
    if (searchContainer.classList.contains('hidden')) {
        searchContainer.classList.remove('hidden');
        searchContainer.classList.add('visible');
        
        // Add a small delay before focusing to ensure animation completes
        setTimeout(() => {
            searchInput.focus();
        }, 100);
    } else {
        clearSearchResults();
    }
});

// Clear search
function clearSearchResults() {
    searchInput.value = '';
    searchResults.classList.remove('visible');
    
    // Add a small delay before hiding to ensure animation completes
    setTimeout(() => {
        searchContainer.classList.add('hidden');
        searchContainer.classList.remove('visible');
    }, 300);
}

clearSearch.addEventListener('click', clearSearchResults);

// Search on input
searchInput.addEventListener('input', searchQuotes);

// Close search when clicking outside
window.addEventListener('click', (e) => {
    if (!searchContainer.contains(e.target) && !searchToggle.contains(e.target)) {
        clearSearchResults();
    }
});
