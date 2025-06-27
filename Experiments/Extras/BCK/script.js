// --- Data ---
const quotes = [
  "Wishing you a day filled with happiness and a year filled with joy!",
  "May your birthday be the start of a year filled with good luck, good health, and much happiness.",
  "Happy Birthday! May your day be filled with love, laughter, and joy!",
  "On your special day, may you be surrounded by love and happiness! Enjoy every moment!",
  "Sending you smiles for every moment of your special day… Have a wonderful time and a very happy birthday!",
  "Cheers to you and your incredible journey ahead. Have a fantastic birthday!",
  "Here's to another year of making beautiful memories! Happy Birthday!",
  "May your heart be filled with joy and laughter on your special day. Happy Birthday!",
  "On your birthday, may the sun shine as brightly as your spirit. Enjoy every moment!",
  "Wishing you a year full of love, adventure, and endless possibilities. Happy Birthday!",
  "Birthdays are nature’s way of telling us to eat more cake! Have a sweet and delightful day!",
  "Your birthday is the perfect time to remind you how much you are loved. Have a wonderful day!",
  "Wishing you a lifetime of happiness, peace, and prosperity. Happy Birthday!",
  "May your birthday be filled with all your favorite things and surrounded by the ones you love. Enjoy!",
  "Blow out the candles and make a wish. Happy Birthday!"
];
const images = [
  "https://unsplash.com/photos/a-birthday-cake-with-lit-candles-sitting-on-a-table-GZ44SmEfMps",
  "https://cdn.pixabay.com/photo/2025/06/19/05/56/birthday-text-9668246_640.png",
  "https://cdn.pixabay.com/photo/2025/06/18/13/53/ai-generated-9667270_640.png",
  "https://cdn.pixabay.com/photo/2018/02/24/09/46/birthday-cake-3177675_640.png",
  "https://pixabay.com/illustrations/date-of-birth-happy-birthday-cake-7165195/",
  "https://cdn.pixabay.com/photo/2015/06/17/23/23/happy-birthday-813182_640.jpg",
  "https://cdn.pixabay.com/photo/2023/03/06/10/17/ai-generated-7833194_640.jpg",
  "https://cdn.pixabay.com/photo/2023/04/18/10/52/birthday-7934855_640.png",
  "https://cdn.pixabay.com/photo/2024/02/16/15/58/ai-generated-8577898_640.png",
  "https://cdn.pixabay.com/photo/2016/01/03/20/42/birthday-1120051_640.jpg"
];
const accents = [
  {name:'Pink', hex:'#ff4081'}, {name:'Blue',hex:'#6c63ff'}, {name:'Green',hex:'#00b894'},
  {name:'Yellow',hex:'#ffee58'}, {name:'Orange',hex:'#ffb74d'}, {name:'Purple',hex:'#a29bfe'},
  {name:'Red',hex:'#ff5252'}, {name:'Teal',hex:'#1de9b6'}
];

// --- Encoding: <b64name>||<quoteId>||<themeBit> ---
function encodeState(name, quoteId, themeBase, accentIdx) {
  return btoa(unescape(encodeURIComponent(name))).replace(/=+$/,'') + "||" +
    (quoteId === null ? "r" : quoteId.toString(36)) + "||" + themeBase + accentIdx;
}
function decodeState(param) {
  let [b64name, quoteStr, themeBit] = param.split("||");
  if(!b64name || !themeBit) return null;
  let name;
  try { name = decodeURIComponent(escape(atob(b64name))); } catch(e){ return null; }
  let quote = (quoteStr === "r" || quoteStr == null) ? null : parseInt(quoteStr,36);
  let base = themeBit[0]==="l" ? "l" : "d";
  let accent = +themeBit[1];
  if(isNaN(accent) || accent < 0 || accent >= accents.length) accent = 0;
  return { name, quote, theme: { base, accent }};
}
function setAccent(idx){document.documentElement.style.setProperty('--primary-accent',accents[idx].hex);}
function setTheme(base,accentIdx){document.body.className=(base==="l"?"light":"");setAccent(accentIdx);}
function showToast(msg){const t=document.getElementById('toast');t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),1800);}
function showMenu(){
  document.getElementById('inputSection').style.display = "";
  document.getElementById('cardSection').style.display = "none";
}
function showCard(name, quoteIdx, themeObj){
  setTheme(themeObj.base, themeObj.accent);
  document.getElementById('inputSection').style.display = "none";
  document.getElementById('cardSection').style.display = "";
  document.getElementById('cardTitle').textContent = name ? "Happy Birthday " + name + "!" : "Happy Birthday!";
  let msg = quoteIdx !== null && quotes[quoteIdx] ? quotes[quoteIdx] : quotes[Math.floor(Math.random()*quotes.length)];
  document.getElementById('cardMsg').textContent = msg;
  let img = images[Math.floor(Math.random()*images.length)];
  document.getElementById('cardImg').src = img;
  document.getElementById('cardImg').alt = "Birthday Image";
}

