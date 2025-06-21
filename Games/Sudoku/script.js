// Advanced Sudoku Web App - Pure JavaScript Implementation
class SudokuGame {
    constructor() {
        this.currentBoard = Array(9).fill(null).map(() => Array(9).fill(0));
        this.solutionBoard = Array(9).fill(null).map(() => Array(9).fill(0));
        this.givenCells = new Set();
        this.selectedCell = null;
        this.gameMode = null;
        this.difficulty = 'medium';
        this.startTime = null;
        this.gameTimer = null;
        this.botEnabled = false;
        this.highlightedCells = new Set();
        this.solvingInProgress = false;
        this.solveSteps = [];
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupThemeToggle();
        this.createBoards();
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
                this.difficulty = e.target.dataset.difficulty;
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
            this.clearManualBoard();
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
            this.toggleBot(e.target.checked);
        });

        document.getElementById('get-hint-btn').addEventListener('click', () => {
            this.getHint();
        });

        document.getElementById('check-mistakes-btn').addEventListener('click', () => {
            this.checkMistakes();
        });

        document.getElementById('solve-step-btn').addEventListener('click', () => {
            this.solveNextStep();
        });

        document.getElementById('solve-all-btn').addEventListener('click', () => {
            this.solveEntireBoard();
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
            this.cancelSolve();
        });

        // Keyboard input
        document.addEventListener('keydown', (e) => {
            this.handleKeyInput(e);
        });
    }

    setupThemeToggle() {
        const themeSwitch = document.getElementById('theme-switch');
        themeSwitch.addEventListener('change', (e) => {
            document.body.classList.toggle('light-theme', e.target.checked);
            localStorage.setItem('theme', e.target.checked ? 'light' : 'dark');
        });

        // Load saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            themeSwitch.checked = true;
            document.body.classList.add('light-theme');
        }
    }

    createBoards() {
        this.createSudokuBoard('sudoku-board');
        this.createSudokuBoard('manual-board', true);
    }

    createSudokuBoard(containerId, isManual = false) {
        const container = document.getElementById(containerId);
        container.innerHTML = '';

        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                const cell = document.createElement('div');
                cell.className = 'sudoku-cell';
                cell.dataset.row = row;
                cell.dataset.col = col;

                const input = document.createElement('input');
                input.type = 'text';
                input.maxLength = 1;
                input.addEventListener('input', (e) => {
                    this.handleCellInput(e, row, col, isManual);
                });
                input.addEventListener('click', () => {
                    this.selectCell(row, col);
                });

                cell.appendChild(input);
                container.appendChild(cell);

                // Add visual separators for 3x3 boxes
                if ((row + 1) % 3 === 0 && row < 8) {
                    cell.style.borderBottom = '3px solid var(--border)';
                }
                if ((col + 1) % 3 === 0 && col < 8) {
                    cell.style.borderRight = '3px solid var(--border)';
                }
            }
        }
    }

    handleCellInput(e, row, col, isManual = false) {
        const value = e.target.value.replace(/[^1-9]/g, '');
        e.target.value = value;

        if (isManual) {
            this.validateManualInputRealTime();
            return;
        }

        if (this.givenCells.has(`${row}-${col}`)) {
            e.target.value = this.currentBoard[row][col] || '';
            return;
        }

        this.currentBoard[row][col] = value ? parseInt(value) : 0;
        this.selectCell(row, col);
        this.clearHighlights();

        // Real-time validation for conflicts
        this.highlightConflicts(row, col);

        if (this.isBoardComplete()) {
            setTimeout(() => {
                if (this.isBoardValid()) {
                    this.showSuccessModal();
                }
            }, 100);
        }
    }

    highlightConflicts(row, col) {
        const value = this.currentBoard[row][col];
        if (!value) return;

        const conflicts = this.findConflictsForCell(row, col, value);
        
        // Clear previous conflict highlights
        document.querySelectorAll('.sudoku-cell').forEach(cell => {
            cell.classList.remove('conflict');
        });

        // Highlight conflicts
        conflicts.forEach(({ r, c }) => {
            const cell = document.querySelector(`#sudoku-board .sudoku-cell[data-row="${r}"][data-col="${c}"]`);
            if (cell) {
                cell.classList.add('conflict');
            }
        });

        // Auto-clear conflicts after 3 seconds
        setTimeout(() => {
            document.querySelectorAll('.sudoku-cell').forEach(cell => {
                cell.classList.remove('conflict');
            });
        }, 3000);
    }

    findConflictsForCell(targetRow, targetCol, value) {
        const conflicts = [];

        // Check row conflicts
        for (let c = 0; c < 9; c++) {
            if (c !== targetCol && this.currentBoard[targetRow][c] === value) {
                conflicts.push({ r: targetRow, c });
            }
        }

        // Check column conflicts
        for (let r = 0; r < 9; r++) {
            if (r !== targetRow && this.currentBoard[r][targetCol] === value) {
                conflicts.push({ r, c: targetCol });
            }
        }

        // Check 3x3 box conflicts
        const boxRow = Math.floor(targetRow / 3) * 3;
        const boxCol = Math.floor(targetCol / 3) * 3;

        for (let r = boxRow; r < boxRow + 3; r++) {
            for (let c = boxCol; c < boxCol + 3; c++) {
                if ((r !== targetRow || c !== targetCol) && this.currentBoard[r][c] === value) {
                    conflicts.push({ r, c });
                }
            }
        }

        return conflicts;
    }

    validateManualInputRealTime() {
        const manualBoard = document.getElementById('manual-board');
        const inputs = manualBoard.querySelectorAll('input');
        const statusDiv = document.getElementById('validation-status');
        const startButton = document.getElementById('start-manual-game-btn');
        
        let clueCount = 0;
        const tempBoard = Array(9).fill(null).map(() => Array(9).fill(0));
        const conflicts = [];

        // Clear previous conflict highlights
        inputs.forEach(input => {
            input.parentElement.classList.remove('conflict');
        });

        // Build temporary board and count clues
        inputs.forEach((input, index) => {
            const row = Math.floor(index / 9);
            const col = index % 9;
            const value = input.value.replace(/[^1-9]/g, '');
            
            if (value) {
                clueCount++;
                tempBoard[row][col] = parseInt(value);
            }
        });

        // Check for conflicts
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                const value = tempBoard[row][col];
                if (value !== 0) {
                    const cellConflicts = this.findConflictsForCell(row, col, value);
                    if (cellConflicts.length > 0) {
                        conflicts.push({ row, col, conflicts: cellConflicts });
                        // Highlight the conflicting cell
                        const cellIndex = row * 9 + col;
                        inputs[cellIndex].parentElement.classList.add('conflict');
                        
                        // Highlight conflicting cells
                        cellConflicts.forEach(({ r, c }) => {
                            const conflictIndex = r * 9 + c;
                            inputs[conflictIndex].parentElement.classList.add('conflict');
                        });
                    }
                }
            }
        }

        // Update status and button
        if (conflicts.length > 0) {
            statusDiv.className = 'validation-status invalid';
            statusDiv.innerHTML = `❌ Found ${conflicts.length} conflict(s). Numbers cannot repeat in the same row, column, or 3×3 box.`;
            startButton.disabled = true;
        } else if (clueCount < 17) {
            statusDiv.className = 'validation-status warning';
            statusDiv.innerHTML = `⚠️ Need at least 17 clues for a valid Sudoku puzzle. Current: ${clueCount}`;
            startButton.disabled = true;
        } else if (clueCount >= 17) {
            // Check if puzzle is solvable
            const testBoard = tempBoard.map(row => [...row]);
            if (this.solveSudoku(testBoard)) {
                statusDiv.className = 'validation-status valid';
                statusDiv.innerHTML = `✅ Valid puzzle with ${clueCount} clues. Ready to start!`;
                startButton.disabled = false;
            } else {
                statusDiv.className = 'validation-status invalid';
                statusDiv.innerHTML = `❌ This puzzle has no solution. Please check your input.`;
                startButton.disabled = true;
            }
        }
    }

    selectCell(row, col) {
        // Clear previous selection
        document.querySelectorAll('.sudoku-cell').forEach(cell => {
            cell.classList.remove('selected');
        });

        // Select new cell
        const cell = document.querySelector(`#sudoku-board .sudoku-cell[data-row="${row}"][data-col="${col}"]`);
        if (cell) {
            cell.classList.add('selected');
            this.selectedCell = { row, col };
        }
    }

    handleKeyInput(e) {
        if (!this.selectedCell || document.getElementById('game-screen').style.display === 'none') {
            return;
        }

        const { row, col } = this.selectedCell;

        if (e.key >= '1' && e.key <= '9') {
            if (!this.givenCells.has(`${row}-${col}`)) {
                const input = document.querySelector(`#sudoku-board .sudoku-cell[data-row="${row}"][data-col="${col}"] input`);
                input.value = e.key;
                this.currentBoard[row][col] = parseInt(e.key);
                this.highlightConflicts(row, col);
            }
        } else if (e.key === 'Backspace' || e.key === 'Delete') {
            this.clearSelectedCell();
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            e.preventDefault();
            this.moveSelection(e.key);
        }
    }

    moveSelection(key) {
        if (!this.selectedCell) return;

        let { row, col } = this.selectedCell;

        switch (key) {
            case 'ArrowUp':
                row = Math.max(0, row - 1);
                break;
            case 'ArrowDown':
                row = Math.min(8, row + 1);
                break;
            case 'ArrowLeft':
                col = Math.max(0, col - 1);
                break;
            case 'ArrowRight':
                col = Math.min(8, col + 1);
                break;
        }

        this.selectCell(row, col);
    }

    // Screen Management
    showMenu() {
        this.hideAllScreens();
        document.getElementById('menu-screen').classList.add('active');
        document.getElementById('difficulty-selector').style.display = 'none';
        this.stopTimer();
        this.clearHighlights();
    }

    showDifficultySelector() {
        document.getElementById('difficulty-selector').style.display = 'block';
    }

    showManualInput() {
        this.hideAllScreens();
        document.getElementById('manual-input-screen').classList.add('active');
        this.clearManualBoard();
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
        this.gameMode = 'generated';
        this.generatePuzzle();
        this.showGameScreen();
        this.updateGameInfo();
        this.startTimer();
        this.resetBotPanel();
        this.clearHighlights();
    }

    startManualGame() {
        if (!this.validateManualInput()) {
            this.showMessage('Please enter a valid puzzle with at least 17 clues.', 'error');
            return;
        }

        this.gameMode = 'manual';
        this.loadManualPuzzle();
        this.showGameScreen();
        this.updateGameInfo();
        this.startTimer();
        this.resetBotPanel();
        this.clearHighlights();
    }

    validateManualInput() {
        const manualBoard = document.getElementById('manual-board');
        const inputs = manualBoard.querySelectorAll('input');
        let clueCount = 0;
        const tempBoard = Array(9).fill(null).map(() => Array(9).fill(0));

        // Check for valid input and count clues
        inputs.forEach((input, index) => {
            const row = Math.floor(index / 9);
            const col = index % 9;
            const value = input.value.replace(/[^1-9]/g, '');
            
            if (value) {
                clueCount++;
                tempBoard[row][col] = parseInt(value);
            }
        });

        // Need at least 17 clues for a valid Sudoku
        if (clueCount < 17) {
            return false;
        }

        // Check for conflicts in the input
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                const value = tempBoard[row][col];
                if (value !== 0) {
                    const conflicts = this.findConflictsForCell(row, col, value);
                    if (conflicts.length > 0) {
                        return false;
                    }
                }
            }
        }

        // Check if solvable
        const testBoard = tempBoard.map(row => [...row]);
        return this.solveSudoku(testBoard);
    }

    generatePuzzle() {
        // Generate a complete valid Sudoku solution
        this.solutionBoard = this.generateCompleteSudoku();
        
        // Create puzzle by removing numbers based on difficulty
        this.currentBoard = this.createPuzzle(this.solutionBoard, this.difficulty);
        
        // Track given cells
        this.givenCells.clear();
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (this.currentBoard[row][col] !== 0) {
                    this.givenCells.add(`${row}-${col}`);
                }
            }
        }

        this.updateBoardDisplay();
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
            this.showMessage('Unable to solve this puzzle. Please check your input.', 'error');
            return false;
        }

        this.updateBoardDisplay();
        return true;
    }

    updateBoardDisplay() {
        const board = document.getElementById('sudoku-board');
        const cells = board.querySelectorAll('.sudoku-cell');

        cells.forEach((cell, index) => {
            const row = Math.floor(index / 9);
            const col = index % 9;
            const input = cell.querySelector('input');
            const value = this.currentBoard[row][col];

            input.value = value || '';
            
            // Reset classes
            cell.className = 'sudoku-cell';
            
            // Add appropriate classes
            if (this.givenCells.has(`${row}-${col}`)) {
                cell.classList.add('given');
                input.readOnly = true;
            } else {
                input.readOnly = false;
            }
        });
    }

    clearManualBoard() {
        const inputs = document.querySelectorAll('#manual-board input');
        inputs.forEach(input => {
            input.value = '';
            input.parentElement.classList.remove('conflict');
        });
        
        // Reset validation status
        const statusDiv = document.getElementById('validation-status');
        statusDiv.className = 'validation-status';
        statusDiv.innerHTML = '';
        
        const startButton = document.getElementById('start-manual-game-btn');
        startButton.disabled = true;
    }

    clearSelectedCell() {
        if (this.selectedCell) {
            const { row, col } = this.selectedCell;
            if (!this.givenCells.has(`${row}-${col}`)) {
                const input = document.querySelector(`#sudoku-board .sudoku-cell[data-row="${row}"][data-col="${col}"] input`);
                input.value = '';
                this.currentBoard[row][col] = 0;
                this.clearHighlights();
            }
        }
    }

    clearHighlights() {
        this.highlightedCells.clear();
        document.querySelectorAll('.sudoku-cell').forEach(cell => {
            cell.classList.remove('highlighted', 'conflict');
        });
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

    solveSudokuWithSteps(board) {
        const steps = [];
        const solve = (currentBoard) => {
            const emptyCell = this.findEmptyCell(currentBoard);
            if (!emptyCell) {
                return true; // Solved
            }

            const [row, col] = emptyCell;

            for (let num = 1; num <= 9; num++) {
                if (this.isValidMove(currentBoard, row, col, num)) {
                    currentBoard[row][col] = num;
                    steps.push({
                        row,
                        col,
                        value: num,
                        reason: this.getStepReason(currentBoard, row, col, num)
                    });

                    if (solve(currentBoard)) {
                        return true;
                    }

                    currentBoard[row][col] = 0; // Backtrack
                    steps.push({
                        row,
                        col,
                        value: 0,
                        reason: `Backtracking: ${num} at (${row + 1}, ${col + 1}) led to no solution`
                    });
                }
            }

            return false;
        };

        const success = solve(board);
        return { success, steps };
    }

    getStepReason(board, row, col, num) {
        // Check if this is the only possible number for this cell
        const possibleNumbers = [];
        for (let n = 1; n <= 9; n++) {
            if (this.isValidMove(board, row, col, n)) {
                possibleNumbers.push(n);
            }
        }

        if (possibleNumbers.length === 1) {
            return `Only possible number for this cell`;
        }

        // Check if this number can only go in this cell in the row
        let possibleInRow = 0;
        for (let c = 0; c < 9; c++) {
            if (board[row][c] === 0 && this.isValidMove(board, row, c, num)) {
                possibleInRow++;
            }
        }
        if (possibleInRow === 1) {
            return `${num} can only go here in this row`;
        }

        // Check if this number can only go in this cell in the column
        let possibleInCol = 0;
        for (let r = 0; r < 9; r++) {
            if (board[r][col] === 0 && this.isValidMove(board, r, col, num)) {
                possibleInCol++;
            }
        }
        if (possibleInCol === 1) {
            return `${num} can only go here in this column`;
        }

        // Check if this number can only go in this cell in the 3x3 box
        const boxRow = Math.floor(row / 3) * 3;
        const boxCol = Math.floor(col / 3) * 3;
        let possibleInBox = 0;
        for (let r = boxRow; r < boxRow + 3; r++) {
            for (let c = boxCol; c < boxCol + 3; c++) {
                if (board[r][c] === 0 && this.isValidMove(board, r, c, num)) {
                    possibleInBox++;
                }
            }
        }
        if (possibleInBox === 1) {
            return `${num} can only go here in this 3×3 box`;
        }

        return `Strategic placement based on elimination`;
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

    // Validation
    validateBoard() {
        const errors = this.findErrors();
        
        // Clear previous error styling
        document.querySelectorAll('.sudoku-cell').forEach(cell => {
            cell.classList.remove('error');
        });

        if (errors.length === 0) {
            if (this.isBoardComplete()) {
                this.showSuccessModal();
            } else {
                this.showMessage('No errors found! Keep going!', 'success');
            }
        } else {
            errors.forEach(({ row, col }) => {
                const cell = document.querySelector(`#sudoku-board .sudoku-cell[data-row="${row}"][data-col="${col}"]`);
                cell.classList.add('error');
            });
            this.showMessage(`Found ${errors.length} error(s). Check highlighted cells.`, 'error');
        }
    }

    findErrors() {
        const errors = [];

        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                const value = this.currentBoard[row][col];
                if (value !== 0) {
                    const conflicts = this.findConflictsForCell(row, col, value);
                    if (conflicts.length > 0) {
                        errors.push({ row, col });
                    }
                }
            }
        }

        return errors;
    }

    isBoardComplete() {
        return this.currentBoard.every(row => row.every(cell => cell !== 0));
    }

    isBoardValid() {
        return this.findErrors().length === 0;
    }

    // Enhanced Bot Functionality
    toggleBot(enabled) {
        this.botEnabled = enabled;
        const botPanel = document.getElementById('bot-panel');
        
        if (enabled) {
            botPanel.classList.add('active');
        } else {
            botPanel.classList.remove('active');
            this.clearHighlights();
        }
    }

    resetBotPanel() {
        const botSuggestion = document.getElementById('bot-suggestion');
        botSuggestion.innerHTML = `
            <div class="bot-welcome">
                <p>👋 Hello! I'm your Sudoku assistant.</p>
                <p>Click the buttons below when you need help!</p>
            </div>
        `;
        document.getElementById('bot-status').textContent = 'Ready to help!';
        this.clearHighlights();
    }

    updateBotSuggestion(message) {
        if (!this.botEnabled) return;

        document.getElementById('bot-suggestion').innerHTML = message;
        document.getElementById('bot-status').textContent = 'Analyzing...';
        
        setTimeout(() => {
            document.getElementById('bot-status').textContent = 'Ready to help!';
        }, 1000);
    }

    findLogicalMove() {
        // Try to find a cell where only one number is possible
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (this.currentBoard[row][col] === 0) {
                    const possibleNumbers = [];
                    
                    for (let num = 1; num <= 9; num++) {
                        if (this.isValidMove(this.currentBoard, row, col, num)) {
                            possibleNumbers.push(num);
                        }
                    }
                    
                    if (possibleNumbers.length === 1) {
                        return {
                            row,
                            col,
                            value: possibleNumbers[0],
                            reason: 'Only one number can fit in this cell',
                            type: 'logical'
                        };
                    }
                }
            }
        }

        // Try to find a number that can only go in one place in a row/column/box
        for (let num = 1; num <= 9; num++) {
            // Check rows
            for (let row = 0; row < 9; row++) {
                const possibleCols = [];
                for (let col = 0; col < 9; col++) {
                    if (this.currentBoard[row][col] === 0 && this.isValidMove(this.currentBoard, row, col, num)) {
                        possibleCols.push(col);
                    }
                }
                if (possibleCols.length === 1) {
                    return {
                        row,
                        col: possibleCols[0],
                        value: num,
                        reason: `${num} can only go in one place in this row`,
                        type: 'logical'
                    };
                }
            }

            // Check columns
            for (let col = 0; col < 9; col++) {
                const possibleRows = [];
                for (let row = 0; row < 9; row++) {
                    if (this.currentBoard[row][col] === 0 && this.isValidMove(this.currentBoard, row, col, num)) {
                        possibleRows.push(row);
                    }
                }
                if (possibleRows.length === 1) {
                    return {
                        row: possibleRows[0],
                        col,
                        value: num,
                        reason: `${num} can only go in one place in this column`,
                        type: 'logical'
                    };
                }
            }

            // Check 3x3 boxes
            for (let boxRow = 0; boxRow < 3; boxRow++) {
                for (let boxCol = 0; boxCol < 3; boxCol++) {
                    const possibleCells = [];
                    for (let r = boxRow * 3; r < (boxRow + 1) * 3; r++) {
                        for (let c = boxCol * 3; c < (boxCol + 1) * 3; c++) {
                            if (this.currentBoard[r][c] === 0 && this.isValidMove(this.currentBoard, r, c, num)) {
                                possibleCells.push({ row: r, col: c });
                            }
                        }
                    }
                    if (possibleCells.length === 1) {
                        return {
                            row: possibleCells[0].row,
                            col: possibleCells[0].col,
                            value: num,
                            reason: `${num} can only go in one place in this 3×3 box`,
                            type: 'logical'
                        };
                    }
                }
            }
        }

        return null;
    }

    highlightCells(cells, className = 'highlighted') {
        this.clearHighlights();
        cells.forEach(({ row, col }) => {
            const cell = document.querySelector(`#sudoku-board .sudoku-cell[data-row="${row}"][data-col="${col}"]`);
            if (cell) {
                cell.classList.add(className);
                this.highlightedCells.add(`${row}-${col}`);
            }
        });
    }

    getHint() {
        const logicalMove = this.findLogicalMove();
        if (logicalMove) {
            const { row, col, value, reason } = logicalMove;
            
            // Highlight the target cell
            this.highlightCells([{ row, col }]);
            
            this.updateBotSuggestion(`
                <strong>💡 Hint Found!</strong><br>
                Try placing <strong>${value}</strong> at row ${row + 1}, column ${col + 1}<br>
                <em>Reason: ${reason}</em><br><br>
                <small>The highlighted cell shows where to place the number.</small>
            `);
        } else {
            this.updateBotSuggestion(`
                <strong>🤔 No Obvious Moves</strong><br>
                Try analyzing the board more carefully. Look for cells with fewer possibilities or use the "Next Step" button for a guided move.
            `);
        }
    }

    checkMistakes() {
        const errors = this.findErrors();
        
        // Clear previous error styling
        document.querySelectorAll('.sudoku-cell').forEach(cell => {
            cell.classList.remove('error');
        });

        if (errors.length === 0) {
            this.updateBotSuggestion(`
                <strong>✅ No Mistakes Found!</strong><br>
                Your current entries are all valid. Keep going!
            `);
        } else {
            errors.forEach(({ row, col }) => {
                const cell = document.querySelector(`#sudoku-board .sudoku-cell[data-row="${row}"][data-col="${col}"]`);
                cell.classList.add('error');
            });
            this.updateBotSuggestion(`
                <strong>⚠️ Found ${errors.length} Mistake(s)</strong><br>
                The highlighted cells conflict with Sudoku rules. Numbers cannot repeat in the same row, column, or 3×3 box.
            `);
        }
        
        setTimeout(() => {
            document.querySelectorAll('.sudoku-cell').forEach(cell => {
                cell.classList.remove('error');
            });
        }, 5000);
    }

    solveNextStep() {
        const logicalMove = this.findLogicalMove();
        if (logicalMove) {
            const { row, col, value, reason } = logicalMove;
            const cell = document.querySelector(`#sudoku-board .sudoku-cell[data-row="${row}"][data-col="${col}"]`);
            const input = cell.querySelector('input');
            
            input.value = value;
            this.currentBoard[row][col] = value;
            cell.classList.add('hint');
            
            setTimeout(() => {
                cell.classList.remove('hint');
            }, 2000);
            
            this.updateBotSuggestion(`
                <strong>⚡ Step Completed!</strong><br>
                Placed <strong>${value}</strong> at row ${row + 1}, column ${col + 1}<br>
                <em>Reason: ${reason}</em>
            `);

            if (this.isBoardComplete() && this.isBoardValid()) {
                setTimeout(() => {
                    this.showSuccessModal();
                }, 1000);
            }
        } else {
            // Use backtracking to find the next valid move
            const testBoard = this.currentBoard.map(row => [...row]);
            const { success, steps } = this.solveSudokuWithSteps(testBoard);
            
            if (success && steps.length > 0) {
                const firstStep = steps[0];
                if (firstStep.value !== 0) {
                    const { row, col, value, reason } = firstStep;
                    const cell = document.querySelector(`#sudoku-board .sudoku-cell[data-row="${row}"][data-col="${col}"]`);
                    const input = cell.querySelector('input');
                    
                    input.value = value;
                    this.currentBoard[row][col] = value;
                    cell.classList.add('hint');
                    
                    setTimeout(() => {
                        cell.classList.remove('hint');
                    }, 2000);
                    
                    this.updateBotSuggestion(`
                        <strong>🎯 Strategic Move</strong><br>
                        Placed <strong>${value}</strong> at row ${row + 1}, column ${col + 1}<br>
                        <em>Reason: ${reason}</em>
                    `);
                }
            } else {
                this.updateBotSuggestion(`
                    <strong>🚫 No Solution Found</strong><br>
                    The current board state may have errors. Try checking for mistakes first.
                `);
            }
        }
    }

    async solveEntireBoard() {
        if (this.solvingInProgress) return;
        
        this.solvingInProgress = true;
        this.showSolveModal();
        
        const testBoard = this.currentBoard.map(row => [...row]);
        const { success, steps } = this.solveSudokuWithSteps(testBoard);
        
        if (!success) {
            this.hideSolveModal();
            this.updateBotSuggestion(`
                <strong>🚫 Cannot Solve</strong><br>
                The current board state has no solution. Please check for errors.
            `);
            this.solvingInProgress = false;
            return;
        }

        // Filter out backtracking steps for display
        const validSteps = steps.filter(step => step.value !== 0);
        
        document.getElementById('solve-progress').textContent = `Found solution with ${validSteps.length} steps. Applying...`;
        
        // Apply steps with animation
        for (let i = 0; i < validSteps.length; i++) {
            if (!this.solvingInProgress) break; // Check if cancelled
            
            const step = validSteps[i];
            const { row, col, value } = step;
            
            // Skip if cell is already filled (given cell)
            if (this.currentBoard[row][col] !== 0) continue;
            
            const cell = document.querySelector(`#sudoku-board .sudoku-cell[data-row="${row}"][data-col="${col}"]`);
            const input = cell.querySelector('input');
            
            input.value = value;
            this.currentBoard[row][col] = value;
            cell.classList.add('hint');
            
            document.getElementById('solve-progress').textContent = 
                `Step ${i + 1}/${validSteps.length}: Placed ${value} at (${row + 1}, ${col + 1})`;
            
            // Wait for animation
            await new Promise(resolve => setTimeout(resolve, 200));
            
            cell.classList.remove('hint');
        }
        
        this.hideSolveModal();
        this.solvingInProgress = false;
        
        if (this.isBoardComplete() && this.isBoardValid()) {
            this.updateBotSuggestion(`
                <strong>🎉 Puzzle Solved!</strong><br>
                The entire board has been completed successfully using logical deduction and backtracking.
            `);
            
            setTimeout(() => {
                this.showSuccessModal();
            }, 1000);
        }
    }

    showSolveModal() {
        document.getElementById('solve-modal').classList.add('active');
    }

    hideSolveModal() {
        document.getElementById('solve-modal').classList.remove('active');
    }

    cancelSolve() {
        this.solvingInProgress = false;
        this.hideSolveModal();
        this.updateBotSuggestion(`
            <strong>🛑 Solve Cancelled</strong><br>
            The automatic solving process has been stopped.
        `);
    }

    // Timer
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

    // Modal
    showSuccessModal() {
        this.stopTimer();
        document.getElementById('final-time').textContent = document.getElementById('game-timer').textContent;
        const difficultyText = this.gameMode === 'manual' ? 'Custom' : 
                              this.difficulty.charAt(0).toUpperCase() + this.difficulty.slice(1);
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