/**
 * Chat logic for handling user input and AI responses
 */

/**
 * Initializes the chat logic
 * @param {HTMLElement} messagesContainer - The chat messages container
 * @param {HTMLElement} userInput - The user input element
 * @param {HTMLElement} sendButton - The send button element
 * @param {HTMLElement} typingIndicator - The typing indicator element
 * @param {MessageGenerator} messageGenerator - The message generator instance
 */
function initChatLogic(messagesContainer, userInput, sendButton, typingIndicator, messageGenerator) {
  /**
   * Handles sending a user message
   */
  function handleSendMessage() {
    const message = userInput.value.trim();
    
    // Don't send empty messages
    if (!message) {
      return;
    }
    
    // Add user message to chat
    addUserMessage(message, messagesContainer);
    
    // Clear input field
    userInput.value = '';
    
    // Show typing indicator
    showTypingIndicator(typingIndicator);
    scrollToBottom(messagesContainer);
    
    // Generate AI response after a delay
    setTimeout(() => {
      // Hide typing indicator
      hideTypingIndicator(typingIndicator);
      
      // Generate and add AI response
      const response = messageGenerator.generateResponse(message);
      addAIMessage(response, messagesContainer);
    }, getTypingDelay(message));
  }
  
  /**
   * Event listener for send button click
   */
  sendButton.addEventListener('click', handleSendMessage);
  
  /**
   * Event listener for Enter key press in input field
   */
  userInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  });
  
  /**
   * Focus the input field on page load
   */
  userInput.focus();
}