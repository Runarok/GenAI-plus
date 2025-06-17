// ===================================
// PAGING ALGORITHM SIMULATOR - MAIN JAVASCRIPT
// ===================================

// ===================================
// ALGORITHM CONTENT DATA
// ===================================
const ALGORITHM_CONTENT = {
  fifo: {
    title: 'FIFO (First In First Out)',
    strategy: 'FIFO replaces the page that has been in memory the longest, regardless of how recently or frequently it has been used. It maintains a simple queue structure where pages are added to the rear and removed from the front.',
    howItWorks: [
      'When a page fault occurs and all frames are occupied, remove the page at the front of the queue',
      'Add the new page to the rear of the queue',
      'The queue maintains the order in which pages were loaded into memory'
    ],
    example: {
      referenceString: '7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2, 1, 2, 0, 1, 7, 0, 1',
      frames: 3,
      steps: [
        { step: 1, page: 7, frame1: 7, frame2: '-', frame3: '-', status: 'FAULT', explanation: 'First page, goes to empty frame 1' },
        { step: 2, page: 0, frame1: 7, frame2: 0, frame3: '-', status: 'FAULT', explanation: 'Second page, goes to empty frame 2' },
        { step: 3, page: 1, frame1: 7, frame2: 0, frame3: 1, status: 'FAULT', explanation: 'Third page, goes to empty frame 3' },
        { step: 4, page: 2, frame1: 2, frame2: 0, frame3: 1, status: 'FAULT', explanation: 'Replace page 7 (oldest) with page 2' },
        { step: 5, page: 0, frame1: 2, frame2: 0, frame3: 1, status: 'HIT', explanation: 'Page 0 already in memory' },
        { step: 6, page: 3, frame1: 2, frame2: 3, frame3: 1, status: 'FAULT', explanation: 'Replace page 0 (oldest) with page 3' },
        { step: 7, page: 0, frame1: 2, frame2: 3, frame3: 0, status: 'FAULT', explanation: 'Replace page 1 (oldest) with page 0' },
        { step: 8, page: 4, frame1: 4, frame2: 3, frame3: 0, status: 'FAULT', explanation: 'Replace page 2 (oldest) with page 4' },
        { step: 9, page: 2, frame1: 4, frame2: 2, frame3: 0, status: 'FAULT', explanation: 'Replace page 3 (oldest) with page 2' },
        { step: 10, page: 3, frame1: 4, frame2: 2, frame3: 3, status: 'FAULT', explanation: 'Replace page 0 (oldest) with page 3' }
      ]
    },
    advantages: [
      'Simple to implement and understand',
      'Low overhead - only requires tracking insertion order',
      'Fair allocation - each page gets equal time in memory'
    ],
    disadvantages: [
      'Suffers from Belady\'s Anomaly (more frames can lead to more page faults)',
      'Ignores page usage patterns and frequency',
      'May remove frequently used pages simply because they\'re old',
      'Generally poor performance compared to other algorithms'
    ]
  },
  lru: {
    title: 'LRU (Least Recently Used)',
    strategy: 'LRU replaces the page that hasn\'t been accessed for the longest time. It\'s based on the principle of temporal locality - if a page was recently accessed, it\'s likely to be accessed again soon.',
    howItWorks: [
      'Track the last access time for each page in memory',
      'When a page is accessed (hit), update its access time to current',
      'When a page fault occurs, replace the page with the oldest access time',
      'Add the new page with current access time'
    ],
    example: {
      referenceString: '7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2, 1, 2, 0, 1, 7, 0, 1',
      frames: 3,
      steps: [
        { step: 1, page: 7, frame1: 7, frame2: '-', frame3: '-', status: 'FAULT', explanation: 'First page, goes to empty frame 1' },
        { step: 2, page: 0, frame1: 7, frame2: 0, frame3: '-', status: 'FAULT', explanation: 'Second page, goes to empty frame 2' },
        { step: 3, page: 1, frame1: 7, frame2: 0, frame3: 1, status: 'FAULT', explanation: 'Third page, goes to empty frame 3' },
        { step: 4, page: 2, frame1: 2, frame2: 0, frame3: 1, status: 'FAULT', explanation: 'Replace page 7 (least recently used) with page 2' },
        { step: 5, page: 0, frame1: 2, frame2: 0, frame3: 1, status: 'HIT', explanation: 'Page 0 found, update its access time' },
        { step: 6, page: 3, frame1: 2, frame2: 0, frame3: 3, status: 'FAULT', explanation: 'Replace page 1 (least recently used) with page 3' },
        { step: 7, page: 0, frame1: 2, frame2: 0, frame3: 3, status: 'HIT', explanation: 'Page 0 found, update its access time' },
        { step: 8, page: 4, frame1: 4, frame2: 0, frame3: 3, status: 'FAULT', explanation: 'Replace page 2 (least recently used) with page 4' },
        { step: 9, page: 2, frame1: 4, frame2: 2, frame3: 3, status: 'FAULT', explanation: 'Replace page 0 (least recently used) with page 2' },
        { step: 10, page: 3, frame1: 4, frame2: 2, frame3: 3, status: 'HIT', explanation: 'Page 3 found, update its access time' }
      ]
    },
    implementationMethods: [
      'Counter Method: Each page has a counter incremented on access',
      'Stack Method: Maintain a stack of page numbers, move accessed page to top',
      'Matrix Method: Use a matrix to track relative access order'
    ],
    advantages: [
      'Good approximation of optimal algorithm',
      'Exploits temporal locality effectively',
      'Generally performs well in practice',
      'No Belady\'s Anomaly'
    ],
    disadvantages: [
      'Higher implementation complexity',
      'Requires additional hardware support or software overhead',
      'May need to update access information on every memory reference'
    ]
  },
  optimal: {
    title: 'Optimal Algorithm (Belady\'s Algorithm)',
    strategy: 'The Optimal algorithm replaces the page that will not be used for the longest period in the future. It provides the theoretical minimum number of page faults for any given reference string.',
    howItWorks: [
      'When a page fault occurs, examine all pages currently in memory',
      'For each page, find when it will next be referenced in the future',
      'Replace the page that will be referenced furthest in the future',
      'If a page is never referenced again, replace it immediately'
    ],
    example: {
      referenceString: '7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2, 1, 2, 0, 1, 7, 0, 1',
      frames: 3,
      steps: [
        { step: 1, page: 7, frame1: 7, frame2: '-', frame3: '-', status: 'FAULT', explanation: 'First page, goes to empty frame 1' },
        { step: 2, page: 0, frame1: 7, frame2: 0, frame3: '-', status: 'FAULT', explanation: 'Second page, goes to empty frame 2' },
        { step: 3, page: 1, frame1: 7, frame2: 0, frame3: 1, status: 'FAULT', explanation: 'Third page, goes to empty frame 3' },
        { step: 4, page: 2, frame1: 2, frame2: 0, frame3: 1, status: 'FAULT', explanation: 'Replace page 7 (used at step 18) with page 2' },
        { step: 5, page: 0, frame1: 2, frame2: 0, frame3: 1, status: 'HIT', explanation: 'Page 0 already in memory' },
        { step: 6, page: 3, frame1: 2, frame2: 0, frame3: 3, status: 'FAULT', explanation: 'Replace page 1 (used at step 14) with page 3' },
        { step: 7, page: 0, frame1: 2, frame2: 0, frame3: 3, status: 'HIT', explanation: 'Page 0 already in memory' },
        { step: 8, page: 4, frame1: 2, frame2: 4, frame3: 3, status: 'FAULT', explanation: 'Replace page 0 (used at step 11) with page 4' },
        { step: 9, page: 2, frame1: 2, frame2: 4, frame3: 3, status: 'HIT', explanation: 'Page 2 already in memory' },
        { step: 10, page: 3, frame1: 2, frame2: 4, frame3: 3, status: 'HIT', explanation: 'Page 3 already in memory' }
      ]
    },
    lookaheadAnalysis: 'At each replacement decision, the algorithm analyzes future references: For example, at step 6 when page 3 needs to be loaded, it examines when pages 2, 0, and 1 will next be used. Page 2 is next used at step 9 (distance: 3), page 0 at step 7 (distance: 1), and page 1 at step 14 (distance: 8). Since page 1 has the longest future distance, it gets replaced.',
    advantages: [
      'Guarantees minimum number of page faults',
      'Provides theoretical benchmark for other algorithms',
      'Useful for algorithm analysis and comparison',
      'No Belady\'s Anomaly'
    ],
    disadvantages: [
      'Impossible to implement in practice (requires future knowledge)',
      'Only useful for theoretical analysis and simulation',
      'Cannot predict future page references in real systems'
    ],
    practicalApplications: [
      'Benchmark for evaluating other algorithms',
      'Theoretical analysis of memory management',
      'Algorithm research and development',
      'Performance upper bound estimation'
    ]
  }
};

