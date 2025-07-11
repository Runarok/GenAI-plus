class BrainFuckInterpreter {
    constructor() {
        this.tape = new Uint8Array(30000);
        this.pointer = 0;
        this.programCounter = 0;
        this.code = '';
        this.running = false;
        this.stepping = false;
        this.output = '';
        this.executionSpeed = 200;
        this.currentLine = 0;
        this.showLineExecution = false;
        this.autoStep = true;
        this.stepTimeout = null;
        this.bracketMap = {};
    }

    reset() {
        this.tape = new Uint8Array(30000);
        this.pointer = 0;
        this.programCounter = 0;
        this.running = false;
        this.stepping = false;
        this.output = '';
        this.currentLine = 0;
        this.bracketMap = {};
        if (this.stepTimeout) {
            clearTimeout(this.stepTimeout);
            this.stepTimeout = null;
        }
        this.updateOutput();
    }

    parseCode(code) {
        // Decode HTML entities
        const textarea = document.createElement('textarea');
        textarea.innerHTML = code;
        const decodedCode = textarea.value;
        
        this.code = decodedCode.replace(/[^><+\-.,\[\]]/g, ''); // Keep only valid BrainFuck commands
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
            return;
        }

        const symbol = this.code[this.programCounter];
        this.executeSymbol(symbol);
        this.programCounter++;
        
        this.updateLineHighlight();
        
        if (this.running && this.autoStep && !this.stepping) {
            this.stepTimeout = setTimeout(() => this.step(), this.executionSpeed);
        }
    }

    run() {
        this.running = true;
        this.stepping = false;
        if (this.autoStep) {
            this.step();
        }
    }

    singleStep() {
        if (!this.running) {
            const code = document.getElementById('code-editor').value;
            this.parseCode(code);
            this.running = true;
        }
        this.stepping = true;
        this.step();
    }

    stop() {
        this.running = false;
        this.stepping = false;
        if (this.stepTimeout) {
            clearTimeout(this.stepTimeout);
            this.stepTimeout = null;
        }
    }

    updateOutput() {
        const outputElement = document.getElementById('output-text');
        outputElement.textContent = this.output;
        outputElement.style.display = this.output ? 'block' : 'none';
    }

    updateLineHighlight() {
        if (!this.showLineExecution) return;
        
        const codeEditor = document.getElementById('code-editor');
        const code = codeEditor.value;
        let lineNumber = 0;
        let charCount = 0;
        
        for (let i = 0; i < this.programCounter && i < code.length; i++) {
            if (code[i] === '\n') {
                lineNumber++;
            }
        }
        
        this.currentLine = lineNumber;
        
        const lineNumbers = document.getElementById('line-numbers');
        const children = lineNumbers.children;
        
        // Remove previous highlights
        for (let child of children) {
            child.style.backgroundColor = '';
            child.style.color = '';
        }
        
        // Add highlight to current line
        if (children[this.currentLine]) {
            children[this.currentLine].style.backgroundColor = '#ffff00';
            children[this.currentLine].style.color = '#000000';
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
    const code = document.getElementById('code-editor').value;
    interpreter.parseCode(code);
    interpreter.run();
});

document.getElementById('step-btn').addEventListener('click', () => {
    interpreter.singleStep();
});

document.getElementById('stop-btn').addEventListener('click', () => {
    interpreter.stop();
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
});

document.getElementById('auto-step').addEventListener('change', (e) => {
    interpreter.autoStep = e.target.checked;
});

// Code editor events
document.getElementById('code-editor').addEventListener('input', updateLineNumbers);
document.getElementById('code-editor').addEventListener('scroll', () => {
    const codeEditor = document.getElementById('code-editor');
    const lineNumbers = document.getElementById('line-numbers');
    lineNumbers.scrollTop = codeEditor.scrollTop;
});

// Initialize line numbers
updateLineNumbers();

// Initialize output display
interpreter.updateOutput();