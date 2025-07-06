// UI Management
class UIManager {
    constructor() {
        this.currentScreen = 'mainMenu';
        this.currentTheme = 'dark-mountains';
        this.audioEnabled = true;
        this.particles = [];
        
        this.init();
    }

    init() {
        this.loadSettings();
        this.setupEventListeners();
        this.setupParticles();
        this.showMobileControlsIfNeeded();
    }

    loadSettings() {
        // Load theme
        this.currentTheme = window.storageManager.loadTheme();
        this.applyTheme(this.currentTheme);
        
        // Load audio setting
        this.audioEnabled = window.storageManager.loadAudioSetting();
        this.updateAudioToggle();
    }

    setupEventListeners() {
        // Main Menu
        document.getElementById('playBtn').addEventListener('click', () => {
            this.showScreen('gameplayScreen');
            if (window.gameManager) {
                window.gameManager.startGame();
            }
        });

        document.getElementById('settingsBtn').addEventListener('click', () => {
            this.showScreen('settingsMenu');
        });

        document.getElementById('instructionsBtn').addEventListener('click', () => {
            this.showScreen('instructionsMenu');
        });

        // Settings Menu
        document.getElementById('backToMainBtn').addEventListener('click', () => {
            this.showScreen('mainMenu');
        });

        document.getElementById('audioToggle').addEventListener('click', () => {
            this.toggleAudio();
        });

        // Theme Selection
        document.querySelectorAll('.theme-option').forEach(option => {
            option.addEventListener('click', () => {
                this.selectTheme(option.dataset.theme);
            });
        });

        // Instructions Menu
        document.getElementById('startClimbingBtn').addEventListener('click', () => {
            this.showScreen('gameplayScreen');
            if (window.gameManager) {
                window.gameManager.startGame();
            }
        });

        document.getElementById('backFromInstructionsBtn').addEventListener('click', () => {
            this.showScreen('mainMenu');
        });

        // Game Over Screen
        document.getElementById('playAgainBtn').addEventListener('click', () => {
            if (window.gameManager) {
                window.gameManager.restartGame();
            }
        });

        document.getElementById('changeThemeBtn').addEventListener('click', () => {
            this.showScreen('settingsMenu');
        });

        document.getElementById('backToMenuBtn').addEventListener('click', () => {
            this.showScreen('mainMenu');
            if (window.gameManager) {
                window.gameManager.stopGame();
            }
        });

        // Pause Menu
        document.getElementById('pauseBtn').addEventListener('click', () => {
            if (window.gameManager) {
                window.gameManager.togglePause();
            }
        });

        document.getElementById('resumeBtn').addEventListener('click', () => {
            if (window.gameManager) {
                window.gameManager.togglePause();
            }
        });

        document.getElementById('restartBtn').addEventListener('click', () => {
            if (window.gameManager) {
                window.gameManager.restartGame();
            }
        });

        document.getElementById('mainMenuBtn').addEventListener('click', () => {
            this.showScreen('mainMenu');
            if (window.gameManager) {
                window.gameManager.stopGame();
            }
        });
    }

