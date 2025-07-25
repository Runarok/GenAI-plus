    // --- Theme System ---
    let isDark = true;
    const themeBtn = document.getElementById('theme-btn');

    function setTheme(dark) {
        isDark = dark;
        document.body.classList.toggle('light', !dark);
        themeBtn.textContent = dark ? "🌙" : "🌞";
    }
    // System/theme preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) setTheme(false);
    if (localStorage.getItem('sand-art-theme') === 'dark') setTheme(true);
    if (localStorage.getItem('sand-art-theme') === 'light') setTheme(false);
    themeBtn.addEventListener('click', () => {
        setTheme(!isDark);
        localStorage.setItem('sand-art-theme', isDark ? 'dark' : 'light');
        draw();
    });

    // --- Canvas/Grid Setup ---
    const BASE_PARTICLE_SIZE = 6;
    const canvas = document.getElementById('sandbox');
    const ctx = canvas.getContext('2d');
    let zoom = 1;
    let gridWidth = 0,
        gridHeight = 0;
    let grid = [],
        colorGrid = [];
    let needsResize = true;

    function resizeCanvas(keepData = false) {
        const container = document.getElementById('sandbox-container');
        const w = container.clientWidth;
        const h = container.clientHeight;
        const pSize = BASE_PARTICLE_SIZE * zoom;
        gridWidth = Math.floor(w / pSize);
        gridHeight = Math.floor(h / pSize);
        canvas.width = gridWidth * pSize;
        canvas.height = gridHeight * pSize;
        // Always fill to edges for no overlap with footer
        if (keepData && grid.length && colorGrid.length) {
            // Preserve as much as possible
            const newGrid = Array.from({
                    length: gridHeight
                }, (_, y) =>
                Array.from({
                    length: gridWidth
                }, (_, x) => (grid[y] && grid[y][x]) || 0)
            );
            const newColorGrid = Array.from({
                    length: gridHeight
                }, (_, y) =>
                Array.from({
                    length: gridWidth
                }, (_, x) => (colorGrid[y] && colorGrid[y][x]) || null)
            );
            grid = newGrid;
            colorGrid = newColorGrid;
        } else {
            grid = Array.from({
                length: gridHeight
            }, () => Array(gridWidth).fill(0));
            colorGrid = Array.from({
                length: gridHeight
            }, () => Array(gridWidth).fill(null));
        }
        needsResize = false;
        draw();
    }
    window.addEventListener('resize', () => {
        needsResize = true;
    });

    // --- Physics ---
    function updateSand() {
        // Classic falling sand, bottom-up, randomize L/R
        for (let y = gridHeight - 2; y >= 0; y--) {
            let xOrder = Array.from({
                length: gridWidth
            }, (_, i) => i);
            if (Math.random() < 0.5) xOrder.reverse();
            for (let x of xOrder) {
                if (grid[y][x] === 1) {
                    // Fall straight
                    if (y + 1 < gridHeight && grid[y + 1][x] === 0) {
                        grid[y + 1][x] = 1;
                        grid[y][x] = 0;
                        colorGrid[y + 1][x] = colorGrid[y][x];
                        colorGrid[y][x] = null;
                    } else {
                        // Diagonal fall
                        let dirs = Math.random() < 0.5 ? [-1, 1] : [1, -1];
                        for (let dx of dirs) {
                            if (x + dx >= 0 && x + dx < gridWidth && y + 1 < gridHeight && grid[y + 1][x + dx] === 0) {
                                grid[y + 1][x + dx] = 1;
                                grid[y][x] = 0;
                                colorGrid[y + 1][x + dx] = colorGrid[y][x];
                                colorGrid[y][x] = null;
                                break;
                            }
                        }
                    }
                }
            }
        }
    }

    // --- Drawing ---
    function draw() {
        // Fill BG for PNG correctness
        ctx.fillStyle = isDark ?
            getComputedStyle(document.body).getPropertyValue('--canvas-bg-dark').trim() || "#1e293b" :
            getComputedStyle(document.body).getPropertyValue('--canvas-bg-light').trim() || "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        const pSize = BASE_PARTICLE_SIZE * zoom;
        for (let y = 0; y < gridHeight; y++)
            for (let x = 0; x < gridWidth; x++)
                if (grid[y][x] === 1) {
                    ctx.fillStyle = colorGrid[y][x] || "#11d0ba";
                    ctx.fillRect(x * pSize, y * pSize, pSize, pSize);
                }
    }

    // --- Sand Placement/Brushes ---
    let selectedColor = "#11d0ba";
    let brushSize = 3;
    let erasing = false;
    let paused = false,
        isMousePressed = false;

    function canvasToGrid(e) {
        const rect = canvas.getBoundingClientRect();
        const pSize = BASE_PARTICLE_SIZE * zoom;
        let cx = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
        let cy = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
        return {
            x: Math.floor(cx / pSize),
            y: Math.floor(cy / pSize)
        };
    }

    function paintAt(x, y) {
        for (let dy = -brushSize + 1; dy < brushSize; dy++) {
            for (let dx = -brushSize + 1; dx < brushSize; dx++) {
                if (dx * dx + dy * dy <= brushSize * brushSize) {
                    let nx = x + dx,
                        ny = y + dy;
                    if (nx >= 0 && nx < gridWidth && ny >= 0 && ny < gridHeight) {
                        if (erasing) {
                            grid[ny][nx] = 0;
                            colorGrid[ny][nx] = null;
                        } else {
                            grid[ny][nx] = 1;
                            colorGrid[ny][nx] = selectedColor;
                        }
                    }
                }
            }
        }
    }

    function updateCoords(x, y) {
        document.getElementById('footer-coords').textContent = `X: ${x}, Y: ${y}`;
    }

    // --- UI Events ---
    document.getElementById('color-picker').addEventListener('input', e => {
        selectedColor = e.target.value;
        erasing = false;
        document.getElementById('eraser-btn').classList.remove('active');
    });
    document.getElementById('brush-size').addEventListener('input', e => {
        brushSize = parseInt(e.target.value);
        document.getElementById('brush-size-label').textContent = brushSize;
    });
    document.getElementById('zoom').addEventListener('input', e => {
        zoom = parseInt(e.target.value);
        document.getElementById('zoom-label').textContent = zoom + 'x';
        needsResize = true;
    });
    document.getElementById('eraser-btn').addEventListener('click', () => {
        erasing = !erasing;
        document.getElementById('eraser-btn').classList.toggle('active', erasing);
    });
    document.getElementById('clear-btn').addEventListener('click', () => {
        grid = Array.from({
            length: gridHeight
        }, () => Array(gridWidth).fill(0));
        colorGrid = Array.from({
            length: gridHeight
        }, () => Array(gridWidth).fill(null));
        draw();
    });
    document.getElementById('save-btn').addEventListener('click', () => {
        draw(); // Ensure fresh
        canvas.toBlob(blob => {
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = 'sand_pixel_art.png';
            a.click();
        });
    });

    // --- Mouse & Touch Events ---
    canvas.addEventListener('mousedown', e => {
        isMousePressed = true;
        const {
            x,
            y
        } = canvasToGrid(e);
        paintAt(x, y);
        draw();
    });
    document.addEventListener('mouseup', () => isMousePressed = false);
    canvas.addEventListener('mousemove', e => {
        const {
            x,
            y
        } = canvasToGrid(e);
        updateCoords(x, y);
        if (isMousePressed) {
            paintAt(x, y);
            draw();
        }
    });
    // Touch
    canvas.addEventListener('touchstart', e => {
        isMousePressed = true;
        const {
            x,
            y
        } = canvasToGrid(e);
        paintAt(x, y);
        draw();
        e.preventDefault();
    }, {
        passive: false
    });
    canvas.addEventListener('touchmove', e => {
        if (!isMousePressed) return;
        const {
            x,
            y
        } = canvasToGrid(e);
        updateCoords(x, y);
        paintAt(x, y);
        draw();
        e.preventDefault();
    }, {
        passive: false
    });
    document.addEventListener('touchend', () => isMousePressed = false);

    // --- Keyboard Shortcuts ---
    document.addEventListener('keydown', e => {
        if (e.code === 'Space') paused = !paused;
        else if (e.key.toLowerCase() === 'c') document.getElementById('clear-btn').click();
        else if (e.key.toLowerCase() === 's') document.getElementById('save-btn').click();
        else if (e.key.toLowerCase() === 't') themeBtn.click();
        else if (e.key.toLowerCase() === 'e') document.getElementById('eraser-btn').click();
        else if ('1234'.includes(e.key)) {
            document.getElementById('zoom').value = e.key;
            zoom = parseInt(e.key);
            document.getElementById('zoom-label').textContent = zoom + 'x';
            needsResize = true;
        }
    });

    // --- Main Loop ---
    function step() {
        if (needsResize) resizeCanvas(true);
        if (!paused) updateSand();
        draw();
        requestAnimationFrame(step);
    }
    // --- Init ---
    setTheme(isDark);
    document.getElementById('zoom-label').textContent = zoom + 'x';
    document.getElementById('brush-size-label').textContent = brushSize;
    resizeCanvas();
    step();