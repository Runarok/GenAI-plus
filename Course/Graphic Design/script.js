// State Management
let state = {
  currentChapter: null,
  currentQuiz: null,
  currentMode: null,
  currentQuestion: 0,
  answers: {},
  quizStarted: false,
  autoAdvance: false,
  theme: 'dark',
  currentStreak: 0,
  bestStreak: 0,
  lastQuizDate: null
};

// Progress tracking structure
let progress = {
  // chapter1: { completed: 0, total: 8, quizzes: { 'ch1-q1': { score: 8, attempts: 2, completed: true } } }
};

// Load settings and progress from localStorage
function loadSettings() {
  const savedTheme = localStorage.getItem('quizTheme') || 'dark';
  const savedAutoAdvance = localStorage.getItem('autoAdvance') === 'true';
  const savedStreak = JSON.parse(localStorage.getItem('streak')) || { current: 0, best: 0, lastDate: null };
  
  state.theme = savedTheme;
  state.autoAdvance = savedAutoAdvance;
  state.currentStreak = savedStreak.current || 0;
  state.bestStreak = savedStreak.best || 0;
  state.lastQuizDate = savedStreak.lastDate;
  
  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
    document.getElementById('theme-toggle').value = 'light';
  }
  
  if (savedAutoAdvance) {
    document.getElementById('auto-advance-toggle').checked = true;
  }

  loadProgress();
  updateStreakDisplay();
}

// Load progress from localStorage
function loadProgress() {
  const savedProgress = localStorage.getItem('quizProgress');
  if (savedProgress) {
    progress = JSON.parse(savedProgress);
  } else {
    initializeProgress();
  }
}

// Initialize progress structure
function initializeProgress() {
  chapters.internship.chapters.forEach(chapter => {
    progress[chapter.id] = {
      completed: 0,
      total: chapter.quizzes.length,
      quizzes: {}
    };
    chapter.quizzes.forEach(quiz => {
      progress[chapter.id].quizzes[quiz.id] = {
        score: null,
        attempts: 0,
        completed: false,
        lastAttempt: null
      };
    });
  });
  saveProgress();
}

// Save progress to localStorage
function saveProgress() {
  localStorage.setItem('quizProgress', JSON.stringify(progress));
}

// Save streak to localStorage
function saveStreak() {
  localStorage.setItem('streak', JSON.stringify({
    current: state.currentStreak,
    best: state.bestStreak,
    lastDate: state.lastQuizDate
  }));
}

// Update streak on quiz completion
function updateStreak(passed) {
  const today = new Date().toDateString();
  
  if (passed) {
    if (state.lastQuizDate !== today) {
      state.currentStreak++;
      state.lastQuizDate = today;
      
      if (state.currentStreak > state.bestStreak) {
        state.bestStreak = state.currentStreak;
      }
    }
  } else {
    if (state.lastQuizDate !== today) {
      state.currentStreak = 0;
      state.lastQuizDate = today;
    }
  }
  saveStreak();
  updateStreakDisplay();
}

// Update streak display
function updateStreakDisplay() {
  document.getElementById('current-streak').textContent = state.currentStreak;
  document.getElementById('best-streak').textContent = state.bestStreak;
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

// Navigation Functions
function showChapters() {
  state.currentChapter = null;
  state.currentQuiz = null;
  state.currentMode = null;
  showScreen('chapter-selection');
  renderChapters();
}

function selectChapter(chapterId) {
  state.currentChapter = chapterId;
  state.currentQuestion = 0;
  state.answers = {};
  showScreen('quiz-selection');
  renderQuizzes();
}

function backToChapters() {
  showChapters();
}

function selectQuiz(quizId) {
  state.currentQuiz = quizId;
  state.currentQuestion = 0;
  state.answers = {};
  showScreen('mode-selection');
  
  const chapter = chapters.internship.chapters.find(ch => ch.id === state.currentChapter);
  const quiz = chapter.quizzes.find(q => q.id === quizId);
  
  document.getElementById('mode-title').textContent = quiz.name;
  document.getElementById('mode-subtitle').textContent = 'Choose how you want to engage with this quiz';
}

function backToSelection() {
  showChapters();
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
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active');
  });
  document.getElementById(screenId).classList.add('active');
}

// Render Chapters
function renderChapters() {
  const container = document.getElementById('chapter-cards-container');
  container.innerHTML = '';
  
  chapters.internship.chapters.forEach(chapter => {
    const chapterProgress = progress[chapter.id];
    const percentage = Math.round((chapterProgress.completed / chapterProgress.total) * 100);
    const completionBadge = chapterProgress.completed === chapterProgress.total ? '✓ Completed' : `${percentage}%`;
    
    const card = document.createElement('div');
    card.className = 'chapter-card';
    card.onclick = () => selectChapter(chapter.id);
    
    card.innerHTML = `
      <div class="chapter-icon">${chapter.icon}</div>
      <h2>${chapter.name}</h2>
      <p>${chapter.description}</p>
      <div class="chapter-completion">
        <span class="completion-badge">${chapterProgress.completed === chapterProgress.total ? '✓' : '◐'}</span>
        <span class="completion-text"><span class="completion-percentage">${percentage}%</span> Complete</span>
      </div>
      <button class="btn btn-primary">Start Chapter</button>
    `;
    
    container.appendChild(card);
  });
}

