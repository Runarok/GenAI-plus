export class ObstacleManager {
  constructor(game) {
    this.game = game;
    this.obstacles = [];
    this.spawnInterval = 2000; // ms between spawns
    this.lastSpawnTime = 0;
    this.minSize = 20;
    this.maxSize = 60;
    this.colors = ['#ef4444', '#f97316', '#f59e0b']; // Red, orange, amber
  }
  
  reset() {
    this.obstacles = [];
    this.lastSpawnTime = 0;
  }
  
  update(deltaTime) {
    const currentTime = performance.now();
    
    // Spawn new obstacles
    if (currentTime - this.lastSpawnTime > this.spawnInterval / this.game.speedMultiplier) {
      this.spawnObstacle();
      this.lastSpawnTime = currentTime;
    }
    
    // Update existing obstacles
    for (let i = this.obstacles.length - 1; i >= 0; i--) {
      const obstacle = this.obstacles[i];
      
      // Move obstacle
      obstacle.y += obstacle.speed * deltaTime * this.game.speedMultiplier;
      
      // Remove if out of bounds
      if (obstacle.y > this.game.height + obstacle.height) {
        this.obstacles.splice(i, 1);
      }
    }
  }
  
  render(ctx) {
    for (const obstacle of this.obstacles) {
      this.drawAsteroid(ctx, obstacle);
    }
  }
  
  drawAsteroid(ctx, asteroid) {
    ctx.save();
    ctx.translate(asteroid.x + asteroid.width / 2, asteroid.y + asteroid.height / 2);
    ctx.rotate(asteroid.rotation);
    
    ctx.fillStyle = asteroid.color;
    ctx.beginPath();
    
    // Create an irregular polygon for the asteroid
    const numPoints = asteroid.points;
    const angleStep = (Math.PI * 2) / numPoints;
    const radius = asteroid.width / 2;
    
    for (let i = 0; i < numPoints; i++) {
      const angle = i * angleStep;
      const randomRadius = radius * (0.8 + Math.random() * 0.4);
      const x = Math.cos(angle) * randomRadius;
      const y = Math.sin(angle) * randomRadius;
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    
    ctx.closePath();
    ctx.fill();
    
    // Add some craters
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    for (let i = 0; i < 3; i++) {
      const craterX = (Math.random() - 0.5) * radius;
      const craterY = (Math.random() - 0.5) * radius;
      const craterRadius = radius * (0.1 + Math.random() * 0.2);
      
      ctx.beginPath();
      ctx.arc(craterX, craterY, craterRadius, 0, Math.PI * 2);
      ctx.fill();
    }
    
    ctx.restore();
    
    // Debug: Draw hitbox (uncomment for debugging)
    /*
    ctx.strokeStyle = 'red';
    ctx.strokeRect(asteroid.x, asteroid.y, asteroid.width, asteroid.height);
    */
  }
  
  spawnObstacle() {
    const size = this.minSize + Math.random() * (this.maxSize - this.minSize);
    const x = Math.random() * (this.game.width - size);
    
    const obstacle = {
      x: x,
      y: -size,
      width: size,
      height: size,
      speed: 0.2 + Math.random() * 0.2, // Base speed in pixels per ms
      color: this.colors[Math.floor(Math.random() * this.colors.length)],
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.001,
      points: 5 + Math.floor(Math.random() * 4) // 5-8 points for the asteroid shape
    };
    
    this.obstacles.push(obstacle);
  }
  
  getObstacles() {
    return this.obstacles;
  }
}