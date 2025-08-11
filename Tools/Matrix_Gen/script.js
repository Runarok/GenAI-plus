
        // Global variables
        let currentMatrix = [];
        let matrixStats = {};

        // Initialize app
        document.addEventListener('DOMContentLoaded', function() {
            initializeTheme();
            setupEventListeners();
            generateMatrix();
        });

        // Theme management
        function initializeTheme() {
            const savedTheme = localStorage.getItem('matrix-theme') || 'dark';
            setTheme(savedTheme);
        }

        function setTheme(theme) {
            document.body.setAttribute('data-theme', theme);
            localStorage.setItem('matrix-theme', theme);
            
            // Update active theme button
            document.querySelectorAll('.theme-btn').forEach(btn => {
                btn.classList.remove('active');
                if (btn.getAttribute('data-theme') === theme) {
                    btn.classList.add('active');
                }
            });
        }

        // Event listeners
        function setupEventListeners() {
            // Theme switcher
            document.querySelectorAll('.theme-btn').forEach(btn => {
                btn.addEventListener('click', () => setTheme(btn.getAttribute('data-theme')));
            });

            // Auto-generate on input change
            ['rows', 'cols', 'min-val', 'max-val', 'matrix-mode'].forEach(id => {
                document.getElementById(id).addEventListener('change', function() {
                    // If there's a seed, use it; otherwise generate normally
                    const currentSeed = document.getElementById('seed-input').value.trim();
                    if (currentSeed) {
                        generateMatrixWithSeed(currentSeed);
                    } else {
                        generateMatrix();
                    }
                });
            });

            ['decimals', 'highlight-diagonal', 'color-coding'].forEach(id => {
                document.getElementById(id).addEventListener('change', updateMatrixDisplay);
            });

            // Seed input - apply seed when Enter is pressed
            document.getElementById('seed-input').addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    applySeed();
                }
            });

            // Keyboard shortcuts
            document.addEventListener('keydown', function(e) {
                if (e.ctrlKey || e.metaKey) {
                    switch(e.key) {
                        case 'r':
                            e.preventDefault();
                            generateMatrix();
                            break;
                        case 'c':
                            if (e.shiftKey) {
                                e.preventDefault();
                                copyMatrix();
                            }
                            break;
                        case 't':
                            e.preventDefault();
                            transposeMatrix();
                            break;
                        case 's':
                            if (e.shiftKey) {
                                e.preventDefault();
                                const currentSeed = document.getElementById('seed-input').value.trim();
                                if (currentSeed) {
                                    applySeed();
                                } else {
                                    generateRandomSeed();
                                }
                            }
                            break;
                    }
                }
            });

            // Input validation
            document.querySelectorAll('input[type="number"]').forEach(input => {
                input.addEventListener('input', validateInput);
            });
        }

        // Input validation
        function validateInput(e) {
            const input = e.target;
            const value = parseFloat(input.value);
            const min = parseFloat(input.min);
            const max = parseFloat(input.max);

            if (isNaN(value)) return;

            if (min && value < min) {
                input.value = min;
                showNotification('Value adjusted to minimum limit', 'warning');
            }
            if (max && value > max) {
                input.value = max;
                showNotification('Value adjusted to maximum limit', 'warning');
            }
        }

        // Matrix generation
        function generateMatrix() {
            // Get current seed and reapply it to ensure consistency
            const currentSeed = document.getElementById('seed-input').value.trim();
            if (currentSeed) {
                Math.seedrandom(currentSeed);
            }
            
            const rows = parseInt(document.getElementById('rows').value) || 3;
            const cols = parseInt(document.getElementById('cols').value) || 3;
            const minVal = parseFloat(document.getElementById('min-val').value) || -10;
            const maxVal = parseFloat(document.getElementById('max-val').value) || 10;
            const mode = document.getElementById('matrix-mode').value;
            const useDecimals = document.getElementById('decimals').checked;

            // Validate range
            if (minVal >= maxVal) {
                showNotification('Minimum value must be less than maximum value', 'error');
                return;
            }

            currentMatrix = [];

            // Generate matrix based on mode
            switch (mode) {
                case 'identity':
                    currentMatrix = generateIdentityMatrix(rows, cols);
                    break;
                case 'zero':
                    currentMatrix = generateZeroMatrix(rows, cols);
                    break;
                case 'sparse':
                    currentMatrix = generateSparseMatrix(rows, cols, minVal, maxVal, useDecimals);
                    break;
                case 'diagonal':
                    currentMatrix = generateDiagonalMatrix(rows, cols, minVal, maxVal, useDecimals);
                    break;
                default:
                    currentMatrix = generateRandomMatrix(rows, cols, minVal, maxVal, useDecimals);
            }

            updateMatrixDisplay();
            calculateStats();
            updateMatrixInfo(rows, cols, mode);
            
            // Add fade-in animation
            document.querySelector('.matrix-table').classList.add('fade-in');
            setTimeout(() => {
                document.querySelector('.matrix-table').classList.remove('fade-in');
            }, 300);
        }

        function generateRandomMatrix(rows, cols, min, max, useDecimals) {
            const matrix = [];
            for (let i = 0; i < rows; i++) {
                matrix[i] = [];
                for (let j = 0; j < cols; j++) {
                    const value = Math.random() * (max - min) + min;
                    matrix[i][j] = useDecimals ? parseFloat(value.toFixed(2)) : Math.round(value);
                }
            }
            return matrix;
        }

        function generateIdentityMatrix(rows, cols) {
            const matrix = [];
            for (let i = 0; i < rows; i++) {
                matrix[i] = [];
                for (let j = 0; j < cols; j++) {
                    matrix[i][j] = i === j ? 1 : 0;
                }
            }
            return matrix;
        }

        function generateZeroMatrix(rows, cols) {
            const matrix = [];
            for (let i = 0; i < rows; i++) {
                matrix[i] = new Array(cols).fill(0);
            }
            return matrix;
        }

        function generateSparseMatrix(rows, cols, min, max, useDecimals) {
            const matrix = generateZeroMatrix(rows, cols);
            const sparsity = 0.7; // 70% zeros
            const nonZeroCount = Math.floor(rows * cols * (1 - sparsity));
            
            for (let k = 0; k < nonZeroCount; k++) {
                const i = Math.floor(Math.random() * rows);
                const j = Math.floor(Math.random() * cols);
                const value = Math.random() * (max - min) + min;
                matrix[i][j] = useDecimals ? parseFloat(value.toFixed(2)) : Math.round(value);
            }
            return matrix;
        }

        function generateDiagonalMatrix(rows, cols, min, max, useDecimals) {
            const matrix = generateZeroMatrix(rows, cols);
            const size = Math.min(rows, cols);
            
            for (let i = 0; i < size; i++) {
                const value = Math.random() * (max - min) + min;
                matrix[i][i] = useDecimals ? parseFloat(value.toFixed(2)) : Math.round(value);
            }
            return matrix;
        }

        // Matrix display
        function updateMatrixDisplay() {
            const table = document.getElementById('matrix-table');
            const highlightDiagonal = document.getElementById('highlight-diagonal').checked;
            const colorCoding = document.getElementById('color-coding').checked;
            
            let html = '';
            
            for (let i = 0; i < currentMatrix.length; i++) {
                html += '<tr>';
                for (let j = 0; j < currentMatrix[i].length; j++) {
                    const value = currentMatrix[i][j];
                    let cellClass = 'matrix-cell';
                    
                    if (highlightDiagonal && i === j) {
                        cellClass += ' diagonal';
                    } else if (colorCoding) {
                        if (value > 0) cellClass += ' positive';
                        else if (value < 0) cellClass += ' negative';
                        else cellClass += ' zero';
                    }
                    
                    html += `<td class="${cellClass}" data-row="${i}" data-col="${j}">${value}</td>`;
                }
                html += '</tr>';
            }
            
            table.innerHTML = html;
            
            // Add cell hover effects
            document.querySelectorAll('.matrix-cell').forEach(cell => {
                cell.addEventListener('click', function() {
                    highlightRowCol(this.dataset.row, this.dataset.col);
                });
            });
        }

        function highlightRowCol(row, col) {
            // Remove previous highlights
            document.querySelectorAll('.matrix-cell').forEach(cell => {
                cell.style.outline = '';
            });
            
            // Highlight row and column
            document.querySelectorAll(`[data-row="${row}"]`).forEach(cell => {
                cell.style.outline = '2px solid var(--accent)';
            });
            document.querySelectorAll(`[data-col="${col}"]`).forEach(cell => {
                cell.style.outline = '2px solid var(--secondary)';
            });
            
            // Highlight clicked cell
            document.querySelector(`[data-row="${row}"][data-col="${col}"]`).style.outline = '3px solid var(--primary)';
        }

        // Matrix operations
        function transposeMatrix() {
            if (currentMatrix.length === 0) return;
            
            const transposed = [];
            for (let j = 0; j < currentMatrix[0].length; j++) {
                transposed[j] = [];
                for (let i = 0; i < currentMatrix.length; i++) {
                    transposed[j][i] = currentMatrix[i][j];
                }
            }
            
            currentMatrix = transposed;
            updateMatrixDisplay();
            calculateStats();
            updateMatrixInfo(currentMatrix.length, currentMatrix[0].length, 'Transposed');
            showNotification('Matrix transposed successfully', 'success');
        }

        function sortRows() {
            currentMatrix.forEach(row => {
                row.sort((a, b) => a - b);
            });
            updateMatrixDisplay();
            calculateStats();
            showNotification('Rows sorted successfully', 'success');
        }

        function sortCols() {
            if (currentMatrix.length === 0) return;
            
            for (let j = 0; j < currentMatrix[0].length; j++) {
                const column = [];
                for (let i = 0; i < currentMatrix.length; i++) {
                    column.push(currentMatrix[i][j]);
                }
                column.sort((a, b) => a - b);
                for (let i = 0; i < currentMatrix.length; i++) {
                    currentMatrix[i][j] = column[i];
                }
            }
            
            updateMatrixDisplay();
            calculateStats();
            showNotification('Columns sorted successfully', 'success');
        }

        function fillOnes() {
            for (let i = 0; i < currentMatrix.length; i++) {
                for (let j = 0; j < currentMatrix[i].length; j++) {
                    currentMatrix[i][j] = 1;
                }
            }
            updateMatrixDisplay();
            calculateStats();
            showNotification('Matrix filled with ones', 'success');
        }

        function randomSeed() {
            // Generate a random seed and apply it
            const seed = Date.now().toString();
            document.getElementById('seed-input').value = seed;
            applySeed();
        }

        function applySeed() {
            let seed = document.getElementById('seed-input').value.trim();
            
            // If no seed provided, generate a random one
            if (!seed) {
                seed = Date.now().toString();
                document.getElementById('seed-input').value = seed;
            }
            
            // Store the seed and regenerate matrix
            generateMatrixWithSeed(seed);
            showNotification(`Seed applied: ${seed}`, 'success');
        }

        function generateMatrixWithSeed(seed) {
            // Apply the seed right before generation to ensure consistency
            Math.seedrandom(seed);
            generateMatrix();
        }

        function generateRandomSeed() {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let result = '';
            // Use a separate random generator for seed generation to avoid affecting the main seed
            const tempRng = new Math.seedrandom();
            for (let i = 0; i < 8; i++) {
                result += characters.charAt(Math.floor(tempRng() * characters.length));
            }
            document.getElementById('seed-input').value = result;
            generateMatrixWithSeed(result);
        }

        // Statistics calculation
        function calculateStats() {
            if (currentMatrix.length === 0) return;
            
            const flatMatrix = currentMatrix.flat();
            const sum = flatMatrix.reduce((a, b) => a + b, 0);
            const mean = sum / flatMatrix.length;
            const min = Math.min(...flatMatrix);
            const max = Math.max(...flatMatrix);
            
            // Calculate row and column totals
            const rowTotals = currentMatrix.map(row => row.reduce((a, b) => a + b, 0));
            const colTotals = [];
            for (let j = 0; j < currentMatrix[0].length; j++) {
                let total = 0;
                for (let i = 0; i < currentMatrix.length; i++) {
                    total += currentMatrix[i][j];
                }
                colTotals.push(total);
            }
            
            matrixStats = {
                sum: sum.toFixed(2),
                mean: mean.toFixed(2),
                min: min,
                max: max,
                rowTotals: rowTotals.map(t => t.toFixed(2)),
                colTotals: colTotals.map(t => t.toFixed(2)),
                determinant: currentMatrix.length === currentMatrix[0].length ? 
                    calculateDeterminant(currentMatrix).toFixed(2) : 'N/A'
            };
            
            displayStats();
        }

        function calculateDeterminant(matrix) {
            const n = matrix.length;
            if (n !== matrix[0].length) return NaN;
            if (n === 1) return matrix[0][0];
            if (n === 2) return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
            
            // For larger matrices, use simplified calculation (not full LU decomposition)
            // This is a basic implementation for demonstration
            let det = 0;
            for (let i = 0; i < n; i++) {
                det += Math.pow(-1, i) * matrix[0][i] * calculateMinorDeterminant(matrix, 0, i);
            }
            return det;
        }

        function calculateMinorDeterminant(matrix, row, col) {
            const n = matrix.length;
            const minor = [];
            for (let i = 0; i < n; i++) {
                if (i === row) continue;
                const minorRow = [];
                for (let j = 0; j < n; j++) {
                    if (j === col) continue;
                    minorRow.push(matrix[i][j]);
                }
                minor.push(minorRow);
            }
            return calculateDeterminant(minor);
        }

        function displayStats() {
            const statsContainer = document.getElementById('matrix-stats');
            statsContainer.innerHTML = `
                <div class="stat-item">Sum: <span class="stat-value">${matrixStats.sum}</span></div>
                <div class="stat-item">Mean: <span class="stat-value">${matrixStats.mean}</span></div>
                <div class="stat-item">Min: <span class="stat-value">${matrixStats.min}</span></div>
                <div class="stat-item">Max: <span class="stat-value">${matrixStats.max}</span></div>
                <div class="stat-item">Det: <span class="stat-value">${matrixStats.determinant}</span></div>
                <div class="stat-item">Rank: <span class="stat-value">${calculateRank()}</span></div>
            `;
        }

        function calculateRank() {
            // Simplified rank calculation
            return Math.min(currentMatrix.length, currentMatrix[0]?.length || 0);
        }

        // Export functions
        function copyMatrix() {
            const matrixText = currentMatrix.map(row => row.join('\t')).join('\n');
            navigator.clipboard.writeText(matrixText).then(() => {
                showNotification('Matrix copied to clipboard', 'success');
            }).catch(() => {
                showNotification('Failed to copy matrix', 'error');
            });
        }

        function exportCSV() {
            const csv = currentMatrix.map(row => row.join(',')).join('\n');
            downloadFile(csv, 'matrix.csv', 'text/csv');
            showNotification('Matrix exported as CSV', 'success');
        }

        function exportText() {
            const text = currentMatrix.map(row => 
                '[' + row.map(val => val.toString().padStart(8)).join(',') + ']'
            ).join('\n');
            downloadFile(text, 'matrix.txt', 'text/plain');
            showNotification('Matrix exported as text', 'success');
        }

        function downloadFile(content, filename, contentType) {
            const blob = new Blob([content], { type: contentType });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        }

        // Utility functions
        function updateMatrixInfo(rows, cols, type) {
            document.getElementById('matrix-size').textContent = `${rows}×${cols} Matrix`;
            document.getElementById('matrix-type').textContent = type;
        }

        function showNotification(message, type = 'info') {
            const notification = document.createElement('div');
            notification.className = `notification ${type}`;
            notification.textContent = message;
            
            // Style the notification
            Object.assign(notification.style, {
                position: 'fixed',
                top: '20px',
                right: '20px',
                padding: '12px 16px',
                borderRadius: 'var(--radius)',
                color: 'white',
                fontWeight: '500',
                zIndex: '9999',
                transform: 'translateX(100%)',
                transition: 'transform 0.3s ease-in-out',
                maxWidth: '300px'
            });

            // Set background color based on type
            const colors = {
                success: 'var(--success)',
                error: 'var(--error)',
                warning: 'var(--warning)',
                info: 'var(--primary)'
            };
            notification.style.background = colors[type] || colors.info;

            document.body.appendChild(notification);

            // Animate in
            setTimeout(() => {
                notification.style.transform = 'translateX(0)';
            }, 10);

            // Animate out and remove
            setTimeout(() => {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 300);
            }, 3000);
        }

        // Accessibility enhancements
        function setupAccessibility() {
            // Add ARIA labels and roles
            document.querySelectorAll('.btn').forEach(btn => {
                if (!btn.getAttribute('aria-label')) {
                    btn.setAttribute('aria-label', btn.textContent.trim());
                }
            });

            // Add keyboard navigation for matrix cells
            document.addEventListener('keydown', function(e) {
                const activeElement = document.activeElement;
                if (activeElement.classList.contains('matrix-cell')) {
                    const row = parseInt(activeElement.dataset.row);
                    const col = parseInt(activeElement.dataset.col);
                    let newRow = row, newCol = col;

                    switch(e.key) {
                        case 'ArrowUp':
                            newRow = Math.max(0, row - 1);
                            break;
                        case 'ArrowDown':
                            newRow = Math.min(currentMatrix.length - 1, row + 1);
                            break;
                        case 'ArrowLeft':
                            newCol = Math.max(0, col - 1);
                            break;
                        case 'ArrowRight':
                            newCol = Math.min(currentMatrix[0].length - 1, col + 1);
                            break;
                    }

                    const newCell = document.querySelector(`[data-row="${newRow}"][data-col="${newCol}"]`);
                    if (newCell) {
                        newCell.focus();
                        e.preventDefault();
                    }
                }
            });
        }

        // Initialize accessibility features
        setTimeout(setupAccessibility, 100);
    