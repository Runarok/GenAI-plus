// --- Configuration: Change only these for new sections ---
const CONFIG = {
  GITHUB_OWNER: "Runarok",
  GITHUB_REPO: "GenAI-plus",
  GITHUB_BRANCH: "main",
  MAIN_PATH_PREFIX: "Experiments",
  MAIN_FOLDER: "Bin", // <- Change this to switch sections (e.g., "Bin")
  IGNORED_FOLDERS: ["src"],
  CACHE_HOURS: 12
};

// --- Theme Management ---
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

// Auto-load theme on page load
(() => {
  const theme = localStorage.getItem('theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  setTheme(theme);
})();
document.getElementById('themeToggle').onclick = toggleTheme;

// --- Utility: Key Names for Caching ---
function getStorageKey(folder) {
  return `folder-list-${folder.toLowerCase()}`;
}
function getStorageTimestampKey(folder) {
  return getStorageKey(folder) + "-time";
}

// --- Utility: GitHub API & URLs ---
function getGithubUrl(folder) {
  return `https://github.com/${CONFIG.GITHUB_OWNER}/${CONFIG.GITHUB_REPO}/tree/${CONFIG.GITHUB_BRANCH}/${CONFIG.MAIN_PATH_PREFIX}/${folder}`;
}
function getContentsApiUrl(folder) {
  return `https://api.github.com/repos/${CONFIG.GITHUB_OWNER}/${CONFIG.GITHUB_REPO}/contents/${CONFIG.MAIN_PATH_PREFIX}/${folder}?ref=${CONFIG.GITHUB_BRANCH}`;
}
function getFolderGhPagesUrl(folder, subfolder) {
  return `https://${CONFIG.GITHUB_OWNER.toLowerCase()}.github.io/${CONFIG.GITHUB_REPO}/${CONFIG.MAIN_PATH_PREFIX}/${encodeURIComponent(folder)}/${encodeURIComponent(subfolder)}/`;
}

// --- Caching Logic ---
function saveCache(folder, subfolders) {
  localStorage.setItem(getStorageKey(folder), JSON.stringify(subfolders));
  localStorage.setItem(getStorageTimestampKey(folder), Date.now().toString());
}
function loadCache(folder) {
  const raw = localStorage.getItem(getStorageKey(folder));
  const t = localStorage.getItem(getStorageTimestampKey(folder));
  if (!raw || !t) return null;
  return { folders: JSON.parse(raw), time: parseInt(t) };
}
function cacheIsFresh(time) {
  return (Date.now() - time) < CONFIG.CACHE_HOURS * 60 * 60 * 1000;
}

// --- Render Folder Cards ---
function renderFolders(folder, subfolders) {
  const grid = document.getElementById("folder-cards");
  grid.innerHTML = "";
  
  subfolders.forEach(sub => {
    const card = document.createElement("a");
    card.href = getFolderGhPagesUrl(folder, sub);
    card.className = "folder-card";
    card.title = sub;
    card.style.width = `calc(${sub.length}ch + 3.2em)`;
    card.innerHTML = `
      <span class="folder-icon"><i class="bi bi-folder-symlink"></i></span>
      <span>${sub}</span>
    `;
    card.addEventListener("click", function (e) {
      e.preventDefault();
      window.location.href = card.href;
    });
    grid.appendChild(card);
  });
}

// --- Error Handling ---
function showError(msg) {
  const err = document.getElementById("error");
  err.style.display = "block";
  err.innerHTML = msg;
}
function hideError() {
  document.getElementById("error").style.display = "none";
}

// --- Fetch Folder Content & Render ---
async function fetchAndRenderFolders(folder, force = false) {
  hideError();

  const cache = loadCache(folder);
  if (cache && cacheIsFresh(cache.time) && !force) {
    renderFolders(folder, cache.folders);
    return;
  }

  try {
    const res = await fetch(getContentsApiUrl(folder), { cache: "no-store" });
    if (!res.ok) {
      showError(`Failed to fetch contents.<br>Status: ${res.status}`);
      return;
    }

    const data = await res.json();
    const subfolders = data
      .filter(item => item.type === "dir" && !CONFIG.IGNORED_FOLDERS.includes(item.name))
      .map(item => item.name);

    if (subfolders.length === 0) {
      showError("No folders found in this directory.");
      return;
    }

    renderFolders(folder, subfolders);
    saveCache(folder, subfolders);
  } catch (e) {
    showError("An error occurred: " + e.message);
  }
}

// --- Keyboard Shortcut: Force Reload with CTRL+SHIFT+R or CMD+SHIFT+R ---
window.addEventListener('keydown', function (e) {
  const isMac = navigator.platform.toUpperCase().includes('MAC');
  if (
    (e.key === 'r' || e.key === 'R') &&
    e.shiftKey &&
    ((isMac && e.metaKey) || (!isMac && e.ctrlKey))
  ) {
    e.preventDefault();
    fetchAndRenderFolders(CONFIG.MAIN_FOLDER, true);
  }
});

// --- UI Initialization ---
function updateUI(folder) {
  document.getElementById("main-folder-label").textContent = folder;
  document.getElementById("github-link").href = getGithubUrl(folder);
}

// --- Entry Point ---
updateUI(CONFIG.MAIN_FOLDER);
fetchAndRenderFolders(CONFIG.MAIN_FOLDER);

// --- Reminder: To switch folder sections, change CONFIG.MAIN_FOLDER above ---
