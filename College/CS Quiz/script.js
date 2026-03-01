    // State Management
    let currentQuiz = null;
    let currentQuestion = 0;
    let userAnswers = {};
    let isQuizActive = false;

    // Elements
    const quizSelectionEl = document.getElementById('quizSelection');
    const quizScreenEl = document.getElementById('quizScreen');
    const resultsScreenEl = document.getElementById('resultsScreen');
    const themeToggle = document.querySelector('.theme-toggle');
    const exitBtn = document.querySelector('.exit-btn');
    const cheatingWarning = document.getElementById('cheatingWarning');

    // Initialize
    document.addEventListener('DOMContentLoaded', () => {
      renderQuizSelection();
      setupThemeToggle();
      setupCheatingPrevention();
    });

    // Theme Toggle
    function setupThemeToggle() {
      const savedTheme = localStorage.getItem('theme') || 'dark';
      applyTheme(savedTheme);
      
      themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.classList.contains('light-theme') ? 'light' : 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
      });
    }

    function applyTheme(theme) {
      if (theme === 'light') {
        document.documentElement.classList.add('light-theme');
        themeToggle.textContent = '☀️ Light';
      } else {
        document.documentElement.classList.remove('light-theme');
        themeToggle.textContent = '🌙 Dark';
      }
    }

    // Cheating Prevention
    function setupCheatingPrevention() {
      // Prevent tab switching during quiz
      document.addEventListener('visibilitychange', () => {
        if (isQuizActive && document.hidden) {
          console.warn('User switched tabs during quiz');
        }
        
        if (isQuizActive && !document.hidden) {
          showCheatingWarning();
        }
      });

      // Disable right-click during quiz (optional)
      document.addEventListener('contextmenu', (e) => {
        if (isQuizActive) {
          e.preventDefault();
        }
      });

      // Disable F12, DevTools shortcuts
      document.addEventListener('keydown', (e) => {
        if (isQuizActive) {
          if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I') ||
              (e.ctrlKey && e.shiftKey && e.key === 'C') ||
              (e.ctrlKey && e.key === 'U')) {
            e.preventDefault();
          }
        }
      });
    }

    function showCheatingWarning() {
      cheatingWarning.classList.add('show');
      setTimeout(() => {
        cheatingWarning.classList.remove('show');
      }, 3000);
    }

    // Quiz Selection
    function renderQuizSelection() {
      quizSelectionEl.innerHTML = '';
      quizzes.forEach((quiz, index) => {
        const card = document.createElement('div');
        card.className = 'quiz-card';
        card.innerHTML = `
          <h3>${quiz.name}</h3>
          <p>${quiz.description}</p>
          <span class="question-count">${quiz.questions.length} Questions</span>
        `;
        card.addEventListener('click', () => startQuiz(index));
        quizSelectionEl.appendChild(card);
      });
    }

    // Start Quiz
    function startQuiz(index) {
      currentQuiz = quizzes[index];
      currentQuestion = 0;
      userAnswers = {};
      isQuizActive = true;
      
      quizSelectionEl.style.display = 'none';
      quizScreenEl.classList.add('active');
      resultsScreenEl.classList.remove('active');
      exitBtn.classList.add('visible');
      
      renderQuestion();
    }

    // Render Question
    function renderQuestion() {
      const question = currentQuiz.questions[currentQuestion];
      const questionNumber = currentQuestion + 1;
      const totalQuestions = currentQuiz.questions.length;
      const progress = (currentQuestion / totalQuestions) * 100;

      document.getElementById('quizTitle').textContent = currentQuiz.name;
      document.getElementById('questionNumber').textContent = `Question ${questionNumber} of ${totalQuestions}`;
      document.getElementById('questionText').textContent = question.question;
      document.getElementById('progressText').textContent = `${questionNumber} of ${totalQuestions}`;
      document.getElementById('progressFill').style.width = progress + '%';

      // Render options
      const optionsContainer = document.getElementById('optionsContainer');
      optionsContainer.innerHTML = '';
      
      question.options.forEach((option, idx) => {
        const optionEl = document.createElement('div');
        optionEl.className = 'option';
        
        if (userAnswers[currentQuestion] === option) {
          optionEl.classList.add('selected');
        }
        
        optionEl.innerHTML = `<span class="option-text">${option}</span>`;
        optionEl.addEventListener('click', () => selectAnswer(option, optionEl));
        optionsContainer.appendChild(optionEl);
      });

      // Update buttons
      document.getElementById('prevBtn').disabled = currentQuestion === 0;
      const nextBtn = document.getElementById('nextBtn');
      if (currentQuestion === currentQuiz.questions.length - 1) {
        nextBtn.textContent = 'Submit Quiz ✓';
        nextBtn.classList.add('btn-primary');
      } else {
        nextBtn.textContent = 'Next →';
      }

      // Add button listeners
      document.getElementById('prevBtn').onclick = () => previousQuestion();
      document.getElementById('nextBtn').onclick = () => nextQuestion();
    }

    // Select Answer
    function selectAnswer(option, element) {
      userAnswers[currentQuestion] = option;
      
      // Update UI
      document.querySelectorAll('.option').forEach(opt => {
        opt.classList.remove('selected');
      });
      element.classList.add('selected');
    }

    // Navigation
    function nextQuestion() {
      if (currentQuestion < currentQuiz.questions.length - 1) {
        currentQuestion++;
        renderQuestion();
      } else {
        finishQuiz();
      }
    }

    function previousQuestion() {
      if (currentQuestion > 0) {
        currentQuestion--;
        renderQuestion();
      }
    }

    // Finish Quiz
    function finishQuiz() {
      isQuizActive = false;
      let correctCount = 0;

      currentQuiz.questions.forEach((question, idx) => {
        if (userAnswers[idx] === question.answer) {
          correctCount++;
        }
      });

      const totalQuestions = currentQuiz.questions.length;
      const percentage = Math.round((correctCount / totalQuestions) * 100);

      // Display Results
      document.getElementById('scoreDisplay').textContent = `${correctCount}/${totalQuestions}`;
      document.getElementById('correctCount').textContent = correctCount;
      document.getElementById('incorrectCount').textContent = totalQuestions - correctCount;
      document.getElementById('percentageScore').textContent = percentage + '%';

      // Feedback Message
      let feedback = '';
      if (percentage === 100) {
        feedback = '🎉 Perfect Score! Outstanding performance!';
      } else if (percentage >= 80) {
        feedback = '✨ Excellent! You\'ve mastered the material!';
      } else if (percentage >= 60) {
        feedback = '👍 Good job! Keep practicing to improve!';
      } else if (percentage >= 40) {
        feedback = '📚 You need more practice. Review the material!';
      } else {
        feedback = '💪 Keep trying! Review and retake the quiz!';
      }
      
      document.getElementById('feedbackMessage').textContent = feedback;

      quizScreenEl.classList.remove('active');
      resultsScreenEl.classList.add('active');

      // Result Buttons
      document.getElementById('retakeBtn').onclick = () => {
        quizSelectionEl.style.display = 'grid';
        resultsScreenEl.classList.remove('active');
        exitBtn.classList.remove('visible');
        startQuiz(quizzes.indexOf(currentQuiz));
      };

      document.getElementById('homeBtn').onclick = () => {
        quizSelectionEl.style.display = 'grid';
        resultsScreenEl.classList.remove('active');
        exitBtn.classList.remove('visible');
        currentQuiz = null;
      };
    }

    // Exit Quiz
    exitBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to exit the quiz?')) {
        isQuizActive = false;
        quizSelectionEl.style.display = 'grid';
        quizScreenEl.classList.remove('active');
        resultsScreenEl.classList.remove('active');
        exitBtn.classList.remove('visible');
        currentQuiz = null;
      }
    });