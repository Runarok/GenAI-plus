// Main Game Controller
class SudokuGame {
    constructor() {
        this.manualSelectedCell = { row: 4, col: 4 }; // Track selection in manual mode
        this.init();
    }

    init() {
        // Initialize global instances
        window.boardRenderer = new BoardRenderer();
        window.inputValidator = new InputValidator();
        window.gameLogic = new GameLogic();
        window.botLogic = new BotLogic();
        window.gameInstance = this;

        // Create boards
        window.boardRenderer.createSudokuBoard('sudoku-board');
        window.boardRenderer.createSudokuBoard('manual-board', true);

        this.setupEventListeners();
        this.setupThemeSystem();
        this.focusCenterCell();
    }

    setupEventListeners() {
        // Menu buttons
        document.getElementById('generate-puzzle-btn').addEventListener('click', () => {
            this.showDifficultySelector();
        });

        document.getElementById('manual-input-btn').addEventListener('click', () => {
            this.showManualInput();
        });

        // Difficulty selection
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('difficulty-btn')) {
                window.gameLogic.difficulty = e.target.dataset.difficulty;
                this.startNewGame();
            }
        });

        // Navigation
        document.getElementById('back-to-menu').addEventListener('click', () => {
            this.showMenu();
        });

        document.getElementById('back-from-manual').addEventListener('click', () => {
            this.showMenu();
        });

        // Manual input
        document.getElementById('clear-manual-btn').addEventListener('click', () => {
            window.boardRenderer.clearManualBoard();
            window.inputValidator.setValidationStatus('', '');
            document.getElementById('start-manual-game-btn').disabled = true;
        });

        document.getElementById('start-manual-game-btn').addEventListener('click', () => {
            this.startManualGame();
        });

        // Game controls
        document.getElementById('clear-cell-btn').addEventListener('click', () => {
            this.clearSelectedCell();
        });

        document.getElementById('new-game-btn').addEventListener('click', () => {
            this.showMenu();
        });

        document.getElementById('validate-btn').addEventListener('click', () => {
            this.validateBoard();
        });

        // Bot controls
        document.getElementById('bot-toggle').addEventListener('change', (e) => {
            window.botLogic.toggleBot(e.target.checked);
        });

        document.getElementById('get-hint-btn').addEventListener('click', () => {
            window.botLogic.getHint();
        });

        document.getElementById('check-mistakes-btn').addEventListener('click', () => {
            window.botLogic.checkMistakes();
        });

        document.getElementById('solve-step-btn').addEventListener('click', () => {
            window.botLogic.solveNextStep();
        });

        document.getElementById('solve-all-btn').addEventListener('click', () => {
            window.botLogic.solveEntireBoard();
        });

        // Modal controls
        document.getElementById('play-again-btn').addEventListener('click', () => {
            this.hideModal();
            this.startNewGame();
        });

        document.getElementById('menu-btn').addEventListener('click', () => {
            this.hideModal();
            this.showMenu();
        });

        document.getElementById('cancel-solve-btn').addEventListener('click', () => {
            window.botLogic.cancelSolve();
        });

        // Keyboard input
        document.addEventListener('keydown', (e) => {
            this.handleKeyInput(e);
        });

        // Click outside to close theme dropdown
        document.addEventListener('click', (e) => {
            const themeDropdown = document.getElementById('theme-dropdown');
            const themeToggleBtn = document.getElementById('theme-toggle-btn');
            
            if (!themeToggleBtn.contains(e.target) && !themeDropdown.contains(e.target)) {
                themeDropdown.classList.remove('active');
            }
        });
    }

    setupThemeSystem() {
        const themeToggleBtn = document.getElementById('theme-toggle-btn');
        const themeDropdown = document.getElementById('theme-dropdown');
        const themeOptions = document.querySelectorAll('.theme-option');

        // Toggle theme dropdown
        themeToggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            themeDropdown.classList.toggle('active');
        });

        // Theme selection
        themeOptions.forEach(option => {
            option.addEventListener('click', () => {
                const theme = option.dataset.theme;
                this.setTheme(theme);
                
                // Update active state
                themeOptions.forEach(opt => opt.classList.remove('active'));
                option.classList.add('active');
                
                // Close dropdown
                themeDropdown.classList.remove('active');
            });
        });

        // Load saved theme
        const savedTheme = localStorage.getItem('sudoku-theme') || 'dark-default';
        this.setTheme(savedTheme);
        
        // Update active theme option
        const activeOption = document.querySelector(`[data-theme="${savedTheme}"]`);
        if (activeOption) {
            themeOptions.forEach(opt => opt.classList.remove('active'));
            activeOption.classList.add('active');
        }
    }

    setTheme(theme) {
        // Remove all theme classes
        document.body.className = document.body.className.replace(/theme-\w+-\w+/g, '');
        
        // Add new theme class
        document.body.classList.add(`theme-${theme}`);
        
        // Save theme preference
        localStorage.setItem('sudoku-theme', theme);
    }

    focusCenterCell() {
        // Focus on center cell (4,4) when starting a game
        setTimeout(() => {
            const centerCell = document.querySelector('#sudoku-board .sudoku-cell[data-row="4"][data-col="4"]');
            if (centerCell) {
                const input = centerCell.querySelector('input');
                if (input && !input.readOnly) {
                    this.selectCell(4, 4);
                }
            }
        }, 100);
    }

    handleKeyInput(e) {
        const gameScreenActive = document.getElementById('game-screen').classList.contains('active');
        const manualScreenActive = document.getElementById('manual-input-screen').classList.contains('active');
        
        if (!gameScreenActive && !manualScreenActive) {
            return;
        }

        // Handle navigation keys for both screens
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd', 'W', 'A', 'S', 'D'].includes(e.key)) {
            e.preventDefault();
            this.moveSelection(e.key, manualScreenActive);
            return;
        }

        // Handle number input and deletion
        if (gameScreenActive && window.gameLogic.selectedCell) {
            const { row, col } = window.gameLogic.selectedCell;

            if (e.key >= '1' && e.key <= '9') {
                if (!window.gameLogic.givenCells.has(`${row}-${col}`)) {
                    const input = document.querySelector(`#sudoku-board .sudoku-cell[data-row="${row}"][data-col="${col}"] input`);
                    input.value = e.key;
                    window.gameLogic.currentBoard[row][col] = parseInt(e.key);
                    window.boardRenderer.highlightConflicts(row, col);
                    
                    if (window.gameLogic.isBoardComplete() && window.gameLogic.isBoardValid()) {
                        setTimeout(() => {
                            this.showSuccessModal();
                        }, 100);
                    }
                }
            } else if (e.key === 'Backspace' || e.key === 'Delete') {
                this.clearSelectedCell();
            }
        } else if (manualScreenActive) {
            const { row, col } = this.manualSelectedCell;

            if (e.key >= '1' && e.key <= '9') {
                const input = document.querySelector(`#manual-board .sudoku-cell[data-row="${row}"][data-col="${col}"] input`);
                if (input) {
                    input.value = e.key;
                    input.dispatchEvent(new Event('input')); // Trigger validation
                }
            } else if (e.key === 'Backspace' || e.key === 'Delete') {
                const input = document.querySelector(`#manual-board .sudoku-cell[data-row="${row}"][data-col="${col}"] input`);
                if (input) {
                    input.value = '';
                    input.dispatchEvent(new Event('input')); // Trigger validation
                }
            }
        }
    }

    moveSelection(key, isManualMode = false) {
        let currentSelection;
        
        if (isManualMode) {
            currentSelection = this.manualSelectedCell;
        } else if (window.gameLogic.selectedCell) {
            currentSelection = window.gameLogic.selectedCell;
        } else {
            return;
        }

        let { row, col } = currentSelection;

        switch (key.toLowerCase()) {
            case 'arrowup':
            case 'w':
                row = Math.max(0, row - 1);
                break;
            case 'arrowdown':
            case 's':
                row = Math.min(8, row + 1);
                break;
            case 'arrowleft':
            case 'a':
                col = Math.max(0, col - 1);
                break;
            case 'arrowright':
            case 'd':
                col = Math.min(8, col + 1);
                break;
        }

        if (isManualMode) {
            this.selectManualCell(row, col);
        } else {
            this.selectCell(row, col);
        }
    }

    selectCell(row, col) {
        window.gameLogic.selectedCell = window.boardRenderer.selectCell(row, col);
    }

    selectManualCell(row, col) {
        // Clear previous selection in manual board
        document.querySelectorAll('#manual-board .sudoku-cell').forEach(cell => {
            cell.classList.remove('selected');
        });

        // Select new cell in manual board
        const cell = document.querySelector(`#manual-board .sudoku-cell[data-row="${row}"][data-col="${col}"]`);
        if (cell) {
            cell.classList.add('selected');
            const input = cell.querySelector('input');
            if (input) {
                input.focus();
            }
            this.manualSelectedCell = { row, col };
        }
    }

    clearSelectedCell() {
        if (window.gameLogic.selectedCell) {
            const { row, col } = window.gameLogic.selectedCell;
            if (!window.gameLogic.givenCells.has(`${row}-${col}`)) {
                const input = document.querySelector(`#sudoku-board .sudoku-cell[data-row="${row}"][data-col="${col}"] input`);
                input.value = '';
                window.gameLogic.currentBoard[row][col] = 0;
                window.gameLogic.botEntries.delete(`${row}-${col}`);
                window.boardRenderer.clearHighlights();
            }
        }
    }

    // Screen Management
    showMenu() {
        this.hideAllScreens();
        document.getElementById('menu-screen').classList.add('active');
        document.getElementById('difficulty-selector').style.display = 'none';
        window.gameLogic.resetGameState();
    }

    showDifficultySelector() {
        document.getElementById('difficulty-selector').style.display = 'block';
    }

    showManualInput() {
        this.hideAllScreens();
        document.getElementById('manual-input-screen').classList.add('active');
        window.boardRenderer.clearManualBoard();
        window.inputValidator.setValidationStatus('', '');
        document.getElementById('start-manual-game-btn').disabled = true;
        
        // Set initial selection and focus for manual input
        setTimeout(() => {
            this.selectManualCell(4, 4);
        }, 100);
    }

    showGameScreen() {
        this.hideAllScreens();
        document.getElementById('game-screen').classList.add('active');
    }

    hideAllScreens() {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
    }

    // Game Logic
    startNewGame() {
        window.gameLogic.resetGameState();
        window.gameLogic.gameMode = 'generated';
        window.gameLogic.generatePuzzle();
        this.showGameScreen();
        window.gameLogic.updateGameInfo();
        window.gameLogic.startTimer();
        window.botLogic.resetBotPanel();
        this.focusCenterCell();
    }

    startManualGame() {
        if (!window.inputValidator.validateCompleteManualInput()) {
            this.showMessage('Please enter a valid puzzle with at least 17 clues.', 'error');
            return;
        }

        window.gameLogic.resetGameState();
        window.gameLogic.gameMode = 'manual';
        
        if (!window.gameLogic.loadManualPuzzle()) {
            this.showMessage('Unable to solve this puzzle. Please check your input.', 'error');
            return;
        }

        this.showGameScreen();
        window.gameLogic.updateGameInfo();
        window.gameLogic.startTimer();
        window.botLogic.resetBotPanel();
        this.focusCenterCell();
    }

    validateBoard() {
        const errors = window.inputValidator.findErrors();
        
        if (errors.length === 0) {
            if (window.gameLogic.isBoardComplete()) {
                this.showSuccessModal();
            } else {
                this.showMessage('No errors found! Keep going!', 'success');
            }
        } else {
            window.boardRenderer.showErrors(errors);
            this.showMessage(`Found ${errors.length} error(s). Check highlighted cells.`, 'error');
        }
    }

    // Modal
    showSuccessModal() {
        window.gameLogic.stopTimer();
        document.getElementById('final-time').textContent = document.getElementById('game-timer').textContent;
        const difficultyText = window.gameLogic.gameMode === 'manual' ? 'Custom' : 
                              window.gameLogic.difficulty.charAt(0).toUpperCase() + window.gameLogic.difficulty.slice(1);
        document.getElementById('final-difficulty').textContent = difficultyText;
        document.getElementById('success-modal').classList.add('active');
    }

    hideModal() {
        document.getElementById('success-modal').classList.remove('active');
        document.getElementById('solve-modal').classList.remove('active');
    }

    // Utility
    showMessage(message, type = 'info') {
        // Create a simple toast notification
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            top: 100px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--bg-secondary);
            color: var(--text-primary);
            padding: 12px 24px;
            border-radius: 8px;
            border: 1px solid var(--glass-border);
            backdrop-filter: blur(10px);
            z-index: 1000;
            animation: slideDown 0.3s ease-out;
            max-width: 90%;
            text-align: center;
        `;

        if (type === 'success') {
            toast.style.borderColor = 'var(--success)';
            toast.style.color = 'var(--success)';
        } else if (type === 'error') {
            toast.style.borderColor = 'var(--error)';
            toast.style.color = 'var(--error)';
        } else if (type === 'info') {
            toast.style.borderColor = 'var(--accent-primary)';
            toast.style.color = 'var(--accent-primary)';
        }

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.remove();
        }, 3000);
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new SudokuGame();
});
