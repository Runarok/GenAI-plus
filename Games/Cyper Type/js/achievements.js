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
    }
];

let unlockedAchievements = JSON.parse(localStorage.getItem('achievements') || '[]');

function checkAchievements(score, combo, mode) {
    achievements.forEach(achievement => {
        if (!unlockedAchievements.includes(achievement.id) && 
            achievement.condition(score, combo, mode)) {
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
    popup.innerHTML = `
        <div class="achievement-icon">${achievement.icon}</div>
        <h3>${achievement.title}</h3>
        <p>Achievement Unlocked!</p>
    `;
    
    document.body.appendChild(popup);
    setTimeout(() => popup.remove(), 3000);
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
            </div>
        `;
    });
}