// --- Populate quote and accent selectors ---
function initSelectors(){
  let quoteSel = document.getElementById('quoteSel');
  quoteSel.innerHTML = '<option value="r">Random Quote</option>';
  quotes.forEach((q,i)=>{ let opt=document.createElement('option'); opt.value=i; opt.textContent=q.length > 34 ? q.slice(0,31) + "..." : q; quoteSel.appendChild(opt); });

  let accentDots = document.getElementById('accentDots');
  accents.forEach((a,i)=>{
    let d=document.createElement('span');
    d.className = "dot" + (i===0 ? " selected" : "");
    d.title = a.name;
    d.style.backgroundColor = a.hex;
    d.tabIndex = 0;
    d.setAttribute('role', 'button');
    d.addEventListener('click', ()=>{selectAccent(i);});
    d.addEventListener('keydown', e=>{if(e.key==='Enter' || e.key===' ') { e.preventDefault(); selectAccent(i); }});
    accentDots.appendChild(d);
  });
}
function selectAccent(idx){
  document.querySelectorAll('.dot').forEach((d,i)=>{
    if(i===idx) d.classList.add('selected'); else d.classList.remove('selected');
  });
  setAccent(idx);
}

// --- Event Handlers ---
function getCurrentSettings(){
  let name = document.getElementById('name').value.trim();
  let quoteSel = document.getElementById('quoteSel');
  let quote = quoteSel.value === "r" ? null : parseInt(quoteSel.value,10);
  let themeSel = document.getElementById('themeSel').value;
  let accentIdx = [...document.querySelectorAll('.dot')].findIndex(d=>d.classList.contains('selected'));
  if(accentIdx < 0) accentIdx = 0;
  return {name, quote, theme: {base: themeSel, accent: accentIdx}};
}
function updateUrl(){
  let s = getCurrentSettings();
  let encoded = encodeState(s.name, s.quote, s.theme.base, s.theme.accent);
  history.replaceState(null,null,"?data="+encoded);
}
function copyLink(){
  updateUrl();
  navigator.clipboard.writeText(window.location.href).then(()=>{
    showToast("Link copied!");
  },()=>{
    showToast("Copy failed!");
  });
}
function previewCard(){
  let s = getCurrentSettings();
  showCard(s.name, s.quote, s.theme);
}

// --- Load state from URL ---
function loadFromUrl(){
  let params = new URLSearchParams(window.location.search);
  let data = params.get("data");
  if(!data) return false;
  let state = decodeState(data);
  if(!state) return false;
  document.getElementById('name').value = state.name || "";
  document.getElementById('quoteSel').value = (state.quote === null) ? "r" : state.quote.toString();
  document.getElementById('themeSel').value = state.theme.base;
  selectAccent(state.theme.accent);
  showCard(state.name, state.quote, state.theme);
  return true;
}

// --- Init ---
window.addEventListener('DOMContentLoaded', ()=>{
  initSelectors();
  if(!loadFromUrl()) showMenu();

  // Event listeners
  document.getElementById('copyBtn').addEventListener('click', copyLink);
  document.getElementById('previewBtn').addEventListener('click', previewCard);

  // Update URL on inputs changes (throttle)
  let throttleTimeout;
  function onInputChange(){
    clearTimeout(throttleTimeout);
    throttleTimeout = setTimeout(updateUrl, 500);
  }
  document.getElementById('name').addEventListener('input', onInputChange);
  document.getElementById('quoteSel').addEventListener('change', onInputChange);
  document.getElementById('themeSel').addEventListener('change', onInputChange);
});
