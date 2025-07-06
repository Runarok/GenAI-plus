// Local Storage Management
class StorageManager {
    constructor() {
        this.keys = {
            THEME: 'skywardAscent_theme',
            AUDIO: 'skywardAscent_audio',
            HIGH_SCORE: 'skywardAscent_highScore',
            COINS: 'skywardAscent_coins',
            OWNED_SKINS: 'skywardAscent_ownedSkins',
            OWNED_THEMES: 'skywardAscent_ownedThemes',
            CURRENT_SKIN: 'skywardAscent_currentSkin'
        };
    }

    // Theme Management
    saveTheme(theme) {
        try {
            localStorage.setItem(this.keys.THEME, theme);
        } catch (error) {
            console.warn('Failed to save theme to localStorage:', error);
        }
    }

    loadTheme() {
        try {
            return localStorage.getItem(this.keys.THEME) || 'dark-mountains';
        } catch (error) {
            console.warn('Failed to load theme from localStorage:', error);
            return 'dark-mountains';
        }
    }

    // Audio Settings
    saveAudioSetting(enabled) {
        try {
            localStorage.setItem(this.keys.AUDIO, enabled.toString());
        } catch (error) {
            console.warn('Failed to save audio setting to localStorage:', error);
        }
    }

    loadAudioSetting() {
        try {
            const saved = localStorage.getItem(this.keys.AUDIO);
            return saved !== null ? saved === 'true' : true;
        } catch (error) {
            console.warn('Failed to load audio setting from localStorage:', error);
            return true;
        }
    }

    // High Score Management
    saveHighScore(score) {
        try {
            const currentHigh = this.loadHighScore();
            if (score > currentHigh) {
                localStorage.setItem(this.keys.HIGH_SCORE, score.toString());
                return true; // New high score
            }
            return false;
        } catch (error) {
            console.warn('Failed to save high score to localStorage:', error);
            return false;
        }
    }

    loadHighScore() {
        try {
            return parseInt(localStorage.getItem(this.keys.HIGH_SCORE)) || 0;
        } catch (error) {
            console.warn('Failed to load high score from localStorage:', error);
            return 0;
        }
    }

    // Coins Management
    saveCoins(coins) {
        try {
            localStorage.setItem(this.keys.COINS, coins.toString());
        } catch (error) {
            console.warn('Failed to save coins to localStorage:', error);
        }
    }

    loadCoins() {
        try {
            return parseInt(localStorage.getItem(this.keys.COINS)) || 0;
        } catch (error) {
            console.warn('Failed to load coins from localStorage:', error);
            return 0;
        }
    }

    // Owned Items Management
    saveOwnedItems(itemType, items) {
        try {
            const key = itemType === 'skins' ? this.keys.OWNED_SKINS : this.keys.OWNED_THEMES;
            localStorage.setItem(key, JSON.stringify(items));
        } catch (error) {
            console.warn('Failed to save owned items to localStorage:', error);
        }
    }

    loadOwnedItems(itemType) {
        try {
            const key = itemType === 'skins' ? this.keys.OWNED_SKINS : this.keys.OWNED_THEMES;
            const saved = localStorage.getItem(key);
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.warn('Failed to load owned items from localStorage:', error);
            return [];
        }
    }

    // Current Skin Management
    saveCurrentSkin(skinId) {
        try {
            localStorage.setItem(this.keys.CURRENT_SKIN, skinId);
        } catch (error) {
            console.warn('Failed to save current skin to localStorage:', error);
        }
    }

    loadCurrentSkin() {
        try {
            return localStorage.getItem(this.keys.CURRENT_SKIN) || 'default';
        } catch (error) {
            console.warn('Failed to load current skin from localStorage:', error);
            return 'default';
        }
    }

    // Import/Export Functionality
    exportGameData() {
        try {
            const gameData = {
                theme: this.loadTheme(),
                audio: this.loadAudioSetting(),
                highScore: this.loadHighScore(),
                coins: this.loadCoins(),
                ownedSkins: this.loadOwnedItems('skins'),
                ownedThemes: this.loadOwnedItems('themes'),
                currentSkin: this.loadCurrentSkin(),
                version: '1.0'
            };
            
            const jsonString = JSON.stringify(gameData);
            return btoa(jsonString);
        } catch (error) {
            console.warn('Failed to export game data:', error);
            throw new Error('Failed to export game data');
        }
    }

    importGameData(encodedData) {
        try {
            const jsonString = atob(encodedData);
            const gameData = JSON.parse(jsonString);
            
            // Validate data structure
            if (!gameData.version) {
                throw new Error('Invalid data format');
            }
            
            // Import all data
            if (gameData.theme) this.saveTheme(gameData.theme);
            if (typeof gameData.audio === 'boolean') this.saveAudioSetting(gameData.audio);
            if (typeof gameData.highScore === 'number') this.saveHighScore(gameData.highScore);
            if (typeof gameData.coins === 'number') this.saveCoins(gameData.coins);
            if (Array.isArray(gameData.ownedSkins)) this.saveOwnedItems('skins', gameData.ownedSkins);
            if (Array.isArray(gameData.ownedThemes)) this.saveOwnedItems('themes', gameData.ownedThemes);
            if (gameData.currentSkin) this.saveCurrentSkin(gameData.currentSkin);
            
            return true;
        } catch (error) {
            console.warn('Failed to import game data:', error);
            throw new Error('Invalid or corrupted data');
        }
    }

    // Clear all data
    clearAll() {
        try {
            Object.values(this.keys).forEach(key => {
                localStorage.removeItem(key);
            });
        } catch (error) {
            console.warn('Failed to clear localStorage:', error);
        }
    }
}

// Global storage instance
window.storageManager = new StorageManager();