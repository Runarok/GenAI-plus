document.addEventListener('DOMContentLoaded', () => {
    // Apply saved theme or default
    applyTheme();
    
    // Generate content
    generateHackList();
    
    // Set up event listeners
    setupEventListeners();
});

function applyTheme() {
    // Get saved theme from local storage or use default
    const savedTheme = localStorage.getItem('productivityHacksTheme') || 'dark-mint';
    document.body.className = `${savedTheme}-theme`;
    
    // Mark the current theme button as selected when the theme switcher opens
    const themeButtons = document.querySelectorAll('.theme-btn');
    themeButtons.forEach(button => {
        if (button.dataset.theme === savedTheme) {
            button.classList.add('active');
        }
    });
}

function generateHackList() {
    const hackListContainer = document.getElementById('hack-list');
    
    productivityHacks.forEach((hack, index) => {
        const hackElement = document.createElement('div');
        hackElement.className = 'hack';
        
        hackElement.innerHTML = `
            <div class="hack-header">
                <div class="hack-number">${index + 1}</div>
                <div class="hack-title">${hack.title}</div>
                <div class="hack-toggle"></div>
            </div>
            <div class="hack-content">
                <p class="hack-description">${hack.description}</p>
            </div>
        `;
        
        hackListContainer.appendChild(hackElement);
    });
}

function setupEventListeners() {
    // Theme switcher toggle
    const settingsBtn = document.getElementById('settings-btn');
    const themeSwitcher = document.getElementById('theme-switcher');
    
    settingsBtn.addEventListener('click', () => {
        themeSwitcher.classList.toggle('active');
    });
    
    // Close theme switcher when clicking outside
    document.addEventListener('click', (event) => {
        if (!themeSwitcher.contains(event.target) && !settingsBtn.contains(event.target)) {
            themeSwitcher.classList.remove('active');
        }
    });
    
    // Theme selection
    const themeButtons = document.querySelectorAll('.theme-btn');
    themeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const theme = button.dataset.theme;
            document.body.className = `${theme}-theme`;
            localStorage.setItem('productivityHacksTheme', theme);
            
            // Update active state on buttons
            themeButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Close the theme switcher
            themeSwitcher.classList.remove('active');
        });
    });
    
    // Hack expansion
    const hacks = document.querySelectorAll('.hack');
    hacks.forEach(hack => {
        const header = hack.querySelector('.hack-header');
        
        header.addEventListener('click', () => {
            hack.classList.toggle('active');
        });
    });
}