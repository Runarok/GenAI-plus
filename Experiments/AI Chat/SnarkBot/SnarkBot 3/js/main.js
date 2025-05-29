/**
 * Main entry point for the chat application
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Get DOM elements
  const messagesContainer = document.getElementById('chat-messages');
  const userInput = document.getElementById('user-input');
  const sendButton = document.getElementById('send-button');
  const typingIndicator = document.getElementById('typing-indicator');
  
  // Create a new message generator
  const messageGenerator = new MessageGenerator();
  
  // Initialize chat logic
  initChatLogic(
    messagesContainer,
    userInput,
    sendButton,
    typingIndicator,
    messageGenerator
  );
  
  // Scroll to bottom of chat on page load
  scrollToBottom(messagesContainer);
});