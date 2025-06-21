// Board Rendering and Updates
class BoardRenderer {
    constructor() {
        this.boardElement = null;
        this.manualBoardElement = null;
    }

    createSudokuBoard(containerId, isManual = false) {
        const container = document.getElementById(containerId);
        container.innerHTML = '';

        // Add horizontal separators for 3x3 boxes
        if (!isManual) {
            const separator1 = document.createElement('div');
            separator1.className = 'horizontal-separator';
            container.appendChild(separator1);

            const separator2 = document.createElement('div');
            separator2.className = 'horizontal-separator';
            container.appendChild(separator2);
        }

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
                    if (!isManual) {
                        window.gameInstance.selectCell(row, col);
                    }
                });
                input.addEventListener('focus', () => {
                    if (!isManual) {
                        window.gameInstance.selectCell(row, col);
                    }
                });

                cell.appendChild(input);
                container.appendChild(cell);
            }
        }

        if (containerId === 'sudoku-board') {
            this.boardElement = container;
        } else if (containerId === 'manual-board') {
            this.manualBoardElement = container;
        }
    }

    handleCellInput(e, row, col, isManual = false) {
        const value = e.target.value.replace(/[^1-9]/g, '');
        e.target.value = value;

        if (isManual) {
            window.inputValidator.validateManualInputRealTime();
            return;
        }

        if (window.gameInstance.givenCells.has(`${row}-${col}`)) {
            e.target.value = window.gameInstance.currentBoard[row][col] || '';
            return;
        }

        window.gameInstance.currentBoard[row][col] = value ? parseInt(value) : 0;
        window.gameInstance.selectCell(row, col);
        this.clearHighlights();

        // Real-time validation for conflicts
        this.highlightConflicts(row, col);

        if (window.gameLogic.isBoardComplete()) {
            setTimeout(() => {
                if (window.gameLogic.isBoardValid()) {
                    window.gameInstance.showSuccessModal();
                }
            }, 100);
        }
    }

    updateBoardDisplay(board, givenCells, botEntries = new Set()) {
        if (!this.boardElement) return;

        const cells = this.boardElement.querySelectorAll('.sudoku-cell');

        cells.forEach((cell, index) => {
            const row = Math.floor(index / 9);
            const col = index % 9;
            const input = cell.querySelector('input');
            const value = board[row][col];

            input.value = value || '';
            
            // Reset classes
            cell.className = 'sudoku-cell';
            
            // Add appropriate classes
            if (givenCells.has(`${row}-${col}`)) {
                cell.classList.add('given');
                input.readOnly = true;
            } else if (botEntries.has(`${row}-${col}`)) {
                cell.classList.add('bot-entry');
                input.readOnly = false;
            } else {
                input.readOnly = false;
            }
        });
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
            const input = cell.querySelector('input');
            if (input && !input.readOnly) {
                input.focus();
            }
            return { row, col };
        }
        return null;
    }

    highlightConflicts(row, col) {
        // Add defensive check to ensure currentBoard is properly defined
        if (!window.gameInstance?.currentBoard || !Array.isArray(window.gameInstance.currentBoard) || window.gameInstance.currentBoard.length !== 9) {
            return;
        }
        
        if (!Array.isArray(window.gameInstance.currentBoard[row]) || window.gameInstance.currentBoard[row].length !== 9) {
            return;
        }
        
        const value = window.gameInstance.currentBoard[row][col];
        if (!value) return;

        const conflicts = window.inputValidator.findConflictsForCell(row, col, value);
        
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

    highlightCells(cells, className = 'highlighted') {
        this.clearHighlights();
        cells.forEach(({ row, col }) => {
            const cell = document.querySelector(`#sudoku-board .sudoku-cell[data-row="${row}"][data-col="${col}"]`);
            if (cell) {
                cell.classList.add(className);
            }
        });
    }

    clearHighlights() {
        document.querySelectorAll('.sudoku-cell').forEach(cell => {
            cell.classList.remove('highlighted', 'conflict', 'error', 'hint');
        });
    }

    showErrors(errors) {
        // Clear previous error styling
        document.querySelectorAll('.sudoku-cell').forEach(cell => {
            cell.classList.remove('error');
        });

        errors.forEach(({ row, col }) => {
            const cell = document.querySelector(`#sudoku-board .sudoku-cell[data-row="${row}"][data-col="${col}"]`);
            if (cell) {
                cell.classList.add('error');
            }
        });

        // Auto-clear errors after 5 seconds
        setTimeout(() => {
            document.querySelectorAll('.sudoku-cell').forEach(cell => {
                cell.classList.remove('error');
            });
        }, 5000);
    }

    animateHint(row, col) {
        const cell = document.querySelector(`#sudoku-board .sudoku-cell[data-row="${row}"][data-col="${col}"]`);
        if (cell) {
            cell.classList.add('hint');
            setTimeout(() => {
                cell.classList.remove('hint');
            }, 2000);
        }
    }

    clearManualBoard() {
        if (!this.manualBoardElement) return;

        const inputs = this.manualBoardElement.querySelectorAll('input');
        inputs.forEach(input => {
            input.value = '';
            input.parentElement.classList.remove('conflict');
        });
    }
}