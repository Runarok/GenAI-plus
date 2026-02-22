// Quiz Data
    const quizzes = [
      {
        name: "Computer Science Fundamentals 1",
        description: "Basic concepts of computer science and its importance.",
        questions: [
          {
            question: "Computer Science is best defined as the study of:",
            options: ["Computers only", "Software applications", "Computation, data, and algorithms", "Internet technologies"],
            answer: "Computation, data, and algorithms"
          },
          {
            question: "Which best describes the relationship between the real world and computing?",
            options: ["Computing replaces the real world", "Computing models and solves real-world problems", "Computing works independently of reality", "Computing is limited to games"],
            answer: "Computing models and solves real-world problems"
          },
          {
            question: "Mathematics is important in computer science because it helps in:",
            options: ["Designing user interfaces", "Logical reasoning and problem solving", "Hardware manufacturing", "Marketing software"],
            answer: "Logical reasoning and problem solving"
          },
          {
            question: "Which of the following is a key historical milestone in computer science?",
            options: ["Invention of smartphones", "Development of algorithms and programming languages", "Creation of social media", "Launch of e-commerce websites"],
            answer: "Development of algorithms and programming languages"
          },
          {
            question: "Computer science is critical today mainly because it:",
            options: ["Replaces all human work", "Powers innovation across industries", "Is used only by programmers", "Is limited to academics"],
            answer: "Powers innovation across industries"
          },
          {
            question: "The Input → Process → Output (IPO) model represents:",
            options: ["Data storage", "Computer hardware design", "Basic working of a computer system", "Internet communication"],
            answer: "Basic working of a computer system"
          },
          {
            question: "Data can be best described as:",
            options: ["Processed results", "Raw facts and figures", "Final reports", "Decisions"],
            answer: "Raw facts and figures"
          },
          {
            question: "Information is:",
            options: ["Unprocessed data", "Random numbers", "Meaningful processed data", "Computer instructions"],
            answer: "Meaningful processed data"
          },
          {
            question: "Which component is responsible for executing instructions?",
            options: ["Memory", "Storage", "CPU", "Input device"],
            answer: "CPU"
          },
          {
            question: "Which of the following is an example of primary memory?",
            options: ["Hard disk", "SSD", "RAM", "Pen drive"],
            answer: "RAM"
          }
        ]
      },
      {
        name: "C Programming Basics 1",
        description: "Introduction to C language, its origin, and basic usage.",
        questions: [
          {
            question: "The C programming language was developed by:",
            options: ["James Gosling", "Dennis Ritchie", "Bjarne Stroustrup", "Guido van Rossum"],
            answer: "Dennis Ritchie"
          },
          {
            question: "C was originally developed at:",
            options: ["Microsoft", "Bell Labs", "IBM", "Google"],
            answer: "Bell Labs"
          },
          {
            question: "The C language was mainly created to develop:",
            options: ["Mobile applications", "Operating systems", "Web applications", "Games"],
            answer: "Operating systems"
          },
          {
            question: "Which operating system was written using C?",
            options: ["Windows XP", "UNIX", "Android", "macOS"],
            answer: "UNIX"
          },
          {
            question: "C is called a procedural language because it:",
            options: ["Uses objects", "Follows step-by-step procedures", "Works only with hardware", "Uses markup"],
            answer: "Follows step-by-step procedures"
          },
          {
            question: "C is a compiled language, which means:",
            options: ["It runs directly without translation", "Code is converted to machine code before execution", "It is interpreted line by line", "It does not need a compiler"],
            answer: "Code is converted to machine code before execution"
          },
          {
            question: "Portability in C means:",
            options: ["C programs run only on one system", "C code can run on different machines with little or no change", "C programs are very large", "C does not support hardware"],
            answer: "C code can run on different machines with little or no change"
          },
          {
            question: "C is widely used today in:",
            options: ["Graphic design", "Embedded systems", "Blogging platforms", "Spreadsheet software"],
            answer: "Embedded systems"
          },
          {
            question: "Which of the following is NOT a common use of C?",
            options: ["Operating systems", "Embedded systems", "Web page styling", "Compilers"],
            answer: "Web page styling"
          },
          {
            question: "GCC stands for:",
            options: ["General Code Compiler", "GNU Compiler Collection", "Global C Compiler", "Graphical Code Creator"],
            answer: "GNU Compiler Collection"
          }
        ]
      },
      {
        name: "C Programming Basics 2",
        description: "Understanding C syntax, keywords, and case sensitivity.",
        questions: [
          {
            question: "C is a case-sensitive language, which means:",
            options: ["Uppercase and lowercase letters are treated the same", "Only uppercase letters are allowed", "Uppercase and lowercase letters are treated differently", "Keywords can be written in any case"],
            answer: "Uppercase and lowercase letters are treated differently"
          },
          {
            question: "Which of the following is a valid C keyword?",
            options: ["Integer", "constant", "int", "number"],
            answer: "int"
          },
          {
            question: "In C, every statement usually ends with:",
            options: [":", ",", ";", "."],
            answer: ";"
          },
          {
            question: "Curly braces { } in C are used to:",
            options: ["End statements", "Define blocks of code", "Write comments", "Declare variables"],
            answer: "Define blocks of code"
          },
          {
            question: "Which of the following is a valid identifier in C?",
            options: ["2value", "float", "total_sum", "total-sum"],
            answer: "total_sum"
          },
          {
            question: "Which is NOT allowed in an identifier?",
            options: ["Letters", "Underscore (_)", "Digits (not at start)", "Special symbols like @ or #"],
            answer: "Special symbols like @ or #"
          },
          {
            question: "Missing semicolon in C results in:",
            options: ["Runtime error", "Syntax error", "Logical error", "No error"],
            answer: "Syntax error"
          },
          {
            question: "Which of the following is a primitive data type in C?",
            options: ["array", "structure", "int", "pointer"],
            answer: "int"
          },
          {
            question: "The float data type is used to store:",
            options: ["Whole numbers", "Characters", "Decimal numbers", "True/False values"],
            answer: "Decimal numbers"
          },
          {
            question: "Which data type stores a single character?",
            options: ["int", "float", "char", "double"],
            answer: "char"
          }
        ]
      },
      {
        name: "C Programming Advanced 1",
        description: "Decision making, loops, and relational operators in C.",
        questions: [
          {
            question: "Computers evaluate conditions using:",
            options: ["Boolean expressions", "Images", "Audio files", "Hardware ports"],
            answer: "Boolean expressions"
          },
          {
            question: "Which statement is used for decision making?",
            options: ["for", "if", "return", "include"],
            answer: "if"
          },
          {
            question: "The if-else statement is used to:",
            options: ["Repeat code", "Choose between two conditions", "Define variables", "Create arrays"],
            answer: "Choose between two conditions"
          },
          {
            question: "else-if is useful when:",
            options: ["Only one condition exists", "Multiple conditions need checking", "Loops are required", "Functions are removed"],
            answer: "Multiple conditions need checking"
          },
          {
            question: "The switch-case statement is commonly used for:",
            options: ["Multiple fixed value comparisons", "Looping arrays", "Creating variables", "File handling"],
            answer: "Multiple fixed value comparisons"
          },
          {
            question: "Which is a relational operator?",
            options: ["+", "==", "&", "#"],
            answer: "=="
          },
          {
            question: "Logical AND operator is:",
            options: ["||", "&&", "==", "%"],
            answer: "&&"
          },
          {
            question: "Loops are mainly used for:",
            options: ["Repetitive execution", "Styling code", "Storing images", "Creating servers"],
            answer: "Repetitive execution"
          },
          {
            question: "Which loop is best when iteration count is known?",
            options: ["for", "while", "do-while", "switch"],
            answer: "for"
          },
          {
            question: "Which loop checks condition before execution?",
            options: ["while", "do-while", "switch", "case"],
            answer: "while"
          }
        ]
      },
      {
        name: "C Programming Advanced 2",
        description: "Arrays, pointers, and memory management in C.",
        questions: [
          {
            question: "A single-dimensional array stores:",
            options: ["One value only", "Multiple values of same type", "Different data types always", "Only characters"],
            answer: "Multiple values of same type"
          },
          {
            question: "A multi-dimensional array is commonly used for:",
            options: ["Storing tables or matrices", "Writing loops", "Declaring functions", "Managing files"],
            answer: "Storing tables or matrices"
          },
          {
            question: "Array elements are stored in memory:",
            options: ["Randomly", "Contiguously", "In separate files", "In CPU registers only"],
            answer: "Contiguously"
          },
          {
            question: "Array indexing in C starts from:",
            options: ["1", "-1", "0", "v"],
            answer: "0"
          },
          {
            question: "The name of an array represents:",
            options: ["First element value", "Base memory address", "Loop counter", "Data type only"],
            answer: "Base memory address"
          },
          {
            question: "To access the third element of arr, we use:",
            options: ["arr[3]", "arr(2)", "arr[2]", "arr{2}"],
            answer: "arr[2]"
          },
          {
            question: "A pointer is a variable that stores:",
            options: ["Data value only", "Memory address", "File name", "Loop count"],
            answer: "Memory address"
          },
          {
            question: "The & operator is used to:",
            options: ["Perform addition", "Get memory address", "Declare pointer", "Dereference pointer"],
            answer: "Get memory address"
          },
          {
            question: "The * symbol in pointer declaration means:",
            options: ["Multiplication", "Pointer variable", "Loop operator", "File operator"],
            answer: "Pointer variable"
          },
          {
            question: "Dereferencing a pointer allows you to:",
            options: ["Access the value at stored address", "Delete memory", "Create arrays", "Close program"],
            answer: "Access the value at stored address"
          }
        ]
      }
    ];

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