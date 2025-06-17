// Enhanced Paging Algorithm Simulator - Main JavaScript

class PagingSimulator {
  constructor() {
    this.currentStep = 0;
    this.simulationSteps = [];
    this.isStepMode = false;
    this.totalSteps = 0;
    this.isInfoVisible = false;
    
    this.initializeElements();
    this.bindEvents();
    this.updateAlgorithmInfo();
  }

  initializeElements() {
    // Input elements
    this.referenceStringInput = document.getElementById('reference-string');
    this.frameCountInput = document.getElementById('frame-count');
    this.algorithmSelect = document.getElementById('algorithm');
    
    // Button elements
    this.stepBtn = document.getElementById('step-btn');
    this.runBtn = document.getElementById('run-btn');
    this.resetBtn = document.getElementById('reset-btn');
    this.nextStepBtn = document.getElementById('next-step');
    this.prevStepBtn = document.getElementById('prev-step');
    this.toggleInfoBtn = document.getElementById('toggle-info-btn');
    
    // Display elements
    this.resultsContainer = document.getElementById('results-container');
    this.stepControls = document.getElementById('step-controls');
    this.stepInfo = document.getElementById('step-info');
    this.stepExplanation = document.getElementById('step-explanation');
    this.explanationContent = document.getElementById('explanation-content');
    
    // Info elements
    this.infoPanel = document.getElementById('info-panel');
    this.infoAlgorithmSelect = document.getElementById('info-algorithm');
    this.algorithmDetails = document.querySelectorAll('.algorithm-detail');
  }

  bindEvents() {
    this.stepBtn.addEventListener('click', () => this.startStepMode());
    this.runBtn.addEventListener('click', () => this.runFullSimulation());
    this.resetBtn.addEventListener('click', () => this.reset());
    this.nextStepBtn.addEventListener('click', () => this.nextStep());
    this.prevStepBtn.addEventListener('click', () => this.prevStep());
    this.toggleInfoBtn.addEventListener('click', () => this.toggleInfo());
    this.infoAlgorithmSelect.addEventListener('change', () => this.updateAlgorithmInfo());
    
    // Sync algorithm selects
    this.algorithmSelect.addEventListener('change', () => {
      this.infoAlgorithmSelect.value = this.algorithmSelect.value;
      this.updateAlgorithmInfo();
    });
  }

  toggleInfo() {
    this.isInfoVisible = !this.isInfoVisible;
    this.infoPanel.style.display = this.isInfoVisible ? 'block' : 'none';
    this.toggleInfoBtn.textContent = this.isInfoVisible ? 'Hide Algorithm Information' : 'Show Algorithm Information';
  }

  updateAlgorithmInfo() {
    const selectedAlgorithm = this.infoAlgorithmSelect.value;
    this.algorithmDetails.forEach(detail => {
      detail.classList.remove('active');
      if (detail.id === `${selectedAlgorithm}-details`) {
        detail.classList.add('active');
      }
    });
  }

  parseReferenceString(input) {
    return input.split(',')
      .map(x => x.trim())
      .filter(x => x !== '')
      .map(x => parseInt(x))
      .filter(x => !isNaN(x));
  }

  validateInputs() {
    const referenceString = this.parseReferenceString(this.referenceStringInput.value);
    const frameCount = parseInt(this.frameCountInput.value);
    
    if (referenceString.length === 0) {
      alert('Please enter a valid page reference string (e.g., 7,0,1,2,0,3,0,4,2,3)');
      return null;
    }
    
    if (frameCount < 1 || frameCount > 10) {
      alert('Number of frames must be between 1 and 10');
      return null;
    }
    
    return { referenceString, frameCount };
  }

  startStepMode() {
    const inputs = this.validateInputs();
    if (!inputs) return;
    
    this.isStepMode = true;
    this.currentStep = 0;
    this.simulationSteps = this.runSimulation(inputs.referenceString, inputs.frameCount, this.algorithmSelect.value);
    this.totalSteps = this.simulationSteps.length;
    
    this.displayStepMode();
    this.updateStepDisplay();
    this.showStepExplanation();
  }

