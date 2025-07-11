class BrainFuckInterpreter {
    constructor() {
        this.tape = new Uint8Array(30000);
        this.pointer = 0;
        this.programCounter = 0;
        this.code = '';
        this.bfCharToOriginalPosMap = [];
        this.running = false;
        this.stepping = false;
        this.output = '';
        this.executionSpeed = 200;
        this.currentLine = -1;
        this.showLineExecution = false;
        this.autoStep = true;
        this.showMemory = true;
        this.tapeDisplaySize = 20;
        this.stepTimeout = null;
        this.bracketMap = {};
        this.isPaused = false;
    }

    reset() {
        this.tape = new Uint8Array(30000);
        this.pointer = 0;
        this.programCounter = 0;
        this.bfCharToOriginalPosMap = [];
        this.running = false;
        this.stepping = false;
        this.output = '';
        this.currentLine = -1;
        this.bracketMap = {};
        this.isPaused = false;
        if (this.stepTimeout) {
            clearTimeout(this.stepTimeout);
            this.stepTimeout = null;
        }
        this.updateOutput();
        this.updateMemoryDisplay();
        this.updateLineHighlight();
    }

    parseCode(code) {
        // Decode HTML entities
        const textarea = document.createElement('textarea');
        textarea.innerHTML = code;
        const decodedCode = textarea.value;
        
        this.code = '';
        this.bfCharToOriginalPosMap = [];
        
        // Parse code and build mapping
        const lines = decodedCode.split('\n');
        for (let lineNum = 0; lineNum < lines.length; lineNum++) {
            const line = lines[lineNum];
            for (let charPos = 0; charPos < line.length; charPos++) {
                const char = line[charPos];
                if ('><+-.,[]'.includes(char)) {
                    this.code += char;
                    this.bfCharToOriginalPosMap.push(lineNum);
                }
            }
        }
        
        this.reset();
        this.buildBracketMap();
    }

    buildBracketMap() {
        const stack = [];
        for (let i = 0; i < this.code.length; i++) {
            if (this.code[i] === '[') {
                stack.push(i);
            } else if (this.code[i] === ']') {
                if (stack.length > 0) {
                    const start = stack.pop();
                    this.bracketMap[start] = i;
                    this.bracketMap[i] = start;
                }
            }
        }
    }

    executeSymbol(symbol) {
        switch(symbol) {
            case '>':
                this.pointer = (this.pointer + 1) % 30000;
                break;
            case '<':
                this.pointer = (this.pointer - 1 + 30000) % 30000;
                break;
            case '+':
                this.tape[this.pointer] = (this.tape[this.pointer] + 1) % 256;
                break;
            case '-':
                this.tape[this.pointer] = (this.tape[this.pointer] - 1 + 256) % 256;
                break;
            case '.':
                this.output += String.fromCharCode(this.tape[this.pointer]);
                this.updateOutput();
                break;
            case ',':
                const input = prompt('Enter a character:');
                if (input && input.length > 0) {
                    this.tape[this.pointer] = input.charCodeAt(0) % 256;
                } else {
                    this.tape[this.pointer] = 0;
                }
                break;
            case '[':
                if (this.tape[this.pointer] === 0) {
                    this.programCounter = this.bracketMap[this.programCounter] || this.programCounter;
                }
                break;
            case ']':
                if (this.tape[this.pointer] !== 0) {
                    this.programCounter = this.bracketMap[this.programCounter] || this.programCounter;
                }
                break;
        }
    }

    step() {
        if (!this.running || this.programCounter >= this.code.length) {
            this.running = false;
            this.stepping = false;
            this.isPaused = false;
            this.currentLine = -1;
            this.updateLineHighlight();
            this.updateMemoryDisplay();
            return;
        }

        const symbol = this.code[this.programCounter];
        this.executeSymbol(symbol);
        
        // Update current line based on mapping
        if (this.programCounter < this.bfCharToOriginalPosMap.length) {
            this.currentLine = this.bfCharToOriginalPosMap[this.programCounter];
        }
        
        this.programCounter++;
        
        this.updateLineHighlight();
        this.updateMemoryDisplay();
        
        if (this.running && this.autoStep && !this.stepping) {
            this.stepTimeout = setTimeout(() => this.step(), this.executionSpeed);
        }
    }

    run() {
        if (this.isPaused) {
            // Continue from where we left off
            this.running = true;
            this.isPaused = false;
            if (this.autoStep) {
                this.step();
            }
        } else {
            // Fresh start
            const code = document.getElementById('code-editor').value;
            this.parseCode(code);
            this.running = true;
            if (this.autoStep) {
                this.step();
            }
        }
    }

    singleStep() {
        // Stop any auto-stepping
        this.stop();
        
        if (!this.code || this.programCounter >= this.code.length) {
            const code = document.getElementById('code-editor').value;
            this.parseCode(code);
            this.running = true;
        } else if (!this.running) {
            this.running = true;
        }
        
        this.stepping = true;
        this.step();
        this.isPaused = true;
    }

    stop() {
        this.running = false;
        this.stepping = false;
        this.isPaused = true;
        if (this.stepTimeout) {
            clearTimeout(this.stepTimeout);
            this.stepTimeout = null;
        }
    }

    updateOutput() {
        const outputElement = document.getElementById('output-text');
        outputElement.textContent = this.output || '';
    }

    updateLineHighlight() {
        if (!this.showLineExecution || this.currentLine === -1) {
            // Clear all highlights
            const lineNumbers = document.getElementById('line-numbers');
            const children = lineNumbers.children;
            for (let child of children) {
                child.classList.remove('current-line');
            }
            return;
        }
        
        const lineNumbers = document.getElementById('line-numbers');
        const children = lineNumbers.children;
        
        // Remove previous highlights
        for (let child of children) {
            child.classList.remove('current-line');
        }
        
        // Add highlight to current line
        if (children[this.currentLine]) {
            children[this.currentLine].classList.add('current-line');
        }
    }

    updateMemoryDisplay() {
        const memorySection = document.getElementById('memory-section');
        
        if (!this.showMemory) {
            memorySection.classList.add('hidden');
            return;
        }

        memorySection.classList.remove('hidden');
        const memoryDisplay = document.getElementById('memory-display');
        memoryDisplay.innerHTML = '';

        // Calculate range to display
        const halfSize = Math.floor(this.tapeDisplaySize / 2);
        const start = Math.max(0, this.pointer - halfSize);
        const end = Math.min(30000, start + this.tapeDisplaySize);

        // Create memory cells
        for (let i = start; i < end; i++) {
            const cell = document.createElement('div');
            cell.className = 'memory-cell';
            if (i === this.pointer) {
                cell.classList.add('active-cell');
            }
            cell.innerHTML = `
                <div class="cell-index">${i}</div>
                <div class="cell-value">${this.tape[i]}</div>
            `;
            memoryDisplay.appendChild(cell);
        }

        // Update pointer indicator
        const pointerIndicator = document.getElementById('pointer-indicator');
        if (pointerIndicator) {
            pointerIndicator.textContent = `Pointer: ${this.pointer}, Value: ${this.tape[this.pointer]}`;
        }
    }
}

