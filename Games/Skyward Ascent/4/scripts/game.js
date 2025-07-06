// Game Management
class GameManager {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.gameState = {
            isPlaying: false,
            isPaused: false,
            score: 0,
            height: 0,
            startTime: 0,
            camera: { x: 0, y: 0, targetX: 0, targetY: 0 },
            player: {
                x: 0,
                y: 0,
                vx: 0,
                vy: 0,
                onGround: false,
                radius: 12,
                momentum: 0,
                lastGroundTime: 0,
                jumpPressed: false
            },
            dots: [],
            difficulty: 1,
            lastDotId: 0
        };
        
        // Enhanced physics constants for faster, more dynamic gameplay
        this.GRAVITY = 0.32;           // Slightly increased for better feel
        this.JUMP_FORCE = 13;          // Increased from 9.5 for bigger jumps
        this.MOVE_SPEED = 6.5;         // Increased from 3.5 for faster movement
        this.AIR_CONTROL = 0.2;        // Increased for better air control
        this.DOT_RADIUS = 12;
        this.JUMP_DISTANCE = 160;      // Increased reach for bigger jumps
        this.LEVEL_HEIGHT = 120;       
        this.CAMERA_SMOOTHING = 0.05;  // Slightly faster camera
        this.PLAYER_SMOOTHING = 0.1;   // Faster movement response
        this.VELOCITY_DAMPING = 0.96;  // Slightly less damping
        
        // Dot types
        this.DOT_TYPES = {
            NORMAL: 'normal',
            CRACKING: 'cracking',
            MOVING: 'moving'
        };
        
        this.audioEnabled = true;
        this.animationId = null;
        
