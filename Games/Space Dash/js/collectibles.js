export class CollectibleManager {
  constructor(game) {
    this.game = game;
    this.collectibles = [];
    this.spawnInterval = 3000; // ms between spawns
    this.lastSpawnTime = 0;
    
    // Collectible types with properties
    this.types = [
      {
        name: 'star',
        points: 10,
        color: '#f59e0b', // Amber
        size: 20,
        probability: 0.7,
        effect: null
      },
      {
        name: 'gem',
        points: 25,
        color: '#8b5cf6', // Purple
        size: 15,
        probability: 0.2,
        effect: null
      },
      {
        name: 'shield',
        points: 15,
        color: '#60a5fa', // Blue
        size: 25,
        probability: 0.05,
        effect: 'shield',
        duration: 5000 // 5 seconds
      },
      {
        name: 'speedBoost',
        points: 15,
        color: '#34d399', // Green
        size: 25,
        probability: 0.03,
        effect: 'speed',
        duration: 3000 // 3 seconds
      },
      {
        name: 'doublePoints',
        points: 15,
        color: '#f472b6', // Pink
        size: 25,
        probability: 0.02,
        effect: 'double',
        duration: 4000 // 4 seconds
      }
    ];
  }
  
  reset() {
    this.collectibles = [];
    this.lastSpawnTime = 0;
  }
  
  update(deltaTime) {
    const currentTime = performance.now();
    
    // Spawn new collectibles
    if (currentTime - this.lastSpawnTime > this.spawnInterval) {
      this.spawnCollectible();
      this.lastSpawnTime = currentTime;
      
      // Adjust spawn interval based on score
      this.spawnInterval = Math.max(1000, 3000 - (this.game.score / 1000) * 100);
    }
    
    // Update existing collectibles
    for (let i = this.collectibles.length - 1; i >= 0; i--) {
      const collectible = this.collectibles[i];
      
      // Move collectible
      collectible.y += collectible.speed * deltaTime * this.game.speedMultiplier;
      
      // Animate
      collectible.angle += collectible.rotationSpeed * deltaTime;
      collectible.scale = 0.9 + Math.sin(currentTime / 200) * 0.1;
      
      // Remove if out of bounds
      if (collectible.y > this.game.height + collectible.height) {
        this.collectibles.splice(i, 1);
      }
    }
  }
  
  render(ctx) {
    for (const collectible of this.collectibles) {
      this.drawCollectible(ctx, collectible);
    }
  }
  
  drawCollectible(ctx, collectible) {
    ctx.save();
    ctx.translate(
      collectible.x + collectible.width / 2,
      collectible.y + collectible.height / 2
    );
    ctx.rotate(collectible.angle);
    ctx.scale(collectible.scale, collectible.scale);
    
    switch (collectible.type.name) {
      case 'star':
        this.drawStar(ctx, 0, 0, 5, collectible.width / 2, collectible.width / 4, collectible.type.color);
        break;
      case 'gem':
        this.drawGem(ctx, collectible.width, collectible.type.color);
        break;
      case 'shield':
        this.drawShield(ctx, collectible.width, collectible.type.color);
        break;
      case 'speedBoost':
        this.drawSpeedBoost(ctx, collectible.width, collectible.type.color);
        break;
      case 'doublePoints':
        this.drawDoublePoints(ctx, collectible.width, collectible.type.color);
        break;
    }
    
    ctx.restore();
  }
  
  drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius, color) {
    let rot = Math.PI / 2 * 3;
    let x = cx;
    let y = cy;
    const step = Math.PI / spikes;
    
    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    
    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      ctx.lineTo(x, y);
      rot += step;
      
      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      ctx.lineTo(x, y);
      rot += step;
    }
    
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    
    // Add shine effect
    ctx.beginPath();
    ctx.moveTo(cx - outerRadius / 3, cy - outerRadius / 3);
    ctx.lineTo(cx + outerRadius / 3, cy - outerRadius / 3);
    ctx.lineTo(cx - outerRadius / 3, cy + outerRadius / 3);
    ctx.closePath();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.fill();
  }
  
  drawGem(ctx, size, color) {
    const halfSize = size / 2;
    
    ctx.beginPath();
    ctx.moveTo(-halfSize, 0);
    ctx.lineTo(0, -halfSize);
    ctx.lineTo(halfSize, 0);
    ctx.lineTo(0, halfSize);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    
    // Add shine effect
    ctx.beginPath();
    ctx.moveTo(-halfSize / 2, -halfSize / 2);
    ctx.lineTo(0, -halfSize / 3);
    ctx.lineTo(-halfSize / 3, halfSize / 3);
    ctx.closePath();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.fill();
  }
  
  drawShield(ctx, size, color) {
    const halfSize = size / 2;
    
    // Draw shield shape
    ctx.beginPath();
    ctx.moveTo(0, -halfSize);
    ctx.lineTo(halfSize, -halfSize / 3);
    ctx.lineTo(halfSize, halfSize / 2);
    ctx.lineTo(0, halfSize);
    ctx.lineTo(-halfSize, halfSize / 2);
    ctx.lineTo(-halfSize, -halfSize / 3);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    
    // Add shine
    ctx.beginPath();
    ctx.moveTo(-halfSize / 2, -halfSize / 2);
    ctx.lineTo(0, -halfSize / 3);
    ctx.lineTo(-halfSize / 3, 0);
    ctx.closePath();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.fill();
  }
  
  drawSpeedBoost(ctx, size, color) {
    const halfSize = size / 2;
    
    // Draw lightning bolt
    ctx.beginPath();
    ctx.moveTo(0, -halfSize);
    ctx.lineTo(halfSize / 2, 0);
    ctx.lineTo(0, 0);
    ctx.lineTo(halfSize / 2, halfSize);
    ctx.lineTo(-halfSize / 2, 0);
    ctx.lineTo(0, 0);
    ctx.lineTo(-halfSize / 2, -halfSize);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
  }
  
  drawDoublePoints(ctx, size, color) {
    const halfSize = size / 2;
    const quarterSize = size / 4;
    
    // Draw "x2" symbol
    ctx.fillStyle = color;
    ctx.font = `${size}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('×2', 0, 0);
    
    // Add glow effect
    ctx.shadowColor = color;
    ctx.shadowBlur = 10;
    ctx.fillText('×2', 0, 0);
    ctx.shadowBlur = 0;
  }
  
  spawnCollectible() {
    // Determine collectible type based on probability
    const rand = Math.random();
    let cumulativeProbability = 0;
    let selectedType = this.types[0];
    
    for (const type of this.types) {
      cumulativeProbability += type.probability;
      if (rand <= cumulativeProbability) {
        selectedType = type;
        break;
      }
    }
    
    const size = selectedType.size;
    const x = Math.random() * (this.game.width - size);
    
    const collectible = {
      x: x,
      y: -size,
      width: size,
      height: size,
      speed: 0.15 + Math.random() * 0.1,
      type: selectedType,
      points: selectedType.points,
      angle: 0,
      rotationSpeed: 0.001 + Math.random() * 0.002,
      scale: 1
    };
    
    this.collectibles.push(collectible);
  }
  
  getCollectibles() {
    return this.collectibles;
  }
  
  removeCollectible(index) {
    this.collectibles.splice(index, 1);
  }
}