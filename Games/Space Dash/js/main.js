import { Game } from './game.js';
import { setupAudio } from './audio.js';
import { setupInputHandlers } from './input.js';
import { showScreen, hideAllScreens } from './ui.js';

// Wait for the DOM to be loaded
document.addEventListener('DOMContentLoaded', initialize);

let game;

function initialize() {
  // Get the canvas and context
  const canvas = document.getElementById('game-canvas');
  const ctx = canvas.getContext('2d');
  
  // Set canvas dimensions to match container
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  
  // Initialize the game
  game = new Game(canvas, ctx);
  
  // Setup audio
  const audio = setupAudio();
  game.setAudio(audio);
  
  // Setup input handlers
  setupInputHandlers(game);
  
  // Setup UI event listeners
  setupUIEventListeners();
  
  // Show the start screen
  showScreen('start-screen');
}

function resizeCanvas() {
  const canvas = document.getElementById('game-canvas');
  const container = document.getElementById('game-container');
  
  canvas.width = container.clientWidth;
  canvas.height = container.clientHeight;
  
  // If game is initialized, update its dimensions
  if (game) {
    game.updateDimensions(canvas.width, canvas.height);
  }
}

function setupUIEventListeners() {
  // Start button
  document.getElementById('start-button').addEventListener('click', () => {
    hideAllScreens();
    game.start();
    game.audio.playSound('start');
  });
  
  // Restart button
  document.getElementById('restart-button').addEventListener('click', () => {
    hideAllScreens();
    game.reset();
    game.start();
    game.audio.playSound('start');
  });
  
  // Sound toggle
  const soundToggle = document.getElementById('sound-toggle');
  const soundIcon = document.getElementById('sound-icon');
  
  soundToggle.addEventListener('click', () => {
    const isMuted = game.audio.toggleMute();
    soundIcon.textContent = isMuted ? '🔇' : '🔊';
  });
}

// Export game instance for other modules
export { game };