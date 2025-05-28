let simulation = null;
let currentStep = 0;

const simForm = document.getElementById('simForm');
const pagesInput = document.getElementById('pages');
const framesInput = document.getElementById('frames');
const algoSelect = document.getElementById('algorithm');
const startBtn = document.getElementById('startBtn');
const stepBtn = document.getElementById('stepBtn');
const runAllBtn = document.getElementById('runAllBtn');
const resetBtn = document.getElementById('resetBtn');
const stepsDiv = document.getElementById('steps');
const summaryDiv = document.getElementById('summary');

function parsePages(str) {
  return str
    .split(',')
    .map((s) => s.trim())
    .filter((s) => s)
    .map(Number)
    .filter((n) => !isNaN(n));
}

function deepCopy(arr) {
  return JSON.parse(JSON.stringify(arr));
}

function simulateOptimal(pages, frameCount) {
  let frames = [],
    steps = [],
    faults = 0;
  for (let i = 0; i < pages.length; i++) {
    let page = pages[i],
      hit = frames.includes(page),
      replaced = null;
    if (!hit) {
      faults++;
      if (frames.length < frameCount) {
        frames.push(page);
      } else {
        let future = pages.slice(i + 1);
        let indices = frames.map(
          (f) => (future.indexOf(f) === -1 ? Infinity : future.indexOf(f))
        );
        let victimIdx = indices.indexOf(Math.max(...indices));
        replaced = frames[victimIdx];
        frames[victimIdx] = page;
      }
    }
    steps.push({ page, frames: deepCopy(frames), hit, fault: !hit, replaced });
  }
  return { steps, faults };
}

function simulateLRU(pages, frameCount) {
  let frames = [],
    lastUsed = new Map(),
    steps = [],
    faults = 0;
  for (let i = 0; i < pages.length; i++) {
    let page = pages[i],
      hit = frames.includes(page),
      replaced = null;
    if (!hit) {
      faults++;
      if (frames.length < frameCount) {
        frames.push(page);
      } else {
        let lruPage = frames.reduce((a, b) =>
          lastUsed.get(a) < lastUsed.get(b) ? a : b
        );
        let idx = frames.indexOf(lruPage);
        replaced = frames[idx];
        frames[idx] = page;
      }
    }
    lastUsed.set(page, i);
    steps.push({ page, frames: deepCopy(frames), hit, fault: !hit, replaced });
  }
  return { steps, faults };
}

function simulateFIFO(pages, frameCount) {
  let frames = [],
    queue = [],
    steps = [],
    faults = 0;
  for (let i = 0; i < pages.length; i++) {
    let page = pages[i],
      hit = frames.includes(page),
      replaced = null;
    if (!hit) {
      faults++;
      if (frames.length < frameCount) {
        frames.push(page);
        queue.push(page);
      } else {
        let victim = queue.shift();
        let idx = frames.indexOf(victim);
        replaced = frames[idx];
        frames[idx] = page;
        queue.push(page);
      }
    }
    steps.push({ page, frames: deepCopy(frames), hit, fault: !hit, replaced });
  }
  return { steps, faults };
}

function getAlgorithm(name) {
  switch (name) {
    case 'optimal':
      return simulateOptimal;
    case 'lru':
      return simulateLRU;
    case 'fifo':
      return simulateFIFO;
    default:
      return simulateOptimal;
  }
}

function renderStepTable(steps, frameCount, uptoStep) {
  let html =
    '<table><thead><tr><th>Step</th><th>Page</th>';
  for (let i = 0; i < frameCount; i++) html += `<th>Frame ${i + 1}</th>`;
  html += '<th>Result</th></tr></thead><tbody>';
  for (let i = 0; i <= uptoStep; i++) {
    let s = steps[i],
      row = `<tr><td>${i + 1}</td><td>${s.page}</td>`;
    for (let j = 0; j < frameCount; j++) {
      let val = s.frames[j] ?? '',
        classes = ['frame-cell'];
      if (s.fault && s.replaced === s.frames[j]) classes.push('replace');
      row += `<td class="${classes.join(' ')}">${val}</td>`;
    }
    row += `<td class="${s.hit ? 'hit' : 'fault'}">${
      s.hit ? 'Hit' : s.replaced ? `Fault (Replaced ${s.replaced})` : 'Fault'
    }</td></tr>`;
    html += row;
  }
  html += '</tbody></table>';
  return html;
}

function renderSummary(faults, total) {
  return `Total Page Faults: <b>${faults}</b> out of <b>${total}</b> requests`;
}

function resetUI() {
  stepsDiv.innerHTML = '';
  summaryDiv.innerHTML = '';
  stepBtn.disabled = true;
  runAllBtn.disabled = true;
  resetBtn.disabled = true;
  startBtn.disabled = false;
  currentStep = 0;
  simulation = null;
}

simForm.addEventListener('submit', function (e) {
  e.preventDefault();
  let pages = parsePages(pagesInput.value);
  let frameCount = parseInt(framesInput.value);
  let algo = algoSelect.value;
  if (pages.length === 0 || isNaN(frameCount) || frameCount < 1 || frameCount > 10) {
    alert('Please enter valid input and frame count (1-10).');
    return;
  }

  simulation = getAlgorithm(algo)(pages, frameCount);
  currentStep = 0;
  stepsDiv.innerHTML = renderStepTable(simulation.steps, frameCount, 0);
  summaryDiv.innerHTML = '';
  stepBtn.disabled = false;
  runAllBtn.disabled = false;
  resetBtn.disabled = false;
  startBtn.disabled = true;
  stepBtn.textContent = 'Step-wise';
});

stepBtn.addEventListener('click', function () {
  if (!simulation) return;
  let steps = simulation.steps;
  let frameCount = parseInt(framesInput.value);
  if (currentStep < steps.length - 1) {
    currentStep++;
    stepsDiv.innerHTML = renderStepTable(steps, frameCount, currentStep);
    if (currentStep === steps.length - 1) {
      stepBtn.textContent = 'Show Summary';
    }
  } else {
    summaryDiv.innerHTML = renderSummary(simulation.faults, steps.length);
    stepBtn.disabled = true;
    runAllBtn.disabled = true;
  }
});

runAllBtn.addEventListener('click', function () {
  if (!simulation) return;
  let frameCount = parseInt(framesInput.value);
  currentStep = simulation.steps.length - 1;
  stepsDiv.innerHTML = renderStepTable(simulation.steps, frameCount, currentStep);
  summaryDiv.innerHTML = renderSummary(simulation.faults, simulation.steps.length);
  stepBtn.disabled = true;
  runAllBtn.disabled = true;
});

resetBtn.addEventListener('click', resetUI);

simForm.addEventListener('keydown', function (e) {
  if (e.key === 'Enter' && document.activeElement !== startBtn) e.preventDefault();
});

resetUI();
