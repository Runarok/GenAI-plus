// Enhanced UI Management with Markdown Rendering and Context Awareness
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
        e.target.style.height = Math.min(e.target.scrollHeight, 140) + 'px';
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

        // Check if this message references previous context
        const isContextRef = this.memory.isContextReference(message);

        // Add user message
        this.addMessage(message, 'user', false, isContextRef);
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
            } else if (error.message.includes('safety') || error.message.includes('blocked')) {
                errorMessage = 'Message blocked by safety filters. Rephrase your request.';
            }
            
            this.addMessage(errorMessage, 'bot', true);
        }
    }

    addMessage(content, sender, isError = false, isContextRef = false) {
        const chatContainer = this.elements.chatContainer;
        const initialMessage = chatContainer.querySelector('.initial-message');
        
        if (initialMessage) {
            initialMessage.remove();
        }

        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        if (isError) messageDiv.classList.add('error');
        if (isContextRef) messageDiv.classList.add('context-reference');

        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        
        const formattedContent = this.formatContent(content);
        contentDiv.innerHTML = formattedContent;
        
        messageDiv.appendChild(contentDiv);
        chatContainer.appendChild(messageDiv);
        
        this.scrollToBottom();
    }

    formatContent(content) {
        // Enhanced markdown-style formatting with safety
        let formatted = this.escapeHtml(content);
        
        // Convert **bold** to <strong>
        formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        
        // Convert *italic* to <em>
        formatted = formatted.replace(/\*(.*?)\*/g, '<em>$1</em>');
        
        // Convert line breaks
        formatted = formatted.replace(/\n/g, '<br>');
        
        // Handle bullet points
        const lines = formatted.split('<br>');
        let inList = false;
        let result = '';
        
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            
            if (line.match(/^[-*]\s+/)) {
                if (!inList) {
                    result += '<ul>';
                    inList = true;
                }
                const listItem = line.replace(/^[-*]\s+/, '');
                result += `<li>${listItem}</li>`;
            } else {
                if (inList) {
                    result += '</ul>';
                    inList = false;
                }
                if (line) {
                    result += `<p>${line}</p>`;
                } else if (i < lines.length - 1) {
                    result += '<br>';
                }
            }
        }
        
        if (inList) {
            result += '</ul>';
        }
        
        // Handle quotes with more flexible detection
        // Match quotes that are standalone sentences or paragraphs
        result = result.replace(/<p>"([^"]+)"<\/p>/g, '<div class="quote">$1</div>');
        result = result.replace(/^"([^"]+)"$/gm, '<div class="quote">$1</div>');
        
        // Also handle quotes that span multiple lines or are part of larger text
        result = result.replace(/"([^"]{20,}?)"/g, '<div class="quote">$1</div>');
        
        return result || `<p>${this.escapeHtml(content)}</p>`;
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
                initialDiv.innerHTML = `
                    <p>Conversations are not connections. Insight over performance.</p>
                    <p class="context-note">I maintain conversational context. Reference earlier topics naturally.</p>
                `;
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
                const isContextRef = sender === 'user' && this.memory.isContextReference(msg.content);
                this.addMessage(msg.content, sender, false, isContextRef);
            }
        }
    }

    clearMemory() {
        this.memory.clearConversation();
        this.config.clearSettings();
        
        const chatContainer = this.elements.chatContainer;
        chatContainer.innerHTML = `
            <div class="initial-message">
                <p>Conversations are not connections. Insight over performance.</p>
                <p class="context-note">I maintain conversational context. Reference earlier topics naturally.</p>
            </div>
        `;
        
        // Reset form fields
        this.elements.apiKeyInput.value = '';
        this.elements.themeSelector.value = 'graphite';
        this.elements.modelSelector.value = 'gemini';
        this.applyTheme();
        this.updateApiKeyPlaceholder();
    }
}

// Global UI instance
window.silentMendUI = new UI();