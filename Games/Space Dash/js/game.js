import { Player } from './player.js';
import { ObstacleManager } from './obstacles.js';
import { CollectibleManager } from './collectibles.js';
import { isColliding } from './utils.js';
import { updateScore, updateFinalScore, showScreen, showMessage } from './ui.js';

export class Game {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.width = canvas.width;
    this.height = canvas.height;
    this.isRunning = false;
    this.score = 0;
    this.level = 1;
    this.frameCount = 0;
    this.lastFrameTime = 0;
    this.speedMultiplier = 1;
    this.levelUpThreshold = 1000;
    this.audio = null;
    this.highScore = this.loadHighScore();
    this.achievements = this.loadAchievements();
    
    // Create game objects
    this.player = new Player(this);
    this.obstacleManager = new ObstacleManager(this);
    this.collectibleManager = new CollectibleManager(this);
    
    // Bind methods
    this.gameLoop = this.gameLoop.bind(this);
  }
  
  setAudio(audio) {
    this.audio = audio;
  }
  
  updateDimensions(width, height) {
    this.width = width;
    this.height = height;
    
    if (this.player) {
      this.player.updateBoundaries();
    }
  }
  
  start() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.lastFrameTime = performance.now();
      requestAnimationFrame(this.gameLoop);
    }
  }
  
  stop() {
    this.isRunning = false;
  }
  
  reset() {
    this.score = 0;
    this.level = 1;
    this.frameCount = 0;
    this.speedMultiplier = 1;
    
    this.player.reset();
    this.obstacleManager.reset();
    this.collectibleManager.reset();
    
    updateScore(this.score);
  }
  
  gameLoop(timestamp) {
    const deltaTime = timestamp - this.lastFrameTime;
    this.lastFrameTime = timestamp;
    
    this.ctx.clearRect(0, 0, this.width, this.height);
    
    this.update(deltaTime);
    this.render();
    
    if (this.isRunning) {
      requestAnimationFrame(this.gameLoop);
    }
  }
  
  update(deltaTime) {
    this.frameCount++;
    
    this.player.update(deltaTime);
    this.obstacleManager.update(deltaTime);
    this.collectibleManager.update(deltaTime);
    
    this.checkCollisions();
    
    if (this.score >= this.level * this.levelUpThreshold) {
      this.levelUp();
    }
    
    this.checkAchievements();
  }
  
  render() {
    this.drawBackground();
    
    this.collectibleManager.render(this.ctx);
    this.obstacleManager.render(this.ctx);
    this.player.render(this.ctx);
  }
  
  drawBackground() {
    this.ctx.fillStyle = '#0f172a';
    this.ctx.fillRect(0, 0, this.width, this.height);
    
    // Draw parallax stars
    this.drawStars();
  }
  
  drawStars() {
    const time = performance.now();
    const starLayers = [
      { count: 50, speed: 0.1, size: 1 },
      { count: 30, speed: 0.2, size: 2 },
      { count: 20, speed: 0.3, size: 3 }
    ];
    
    starLayers.forEach(layer => {
      for (let i = 0; i < layer.count; i++) {
        const x = (Math.sin(i * 567.89) * this.width + time * layer.speed) % this.width;
        const y = (Math.cos(i * 123.45) * this.height + time * layer.speed) % this.height;
        
        this.ctx.fillStyle = `rgba(255, 255, 255, ${0.5 + layer.speed})`;
        this.ctx.fillRect(x, y, layer.size, layer.size);
      }
    });
  }
  
  checkCollisions() {
    if (!this.player.hasShield) {
      const obstacles = this.obstacleManager.getObstacles();
      for (const obstacle of obstacles) {
        if (isColliding(this.player, obstacle)) {
          this.gameOver();
          return;
        }
      }
    }
    
    const collectibles = this.collectibleManager.getCollectibles();
    for (let i = collectibles.length - 1; i >= 0; i--) {
      const collectible = collectibles[i];
      if (isColliding(this.player, collectible)) {
        this.collectItem(collectible, i);
      }
    }
  }
  
  collectItem(collectible, index) {
    const points = this.player.hasDoublePoints ? collectible.points * 2 : collectible.points;
    this.score += points;
    
    updateScore(this.score);
    
    if (collectible.type.effect) {
      this.player.activatePowerUp(collectible.type.effect, collectible.type.duration);
      this.audio.playSound('powerup');
    } else {
      this.audio.playSound('collect');
    }
    
    this.collectibleManager.removeCollectible(index);
  }
  
  levelUp() {
    this.level++;
    this.speedMultiplier += 0.2;
    
    this.audio.playSound('levelUp');
    
    showMessage(`Level ${this.level}! Speed increased!`);
  }
  
  gameOver() {
    this.stop();
    
    this.audio.playSound('gameOver');
    
    if (this.score > this.highScore) {
      this.highScore = this.score;
      this.saveHighScore();
    }
    
    this.checkAchievements();
    this.saveAchievements();
    
    updateFinalScore(this.score, this.highScore);
    showScreen('game-over-screen');
  }
  
  loadHighScore() {
    const savedScore = localStorage.getItem('spaceDashHighScore');
    return savedScore ? parseInt(savedScore, 10) : 0;
  }
  
  saveHighScore() {
    localStorage.setItem('spaceDashHighScore', this.highScore.toString());
  }
  
  loadAchievements() {
    const saved = localStorage.getItem('spaceDashAchievements');
    return saved ? JSON.parse(saved) : {
      survivor: false,      // Survive 60 seconds
      collector: false,     // Collect 50 items
      speedster: false,     // Reach level 5
      masterPilot: false,   // Score 5000 points
      shieldMaster: false   // Collect 3 shields
    };
  }
  
  saveAchievements() {
    localStorage.setItem('spaceDashAchievements', JSON.stringify(this.achievements));
  }
  
  checkAchievements() {
    const gameTime = this.frameCount / 60; // Approximate seconds
    const newAchievements = [];
    
    if (!this.achievements.survivor && gameTime >= 60) {
      this.achievements.survivor = true;
      newAchievements.push('Survivor - Survive for 60 seconds');
    }
    
    if (!this.achievements.collector && this.score >= 500) {
      this.achievements.collector = true;
      newAchievements.push('Collector - Score 500 points');
    }
    
    if (!this.achievements.speedster && this.level >= 5) {
      this.achievements.speedster = true;
      newAchievements.push('Speedster - Reach level 5');
    }
    
    if (!this.achievements.masterPilot && this.score >= 5000) {
      this.achievements.masterPilot = true;
      newAchievements.push('Master Pilot - Score 5000 points');
    }
    
    // Show new achievements
    if (newAchievements.length > 0) {
      newAchievements.forEach(achievement => {
        showMessage(`Achievement Unlocked: ${achievement}`, 3000);
      });
      this.audio.playSound('levelUp');
    }
  }
}