  runFullSimulation() {
    const inputs = this.validateInputs();
    if (!inputs) return;
    
    this.isStepMode = false;
    const steps = this.runSimulation(inputs.referenceString, inputs.frameCount, this.algorithmSelect.value);
    this.displayFullResults(steps);
    this.hideStepExplanation();
  }

  runSimulation(referenceString, frameCount, algorithm) {
    const steps = [];
    const frames = new Array(frameCount).fill(null);
    let pageFaults = 0;
    let pageHits = 0;
    
    // Algorithm-specific data structures
    let accessOrder = []; // For LRU
    let fifoIndex = 0; // For FIFO
    
    referenceString.forEach((page, index) => {
      const step = {
        stepNumber: index + 1,
        page: page,
        framesBefore: [...frames],
        framesAfter: null,
        isPageFault: false,
        replacedPage: null,
        algorithm: algorithm,
        explanation: ''
      };
      
      // Check if page is already in frames
      const pageIndex = frames.indexOf(page);
      
      if (pageIndex !== -1) {
        // Page hit
        step.isPageFault = false;
        pageHits++;
        
        if (algorithm === 'lru') {
          // Update access order for LRU
          accessOrder = accessOrder.filter(p => p !== page);
          accessOrder.push(page);
          step.explanation = `Page ${page} is already in memory (Page Hit). Updated access order for LRU: [${accessOrder.join(', ')}]`;
        } else {
          step.explanation = `Page ${page} is already in memory (Page Hit). No changes needed.`;
        }
        
        step.framesAfter = [...frames];
      } else {
        // Page fault
        step.isPageFault = true;
        pageFaults++;
        
        // Find empty frame or determine which page to replace
        const emptyFrameIndex = frames.indexOf(null);
        
        if (emptyFrameIndex !== -1) {
          // Use empty frame
          frames[emptyFrameIndex] = page;
          if (algorithm === 'lru') {
            accessOrder.push(page);
          }
          step.explanation = `Page ${page} not in memory (Page Fault). Loaded into empty frame ${emptyFrameIndex + 1}.`;
        } else {
          // Need to replace a page
          let replaceIndex;
          
          switch (algorithm) {
            case 'fifo':
              replaceIndex = fifoIndex;
              step.replacedPage = frames[replaceIndex];
              frames[replaceIndex] = page;
              fifoIndex = (fifoIndex + 1) % frameCount;
              step.explanation = `Page ${page} not in memory (Page Fault). Using FIFO: replaced page ${step.replacedPage} (oldest) with page ${page} in frame ${replaceIndex + 1}.`;
              break;
              
            case 'lru':
              const lruPage = accessOrder[0];
              replaceIndex = frames.indexOf(lruPage);
              step.replacedPage = frames[replaceIndex];
              frames[replaceIndex] = page;
              accessOrder = accessOrder.filter(p => p !== lruPage);
              accessOrder.push(page);
              step.explanation = `Page ${page} not in memory (Page Fault). Using LRU: replaced page ${step.replacedPage} (least recently used) with page ${page} in frame ${replaceIndex + 1}. New access order: [${accessOrder.join(', ')}]`;
              break;
              
            case 'optimal':
              const optimalInfo = this.findOptimalReplacement(frames, referenceString, index);
              replaceIndex = optimalInfo.index;
              step.replacedPage = frames[replaceIndex];
              frames[replaceIndex] = page;
              step.explanation = `Page ${page} not in memory (Page Fault). Using Optimal: ${optimalInfo.explanation} Replaced page ${step.replacedPage} with page ${page} in frame ${replaceIndex + 1}.`;
              break;
          }
        }
        
        step.framesAfter = [...frames];
      }
      
      steps.push(step);
    });
    
    // Add summary statistics
    const summary = {
      totalReferences: referenceString.length,
      pageFaults: pageFaults,
      pageHits: pageHits,
      faultRate: ((pageFaults / referenceString.length) * 100).toFixed(2),
      hitRate: ((pageHits / referenceString.length) * 100).toFixed(2)
    };
    
    return { steps, summary };
  }

