// Theme management
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Theme constants
const LIGHT_THEME = 'light-theme';
const DARK_THEME = 'dark-theme';

// Initialize theme
function initializeTheme() {
    // Check saved theme preference
    const savedTheme = localStorage.getItem('theme');
    
    // If no preference, use dark theme by default
    const currentTheme = savedTheme || DARK_THEME;
    
    // Apply theme
    body.classList.remove(LIGHT_THEME, DARK_THEME);
    body.classList.add(currentTheme);
    
    // Update theme icon
    updateThemeIcon(currentTheme);
    
    // Log current theme for debugging
    console.log('Initialized theme:', currentTheme);
}

// Update theme icon based on current theme
function updateThemeIcon(currentTheme) {
    const icon = themeToggle.querySelector('.icon');
    
    // Clear existing elements
    while (icon.firstChild) {
        icon.removeChild(icon.firstChild);
    }

    if (currentTheme === LIGHT_THEME) {
        // Create moon path
        const moonPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        moonPath.setAttribute('fill', 'currentColor');
        moonPath.setAttribute('d', 'M40 32a14 14 0 1 1-18-13 16 16 0 1 0 18 13z');
        icon.appendChild(moonPath);
    } else {
        // Create sun elements
        const sunCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        sunCircle.setAttribute('cx', '32');
        sunCircle.setAttribute('cy', '32');
        sunCircle.setAttribute('r', '14');
        sunCircle.setAttribute('fill', 'currentColor');
        icon.appendChild(sunCircle);

        // Create sun rays
        const createRay = (x1, y1, x2, y2) => {
            const ray = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            ray.setAttribute('x1', x1);
            ray.setAttribute('y1', y1);
            ray.setAttribute('x2', x2);
            ray.setAttribute('y2', y2);
            ray.setAttribute('stroke', 'currentColor');
            ray.setAttribute('stroke-width', '3');
            ray.setAttribute('stroke-linecap', 'round');
            icon.appendChild(ray);
        };

        // Add all sun rays
        createRay(32, 4, 32, 14);
        createRay(32, 50, 32, 60);
        createRay(4, 32, 14, 32);
        createRay(50, 32, 60, 32);
        createRay(14, 14, 20, 20);
        createRay(44, 44, 50, 50);
        createRay(14, 50, 20, 44);
        createRay(44, 20, 50, 14);
    }
}

// Toggle theme
function toggleTheme() {
    // Get current theme
    const currentTheme = body.classList.contains(LIGHT_THEME) ? LIGHT_THEME : DARK_THEME;
    // Determine next theme
    const nextTheme = currentTheme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME;
    
    // Remove both theme classes
    body.classList.remove(LIGHT_THEME, DARK_THEME);
    // Add new theme class
    body.classList.add(nextTheme);
    
    // Update icon
    updateThemeIcon(nextTheme);
    
    // Save theme preference
    localStorage.setItem('theme', nextTheme);
    
    // Show toast notification
    showToast(`Switched to ${nextTheme}`);
}

// Initialize theme when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeTheme);

// Add click event to theme toggle
themeToggle.addEventListener('click', toggleTheme);
