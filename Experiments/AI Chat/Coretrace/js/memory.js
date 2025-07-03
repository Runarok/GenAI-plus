// Enhanced Memory and Conversation Management with Context Tracking
class Memory {
    constructor() {
        this.conversation = [];
        this.contextMap = new Map(); // Track topics and their emotional contexts
        this.loadConversation();
    }

    addMessage(role, content) {
        const message = {
            role: role,
            content: content,
            timestamp: Date.now(),
            id: this.generateMessageId()
        };
        
        this.conversation.push(message);
        
        // Extract and store context for user messages
        if (role === 'user') {
            this.extractContext(message);
        }
        
        this.saveConversation();
        return message;
    }

    generateMessageId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    extractContext(message) {
        const content = message.content.toLowerCase();
        const emotionalKeywords = {
            'unseen': ['invisible', 'ignored', 'overlooked', 'unnoticed', 'dismissed'],
            'burnout': ['exhausted', 'drained', 'tired', 'overwhelmed', 'depleted'],
            'resentment': ['angry', 'frustrated', 'bitter', 'unfair', 'taken advantage'],
            'helper': ['always helping', 'people pleaser', 'giving', 'supporting others'],
            'achiever': ['perfectionist', 'high standards', 'never enough', 'proving myself'],
            'family': ['family', 'parents', 'siblings', 'relatives', 'home'],
            'work': ['work', 'job', 'boss', 'colleagues', 'office', 'career'],
            'relationship': ['partner', 'spouse', 'boyfriend', 'girlfriend', 'dating']
        };

        // Store emotional and topical context
        for (const [context, keywords] of Object.entries(emotionalKeywords)) {
            if (keywords.some(keyword => content.includes(keyword)) || content.includes(context)) {
                this.contextMap.set(context, {
                    messageId: message.id,
                    timestamp: message.timestamp,
                    strength: this.calculateContextStrength(content, keywords)
                });
            }
        }

        // Store pronouns and their likely references
        this.trackPronouns(message);
    }

    trackPronouns(message) {
        const content = message.content.toLowerCase();
        const pronouns = ['it', 'this', 'that', 'they', 'them'];
        
        if (pronouns.some(pronoun => content.includes(pronoun))) {
            // Find the most recent relevant context
            const recentContext = this.getMostRecentContext();
            if (recentContext) {
                this.contextMap.set('recent_reference', {
                    messageId: message.id,
                    timestamp: message.timestamp,
                    referenceContext: recentContext
                });
            }
        }
    }

    calculateContextStrength(content, keywords) {
        let strength = 0;
        keywords.forEach(keyword => {
            if (content.includes(keyword)) strength++;
        });
        return strength;
    }

    getMostRecentContext() {
        let mostRecent = null;
        let latestTime = 0;

        for (const [context, data] of this.contextMap.entries()) {
            if (context !== 'recent_reference' && data.timestamp > latestTime) {
                latestTime = data.timestamp;
                mostRecent = context;
            }
        }

        return mostRecent;
    }

    getConversation() {
        return this.conversation;
    }

    getConversationForAPI() {
        // Return conversation in API format with enhanced context
        const apiMessages = this.conversation.map(msg => ({
            role: msg.role,
            content: msg.content
        }));

        // Add context hints for the AI if there are recent references
        const recentRef = this.contextMap.get('recent_reference');
        if (recentRef && recentRef.referenceContext) {
            const lastMessage = apiMessages[apiMessages.length - 1];
            if (lastMessage && lastMessage.role === 'user') {
                lastMessage.content += `\n\n[Context: User may be referring to previous discussion about ${recentRef.referenceContext}]`;
            }
        }

        return apiMessages;
    }

    getContextSummary() {
        const summary = {};
        for (const [context, data] of this.contextMap.entries()) {
            if (context !== 'recent_reference') {
                summary[context] = {
                    strength: data.strength || 1,
                    recency: Date.now() - data.timestamp
                };
            }
        }
        return summary;
    }

    clearConversation() {
        this.conversation = [];
        this.contextMap.clear();
        this.saveConversation();
    }

    saveConversation() {
        try {
            const data = {
                conversation: this.conversation,
                contextMap: Array.from(this.contextMap.entries())
            };
            sessionStorage.setItem('silentmend_conversation', JSON.stringify(data));
        } catch (error) {
            console.warn('Failed to save conversation to sessionStorage');
        }
    }

    loadConversation() {
        try {
            const saved = sessionStorage.getItem('silentmend_conversation');
            if (saved) {
                const data = JSON.parse(saved);
                this.conversation = data.conversation || [];
                this.contextMap = new Map(data.contextMap || []);
            }
        } catch (error) {
            console.warn('Failed to load conversation from sessionStorage');
            this.conversation = [];
            this.contextMap = new Map();
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

    // Trim conversation if it gets too long (keep last 30 messages)
    trimConversation() {
        if (this.conversation.length > 30) {
            const removed = this.conversation.splice(0, this.conversation.length - 30);
            
            // Clean up context map for removed messages
            const remainingIds = new Set(this.conversation.map(msg => msg.id));
            for (const [context, data] of this.contextMap.entries()) {
                if (!remainingIds.has(data.messageId)) {
                    this.contextMap.delete(context);
                }
            }
            
            this.saveConversation();
        }
    }

    // Check if a message should be marked as context-referencing
    isContextReference(messageContent) {
        const content = messageContent.toLowerCase();
        const referenceWords = ['it', 'this', 'that', 'they', 'them', 'like that', 'similar', 'same thing'];
        return referenceWords.some(word => content.includes(word));
    }
}

// Global memory instance
window.silentMendMemory = new Memory();