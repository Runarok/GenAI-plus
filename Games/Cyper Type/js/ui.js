function hideAllScreens() {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
}

function showMenu() {
    hideAllScreens();
    document.getElementById('menu').classList.add('active');
}

function showHighScores() {
    hideAllScreens();
    document.getElementById('highscores-screen').classList.add('active');
    
    const allHighScores = JSON.parse(localStorage.getItem('highScores') || '[]');
    const container = document.getElementById('highscores-container');
    
    // Create mode selection buttons
    container.innerHTML = `
        <div class="mode-buttons">
            <button class="mode-btn active" data-mode="normal">Normal Mode</button>
            <button class="mode-btn" data-mode="hard">Hard Mode</button>
            <button class="mode-btn" data-mode="expert">Expert Mode</button>
        </div>
        <div class="scores-container"></div>
    `;

    // Add click handlers to buttons
    const buttons = container.querySelectorAll('.mode-btn');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            buttons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            showModeScores(button.dataset.mode);
        });
    });

    // Show initial scores (Normal mode)
    showModeScores('normal');
}

function showModeScores(mode) {
    const allHighScores = JSON.parse(localStorage.getItem('highScores') || '[]');
    const modeScores = allHighScores.filter(score => score.mode === mode);
    const scoresContainer = document.querySelector('.scores-container');

    scoresContainer.innerHTML = `
        <div class="mode-scores">
            <h3>${mode.charAt(0).toUpperCase() + mode.slice(1)} Mode</h3>
            ${modeScores.length ? 
                modeScores
                    .sort((a, b) => b.score - a.score)
                    .slice(0, 10)
                    .map(score => `
                        <div class="achievement">
                            <div class="achievement-icon">🏆</div>
                            <h3>${score.score} points</h3>
                            <p>${new Date(score.date).toLocaleDateString()}</p>
                        </div>
                    `).join('') :
                '<p>No scores yet!</p>'
            }
        </div>
    `;
}

function updateHighScores(score) {
    const highScores = JSON.parse(localStorage.getItem('highScores') || '[]');
    highScores.push({
        score,
        mode: currentMode,
        date: new Date().toISOString()
    });
    localStorage.setItem('highScores', JSON.stringify(highScores));
}

function updateCombo() {
    const now = Date.now();
    if (now - lastHitTime < 1000) {
        combo++;
        if (combo > 1) {
            const comboText = document.getElementById('combo-text');
            comboText.textContent = `Combo x${combo}!`;
            comboText.style.opacity = '1';
            setTimeout(() => comboText.style.opacity = '0', 1000);
        }
    } else {
        combo = 1;
    }
    lastHitTime = now;
}

function restartGame() {
    startGame();
}

function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// Initialize theme from localStorage
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
});