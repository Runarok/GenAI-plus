// Console easter egg
console.log("Loyalty is sacred.");

// Theme system
const THEMES = [
  {cls: '',           label: "Blue Gradient", icon: "fa-droplet"},
  {cls: 'theme-teal', label: "Teal/Sea",      icon: "fa-water"},
  {cls: 'theme-coldgray', label: "Cold Gray-Black", icon: "fa-moon"},
  {cls: 'theme-contrast', label: "High Contrast", icon: "fa-circle-half-stroke"},
];
let themeIdx = 0;
function setTheme(idx, save=true) {
  document.body.className = THEMES[idx].cls;
  themeIdx = idx;
  if(save) localStorage.setItem('themeIdx', ''+idx);
  // Change icon
  const ic = document.querySelector('#themeBtn i');
  if (ic) {
    ic.className = "fas " + THEMES[idx].icon;
  }
}
(() => {
  const saved = localStorage.getItem('themeIdx');
  setTheme(saved && !isNaN(parseInt(saved,10)) ? parseInt(saved,10) : 0, false);
})();
document.getElementById('themeBtn').onclick = function(e) {
  setTheme((themeIdx+1)%THEMES.length);
};
window.addEventListener('keydown', e => {
  if (document.activeElement.tagName === "INPUT" || document.activeElement.tagName === "TEXTAREA") return;
  if ((e.key === "t" || e.key === "T") && !e.ctrlKey && !e.altKey && !e.metaKey) {
    setTheme((themeIdx+1)%THEMES.length);
    e.preventDefault();
  }
});

// Quote rotator
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
function showQuote(idx) {
  const rotator = document.getElementById('quoteRotator');
  if (rotator) {
    rotator.style.opacity = "0";
    setTimeout(() => {
      rotator.textContent = QUOTES[idx];
      rotator.style.opacity = "1";
    }, 240);
  }
}
showQuote(0);
setInterval(() => {
  quoteIdx = (quoteIdx + 1) % QUOTES.length;
  showQuote(quoteIdx);
}, 4000);

// Cursor trail / glow effect (neon style on hover)
(function cursorTrail(){
  const trail = [];
  const N = 8;
  for(let i=0;i<N;i++) {
    let span = document.createElement('span');
    span.style.position = 'fixed';
    span.style.pointerEvents = 'none';
    span.style.zIndex = 9999;
    span.style.width = "14px";
    span.style.height = "14px";
    span.style.borderRadius = "50%";
    span.style.background = "radial-gradient(circle, var(--brand-accent) 55%, transparent 100%)";
    span.style.opacity = (0.16 + 0.12 * (1-(i/(N-1)))).toFixed(2);
    span.style.filter = "blur(2px)";
    span.style.transition = 'background 0.6s, opacity 0.6s';
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
      trail[i].style.left = (pts[i].x-7) + "px";
      trail[i].style.top = (pts[i].y-7) + "px";
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