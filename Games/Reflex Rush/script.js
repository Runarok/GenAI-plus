// Game Configs
const CHALLENGES = [
  // Button click: Color
  { type: 'color-btn', prompt: 'Click the <b style="color:#7cffb2;">GREEN</b> button!', color: '#7cffb2' },
  { type: 'color-btn', prompt: 'Click the <b style="color:#ff6161;">RED</b> button!', color: '#ff6161' },
  { type: 'color-btn', prompt: 'Click the <b style="color:#40c9ff;">BLUE</b> button!', color: '#40c9ff' },
  // Key press
  { type: 'key-press', prompt: 'Press the <b style="color:#ff4081;">SPACE</b> key!' , key: ' ' },
  { type: 'key-press', prompt: 'Press the <b style="color:#7cffb2;">A</b> key!' , key: 'a' },
  { type: 'key-press', prompt: 'Press the <b style="color:#ff6161;">S</b> key!' , key: 's' },
  { type: 'key-press', prompt: 'Press the <b style="color:#40c9ff;">D</b> key!' , key: 'd' },
];

const MODE_SETTINGS = {
  easy: { time: 5000, scoreMultiplier: 1 },
  normal: { time: 3000, scoreMultiplier: 1.5 },
  hard: { time: 1800, scoreMultiplier: 2 },
};

const startBtn = document.getElementById('start-btn');
const gameArea = document.getElementById('game-area');
const currentScoreEl = document.getElementById('current-score');
const bestScoreEl = document.getElementById('best-score');
const resultEl = document.getElementById('result');
const errorEl = document.getElementById('error');
const modeSelect = document.getElementById('mode-select');

let timer;
let timerInterval;
let currentScore = 0;
let bestScore = 0;
let timeLimit = MODE_SETTINGS.normal.time;
let scoreMultiplier = MODE_SETTINGS.normal.scoreMultiplier;
let activeChallenge = null;
let isPlaying = false;

// Load best score from localStorage
function loadBestScore() {
  const stored = localStorage.getItem('reflexRushBestScore');
  if (stored) bestScore = parseInt(stored);
  bestScoreEl.textContent = bestScore;
}

// Save best score to localStorage
function saveBestScore() {
  if (currentScore > bestScore) {
    bestScore = currentScore;
    localStorage.setItem('reflexRushBestScore', bestScore);
    bestScoreEl.textContent = bestScore;
  }
}

// Clear game area and UI messages
function clearGameArea() {
  gameArea.innerHTML = '';
  resultEl.textContent = '';
  errorEl.textContent = '';
}

// Create the timer bar element
function createTimerBar() {
  const timerBar = document.createElement('div');
  timerBar.classList.add('timer-bar');
  const fill = document.createElement('div');
  fill.classList.add('timer-bar-fill');
  timerBar.appendChild(fill);
  gameArea.appendChild(timerBar);
  return fill;
}

// Start countdown animation for timer bar
function startTimerBar(fill) {
  let width = 100;
  const decrement = 100 / (timeLimit / 50);
  timerInterval = setInterval(() => {
    width -= decrement;
    if (width <= 0) {
      width = 0;
      clearInterval(timerInterval);
    }
    fill.style.width = width + '%';
  }, 50);
}

// Stop timer bar animation
function stopTimerBar() {
  clearInterval(timerInterval);
}

// Pick a random challenge different from last active
function getRandomChallenge() {
  let newChallenge;
  do {
    newChallenge = CHALLENGES[Math.floor(Math.random() * CHALLENGES.length)];
  } while (activeChallenge === newChallenge);
  return newChallenge;
}

