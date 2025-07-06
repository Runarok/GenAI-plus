// UI Management
class UIManager {
    constructor() {
        this.currentScreen = 'mainMenu';
        this.currentTheme = 'dark-mountains';
        this.currentSkin = 'default';
        this.audioEnabled = true;
        this.particles = [];
        
        // Available skins and themes for purchase
        this.availableSkins = [
            { id: 'default', name: '🔵 Classic Blue', cost: 0, color: '#3b82f6' },
            { id: 'red', name: '🔴 Crimson Red', cost: 50, color: '#ef4444' },
            { id: 'green', name: '🟢 Forest Green', cost: 75, color: '#22c55e' },
            { id: 'purple', name: '🟣 Royal Purple', cost: 100, color: '#a855f7' },
            { id: 'orange', name: '🟠 Sunset Orange', cost: 125, color: '#f97316' },
            { id: 'pink', name: '🩷 Mystic Pink', cost: 150, color: '#ec4899' },
            { id: 'gold', name: '🟡 Golden Star', cost: 200, color: '#fbbf24' },
            { id: 'rainbow', name: '🌈 Rainbow Glow', cost: 500, color: 'linear-gradient(45deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3)' }
        ];
        
        this.availableThemes = [
            { id: 'dark-mountains', name: '🏔️ Dark Mountains', cost: 0 },
            { id: 'snow-peak', name: '❄️ Snow Peak', cost: 100 },
            { id: 'sunset-cliff', name: '🌄 Sunset Cliff', cost: 150 },
            { id: 'alien-rock', name: '👽 Alien Rock', cost: 200 }
        ];
        
        this.ownedSkins = [];
        this.ownedThemes = [];
        
        this.init();
    }

    init() {
        this.loadSettings();
        this.setupEventListeners();
        this.setupParticles();
        this.showMobileControlsIfNeeded();
        this.populateShop();
    }

    loadSettings() {
        // Load theme
        this.currentTheme = window.storageManager.loadTheme();
        this.applyTheme(this.currentTheme);
        
        // Load audio setting
        this.audioEnabled = window.storageManager.loadAudioSetting();
        this.updateAudioToggle();
        
        // Load owned items and current skin
        this.ownedSkins = window.storageManager.loadOwnedItems('skins');
        this.ownedThemes = window.storageManager.loadOwnedItems('themes');
        this.currentSkin = window.storageManager.loadCurrentSkin();
        
        // Ensure default items are always owned
        if (!this.ownedSkins.includes('default')) {
            this.ownedSkins.push('default');
        }
        if (!this.ownedThemes.includes('dark-mountains')) {
            this.ownedThemes.push('dark-mountains');
        }
        
        // Apply current skin
        this.applySkin(this.currentSkin);
    }

