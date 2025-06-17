class UIManager {
  constructor() {
    this.initializeElements();
  }

  initializeElements() {
    this.referenceStringInput = document.getElementById('reference-string');
    this.frameCountInput = document.getElementById('frame-count');
    this.algorithmSelect = document.getElementById('algorithm');
    
    this.stepBtn = document.getElementById('step-btn');
    this.runBtn = document.getElementById('run-btn');
    this.resetBtn = document.getElementById('reset-btn');
    this.nextStepBtn = document.getElementById('next-step');
    this.prevStepBtn = document.getElementById('prev-step');
    this.toggleInfoBtn = document.getElementById('toggle-info-btn');
    
    this.resultsContainer = document.getElementById('results-container');
    this.stepControls = document.getElementById('step-controls');
    this.stepInfo = document.getElementById('step-info');
    this.stepExplanation = document.getElementById('step-explanation');
    this.explanationContent = document.getElementById('explanation-content');
    
    this.infoPanel = document.getElementById('info-panel');
    this.infoAlgorithmSelect = document.getElementById('info-algorithm');
    this.algorithmDetails = document.getElementById('algorithm-details');
  }

  createTableHTML(steps, isStepMode, currentStep, frameCount) {
    let html = `
      <div class="simulation-table-container">
        <table class="simulation-table">
          <thead>
            <tr>
              <th>Step</th>
              <th>Page</th>
    `;
    
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
      const isCurrentStepRow = isStepMode && index === currentStep;
      const isVisibleStep = !isStepMode || index <= currentStep;
      const rowClass = isCurrentStepRow ? 'current-step' : '';
      
      if (isVisibleStep) {
        html += `
          <tr class="${rowClass}">
            <td>${index + 1}</td>
            <td><strong>${step.page}</strong></td>
        `;
        
        const framesToShow = step.frames;
        for (let i = 0; i < frameCount; i++) {
          const frameValue = framesToShow[i];
          const cellClass = frameValue === undefined ? 'empty-frame' : '';
          html += `<td class="frame-cell ${cellClass}">${frameValue !== undefined ? frameValue : '-'}</td>`;
        }
        
        const statusClass = step.fault ? 'page-fault' : 'page-hit';
        const statusText = step.fault ? 'FAULT' : 'HIT';
        const replacedText = step.replaced !== null ? step.replaced : '-';
        
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

  addStatsHTML(summary, container) {
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
    
    container.insertAdjacentHTML('beforeend', statsHTML);
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
}