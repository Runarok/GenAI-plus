function simulateFIFO(pages, frameCount) {
  let frames = [], queue = [], steps = [], faults = 0;
  
  for (let i = 0; i < pages.length; i++) {
    let page = pages[i];
    let hit = frames.includes(page);
    let replaced = null;
    
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

function simulateLRU(pages, frameCount) {
  let frames = [], lastUsed = new Map(), steps = [], faults = 0;
  
  for (let i = 0; i < pages.length; i++) {
    let page = pages[i];
    let hit = frames.includes(page);
    let replaced = null;
    
    if (!hit) {
      faults++;
      if (frames.length < frameCount) {
        frames.push(page);
      } else {
        let lruPage = frames.reduce((a, b) => lastUsed.get(a) < lastUsed.get(b) ? a : b);
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

function simulateOptimal(pages, frameCount) {
  let frames = [], steps = [], faults = 0;
  
  for (let i = 0; i < pages.length; i++) {
    let page = pages[i];
    let hit = frames.includes(page);
    let replaced = null;
    
    if (!hit) {
      faults++;
      if (frames.length < frameCount) {
        frames.push(page);
      } else {
        let future = pages.slice(i + 1);
        let indices = frames.map(f => (future.indexOf(f) === -1 ? Infinity : future.indexOf(f)));
        let victimIdx = indices.indexOf(Math.max(...indices));
        replaced = frames[victimIdx];
        frames[victimIdx] = page;
      }
    }
    
    steps.push({ page, frames: deepCopy(frames), hit, fault: !hit, replaced });
  }
  
  return { steps, faults };
}

function runSimulation(referenceString, frameCount, algorithm) {
  let result;
  
  switch (algorithm) {
    case 'fifo':
      result = simulateFIFO(referenceString, frameCount);
      break;
    case 'lru':
      result = simulateLRU(referenceString, frameCount);
      break;
    case 'optimal':
      result = simulateOptimal(referenceString, frameCount);
      break;
    default:
      throw new Error('Unknown algorithm');
  }
  
  const summary = {
    totalReferences: referenceString.length,
    pageFaults: result.faults,
    pageHits: referenceString.length - result.faults,
    faultRate: ((result.faults / referenceString.length) * 100).toFixed(2),
    hitRate: (((referenceString.length - result.faults) / referenceString.length) * 100).toFixed(2)
  };
  
  return { steps: result.steps, summary };
}