    // --- Variables and Setup ---
    const canvas = document.getElementById("sandbox");
    const ctx = canvas.getContext("2d");
    const toolSelect = document.getElementById('tool');
    const colorPicker = document.getElementById('color-picker');
    const brushSizeInput = document.getElementById('brush-size');
    const brushSizeLabel = document.getElementById('brush-size-label');
    const clearBtn = document.getElementById('clear-btn');
    const saveBtn = document.getElementById('save-btn');
    const zoomInput = document.getElementById('zoom');
    const zoomLabel = document.getElementById('zoom-label');

    // --- Settings ---
    const BASE_PARTICLE_SIZE = 7; // px, logical grid size
    const MIN_PARTICLE_SIZE = 5;
    const MAX_PARTICLE_SIZE = 16;
    let zoom = parseInt(zoomInput.value); // 1x, 2x, etc.

    // --- State ---
    let brushSize = parseInt(brushSizeInput.value);
    let selectedColor = colorPicker.value;
    let tool = toolSelect.value; // 'sand', 'erase', 'color'
    let paused = false,
        isMousePressed = false;
    let grid = [],
        gridWidth, gridHeight, particleColors = [];
    let needsResize = false;

    // --- Resize and Grid ---
    function resizeCanvas(keepData = false) {
        // Logical grid size is always the same, only particle size changes
        const particleSize = BASE_PARTICLE_SIZE * zoom;
        gridWidth = Math.floor(window.innerWidth / particleSize);
        gridHeight = Math.floor((window.innerHeight - 54) / particleSize);
        // Resize canvas to fit the grid exactly, scaling up
        canvas.width = gridWidth * particleSize;
        canvas.height = gridHeight * particleSize;
        if (keepData && grid.length && particleColors.length) {
            // Keep sand and colors; shrink/grow with cropping or filling as needed
            grid.length = gridHeight;
            particleColors.length = gridHeight;
            for (let y = 0; y < gridHeight; y++) {
                if (!grid[y]) grid[y] = Array(gridWidth).fill(0);
                else grid[y].length = gridWidth;
                if (!particleColors[y]) particleColors[y] = Array(gridWidth).fill(null);
                else particleColors[y].length = gridWidth;
            }
        } else {
            grid = Array.from({
                length: gridHeight
            }, () => Array(gridWidth).fill(0));
            particleColors = Array.from({
                length: gridHeight
            }, () => Array(gridWidth).fill(null));
        }
        needsResize = false;
        draw();
    }

    window.addEventListener("resize", () => {
        needsResize = true;
    });

    // --- Sand Simulation ---
    function updateSand() {
        // Traverse bottom-up and randomize direction for each row
        for (let y = gridHeight - 2; y >= 0; y--) {
            let xOrder = [];
            for (let x = 0; x < gridWidth; x++) xOrder.push(x);
            if (Math.random() < 0.5) xOrder.reverse();
            for (const x of xOrder) {
                if (grid[y][x] === 1) {
                    // Down
                    if (y + 1 < gridHeight && grid[y + 1][x] === 0) {
                        grid[y + 1][x] = 1;
                        grid[y][x] = 0;
                        particleColors[y + 1][x] = particleColors[y][x];
                        particleColors[y][x] = null;
                    } else {
                        // Diagonals (random order to avoid bias)
                        let dirs = Math.random() < 0.5 ? [-1, 1] : [1, -1];
                        let moved = false;
                        for (const dx of dirs) {
                            if (
                                x + dx >= 0 && x + dx < gridWidth &&
                                y + 1 < gridHeight && grid[y + 1][x + dx] === 0
                            ) {
                                grid[y + 1][x + dx] = 1;
                                grid[y][x] = 0;
                                particleColors[y + 1][x + dx] = particleColors[y][x];
                                particleColors[y][x] = null;
                                moved = true;
                                break;
                            }
                        }
                        // No horizontal sliding if stuck (like pixel art)
                    }
                }
            }
        }
    }

    // --- Drawing ---
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const particleSize = BASE_PARTICLE_SIZE * zoom;
        for (let y = 0; y < gridHeight; y++) {
            for (let x = 0; x < gridWidth; x++) {
                if (grid[y][x] === 1) {
                    ctx.fillStyle = particleColors[y][x] || selectedColor;
                    ctx.fillRect(x * particleSize, y * particleSize, particleSize, particleSize);
                }
            }
        }
    }

    // --- Sand Placement/Brushes ---
    function canvasToGrid(e) {
        const rect = canvas.getBoundingClientRect();
        const particleSize = BASE_PARTICLE_SIZE * zoom;
        const x = Math.floor((e.clientX - rect.left) / particleSize);
        const y = Math.floor((e.clientY - rect.top) / particleSize);
        return {
            x,
            y
        };
    }

    function paintAt(x, y) {
        for (let dy = -brushSize + 1; dy < brushSize; dy++) {
            for (let dx = -brushSize + 1; dx < brushSize; dx++) {
                if (dx * dx + dy * dy <= brushSize * brushSize) {
                    let nx = x + dx,
                        ny = y + dy;
                    if (nx >= 0 && nx < gridWidth && ny >= 0 && ny < gridHeight) {
                        if (tool === 'sand') {
                            grid[ny][nx] = 1;
                            particleColors[ny][nx] = selectedColor;
                        } else if (tool === 'erase') {
                            grid[ny][nx] = 0;
                            particleColors[ny][nx] = null;
                        } else if (tool === 'color' && grid[ny][nx] === 1) {
                            particleColors[ny][nx] = selectedColor;
                        }
                    }
                }
            }
        }
    }

    canvas.addEventListener("mousedown", (e) => {
        isMousePressed = true;
        const {
            x,
            y
        } = canvasToGrid(e);
        paintAt(x, y);
        draw();
    });
    document.addEventListener("mouseup", () => {
        isMousePressed = false;
    });
    canvas.addEventListener("mousemove", (e) => {
        if (!isMousePressed) return;
        const {
            x,
            y
        } = canvasToGrid(e);
        paintAt(x, y);
        draw();
    });

    // --- Controls ---
    toolSelect.addEventListener('change', e => {
        tool = e.target.value;
    });
    colorPicker.addEventListener('input', e => {
        selectedColor = e.target.value;
    });
    brushSizeInput.addEventListener('input', e => {
        brushSize = parseInt(e.target.value);
        brushSizeLabel.textContent = brushSize;
    });

    clearBtn.addEventListener('click', () => {
        grid = Array.from({
            length: gridHeight
        }, () => Array(gridWidth).fill(0));
        particleColors = Array.from({
            length: gridHeight
        }, () => Array(gridWidth).fill(null));
        draw();
    });

    saveBtn.addEventListener('click', () => {
        // Remove toolbar for screenshot
        saveBtn.blur();
        canvas.toBlob(blob => {
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = 'sand_pixel_art.png';
            a.click();
        });
    });

    zoomInput.addEventListener('input', e => {
        zoom = parseInt(e.target.value);
        zoomLabel.textContent = zoom + 'x';
        resizeCanvas(true);
        draw();
    });

    // --- Keyboard Shortcuts ---
    document.addEventListener('keydown', e => {
        if (e.code === 'Space') paused = !paused;
        else if (e.key.toLowerCase() === 'c') {
            grid = Array.from({
                length: gridHeight
            }, () => Array(gridWidth).fill(0));
            particleColors = Array.from({
                length: gridHeight
            }, () => Array(gridWidth).fill(null));
            draw();
        } else if (e.key.toLowerCase() === 's') {
            saveBtn.click();
        }
    });

    // --- Main Loop ---
    function step() {
        if (needsResize) resizeCanvas(true);
        if (!paused) updateSand();
        draw();
        requestAnimationFrame(step);
    }

    // --- Initialize ---
    brushSizeLabel.textContent = brushSize;
    zoomLabel.textContent = zoom + 'x';
    resizeCanvas();
    step();