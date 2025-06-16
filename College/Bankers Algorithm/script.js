class BankersAlgorithm {
    constructor() {
        this.processes = 0;
        this.resources = 0;
        this.allocation = [];
        this.max = [];
        this.available = [];
        this.need = [];
        
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        document.getElementById('setupBtn').addEventListener('click', () => this.setupMatrices());
        document.getElementById('loadExampleBtn').addEventListener('click', () => this.loadExample());
        document.getElementById('analyzeBtn').addEventListener('click', () => this.runAnalysis());
        document.getElementById('processRequestBtn').addEventListener('click', () => this.processRequest());
    }

    setupMatrices() {
        this.processes = parseInt(document.getElementById('processes').value);
        this.resources = parseInt(document.getElementById('resources').value);

        if (this.processes < 1 || this.resources < 1) {
            alert('Please enter valid numbers for processes and resources');
            return;
        }

        this.createMatrixInputs();
        document.getElementById('matricesSection').style.display = 'block';
        document.getElementById('matricesSection').classList.add('fade-in');
    }

    createMatrixInputs() {
        // Allocation Matrix
        const allocationDiv = document.getElementById('allocationMatrix');
        allocationDiv.innerHTML = this.createMatrixHTML('allocation', this.processes, this.resources, 'A');

        // Max Matrix
        const maxDiv = document.getElementById('maxMatrix');
        maxDiv.innerHTML = this.createMatrixHTML('max', this.processes, this.resources, 'M');

        // Available Vector
        const availableDiv = document.getElementById('availableVector');
        availableDiv.innerHTML = this.createVectorHTML('available', this.resources, 'Available');

        // Setup request section
        this.setupRequestSection();
    }

    createMatrixHTML(prefix, rows, cols, label) {
        let html = '<table class="matrix-table"><thead><tr><th></th>';
        for (let j = 0; j < cols; j++) {
            html += `<th>R${j}</th>`;
        }
        html += '</tr></thead><tbody>';

        for (let i = 0; i < rows; i++) {
            html += `<tr><th>P${i}</th>`;
            for (let j = 0; j < cols; j++) {
                html += `<td><input type="number" id="${prefix}_${i}_${j}" min="0" value="0"></td>`;
            }
            html += '</tr>';
        }
        html += '</tbody></table>';
        return html;
    }

    createVectorHTML(prefix, size, label) {
        let html = '<table class="matrix-table"><thead><tr>';
        for (let i = 0; i < size; i++) {
            html += `<th>R${i}</th>`;
        }
        html += '</tr></thead><tbody><tr>';
        for (let i = 0; i < size; i++) {
            html += `<td><input type="number" id="${prefix}_${i}" min="0" value="0"></td>`;
        }
        html += '</tr></tbody></table>';
        return html;
    }

    setupRequestSection() {
        const processSelect = document.getElementById('requestProcess');
        processSelect.innerHTML = '';
        for (let i = 0; i < this.processes; i++) {
            processSelect.innerHTML += `<option value="${i}">P${i}</option>`;
        }

        const requestVectorDiv = document.getElementById('requestVector');
        let html = '<div>';
        for (let i = 0; i < this.resources; i++) {
            html += `<input type="number" id="request_${i}" min="0" value="0" placeholder="R${i}">`;
        }
        html += '</div>';
        requestVectorDiv.innerHTML = html;

        document.getElementById('requestSection').style.display = 'block';
        document.getElementById('requestSection').classList.add('fade-in');
    }

    loadExample() {
        // Example data for 5 processes and 3 resources
        const exampleAllocation = [
            [0, 1, 0],
            [2, 0, 0],
            [3, 0, 2],
            [2, 1, 1],
            [0, 0, 2]
        ];

        const exampleMax = [
            [7, 5, 3],
            [3, 2, 2],
            [9, 0, 2],
            [2, 2, 2],
            [4, 3, 3]
        ];

        const exampleAvailable = [3, 3, 2];

        // Fill allocation matrix
        for (let i = 0; i < this.processes && i < 5; i++) {
            for (let j = 0; j < this.resources && j < 3; j++) {
                document.getElementById(`allocation_${i}_${j}`).value = exampleAllocation[i][j];
            }
        }

        // Fill max matrix
        for (let i = 0; i < this.processes && i < 5; i++) {
            for (let j = 0; j < this.resources && j < 3; j++) {
                document.getElementById(`max_${i}_${j}`).value = exampleMax[i][j];
            }
        }

        // Fill available vector
        for (let i = 0; i < this.resources && i < 3; i++) {
            document.getElementById(`available_${i}`).value = exampleAvailable[i];
        }
    }

    readInputData() {
        // Read allocation matrix
        this.allocation = [];
        for (let i = 0; i < this.processes; i++) {
            this.allocation[i] = [];
            for (let j = 0; j < this.resources; j++) {
                this.allocation[i][j] = parseInt(document.getElementById(`allocation_${i}_${j}`).value) || 0;
            }
        }

        // Read max matrix
        this.max = [];
        for (let i = 0; i < this.processes; i++) {
            this.max[i] = [];
            for (let j = 0; j < this.resources; j++) {
                this.max[i][j] = parseInt(document.getElementById(`max_${i}_${j}`).value) || 0;
            }
        }

        // Read available vector
        this.available = [];
        for (let i = 0; i < this.resources; i++) {
            this.available[i] = parseInt(document.getElementById(`available_${i}`).value) || 0;
        }
    }

    calculateNeed() {
        this.need = [];
        for (let i = 0; i < this.processes; i++) {
            this.need[i] = [];
            for (let j = 0; j < this.resources; j++) {
                this.need[i][j] = this.max[i][j] - this.allocation[i][j];
            }
        }
    }

    runAnalysis() {
        this.readInputData();
        this.calculateNeed();
        
        let resultsHTML = '';
        
        // Step 1: Show input matrices
        resultsHTML += this.createStep(
            1,
            'Input Matrices',
            this.displayInputMatrices()
        );

        // Step 2: Calculate Need matrix
        resultsHTML += this.createStep(
            2,
            'Calculate Need Matrix',
            this.displayNeedCalculation()
        );

        // Step 3: Safety algorithm
        const safetyResult = this.checkSafeState();
        resultsHTML += this.createStep(
            3,
            'Safety Algorithm',
            this.displaySafetyCheck(safetyResult)
        );

        this.displayResults(resultsHTML);
    }

    createStep(stepNumber, title, content) {
        return `
            <div class="step">
                <h3><i class="fas fa-step-forward"></i> Step ${stepNumber}: ${title}</h3>
                <div class="step-content">
                    ${content}
                </div>
            </div>
        `;
    }

    displayInputMatrices() {
        return `
            <div class="matrix-display">
                <div class="matrix-container">
                    <h4>Allocation Matrix</h4>
                    ${this.matrixToHTML(this.allocation, 'Allocation')}
                </div>
                <div class="matrix-container">
                    <h4>Max Matrix</h4>
                    ${this.matrixToHTML(this.max, 'Max')}
                </div>
                <div class="matrix-container">
                    <h4>Available Vector</h4>
                    ${this.vectorToHTML(this.available, 'Available')}
                </div>
            </div>
        `;
    }

    displayNeedCalculation() {
        let html = '<div class="formula">Need[i][j] = Max[i][j] - Allocation[i][j]</div>';
        
        html += '<div class="matrix-display">';
        html += '<div class="matrix-container">';
        html += '<h4>Need Matrix Calculation</h4>';
        
        for (let i = 0; i < this.processes; i++) {
            html += `<div class="formula">P${i}: `;
            for (let j = 0; j < this.resources; j++) {
                html += `Need[${i}][${j}] = ${this.max[i][j]} - ${this.allocation[i][j]} = ${this.need[i][j]}`;
                if (j < this.resources - 1) html += ', ';
            }
            html += '</div>';
        }
        
        html += '</div>';
        html += '<div class="matrix-container">';
        html += '<h4>Resulting Need Matrix</h4>';
        html += this.matrixToHTML(this.need, 'Need');
        html += '</div>';
        html += '</div>';
        
        return html;
    }

    checkSafeState() {
        const work = [...this.available];
        const finish = new Array(this.processes).fill(false);
        const safeSequence = [];
        const steps = [];

        steps.push(`Initial: Work = [${work.join(', ')}], Finish = [${finish.map(f => f ? 'T' : 'F').join(', ')}]`);

        let found = true;
        while (found && safeSequence.length < this.processes) {
            found = false;
            
            for (let i = 0; i < this.processes; i++) {
                if (!finish[i]) {
                    let canExecute = true;
                    for (let j = 0; j < this.resources; j++) {
                        if (this.need[i][j] > work[j]) {
                            canExecute = false;
                            break;
                        }
                    }
                    
                    if (canExecute) {
                        // Execute process i
                        for (let j = 0; j < this.resources; j++) {
                            work[j] += this.allocation[i][j];
                        }
                        finish[i] = true;
                        safeSequence.push(i);
                        found = true;
                        
                        steps.push(`Process P${i} can execute: Need[${i}] = [${this.need[i].join(', ')}] ≤ Work = [${work.map((w, idx) => w - this.allocation[i][idx]).join(', ')}]`);
                        steps.push(`After P${i}: Work = Work + Allocation[${i}] = [${work.join(', ')}]`);
                        break;
                    }
                }
            }
        }

        return {
            isSafe: safeSequence.length === this.processes,
            safeSequence: safeSequence,
            steps: steps
        };
    }

    displaySafetyCheck(result) {
        let html = '<div class="formula">Safety Algorithm Steps:</div>';
        
        result.steps.forEach(step => {
            html += `<div class="formula">${step}</div>`;
        });

        if (result.isSafe) {
            html += `
                <div class="status-indicator status-safe">
                    <i class="fas fa-check-circle"></i>
                    System is in SAFE state
                </div>
                <div class="safe-sequence">
                    <strong>Safe Sequence:</strong>
                    <div class="sequence">P${result.safeSequence.join(' → P')}</div>
                </div>
            `;
        } else {
            html += `
                <div class="status-indicator status-unsafe">
                    <i class="fas fa-times-circle"></i>
                    System is in UNSAFE state - Potential Deadlock!
                </div>
            `;
        }

        return html;
    }

    processRequest() {
        this.readInputData();
        this.calculateNeed();

        const processId = parseInt(document.getElementById('requestProcess').value);
        const request = [];
        for (let i = 0; i < this.resources; i++) {
            request[i] = parseInt(document.getElementById(`request_${i}`).value) || 0;
        }

        let resultsHTML = '';
        
        // Step 1: Show request
        resultsHTML += this.createStep(
            1,
            'Process Request',
            `<div class="formula">Process P${processId} requests: [${request.join(', ')}]</div>`
        );

        // Step 2: Check if request ≤ need
        let needCheck = true;
        let needCheckHTML = '<div class="formula">Check: Request ≤ Need</div>';
        for (let i = 0; i < this.resources; i++) {
            const valid = request[i] <= this.need[processId][i];
            needCheck = needCheck && valid;
            needCheckHTML += `<div class="formula">R${i}: ${request[i]} ≤ ${this.need[processId][i]} ${valid ? '✅' : '❌'}</div>`;
        }

        resultsHTML += this.createStep(
            2,
            'Check Request ≤ Need',
            needCheckHTML + `<div class="status-indicator ${needCheck ? 'status-safe' : 'status-unsafe'}">
                <i class="fas fa-${needCheck ? 'check' : 'times'}-circle"></i>
                Request ≤ Need: ${needCheck ? 'TRUE' : 'FALSE'}
            </div>`
        );

        if (!needCheck) {
            resultsHTML += this.createStep(
                3,
                'Final Decision',
                `<div class="status-indicator status-denied">
                    <i class="fas fa-times-circle"></i>
                    Request DENIED - Exceeds maximum claim
                </div>`
            );
            this.displayResults(resultsHTML);
            return;
        }

        // Step 3: Check if request ≤ available
        let availableCheck = true;
        let availableCheckHTML = '<div class="formula">Check: Request ≤ Available</div>';
        for (let i = 0; i < this.resources; i++) {
            const valid = request[i] <= this.available[i];
            availableCheck = availableCheck && valid;
            availableCheckHTML += `<div class="formula">R${i}: ${request[i]} ≤ ${this.available[i]} ${valid ? '✅' : '❌'}</div>`;
        }

        resultsHTML += this.createStep(
            3,
            'Check Request ≤ Available',
            availableCheckHTML + `<div class="status-indicator ${availableCheck ? 'status-safe' : 'status-unsafe'}">
                <i class="fas fa-${availableCheck ? 'check' : 'times'}-circle"></i>
                Request ≤ Available: ${availableCheck ? 'TRUE' : 'FALSE'}
            </div>`
        );

        if (!availableCheck) {
            resultsHTML += this.createStep(
                4,
                'Final Decision',
                `<div class="status-indicator status-denied">
                    <i class="fas fa-times-circle"></i>
                    Request DENIED - Insufficient resources available
                </div>`
            );
            this.displayResults(resultsHTML);
            return;
        }

        // Step 4: Simulate allocation and check safety
        const newAllocation = this.allocation.map(row => [...row]);
        const newAvailable = [...this.available];

        for (let i = 0; i < this.resources; i++) {
            newAllocation[processId][i] += request[i];
            newAvailable[i] -= request[i];
        }

        // Recalculate need with new allocation
        const newNeed = [];
        for (let i = 0; i < this.processes; i++) {
            newNeed[i] = [];
            for (let j = 0; j < this.resources; j++) {
                newNeed[i][j] = this.max[i][j] - newAllocation[i][j];
            }
        }

        // Check safety with new state
        const originalAllocation = this.allocation;
        const originalAvailable = this.available;
        const originalNeed = this.need;

        this.allocation = newAllocation;
        this.available = newAvailable;
        this.need = newNeed;

        const safetyResult = this.checkSafeState();

        resultsHTML += this.createStep(
            4,
            'Simulate Allocation & Check Safety',
            `<div class="formula">Pretend to allocate resources:</div>
            <div class="formula">New Allocation[${processId}] = [${newAllocation[processId].join(', ')}]</div>
            <div class="formula">New Available = [${newAvailable.join(', ')}]</div>
            ${this.displaySafetyCheck(safetyResult)}`
        );

        // Step 5: Final decision
        if (safetyResult.isSafe) {
            resultsHTML += this.createStep(
                5,
                'Final Decision',
                `<div class="status-indicator status-granted">
                    <i class="fas fa-check-circle"></i>
                    Request GRANTED - System remains in safe state
                </div>`
            );
        } else {
            resultsHTML += this.createStep(
                5,
                'Final Decision',
                `<div class="status-indicator status-denied">
                    <i class="fas fa-times-circle"></i>
                    Request DENIED - Would lead to unsafe state
                </div>`
            );
        }

        // Restore original state
        this.allocation = originalAllocation;
        this.available = originalAvailable;
        this.need = originalNeed;

        this.displayResults(resultsHTML);
    }

    matrixToHTML(matrix, title) {
        let html = '<table class="matrix-table"><thead><tr><th></th>';
        for (let j = 0; j < this.resources; j++) {
            html += `<th>R${j}</th>`;
        }
        html += '</tr></thead><tbody>';

        for (let i = 0; i < this.processes; i++) {
            html += `<tr><th>P${i}</th>`;
            for (let j = 0; j < this.resources; j++) {
                html += `<td>${matrix[i][j]}</td>`;
            }
            html += '</tr>';
        }
        html += '</tbody></table>';
        return html;
    }

    vectorToHTML(vector, title) {
        let html = '<table class="matrix-table"><thead><tr>';
        for (let i = 0; i < this.resources; i++) {
            html += `<th>R${i}</th>`;
        }
        html += '</tr></thead><tbody><tr>';
        for (let i = 0; i < this.resources; i++) {
            html += `<td>${vector[i]}</td>`;
        }
        html += '</tr></tbody></table>';
        return html;
    }

    displayResults(html) {
        document.getElementById('resultsContent').innerHTML = html;
        document.getElementById('resultsSection').style.display = 'block';
        document.getElementById('resultsSection').classList.add('fade-in');
        document.getElementById('resultsSection').scrollIntoView({ behavior: 'smooth' });
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new BankersAlgorithm();
});