const achievements = [
    {
        id: 'speed_demon',
        title: 'Speed Demon',
        description: 'Score 1000 points in a single game',
        icon: '🏃',
        condition: (score) => score >= 1000
    },
    {
        id: 'combo_master',
        title: 'Combo Master',
        description: 'Achieve a 10x combo',
        icon: '⚡',
        condition: (score, combo) => combo >= 10
    },
    {
        id: 'expert_typist',
        title: 'Expert Typist',
        description: 'Complete a game in expert mode',
        icon: '👑',
        condition: (score, combo, mode) => mode === 'expert'
    },
    {
        id: 'quick_fingers',
        title: 'Quick Fingers',
        description: 'Type 50 letters without missing',
        icon: '✨',
        condition: (score, combo, mode, perfectStreak) => perfectStreak >= 50
    },
    {
        id: 'master_of_modes',
        title: 'Master of Modes',
        description: 'Play all game modes',
        icon: '🎮',
        condition: (score, combo, mode, perfectStreak, playedModes) => 
            playedModes && playedModes.length >= 3
    },
    {
        id: 'high_scorer',
        title: 'High Scorer',
        description: 'Score 5000 points in a single game',
        icon: '🏆',
        condition: (score) => score >= 5000
    }
];

let unlockedAchievements = JSON.parse(localStorage.getItem('achievements') || '[]');
let playedModes = JSON.parse(localStorage.getItem('playedModes') || '[]');

function checkAchievements(score, combo, mode, perfectStreak) {
    if (!playedModes.includes(mode)) {
        playedModes.push(mode);
        localStorage.setItem('playedModes', JSON.stringify(playedModes));
    }

    achievements.forEach(achievement => {
        if (!unlockedAchievements.includes(achievement.id) && 
            achievement.condition(score, combo, mode, perfectStreak, playedModes)) {
            unlockAchievement(achievement);
        }
    });
}

function unlockAchievement(achievement) {
    unlockedAchievements.push(achievement.id);
    localStorage.setItem('achievements', JSON.stringify(unlockedAchievements));
    
    showAchievementPopup(achievement);
}

function showAchievementPopup(achievement) {
    const popup = document.createElement('div');
    popup.className = 'achievement-popup';
    popup.style.position = 'fixed';
    popup.style.top = '20px';
    popup.style.left = '50%';
    popup.style.transform = 'translateX(-50%)';
    popup.style.background = 'var(--primary-bg)';
    popup.style.border = '2px solid var(--accent-color)';
    popup.style.borderRadius = '10px';
    popup.style.padding = '1rem';
    popup.style.zIndex = '1000';
    popup.style.animation = 'slideIn 0.5s ease-out';
    
    popup.innerHTML = `
        <div class="achievement-icon" style="font-size: 2rem; margin-bottom: 0.5rem">${achievement.icon}</div>
        <h3 style="color: var(--accent-color); margin: 0">${achievement.title}</h3>
        <p style="color: var(--text-color); margin: 0.5rem 0">Achievement Unlocked!</p>
    `;
    
    document.body.appendChild(popup);
    setTimeout(() => {
        popup.style.animation = 'slideOut 0.5s ease-in';
        setTimeout(() => popup.remove(), 500);
    }, 3000);
}

function showAchievements() {
    hideAllScreens();
    document.getElementById('achievements-screen').classList.add('active');
    
    const container = document.getElementById('achievements-container');
    container.innerHTML = '';
    
    achievements.forEach(achievement => {
        const isUnlocked = unlockedAchievements.includes(achievement.id);
        container.innerHTML += `
            <div class="achievement ${isUnlocked ? 'unlocked' : ''}">
                <div class="achievement-icon">${achievement.icon}</div>
                <h3>${achievement.title}</h3>
                <p>${achievement.description}</p>
                ${isUnlocked ? '<span class="completion-badge">✓</span>' : ''}
            </div>
        `;
    });
}