let score = 0;
let gameLoop;
let letters = [];
let speed = 2;
let spawnRate = 1500;
let lastSpawn = 0;
let isGameOver = false;
let currentMode = 'normal';
let combo = 0;
let lastHitTime = 0;
let perfectStreak = 0;

const gameModes = {
    normal: { baseSpeed: 2, baseSpawnRate: 1500, speedIncrease: 0.001, spawnRateDecrease: 10 },
    hard: { baseSpeed: 3, baseSpawnRate: 1200, speedIncrease: 0.002, spawnRateDecrease: 15 },
    expert: { baseSpeed: 4, baseSpawnRate: 1000, speedIncrease: 0.003, spawnRateDecrease: 20 }
};

function changeMode(mode) {
    currentMode = mode;
    document.getElementById('mode').textContent = mode.charAt(0).toUpperCase() + mode.slice(1) + ' Mode';
    startGame();
}

function startGame() {
    const selectedMode = document.getElementById('menu-mode-select').value;
    currentMode = selectedMode;
    
    hideAllScreens();
    document.getElementById('game-screen').classList.add('active');
    
    score = 0;
    combo = 0;
    letters = [];
    perfectStreak = 0;
    const mode = gameModes[currentMode];
    speed = mode.baseSpeed;
    spawnRate = mode.baseSpawnRate;
    isGameOver = false;
    
    document.getElementById('game-container').innerHTML = '';
    document.getElementById('score').textContent = 'Score: 0';
    document.getElementById('mode').textContent = currentMode.charAt(0).toUpperCase() + currentMode.slice(1) + ' Mode';
    document.getElementById('game-over').style.display = 'none';
    document.getElementById('combo-text').style.opacity = '0';
    
    gameLoop = requestAnimationFrame(update);
}

function createLetter() {
    const letter = document.createElement('div');
    letter.className = 'letter';
    letter.textContent = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    letter.style.left = Math.random() * (window.innerWidth - 30) + 'px';
    letter.style.top = '0px';
    document.getElementById('game-container').appendChild(letter);
    
    return {
        element: letter,
        y: 0,
        char: letter.textContent
    };
}

function update(timestamp) {
    if (isGameOver) return;

    const mode = gameModes[currentMode];

    if (timestamp - lastSpawn > spawnRate) {
        letters.push(createLetter());
        lastSpawn = timestamp;
        
        if (spawnRate > 500) spawnRate -= mode.spawnRateDecrease;
        speed += mode.speedIncrease;
    }

    letters.forEach((letter, index) => {
        letter.y += speed;
        letter.element.style.top = letter.y + 'px';

        if (letter.y > window.innerHeight - 30) {
            perfectStreak = 0;
            gameOver();
            return;
        }
    });

    gameLoop = requestAnimationFrame(update);
}

function gameOver() {
    isGameOver = true;
    cancelAnimationFrame(gameLoop);
    document.getElementById('game-over').style.display = 'block';
    document.getElementById('final-score').textContent = score;
    
    checkAchievements(score, combo, currentMode, perfectStreak);
    updateHighScores(score);
}

function removeLetter(index) {
    const letter = letters[index];
    letter.element.classList.add('hit');
    setTimeout(() => {
        letter.element.remove();
        letters.splice(index, 1);
    }, 300);
    
    perfectStreak++;
    updateScore();
}

function updateScore() {
    const points = Math.max(10, Math.floor(10 * combo));
    score += points;
    document.getElementById('score').textContent = `Score: ${score}`;
}

document.addEventListener('keydown', (event) => {
    if (isGameOver) return;

    const key = event.key.toUpperCase();
    const letterIndex = letters.findIndex(l => l.char === key);

    if (letterIndex !== -1) {
        updateCombo();
        removeLetter(letterIndex);
    } else {
        perfectStreak = 0;
    }
});