    setupEventListeners() {
        // Main Menu
        document.getElementById('playBtn').addEventListener('click', () => {
            this.showScreen('gameplayScreen');
            if (window.gameManager) {
                window.gameManager.startGame();
            }
        });

        document.getElementById('shopBtn').addEventListener('click', () => {
            this.showShop();
        });

        document.getElementById('settingsBtn').addEventListener('click', () => {
            this.showScreen('settingsMenu');
        });

        document.getElementById('instructionsBtn').addEventListener('click', () => {
            this.showScreen('instructionsMenu');
        });

        // Shop Menu
        document.getElementById('backToMainFromShopBtn').addEventListener('click', () => {
            this.showScreen('mainMenu');
        });

        // Settings Menu
        document.getElementById('backToMainBtn').addEventListener('click', () => {
            this.showScreen('mainMenu');
        });

        document.getElementById('audioToggle').addEventListener('click', () => {
            this.toggleAudio();
        });

        document.getElementById('dataBtn').addEventListener('click', () => {
            this.showDataMenu();
        });

        // Data Menu
        document.getElementById('backToSettingsFromDataBtn').addEventListener('click', () => {
            this.showScreen('settingsMenu');
        });

        document.getElementById('exportDataBtn').addEventListener('click', () => {
            this.exportGameData();
        });

        document.getElementById('importDataBtn').addEventListener('click', () => {
            this.importGameData();
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
            this.showShop();
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

    showShop() {
        this.showScreen('shopMenu');
        this.populateShop();
        this.updateShopCoins();
    }

    showDataMenu() {
        this.showScreen('dataMenu');
        this.exportGameData();
    }

    showPauseMenu() {
        const pauseOverlay = document.getElementById('pauseOverlay');
        pauseOverlay.classList.add('active');
    }

    hidePauseMenu() {
        const pauseOverlay = document.getElementById('pauseOverlay');
        pauseOverlay.classList.remove('active');
    }

    // Shop Management
    populateShop() {
        this.populateSkins();
        this.populateThemes();
    }

    populateSkins() {
        const skinsGrid = document.getElementById('skinsGrid');
        skinsGrid.innerHTML = '';

        this.availableSkins.forEach(skin => {
            const isOwned = this.ownedSkins.includes(skin.id);
            const isActive = this.currentSkin === skin.id;

            const skinElement = document.createElement('div');
            skinElement.className = `shop-item ${isOwned ? 'owned' : ''} ${isActive ? 'active' : ''}`;
            
            skinElement.innerHTML = `
                <div class="shop-item-preview" style="background: ${skin.color}"></div>
                <div class="shop-item-name">${skin.name}</div>
                <div class="shop-item-cost">${skin.cost === 0 ? 'Free' : `${skin.cost} coins`}</div>
                <button class="btn ${isOwned ? (isActive ? 'btn-secondary' : 'btn-primary') : 'btn-secondary'}" 
                        ${isOwned ? '' : `onclick="window.uiManager.buyItem('skin', '${skin.id}')"`}
                        ${isOwned && !isActive ? `onclick="window.uiManager.selectSkin('${skin.id}')"` : ''}>
                    ${isActive ? 'Active' : (isOwned ? 'Select' : 'Buy')}
                </button>
            `;

            skinsGrid.appendChild(skinElement);
        });
    }

    populateThemes() {
        const themesGrid = document.getElementById('themesGrid');
        themesGrid.innerHTML = '';

        this.availableThemes.forEach(theme => {
            const isOwned = this.ownedThemes.includes(theme.id);
            const isActive = this.currentTheme === theme.id;

            const themeElement = document.createElement('div');
            themeElement.className = `shop-item ${isOwned ? 'owned' : ''} ${isActive ? 'active' : ''}`;
            
            themeElement.innerHTML = `
                <div class="shop-item-preview theme-preview ${theme.id}-preview"></div>
                <div class="shop-item-name">${theme.name}</div>
                <div class="shop-item-cost">${theme.cost === 0 ? 'Free' : `${theme.cost} coins`}</div>
                <button class="btn ${isOwned ? (isActive ? 'btn-secondary' : 'btn-primary') : 'btn-secondary'}" 
                        ${isOwned ? '' : `onclick="window.uiManager.buyItem('theme', '${theme.id}')"`}
                        ${isOwned && !isActive ? `onclick="window.uiManager.selectTheme('${theme.id}')"` : ''}>
                    ${isActive ? 'Active' : (isOwned ? 'Select' : 'Buy')}
                </button>
            `;

            themesGrid.appendChild(themeElement);
        });
    }

    buyItem(itemType, itemId) {
        const currentCoins = window.storageManager.loadCoins();
        let item, ownedList;

        if (itemType === 'skin') {
            item = this.availableSkins.find(s => s.id === itemId);
            ownedList = this.ownedSkins;
        } else {
            item = this.availableThemes.find(t => t.id === itemId);
            ownedList = this.ownedThemes;
        }

        if (!item) return;

        if (currentCoins >= item.cost) {
            // Deduct coins
            const newCoins = currentCoins - item.cost;
            window.storageManager.saveCoins(newCoins);

            // Add to owned items
            ownedList.push(itemId);
            window.storageManager.saveOwnedItems(itemType === 'skin' ? 'skins' : 'themes', ownedList);

            // Apply the item immediately
            if (itemType === 'skin') {
                this.selectSkin(itemId);
            } else {
                this.selectTheme(itemId);
            }

            // Update UI
            this.populateShop();
            this.updateShopCoins();

            alert(`${item.name} purchased successfully!`);
        } else {
            alert(`Not enough coins! You need ${item.cost - currentCoins} more coins.`);
        }
    }

    selectSkin(skinId) {
        if (!this.ownedSkins.includes(skinId)) return;

        this.currentSkin = skinId;
        window.storageManager.saveCurrentSkin(skinId);
        this.applySkin(skinId);
        this.populateShop();
    }

    applySkin(skinId) {
        const skin = this.availableSkins.find(s => s.id === skinId);
        if (skin) {
            document.documentElement.style.setProperty('--player-color', skin.color);
        }
    }

    updateShopCoins() {
        const shopCoinsValue = document.getElementById('shopCoinsValue');
        if (shopCoinsValue) {
            shopCoinsValue.textContent = window.storageManager.loadCoins().toLocaleString();
        }
    }

    // Theme Management
    selectTheme(themeName) {
        // Check if theme is owned (except for settings menu)
        if (this.currentScreen === 'shopMenu' && !this.ownedThemes.includes(themeName)) {
            return;
        }

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
    updateScore(score, coins) {
        const scoreValue = document.getElementById('scoreValue');
        if (scoreValue) {
            scoreValue.textContent = score.toLocaleString();
        }
        
        this.updateCoins(coins);
    }

    updateCoins(coins) {
        const coinsValue = document.getElementById('coinsValue');
        if (coinsValue) {
            coinsValue.textContent = coins.toLocaleString();
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
        document.getElementById('finalCoins').textContent = stats.coins.toLocaleString();
        document.getElementById('finalTheme').textContent = stats.theme;
        
        setTimeout(() => {
            this.showScreen('gameOverScreen');
        }, 1000);
    }

    // Import/Export Functionality
    exportGameData() {
        try {
            const encodedData = window.storageManager.exportGameData();
            const exportTextarea = document.getElementById('exportDataTextarea');
            exportTextarea.value = encodedData;
            
            // Copy to clipboard
            navigator.clipboard.writeText(encodedData).then(() => {
                alert('Game data exported and copied to clipboard!');
            }).catch(() => {
                alert('Game data exported! Copy the text from the box above.');
            });
        } catch (error) {
            alert('Failed to export game data: ' + error.message);
        }
    }

    importGameData() {
        try {
            const importTextarea = document.getElementById('importDataTextarea');
            const encodedData = importTextarea.value.trim();
            
            if (!encodedData) {
                alert('Please paste your game data first.');
                return;
            }
            
            window.storageManager.importGameData(encodedData);
            
            // Reload settings
            this.loadSettings();
            this.populateShop();
            this.updateShopCoins();
            
            alert('Game data imported successfully!');
            importTextarea.value = '';
        } catch (error) {
            alert('Failed to import game data: ' + error.message);
        }
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