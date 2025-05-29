// UI manager for the game

// Show a specific screen by ID
export function showScreen(screenId) {
  // Hide all screens first
  hideAllScreens();
  
  // Show the requested screen
  const screen = document.getElementById(screenId);
  if (screen) {
    screen.classList.add('active');
  }
}

// Hide all screens
export function hideAllScreens() {
  const screens = document.querySelectorAll('.screen');
  screens.forEach(screen => {
    screen.classList.remove('active');
  });
}

// Update the score display
export function updateScore(score) {
  const scoreElement = document.getElementById('score');
  if (scoreElement) {
    scoreElement.textContent = score;
  }
}

// Update the final score display on game over screen
export function updateFinalScore(score, highScore) {
  const finalScoreElement = document.getElementById('final-score');
  const highScoreElement = document.getElementById('high-score');
  
  if (finalScoreElement) {
    finalScoreElement.textContent = score;
  }
  
  if (highScoreElement) {
    highScoreElement.textContent = highScore;
  }
  
  // Add animation if it's a new high score
  if (score >= highScore && score > 0) {
    finalScoreElement.classList.add('pulse');
  } else {
    finalScoreElement.classList.remove('pulse');
  }
}

// Show a temporary message on screen
export function showMessage(message, duration = 2000) {
  // Create message element if it doesn't exist
  let messageElement = document.getElementById('game-message');
  
  if (!messageElement) {
    messageElement = document.createElement('div');
    messageElement.id = 'game-message';
    messageElement.style.position = 'absolute';
    messageElement.style.top = '20%';
    messageElement.style.left = '50%';
    messageElement.style.transform = 'translateX(-50%)';
    messageElement.style.padding = '10px 20px';
    messageElement.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    messageElement.style.color = 'white';
    messageElement.style.borderRadius = '5px';
    messageElement.style.fontWeight = 'bold';
    messageElement.style.textAlign = 'center';
    messageElement.style.zIndex = '15';
    messageElement.style.opacity = '0';
    messageElement.style.transition = 'opacity 0.3s ease';
    
    document.getElementById('game-container').appendChild(messageElement);
  }
  
  // Set message and show
  messageElement.textContent = message;
  
  // Animate in
  setTimeout(() => {
    messageElement.style.opacity = '1';
  }, 10);
  
  // Animate out after duration
  setTimeout(() => {
    messageElement.style.opacity = '0';
  }, duration - 300);
  
  // Remove after animation
  setTimeout(() => {
    if (messageElement.parentNode) {
      messageElement.parentNode.removeChild(messageElement);
    }
  }, duration);
}