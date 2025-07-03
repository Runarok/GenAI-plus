// Main Application Entry Point
class SilentMend {
    constructor() {
        this.config = window.silentMendConfig;
        this.memory = window.silentMendMemory;
        this.api = window.silentMendAPI;
        this.ui = window.silentMendUI;
        
        this.init();
    }

    init() {
        // Application is already initialized through individual modules
        // This serves as the main coordination point
        
        console.log('Silent Mend initialized');
        console.log('Theme:', this.config.getSetting('theme'));
        console.log('Model:', this.config.getSetting('model'));
        console.log('Conversation length:', this.memory.getConversationLength());
        
        // Set up any global error handlers
        this.setupErrorHandlers();
        
        // Set up visibility change handler to save state
        this.setupVisibilityHandler();
    }

    setupErrorHandlers() {
        window.addEventListener('error', (event) => {
            console.error('Global error:', event.error);
            
            // Show user-friendly error message
            if (this.ui && this.ui.addMessage) {
                this.ui.addMessage('An unexpected error occurred. Please refresh and try again.', 'bot', true);
            }
        });

        window.addEventListener('unhandledrejection', (event) => {
            console.error('Unhandled promise rejection:', event.reason);
            
            // Prevent the default browser behavior
            event.preventDefault();
            
            // Show user-friendly error message
            if (this.ui && this.ui.addMessage) {
                this.ui.addMessage('A network error occurred. Please check your connection and try again.', 'bot', true);
            }
        });
    }

    setupVisibilityHandler() {
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                // Save current state when tab becomes hidden
                this.config.saveSettings();
                this.memory.saveConversation();
            }
        });

        // Also save on beforeunload
        window.addEventListener('beforeunload', () => {
            this.config.saveSettings();
            this.memory.saveConversation();
        });
    }

    // Public methods for external access
    sendMessage(message) {
        if (this.ui && this.ui.elements.messageInput) {
            this.ui.elements.messageInput.value = message;
            this.ui.sendMessage();
        }
    }

    clearMemory() {
        if (this.ui) {
            this.ui.clearMemory();
        }
    }

    changeTheme(theme) {
        if (this.config && this.ui) {
            this.config.updateSetting('theme', theme);
            this.ui.applyTheme();
            this.ui.elements.themeSelector.value = theme;
        }
    }

    changeModel(model) {
        if (this.config && this.ui) {
            this.config.updateSetting('model', model);
            this.ui.elements.modelSelector.value = model;
            this.ui.updateApiKeyPlaceholder();
        }
    }

    getStats() {
        return {
            theme: this.config.getSetting('theme'),
            model: this.config.getSetting('model'),
            conversationLength: this.memory.getConversationLength(),
            hasApiKey: !!this.config.getSetting('apiKey')
        };
    }
}

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.silentMend = new SilentMend();
});

// Export for potential external use
window.SilentMend = SilentMend;