// Initialize the interpreter
const interpreter = new BrainFuckInterpreter();

// Update line numbers
function updateLineNumbers() {
    const codeEditor = document.getElementById('code-editor');
    const lineNumbers = document.getElementById('line-numbers');
    const lines = codeEditor.value.split('\n');
    
    lineNumbers.innerHTML = '';
    for (let i = 0; i < lines.length; i++) {
        const lineNumber = document.createElement('div');
        lineNumber.textContent = i + 1;
        lineNumbers.appendChild(lineNumber);
    }
}

// Control buttons
document.getElementById('run-btn').addEventListener('click', () => {
    interpreter.run();
});

document.getElementById('step-btn').addEventListener('click', () => {
    interpreter.singleStep();
});

document.getElementById('stop-btn').addEventListener('click', () => {
    interpreter.stop();
});

document.getElementById('reset-btn').addEventListener('click', () => {
    interpreter.reset();
});

// Settings toggle
document.getElementById('toggle-settings').addEventListener('click', () => {
    const settingsPanel = document.getElementById('settings-panel');
    settingsPanel.classList.toggle('show');
});

// Info modal
const modal = document.getElementById('info-modal');
const infoBtn = document.getElementById('info-btn');
const closeBtn = document.getElementById('close-modal');

infoBtn.addEventListener('click', () => {
    modal.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Settings
document.getElementById('show-line-execution').addEventListener('change', (e) => {
    interpreter.showLineExecution = e.target.checked;
    interpreter.updateLineHighlight();
});

document.getElementById('auto-step').addEventListener('change', (e) => {
    interpreter.autoStep = e.target.checked;
});

document.getElementById('show-memory').addEventListener('change', (e) => {
    interpreter.showMemory = e.target.checked;
    interpreter.updateMemoryDisplay();
});

document.getElementById('execution-speed').addEventListener('input', (e) => {
    interpreter.executionSpeed = parseInt(e.target.value);
    document.getElementById('speed-value').textContent = e.target.value + 'ms';
});

// Code editor events
document.getElementById('code-editor').addEventListener('input', updateLineNumbers);
document.getElementById('code-editor').addEventListener('scroll', () => {
    const codeEditor = document.getElementById('code-editor');
    const lineNumbers = document.getElementById('line-numbers');
    lineNumbers.scrollTop = codeEditor.scrollTop;
});

// Initialize line numbers and displays
updateLineNumbers();
interpreter.updateOutput();
interpreter.updateMemoryDisplay();