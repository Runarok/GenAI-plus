// UI Management and Interactions
class UI {
    constructor() {
        this.config = window.silentMendConfig;
        this.memory = window.silentMendMemory;
        this.api = window.silentMendAPI;
        
        this.elements = {};
        this.isTyping = false;
        this.init();
    }

    init() {
        this.cacheElements();
        this.bindEvents();
        this.applyTheme();
        this.loadSettings();
        this.rebuildChat();
    }

    cacheElements() {
        this.elements = {
            chatContainer: document.getElementById('chatContainer'),
            messageInput: document.getElementById('messageInput'),
            sendBtn: document.getElementById('sendBtn'),
            typingIndicator: document.getElementById('typingIndicator'),
            themeSelector: document.getElementById('themeSelector'),
            modelSelector: document.getElementById('modelSelector'),
            apiKeyInput: document.getElementById('apiKeyInput'),
            clearMemoryBtn: document.getElementById('clearMemoryBtn')
        };
    }

    bindEvents() {
        // Message input events
        this.elements.messageInput.addEventListener('input', this.handleInputResize.bind(this));
        this.elements.messageInput.addEventListener('keydown', this.handleKeyDown.bind(this));

        // Send button
        this.elements.sendBtn.addEventListener('click', this.sendMessage.bind(this));

        // Settings events
        this.elements.themeSelector.addEventListener('change', this.handleThemeChange.bind(this));
        this.elements.modelSelector.addEventListener('change', this.handleModelChange.bind(this));
        this.elements.apiKeyInput.addEventListener('input', this.handleApiKeyChange.bind(this));

        // Clear memory button
        this.elements.clearMemoryBtn.addEventListener('click', this.clearMemory.bind(this));
    }

    handleInputResize(e) {
        e.target.style.height = 'auto';
        e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
    }

    handleKeyDown(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            this.sendMessage();
        }
    }

    handleThemeChange(e) {
        const theme = e.target.value;
        this.config.updateSetting('theme', theme);
        this.applyTheme();
    }

    handleModelChange(e) {
        const model = e.target.value;
        this.config.updateSetting('model', model);
        this.elements.apiKeyInput.value = '';
        this.config.updateSetting('apiKey', '');
        this.updateApiKeyPlaceholder();
    }

    handleApiKeyChange(e) {
        const apiKey = e.target.value;
        this.config.updateSetting('apiKey', apiKey);
    }

    updateApiKeyPlaceholder() {
        const model = this.config.getSetting('model');
        const placeholder = model === 'openai' ? 'Enter OpenAI API Key' : 'Enter Gemini API Key';
        this.elements.apiKeyInput.placeholder = placeholder;
    }

    applyTheme() {
        const theme = this.config.getSetting('theme');
        document.body.setAttribute('data-theme', theme);
    }

    loadSettings() {
        this.elements.themeSelector.value = this.config.getSetting('theme');
        this.elements.modelSelector.value = this.config.getSetting('model');
        this.elements.apiKeyInput.value = this.config.getSetting('apiKey');
        this.updateApiKeyPlaceholder();
    }

    async sendMessage() {
        const message = this.elements.messageInput.value.trim();
        
        if (!message || this.isTyping) return;

        const apiKey = this.config.getSetting('apiKey');
        const model = this.config.getSetting('model');

        if (!apiKey) {
            this.addMessage('Enter your API key to begin.', 'bot', true);
            return;
        }

        if (!this.api.validateApiKey(model, apiKey)) {
            this.addMessage('Invalid API key format. Please check your key and try again.', 'bot', true);
            return;
        }

        // Clear input
        this.elements.messageInput.value = '';
        this.elements.messageInput.style.height = 'auto';

        // Add user message
        this.addMessage(message, 'user');
        this.memory.addMessage('user', message);

        // Show typing indicator
        this.showTyping();

        try {
            const conversation = this.memory.getConversationForAPI();
            const response = await this.api.sendMessage(conversation);
            
            this.hideTyping();
            this.addMessage(response, 'bot');
            this.memory.addMessage('assistant', response);
            this.memory.trimConversation();
        } catch (error) {
            this.hideTyping();
            console.error('API Error:', error);
            
            let errorMessage = 'Connection failed. Your words remain unheard for now.';
            if (error.message.includes('API key')) {
                errorMessage = 'Invalid API key. Please verify your credentials.';
            } else if (error.message.includes('quota') || error.message.includes('billing')) {
                errorMessage = 'API quota exceeded. Check your account status.';
            }
            
            this.addMessage(errorMessage, 'bot', true);
        }
    }

    addMessage(content, sender, isError = false) {
        const chatContainer = this.elements.chatContainer;
        const initialMessage = chatContainer.querySelector('.initial-message');
        
        if (initialMessage) {
            initialMessage.remove();
        }

        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        if (isError) messageDiv.classList.add('error');

        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        
        const formattedContent = this.formatContent(content);
        contentDiv.innerHTML = formattedContent;
        
        messageDiv.appendChild(contentDiv);
        chatContainer.appendChild(messageDiv);
        
        this.scrollToBottom();
    }

    formatContent(content) {
        const lines = content.split('\n');
        let formatted = '';
        
        for (let line of lines) {
            line = line.trim();
            if (line.startsWith('"') && line.endsWith('"') && line.length > 2) {
                formatted += `<div class="quote">${line.slice(1, -1)}</div>`;
            } else if (line) {
                formatted += `<p>${this.escapeHtml(line)}</p>`;
            }
        }
        
        return formatted || `<p>${this.escapeHtml(content)}</p>`;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    showTyping() {
        this.isTyping = true;
        this.elements.sendBtn.disabled = true;
        this.elements.typingIndicator.classList.add('show');
        this.elements.chatContainer.appendChild(this.elements.typingIndicator);
        this.scrollToBottom();
    }

    hideTyping() {
        this.isTyping = false;
        this.elements.sendBtn.disabled = false;
        this.elements.typingIndicator.classList.remove('show');
    }

    scrollToBottom() {
        setTimeout(() => {
            this.elements.chatContainer.scrollTop = this.elements.chatContainer.scrollHeight;
        }, 100);
    }

    rebuildChat() {
        const chatContainer = this.elements.chatContainer;
        const conversation = this.memory.getConversation();
        
        // Clear existing messages except initial message
        const messages = chatContainer.querySelectorAll('.message');
        messages.forEach(msg => msg.remove());

        if (conversation.length === 0) {
            // Show initial message if no conversation
            if (!chatContainer.querySelector('.initial-message')) {
                const initialDiv = document.createElement('div');
                initialDiv.className = 'initial-message';
                initialDiv.innerHTML = '<p>Conversations are not connections. Insight over performance.</p>';
                chatContainer.appendChild(initialDiv);
            }
        } else {
            // Remove initial message if conversation exists
            const initialMessage = chatContainer.querySelector('.initial-message');
            if (initialMessage) {
                initialMessage.remove();
            }

            // Rebuild conversation
            for (let msg of conversation) {
                const sender = msg.role === 'user' ? 'user' : 'bot';
                this.addMessage(msg.content, sender);
            }
        }
    }

    clearMemory() {
        this.memory.clearConversation();
        
        const chatContainer = this.elements.chatContainer;
        chatContainer.innerHTML = '<div class="initial-message"><p>Conversations are not connections. Insight over performance.</p></div>';
        
        // Optional: Clear API key as well
        // this.elements.apiKeyInput.value = '';
        // this.config.updateSetting('apiKey', '');
    }
}

// Global UI instance
window.silentMendUI = new UI();