// Render Quizzes for Chapter
function renderQuizzes() {
  const chapter = chapters.internship.chapters.find(ch => ch.id === state.currentChapter);
  const chapterProgress = progress[state.currentChapter];
  const percentage = Math.round((chapterProgress.completed / chapterProgress.total) * 100);
  
  // Update chapter header
  document.getElementById('current-chapter-name').textContent = chapter.name;
  document.getElementById('chapter-title').textContent = chapter.name;
  document.getElementById('chapter-description').textContent = chapter.description;
  document.getElementById('chapter-percentage').textContent = `${percentage}%`;
  
  // Update progress ring
  const circle = document.getElementById('progress-ring-fill');
  const offset = 282.7 * (1 - percentage / 100);
  circle.style.strokeDashoffset = offset;
  
  // Render quiz cards
  const container = document.getElementById('quiz-cards-container');
  container.innerHTML = '';
  
  chapter.quizzes.forEach((quiz, index) => {
    const quizProgress = chapterProgress.quizzes[quiz.id];
    const card = document.createElement('div');
    card.className = 'quiz-card';
    card.innerHTML = `
      <div class="quiz-icon" style="margin-bottom: 10px;">📋</div>
      <h3 style="color: var(--text-primary); margin-bottom: 8px;">${quiz.name}</h3>
    `;
    
    if (quizProgress.completed) {
      const scoreElement = document.createElement('div');
      scoreElement.className = 'quiz-card-score';
      scoreElement.textContent = `${quizProgress.score}/10`;
      card.appendChild(scoreElement);
    }
    
    const button = document.createElement('button');
    button.className = 'btn btn-primary';
    button.textContent = quizProgress.completed ? 'Retake' : 'Start';
    button.onclick = () => selectQuiz(quiz.id);
    card.appendChild(button);
    
    container.appendChild(card);
  });
}

// Quiz Taking Logic
function renderQuestion() {
  const chapter = chapters.internship.chapters.find(ch => ch.id === state.currentChapter);
  const quiz = chapter.quizzes.find(q => q.id === state.currentQuiz);
  const question = quiz.questions[state.currentQuestion];
  
  document.getElementById('quiz-name').textContent = quiz.name;
  document.getElementById('progress-text').textContent = 
    `Question ${state.currentQuestion + 1} of ${quiz.questions.length}`;
  
  const progress = ((state.currentQuestion + 1) / quiz.questions.length) * 100;
  document.getElementById('progress-fill').style.width = progress + '%';
  
  document.getElementById('question-text').textContent = question.question;
  
  const optionsContainer = document.getElementById('options-container');
  optionsContainer.innerHTML = '';
  
  question.options.forEach((option) => {
    const optionEl = document.createElement('div');
    optionEl.className = 'option';
    optionEl.textContent = option;
    
    if (state.answers[state.currentQuestion] === option) {
      optionEl.classList.add('selected');
    }
    
    optionEl.addEventListener('click', () => selectOption(option, optionEl));
    optionsContainer.appendChild(optionEl);
  });
  
  updateNavigationButtons();
}

function selectOption(option, element) {
  document.querySelectorAll('.option').forEach(opt => {
    opt.classList.remove('selected');
  });
  
  element.classList.add('selected');
  state.answers[state.currentQuestion] = option;
  
  if (state.autoAdvance) {
    const chapter = chapters.internship.chapters.find(ch => ch.id === state.currentChapter);
    const quiz = chapter.quizzes.find(q => q.id === state.currentQuiz);
    if (state.currentQuestion < quiz.questions.length - 1) {
      setTimeout(() => {
        nextQuestion();
      }, 500);
    }
  }
}

function updateNavigationButtons() {
  const chapter = chapters.internship.chapters.find(ch => ch.id === state.currentChapter);
  const quiz = chapter.quizzes.find(q => q.id === state.currentQuiz);
  const prevBtn = document.querySelector('.quiz-controls .btn-secondary');
  const nextBtn = document.getElementById('next-btn');
  
  prevBtn.disabled = state.currentQuestion === 0;
  
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
  const chapter = chapters.internship.chapters.find(ch => ch.id === state.currentChapter);
  const quiz = chapter.quizzes.find(q => q.id === state.currentQuiz);
  
  if (state.currentQuestion === quiz.questions.length - 1) {
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
  const chapter = chapters.internship.chapters.find(ch => ch.id === state.currentChapter);
  const quiz = chapter.quizzes.find(q => q.id === state.currentQuiz);
  let correctCount = 0;
  
  quiz.questions.forEach((question, index) => {
    if (state.answers[index] === question.answer) {
      correctCount++;
    }
  });
  
  const percentage = (correctCount / quiz.questions.length) * 100;
  const passed = percentage >= 60;
  
  // Update progress
  const quizProgress = progress[state.currentChapter].quizzes[state.currentQuiz];
  if (!quizProgress.completed) {
    progress[state.currentChapter].completed++;
  }
  quizProgress.completed = true;
  quizProgress.score = correctCount;
  quizProgress.attempts++;
  quizProgress.lastAttempt = new Date().toISOString();
  saveProgress();
  
  // Update streak
  updateStreak(passed);
  
  document.getElementById('final-score').textContent = correctCount;
  document.getElementById('total-score').textContent = quiz.questions.length;
  
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
  const chapter = chapters.internship.chapters.find(ch => ch.id === state.currentChapter);
  const quiz = chapter.quizzes.find(q => q.id === state.currentQuiz);
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
  showChapters();
});
