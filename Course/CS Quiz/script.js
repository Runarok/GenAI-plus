let selectedQuiz = null;
let currentAnswers = [];

window.onload = () => {
  if (!quizData || quizData.length === 0) {
    alert("Quiz data not loaded. Check data.js");
    return;
  }
  loadQuizList();
};

function loadQuizList() {
  const quizList = document.getElementById("quiz-list");
  quizList.innerHTML = "";

  quizData.forEach((quiz, index) => {
    const card = document.createElement("div");
    card.classList.add("quiz-card");

    card.innerHTML = `
      <div class="quiz-title">${quiz.name}</div>
      <div class="quiz-desc">${quiz.description}</div>
    `;

    card.onclick = () => selectQuiz(index);

    quizList.appendChild(card);
  });
}

function selectQuiz(index) {
  selectedQuiz = quizData[index];
  document.getElementById("quiz-selection").classList.add("hidden");
  document.getElementById("mode-selection").classList.remove("hidden");
  document.getElementById("selected-quiz-title").innerText = selectedQuiz.name;
}

function goBack() {
  document.getElementById("mode-selection").classList.add("hidden");
  document.getElementById("quiz-selection").classList.remove("hidden");
}

function startQuiz() {
  currentAnswers = [];
  renderQuiz(false);
}

function showAnswers() {
  renderQuiz(true);
}

function renderQuiz(showCorrect) {
  const container = document.getElementById("quiz-container");
  container.innerHTML = "";
  container.classList.remove("hidden");
  document.getElementById("mode-selection").classList.add("hidden");

  selectedQuiz.questions.forEach((q, qIndex) => {
    const div = document.createElement("div");
    div.classList.add("question");

    const title = document.createElement("h3");
    title.innerText = `${qIndex + 1}. ${q.question}`;
    div.appendChild(title);

    q.options.forEach(option => {
      const btn = document.createElement("div");
      btn.classList.add("option");
      btn.innerText = option;

      if (showCorrect) {
        if (option === q.answer) btn.classList.add("correct");
      } else {
        btn.onclick = () => {
          currentAnswers[qIndex] = option;

          const siblings = div.querySelectorAll(".option");
          siblings.forEach(el => el.classList.remove("selected"));

          btn.classList.add("selected");
        };
      }

      div.appendChild(btn);
    });

    container.appendChild(div);
  });

  const bottomBtn = document.createElement("button");

  if (!showCorrect) {
    bottomBtn.innerText = "Submit Quiz";
    bottomBtn.onclick = submitQuiz;
  } else {
    bottomBtn.innerText = "Back";
    bottomBtn.onclick = () => location.reload();
  }

  container.appendChild(bottomBtn);
}

function submitQuiz() {
  let score = 0;

  selectedQuiz.questions.forEach((q, i) => {
    if (currentAnswers[i] === q.answer) score++;
  });

  const resultDiv = document.getElementById("result");
  document.getElementById("quiz-container").classList.add("hidden");

  resultDiv.classList.remove("hidden");
  resultDiv.innerHTML = `
    <h2>Your Score: ${score} / ${selectedQuiz.questions.length}</h2>
    <button onclick="location.reload()">Try Again</button>
  `;
}