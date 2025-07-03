// API Handler for Gemini
class APIHandler {
    constructor() {
        this.config = window.silentMendConfig;
    }

    async sendMessage(messages) {
        const apiKey = this.config.getSetting('apiKey');

        if (!apiKey) {
            throw new Error('API key is required');
        }

        return await this.callGemini(messages, apiKey);
    }

    async callGemini(messages, apiKey) {
        const systemPrompt = this.config.getSystemPrompt();
        
        // Convert messages to Gemini format
        const geminiMessages = this.convertToGeminiFormat(messages, systemPrompt);

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-goog-api-key': apiKey
            },
            body: JSON.stringify({
                contents: geminiMessages,
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.9,
                    maxOutputTokens: 500
                },
                safetySettings: [
                    {
                        category: "HARM_CATEGORY_HARASSMENT",
                        threshold: "BLOCK_MEDIUM_AND_ABOVE"
                    },
                    {
                        category: "HARM_CATEGORY_HATE_SPEECH",
                        threshold: "BLOCK_MEDIUM_AND_ABOVE"
                    },
                    {
                        category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                        threshold: "BLOCK_MEDIUM_AND_ABOVE"
                    },
                    {
                        category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                        threshold: "BLOCK_MEDIUM_AND_ABOVE"
                    }
                ]
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error?.message || `Gemini API error: ${response.status}`);
        }

        const data = await response.json();
        
        if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
            throw new Error('Invalid response from Gemini API');
        }

        return data.candidates[0].content.parts[0].text;
    }

    convertToGeminiFormat(messages, systemPrompt) {
        const geminiMessages = [];
        
        if (messages.length === 0) {
            // If no messages, just send system prompt as user message
            geminiMessages.push({
                role: 'user',
                parts: [{ text: systemPrompt + '\n\nPlease acknowledge that you understand your role as Silent Mend.' }]
            });
        } else {
            // Process all messages and assign proper roles
            for (let i = 0; i < messages.length; i++) {
                const message = messages[i];
                
                if (i === 0 && message.role === 'user') {
                    // For the first user message, prepend system prompt
                    geminiMessages.push({
                        role: 'user',
                        parts: [{ text: `${systemPrompt}\n\nUser: ${message.content}` }]
                    });
                } else {
                    // Map roles correctly for Gemini API
                    const geminiRole = message.role === 'user' ? 'user' : 'model';
                    geminiMessages.push({
                        role: geminiRole,
                        parts: [{ text: message.content }]
                    });
                }
            }
        }

        return geminiMessages;
    }

    validateApiKey(model, apiKey) {
        if (!apiKey || apiKey.trim().length === 0) {
            return false;
        }

        // Basic length check for Gemini keys
        return apiKey.length > 20;
    }
}

// Global API handler instance
window.silentMendAPI = new APIHandler();