  findOptimalReplacement(frames, referenceString, currentIndex) {
    let farthestIndex = -1;
    let replaceIndex = 0;
    let explanation = '';
    const futureUses = [];
    
    frames.forEach((frame, index) => {
      let nextUse = -1;
      
      // Find next occurrence of this frame in future references
      for (let i = currentIndex + 1; i < referenceString.length; i++) {
        if (referenceString[i] === frame) {
          nextUse = i;
          break;
        }
      }
      
      futureUses.push({
        page: frame,
        nextUse: nextUse,
        distance: nextUse === -1 ? '∞' : nextUse - currentIndex
      });
      
      // If page is never used again, replace it immediately
      if (nextUse === -1) {
        replaceIndex = index;
        explanation = `Page ${frame} will never be used again.`;
        return;
      }
      
      // Keep track of the page that will be used farthest in the future
      if (nextUse > farthestIndex) {
        farthestIndex = nextUse;
        replaceIndex = index;
      }
    });
    
    if (explanation === '') {
      const futureInfo = futureUses.map(fu => `${fu.page}(+${fu.distance})`).join(', ');
      explanation = `Future distances: ${futureInfo}. Page ${frames[replaceIndex]} has the longest future distance.`;
    }
    
    return { index: replaceIndex, explanation };
  }

  displayStepMode() {
    this.stepControls.style.display = 'flex';
    this.resultsContainer.innerHTML = this.createTableHTML(this.simulationSteps.steps, true);
    this.addStatsHTML(this.simulationSteps.summary);
  }

  displayFullResults(simulationData) {
    this.stepControls.style.display = 'none';
    this.resultsContainer.innerHTML = this.createTableHTML(simulationData.steps, false);
    this.addStatsHTML(simulationData.summary);
  }

  createTableHTML(steps, isStepMode) {
    const frameCount = parseInt(this.frameCountInput.value);
    
    let html = `
      <div class="simulation-table-container">
        <table class="simulation-table">
          <thead>
            <tr>
              <th>Step</th>
              <th>Page</th>
    `;
    
    // Add frame columns
    for (let i = 0; i < frameCount; i++) {
      html += `<th>Frame ${i + 1}</th>`;
    }
    
    html += `
              <th>Status</th>
              <th>Replaced</th>
            </tr>
          </thead>
          <tbody>
    `;
    
    steps.forEach((step, index) => {
      const isCurrentStep = isStepMode && index === this.currentStep;
      const isVisibleStep = !isStepMode || index <= this.currentStep;
      const rowClass = isCurrentStep ? 'current-step' : '';
      
      if (isVisibleStep) {
        html += `
          <tr class="${rowClass}">
            <td>${step.stepNumber}</td>
            <td><strong>${step.page}</strong></td>
        `;
        
        // Add frame cells
        const framesToShow = step.framesAfter;
        for (let i = 0; i < frameCount; i++) {
          const frameValue = framesToShow[i];
          const cellClass = frameValue === null ? 'empty-frame' : '';
          html += `<td class="frame-cell ${cellClass}">${frameValue || '-'}</td>`;
        }
        
        // Status and replaced page
        const statusClass = step.isPageFault ? 'page-fault' : 'page-hit';
        const statusText = step.isPageFault ? 'FAULT' : 'HIT';
        const replacedText = step.replacedPage !== null ? step.replacedPage : '-';
        
        html += `
            <td class="${statusClass}">${statusText}</td>
            <td>${replacedText}</td>
          </tr>
        `;
      }
    });
    
    html += `
          </tbody>
        </table>
      </div>
    `;
    
    return html;
  }

