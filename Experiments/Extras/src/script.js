// --- User Config ---
const githubUrl = "https://github.com/Runarok/GenAI-plus/tree/main/Experiments/Extras";
const githubPagesBase = "https://runarok.github.io/GenAI-plus/Experiments/Extras";
const STORAGE_KEY = "extras-folder-list";
const STORAGE_TIMESTAMP = "extras-folder-list-time";
const CACHE_HOURS = 12;

// --- THEME ---
function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  document.getElementById('themeLabel').textContent = theme.charAt(0).toUpperCase() + theme.slice(1);
  document.querySelector("#themeToggle i").className = theme === 'dark'
    ? 'bi bi-moon-stars-fill'
    : 'bi bi-sun-fill';
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

// --- PARSING ---
function parseGithubTreeUrl(url) {
  const match = url.match(/^https:\/\/github\.com\/([^\/]+)\/([^\/]+)\/tree\/([^\/]+)\/(.+)$/);
  if (!match) return null;
  return {
    owner: match[1],
    repo: match[2],
    branch: match[3],
    path: match[4]
  };
}

function getContentsApiUrl({ owner, repo, branch, path }) {
  return `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`;
}

function getFolderGhPagesUrl(folderName) {
  return githubPagesBase.replace(/\/$/, '') + '/' + encodeURIComponent(folderName) + '/';
}

// --- STORAGE UTILS ---
function saveCache(folders) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(folders));
  localStorage.setItem(STORAGE_TIMESTAMP, Date.now().toString());
}

function loadCache() {
  const raw = localStorage.getItem(STORAGE_KEY);
  const t = localStorage.getItem(STORAGE_TIMESTAMP);
  if (!raw || !t) return null;
  return { folders: JSON.parse(raw), time: parseInt(t) };
}

function cacheIsFresh(time) {
  const now = Date.now();
  return (now - time) < CACHE_HOURS * 60 * 60 * 1000;
}

// --- FOLDER RENDER ---
function renderFolders(folders) {
  const grid = document.getElementById("folder-cards");
  grid.innerHTML = "";

  folders.forEach(folder => {
    const card = document.createElement("a");
    card.href = getFolderGhPagesUrl(folder.name);
    card.className = "folder-card";
    card.title = folder.name;
    card.style.width = `calc(${folder.name.length}ch + 3.2em)`;

    card.innerHTML = `
      <span class="folder-icon"><i class="bi bi-folder-symlink"></i></span>
      <span>${folder.name}</span>
    `;

    // Open link in same tab
    card.addEventListener("click", function (e) {
      e.preventDefault();
      window.location.href = card.href;
    });

    grid.appendChild(card);
  });
}

function showError(msg) {
  const err = document.getElementById("error");
  err.style.display = "block";
  err.innerHTML = msg;
}

function hideError() {
  document.getElementById("error").style.display = "none";
}

// --- MAIN LOGIC ---
async function fetchAndRenderFolders(force = false) {
  hideError();

  let cache = loadCache();
  if (cache && cacheIsFresh(cache.time) && !force) {
    renderFolders(cache.folders);
    return;
  }

  const info = parseGithubTreeUrl(githubUrl);
  if (!info) {
    showError("Invalid GitHub tree URL.");
    return;
  }

  const apiUrl = getContentsApiUrl(info);

  try {
    const res = await fetch(apiUrl, { cache: "no-store" });
    if (!res.ok) {
      showError(`Failed to fetch contents.<br>Status: ${res.status}`);
      return;
    }

    const data = await res.json();
    const folders = data
      .filter(item => item.type === "dir" && item.name !== "src")
      .map(folder => ({ name: folder.name }));

    if (folders.length === 0) {
      showError("No folders found in this directory.");
      return;
    }

    renderFolders(folders);
    saveCache(folders);
  } catch (e) {
    showError("An error occurred: " + e.message);
  }
}

// --- "CTRL+SHIFT+R" or "CMD+SHIFT+R" reloads from API, even if cache is fresh ---
window.addEventListener('keydown', function (e) {
  const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
  if (
    (e.key === 'r' || e.key === 'R') &&
    e.shiftKey &&
    ((isMac && e.metaKey) || (!isMac && e.ctrlKey))
  ) {
    e.preventDefault();
    fetchAndRenderFolders(true);
  }
});

// --- INITIAL LOAD ---
fetchAndRenderFolders();
