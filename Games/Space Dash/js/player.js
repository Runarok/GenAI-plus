export class Player {
  constructor(game) {
    this.game = game;
    
    // Set initial dimensions and position
    this.width = 40;
    this.height = 50;
    this.x = game.width / 2 - this.width / 2;
    this.y = game.height - this.height - 20;
    
    // Movement properties
    this.speed = 0.4; // Pixels per millisecond
    this.velocityX = 0;
    this.velocityY = 0;
    this.maxVelocity = 0.5;
    this.friction = 0.95;
    this.movingLeft = false;
    this.movingRight = false;
    this.movingUp = false;
    this.movingDown = false;
    
    // Touch control properties
    this.touchActive = false;
    this.touchTargetX = 0;
    this.touchTargetY = 0;
    
    // Boundaries
    this.updateBoundaries();
    
    // Visual properties
    this.baseColor = '#3b82f6'; // Blue
    this.color = this.baseColor;
    this.thrusterColor = '#f43f5e'; // Red/pink
    this.thrusterActive = false;
    
    // Power-up properties
    this.hasShield = false;
    this.shieldEndTime = 0;
    this.hasSpeedBoost = false;
    this.speedBoostEndTime = 0;
    this.hasDoublePoints = false;
    this.doublePointsEndTime = 0;
    
    // Collision detection
    this.hitbox = {
      x: this.x + this.width * 0.2,
      y: this.y + this.height * 0.2,
      width: this.width * 0.6,
      height: this.height * 0.6
    };
  }
  
  updateBoundaries() {
    this.minX = 0;
    this.maxX = this.game.width - this.width;
    this.minY = 0;
    this.maxY = this.game.height - this.height;
  }
  
  reset() {
    this.x = this.game.width / 2 - this.width / 2;
    this.y = this.game.height - this.height - 20;
    this.velocityX = 0;
    this.velocityY = 0;
    this.movingLeft = false;
    this.movingRight = false;
    this.movingUp = false;
    this.movingDown = false;
    this.touchActive = false;
    this.hasShield = false;
    this.hasSpeedBoost = false;
    this.hasDoublePoints = false;
    this.color = this.baseColor;
  }
  
  update(deltaTime) {
    const currentTime = performance.now();
    
    // Update power-ups
    if (this.hasShield && currentTime > this.shieldEndTime) {
      this.hasShield = false;
    }
    
    if (this.hasSpeedBoost && currentTime > this.speedBoostEndTime) {
      this.hasSpeedBoost = false;
      this.maxVelocity = 0.5;
    }
    
    if (this.hasDoublePoints && currentTime > this.doublePointsEndTime) {
      this.hasDoublePoints = false;
    }
    
    // Handle keyboard movement
    if (this.movingLeft) this.velocityX -= this.speed * deltaTime;
    if (this.movingRight) this.velocityX += this.speed * deltaTime;
    if (this.movingUp) this.velocityY -= this.speed * deltaTime;
    if (this.movingDown) this.velocityY += this.speed * deltaTime;
    
    // Handle touch movement
    if (this.touchActive) {
      const dx = this.touchTargetX - (this.x + this.width / 2);
      const dy = this.touchTargetY - (this.y + this.height / 2);
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance > 5) {
        this.velocityX = (dx / distance) * this.maxVelocity * deltaTime;
        this.velocityY = (dy / distance) * this.maxVelocity * deltaTime;
      } else {
        this.velocityX *= this.friction;
        this.velocityY *= this.friction;
      }
    } else {
      this.velocityX *= this.friction;
      this.velocityY *= this.friction;
    }
    
    // Apply speed boost if active
    const currentMaxVelocity = this.hasSpeedBoost ? this.maxVelocity * 1.5 : this.maxVelocity;
    
    // Clamp velocity
    this.velocityX = Math.max(-currentMaxVelocity * deltaTime, Math.min(currentMaxVelocity * deltaTime, this.velocityX));
    this.velocityY = Math.max(-currentMaxVelocity * deltaTime, Math.min(currentMaxVelocity * deltaTime, this.velocityY));
    
    // Update position
    this.x += this.velocityX;
    this.y += this.velocityY;
    
    // Keep within boundaries
    this.x = Math.max(this.minX, Math.min(this.maxX, this.x));
    this.y = Math.max(this.minY, Math.min(this.maxY, this.y));
    
    // Update hitbox position
    this.updateHitbox();
    
    // Determine if thrusters are active
    this.thrusterActive = Math.abs(this.velocityX) > 0.1 || Math.abs(this.velocityY) > 0.1;
    
    // Update visual effects
    this.updateVisuals(currentTime);
  }
  
  updateVisuals(currentTime) {
    // Base color with power-up effects
    if (this.hasShield) {
      const pulseIntensity = (Math.sin(currentTime / 200) + 1) / 2;
      this.color = `rgba(96, 165, 250, ${0.7 + pulseIntensity * 0.3})`; // Pulsing blue
    } else if (this.hasSpeedBoost) {
      this.color = '#34d399'; // Green
    } else if (this.hasDoublePoints) {
      this.color = '#f472b6'; // Pink
    } else {
      this.color = this.baseColor;
    }
  }
  
  updateHitbox() {
    this.hitbox.x = this.x + this.width * 0.2;
    this.hitbox.y = this.y + this.height * 0.2;
  }
  
  render(ctx) {
    ctx.save();
    ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
    
    // Draw shield effect if active
    if (this.hasShield) {
      ctx.beginPath();
      ctx.arc(0, 0, this.width * 0.8, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(96, 165, 250, 0.5)';
      ctx.lineWidth = 3;
      ctx.stroke();
    }
    
    // Draw thruster flame if moving
    if (this.thrusterActive) {
      ctx.fillStyle = this.thrusterColor;
      ctx.beginPath();
      ctx.moveTo(-8, 15);
      ctx.lineTo(0, 30);
      ctx.lineTo(8, 15);
      ctx.closePath();
      ctx.fill();
    }
    
    // Draw ship body
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(0, -25);
    ctx.lineTo(20, 15);
    ctx.lineTo(0, 5);
    ctx.lineTo(-20, 15);
    ctx.closePath();
    ctx.fill();
    
    // Draw cockpit
    ctx.fillStyle = '#8b5cf6';
    ctx.beginPath();
    ctx.ellipse(0, -5, 5, 10, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw power-up effects
    if (this.hasSpeedBoost) {
      this.drawSpeedTrail(ctx);
    }
    if (this.hasDoublePoints) {
      this.drawPointsAura(ctx);
    }
    
    ctx.restore();
  }
  
  drawSpeedTrail(ctx) {
    ctx.beginPath();
    ctx.moveTo(-25, 20);
    ctx.lineTo(0, 40);
    ctx.lineTo(25, 20);
    ctx.strokeStyle = '#34d399';
    ctx.lineWidth = 2;
    ctx.stroke();
  }
  
  drawPointsAura(ctx) {
    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.width);
    gradient.addColorStop(0, 'rgba(244, 114, 182, 0.2)');
    gradient.addColorStop(1, 'rgba(244, 114, 182, 0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(0, 0, this.width, 0, Math.PI * 2);
    ctx.fill();
  }
  
  activatePowerUp(type, duration) {
    const currentTime = performance.now();
    
    switch (type) {
      case 'shield':
        this.hasShield = true;
        this.shieldEndTime = currentTime + duration;
        break;
      case 'speed':
        this.hasSpeedBoost = true;
        this.speedBoostEndTime = currentTime + duration;
        this.maxVelocity = 0.75; // 1.5x speed boost
        break;
      case 'double':
        this.hasDoublePoints = true;
        this.doublePointsEndTime = currentTime + duration;
        break;
    }
  }
  
  setMovement(direction, active) {
    switch (direction) {
      case 'left':
        this.movingLeft = active;
        break;
      case 'right':
        this.movingRight = active;
        break;
      case 'up':
        this.movingUp = active;
        break;
      case 'down':
        this.movingDown = active;
        break;
    }
  }
  
  setTouchTarget(x, y, active) {
    this.touchActive = active;
    if (active) {
      this.touchTargetX = x;
      this.touchTargetY = y;
    }
  }
}