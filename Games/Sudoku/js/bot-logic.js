// Bot Logic and AI Assistance
class BotLogic {
    constructor() {
        this.botEnabled = false;
        this.solvingInProgress = false;
    }

    toggleBot(enabled) {
        this.botEnabled = enabled;
        const botPanel = document.getElementById('bot-panel');
        
        if (enabled) {
            botPanel.classList.add('active');
        } else {
            botPanel.classList.remove('active');
            window.boardRenderer.clearHighlights();
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
        window.boardRenderer.clearHighlights();
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
                if (window.gameLogic.currentBoard[row][col] === 0) {
                    const possibleNumbers = [];
                    
                    for (let num = 1; num <= 9; num++) {
                        if (window.gameLogic.isValidMove(window.gameLogic.currentBoard, row, col, num)) {
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
                    if (window.gameLogic.currentBoard[row][col] === 0 && 
                        window.gameLogic.isValidMove(window.gameLogic.currentBoard, row, col, num)) {
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
                    if (window.gameLogic.currentBoard[row][col] === 0 && 
                        window.gameLogic.isValidMove(window.gameLogic.currentBoard, row, col, num)) {
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
                            if (window.gameLogic.currentBoard[r][c] === 0 && 
                                window.gameLogic.isValidMove(window.gameLogic.currentBoard, r, c, num)) {
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

    getHint() {
        const logicalMove = this.findLogicalMove();
        if (logicalMove) {
            const { row, col, value, reason } = logicalMove;
            
            // Highlight the target cell
            window.boardRenderer.highlightCells([{ row, col }]);
            
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
        const errors = window.inputValidator.findErrors();
        
        if (errors.length === 0) {
            this.updateBotSuggestion(`
                <strong>✅ No Mistakes Found!</strong><br>
                Your current entries are all valid. Keep going!
            `);
        } else {
            window.boardRenderer.showErrors(errors);
            this.updateBotSuggestion(`
                <strong>⚠️ Found ${errors.length} Mistake(s)</strong><br>
                The highlighted cells conflict with Sudoku rules. Numbers cannot repeat in the same row, column, or 3×3 box.
            `);
        }
    }

    solveNextStep() {
        const logicalMove = this.findLogicalMove();
        if (logicalMove) {
            const { row, col, value, reason } = logicalMove;
            const cell = document.querySelector(`#sudoku-board .sudoku-cell[data-row="${row}"][data-col="${col}"]`);
            const input = cell.querySelector('input');
            
            input.value = value;
            window.gameLogic.currentBoard[row][col] = value;
            window.gameLogic.botEntries.add(`${row}-${col}`);
            
            window.boardRenderer.animateHint(row, col);
            
            this.updateBotSuggestion(`
                <strong>⚡ Step Completed!</strong><br>
                Placed <strong>${value}</strong> at row ${row + 1}, column ${col + 1}<br>
                <em>Reason: ${reason}</em>
            `);

            if (window.gameLogic.isBoardComplete() && window.gameLogic.isBoardValid()) {
                setTimeout(() => {
                    window.gameInstance.showSuccessModal();
                }, 1000);
            }
        } else {
            // Use backtracking to find the next valid move
            const testBoard = window.gameLogic.currentBoard.map(row => [...row]);
            const emptyCell = window.gameLogic.findEmptyCell(testBoard);
            
            if (emptyCell) {
                const [row, col] = emptyCell;
                
                // Try to find a valid number for this cell
                for (let num = 1; num <= 9; num++) {
                    if (window.gameLogic.isValidMove(testBoard, row, col, num)) {
                        const cell = document.querySelector(`#sudoku-board .sudoku-cell[data-row="${row}"][data-col="${col}"]`);
                        const input = cell.querySelector('input');
                        
                        input.value = num;
                        window.gameLogic.currentBoard[row][col] = num;
                        window.gameLogic.botEntries.add(`${row}-${col}`);
                        
                        window.boardRenderer.animateHint(row, col);
                        
                        this.updateBotSuggestion(`
                            <strong>🎯 Strategic Move</strong><br>
                            Placed <strong>${num}</strong> at row ${row + 1}, column ${col + 1}<br>
                            <em>Reason: Strategic placement based on elimination</em>
                        `);
                        break;
                    }
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
        
        const testBoard = window.gameLogic.currentBoard.map(row => [...row]);
        const success = window.gameLogic.solveSudoku(testBoard);
        
        if (!success) {
            this.hideSolveModal();
            this.updateBotSuggestion(`
                <strong>🚫 Cannot Solve</strong><br>
                The current board state has no solution. Please check for errors.
            `);
            this.solvingInProgress = false;
            return;
        }

        // Find all empty cells that need to be filled
        const cellsToFill = [];
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (window.gameLogic.currentBoard[row][col] === 0) {
                    cellsToFill.push({
                        row,
                        col,
                        value: testBoard[row][col]
                    });
                }
            }
        }
        
        document.getElementById('solve-progress').textContent = `Found solution. Applying ${cellsToFill.length} moves...`;
        
        // Apply moves with animation
        for (let i = 0; i < cellsToFill.length; i++) {
            if (!this.solvingInProgress) break; // Check if cancelled
            
            const { row, col, value } = cellsToFill[i];
            
            const cell = document.querySelector(`#sudoku-board .sudoku-cell[data-row="${row}"][data-col="${col}"]`);
            const input = cell.querySelector('input');
            
            input.value = value;
            window.gameLogic.currentBoard[row][col] = value;
            window.gameLogic.botEntries.add(`${row}-${col}`);
            
            window.boardRenderer.animateHint(row, col);
            
            document.getElementById('solve-progress').textContent = 
                `Step ${i + 1}/${cellsToFill.length}: Placed ${value} at (${row + 1}, ${col + 1})`;
            
            // Wait for animation
            await new Promise(resolve => setTimeout(resolve, 200));
        }
        
        this.hideSolveModal();
        this.solvingInProgress = false;
        
        if (window.gameLogic.isBoardComplete() && window.gameLogic.isBoardValid()) {
            this.updateBotSuggestion(`
                <strong>🎉 Puzzle Solved!</strong><br>
                The entire board has been completed successfully using logical deduction and backtracking.
            `);
            
            setTimeout(() => {
                window.gameInstance.showSuccessModal();
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
}