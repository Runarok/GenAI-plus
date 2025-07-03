// Memory and Conversation Management
class Memory {
    constructor() {
        this.conversation = [];
        this.loadConversation();
    }

    addMessage(role, content) {
        const message = {
            role: role,
            content: content,
            timestamp: Date.now()
        };
        
        this.conversation.push(message);
        this.saveConversation();
        return message;
    }

    getConversation() {
        return this.conversation;
    }

    getConversationForAPI() {
        // Return conversation in API format
        return this.conversation.map(msg => ({
            role: msg.role,
            content: msg.content
        }));
    }

    clearConversation() {
        this.conversation = [];
        this.saveConversation();
    }

    saveConversation() {
        try {
            sessionStorage.setItem('silentmend_conversation', JSON.stringify(this.conversation));
        } catch (error) {
            console.warn('Failed to save conversation to sessionStorage');
        }
    }

    loadConversation() {
        try {
            const saved = sessionStorage.getItem('silentmend_conversation');
            if (saved) {
                this.conversation = JSON.parse(saved);
            }
        } catch (error) {
            console.warn('Failed to load conversation from sessionStorage');
            this.conversation = [];
        }
    }

    getLastUserMessage() {
        for (let i = this.conversation.length - 1; i >= 0; i--) {
            if (this.conversation[i].role === 'user') {
                return this.conversation[i];
            }
        }
        return null;
    }

    getConversationLength() {
        return this.conversation.length;
    }

    // Trim conversation if it gets too long (keep last 20 messages)
    trimConversation() {
        if (this.conversation.length > 20) {
            this.conversation = this.conversation.slice(-20);
            this.saveConversation();
        }
    }
}

// Global memory instance
window.silentMendMemory = new Memory();