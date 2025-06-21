// Game Logic and State Management
class GameLogic {
    constructor() {
        this.currentBoard = Array(9).fill(null).map(() => Array(9).fill(0));
        this.solutionBoard = Array(9).fill(null).map(() => Array(9).fill(0));
        this.givenCells = new Set();
        this.botEntries = new Set();
        this.selectedCell = null;
        this.gameMode = null;
        this.difficulty = 'medium';
        this.startTime = null;
        this.gameTimer = null;
    }

    resetGameState() {
        this.currentBoard = Array(9).fill(null).map(() => Array(9).fill(0));
        this.solutionBoard = Array(9).fill(null).map(() => Array(9).fill(0));
        this.givenCells.clear();
        this.botEntries.clear();
        this.selectedCell = null;
        this.stopTimer();
        window.boardRenderer.clearHighlights();
    }

    generatePuzzle() {
        // Generate a complete valid Sudoku solution
        this.solutionBoard = this.generateCompleteSudoku();
        
        // Create puzzle by removing numbers based on difficulty
        this.currentBoard = this.createPuzzle(this.solutionBoard, this.difficulty);
        
        // Track given cells
        this.givenCells.clear();
        this.botEntries.clear();
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (this.currentBoard[row][col] !== 0) {
                    this.givenCells.add(`${row}-${col}`);
                }
            }
        }

        window.boardRenderer.updateBoardDisplay(this.currentBoard, this.givenCells, this.botEntries);
    }

    generateCompleteSudoku() {
        const board = Array(9).fill(null).map(() => Array(9).fill(0));
        this.solveSudoku(board);
        return board;
    }

    createPuzzle(solution, difficulty) {
        const puzzle = solution.map(row => [...row]);
        const difficultyMap = {
            'easy': 35,
            'medium': 45,
            'hard': 55
        };

        const cellsToRemove = difficultyMap[difficulty];
        const positions = [];
        
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                positions.push([row, col]);
            }
        }

        // Shuffle positions
        for (let i = positions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [positions[i], positions[j]] = [positions[j], positions[i]];
        }

        // Remove numbers
        for (let i = 0; i < cellsToRemove && i < positions.length; i++) {
            const [row, col] = positions[i];
            puzzle[row][col] = 0;
        }

        return puzzle;
    }

    loadManualPuzzle() {
        const manualBoard = document.getElementById('manual-board');
        const inputs = manualBoard.querySelectorAll('input');
        
        this.currentBoard = Array(9).fill(null).map(() => Array(9).fill(0));
        this.givenCells.clear();
        this.botEntries.clear();

        inputs.forEach((input, index) => {
            const row = Math.floor(index / 9);
            const col = index % 9;
            const value = input.value.replace(/[^1-9]/g, '');
            
            if (value) {
                this.currentBoard[row][col] = parseInt(value);
                this.givenCells.add(`${row}-${col}`);
            }
        });

        // Generate solution for the manual puzzle
        this.solutionBoard = this.currentBoard.map(row => [...row]);
        if (!this.solveSudoku(this.solutionBoard)) {
            return false;
        }

        window.boardRenderer.updateBoardDisplay(this.currentBoard, this.givenCells, this.botEntries);
        return true;
    }

    // Advanced Sudoku Solver with Backtracking
    solveSudoku(board) {
        const emptyCell = this.findEmptyCell(board);
        if (!emptyCell) {
            return true; // Solved
        }

        const [row, col] = emptyCell;

        // Try numbers 1-9
        const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        this.shuffleArray(numbers); // Add randomness

        for (const num of numbers) {
            if (this.isValidMove(board, row, col, num)) {
                board[row][col] = num;

                if (this.solveSudoku(board)) {
                    return true;
                }

                board[row][col] = 0; // Backtrack
            }
        }

        return false;
    }

    findEmptyCell(board) {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (board[row][col] === 0) {
                    return [row, col];
                }
            }
        }
        return null;
    }

    isValidMove(board, row, col, num) {
        // Check row
        for (let c = 0; c < 9; c++) {
            if (board[row][c] === num) return false;
        }

        // Check column
        for (let r = 0; r < 9; r++) {
            if (board[r][col] === num) return false;
        }

        // Check 3x3 box
        const boxRow = Math.floor(row / 3) * 3;
        const boxCol = Math.floor(col / 3) * 3;

        for (let r = boxRow; r < boxRow + 3; r++) {
            for (let c = boxCol; c < boxCol + 3; c++) {
                if (board[r][c] === num) return false;
            }
        }

        return true;
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    isBoardComplete() {
        return this.currentBoard.every(row => row.every(cell => cell !== 0));
    }

    isBoardValid() {
        return window.inputValidator.findErrors().length === 0;
    }

    // Timer functions
    startTimer() {
        this.startTime = Date.now();
        this.gameTimer = setInterval(() => {
            this.updateTimer();
        }, 1000);
    }

    stopTimer() {
        if (this.gameTimer) {
            clearInterval(this.gameTimer);
            this.gameTimer = null;
        }
    }

    updateTimer() {
        if (!this.startTime) return;
        
        const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
        const minutes = Math.floor(elapsed / 60).toString().padStart(2, '0');
        const seconds = (elapsed % 60).toString().padStart(2, '0');
        
        document.getElementById('game-timer').textContent = `${minutes}:${seconds}`;
    }

    updateGameInfo() {
        const difficultyText = this.gameMode === 'manual' ? 'Custom' : 
                              this.difficulty.charAt(0).toUpperCase() + this.difficulty.slice(1);
        document.getElementById('game-difficulty').textContent = difficultyText;
    }
}