class BankersAlgorithm {
    constructor() {
        this.processes = 0;
        this.resources = 0;
        this.allocation = [];
        this.max = [];
        this.available = [];
        this.need = [];
        this.currentInputMethod = 'table';
        
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        document.getElementById('setupBtn').addEventListener('click', () => this.setupMatrices());
        document.getElementById('loadExampleBtn').addEventListener('click', () => this.loadExample());
        document.getElementById('checkSafeSequenceBtn').addEventListener('click', () => this.showSafeSequenceAnalysis());
        document.getElementById('checkProcessRequestBtn').addEventListener('click', () => this.showRequestAnalysis());
        document.getElementById('processRequestBtn').addEventListener('click', () => this.processRequest());
        
        // Input method selection
        document.querySelectorAll('.method-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.switchInputMethod(e.target.closest('.method-btn').dataset.method));
        });
    }

    setupMatrices() {
        this.processes = parseInt(document.getElementById('processes').value);
        this.resources = parseInt(document.getElementById('resources').value);

        if (this.processes < 1 || this.resources < 1) {
            this.showNotification('Please enter valid numbers for processes and resources', 'error');
            return;
        }

        this.showSection('inputMethodSection');
        this.showSection('dataInputSection');
        this.createInputs();
        this.showSection('analysisActionsSection');
    }

    switchInputMethod(method) {
        this.currentInputMethod = method;
        
        // Update button states
        document.querySelectorAll('.method-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.method === method);
        });
        
        // Show/hide input containers
        document.getElementById('tableInput').style.display = method === 'table' ? 'block' : 'none';
        document.getElementById('textInput').style.display = method === 'text' ? 'block' : 'none';
    }

    createInputs() {
        if (this.currentInputMethod === 'table') {
            this.createTableInputs();
        }
        // Text inputs are already in HTML, just need to be populated with examples
    }

    createTableInputs() {
        // Allocation Matrix
        const allocationDiv = document.getElementById('allocationMatrix');
        allocationDiv.innerHTML = this.createMatrixHTML('allocation', this.processes, this.resources);

        // Max Matrix
        const maxDiv = document.getElementById('maxMatrix');
        maxDiv.innerHTML = this.createMatrixHTML('max', this.processes, this.resources);

        // Available Vector
        const availableDiv = document.getElementById('availableVector');
        availableDiv.innerHTML = this.createVectorHTML('available', this.resources);
    }

    createMatrixHTML(prefix, rows, cols) {
        let html = '<table class="matrix-table"><thead><tr><th></th>';
        for (let j = 0; j < cols; j++) {
            html += `<th>R${j}</th>`;
        }
        html += '</tr></thead><tbody>';

        for (let i = 0; i < rows; i++) {
            html += `<tr><th>P${i}</th>`;
            for (let j = 0; j < cols; j++) {
                html += `<td><input type="number" id="${prefix}_${i}_${j}" min="0" value="0" placeholder="0"></td>`;
            }
            html += '</tr>';
        }
        html += '</tbody></table>';
        return html;
    }

    createVectorHTML(prefix, size) {
        let html = '<table class="matrix-table"><thead><tr>';
        for (let i = 0; i < size; i++) {
            html += `<th>R${i}</th>`;
        }
        html += '</tr></thead><tbody><tr>';
        for (let i = 0; i < size; i++) {
            html += `<td><input type="number" id="${prefix}_${i}" min="0" value="0" placeholder="0"></td>`;
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
        let html = '';
        for (let i = 0; i < this.resources; i++) {
            html += `<input type="number" id="request_${i}" min="0" value="0" placeholder="R${i}">`;
        }
        requestVectorDiv.innerHTML = html;
    }

    showSafeSequenceAnalysis() {
        if (!this.readInputData()) {
            return;
        }

        try {
            this.calculateNeed();
            
            // Hide request section and show results section
            this.hideSection('requestInputSection');
            this.showSection('resultsSection');
            
            let resultsHTML = '';
            
            // Step 1: Show input matrices
            resultsHTML += this.createStep(
                1,
                'Input Data Overview',
                'Review the system configuration and input matrices',
                this.displayInputMatrices()
            );

            // Step 2: Calculate Need matrix
            resultsHTML += this.createStep(
                2,
                'Need Matrix Calculation',
                'Calculate the remaining resource needs for each process',
                this.displayNeedCalculation()
            );

            // Step 3: Safety algorithm
            const safetyResult = this.checkSafeState();
            resultsHTML += this.createStep(
                3,
                'Safety Algorithm Execution',
                'Determine if the current state is safe using the Banker\'s Algorithm',
                this.displaySafetyCheck(safetyResult)
            );

            this.displayResults(resultsHTML);
            this.showNotification('Safe sequence analysis completed successfully!', 'success');
        } catch (error) {
            this.showNotification('Analysis failed: ' + error.message, 'error');
        }
    }

    showRequestAnalysis() {
        if (!this.readInputData()) {
            return;
        }

        try {
            this.calculateNeed();
            this.setupRequestSection();
            
            // Hide results section and show request section
            this.hideSection('resultsSection');
            this.showSection('requestInputSection');
            
            this.showNotification('Request input section is ready!', 'success');
        } catch (error) {
            this.showNotification('Error preparing request section: ' + error.message, 'error');
        }
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

        if (this.currentInputMethod === 'table') {
            this.loadExampleToTable(exampleAllocation, exampleMax, exampleAvailable);
        } else {
            this.loadExampleToText(exampleAllocation, exampleMax, exampleAvailable);
        }
        
        this.showNotification('Example data loaded successfully!', 'success');
    }

    loadExampleToTable(allocation, max, available) {
        // Fill allocation matrix
        for (let i = 0; i < Math.min(this.processes, 5); i++) {
            for (let j = 0; j < Math.min(this.resources, 3); j++) {
                const element = document.getElementById(`allocation_${i}_${j}`);
                if (element) element.value = allocation[i][j];
            }
        }

        // Fill max matrix
        for (let i = 0; i < Math.min(this.processes, 5); i++) {
            for (let j = 0; j < Math.min(this.resources, 3); j++) {
                const element = document.getElementById(`max_${i}_${j}`);
                if (element) element.value = max[i][j];
            }
        }

        // Fill available vector
        for (let i = 0; i < Math.min(this.resources, 3); i++) {
            const element = document.getElementById(`available_${i}`);
            if (element) element.value = available[i];
        }
    }

    loadExampleToText(allocation, max, available) {
        // Convert matrices to text format
        const allocationText = allocation.slice(0, this.processes).map(row => 
            row.slice(0, this.resources).join(',')
        ).join('\n');
        
        const maxText = max.slice(0, this.processes).map(row => 
            row.slice(0, this.resources).join(',')
        ).join('\n');
        
        const availableText = available.slice(0, this.resources).join(',');

        document.getElementById('allocationText').value = allocationText;
        document.getElementById('maxText').value = maxText;
        document.getElementById('availableText').value = availableText;
    }

    readInputData() {
        if (this.currentInputMethod === 'table') {
            return this.readTableData();
        } else {
            return this.readTextData();
        }
    }

    readTableData() {
        try {
            // Read allocation matrix
            this.allocation = [];
            for (let i = 0; i < this.processes; i++) {
                this.allocation[i] = [];
                for (let j = 0; j < this.resources; j++) {
                    const value = parseInt(document.getElementById(`allocation_${i}_${j}`).value) || 0;
                    this.allocation[i][j] = value;
                }
            }

            // Read max matrix
            this.max = [];
            for (let i = 0; i < this.processes; i++) {
                this.max[i] = [];
                for (let j = 0; j < this.resources; j++) {
                    const value = parseInt(document.getElementById(`max_${i}_${j}`).value) || 0;
                    this.max[i][j] = value;
                }
            }

            // Read available vector
            this.available = [];
            for (let i = 0; i < this.resources; i++) {
                const value = parseInt(document.getElementById(`available_${i}`).value) || 0;
                this.available[i] = value;
            }

            return true;
        } catch (error) {
            this.showNotification('Error reading table data: ' + error.message, 'error');
            return false;
        }
    }

    readTextData() {
        try {
            // Read allocation matrix
            const allocationText = document.getElementById('allocationText').value.trim();
            this.allocation = allocationText.split('\n').map(row => 
                row.split(',').map(val => parseInt(val.trim()) || 0)
            );

            // Read max matrix
            const maxText = document.getElementById('maxText').value.trim();
            this.max = maxText.split('\n').map(row => 
                row.split(',').map(val => parseInt(val.trim()) || 0)
            );

            // Read available vector
            const availableText = document.getElementById('availableText').value.trim();
            this.available = availableText.split(',').map(val => parseInt(val.trim()) || 0);

            // Validate dimensions
            if (this.allocation.length !== this.processes || this.max.length !== this.processes) {
                throw new Error('Matrix rows must match number of processes');
            }

            if (this.available.length !== this.resources) {
                throw new Error('Available vector length must match number of resources');
            }

            for (let i = 0; i < this.processes; i++) {
                if (this.allocation[i].length !== this.resources || this.max[i].length !== this.resources) {
                    throw new Error('Matrix columns must match number of resources');
                }
            }

            return true;
        } catch (error) {
            this.showNotification('Error reading text data: ' + error.message, 'error');
            return false;
        }
    }

    calculateNeed() {
        this.need = [];
        for (let i = 0; i < this.processes; i++) {
            this.need[i] = [];
            for (let j = 0; j < this.resources; j++) {
                this.need[i][j] = this.max[i][j] - this.allocation[i][j];
                if (this.need[i][j] < 0) {
                    throw new Error(`Invalid data: Process P${i} has allocated more than maximum for resource R${j}`);
                }
            }
        }
    }

    createStep(stepNumber, title, description, content) {
        return `
            <div class="step fade-in">
                <h3><i class="fas fa-step-forward"></i> Step ${stepNumber}: ${title}</h3>
                <p style="color: var(--text-muted); margin-bottom: 1.5rem; font-style: italic;">${description}</p>
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
                    <h4><i class="fas fa-table"></i> Allocation Matrix</h4>
                    <p style="color: var(--text-muted); margin-bottom: 1rem;">Current resource allocation to each process</p>
                    ${this.matrixToHTML(this.allocation, 'Allocation')}
                </div>
                <div class="matrix-container">
                    <h4><i class="fas fa-chart-bar"></i> Maximum Matrix</h4>
                    <p style="color: var(--text-muted); margin-bottom: 1rem;">Maximum resource demand of each process</p>
                    ${this.matrixToHTML(this.max, 'Max')}
                </div>
                <div class="matrix-container">
                    <h4><i class="fas fa-cubes"></i> Available Vector</h4>
                    <p style="color: var(--text-muted); margin-bottom: 1rem;">Currently available resources in the system</p>
                    ${this.vectorToHTML(this.available, 'Available')}
                </div>
            </div>
        `;
    }

    displayNeedCalculation() {
        let html = '<div class="formula"><strong>Formula:</strong> Need[i][j] = Max[i][j] - Allocation[i][j]</div>';
        
        html += '<div class="matrix-display">';
        html += '<div class="matrix-container">';
        html += '<h4><i class="fas fa-calculator"></i> Step-by-Step Calculation</h4>';
        
        for (let i = 0; i < this.processes; i++) {
            html += `<div class="formula"><strong>Process P${i}:</strong><br>`;
            for (let j = 0; j < this.resources; j++) {
                html += `Need[${i}][${j}] = Max[${i}][${j}] - Allocation[${i}][${j}] = ${this.max[i][j]} - ${this.allocation[i][j]} = <strong>${this.need[i][j]}</strong>`;
                if (j < this.resources - 1) html += '<br>';
            }
            html += '</div>';
        }
        
        html += '</div>';
        html += '<div class="matrix-container">';
        html += '<h4><i class="fas fa-table"></i> Resulting Need Matrix</h4>';
        html += '<p style="color: var(--text-muted); margin-bottom: 1rem;">Remaining resource requirements for each process</p>';
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

        steps.push({
            type: 'init',
            message: `<strong>Initialize:</strong> Work = [${work.join(', ')}], Finish = [${finish.map(f => f ? 'T' : 'F').join(', ')}]`
        });

        let found = true;
        let iteration = 1;
        
        while (found && safeSequence.length < this.processes) {
            found = false;
            
            steps.push({
                type: 'iteration',
                message: `<strong>Iteration ${iteration}:</strong> Looking for a process that can execute...`
            });
            
            for (let i = 0; i < this.processes; i++) {
                if (!finish[i]) {
                    let canExecute = true;
                    let needCheck = [];
                    
                    for (let j = 0; j < this.resources; j++) {
                        const check = this.need[i][j] <= work[j];
                        needCheck.push(`${this.need[i][j]} ≤ ${work[j]} ${check ? '✅' : '❌'}`);
                        if (!check) {
                            canExecute = false;
                        }
                    }
                    
                    if (canExecute) {
                        const oldWork = [...work];
                        // Execute process i
                        for (let j = 0; j < this.resources; j++) {
                            work[j] += this.allocation[i][j];
                        }
                        finish[i] = true;
                        safeSequence.push(i);
                        found = true;
                        
                        steps.push({
                            type: 'success',
                            message: `<strong>✅ Process P${i} can execute:</strong><br>Need[${i}] ≤ Work: [${needCheck.join(', ')}]<br>Execute P${i}: Work = [${oldWork.join(', ')}] + [${this.allocation[i].join(', ')}] = [${work.join(', ')}]`
                        });
                        break;
                    } else {
                        steps.push({
                            type: 'fail',
                            message: `❌ Process P${i} cannot execute: Need[${i}] = [${this.need[i].join(', ')}], Work = [${work.join(', ')}]`
                        });
                    }
                }
            }
            iteration++;
        }

        return {
            isSafe: safeSequence.length === this.processes,
            safeSequence: safeSequence,
            steps: steps
        };
    }

    displaySafetyCheck(result) {
        let html = '<div class="formula"><strong>Safety Algorithm Process:</strong></div>';
        
        result.steps.forEach(step => {
            let className = 'formula';
            if (step.type === 'success') className += ' status-safe';
            else if (step.type === 'fail') className += ' status-unsafe';
            
            html += `<div class="${className}">${step.message}</div>`;
        });

        if (result.isSafe) {
            html += `
                <div class="status-indicator status-safe">
                    <i class="fas fa-check-circle"></i>
                    <div>
                        <strong>System is in SAFE state</strong>
                        <div style="font-size: 0.9rem; opacity: 0.9;">No deadlock possible with current allocation</div>
                    </div>
                </div>
                <div class="safe-sequence">
                    <strong style="color: var(--text-primary); display: block; margin-bottom: 0.5rem;">Safe Execution Sequence:</strong>
                    <div class="sequence">P${result.safeSequence.join(' → P')}</div>
                </div>
            `;
        } else {
            html += `
                <div class="status-indicator status-unsafe">
                    <i class="fas fa-exclamation-triangle"></i>
                    <div>
                        <strong>System is in UNSAFE state</strong>
                        <div style="font-size: 0.9rem; opacity: 0.9;">Potential deadlock detected!</div>
                    </div>
                </div>
            `;
        }

        return html;
    }

    processRequest() {
        if (!this.readInputData()) {
            return;
        }

        try {
            this.calculateNeed();

            const processId = parseInt(document.getElementById('requestProcess').value);
            const request = [];
            for (let i = 0; i < this.resources; i++) {
                request[i] = parseInt(document.getElementById(`request_${i}`).value) || 0;
            }

            // Hide request input and show results
            this.hideSection('requestInputSection');
            this.showSection('resultsSection');

            let resultsHTML = '';
            
            // Step 1: Show request
            resultsHTML += this.createStep(
                1,
                'Resource Request Details',
                'Analyzing the incoming resource request',
                `<div class="formula"><strong>Request:</strong> Process P${processId} requests [${request.join(', ')}] resources</div>`
            );

            // Step 2: Check if request ≤ need
            let needCheck = true;
            let needCheckHTML = '<div class="formula"><strong>Validation 1:</strong> Request ≤ Need (Process cannot request more than its remaining need)</div>';
            for (let i = 0; i < this.resources; i++) {
                const valid = request[i] <= this.need[processId][i];
                needCheck = needCheck && valid;
                needCheckHTML += `<div class="formula">R${i}: ${request[i]} ≤ ${this.need[processId][i]} ${valid ? '✅' : '❌'}</div>`;
            }

            resultsHTML += this.createStep(
                2,
                'Need Validation Check',
                'Verify that the request does not exceed the process\'s declared maximum need',
                needCheckHTML + `<div class="status-indicator ${needCheck ? 'status-safe' : 'status-unsafe'}">
                    <i class="fas fa-${needCheck ? 'check' : 'times'}-circle"></i>
                    <div>
                        <strong>Request ≤ Need: ${needCheck ? 'VALID' : 'INVALID'}</strong>
                        <div style="font-size: 0.9rem; opacity: 0.9;">${needCheck ? 'Process is not requesting more than declared' : 'Process is requesting more than its maximum claim'}</div>
                    </div>
                </div>`
            );

            if (!needCheck) {
                resultsHTML += this.createStep(
                    3,
                    'Final Decision',
                    'Request evaluation completed',
                    `<div class="status-indicator status-denied">
                        <i class="fas fa-times-circle"></i>
                        <div>
                            <strong>Request DENIED</strong>
                            <div style="font-size: 0.9rem; opacity: 0.9;">Exceeds maximum declared need</div>
                        </div>
                    </div>`
                );
                this.displayResults(resultsHTML);
                return;
            }

            // Step 3: Check if request ≤ available
            let availableCheck = true;
            let availableCheckHTML = '<div class="formula"><strong>Validation 2:</strong> Request ≤ Available (System has enough resources)</div>';
            for (let i = 0; i < this.resources; i++) {
                const valid = request[i] <= this.available[i];
                availableCheck = availableCheck && valid;
                availableCheckHTML += `<div class="formula">R${i}: ${request[i]} ≤ ${this.available[i]} ${valid ? '✅' : '❌'}</div>`;
            }

            resultsHTML += this.createStep(
                3,
                'Resource Availability Check',
                'Verify that sufficient resources are currently available',
                availableCheckHTML + `<div class="status-indicator ${availableCheck ? 'status-safe' : 'status-unsafe'}">
                    <i class="fas fa-${availableCheck ? 'check' : 'times'}-circle"></i>
                    <div>
                        <strong>Request ≤ Available: ${availableCheck ? 'VALID' : 'INVALID'}</strong>
                        <div style="font-size: 0.9rem; opacity: 0.9;">${availableCheck ? 'Sufficient resources are available' : 'Insufficient resources currently available'}</div>
                    </div>
                </div>`
            );

            if (!availableCheck) {
                resultsHTML += this.createStep(
                    4,
                    'Final Decision',
                    'Request evaluation completed',
                    `<div class="status-indicator status-denied">
                        <i class="fas fa-times-circle"></i>
                        <div>
                            <strong>Request DENIED</strong>
                            <div style="font-size: 0.9rem; opacity: 0.9;">Insufficient resources available</div>
                        </div>
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
                'Safety Simulation',
                'Simulate the allocation and test if the system remains in a safe state',
                `<div class="formula"><strong>Simulated Changes:</strong></div>
                <div class="formula">New Allocation[${processId}] = [${originalAllocation[processId].join(', ')}] + [${request.join(', ')}] = [${newAllocation[processId].join(', ')}]</div>
                <div class="formula">New Available = [${originalAvailable.join(', ')}] - [${request.join(', ')}] = [${newAvailable.join(', ')}]</div>
                <br>
                ${this.displaySafetyCheck(safetyResult)}`
            );

            // Step 5: Final decision
            if (safetyResult.isSafe) {
                resultsHTML += this.createStep(
                    5,
                    'Final Decision',
                    'All checks passed - request can be safely granted',
                    `<div class="status-indicator status-granted">
                        <i class="fas fa-check-circle"></i>
                        <div>
                            <strong>Request GRANTED</strong>
                            <div style="font-size: 0.9rem; opacity: 0.9;">System remains in safe state after allocation</div>
                        </div>
                    </div>`
                );
            } else {
                resultsHTML += this.createStep(
                    5,
                    'Final Decision',
                    'Safety check failed - request must be denied',
                    `<div class="status-indicator status-denied">
                        <i class="fas fa-times-circle"></i>
                        <div>
                            <strong>Request DENIED</strong>
                            <div style="font-size: 0.9rem; opacity: 0.9;">Would lead to unsafe state (potential deadlock)</div>
                        </div>
                    </div>`
                );
            }

            // Restore original state
            this.allocation = originalAllocation;
            this.available = originalAvailable;
            this.need = originalNeed;

            this.displayResults(resultsHTML);
            this.showNotification('Request analysis completed!', 'success');
        } catch (error) {
            this.showNotification('Request analysis failed: ' + error.message, 'error');
        }
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

    showSection(sectionId) {
        const section = document.getElementById(sectionId);
        section.style.display = 'block';
        section.classList.add('fade-in');
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    hideSection(sectionId) {
        const section = document.getElementById(sectionId);
        section.style.display = 'none';
    }

    displayResults(html) {
        document.getElementById('resultsContent').innerHTML = html;
        this.showSection('resultsSection');
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        // Add styles for notification
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            background: var(--bg-card);
            border: 1px solid var(--${type === 'success' ? 'success' : type === 'error' ? 'error' : 'accent-primary'});
            border-radius: 8px;
            color: var(--${type === 'success' ? 'success' : type === 'error' ? 'error' : 'text-primary'});
            box-shadow: 0 8px 32px var(--shadow);
            z-index: 1000;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            animation: slideIn 0.3s ease-out;
            max-width: 400px;
        `;
        
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Add notification animations to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new BankersAlgorithm();
});