// ===================================
// MAIN SIMULATOR CLASS
// ===================================
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

  // ===================================
  // INITIALIZATION METHODS
  // ===================================
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
    this.algorithmDetails = document.getElementById('algorithm-details');
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

  // ===================================
  // INFO PANEL METHODS
  // ===================================
  toggleInfo() {
    this.isInfoVisible = !this.isInfoVisible;
    this.infoPanel.style.display = this.isInfoVisible ? 'block' : 'none';
    this.toggleInfoBtn.textContent = this.isInfoVisible ? 'Hide Algorithm Information' : 'Show Algorithm Information';
  }

  updateAlgorithmInfo() {
    const selectedAlgorithm = this.infoAlgorithmSelect.value;
    const content = ALGORITHM_CONTENT[selectedAlgorithm];
    
    this.algorithmDetails.innerHTML = this.generateAlgorithmHTML(content);
  }

  generateAlgorithmHTML(content) {
    let html = `
      <div class="algorithm-detail">
        <h4>${content.title}</h4>
        
        <div class="detail-section">
          <h5>Strategy</h5>
          <p>${content.strategy}</p>
        </div>

        <div class="detail-section">
          <h5>How It Works</h5>
          <ol>
    `;
    
    content.howItWorks.forEach(step => {
      html += `<li>${step}</li>`;
    });
    
    html += `
          </ol>
        </div>

        <div class="detail-section">
          <h5>Detailed Example</h5>
          <p><strong>Reference String:</strong> ${content.example.referenceString} (${content.example.frames} frames)</p>
          <div class="example-table">
            <table>
              <tr><th>Step</th><th>Page</th><th>Frame 1</th><th>Frame 2</th><th>Frame 3</th><th>Status</th><th>Explanation</th></tr>
    `;
    
    content.example.steps.forEach(step => {
      html += `
        <tr>
          <td>${step.step}</td>
          <td>${step.page}</td>
          <td>${step.frame1}</td>
          <td>${step.frame2}</td>
          <td>${step.frame3}</td>
          <td>${step.status}</td>
          <td>${step.explanation}</td>
        </tr>
      `;
    });
    
    html += `
            </table>
          </div>
        </div>
    `;

    // Add implementation methods for LRU
    if (content.implementationMethods) {
      html += `
        <div class="detail-section">
          <h5>Implementation Methods</h5>
          <ul>
      `;
      content.implementationMethods.forEach(method => {
        html += `<li>${method}</li>`;
      });
      html += `
          </ul>
        </div>
      `;
    }

    // Add lookahead analysis for Optimal
    if (content.lookaheadAnalysis) {
      html += `
        <div class="detail-section">
          <h5>Lookahead Analysis</h5>
          <p>${content.lookaheadAnalysis}</p>
        </div>
      `;
    }

    html += `
        <div class="detail-section">
          <h5>Advantages</h5>
          <ul>
    `;
    
    content.advantages.forEach(advantage => {
      html += `<li>${advantage}</li>`;
    });
    
    html += `
          </ul>
        </div>

        <div class="detail-section">
          <h5>Disadvantages</h5>
          <ul>
    `;
    
    content.disadvantages.forEach(disadvantage => {
      html += `<li>${disadvantage}</li>`;
    });
    
    html += `
          </ul>
        </div>
    `;

    // Add practical applications for Optimal
    if (content.practicalApplications) {
      html += `
        <div class="detail-section">
          <h5>Practical Applications</h5>
          <ul>
      `;
      content.practicalApplications.forEach(application => {
        html += `<li>${application}</li>`;
      });
      html += `
          </ul>
        </div>
      `;
    }

    html += `
      </div>
    `;
    
    return html;
  }

  // ===================================
  // INPUT VALIDATION METHODS
  // ===================================
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

  // ===================================
  // SIMULATION CONTROL METHODS
  // ===================================
  startStepMode() {
    const inputs = this.validateInputs();
    if (!inputs) return;
    
    this.isStepMode = true;
    this.currentStep = 0;
    this.simulationSteps = this.runSimulation(inputs.referenceString, inputs.frameCount, this.algorithmSelect.value);
    this.totalSteps = this.simulationSteps.steps.length;
    
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

  // ===================================
  // CORE SIMULATION ALGORITHM
  // ===================================
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

  // ===================================
  // DISPLAY METHODS
  // ===================================
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

  // ===================================
  // STEP EXPLANATION METHODS
  // ===================================
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

  // ===================================
  // STEP NAVIGATION METHODS
  // ===================================
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

  // ===================================
  // RESET METHOD
  // ===================================
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

// ===================================
// INITIALIZE APPLICATION
// ===================================
document.addEventListener('DOMContentLoaded', () => {
  new PagingSimulator();
});