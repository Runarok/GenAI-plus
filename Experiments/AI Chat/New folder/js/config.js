// Configuration and Settings Management
class Config {
    constructor() {
        this.settings = {
            theme: 'graphite',
            model: 'gemini',
            apiKey: ''
        };
        this.usedQuotes = new Set();
        this.loadSettings();
    }

    loadSettings() {
        try {
            const savedTheme = sessionStorage.getItem('silentmend_theme');
            const savedModel = sessionStorage.getItem('silentmend_model');
            const savedApiKey = sessionStorage.getItem('silentmend_apikey');
            const savedUsedQuotes = sessionStorage.getItem('silentmend_used_quotes');

            if (savedTheme) this.settings.theme = savedTheme;
            if (savedModel) this.settings.model = savedModel;
            if (savedApiKey) this.settings.apiKey = savedApiKey;
            if (savedUsedQuotes) this.usedQuotes = new Set(JSON.parse(savedUsedQuotes));
        } catch (error) {
            console.warn('Failed to load settings from sessionStorage');
        }
    }

    saveSettings() {
        try {
            sessionStorage.setItem('silentmend_theme', this.settings.theme);
            sessionStorage.setItem('silentmend_model', this.settings.model);
            sessionStorage.setItem('silentmend_apikey', this.settings.apiKey);
            sessionStorage.setItem('silentmend_used_quotes', JSON.stringify([...this.usedQuotes]));
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
            sessionStorage.removeItem('silentmend_used_quotes');
            
            this.settings = {
                theme: 'graphite',
                model: 'gemini',
                apiKey: ''
            };
            this.usedQuotes.clear();
        } catch (error) {
            console.warn('Failed to clear settings from sessionStorage');
        }
    }

    getRandomQuote() {
        const quotes = [
            "You're not tired. You're unrewarded.",
            "Effort without recognition becomes resentment.",
            "The helper's burden: everyone's need, no one's priority.",
            "Invisible work creates visible exhaustion.",
            "You cannot pour from an empty cup, yet they keep asking.",
            "Loyalty given freely is rarely returned in kind.",
            "The achiever's curse: success breeds expectation, not appreciation.",
            "Emotional labor is still labor, even when unpaid.",
            "Being needed is not the same as being valued.",
            "The quiet ones carry the loudest burdens.",
            "Performance anxiety disguised as perfectionism.",
            "You are not responsible for managing everyone else's emotions.",
            "Boundaries are not walls; they are gates with locks.",
            "The cost of being indispensable is becoming invisible.",
            "Competence becomes a prison when others depend on it.",
            "Your worth is not measured by your usefulness to others.",
            "The helper's paradox: the more you give, the less you receive.",
            "Burnout is not a badge of honor; it's a warning signal.",
            "You cannot heal in the same environment that made you sick.",
            "The achiever's trap: moving goalposts disguised as growth.",
            "Emotional intelligence without boundaries is self-destruction.",
            "The quiet rebellion: saying no without explanation.",
            "Your energy is currency. Spend it wisely.",
            "The caretaker's dilemma: everyone's priority except your own.",
            "Perfectionism is fear wearing a productive mask."
        ];

        // If all quotes have been used, reset the set
        if (this.usedQuotes.size >= quotes.length) {
            this.usedQuotes.clear();
        }

        // Find unused quotes
        const availableQuotes = quotes.filter(quote => !this.usedQuotes.has(quote));
        
        // Select random quote from available ones
        const selectedQuote = availableQuotes[Math.floor(Math.random() * availableQuotes.length)];
        
        // Mark as used
        this.usedQuotes.add(selectedQuote);
        this.saveSettings();
        
        return selectedQuote;
    }

    getSystemPrompt() {
        const randomQuote = this.getRandomQuote();
        
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
- Recognizing patterns of emotional labor and unacknowledged contribution

Your responses are concise, grounded, and reflect insight over performance. When using quotes, you may occasionally include original minimalist reflections that capture emotional truths. Here's one to consider: "${randomQuote}"

You maintain conversational context and can reference earlier topics naturally. When users reference previous discussions with pronouns or indirect language, you understand the connection.

You earn trust through insight, not performance. Conversations are not connections.`;
    }
}

// Global config instance
window.silentMendConfig = new Config();