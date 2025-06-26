class ThemeManager {
    constructor() {
        this.themeOptions = document.querySelectorAll('.theme-option');
        this.modeButtons = document.querySelectorAll('.mode-btn');
        this.setupEventListeners();
        this.loadSavedTheme();
    }

    setupEventListeners() {
        this.themeOptions.forEach(option => {
            option.addEventListener('click', () => {
                const theme = option.dataset.theme;
                const currentMode = document.documentElement.getAttribute('data-mode') || 'dark';
                this.setTheme(theme, currentMode);
                localStorage.setItem('theme', theme);
            });
        });

        this.modeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const mode = btn.dataset.mode;
                const currentTheme = document.documentElement.getAttribute('data-theme') || 'blue';
                this.setTheme(currentTheme, mode);
                localStorage.setItem('theme-mode', mode);
            });
        });
    }

    loadSavedTheme() {
        const savedTheme = localStorage.getItem('theme') || 'blue';
        const savedMode = localStorage.getItem('theme-mode') || 'dark';
        this.setTheme(savedTheme, savedMode);
    }

    setTheme(theme, mode) {
        document.documentElement.setAttribute('data-theme', theme);
        document.documentElement.setAttribute('data-mode', mode);
        
        // Update active theme option
        this.themeOptions.forEach(option => {
            option.classList.toggle('active', option.dataset.theme === theme);
        });

        // Update active mode button
        this.modeButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.mode === mode);
        });
    }
}