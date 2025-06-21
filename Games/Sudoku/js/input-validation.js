// Input Validation
class InputValidator {
    constructor() {
        this.validationStatusElement = document.getElementById('validation-status');
        this.startButtonElement = document.getElementById('start-manual-game-btn');
    }

    validateManualInputRealTime() {
        const manualBoard = document.getElementById('manual-board');
        const inputs = manualBoard.querySelectorAll('input');
        
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
                    const cellConflicts = this.findConflictsForCell(row, col, value, tempBoard);
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
            this.setValidationStatus('invalid', `❌ Found ${conflicts.length} conflict(s). Numbers cannot repeat in the same row, column, or 3×3 box.`);
            this.startButtonElement.disabled = true;
        } else if (clueCount < 17) {
            this.setValidationStatus('warning', `⚠️ Need at least 17 clues for a valid Sudoku puzzle. Current: ${clueCount}`);
            this.startButtonElement.disabled = true;
        } else if (clueCount >= 17) {
            // Check if puzzle is solvable
            const testBoard = tempBoard.map(row => [...row]);
            if (window.gameLogic.solveSudoku(testBoard)) {
                this.setValidationStatus('valid', `✅ Valid puzzle with ${clueCount} clues. Ready to start!`);
                this.startButtonElement.disabled = false;
            } else {
                this.setValidationStatus('invalid', `❌ This puzzle has no solution. Please check your input.`);
                this.startButtonElement.disabled = true;
            }
        }
    }

    setValidationStatus(type, message) {
        this.validationStatusElement.className = `validation-status ${type}`;
        this.validationStatusElement.innerHTML = message;
    }

    findConflictsForCell(targetRow, targetCol, value, board = null) {
        const currentBoard = board || window.gameInstance.currentBoard;
        const conflicts = [];

        // Check row conflicts
        for (let c = 0; c < 9; c++) {
            if (c !== targetCol && currentBoard[targetRow][c] === value) {
                conflicts.push({ r: targetRow, c });
            }
        }

        // Check column conflicts
        for (let r = 0; r < 9; r++) {
            if (r !== targetRow && currentBoard[r][targetCol] === value) {
                conflicts.push({ r, c: targetCol });
            }
        }

        // Check 3x3 box conflicts
        const boxRow = Math.floor(targetRow / 3) * 3;
        const boxCol = Math.floor(targetCol / 3) * 3;

        for (let r = boxRow; r < boxRow + 3; r++) {
            for (let c = boxCol; c < boxCol + 3; c++) {
                if ((r !== targetRow || c !== targetCol) && currentBoard[r][c] === value) {
                    conflicts.push({ r, c });
                }
            }
        }

        return conflicts;
    }

    findErrors() {
        const errors = [];

        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                const value = window.gameInstance.currentBoard[row][col];
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

    validateCompleteManualInput() {
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
                    const conflicts = this.findConflictsForCell(row, col, value, tempBoard);
                    if (conflicts.length > 0) {
                        return false;
                    }
                }
            }
        }

        // Check if solvable
        const testBoard = tempBoard.map(row => [...row]);
        return window.gameLogic.solveSudoku(testBoard);
    }
}