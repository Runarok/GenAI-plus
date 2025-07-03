// --- Routing Logic ---
function getPageParam() {
  const params = new URLSearchParams(window.location.search);
  const page = params.get('page');
  if (page && ['about','hub','contact'].includes(page)) return page;
  return null;
}

function switchSection(page) {
  const allSections = ['about','hub','contact'];
  if (!page) {
    // No ?page param: show ALL sections
    allSections.forEach(id => {
      document.getElementById(id+'Section').classList.add('active');
    });
    document.querySelectorAll('.site-nav .nav-link').forEach(a => {
      a.classList.remove('selected');
    });
    document.title = "Runarok Hrafn – All";
    document.getElementById('pageTitle').textContent = "Runarok Hrafn – All";
  } else {
    // Show ONLY requested section
    allSections.forEach(id => {
      document.getElementById(id+'Section').classList.toggle('active', id === page);
    });
    document.querySelectorAll('.site-nav .nav-link').forEach(a => {
      a.classList.toggle('selected', a.getAttribute('data-nav') === page);
    });
    let t = '';
    if(page==='about') t='About Runarok Hrafn';
    else if(page==='hub') t='GenAI-plus Repository Hub';
    else t='Contact & Social – Runarok Hrafn';
    document.title = t;
    document.getElementById('pageTitle').textContent = t;
  }
}

function setNavHandlers() {
  document.querySelectorAll('.site-nav .nav-link').forEach(a => {
    a.onclick = function(e){
      e.preventDefault();
      const page = a.getAttribute('data-nav');
      if(page) {
        history.pushState({page}, '', '?page='+page);
        switchSection(page);
      }
      window.scrollTo(0,0);
    };
  });
}

window.addEventListener('popstate', function(e) {
  switchSection(getPageParam());
});

// On page load
switchSection(getPageParam());
setNavHandlers();

// --- Theme Dropdown Logic ---
const THEMES = [
  {cls: '',           label: "Blue Gradient", icon: "fa-droplet"},
  {cls: 'theme-teal', label: "Teal/Sea",      icon: "fa-water"},
  {cls: 'theme-coldgray', label: "Cold Gray-Black", icon: "fa-moon"},
  {cls: 'theme-contrast', label: "High Contrast", icon: "fa-circle-half-stroke"},
];
let themeIdx = 0;
const themeBtn = document.getElementById('themeBtn');
const themeDropdown = document.getElementById('themeDropdown');
function setTheme(idx, save=true) {
  document.body.className = THEMES[idx].cls;
  themeIdx = idx;
  if(save) localStorage.setItem('themeIdx', ''+idx);
  const ic = themeBtn.querySelector('i');
  if (ic) ic.className = "fas " + THEMES[idx].icon;
  Array.from(themeDropdown.children).forEach((el, i) => {
    el.classList.toggle('selected', i === idx);
  });
  document.dispatchEvent(new Event('themeChange'));
}
function fillThemeDropdown() {
  themeDropdown.innerHTML = '';
  THEMES.forEach((theme, i) => {
    const btn = document.createElement('button');
    btn.className = 'theme-option' + (themeIdx === i ? ' selected' : '');
    btn.type = 'button';
    btn.innerHTML = `<i class="fas ${theme.icon}"></i> ${theme.label}`;
    btn.onclick = function(e){
      setTheme(i);
      closeThemeDropdown();
      themeBtn.focus();
    };
    themeDropdown.appendChild(btn);
  });
}
function openThemeDropdown() {
  fillThemeDropdown();
  themeDropdown.classList.add('show');
  themeBtn.setAttribute('aria-expanded', 'true');
}
function closeThemeDropdown() {
  themeDropdown.classList.remove('show');
  themeBtn.setAttribute('aria-expanded', 'false');
}
themeBtn.addEventListener('click', function(e){
  if(themeDropdown.classList.contains('show')) closeThemeDropdown();
  else openThemeDropdown();
  e.stopPropagation();
});
themeBtn.addEventListener('contextmenu', function(e){
  e.preventDefault();
  openThemeDropdown();
  e.stopPropagation();
});
document.addEventListener('mousedown', function(e){
  if(themeDropdown.classList.contains('show') && !themeDropdown.contains(e.target) && e.target !== themeBtn) {
    closeThemeDropdown();
  }
});
document.addEventListener('keydown', function(e){
  if(themeDropdown.classList.contains('show') && e.key === 'Escape') closeThemeDropdown();
});
(function(){
  const saved = localStorage.getItem('themeIdx');
  setTheme(saved && !isNaN(parseInt(saved,10)) ? parseInt(saved,10) : 0, false);
})();