  addStatsHTML(summary) {
    const statsHTML = `
      <div class="stats">
        <div class="stat-card">
          <span class="stat-value">${summary.totalReferences}</span>
          <span class="stat-label">Total References</span>
        </div>
        <div class="stat-card">
          <span class="stat-value">${summary.pageFaults}</span>
          <span class="stat-label">Page Faults</span>
        </div>
        <div class="stat-card">
          <span class="stat-value">${summary.pageHits}</span>
          <span class="stat-label">Page Hits</span>
        </div>
        <div class="stat-card">
          <span class="stat-value">${summary.faultRate}%</span>
          <span class="stat-label">Fault Rate</span>
        </div>
        <div class="stat-card">
          <span class="stat-value">${summary.hitRate}%</span>
          <span class="stat-label">Hit Rate</span>
        </div>
      </div>
    `;
    
    this.resultsContainer.insertAdjacentHTML('beforeend', statsHTML);
  }

  showStepExplanation() {
    this.stepExplanation.style.display = 'block';
    this.updateStepExplanation();
  }

  hideStepExplanation() {
    this.stepExplanation.style.display = 'none';
  }

  updateStepExplanation() {
    if (!this.isStepMode || this.currentStep >= this.simulationSteps.steps.length) return;
    
    const currentStepData = this.simulationSteps.steps[this.currentStep];
    const algorithm = this.algorithmSelect.value.toUpperCase();
    
    let explanationHTML = `
      <p><strong>Step ${currentStepData.stepNumber}:</strong> Accessing page <span class="highlight">${currentStepData.page}</span></p>
      <p><strong>Algorithm:</strong> ${algorithm}</p>
      <p><strong>Result:</strong> ${currentStepData.explanation}</p>
    `;
    
    if (currentStepData.isPageFault) {
      explanationHTML += `<p><strong>Impact:</strong> This is a <span class="highlight">page fault</span>, which means the CPU must wait while the page is loaded from storage into memory.</p>`;
    } else {
      explanationHTML += `<p><strong>Impact:</strong> This is a <span class="highlight">page hit</span>, which means the page is already in memory and can be accessed immediately.</p>`;
    }
    
    this.explanationContent.innerHTML = explanationHTML;
  }

  updateStepDisplay() {
    if (!this.isStepMode) return;
    
    this.stepInfo.textContent = `Step ${this.currentStep + 1} of ${this.totalSteps}`;
    this.prevStepBtn.disabled = this.currentStep === 0;
    this.nextStepBtn.disabled = this.currentStep >= this.totalSteps - 1;
    
    // Update table to show only steps up to current
    this.resultsContainer.innerHTML = this.createTableHTML(this.simulationSteps.steps, true);
    this.addStatsHTML(this.simulationSteps.summary);
    
    // Update step explanation
    this.updateStepExplanation();
  }

  nextStep() {
    if (this.currentStep < this.totalSteps - 1) {
      this.currentStep++;
      this.updateStepDisplay();
    }
  }

  prevStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.updateStepDisplay();
    }
  }

  reset() {
    this.referenceStringInput.value = '';
    this.frameCountInput.value = '3';
    this.algorithmSelect.value = 'fifo';
    this.infoAlgorithmSelect.value = 'fifo';
    this.updateAlgorithmInfo();
    
    this.currentStep = 0;
    this.simulationSteps = [];
    this.isStepMode = false;
    this.totalSteps = 0;
    
    this.stepControls.style.display = 'none';
    this.hideStepExplanation();
    this.resultsContainer.innerHTML = '<p class="placeholder">Configure your simulation and click "Run All" or "Start Step-by-Step" to see results.</p>';
  }
}

// Initialize the simulator when the page loads
document.addEventListener('DOMContentLoaded', () => {
  new PagingSimulator();
});