    showScreen(screenId) {
        // Hide all screens
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });

        // Show target screen
        const targetScreen = document.getElementById(screenId);
        if (targetScreen) {
            targetScreen.classList.add('active');
            this.currentScreen = screenId;
        }

        // Handle pause overlay
        if (screenId !== 'gameplayScreen') {
            this.hidePauseMenu();
        }
    }

    showPauseMenu() {
        const pauseOverlay = document.getElementById('pauseOverlay');
        pauseOverlay.classList.add('active');
    }

    hidePauseMenu() {
        const pauseOverlay = document.getElementById('pauseOverlay');
        pauseOverlay.classList.remove('active');
    }

    // Theme Management
    selectTheme(themeName) {
        // Update active theme option
        document.querySelectorAll('.theme-option').forEach(option => {
            option.classList.remove('active');
        });
        
        const selectedOption = document.querySelector(`[data-theme="${themeName}"]`);
        if (selectedOption) {
            selectedOption.classList.add('active');
        }

        this.applyTheme(themeName);
    }

    applyTheme(themeName) {
        this.currentTheme = themeName;
        document.documentElement.setAttribute('data-theme', themeName);
        window.storageManager.saveTheme(themeName);
        
        // Update theme display
        const themeNames = {
            'dark-mountains': '🏔️ Dark Mountains',
            'snow-peak': '❄️ Snow Peak',
            'sunset-cliff': '🌄 Sunset Cliff',
            'alien-rock': '👽 Alien Rock'
        };
        
        const themeDisplay = document.getElementById('currentTheme');
        if (themeDisplay) {
            themeDisplay.textContent = themeNames[themeName] || 'Unknown Theme';
        }

        // Update particles
        this.updateParticles();
        
        // Mark active theme in settings
        document.querySelectorAll('.theme-option').forEach(option => {
            option.classList.toggle('active', option.dataset.theme === themeName);
        });
    }

    // Audio Management
    toggleAudio() {
        this.audioEnabled = !this.audioEnabled;
        window.storageManager.saveAudioSetting(this.audioEnabled);
        this.updateAudioToggle();
        
        if (window.gameManager) {
            window.gameManager.setAudioEnabled(this.audioEnabled);
        }
    }

    updateAudioToggle() {
        const audioToggle = document.getElementById('audioToggle');
        const toggleText = audioToggle.querySelector('.toggle-text');
        
        toggleText.textContent = `Sound: ${this.audioEnabled ? 'ON' : 'OFF'}`;
        audioToggle.classList.toggle('active', this.audioEnabled);
    }

    // Game UI Updates
    updateScore(score) {
        const scoreValue = document.getElementById('scoreValue');
        if (scoreValue) {
            scoreValue.textContent = score.toLocaleString();
        }
    }

    updateHeight(height) {
        const heightValue = document.getElementById('heightValue');
        if (heightValue) {
            heightValue.textContent = height.toLocaleString();
        }
    }

    showGameOver(stats) {
        document.getElementById('finalScore').textContent = stats.score.toLocaleString();
        document.getElementById('finalHeight').textContent = stats.height.toLocaleString();
        document.getElementById('finalTheme').textContent = stats.theme;
        
        setTimeout(() => {
            this.showScreen('gameOverScreen');
        }, 1000);
    }

    // Particle System
    setupParticles() {
        this.updateParticles();
    }

    updateParticles() {
        const container = document.getElementById('particlesContainer');
        container.innerHTML = '';
        
        const particleCount = window.innerWidth < 768 ? 30 : 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random positioning and timing
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
            particle.style.animationDelay = Math.random() * 15 + 's';
            
            // Theme-specific particle variations
            const size = Math.random() * 3 + 2;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            
            if (this.currentTheme === 'snow-peak') {
                particle.style.opacity = '0.9';
            } else if (this.currentTheme === 'sunset-cliff') {
                particle.style.opacity = '0.7';
                if (Math.random() > 0.7) {
                    particle.style.background = 'rgba(251, 191, 36, 0.6)';
                }
            } else if (this.currentTheme === 'alien-rock') {
                particle.style.boxShadow = '0 0 4px var(--particle-color)';
                if (Math.random() > 0.8) {
                    particle.style.background = 'rgba(168, 85, 247, 0.6)';
                }
            }
            
            container.appendChild(particle);
        }
    }

    // Mobile Controls
    showMobileControlsIfNeeded() {
        if (window.controlsManager && window.controlsManager.isMobileDevice()) {
            const mobileControls = document.getElementById('mobileControls');
            if (mobileControls) {
                mobileControls.style.display = 'flex';
            }
        }
    }

    // Utility Methods
    getCurrentTheme() {
        return this.currentTheme;
    }

    isAudioEnabled() {
        return this.audioEnabled;
    }

    getCurrentScreen() {
        return this.currentScreen;
    }

    // Responsive handling
    handleResize() {
        this.updateParticles();
    }
}

// Initialize UI when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.uiManager = new UIManager();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.uiManager) {
            window.uiManager.handleResize();
        }
    });
});