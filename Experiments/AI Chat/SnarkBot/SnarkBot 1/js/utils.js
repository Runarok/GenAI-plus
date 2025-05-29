/**
 * Utility functions for the chat application
 */

/**
 * Scrolls the chat container to the bottom
 * @param {HTMLElement} container - The chat container element
 */
function scrollToBottom(container) {
  container.scrollTop = container.scrollHeight;
}

/**
 * Creates a new message element
 * @param {string} text - The message text
 * @param {string} sender - The sender of the message ('user' or 'ai')
 * @returns {HTMLElement} - The created message element
 */
function createMessageElement(text, sender) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message', sender);
  
  const bubble = document.createElement('div');
  bubble.classList.add('bubble');
  bubble.textContent = text;
  
  messageDiv.appendChild(bubble);
  return messageDiv;
}

/**
 * Shows the typing indicator
 * @param {HTMLElement} indicator - The typing indicator element
 */
function showTypingIndicator(indicator) {
  indicator.classList.remove('hidden');
}

/**
 * Hides the typing indicator
 * @param {HTMLElement} indicator - The typing indicator element
 */
function hideTypingIndicator(indicator) {
  indicator.classList.add('hidden');
}

/**
 * Simulates typing delay based on message length
 * @param {string} message - The message to simulate typing for
 * @returns {number} - The delay in milliseconds
 */
function getTypingDelay(message) {
  // Base delay plus additional time based on message length
  const baseDelay = 500;
  const perCharDelay = 20;
  return Math.min(baseDelay + message.length * perCharDelay, 3000);
}

/**
 * Adds a user message to the chat
 * @param {string} text - The message text
 * @param {HTMLElement} chatContainer - The chat container
 */
function addUserMessage(text, chatContainer) {
  const messageElement = createMessageElement(text, 'user');
  chatContainer.appendChild(messageElement);
  scrollToBottom(chatContainer);
}

/**
 * Adds an AI message to the chat
 * @param {string} text - The message text
 * @param {HTMLElement} chatContainer - The chat container
 */
function addAIMessage(text, chatContainer) {
  const messageElement = createMessageElement(text, 'ai');
  chatContainer.appendChild(messageElement);
  scrollToBottom(chatContainer);
}