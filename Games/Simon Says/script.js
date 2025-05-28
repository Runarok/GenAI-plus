// --- Theme Management ---
const themeToggle = document.getElementById('theme-toggle');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

function setTheme(theme) {
  if (theme === 'light') {
    document.body.classList.add('light');
    themeToggle.textContent = '🌞';
  } else {
    document.body.classList.remove('light');
    themeToggle.textContent = '🌙';
  }
  localStorage.setItem('simon-theme', theme);
}

function getSavedTheme() {
  return localStorage.getItem('simon-theme');
}

// On load, set theme
(function() {
  const saved = getSavedTheme();
  if (saved) setTheme(saved);
  else setTheme('dark');
})();

themeToggle.addEventListener('click', () => {
  const isLight = document.body.classList.contains('light');
  setTheme(isLight ? 'dark' : 'light');
});

// --- Game Logic ---
const COLORS = ['red', 'green', 'blue', 'yellow'];
const board = document.getElementById('simon-board');
const btns = {
  red: board.querySelector('.simon-btn.red'),
  green: board.querySelector('.simon-btn.green'),
  blue: board.querySelector('.simon-btn.blue'),
  yellow: board.querySelector('.simon-btn.yellow')
};
const audios = {
  red: document.getElementById('audio-red'),
  green: document.getElementById('audio-green'),
  blue: document.getElementById('audio-blue'),
  yellow: document.getElementById('audio-yellow'),
  wrong: document.getElementById('audio-wrong')
};
const scoreEl = document.getElementById('score');
const highScoreEl = document.getElementById('high-score');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const gameOverEl = document.getElementById('game-over');
const gameOverScoreEl = document.getElementById('game-over-score');
const gameControls = document.getElementById('game-controls');

let sequence = [];
let userStep = 0;
let playing = false;
let score = 0;
let highScore = 0;
let allowInput = false;

// --- Storage ---
function getHighScore() {
  return parseInt(localStorage.getItem('simon-highscore') || '0', 10);
}
function setHighScore(val) {
  localStorage.setItem('simon-highscore', val);
}
function updateScoreboard() {
  scoreEl.textContent = score;
  highScoreEl.textContent = highScore;
}

// --- Button/Sound Feedback ---
function playSound(color) {
  if (audios[color]) {
    audios[color].currentTime = 0;
    audios[color].play();
  }
}
function flashButton(color, duration=350) {
  return new Promise(resolve => {
    btns[color].classList.add('active');
    playSound(color);
    setTimeout(() => {
      btns[color].classList.remove('active');
      setTimeout(resolve, 80);
    }, duration);
  });
}
function disableButtons() {
  Object.values(btns).forEach(btn => btn.classList.add('disabled'));
}
function enableButtons() {
  Object.values(btns).forEach(btn => btn.classList.remove('disabled'));
}

// --- Game Flow ---
function resetGame() {
  sequence = [];
  userStep = 0;
  score = 0;
  updateScoreboard();
  gameOverEl.style.display = 'none';
  gameControls.style.display = '';
  enableButtons();
}
function startGame() {
  resetGame();
  playing = true;
  nextRound();
}
function nextRound() {
  allowInput = false;
  sequence.push(COLORS[Math.floor(Math.random() * 4)]);
  score = sequence.length - 1;
  updateScoreboard();
  setTimeout(() => playSequence(), 600);
}
async function playSequence() {
  disableButtons();
  for (let i = 0; i < sequence.length; i++) {
    await flashButton(sequence[i]);
  }
  userStep = 0;
  allowInput = true;
  enableButtons();
}
function handleUserInput(color) {
  if (!playing || !allowInput) return;
  playSound(color);
  if (color === sequence[userStep]) {
    userStep++;
    if (userStep === sequence.length) {
      allowInput = false;
      setTimeout(nextRound, 1000);
    }
  } else {
    gameOver();
  }
}
function gameOver() {
  playing = false;
  allowInput = false;
  disableButtons();
  audios.wrong.play();
  gameOverScoreEl.textContent = `Your Score: ${score}`;
  gameOverEl.style.display = 'flex';
  gameControls.style.display = 'none';

  if (score > highScore) {
    highScore = score;
    setHighScore(highScore);
  }
  updateScoreboard();
}

// --- Event Listeners ---
Object.entries(btns).forEach(([color, btn]) => {
  btn.addEventListener('click', () => {
    if (allowInput) handleUserInput(color);
  });
});
startBtn.addEventListener('click', () => {
  startGame();
});
restartBtn.addEventListener('click', () => {
  startGame();
});

// Load high score on start
(function() {
  highScore = getHighScore();
  updateScoreboard();
})();
