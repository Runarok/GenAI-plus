// Utility: get URL hash param
function getSectionIdxFromHash() {
  const hash = window.location.hash.slice(1); // remove '#'
  if (!hash) return 0;
  const idx = menuData.findIndex(sec => sec.id.toLowerCase() === hash.toLowerCase());
  return idx >= 0 ? idx : 0;
}

// DOM refs
const sectionToggle = document.getElementById('section-toggle');
const mainContent = document.getElementById('main-content');

// State
let currentSectionIdx = 0;

// Build section toggle buttons
function buildSectionToggles() {
  sectionToggle.innerHTML = '';
  menuData.forEach((section, idx) => {
    const btn = document.createElement('button');
    btn.className = 'section-btn';
    btn.type = 'button';
    btn.setAttribute('role', 'tab');
    btn.setAttribute('aria-selected', idx === currentSectionIdx ? 'true' : 'false');
    btn.setAttribute('tabindex', idx === currentSectionIdx ? '0' : '-1');
    btn.textContent = section.title;
    btn.dataset.idx = idx;
    btn.id = `section-btn-${section.id}`;
    btn.addEventListener('click', () => showSection(idx, true));
    sectionToggle.appendChild(btn);
  });
}

// Build section panels
function buildSections() {
  mainContent.innerHTML = '';
  menuData.forEach((section, idx) => {
    const panel = document.createElement('section');
    panel.className = 'section-panel' + (idx === currentSectionIdx ? ' active' : '');
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', `section-btn-${section.id}`);
    panel.id = `section-panel-${section.id}`;
    if (idx !== currentSectionIdx) panel.setAttribute('hidden', 'hidden');

    const title = document.createElement('div');
    title.className = 'section-title';
    title.textContent = section.title;
    panel.appendChild(title);

    const grid = document.createElement('div');
    grid.className = 'links-grid';

    section.links.forEach(link => {
      const a = document.createElement('a');
      a.className = 'menu-link';
      a.href = link.url;
      a.tabIndex = 0;
      a.innerHTML = `<span>${link.label}</span>` +
                    (link.desc ? `<span class="desc">${link.desc}</span>` : '');
      grid.appendChild(a);
    });

    panel.appendChild(grid);
    mainContent.appendChild(panel);
  });
}

// Show section by index and update URL hash
function showSection(idx, focusBtn = false) {
  if (idx < 0 || idx >= menuData.length) return;
  currentSectionIdx = idx;

  // Update buttons
  Array.from(sectionToggle.children).forEach((btn, i) => {
    btn.classList.toggle('active', i === idx);
    btn.setAttribute('aria-selected', i === idx ? 'true' : 'false');
    btn.setAttribute('tabindex', i === idx ? '0' : '-1');
    if (i === idx && focusBtn) btn.focus();
  });

  // Update panels
  Array.from(mainContent.children).forEach((panel, i) => {
    panel.classList.toggle('active', i === idx);
    if (i === idx) {
      panel.removeAttribute('hidden');
    } else {
      panel.setAttribute('hidden', 'hidden');
    }
  });

  // Update the URL hash without scrolling
  history.replaceState(null, '', `#${menuData[idx].id}`);
}

// Keyboard navigation for sections and links (global listener)
document.addEventListener('keydown', (e) => {
  const len = menuData.length;
  const key = e.key.toLowerCase();

  const activePanel = mainContent.querySelector('.section-panel.active');
  if (!activePanel) return;
  const links = Array.from(activePanel.querySelectorAll('.menu-link'));
  const focusedElement = document.activeElement;

  // Determine if focus is inside the links of the active panel
  const isFocusOnLink = links.includes(focusedElement);

  // Navigate sections with Arrow Up/Down or W/S
  if (key === 'arrowup' || key === 'w' || key === 'arrowdown' || key === 's') {
    e.preventDefault();
    if (key === 'arrowup' || key === 'w') {
      const newIdx = (currentSectionIdx - 1 + len) % len;
      showSection(newIdx, true);
    } else {
      // arrowdown or s
      const newIdx = (currentSectionIdx + 1) % len;
      showSection(newIdx, true);
    }
  }
  // Navigate links with Arrow Left/Right or A/D, only if links exist
  else if ((key === 'arrowleft' || key === 'a' || key === 'arrowright' || key === 'd') && links.length > 0) {
    e.preventDefault();

    // If focus currently inside links, move within them
    if (isFocusOnLink) {
      const focusedIdx = links.indexOf(focusedElement);
      let nextIdx = focusedIdx;
      if (key === 'arrowright' || key === 'd') {
        nextIdx = (focusedIdx + 1) % links.length;
      } else if (key === 'arrowleft' || key === 'a') {
        nextIdx = (focusedIdx - 1 + links.length) % links.length;
      }
      links[nextIdx].focus();
    }
    // Otherwise, if focus not on a link, focus first or last link based on key
    else {
      if (key === 'arrowright' || key === 'd') {
        links[0].focus();
      } else if (key === 'arrowleft' || key === 'a') {
        links[links.length - 1].focus();
      }
    }
  }
});

// Touch swipe navigation for sections
let touchStartX = null;
let touchStartY = null;
mainContent.addEventListener('touchstart', (e) => {
  if (e.touches.length === 1) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }
});
mainContent.addEventListener('touchend', (e) => {
  if (touchStartX === null || touchStartY === null) return;
  const dx = e.changedTouches[0].clientX - touchStartX;
  const dy = e.changedTouches[0].clientY - touchStartY;
  if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) {
    // Horizontal swipe
    if (dx < 0) {
      // Swipe left: next section
      showSection((currentSectionIdx + 1) % menuData.length, true);
    } else {
      // Swipe right: prev section
      showSection((currentSectionIdx - 1 + menuData.length) % menuData.length, true);
    }
  }
  touchStartX = touchStartY = null;
});

// Initial render
function renderMenu() {
  currentSectionIdx = getSectionIdxFromHash();
  buildSectionToggles();
  buildSections();
  showSection(currentSectionIdx);
}

renderMenu();

// Update section when URL hash changes
window.addEventListener('hashchange', () => {
  const idx = getSectionIdxFromHash();
  showSection(idx, true);
});