// Show challenge and setup input handlers
function showChallenge() {
  clearGameArea();
  activeChallenge = getRandomChallenge();

  const challengeDiv = document.createElement('div');
  challengeDiv.className = 'challenge';
  challengeDiv.innerHTML = activeChallenge.prompt;
  gameArea.appendChild(challengeDiv);

  // Timer bar
  const timerBarFill = createTimerBar();
  startTimerBar(timerBarFill);

  // Start timer
  timer = setTimeout(() => {
    endGame('Time out! Game Over!');
  }, timeLimit);

  // Setup input based on challenge type
  if (activeChallenge.type === 'color-btn') {
    setupColorButtons(activeChallenge.color);
  } else if (activeChallenge.type === 'key-press') {
    setupKeyPress(activeChallenge.key);
  }
}

// Setup color buttons for challenge
function setupColorButtons(correctColor) {
  const btnColors = ['#7cffb2', '#ff6161', '#40c9ff'];
  const btnContainer = document.createElement('div');
  btnContainer.style.display = 'flex';
  btnContainer.style.justifyContent = 'space-around';
  btnContainer.style.marginTop = '1rem';

  btnColors.forEach(color => {
    const btn = document.createElement('button');
    btn.className = 'btn';
    btn.style.backgroundColor = color;
    btn.textContent = 'Click';
    btn.style.color = '#000';
    btn.style.fontWeight = '700';
    btn.style.flex = '1';
    btn.style.margin = '0 0.4rem';
    btn.style.borderRadius = '0.7rem';
    btn.style.boxShadow = '0 2px 12px 0 rgba(0,0,0,0.15)';
    btn.addEventListener('click', () => {
      if (!isPlaying) return;
      if (color === correctColor) {
        onSuccess();
      } else {
        endGame('Wrong button! Game Over!');
      }
    });
    btnContainer.appendChild(btn);
  });

  gameArea.appendChild(btnContainer);
}

// Setup key press event listener
function setupKeyPress(expectedKey) {
  function keyHandler(e) {
    if (!isPlaying) return;
    if (e.key.toLowerCase() === expectedKey) {
      onSuccess();
    } else {
      endGame(`Wrong key! Expected "${expectedKey.toUpperCase()}" Game Over!`);
    }
  }
  window.addEventListener('keydown', keyHandler);

  // Save handler so we can remove it later
  activeChallenge._keyHandler = keyHandler;
}

// Remove key press listener for current challenge
function removeKeyPressListener() {
  if (activeChallenge && activeChallenge.type === 'key-press' && activeChallenge._keyHandler) {
    window.removeEventListener('keydown', activeChallenge._keyHandler);
    activeChallenge._keyHandler = null;
  }
}

// When player succeeds a challenge
function onSuccess() {
  clearTimeout(timer);
  stopTimerBar();
  removeKeyPressListener();

  currentScore++;
  currentScoreEl.textContent = currentScore;
  resultEl.textContent = 'Correct! Keep going...';
  errorEl.textContent = '';

  setTimeout(() => {
    if (isPlaying) showChallenge();
  }, 600);
}

// When game ends
function endGame(message) {
  clearTimeout(timer);
  stopTimerBar();
  removeKeyPressListener();

  isPlaying = false;
  errorEl.textContent = message;
  resultEl.textContent = `Your Score: ${currentScore}`;
  saveBestScore();

  startBtn.style.display = 'inline-block';
  startBtn.textContent = 'Play Again';
  gameArea.innerHTML = ''; // Clear buttons/challenge
}

// Start game
function startGame() {
  currentScore = 0;
  currentScoreEl.textContent = currentScore;
  errorEl.textContent = '';
  resultEl.textContent = '';
  isPlaying = true;
  startBtn.style.display = 'none';

  // Get mode settings
  const mode = modeSelect.value;
  timeLimit = MODE_SETTINGS[mode].time;
  scoreMultiplier = MODE_SETTINGS[mode].scoreMultiplier;

  showChallenge();
}

// Event listeners
startBtn.addEventListener('click', startGame);
modeSelect.addEventListener('change', () => {
  if (!isPlaying) return;
  // Restart game with new mode immediately
  endGame('Difficulty changed, game restarted!');
  startGame();
});

// Init
loadBestScore();
