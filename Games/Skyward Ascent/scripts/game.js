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
            coins: 0,
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
        
        // Enhanced physics constants for better gameplay
        this.GRAVITY_UP = 0.32;           // Gravity when moving upward
        this.GRAVITY_DOWN = 0.15;         // Slower gravity when falling
        this.JUMP_FORCE = 13;             // Maintained jump force
        this.MOVE_SPEED = 7;              // Increased movement speed
        this.AIR_CONTROL = 0.25;          // Better air control
        this.DOT_RADIUS = 10;             // Smaller dots for more packing
        this.JUMP_DISTANCE = 180;         // Increased reach for wider paths
        this.LEVEL_HEIGHT = 100;          // Closer vertical layers
        this.CAMERA_SMOOTHING = 0.05;
        this.PLAYER_SMOOTHING = 0.1;
        this.VELOCITY_DAMPING = 0.96;
        this.CRACKING_DOT_REGEN_TIME = 5000; // 5 seconds regeneration
        
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

        // Ensure all audio elements are properly configured
        Object.values(this.audioElements).forEach(audio => {
            if (audio) {
                audio.preload = 'auto';
                audio.volume = 0.7;
            }
        });
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
        this.gameState.coins = window.storageManager.loadCoins();
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
        
        // Define wider climbing area for multiple paths
        const climbingArea = {
            left: rect.width * 0.15,
            right: rect.width * 0.85,
            width: rect.width * 0.7
        };
        
        const startY = rect.height - 50;
        const endY = -8000; // Generate more dots for longer gameplay
        
        // Starting platform
        const startDot = {
            x: rect.width / 2,
            y: startY,
            id: this.gameState.lastDotId++,
            type: this.DOT_TYPES.NORMAL,
            health: 3,
            originalHealth: 3,
            isBroken: false,
            breakTime: 0,
            moveDirection: 1,
            originalX: rect.width / 2
        };
        this.gameState.dots.push(startDot);
        
        let currentY = startY - this.LEVEL_HEIGHT;
        let lastLayerDots = [startDot]; // Track dots from previous layer
        
        while (currentY > endY) {
            const level = Math.floor((startY - currentY) / this.LEVEL_HEIGHT);
            this.gameState.difficulty = Math.min(level * 0.06 + 1, 2.0);
            
            // Generate 4-7 dots per layer for multiple paths
            const dotsThisLayer = Math.floor(Math.random() * 4) + 4;
            const newLayerDots = [];
            
            // Generate potential dot positions across the climbing area
            const potentialDots = [];
            for (let i = 0; i < dotsThisLayer * 2; i++) {
                const x = climbingArea.left + Math.random() * climbingArea.width;
                const y = currentY + (Math.random() - 0.5) * 40; // Some vertical variation
                potentialDots.push({ x, y });
            }
            
            // Select dots that are reachable and well-spaced
            for (const potential of potentialDots) {
                if (newLayerDots.length >= dotsThisLayer) break;
                
                // Check if reachable from at least one dot in the last layer
                const isReachable = lastLayerDots.some(lastDot => {
                    const distance = Math.sqrt(
                        (potential.x - lastDot.x) ** 2 + 
                        (potential.y - lastDot.y) ** 2
                    );
                    return distance <= this.JUMP_DISTANCE;
                });
                
                // Check minimum spacing from other dots in this layer
                const isWellSpaced = newLayerDots.every(existingDot => {
                    const distance = Math.sqrt(
                        (potential.x - existingDot.x) ** 2 + 
                        (potential.y - existingDot.y) ** 2
                    );
                    return distance >= 60; // Minimum spacing between dots
                });
                
                if (isReachable && isWellSpaced) {
                    // Determine dot type based on level and randomness
                    let dotType = this.DOT_TYPES.NORMAL;
                    const rand = Math.random();
                    
                    if (level > 5 && rand < 0.15) {
                        dotType = this.DOT_TYPES.CRACKING;
                    } else if (level > 8 && rand < 0.1) {
                        dotType = this.DOT_TYPES.MOVING;
                    }
                    
                    const newDot = {
                        x: potential.x,
                        y: potential.y,
                        id: this.gameState.lastDotId++,
                        type: dotType,
                        health: dotType === this.DOT_TYPES.CRACKING ? 2 : 3,
                        originalHealth: dotType === this.DOT_TYPES.CRACKING ? 2 : 3,
                        isBroken: false,
                        breakTime: 0,
                        moveDirection: Math.random() > 0.5 ? 1 : -1,
                        originalX: potential.x
                    };
                    
                    newLayerDots.push(newDot);
                    this.gameState.dots.push(newDot);
                }
            }
            
            // Ensure at least 2 dots per layer for progression
            if (newLayerDots.length < 2) {
                // Add emergency dots near the center
                for (let i = newLayerDots.length; i < 2; i++) {
                    const emergencyX = rect.width * 0.4 + Math.random() * rect.width * 0.2;
                    const emergencyDot = {
                        x: emergencyX,
                        y: currentY,
                        id: this.gameState.lastDotId++,
                        type: this.DOT_TYPES.NORMAL,
                        health: 3,
                        originalHealth: 3,
                        isBroken: false,
                        breakTime: 0,
                        moveDirection: 1,
                        originalX: emergencyX
                    };
                    newLayerDots.push(emergencyDot);
                    this.gameState.dots.push(emergencyDot);
                }
            }
            
            lastLayerDots = newLayerDots;
            currentY -= this.LEVEL_HEIGHT + Math.random() * 20;
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
            player.momentum = player.vx * 0.2;
            this.playSound('jump');
        }
        
        player.jumpPressed = isJumpPressed;
        
        // Apply different gravity based on movement direction
        if (player.vy < 0) {
            // Moving upward - normal gravity
            player.vy += this.GRAVITY_UP;
        } else {
            // Falling down - slower gravity
            player.vy += this.GRAVITY_DOWN;
        }
        
        // Clamp velocities to prevent extreme values
        player.vx = Math.max(-10, Math.min(10, player.vx));
        player.vy = Math.max(-18, Math.min(15, player.vy));
        
        // Update position
        player.x += player.vx;
        player.y += player.vy;
        
        // Check for fall
        if (player.y > this.canvas.getBoundingClientRect().height + 200) {
            this.gameOver();
        }
    }

    updateDots() {
        const currentTime = Date.now();
        
        this.gameState.dots.forEach(dot => {
            // Handle moving dots
            if (dot.type === this.DOT_TYPES.MOVING && !dot.isBroken) {
                dot.x += dot.moveDirection * 0.3;
                if (Math.abs(dot.x - dot.originalX) > 50) {
                    dot.moveDirection *= -1;
                }
            }
            
            // Handle cracking dot regeneration
            if (dot.type === this.DOT_TYPES.CRACKING && dot.isBroken) {
                if (currentTime - dot.breakTime >= this.CRACKING_DOT_REGEN_TIME) {
                    dot.health = dot.originalHealth;
                    dot.isBroken = false;
                    dot.breakTime = 0;
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
            
            // Skip broken dots for collision
            if (dot.isBroken) continue;
            
            const distance = Math.sqrt((player.x - dot.x) ** 2 + (player.y - dot.y) ** 2);
            
            if (distance < player.radius + this.DOT_RADIUS && player.vy > 0) {
                player.y = dot.y - player.radius - this.DOT_RADIUS;
                player.vy = 0;
                player.vx *= 0.9;
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
                        dot.isBroken = true;
                        dot.breakTime = Date.now();
                        this.playSound('crack');
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
            const oldHeight = this.gameState.height;
            this.gameState.height = currentHeight;
            this.gameState.score = this.gameState.height * 10 + Math.floor(this.gameState.height / 50) * 100;
            
            // Award coins for height milestones
            const oldHundreds = Math.floor(oldHeight / 100);
            const newHundreds = Math.floor(currentHeight / 100);
            
            if (newHundreds > oldHundreds) {
                const coinsEarned = (newHundreds - oldHundreds) * 10;
                this.gameState.coins += coinsEarned;
                window.storageManager.saveCoins(this.gameState.coins);
            }
            
            this.updateUI();
        }
    }

    updateUI() {
        if (window.uiManager) {
            window.uiManager.updateScore(this.gameState.score, this.gameState.coins);
            window.uiManager.updateHeight(this.gameState.height);
        }
    }

    gameOver() {
        this.gameState.isPlaying = false;
        this.stopSound('ambient');
        this.playSound('fall');
        
        // Save high score and coins
        const isNewHigh = window.storageManager.saveHighScore(this.gameState.score);
        window.storageManager.saveCoins(this.gameState.coins);
        
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
                coins: this.gameState.coins,
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
            
            // Modify appearance based on dot type and state
            if (dot.type === this.DOT_TYPES.CRACKING) {
                if (dot.isBroken) {
                    // Render broken dots as faded
                    this.ctx.globalAlpha = 0.2;
                    dotColor = '#666666';
                    glowColor = 'rgba(102, 102, 102, 0.2)';
                } else {
                    const healthRatio = dot.health / dot.originalHealth;
                    dotColor = `rgb(${255}, ${Math.floor(107 * healthRatio)}, ${Math.floor(107 * healthRatio)})`;
                    glowColor = `rgba(255, 107, 107, ${0.6 * healthRatio})`;
                }
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
            
            // Draw crack effects for damaged but not broken cracking dots
            if (dot.type === this.DOT_TYPES.CRACKING && !dot.isBroken && dot.health < dot.originalHealth) {
                this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
                this.ctx.lineWidth = 1;
                this.ctx.beginPath();
                this.ctx.moveTo(dot.x - this.DOT_RADIUS * 0.7, dot.y);
                this.ctx.lineTo(dot.x + this.DOT_RADIUS * 0.7, dot.y);
                this.ctx.moveTo(dot.x, dot.y - this.DOT_RADIUS * 0.7);
                this.ctx.lineTo(dot.x, dot.y + this.DOT_RADIUS * 0.7);
                this.ctx.stroke();
            }
            
            // Reset alpha for broken dots
            if (dot.isBroken) {
                this.ctx.globalAlpha = 1.0;
            }
        });
    }

    renderPlayer(theme) {
        const player = this.gameState.player;
        
        // Get player color from CSS variable (for skin support)
        const playerColor = getComputedStyle(document.documentElement).getPropertyValue('--player-color').trim() || theme.player;
        
        // Player glow
        this.ctx.beginPath();
        this.ctx.arc(player.x, player.y, player.radius * 2, 0, Math.PI * 2);
        const playerGlow = this.ctx.createRadialGradient(
            player.x, player.y, 0,
            player.x, player.y, player.radius * 2
        );
        playerGlow.addColorStop(0, playerColor + '40');
        playerGlow.addColorStop(1, 'transparent');
        this.ctx.fillStyle = playerGlow;
        this.ctx.fill();
        
        // Player body
        this.ctx.beginPath();
        this.ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = playerColor;
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
        
        reachableDots.slice(0, 3).forEach(dot => {
            this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
            this.ctx.lineWidth = 2;
            this.ctx.setLineDash([8, 12]);
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
                if (dot.isBroken) return false;
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
        
        try {
            const audio = this.audioElements[soundName];
            audio.currentTime = 0;
            
            // Handle different audio types
            if (soundName === 'ambient') {
                audio.loop = true;
                audio.volume = 0.3;
            } else {
                audio.loop = false;
                audio.volume = 0.7;
            }
            
            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise.catch(e => {
                    console.log('Audio play failed:', e);
                });
            }
        } catch (error) {
            console.log('Audio error:', error);
        }
    }

    stopSound(soundName) {
        if (!this.audioElements[soundName]) return;
        
        try {
            const audio = this.audioElements[soundName];
            audio.pause();
            audio.currentTime = 0;
        } catch (error) {
            console.log('Audio stop error:', error);
        }
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