        this.init();
    }

    init() {
        this.setupCanvas();
        this.setupAudio();
        this.setupControls();
        
        // Start with main menu
        if (window.uiManager) {
            window.uiManager.showScreen('mainMenu');
        }
    }

    setupCanvas() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    resizeCanvas() {
        const dpr = window.devicePixelRatio || 1;
        const rect = this.canvas.getBoundingClientRect();
        
        this.canvas.width = rect.width * dpr;
        this.canvas.height = rect.height * dpr;
        
        this.ctx.scale(dpr, dpr);
        this.canvas.style.width = rect.width + 'px';
        this.canvas.style.height = rect.height + 'px';
    }

    setupAudio() {
        this.audioElements = {
            jump: document.getElementById('jumpSound'),
            land: document.getElementById('landSound'),
            fall: document.getElementById('fallSound'),
            crack: document.getElementById('crackSound'),
            ambient: document.getElementById('ambientSound')
        };
    }

    setupControls() {
        if (window.controlsManager) {
            window.controlsManager.onPause(() => this.togglePause());
        }
    }

    // Game State Management
    startGame() {
        this.initializeGame();
        this.gameState.isPlaying = true;
        this.gameState.isPaused = false;
        this.gameState.startTime = Date.now();
        
        if (this.audioEnabled) {
            this.playSound('ambient');
        }
        
        this.gameLoop();
    }

    stopGame() {
        this.gameState.isPlaying = false;
        this.gameState.isPaused = false;
        
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
        
        this.stopSound('ambient');
        
        if (window.uiManager) {
            window.uiManager.hidePauseMenu();
        }
    }

    restartGame() {
        this.stopGame();
        setTimeout(() => {
            this.startGame();
            if (window.uiManager) {
                window.uiManager.showScreen('gameplayScreen');
            }
        }, 100);
    }

    togglePause() {
        if (!this.gameState.isPlaying) return;
        
        this.gameState.isPaused = !this.gameState.isPaused;
        
        if (window.uiManager) {
            if (this.gameState.isPaused) {
                window.uiManager.showPauseMenu();
                this.stopSound('ambient');
            } else {
                window.uiManager.hidePauseMenu();
                if (this.audioEnabled) {
                    this.playSound('ambient');
                }
            }
        }
    }

    initializeGame() {
        const rect = this.canvas.getBoundingClientRect();
        
        this.gameState.score = 0;
        this.gameState.height = 0;
        this.gameState.camera = { x: 0, y: 0, targetX: 0, targetY: 0 };
        this.gameState.player = {
            x: rect.width / 2,
            y: rect.height - 100,
            vx: 0,
            vy: 0,
            onGround: false,
            radius: 12,
            momentum: 0,
            lastGroundTime: Date.now(),
            jumpPressed: false
        };
        this.gameState.dots = [];
        this.gameState.difficulty = 1;
        this.gameState.lastDotId = 0;
        
        this.generateDots();
        this.updateUI();
    }

    generateDots() {
        const rect = this.canvas.getBoundingClientRect();
        
        // Define climbing band - adjusted for bigger jumps
        const centerBand = {
            left: rect.width * 0.25,
            right: rect.width * 0.75,
            width: rect.width * 0.5
        };
        
        const startY = rect.height - 50;
        const endY = -6000; // Generate more dots
        
        // Starting platform
        this.gameState.dots.push({
            x: rect.width / 2,
            y: startY,
            id: this.gameState.lastDotId++,
            type: this.DOT_TYPES.NORMAL,
            health: 3,
            moveDirection: 1,
            originalX: rect.width / 2
        });
        
        let currentY = startY - 100;
        let currentX = rect.width / 2;
        let lastDotX = currentX;
        
        while (currentY > endY) {
            const level = Math.floor((startY - currentY) / this.LEVEL_HEIGHT);
            this.gameState.difficulty = Math.min(level * 0.08 + 1, 1.8);
            
            // Generate 2-3 dots per level with spacing for bigger jumps
            const dotsThisLevel = Math.floor(Math.random() * 2) + 2;
            
            for (let i = 0; i < dotsThisLevel; i++) {
                // Improved spacing logic for bigger jumps
                const minDistance = 100;  // Increased for bigger jumps
                const maxDistance = Math.min(150, 100 + level * 3);
                const distance = Math.random() * (maxDistance - minDistance) + minDistance;
                
                // Wider angle range for more dynamic movement
                const maxAngle = Math.min(Math.PI * 0.6, Math.PI * 0.35 + level * 0.01);
                const angle = (Math.random() - 0.5) * maxAngle;
                
                let nextX = currentX + Math.sin(angle) * distance;
                const nextY = currentY - Math.cos(angle) * distance * 0.8;
                
                // Ensure minimum horizontal spacing from last dot
                const minHorizontalSpacing = 80;
                if (Math.abs(nextX - lastDotX) < minHorizontalSpacing) {
                    nextX = lastDotX + (nextX > lastDotX ? minHorizontalSpacing : -minHorizontalSpacing);
                }
                
                // Keep dots within climbing band
                nextX = Math.max(centerBand.left, Math.min(centerBand.right, nextX));
                
                // Verify reachability with new jump distance
                const distanceFromCurrent = Math.sqrt((nextX - currentX) ** 2 + (nextY - currentY) ** 2);
                if (distanceFromCurrent <= this.JUMP_DISTANCE) {
                    // Determine dot type based on level
                    let dotType = this.DOT_TYPES.NORMAL;
                    if (level > 8 && Math.random() < 0.12) {
                        dotType = this.DOT_TYPES.CRACKING;
                    } else if (level > 12 && Math.random() < 0.08) {
                        dotType = this.DOT_TYPES.MOVING;
                    }
                    
                    this.gameState.dots.push({
                        x: nextX,
                        y: nextY,
                        id: this.gameState.lastDotId++,
                        type: dotType,
                        health: dotType === this.DOT_TYPES.CRACKING ? 2 : 3,
                        moveDirection: Math.random() > 0.5 ? 1 : -1,
                        originalX: nextX
                    });
                    
                    lastDotX = currentX;
                    currentX = nextX;
                    currentY = nextY;
                }
            }
            
            currentY -= 80 + Math.random() * 40;
        }
    }

    // Game Loop
    gameLoop() {
        if (!this.gameState.isPlaying) return;
        
        if (!this.gameState.isPaused) {
            this.updateGame();
        }
        
        this.render();
        this.animationId = requestAnimationFrame(() => this.gameLoop());
    }

    updateGame() {
        this.updatePlayer();
        this.updateDots();
        this.updateCamera();
        this.checkCollisions();
        this.updateScore();
    }

    updatePlayer() {
        const player = this.gameState.player;
        
        // Input handling with proper state management
        let targetVx = 0;
        if (window.controlsManager) {
            if (window.controlsManager.isMovingLeft()) {
                targetVx = -this.MOVE_SPEED;
            }
            if (window.controlsManager.isMovingRight()) {
                targetVx = this.MOVE_SPEED;
            }
        }
        
        // Apply movement with improved physics
        const responsiveness = player.onGround ? this.PLAYER_SMOOTHING : this.AIR_CONTROL * this.PLAYER_SMOOTHING;
        player.vx += (targetVx - player.vx) * responsiveness;
        
        // Apply velocity damping to prevent drift
        player.vx *= this.VELOCITY_DAMPING;
        
        // Momentum system for air control
        if (!player.onGround) {
            player.momentum *= 0.97;
            player.vx += player.momentum;
        } else {
            player.momentum = 0; // Reset momentum on ground
        }
        
        // Jump handling with proper state management
        const isJumpPressed = window.controlsManager && window.controlsManager.isJumping();
        const canJump = player.onGround || (Date.now() - player.lastGroundTime < 120); // Coyote time
        
        if (isJumpPressed && !player.jumpPressed && canJump) {
            player.vy = -this.JUMP_FORCE;
            player.onGround = false;
            player.momentum = player.vx * 0.2; // Increased momentum transfer for dynamic movement
            this.playSound('jump');
        }
        
        player.jumpPressed = isJumpPressed;
        
        // Apply gravity with easing
        player.vy += this.GRAVITY;
        
        // Clamp velocities to prevent extreme values (increased limits for faster movement)
        player.vx = Math.max(-10, Math.min(10, player.vx));
        player.vy = Math.max(-18, Math.min(18, player.vy));
        
        // Update position
        player.x += player.vx;
        player.y += player.vy;
        
        // Check for fall
        if (player.y > this.canvas.getBoundingClientRect().height + 200) {
            this.gameOver();
        }
    }

    updateDots() {
        this.gameState.dots.forEach(dot => {
            if (dot.type === this.DOT_TYPES.MOVING) {
                dot.x += dot.moveDirection * 0.3; // Slower movement
                if (Math.abs(dot.x - dot.originalX) > 50) {
                    dot.moveDirection *= -1;
                }
            }
        });
    }

    updateCamera() {
        const player = this.gameState.player;
        const rect = this.canvas.getBoundingClientRect();
        
        this.gameState.camera.targetX = player.x - rect.width / 2;
        this.gameState.camera.targetY = player.y - rect.height * 0.65;
        
        // Smoother camera movement
        this.gameState.camera.x += (this.gameState.camera.targetX - this.gameState.camera.x) * this.CAMERA_SMOOTHING;
        this.gameState.camera.y += (this.gameState.camera.targetY - this.gameState.camera.y) * this.CAMERA_SMOOTHING;
    }

    checkCollisions() {
        const player = this.gameState.player;
        let wasOnGround = player.onGround;
        player.onGround = false;
        
        for (let i = this.gameState.dots.length - 1; i >= 0; i--) {
            const dot = this.gameState.dots[i];
            const distance = Math.sqrt((player.x - dot.x) ** 2 + (player.y - dot.y) ** 2);
            
            if (distance < player.radius + this.DOT_RADIUS && player.vy > 0) {
                player.y = dot.y - player.radius - this.DOT_RADIUS;
                player.vy = 0;
                player.vx *= 0.9; // Slightly less reduction for faster movement
                player.onGround = true;
                player.momentum = 0;
                player.lastGroundTime = Date.now();
                
                if (!wasOnGround) {
                    this.playSound('land');
                }
                
                // Handle dot types
                if (dot.type === this.DOT_TYPES.CRACKING) {
                    dot.health--;
                    if (dot.health <= 0) {
                        this.playSound('crack');
                        setTimeout(() => {
                            const index = this.gameState.dots.indexOf(dot);
                            if (index > -1) {
                                this.gameState.dots.splice(index, 1);
                            }
                        }, 400);
                    }
                }
                break;
            }
        }
    }

    updateScore() {
        const rect = this.canvas.getBoundingClientRect();
        const currentHeight = Math.max(0, Math.floor((rect.height - this.gameState.player.y) / 10));
        
        if (currentHeight > this.gameState.height) {
            this.gameState.height = currentHeight;
            this.gameState.score = this.gameState.height * 10 + Math.floor(this.gameState.height / 50) * 100;
            this.updateUI();
        }
    }

    updateUI() {
        if (window.uiManager) {
            window.uiManager.updateScore(this.gameState.score);
            window.uiManager.updateHeight(this.gameState.height);
        }
    }

    gameOver() {
        this.gameState.isPlaying = false;
        this.stopSound('ambient');
        this.playSound('fall');
        
        // Save high score
        const isNewHigh = window.storageManager.saveHighScore(this.gameState.score);
        
        if (window.uiManager) {
            const themeNames = {
                'dark-mountains': '🏔️ Dark Mountains',
                'snow-peak': '❄️ Snow Peak',
                'sunset-cliff': '🌄 Sunset Cliff',
                'alien-rock': '👽 Alien Rock'
            };
            
            window.uiManager.showGameOver({
                score: this.gameState.score,
                height: this.gameState.height,
                theme: themeNames[window.uiManager.getCurrentTheme()] || 'Unknown'
            });
        }
    }

    // Rendering
    render() {
        const rect = this.canvas.getBoundingClientRect();
        this.ctx.clearRect(0, 0, rect.width, rect.height);
        
        // Get theme colors
        const theme = this.getThemeColors();
        
        // Draw background gradient
        const gradient = this.ctx.createLinearGradient(0, 0, 0, rect.height);
        gradient.addColorStop(0, theme.gradientStart);
        gradient.addColorStop(1, theme.gradientEnd);
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, rect.width, rect.height);
        
        this.ctx.save();
        this.ctx.translate(-this.gameState.camera.x, -this.gameState.camera.y);
        
        this.renderDots(theme);
        this.renderPlayer(theme);
        this.renderTrajectoryHints(theme);
        
        this.ctx.restore();
    }

    renderDots(theme) {
        const camera = this.gameState.camera;
        const rect = this.canvas.getBoundingClientRect();
        
        this.gameState.dots.forEach(dot => {
            // Cull dots outside view
            if (dot.y < camera.y - 100 || dot.y > camera.y + rect.height + 100) return;
            
            let dotColor = theme.dotNormal;
            let glowColor = theme.dotNormal + '60';
            
            // Modify appearance based on dot type
            if (dot.type === this.DOT_TYPES.CRACKING) {
                const healthRatio = dot.health / 2;
                dotColor = `rgb(${255}, ${Math.floor(107 * healthRatio)}, ${Math.floor(107 * healthRatio)})`;
                glowColor = `rgba(255, 107, 107, ${0.6 * healthRatio})`;
            } else if (dot.type === this.DOT_TYPES.MOVING) {
                dotColor = theme.dotMoving;
                glowColor = theme.dotMoving + '60';
            }
            
            // Draw glow
            this.ctx.beginPath();
            this.ctx.arc(dot.x, dot.y, this.DOT_RADIUS * 1.8, 0, Math.PI * 2);
            this.ctx.fillStyle = glowColor;
            this.ctx.fill();
            
            // Draw main dot
            this.ctx.beginPath();
            this.ctx.arc(dot.x, dot.y, this.DOT_RADIUS, 0, Math.PI * 2);
            this.ctx.fillStyle = dotColor;
            this.ctx.fill();
            
            // Draw crack effects
            if (dot.type === this.DOT_TYPES.CRACKING && dot.health < 2) {
                this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
                this.ctx.lineWidth = 1;
                this.ctx.beginPath();
                this.ctx.moveTo(dot.x - this.DOT_RADIUS * 0.7, dot.y);
                this.ctx.lineTo(dot.x + this.DOT_RADIUS * 0.7, dot.y);
                this.ctx.moveTo(dot.x, dot.y - this.DOT_RADIUS * 0.7);
                this.ctx.lineTo(dot.x, dot.y + this.DOT_RADIUS * 0.7);
                this.ctx.stroke();
            }
        });
    }

    renderPlayer(theme) {
        const player = this.gameState.player;
        
        // Player glow
        this.ctx.beginPath();
        this.ctx.arc(player.x, player.y, player.radius * 2, 0, Math.PI * 2);
        const playerGlow = this.ctx.createRadialGradient(
            player.x, player.y, 0,
            player.x, player.y, player.radius * 2
        );
        playerGlow.addColorStop(0, theme.player + '40');
        playerGlow.addColorStop(1, 'transparent');
        this.ctx.fillStyle = playerGlow;
        this.ctx.fill();
        
        // Player body
        this.ctx.beginPath();
        this.ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = theme.player;
        this.ctx.fill();
        
        // Player highlight
        this.ctx.beginPath();
        this.ctx.arc(
            player.x - player.radius * 0.3,
            player.y - player.radius * 0.3,
            player.radius * 0.4,
            0, Math.PI * 2
        );
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        this.ctx.fill();
    }

    renderTrajectoryHints(theme) {
        if (!this.gameState.player.onGround) return;
        
        const reachableDots = this.findReachableDots();
        
        reachableDots.slice(0, 2).forEach(dot => {
            this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
            this.ctx.lineWidth = 2;
            this.ctx.setLineDash([10, 15]);
            this.ctx.beginPath();
            this.ctx.moveTo(this.gameState.player.x, this.gameState.player.y);
            this.ctx.lineTo(dot.x, dot.y);
            this.ctx.stroke();
            this.ctx.setLineDash([]);
        });
    }

    findReachableDots() {
        const player = this.gameState.player;
        return this.gameState.dots
            .filter(dot => {
                const distance = Math.sqrt((player.x - dot.x) ** 2 + (player.y - dot.y) ** 2);
                return distance < this.JUMP_DISTANCE && dot.y < player.y - 20;
            })
            .sort((a, b) => {
                const distA = Math.sqrt((player.x - a.x) ** 2 + (player.y - a.y) ** 2);
                const distB = Math.sqrt((player.x - b.x) ** 2 + (player.y - b.y) ** 2);
                return distA - distB;
            });
    }

    getThemeColors() {
        const style = getComputedStyle(document.documentElement);
        return {
            gradientStart: style.getPropertyValue('--gradient-start').trim(),
            gradientEnd: style.getPropertyValue('--gradient-end').trim(),
            player: style.getPropertyValue('--player-color').trim(),
            dotNormal: style.getPropertyValue('--dot-normal').trim(),
            dotCracking: style.getPropertyValue('--dot-cracking').trim(),
            dotMoving: style.getPropertyValue('--dot-moving').trim()
        };
    }

    // Audio Management
    playSound(soundName) {
        if (!this.audioEnabled || !this.audioElements[soundName]) return;
        
        const audio = this.audioElements[soundName];
        audio.currentTime = 0;
        audio.play().catch(e => console.log('Audio play failed:', e));
    }

    stopSound(soundName) {
        if (!this.audioElements[soundName]) return;
        
        const audio = this.audioElements[soundName];
        audio.pause();
        audio.currentTime = 0;
    }

    setAudioEnabled(enabled) {
        this.audioEnabled = enabled;
        
        if (!enabled) {
            this.stopSound('ambient');
        } else if (this.gameState.isPlaying && !this.gameState.isPaused) {
            this.playSound('ambient');
        }
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.gameManager = new GameManager();
});