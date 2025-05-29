// Handle user input for the game

export function setupInputHandlers(game) {
  const keysPressed = {};
  
  // Key mappings
  const KEYS = {
    LEFT: ['ArrowLeft', 'a', 'A'],
    RIGHT: ['ArrowRight', 'd', 'D'],
    UP: ['ArrowUp', 'w', 'W'],
    DOWN: ['ArrowDown', 's', 'S']
  };
  
  // Keyboard event handlers
  function handleKeyDown(event) {
    keysPressed[event.key] = true;
    updatePlayerMovement();
  }
  
  function handleKeyUp(event) {
    keysPressed[event.key] = false;
    updatePlayerMovement();
  }
  
  // Update player movement based on keys pressed
  function updatePlayerMovement() {
    if (!game.player) return;
    
    // Check each direction
    const isLeftPressed = KEYS.LEFT.some(key => keysPressed[key]);
    const isRightPressed = KEYS.RIGHT.some(key => keysPressed[key]);
    const isUpPressed = KEYS.UP.some(key => keysPressed[key]);
    const isDownPressed = KEYS.DOWN.some(key => keysPressed[key]);
    
    // Update player movement
    game.player.setMovement('left', isLeftPressed);
    game.player.setMovement('right', isRightPressed);
    game.player.setMovement('up', isUpPressed);
    game.player.setMovement('down', isDownPressed);
  }
  
  // Touch event handlers
  function handleTouchStart(event) {
    event.preventDefault();
    const touch = event.touches[0];
    updateTouchPosition(touch.clientX, touch.clientY, true);
  }
  
  function handleTouchMove(event) {
    event.preventDefault();
    if (event.touches.length > 0) {
      const touch = event.touches[0];
      updateTouchPosition(touch.clientX, touch.clientY, true);
    }
  }
  
  function handleTouchEnd(event) {
    event.preventDefault();
    updateTouchPosition(0, 0, false);
  }
  
  // Update player position based on touch
  function updateTouchPosition(clientX, clientY, active) {
    if (!game.player) return;
    
    // Convert client coordinates to canvas coordinates
    const canvas = document.getElementById('game-canvas');
    const rect = canvas.getBoundingClientRect();
    const x = (clientX - rect.left) * (canvas.width / rect.width);
    const y = (clientY - rect.top) * (canvas.height / rect.height);
    
    game.player.setTouchTarget(x, y, active);
  }
  
  // Set up event listeners
  document.addEventListener('keydown', handleKeyDown);
  document.addEventListener('keyup', handleKeyUp);
  
  // Set up touch controls
  const mobileControls = document.getElementById('mobile-controls');
  mobileControls.addEventListener('touchstart', handleTouchStart, { passive: false });
  mobileControls.addEventListener('touchmove', handleTouchMove, { passive: false });
  mobileControls.addEventListener('touchend', handleTouchEnd, { passive: false });
  
  // Show mobile controls on touch devices
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    mobileControls.classList.remove('hidden');
  }
  
  // Return cleanup function
  return function cleanup() {
    document.removeEventListener('keydown', handleKeyDown);
    document.removeEventListener('keyup', handleKeyUp);
    mobileControls.removeEventListener('touchstart', handleTouchStart);
    mobileControls.removeEventListener('touchmove', handleTouchMove);
    mobileControls.removeEventListener('touchend', handleTouchEnd);
  };
}