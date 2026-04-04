// State Management
let state = {
  currentQuiz: null,
  currentMode: null, // 'take' or 'learn'
  currentQuestion: 0,
  answers: {}, // { questionIndex: selectedAnswer }
  quizStarted: false,
  autoAdvance: false,
  theme: 'dark'
};

// Load settings from localStorage
function loadSettings() {
  const savedTheme = localStorage.getItem('quizTheme') || 'dark';
  const savedAutoAdvance = localStorage.getItem('autoAdvance') === 'true';
  
  state.theme = savedTheme;
  state.autoAdvance = savedAutoAdvance;
  
  // Apply theme
  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
    document.getElementById('theme-toggle').value = 'light';
  }
  
  // Apply auto-advance setting
  if (savedAutoAdvance) {
    document.getElementById('auto-advance-toggle').checked = true;
  }
}

// Settings functions
function openSettings() {
  document.getElementById('settings-modal').classList.add('active');
}

function closeSettings() {
  document.getElementById('settings-modal').classList.remove('active');
}

function changeTheme(theme) {
  state.theme = theme;
  localStorage.setItem('quizTheme', theme);
  
  if (theme === 'light') {
    document.body.classList.add('light-theme');
  } else {
    document.body.classList.remove('light-theme');
  }
}

function toggleAutoAdvance() {
  state.autoAdvance = !state.autoAdvance;
  localStorage.setItem('autoAdvance', state.autoAdvance);
}

// Close modal when clicking outside
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('settings-modal');
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeSettings();
    }
  });
});

// Initialize Quiz Descriptions
function initializeQuizDescriptions() {
  document.getElementById('cs-desc').textContent = quizzes.cs.description;
  document.getElementById('ux-desc').textContent = quizzes.ux.description;
  document.getElementById('game-desc').textContent = quizzes.game.description;
}

// Navigation Functions
function selectQuiz(quizId) {
  state.currentQuiz = quizId;
  state.currentQuestion = 0;
  state.answers = {};
  showScreen('mode-selection');
  
  const quizName = quizzes[quizId].name;
  document.getElementById('mode-title').textContent = `${quizName}`;
  document.getElementById('mode-subtitle').textContent = `Choose how you want to engage with this quiz`;
}

function backToSelection() {
  state.currentQuiz = null;
  state.currentMode = null;
  state.currentQuestion = 0;
  state.answers = {};
  state.quizStarted = false;
  showScreen('quiz-selection');
}

function startQuiz() {
  state.currentMode = 'take';
  state.quizStarted = true;
  state.currentQuestion = 0;
  state.answers = {};
  showScreen('quiz-screen');
  renderQuestion();
}

function startLearnMode() {
  state.currentMode = 'learn';
  showScreen('learn-screen');
  renderLearnMode();
}

// Screen Management
function showScreen(screenId) {
  // Hide all screens
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active');
  });
  
  // Show selected screen
  document.getElementById(screenId).classList.add('active');
}

// Quiz Taking Logic
function renderQuestion() {
  const quiz = quizzes[state.currentQuiz];
  const question = quiz.questions[state.currentQuestion];
  
  // Update header
  document.getElementById('quiz-name').textContent = quiz.name;
  document.getElementById('progress-text').textContent = 
    `Question ${state.currentQuestion + 1} of ${quiz.questions.length}`;
  
  // Update progress bar
  const progress = ((state.currentQuestion + 1) / quiz.questions.length) * 100;
  document.getElementById('progress-fill').style.width = progress + '%';
  
  // Update question
  document.getElementById('question-text').textContent = question.question;
  
  // Render options
  const optionsContainer = document.getElementById('options-container');
  optionsContainer.innerHTML = '';
  
  question.options.forEach((option, index) => {
    const optionEl = document.createElement('div');
    optionEl.className = 'option';
    optionEl.textContent = option;
    
    // Check if this option was previously selected
    if (state.answers[state.currentQuestion] === option) {
      optionEl.classList.add('selected');
    }
    
    optionEl.addEventListener('click', () => selectOption(option, optionEl));
    optionsContainer.appendChild(optionEl);
  });
  
  // Update button states
  updateNavigationButtons();
}

function selectOption(option, element) {
  // Remove previous selection
  document.querySelectorAll('.option').forEach(opt => {
    opt.classList.remove('selected');
  });
  
  // Add selection to clicked option
  element.classList.add('selected');
  state.answers[state.currentQuestion] = option;
  
  // Auto-advance if enabled
  if (state.autoAdvance) {
    const quiz = quizzes[state.currentQuiz];
    if (state.currentQuestion < quiz.questions.length - 1) {
      setTimeout(() => {
        nextQuestion();
      }, 500);
    }
  }
}

