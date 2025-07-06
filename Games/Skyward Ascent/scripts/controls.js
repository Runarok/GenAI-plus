// Input Controls Management
class ControlsManager {
    constructor() {
        this.keys = {};
        this.mobileInput = null;
        this.touchStartTime = 0;
        this.callbacks = {
            jump: null,
            moveLeft: null,
            moveRight: null,
            pause: null
        };
        
        this.init();
    }

    init() {
        this.setupKeyboardControls();
        this.setupMobileControls();
        this.setupGamepadSupport();
    }

    // Keyboard Controls
    setupKeyboardControls() {
        document.addEventListener('keydown', (e) => {
            const key = e.key.toLowerCase();
            this.keys[key] = true;
            
            // Prevent default for game keys
            if (['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright', ' '].includes(key)) {
                e.preventDefault();
            }
            
            // Handle pause
            if (key === 'escape' && this.callbacks.pause) {
                this.callbacks.pause();
            }
        });

        document.addEventListener('keyup', (e) => {
            const key = e.key.toLowerCase();
            this.keys[key] = false;
        });

        // Prevent context menu on right click
        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });
    }

    // Mobile Touch Controls
    setupMobileControls() {
        const mobileButtons = document.querySelectorAll('.mobile-btn');
        
        mobileButtons.forEach(btn => {
            // Touch events
            btn.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.handleMobileInput(btn.dataset.action, true);
                this.touchStartTime = Date.now();
            });
            
            btn.addEventListener('touchend', (e) => {
                e.preventDefault();
                this.handleMobileInput(btn.dataset.action, false);
            });
            
            // Mouse events for desktop testing
            btn.addEventListener('mousedown', (e) => {
                e.preventDefault();
                this.handleMobileInput(btn.dataset.action, true);
            });
            
            btn.addEventListener('mouseup', (e) => {
                e.preventDefault();
                this.handleMobileInput(btn.dataset.action, false);
            });
            
            // Prevent drag
            btn.addEventListener('dragstart', (e) => {
                e.preventDefault();
            });
        });
    }

    handleMobileInput(action, isPressed) {
        if (isPressed) {
            this.mobileInput = action;
            
            // Immediate jump action
            if (action === 'jump' && this.callbacks.jump) {
                this.callbacks.jump();
            }
        } else {
            if (this.mobileInput === action) {
                this.mobileInput = null;
            }
        }
    }

    // Basic Gamepad Support
    setupGamepadSupport() {
        this.gamepadIndex = -1;
        this.gamepadState = {};
        
        window.addEventListener('gamepadconnected', (e) => {
            this.gamepadIndex = e.gamepad.index;
            console.log('Gamepad connected:', e.gamepad.id);
        });
        
        window.addEventListener('gamepaddisconnected', (e) => {
            if (e.gamepad.index === this.gamepadIndex) {
                this.gamepadIndex = -1;
            }
        });
    }

    updateGamepad() {
        if (this.gamepadIndex === -1) return;
        
        const gamepad = navigator.getGamepads()[this.gamepadIndex];
        if (!gamepad) return;
        
        // Button mapping (Xbox controller)
        const buttons = {
            jump: gamepad.buttons[0]?.pressed, // A button
            pause: gamepad.buttons[9]?.pressed // Menu button
        };
        
        // Analog stick for movement
        const leftStick = {
            x: gamepad.axes[0] || 0,
            y: gamepad.axes[1] || 0
        };
        
        // Handle jump
        if (buttons.jump && !this.gamepadState.jump && this.callbacks.jump) {
            this.callbacks.jump();
        }
        
        // Handle pause
        if (buttons.pause && !this.gamepadState.pause && this.callbacks.pause) {
            this.callbacks.pause();
        }
        
        // Store previous state
        this.gamepadState = buttons;
        
        // Return movement state
        return {
            moveLeft: leftStick.x < -0.3,
            moveRight: leftStick.x > 0.3
        };
    }

    // Input State Getters
    isMovingLeft() {
        const gamepadState = this.updateGamepad();
        return this.keys['a'] || 
               this.keys['arrowleft'] || 
               this.mobileInput === 'left' ||
               (gamepadState && gamepadState.moveLeft);
    }

    isMovingRight() {
        const gamepadState = this.updateGamepad();
        return this.keys['d'] || 
               this.keys['arrowright'] || 
               this.mobileInput === 'right' ||
               (gamepadState && gamepadState.moveRight);
    }

    isJumping() {
        return this.keys['w'] || 
               this.keys['arrowup'] || 
               this.keys[' '];
    }

    // Callback Registration
    onJump(callback) {
        this.callbacks.jump = callback;
    }

    onMoveLeft(callback) {
        this.callbacks.moveLeft = callback;
    }

    onMoveRight(callback) {
        this.callbacks.moveRight = callback;
    }

    onPause(callback) {
        this.callbacks.pause = callback;
    }

    // Utility Methods
    reset() {
        this.keys = {};
        this.mobileInput = null;
        this.gamepadState = {};
    }

    // Check if device likely has touch
    isMobileDevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }
}

// Global controls instance
window.controlsManager = new ControlsManager();