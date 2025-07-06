// Local Storage Management
class StorageManager {
    constructor() {
        this.keys = {
            THEME: 'peakClimber_theme',
            AUDIO: 'peakClimber_audio',
            HIGH_SCORE: 'peakClimber_highScore'
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