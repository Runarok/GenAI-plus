class SymbolicInterpreter {
    constructor() {
        this.stack = [];
        this.memory = new Map();
        this.cursor = { x: 0, y: 0 };
        this.programCounter = { x: 0, y: 0 };
        this.code = [];
        this.running = false;
        this.stepping = false;
        this.output = '';
        this.pixels = new Map();
        this.inputBuffer = '';
        this.buttonStates = { up: false, down: false, left: false, right: false };
        this.loopStack = [];
        this.executionSpeed = 200;
        this.currentLine = 0;
        this.showLineExecution = false;
        this.autoStep = true;
        this.showStack = true;
        this.stepTimeout = null;
        
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'ArrowUp': this.buttonStates.up = true; break;
                case 'ArrowDown': this.buttonStates.down = true; break;
                case 'ArrowLeft': this.buttonStates.left = true; break;
                case 'ArrowRight': this.buttonStates.right = true; break;
            }
        });

        document.addEventListener('keyup', (e) => {
            switch(e.key) {
                case 'ArrowUp': this.buttonStates.up = false; break;
                case 'ArrowDown': this.buttonStates.down = false; break;
                case 'ArrowLeft': this.buttonStates.left = false; break;
                case 'ArrowRight': this.buttonStates.right = false; break;
            }
        });
    }

    reset() {
        this.stack = [];
        this.memory.clear();
        this.cursor = { x: 0, y: 0 };
        this.programCounter = { x: 0, y: 0 };
        this.running = false;
        this.stepping = false;
        this.output = '';
        this.pixels.clear();
        this.loopStack = [];
        this.currentLine = 0;
        if (this.stepTimeout) {
            clearTimeout(this.stepTimeout);
            this.stepTimeout = null;
        }
        this.clearCanvas();
        this.updateDisplay();
        this.updateOutput();
    }

    parseCode(code) {
        // Decode HTML entities
        const textarea = document.createElement('textarea');
        textarea.innerHTML = code;
        const decodedCode = textarea.value;
        
        this.code = decodedCode.split('\n').map(line => line.split(''));
        this.reset();
    }

    executeSymbol(symbol) {
        switch(symbol) {
            case '>': this.cursor.x++; break;
            case '<': this.cursor.x--; break;
            case '^': this.cursor.y--; break;
            case 'v': this.cursor.y++; break;
            case '#': this.drawBlock(); break;
            case '.': this.tick(); break;
            case ':': this.duplicate(); break;
            case '~': this.negate(); break;
            case '+': this.push(1); break;
            case '-': this.pop(); break;
            case '[': this.beginLoop(); break;
            case ']': this.endLoop(); break;
            case '/': this.checkInputLeft(); break;
            case '\\': this.checkInputRight(); break;
            case '@': this.outputChar(); break;
            case '$': this.outputNum(); break;
            case '{': this.setMemory(); break;
            case '}': this.getMemory(); break;
            case '_': this.horizontalBar(); break;
            case '=': this.conditionalJump(); break;
            case '%': this.randomOp(); break;
            case '&': this.swap(); break;
            case ';': this.endInstruction(); break;
            case '!': this.handleBind(); break;
        }
    }

    drawBlock() {
        const key = `${this.cursor.x},${this.cursor.y}`;
        this.pixels.set(key, { x: this.cursor.x, y: this.cursor.y });
        this.renderPixel(this.cursor.x, this.cursor.y);
    }

    tick() {
        this.updateDisplay();
    }

    duplicate() {
        if (this.stack.length > 0) {
            this.stack.push(this.stack[this.stack.length - 1]);
        }
    }

    negate() {
        if (this.stack.length > 0) {
            this.stack[this.stack.length - 1] = -this.stack[this.stack.length - 1];
        }
    }

    push(value) {
        this.stack.push(value);
    }

    pop() {
        return this.stack.pop() || 0;
    }

    beginLoop() {
        this.loopStack.push({
            x: this.programCounter.x,
            y: this.programCounter.y,
            condition: this.stack.length > 0 ? this.stack[this.stack.length - 1] : 0
        });
    }

    endLoop() {
        if (this.loopStack.length > 0) {
            const loop = this.loopStack[this.loopStack.length - 1];
            if (this.stack.length > 0 && this.stack[this.stack.length - 1] !== 0) {
                this.programCounter.x = loop.x;
                this.programCounter.y = loop.y;
            } else {
                this.loopStack.pop();
            }
        }
    }

    checkInputLeft() {
        this.push(this.buttonStates.left ? 1 : 0);
    }

    checkInputRight() {
        this.push(this.buttonStates.right ? 1 : 0);
    }

    outputChar() {
        const value = this.pop();
        if (value >= 0 && value <= 1114111) { // Valid Unicode range
            this.output += String.fromCharCode(value);
            this.updateOutput();
        }
    }

    outputNum() {
        const value = this.pop();
        this.output += value.toString();
        this.updateOutput();
    }

    setMemory() {
        const value = this.pop();
        const key = `${this.cursor.x},${this.cursor.y}`;
        this.memory.set(key, value);
    }

    getMemory() {
        const key = `${this.cursor.x},${this.cursor.y}`;
        this.push(this.memory.get(key) || 0);
    }

    horizontalBar() {
        // Draw horizontal line
        for (let i = 0; i < 10; i++) {
            const key = `${this.cursor.x + i},${this.cursor.y}`;
            this.pixels.set(key, { x: this.cursor.x + i, y: this.cursor.y });
            this.renderPixel(this.cursor.x + i, this.cursor.y);
        }
    }

    conditionalJump() {
        const condition = this.pop();
        if (condition === 0) {
            this.programCounter.x += 2; // Skip next instruction
        }
    }

    randomOp() {
        this.push(Math.floor(Math.random() * 100));
    }

    swap() {
        if (this.stack.length >= 2) {
            const a = this.stack.pop();
            const b = this.stack.pop();
            this.stack.push(a);
            this.stack.push(b);
        }
    }

    endInstruction() {
        // No operation - just a separator
    }

    handleBind() {
        // Move to next character to get the direction
        this.programCounter.x++;
        if (this.programCounter.x >= this.code[this.programCounter.y].length) {
            this.programCounter.x = 0;
            this.programCounter.y++;
        }
        
        if (this.programCounter.y < this.code.length) {
            const direction = this.code[this.programCounter.y][this.programCounter.x];
            switch(direction) {
                case '^': this.push(this.buttonStates.up ? 1 : 0); break;
                case 'v': this.push(this.buttonStates.down ? 1 : 0); break;
                case '<': this.push(this.buttonStates.left ? 1 : 0); break;
                case '>': this.push(this.buttonStates.right ? 1 : 0); break;
            }
        }
    }

    step() {
        if (!this.running || this.programCounter.y >= this.code.length) {
            this.running = false;
            this.stepping = false;
            return;
        }

        const line = this.code[this.programCounter.y];
        if (this.programCounter.x >= line.length) {
            this.programCounter.x = 0;
            this.programCounter.y++;
            this.currentLine = this.programCounter.y;
            this.updateLineHighlight();
            if (this.programCounter.y >= this.code.length) {
                this.running = false;
                this.stepping = false;
                return;
            }
        }

        if (this.programCounter.y < this.code.length && this.programCounter.x < this.code[this.programCounter.y].length) {
            const symbol = this.code[this.programCounter.y][this.programCounter.x];
            this.executeSymbol(symbol);
            this.programCounter.x++;
        }
        
        this.updateDisplay();
        
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

    renderPixel(x, y) {
        const container = document.getElementById('canvas-container');
        const pixel = document.createElement('div');
        pixel.className = 'pixel';
        pixel.style.left = `${200 + x * 12}px`;
        pixel.style.top = `${100 + y * 12}px`;
        pixel.id = `pixel-${x}-${y}`;
        
        // Remove existing pixel at this position
        const existing = document.getElementById(`pixel-${x}-${y}`);
        if (existing) {
            existing.remove();
        }
        
        container.appendChild(pixel);
    }

    updateDisplay() {
        // Update cursor position
        const cursorIndicator = document.getElementById('cursor-indicator');
        cursorIndicator.style.left = `${200 + this.cursor.x * 12}px`;
        cursorIndicator.style.top = `${100 + this.cursor.y * 12}px`;
        
        // Update stack display
        if (this.showStack) {
            this.updateStackDisplay();
        }
    }

    updateStackDisplay() {
        const stackItems = document.getElementById('stack-items');
        stackItems.innerHTML = '';
        
        for (let i = this.stack.length - 1; i >= 0; i--) {
            const item = document.createElement('div');
            item.className = 'stack-item';
            item.textContent = this.stack[i];
            stackItems.appendChild(item);
        }
    }

    updateOutput() {
        const outputElement = document.getElementById('output-text');
        outputElement.textContent = this.output;
        outputElement.style.display = this.output ? 'block' : 'none';
    }

    updateLineHighlight() {
        if (!this.showLineExecution) return;
        
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

    clearCanvas() {
        const container = document.getElementById('canvas-container');
        const pixels = container.querySelectorAll('.pixel');
        pixels.forEach(pixel => pixel.remove());
        this.pixels.clear();
    }
}

// Initialize the interpreter
const interpreter = new SymbolicInterpreter();
let customStyle = null;

// Tab switching
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        const tabName = tab.dataset.tab;
        
        // Update tab buttons
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // Update tab content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`${tabName}-tab`).classList.add('active');
    });
});

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

// CSS controls
document.getElementById('apply-css-btn').addEventListener('click', () => {
    const cssCode = document.getElementById('css-editor').value;
    
    // Remove existing custom style
    if (customStyle) {
        customStyle.remove();
    }
    
    // Add new custom style
    customStyle = document.createElement('style');
    customStyle.textContent = cssCode;
    document.head.appendChild(customStyle);
});

document.getElementById('clear-css-btn').addEventListener('click', () => {
    if (customStyle) {
        customStyle.remove();
        customStyle = null;
    }
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

document.getElementById('show-stack').addEventListener('change', (e) => {
    interpreter.showStack = e.target.checked;
    const stackDisplay = document.getElementById('stack-display');
    stackDisplay.style.display = e.target.checked ? 'block' : 'none';
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

// Initialize stack display
interpreter.updateStackDisplay();

// Initialize output display
interpreter.updateOutput();