// --- Dynamic Button UI Config ---
const PAGE_CONFIG = {
  header: "Project Limbo: The Graveyard of Optional Resurrection",
  buttons: [
    { label: "AnimeMerch", path: "/AnimeMerch/" },
    { label: "Brainfuck", path: "/Brainfuck/" },
    { label: "Habit Tracker", path: "/Habit Tracker/" },
    { label: "Menu History", path: "/Menu History/" }
  ]
};


// --- Theme Management ---
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    document.getElementById('themeLabel').textContent = theme.charAt(0).toUpperCase() + theme.slice(1);
    document.querySelector("#themeToggle i").className = theme === 'dark' ?
        'bi bi-moon-stars-fill' :
        'bi bi-sun-fill';
}

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
}

(() => {
    const theme = localStorage.getItem('theme') ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(theme);
})();
document.getElementById('themeToggle').onclick = toggleTheme;

// --- UI Render Functions ---
function renderHeader(text) {
    document.getElementById("main-folder-label").textContent = text;
}

// Render buttons centered and slightly above center
function renderButtons(buttons) {
    const grid = document.getElementById("folder-cards");
    grid.innerHTML = "";
    grid.style.justifyContent = "center";
    grid.style.alignItems = "center";
    grid.style.minHeight = "0";
    grid.style.marginTop = "0";

    const currentBase = window.location.origin + window.location.pathname;

    buttons.forEach(btn => {
        const card = document.createElement("a");
        card.className = "folder-card";
        card.title = btn.label;
        card.innerHTML = `
    <span class="folder-icon"><i class="bi bi-folder-symlink"></i></span>
    <span>${btn.label}</span>
  `;
        card.style.width = `calc(${btn.label.length}ch + 3.2em)`;

        // Build path to point to subfolder's index.html
        const basePath = window.location.pathname.substring(0, window.location.pathname.lastIndexOf("/"));
        const newPath = basePath + btn.path + "index.html";
        card.href = window.location.origin + newPath;

        card.addEventListener("click", function(e) {
            e.preventDefault();
            window.location.href = card.href;
        });
        grid.appendChild(card);
    });
}

// --- Entry Point ---
document.addEventListener("DOMContentLoaded", function() {
    renderHeader(PAGE_CONFIG.header);
    renderButtons(PAGE_CONFIG.buttons);
});