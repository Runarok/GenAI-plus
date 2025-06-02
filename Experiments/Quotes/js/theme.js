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
}

// Update theme icon based on current theme
function updateThemeIcon(currentTheme) {
    const icon = themeToggle.querySelector('.icon');
    icon.textContent = currentTheme === LIGHT_THEME ? '🌙' : '☀️';
}

// Toggle theme
function toggleTheme() {
    const currentTheme = body.classList.contains(DARK_THEME) ? LIGHT_THEME : DARK_THEME;
    
    // Remove both theme classes
    body.classList.remove(LIGHT_THEME, DARK_THEME);
    // Add new theme class
    body.classList.add(currentTheme);
    
    // Update icon
    updateThemeIcon(currentTheme);
    
    // Save theme preference
    localStorage.setItem('theme', currentTheme);
    
    // Show toast notification
    showToast(`Switched to ${currentTheme}`);
}

// Initialize theme when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeTheme);

// Add click event to theme toggle
themeToggle.addEventListener('click', toggleTheme);
