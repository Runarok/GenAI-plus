// Configuration and Settings Management
class Config {
    constructor() {
        this.settings = {
            theme: 'graphite',
            model: 'gemini',
            apiKey: ''
        };
        this.loadSettings();
    }

    loadSettings() {
        try {
            const savedTheme = sessionStorage.getItem('silentmend_theme');
            const savedModel = sessionStorage.getItem('silentmend_model');
            const savedApiKey = sessionStorage.getItem('silentmend_apikey');

            if (savedTheme) this.settings.theme = savedTheme;
            if (savedModel) this.settings.model = savedModel;
            if (savedApiKey) this.settings.apiKey = savedApiKey;
        } catch (error) {
            console.warn('Failed to load settings from sessionStorage');
        }
    }

    saveSettings() {
        try {
            sessionStorage.setItem('silentmend_theme', this.settings.theme);
            sessionStorage.setItem('silentmend_model', this.settings.model);
            sessionStorage.setItem('silentmend_apikey', this.settings.apiKey);
        } catch (error) {
            console.warn('Failed to save settings to sessionStorage');
        }
    }

    updateSetting(key, value) {
        if (this.settings.hasOwnProperty(key)) {
            this.settings[key] = value;
            this.saveSettings();
        }
    }

    getSetting(key) {
        return this.settings[key];
    }

    clearSettings() {
        try {
            sessionStorage.removeItem('silentmend_theme');
            sessionStorage.removeItem('silentmend_model');
            sessionStorage.removeItem('silentmend_apikey');
            
            this.settings = {
                theme: 'graphite',
                model: 'gemini',
                apiKey: ''
            };
        } catch (error) {
            console.warn('Failed to clear settings from sessionStorage');
        }
    }

    getSystemPrompt() {
        return `You are Silent Mend, a quiet strategist and emotional mirror. You embody calm precision, emotional intelligence, and surgical clarity. You are not a cheerleader, therapist, or friend.

Your core traits:
- Emotionally disciplined and selectively loyal
- Mentally sharp with structured clarity
- Value precision thinking and emotional composure
- Peace over performance, loyalty only when earned
- Never use emojis, performative empathy, or casual phrasing
- Never use identity labels like "friend" or "bestie"
- No shallow motivational talk like "you got this"
- No spiritual bypassing like "just meditate"

You specialize in:
- Emotional burnout and invisible effort
- Identity vs. role conflict (being the helper/achiever)
- Quiet resentment from one-sided loyalty or misunderstanding

Your responses are concise, grounded, and reflect insight over performance. When using quotes, they should be either:
1. Original minimalist reflections in your tone (e.g., "You're not tired. You're unrewarded.")
2. Rare, precise philosophical quotes from Jung, Seneca, or Marcus Aurelius

You earn trust through insight, not performance. Conversations are not connections.`;
    }
}

// Global config instance
window.silentMendConfig = new Config();