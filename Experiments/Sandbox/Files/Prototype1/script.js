    const canvas = document.getElementById("sandbox");
    const ctx = canvas.getContext("2d");

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Create grid to store sand particles
    const grid = [];
    const particleSize = 10; // Size of each sand particle

    let isMousePressed = false;

    // Initialize grid with empty spaces (0 = empty, 1 = sand)
    function initGrid() {
        for (let y = 0; y < Math.floor(canvas.height / particleSize); y++) {
            grid[y] = [];
            for (let x = 0; x < Math.floor(canvas.width / particleSize); x++) {
                grid[y][x] = 0; // Empty space
            }
        }
    }

    // Function to simulate one step of sand falling
    function updateSand() {
        for (let y = Math.floor(canvas.height / particleSize) - 2; y >= 0; y--) {
            for (let x = 0; x < Math.floor(canvas.width / particleSize); x++) {
                if (grid[y][x] === 1) {
                    // Sand particle is found, check if it can fall
                    if (y + 1 < Math.floor(canvas.height / particleSize) && grid[y + 1][x] === 0) {
                        grid[y + 1][x] = 1;
                        grid[y][x] = 0;
                    }
                    // Check if it can move diagonally left or right
                    else if (x > 0 && grid[y + 1][x - 1] === 0) {
                        grid[y + 1][x - 1] = 1;
                        grid[y][x] = 0;
                    } else if (x < Math.floor(canvas.width / particleSize) - 1 && grid[y + 1][x + 1] === 0) {
                        grid[y + 1][x + 1] = 1;
                        grid[y][x] = 0;
                    }
                }
            }
        }
    }

    // Draw the grid on the canvas
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let y = 0; y < Math.floor(canvas.height / particleSize); y++) {
            for (let x = 0; x < Math.floor(canvas.width / particleSize); x++) {
                if (grid[y][x] === 1) {
                    ctx.fillStyle = "sandybrown";
                    ctx.fillRect(x * particleSize, y * particleSize, particleSize, particleSize);
                }
            }
        }
    }

    // Handle mouse press: start adding sand when mouse is pressed
    canvas.addEventListener("mousedown", (e) => {
        isMousePressed = true;
        addSand(e); // Add sand immediately on click
    });

    // Handle mouse release: stop adding sand when mouse is released
    canvas.addEventListener("mouseup", () => {
        isMousePressed = false;
    });

    // Handle mouse movement: add sand where the mouse is when pressed
    canvas.addEventListener("mousemove", (e) => {
        if (isMousePressed) {
            addSand(e); // Add sand continuously where the mouse is moving
        }
    });

    // Add sand particle at mouse position
    function addSand(e) {
        const rect = canvas.getBoundingClientRect(); // Get canvas coordinates relative to the window
        const x = Math.floor((e.clientX - rect.left) / particleSize);
        const y = Math.floor((e.clientY - rect.top) / particleSize);

        // Add a sand particle at the clicked location if it's inside the canvas bounds
        if (y < Math.floor(canvas.height / particleSize) && x < Math.floor(canvas.width / particleSize)) {
            grid[y][x] = 1; // Add a sand particle at the clicked location
        }
    }

    // Update the simulation in steps
    function step() {
        updateSand();
        draw();
        requestAnimationFrame(step);
    }

    // Initialize grid and start the simulation
    initGrid();
    step();