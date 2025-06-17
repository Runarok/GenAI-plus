class PagingSimulator {
  constructor() {
    this.currentStep = 0;
    this.simulationSteps = [];
    this.isStepMode = false;
    this.totalSteps = 0;
    this.isInfoVisible = false;
    
    this.ui = new UIManager();
    this.bindEvents();
    this.updateAlgorithmInfo();
  }

  bindEvents() {
    this.ui.stepBtn.addEventListener('click', () => this.startStepMode());
    this.ui.runBtn.addEventListener('click', () => this.runFullSimulation());
    this.ui.resetBtn.addEventListener('click', () => this.reset());
    this.ui.nextStepBtn.addEventListener('click', () => this.nextStep());
    this.ui.prevStepBtn.addEventListener('click', () => this.prevStep());
    this.ui.toggleInfoBtn.addEventListener('click', () => this.toggleInfo());
    this.ui.infoAlgorithmSelect.addEventListener('change', () => this.updateAlgorithmInfo());
    
    this.ui.algorithmSelect.addEventListener('change', () => {
      this.ui.infoAlgorithmSelect.value = this.ui.algorithmSelect.value;
      this.updateAlgorithmInfo();
    });
  }

  toggleInfo() {
    this.isInfoVisible = !this.isInfoVisible;
    this.ui.infoPanel.style.display = this.isInfoVisible ? 'block' : 'none';
    this.ui.toggleInfoBtn.textContent = this.isInfoVisible ? 'Hide Algorithm Information' : 'Show Algorithm Information';
  }

  updateAlgorithmInfo() {
    const selectedAlgorithm = this.ui.infoAlgorithmSelect.value;
    const content = ALGORITHM_CONTENT[selectedAlgorithm];
    this.ui.algorithmDetails.innerHTML = this.ui.generateAlgorithmHTML(content);
  }

  startStepMode() {
    const inputs = validateInputs(this.ui.referenceStringInput, this.ui.frameCountInput);
    if (!inputs) return;
    
    this.isStepMode = true;
    this.currentStep = 0;
    this.simulationSteps = runSimulation(inputs.referenceString, inputs.frameCount, this.ui.algorithmSelect.value);
    this.totalSteps = this.simulationSteps.steps.length;
    
    this.displayStepMode();
    this.updateStepDisplay();
    this.showStepExplanation();
  }

  runFullSimulation() {
    const inputs = validateInputs(this.ui.referenceStringInput, this.ui.frameCountInput);
    if (!inputs) return;
    
    this.isStepMode = false;
    const steps = runSimulation(inputs.referenceString, inputs.frameCount, this.ui.algorithmSelect.value);
    this.displayFullResults(steps);
    this.hideStepExplanation();
  }

  displayStepMode() {
    this.ui.stepControls.style.display = 'flex';
    this.ui.resultsContainer.innerHTML = this.ui.createTableHTML(
      this.simulationSteps.steps, 
      true, 
      this.currentStep, 
      parseInt(this.ui.frameCountInput.value)
    );
    this.ui.addStatsHTML(this.simulationSteps.summary, this.ui.resultsContainer);
  }

  displayFullResults(simulationData) {
    this.ui.stepControls.style.display = 'none';
    this.ui.resultsContainer.innerHTML = this.ui.createTableHTML(
      simulationData.steps, 
      false, 
      0, 
      parseInt(this.ui.frameCountInput.value)
    );
    this.ui.addStatsHTML(simulationData.summary, this.ui.resultsContainer);
  }

  showStepExplanation() {
    this.ui.stepExplanation.style.display = 'block';
    this.updateStepExplanation();
  }

  hideStepExplanation() {
    this.ui.stepExplanation.style.display = 'none';
  }

  updateStepExplanation() {
    if (!this.isStepMode || this.currentStep >= this.simulationSteps.steps.length) return;
    
    const currentStepData = this.simulationSteps.steps[this.currentStep];
    const algorithm = this.ui.algorithmSelect.value.toUpperCase();
    
    let explanationHTML = `
      <p><strong>Step ${this.currentStep + 1}:</strong> Accessing page <span class="highlight">${currentStepData.page}</span></p>
      <p><strong>Algorithm:</strong> ${algorithm}</p>
    `;
    
    if (currentStepData.fault) {
      explanationHTML += `<p><strong>Result:</strong> Page fault occurred. `;
      if (currentStepData.replaced) {
        explanationHTML += `Replaced page ${currentStepData.replaced} with page ${currentStepData.page}.`;
      } else {
        explanationHTML += `Added page ${currentStepData.page} to an empty frame.`;
      }
      explanationHTML += `</p>`;
      explanationHTML += `<p><strong>Impact:</strong> This is a <span class="highlight">page fault</span>, which means the CPU must wait while the page is loaded from storage into memory.</p>`;
    } else {
      explanationHTML += `<p><strong>Result:</strong> Page hit - page ${currentStepData.page} is already in memory.</p>`;
      explanationHTML += `<p><strong>Impact:</strong> This is a <span class="highlight">page hit</span>, which means the page is already in memory and can be accessed immediately.</p>`;
    }
    
    this.ui.explanationContent.innerHTML = explanationHTML;
  }

  updateStepDisplay() {
    if (!this.isStepMode) return;
    
    this.ui.stepInfo.textContent = `Step ${this.currentStep + 1} of ${this.totalSteps}`;
    this.ui.prevStepBtn.disabled = this.currentStep === 0;
    this.ui.nextStepBtn.disabled = this.currentStep >= this.totalSteps - 1;
    
    this.ui.resultsContainer.innerHTML = this.ui.createTableHTML(
      this.simulationSteps.steps, 
      true, 
      this.currentStep, 
      parseInt(this.ui.frameCountInput.value)
    );
    this.ui.addStatsHTML(this.simulationSteps.summary, this.ui.resultsContainer);
    
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
    this.ui.referenceStringInput.value = '';
    this.ui.frameCountInput.value = '3';
    this.ui.algorithmSelect.value = 'fifo';
    this.ui.infoAlgorithmSelect.value = 'fifo';
    this.updateAlgorithmInfo();
    
    this.currentStep = 0;
    this.simulationSteps = [];
    this.isStepMode = false;
    this.totalSteps = 0;
    
    this.ui.stepControls.style.display = 'none';
    this.hideStepExplanation();
    this.ui.resultsContainer.innerHTML = '<p class="placeholder">Configure your simulation and click "Run All" or "Start Step-by-Step" to see results.</p>';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new PagingSimulator();
});