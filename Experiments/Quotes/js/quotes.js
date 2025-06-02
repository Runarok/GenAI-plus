const quotesList = document.getElementById('quotesList');

// Populate quotes list
function populateQuotesList() {
    quotesList.innerHTML = '';
    
    quotes.forEach(quote => {
        const quoteCard = document.createElement('div');
        quoteCard.className = 'quote-card';
        quoteCard.setAttribute('data-search-text', `${quote.quote.toLowerCase()} ${quote.author.toLowerCase()} ${quote.source.toLowerCase()}`);
        quoteCard.setAttribute('data-quote-id', quote.id);
        quoteCard.innerHTML = `
            <div class="quote-content">
                <p class="quote">"${quote.quote}"</p>
                <p class="author">- ${quote.author}</p>
            </div>
            <button class="info-btn" aria-label="Show quote source information">
                <svg class="icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" fill="currentColor"/>
                </svg>
            </button>
        `;
        
        const infoBtn = quoteCard.querySelector('.info-btn');
        infoBtn.addEventListener('click', () => {
            const message = `Source: ${quote.source}`;
            showToast(message, quote.url);
        });
        
        quotesList.appendChild(quoteCard);
    });
}

// Initialize quotes when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Load all quotes initially
    populateQuotesList();
    
    // Add event listener for search results
    window.addEventListener('searchResultsSelected', (e) => {
        // Scroll to selected quote
        const quoteCard = document.querySelector(`.quote-card:has(p:contains("${e.detail.quote}"))`);
        if (quoteCard) {
            quoteCard.scrollIntoView({ behavior: 'smooth' });
            quoteCard.classList.add('selected');
            setTimeout(() => quoteCard.classList.remove('selected'), 1000);
        }
    });
});
