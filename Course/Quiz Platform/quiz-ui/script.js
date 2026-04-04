    // Quiz Data
    const quizData = [{
        question: "What is the correct way to declare a variable in JavaScript?",
        options: ["var myVar = 5;", "variable myVar = 5;", "v myVar = 5;", "declare myVar = 5;"],
        correct: 0,
        difficulty: "easy"
    }, {
        question: "Which method is used to add an element to the end of an array?",
        options: ["append()", "push()", "add()", "insert()"],
        correct: 1,
        difficulty: "easy"
    }, {
        question: "What does '===' operator do in JavaScript?",
        options: ["Assigns a value", "Compares values only", "Compares values and types", "Creates a new variable"],
        correct: 2,
        difficulty: "medium"
    }, {
        question: "Which of the following is NOT a JavaScript data type?",
        options: ["String", "Boolean", "Float", "Undefined"],
        correct: 2,
        difficulty: "medium"
    }, {
        question: "What is the output of: console.log(typeof null)?",
        options: ["null", "undefined", "object", "boolean"],
        correct: 2,
        difficulty: "hard"
    }, {
        question: "How do you create a function in JavaScript?",
        options: ["function myFunction() {}", "create myFunction() {}", "def myFunction() {}", "func myFunction() {}"],
        correct: 0,
        difficulty: "easy"
    }, {
        question: "What is closure in JavaScript?",
        options: ["A way to close the browser", "A function with access to outer scope", "A method to end loops", "A type of variable"],
        correct: 1,
        difficulty: "hard"
    }, {
        question: "Which method converts a string to lowercase?",
        options: ["toLowerCase()", "toLower()", "lower()", "downCase()"],
        correct: 0,
        difficulty: "easy"
    }, {
        question: "What is the difference between 'let' and 'var'?",
        options: ["No difference", "let has block scope, var has function scope", "var is newer than let", "let is faster than var"],
        correct: 1,
        difficulty: "medium"
    }, {
        question: "What does the 'this' keyword refer to in JavaScript?",
        options: ["The current function", "The global object", "The object that owns the method", "The previous element"],
        correct: 2,
        difficulty: "hard"
    }];

    // Quiz State
    let currentQuestion = 0;
    let userAnswers = [];
    let quizStartTime = null;
    let timerInterval = null;
    let timeRemaining = 15 * 60; // 15 minutes in seconds

    // Theme Management
    function toggleTheme() {
        const body = document.body;
        const themeIcon = document.getElementById('theme-icon');
        const themeText = document.getElementById('theme-text');

        if (body.getAttribute('data-theme') === 'light') {
            body.removeAttribute('data-theme');
            themeIcon.className = 'fas fa-moon';
            themeText.textContent = 'Light Mode';
            localStorage.setItem('theme', 'dark');
        } else {
            body.setAttribute('data-theme', 'light');
            themeIcon.className = 'fas fa-sun';
            themeText.textContent = 'Dark Mode';
            localStorage.setItem('theme', 'light');
        }
    }

    // Initialize theme from localStorage
    function initTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.body.setAttribute('data-theme', 'light');
            document.getElementById('theme-icon').className = 'fas fa-sun';
            document.getElementById('theme-text').textContent = 'Dark Mode';
        }
    }

    // Timer Functions
    function startTimer() {
        timerInterval = setInterval(() => {
            timeRemaining--;
            updateTimerDisplay();

            if (timeRemaining <= 0) {
                clearInterval(timerInterval);
                finishQuiz();
            }
        }, 1000);
    }

    function updateTimerDisplay() {
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        const display = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        document.getElementById('timer-display').textContent = display;

        // Change color when time is running low
        const timerDisplay = document.getElementById('timer-display');
        if (timeRemaining <= 60) {
            timerDisplay.style.color = 'var(--error)';
        } else if (timeRemaining <= 300) {
            timerDisplay.style.color = 'var(--warning)';
        }
    }

    // Quiz Functions
    function startQuiz() {
        document.getElementById('quiz-start').classList.add('hidden');
        document.getElementById('quiz-progress').classList.remove('hidden');
        document.getElementById('question-container').classList.remove('hidden');

        quizStartTime = new Date();
        currentQuestion = 0;
        userAnswers = new Array(quizData.length).fill(null);

        startTimer();
        displayQuestion();
    }

    function displayQuestion() {
        const question = quizData[currentQuestion];

        // Update progress
        const progress = ((currentQuestion + 1) / quizData.length) * 100;
        document.getElementById('progress-fill').style.width = progress + '%';
        document.getElementById('progress-text').textContent = `Question ${currentQuestion + 1} of ${quizData.length}`;

        // Update question content
        document.getElementById('question-number').textContent = currentQuestion + 1;
        document.getElementById('question-text').textContent = question.question;

        // Set difficulty
        const difficultyElement = document.getElementById('question-difficulty');
        difficultyElement.textContent = question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1);
        difficultyElement.className = `question-difficulty difficulty-${question.difficulty}`;

        // Create options
        const optionsContainer = document.getElementById('options-container');
        optionsContainer.innerHTML = '';

        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'option';
            optionElement.onclick = () => selectOption(index);

            const letter = String.fromCharCode(65 + index); // A, B, C, D
            optionElement.innerHTML = `
    <div class="option-letter">${letter}</div>
    <div>${option}</div>
    `;

            if (userAnswers[currentQuestion] === index) {
                optionElement.classList.add('selected');
            }

            optionsContainer.appendChild(optionElement);
        });

        // Update navigation buttons
        document.getElementById('prev-btn').disabled = currentQuestion === 0;
        document.getElementById('next-btn').textContent = currentQuestion === quizData.length - 1 ? 'Finish Quiz' : 'Next';
    }

    function selectOption(optionIndex) {
        userAnswers[currentQuestion] = optionIndex;

        // Update visual selection
        const options = document.querySelectorAll('.option');
        options.forEach((option, index) => {
            option.classList.toggle('selected', index === optionIndex);
        });
    }

    function previousQuestion() {
        if (currentQuestion > 0) {
            currentQuestion--;
            displayQuestion();
        }
    }

    function nextQuestion() {
        if (currentQuestion < quizData.length - 1) {
            currentQuestion++;
            displayQuestion();
        } else {
            finishQuiz();
        }
    }

    function finishQuiz() {
        clearInterval(timerInterval);

        // Calculate results
        let correctAnswers = 0;
        userAnswers.forEach((answer, index) => {
            if (answer === quizData[index].correct) {
                correctAnswers++;
            }
        });

        const percentage = Math.round((correctAnswers / quizData.length) * 100);
        const timeTaken = Math.floor((new Date() - quizStartTime) / 1000);
        const minutes = Math.floor(timeTaken / 60);
        const seconds = timeTaken % 60;

        // Hide quiz, show results
        document.getElementById('quiz-progress').classList.add('hidden');
        document.getElementById('question-container').classList.add('hidden');
        document.getElementById('results-container').classList.remove('hidden');
        document.getElementById('timer').classList.add('hidden');

        // Update results display
        document.getElementById('score-percentage').textContent = percentage + '%';
        document.getElementById('correct-answers').textContent = correctAnswers;
        document.getElementById('time-taken').textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        document.getElementById('accuracy').textContent = percentage + '%';

        // Update score circle
        const scoreCircle = document.getElementById('score-circle');
        const degrees = (percentage / 100) * 360;
        scoreCircle.style.background = `conic-gradient(var(--accent-primary) ${degrees}deg, var(--bg-tertiary) ${degrees}deg)`;
    }

    function restartQuiz() {
        // Reset state
        currentQuestion = 0;
        userAnswers = [];
        timeRemaining = 15 * 60;

        // Reset display
        document.getElementById('results-container').classList.add('hidden');
        document.getElementById('quiz-start').classList.remove('hidden');
        document.getElementById('timer').classList.remove('hidden');
        document.getElementById('timer-display').textContent = '15:00';
        document.getElementById('timer-display').style.color = 'var(--accent-primary)';
    }

    // Initialize on page load
    document.addEventListener('DOMContentLoaded', function() {
        initTheme();
    });