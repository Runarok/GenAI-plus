// Quote Manager Application
class QuoteManager {
    constructor() {
        this.quotes = [];
        this.filteredQuotes = [];
        this.currentFilter = 'all';
        this.currentTheme = 'dark';
        
        this.init();
    }
    
    async init() {
        try {
            await this.loadQuotes();
            this.setupEventListeners();
            this.loadTheme();
            this.renderQuotes();
            this.updateQuoteCount();
        } catch (error) {
            console.error('Failed to initialize Quote Manager:', error);
            this.showError('Failed to load quotes. Please try again later.');
        }
    }
    
    async loadQuotes() {
        try {
            const response = await fetch('quotes.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            this.quotes = data.quotes || [];
            this.filteredQuotes = [...this.quotes];
        } catch (error) {
            console.error('Error loading quotes:', error);
            // Fallback to embedded quotes if JSON file fails to load
            this.quotes = this.getFallbackQuotes();
            this.filteredQuotes = [...this.quotes];
        }
    }
    
    getFallbackQuotes() {
        return [
            {
                id: 1,
                text: "The only way to do great work is to love what you do.",
                author: "Steve Jobs",
                floors: ["Ground"],
                order: 1
            },
            {
                id: 2,
                text: "Innovation distinguishes between a leader and a follower.",
                author: "Steve Jobs",
                floors: ["Ground", "1st"],
                order: 2
            },
            {
                id: 3,
                text: "Be yourself; everyone else is already taken.",
                author: "Oscar Wilde",
                floors: ["1st"],
                order: 3
            },
            {
                id: 4,
                text: "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.",
                author: "Albert Einstein",
                floors: ["1st", "2nd"],
                order: 4
            },
            {
                id: 5,
                text: "The future belongs to those who believe in the beauty of their dreams.",
                author: "Eleanor Roosevelt",
                floors: ["2nd"],
                order: 5
            },
            {
                id: 6,
                text: "It is during our darkest moments that we must focus to see the light.",
                author: "Aristotle",
                floors: ["2nd", "3rd"],
                order: 6
            },
            {
                id: 7,
                text: "The way to get started is to quit talking and begin doing.",
                author: "Walt Disney",
                floors: ["3rd"],
                order: 7
            },
            {
                id: 8,
                text: "Life is what happens to you while you're busy making other plans.",
                author: "John Lennon",
                floors: ["3rd", "4th"],
                order: 8
            },
            {
                id: 9,
                text: "The future depends on what you do today.",
                author: "Mahatma Gandhi",
                floors: ["4th"],
                order: 9
            },
            {
                id: 10,
                text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
                author: "Winston Churchill",
                floors: ["4th"],
                order: 10
            }
        ];
    }
    
    setupEventListeners() {
        // Theme selector
        const themeSelector = document.getElementById('themeSelector');
        themeSelector.addEventListener('change', (e) => {
            this.changeTheme(e.target.value);
        });
        
        // Floor filter
        const floorFilter = document.getElementById('floorFilter');
        floorFilter.addEventListener('change', (e) => {
            this.filterByFloor(e.target.value);
        });
        
        // Modal controls
        const infoBtn = document.getElementById('infoBtn');
        const modal = document.getElementById('infoModal');
        const closeBtn = document.getElementById('closeModal');
        
        infoBtn.addEventListener('click', () => this.openModal());
        closeBtn.addEventListener('click', () => this.closeModal());
        modal.addEventListener('click', (e) => {
            if (e.target === modal) this.closeModal();
        });
        
        // Keyboard navigation for modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('show')) {
                this.closeModal();
            }
        });
    }
    
    changeTheme(theme) {
        this.currentTheme = theme;
        document.body.setAttribute('data-theme', theme);
        localStorage.setItem('quoteManagerTheme', theme);
        
        // Update theme selector
        const themeSelector = document.getElementById('themeSelector');
        themeSelector.value = theme;
    }
    
    loadTheme() {
        const savedTheme = localStorage.getItem('quoteManagerTheme') || 'dark';
        this.changeTheme(savedTheme);
    }
    
    filterByFloor(floor) {
        this.currentFilter = floor;
        
        if (floor === 'all') {
            this.filteredQuotes = [...this.quotes];
        } else {
            this.filteredQuotes = this.quotes.filter(quote => 
                quote.floors.includes(floor)
            );
        }
        
        this.renderQuotes();
        this.updateQuoteCount();
    }
    
    renderQuotes() {
        const container = document.getElementById('quotesContainer');
        
        if (this.filteredQuotes.length === 0) {
            container.innerHTML = this.getEmptyStateHTML();
            return;
        }
        
        // Sort quotes by their order (ground floor to 4th floor, clockwise)
        const sortedQuotes = [...this.filteredQuotes].sort((a, b) => a.order - b.order);
        
        const quotesHTML = sortedQuotes.map(quote => this.getQuoteCardHTML(quote)).join('');
        container.innerHTML = quotesHTML;
        
        // Add fade-in animation
        setTimeout(() => {
            const cards = container.querySelectorAll('.quote-card');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('fade-in');
                }, index * 100);
            });
        }, 10);
    }
    
    getQuoteCardHTML(quote) {
        const floorsHTML = quote.floors.map(floor => 
            `<span class="floor-tag ${quote.floors.length > 1 ? 'multiple' : ''}">${floor} Floor</span>`
        ).join('');
        
        return `
            <article class="quote-card" data-quote-id="${quote.id}">
                <blockquote class="quote-text">${this.escapeHtml(quote.text)}</blockquote>
                <footer class="quote-meta">
                    <cite class="quote-author">— ${this.escapeHtml(quote.author)}</cite>
                    <div class="quote-floors">
                        ${floorsHTML}
                    </div>
                </footer>
            </article>
        `;
    }
    
    getEmptyStateHTML() {
        const filterText = this.currentFilter === 'all' ? '' : ` on ${this.currentFilter} floor`;
        return `
            <div class="empty-state">
                <h3>No quotes found</h3>
                <p>There are no quotes${filterText}. Try selecting a different floor filter.</p>
            </div>
        `;
    }
    
    updateQuoteCount() {
        const countElement = document.getElementById('quoteCount');
        const count = this.filteredQuotes.length;
        const text = count === 1 ? '1 quote' : `${count} quotes`;
        countElement.textContent = text;
    }
    
    openModal() {
        const modal = document.getElementById('infoModal');
        modal.classList.add('show');
        modal.setAttribute('aria-hidden', 'false');
        
        // Focus the close button for accessibility
        const closeBtn = document.getElementById('closeModal');
        closeBtn.focus();
        
        // Prevent background scrolling
        document.body.style.overflow = 'hidden';
    }
    
    closeModal() {
        const modal = document.getElementById('infoModal');
        modal.classList.remove('show');
        modal.setAttribute('aria-hidden', 'true');
        
        // Restore background scrolling
        document.body.style.overflow = '';
        
        // Return focus to info button
        document.getElementById('infoBtn').focus();
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    showError(message) {
        const container = document.getElementById('quotesContainer');
        container.innerHTML = `
            <div class="empty-state">
                <h3>Error</h3>
                <p>${this.escapeHtml(message)}</p>
            </div>
        `;
    }
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new QuoteManager();
});

// Service worker registration for offline capability (optional)
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