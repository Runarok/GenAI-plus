// THEMES
const THEMES = [
  { name: "ClassicLight", label: "Classic Light" },
  { name: "ElegantDark", label: "Elegant Dark" },
  { name: "MintyNight", label: "Minty Night" },
  { name: "Solarized", label: "Solarized" },
  { name: "Sunset", label: "Sunset" },
  { name: "NordicBlue", label: "Nordic Blue" },
  { name: "RetroPop", label: "Retro Pop" },
  { name: "Paper", label: "Paper" },
  { name: "CodeBlack", label: "Code Black" },
  { name: "ForestGreen", label: "Forest Green" }
];

// Only lightweight headers/keys for initial render
const HACK_HEADERS = Array.from({ length: 50 }, (_, i) => ({
  title: `${i + 1}. ${HACK_TITLES[i]}`,
  key: `hack${i + 1}`
}));

// You must define HACK_TITLES as an array of only the titles of all 50 hacks, in order.
// Example:
const HACK_TITLES = [
  "Prioritize your tasks",
  "Use the Pomodoro Technique",
  // ... fill in exactly as your hacks, up to ...
  "Use a handwriting recognition tool"
];

// Details object: key => HTML content. (Paste all 50 as in previous responses.)
// To save space, this example just shows a couple. Fill in all 50 as needed.
const HACK_DETAILS = {
  hack1: `<p>Prioritizing your tasks is a crucial productivity hack ...</p>`,
  hack2: `<p>The Pomodoro Technique is a time-management method ...</p>`,
  // ... hack3, hack4, ... hack50
};

// Tracks which hacks are currently open
let openState = Array(HACK_HEADERS.length).fill(false);
let theme = localStorage.getItem('theme') || THEMES[2].name;

// THEME SWITCHER
function renderThemes() {
  const nav = document.getElementById('theme-switcher');
  nav.innerHTML = '';
  THEMES.forEach(({ name, label }) => {
    const btn = document.createElement('button');
    btn.className = 'theme-btn' + (theme === name ? ' active' : '');
    btn.type = 'button';
    btn.setAttribute('data-theme', name);
    btn.textContent = label;
    btn.setAttribute('aria-current', theme === name ? 'true' : 'false');
    btn.onclick = () => setTheme(name);
    nav.appendChild(btn);
  });
}
function setTheme(name) {
  theme = name;
  localStorage.setItem('theme', name);
  document.body.className = `theme-${name}`;
  renderThemes();
}

// LAZY RENDER HEADERS ONLY
function renderHeaders() {
  const list = document.getElementById('hack-list');
  list.innerHTML = '';
  HACK_HEADERS.forEach((hack, i) => {
    const li = document.createElement('li');
    li.className = "hack-item";
    // Heading
    const btn = document.createElement('button');
    btn.className = "hack-heading";
    btn.type = "button";
    btn.id = `hack-heading-${i}`;
    btn.setAttribute("aria-controls", `hack-details-${i}`);
    btn.setAttribute("aria-expanded", "false");
    btn.tabIndex = 0;
    btn.innerText = hack.title;
    btn.onclick = () => toggleHack(i, hack.key, li, btn);
    btn.onkeydown = e => {
      if (e.key === 'ArrowDown' && i < HACK_HEADERS.length - 1)
        document.getElementById(`hack-heading-${i + 1}`).focus();
      if (e.key === 'ArrowUp' && i > 0)
        document.getElementById(`hack-heading-${i - 1}`).focus();
    };
    li.appendChild(btn);
    list.appendChild(li);
  });
}

// LAZY LOAD DETAILS ON DEMAND
function toggleHack(i, key, li, btn) {
  openState[i] = !openState[i];
  let details = li.querySelector('.hack-details');
  if (!details && openState[i]) {
    // Lazy-load details only when opened for the first time
    details = document.createElement('section');
    details.className = 'hack-details open';
    details.id = `hack-details-${i}`;
    details.setAttribute("role", "region");
    details.setAttribute("aria-labelledby", btn.id);
    details.innerHTML = HACK_DETAILS[key] || "<p>Details not available.</p>";
    li.appendChild(details);
  }
  if (details) {
    details.classList.toggle('open', openState[i]);
    details.style.display = openState[i] ? "block" : "none";
    btn.setAttribute('aria-expanded', openState[i] ? "true" : "false");
  }
}

// INIT
function init() {
  renderThemes();
  setTheme(theme);
  renderHeaders();
}
window.addEventListener('DOMContentLoaded', init);