function updateNavigationButtons() {
  const quiz = quizzes[state.currentQuiz];
  const prevBtn = document.querySelector('.btn-secondary');
  const nextBtn = document.getElementById('next-btn');
  
  // Disable previous button on first question
  prevBtn.disabled = state.currentQuestion === 0;
  
  // Update next button text
  if (state.currentQuestion === quiz.questions.length - 1) {
    nextBtn.textContent = 'Submit →';
  } else {
    nextBtn.textContent = 'Next →';
  }
}

function previousQuestion() {
  if (state.currentQuestion > 0) {
    state.currentQuestion--;
    renderQuestion();
  }
}

function nextQuestion() {
  const quiz = quizzes[state.currentQuiz];
  
  // Check if last question
  if (state.currentQuestion === quiz.questions.length - 1) {
    // Submit quiz
    showResults();
  } else {
    state.currentQuestion++;
    renderQuestion();
  }
}

function retakeQuiz() {
  state.currentQuestion = 0;
  state.answers = {};
  state.quizStarted = true;
  showScreen('quiz-screen');
  renderQuestion();
}

// Results Logic
function showResults() {
  const quiz = quizzes[state.currentQuiz];
  let correctCount = 0;
  
  // Calculate score
  quiz.questions.forEach((question, index) => {
    if (state.answers[index] === question.answer) {
      correctCount++;
    }
  });
  
  // Display score
  document.getElementById('final-score').textContent = correctCount;
  document.getElementById('total-score').textContent = quiz.questions.length;
  
  // Display feedback
  const percentage = (correctCount / quiz.questions.length) * 100;
  let feedback = '';
  
  if (percentage === 100) {
    feedback = '🎉 Perfect score! You\'re a master!';
  } else if (percentage >= 80) {
    feedback = '🌟 Excellent work! Great understanding!';
  } else if (percentage >= 60) {
    feedback = '👍 Good job! Keep practicing!';
  } else if (percentage >= 40) {
    feedback = '📚 Nice try! Review the material and try again!';
  } else {
    feedback = '💪 Keep learning! Practice makes perfect!';
  }
  
  document.getElementById('results-feedback').textContent = feedback;
  
  // Display answer summary
  const summaryContainer = document.getElementById('results-summary');
  summaryContainer.innerHTML = '';
  
  quiz.questions.forEach((question, index) => {
    const userAnswer = state.answers[index];
    const isCorrect = userAnswer === question.answer;
    
    const resultItem = document.createElement('div');
    resultItem.className = `result-item ${isCorrect ? 'correct' : 'incorrect'}`;
    
    const questionEl = document.createElement('div');
    questionEl.className = 'result-item-question';
    questionEl.textContent = `Q${index + 1}: ${question.question}`;
    
    const answerEl = document.createElement('div');
    answerEl.className = 'result-item-answer';
    
    if (isCorrect) {
      answerEl.innerHTML = `✓ <strong>Your answer:</strong> ${userAnswer}`;
    } else {
      answerEl.innerHTML = `✗ <strong>Your answer:</strong> ${userAnswer || 'Not answered'}<br><strong>Correct answer:</strong> ${question.answer}`;
    }
    
    resultItem.appendChild(questionEl);
    resultItem.appendChild(answerEl);
    summaryContainer.appendChild(resultItem);
  });
  
  showScreen('results-screen');
}

// Learn Mode Logic
function renderLearnMode() {
  const quiz = quizzes[state.currentQuiz];
  document.getElementById('learn-title').textContent = `${quiz.name} - Learn Mode`;
  
  const container = document.getElementById('learn-questions-container');
  container.innerHTML = '';
  
  quiz.questions.forEach((question, index) => {
    const card = document.createElement('div');
    card.className = 'learn-card';
    
    const numberEl = document.createElement('div');
    numberEl.className = 'learn-card-number';
    numberEl.textContent = `Question ${index + 1}`;
    
    const questionEl = document.createElement('div');
    questionEl.className = 'learn-card-question';
    questionEl.textContent = question.question;
    
    const optionsEl = document.createElement('div');
    optionsEl.className = 'learn-card-options';
    
    question.options.forEach(option => {
      const optionEl = document.createElement('div');
      optionEl.className = 'learn-option';
      optionEl.textContent = `• ${option}`;
      
      if (option === question.answer) {
        optionEl.classList.add('correct');
        optionEl.textContent = `✓ ${option} (Correct Answer)`;
      }
      
      optionsEl.appendChild(optionEl);
    });
    
    card.appendChild(numberEl);
    card.appendChild(questionEl);
    card.appendChild(optionsEl);
    container.appendChild(card);
  });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  loadSettings();
  initializeQuizDescriptions();
  showScreen('quiz-selection');
});