// --- Quote Rotator + Arrows ---
const QUOTES = [
  "Clarity is the real elegance.",
  "Discipline is a form of self-respect.",
  "Creation isn’t chaos. It’s alignment.",
  "Direction is more important than speed.",
  "Stillness builds more than urgency.",
  "Simplicity is earned, not improvised.",
  "Consistency is underrated. But never irrelevant."
];
let quoteIdx = 0;
let quoteAuto = true, quoteTimer = null;
function showQuote(idx) {
  const rotator = document.getElementById('quoteRotator');
  if (rotator) {
    rotator.style.opacity = "0";
    setTimeout(() => {
      rotator.textContent = QUOTES[idx];
      rotator.style.opacity = "1";
    }, 180);
  }
}
function nextQuote() {
  quoteIdx = (quoteIdx + 1) % QUOTES.length;
  showQuote(quoteIdx);
}
function prevQuote() {
  quoteIdx = (quoteIdx - 1 + QUOTES.length) % QUOTES.length;
  showQuote(quoteIdx);
}
showQuote(quoteIdx);
function startQuoteAuto() {
  quoteAuto = true;
  if (quoteTimer) clearInterval(quoteTimer);
  quoteTimer = setInterval(() => {
    if (quoteAuto) nextQuote();
  }, 4000);
}
function stopQuoteAuto() {
  quoteAuto = false;
  if (quoteTimer) clearInterval(quoteTimer);
}
startQuoteAuto();
document.getElementById('quoteNext').onclick = () => {
  stopQuoteAuto();
  nextQuote();
};
document.getElementById('quotePrev').onclick = () => {
  stopQuoteAuto();
  prevQuote();
};
let quoteNavTimeout;
['quoteNext', 'quotePrev'].forEach(id => {
  document.getElementById(id).addEventListener('click', () => {
    if (quoteNavTimeout) clearTimeout(quoteNavTimeout);
    quoteNavTimeout = setTimeout(startQuoteAuto, 10000);
  });
});

// --- Cursor Trail / Glow effect ---
(function cursorTrail(){
  const trail = [];
  const N = 8;
  for(let i=0;i<N;i++) {
    let span = document.createElement('span');
    span.style.position = 'fixed';
    span.style.pointerEvents = 'none';
    span.style.zIndex = 9999;
    span.style.width = "12px";
    span.style.height = "12px";
    span.style.borderRadius = "50%";
    span.style.background = "radial-gradient(circle, var(--brand-accent) 60%, transparent 100%)";
    span.style.opacity = (0.16 + 0.11 * (1-(i/(N-1)))).toFixed(2);
    span.style.filter = "blur(1.5px)";
    span.style.transition = 'background 0.5s, opacity 0.5s';
    document.body.appendChild(span);
    trail.push(span);
  }
  let mouse = {x:window.innerWidth/2, y:window.innerHeight/2};
  document.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  let pts = Array(N).fill({x:mouse.x, y:mouse.y});
  function animate(){
    pts[0] = {x:mouse.x, y:mouse.y};
    for(let i=1;i<N;i++){
      pts[i] = {
        x: pts[i].x + (pts[i-1].x - pts[i].x)*0.19,
        y: pts[i].y + (pts[i-1].y - pts[i].y)*0.19
      };
    }
    for(let i=0;i<N;i++){
      trail[i].style.left = (pts[i].x-6) + "px";
      trail[i].style.top = (pts[i].y-6) + "px";
    }
    requestAnimationFrame(animate);
  }
  animate();
  function updateTrailDisplay() {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    trail.forEach(s => s.style.display = isTouch ? "none" : "block");
  }
  updateTrailDisplay();
  window.addEventListener('resize', updateTrailDisplay);
})();