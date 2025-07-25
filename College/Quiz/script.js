const quizzes = [
  {
    label: "QuizUI Demo",
    url: "quiz-ui/index.html",
    desc: "Frontend-only quiz sample.<br>No backend connections."
  },
  {
    label: "QuizLogic Classic",
    url: "quiz-classic/index.html",
    desc: "The classic version — simple and solid.<br>Reliable and clean logic."
  },
  {
    label: "QuizLogic Advanced",
    url: "quiz-advanced/index.html",
    desc: "Enhanced logic and flexibility.<br>More depth, better customization."
  }
];


const quizList = document.getElementById("quiz-list");

quizzes.forEach(quiz => {
    // Create button
    const button = document.createElement("button");
    button.className = "redirect-btn";
    button.textContent = quiz.label;
    button.setAttribute("data-url", quiz.url);
    button.setAttribute("tabindex", "0");

    // Create description
    const desc = document.createElement("div");
    desc.className = "desc";
    desc.innerHTML = quiz.desc;

    // Append to quiz list
    quizList.appendChild(button);
    quizList.appendChild(desc);

    // Click handler
    button.addEventListener("click", () => {
        console.log(`Redirecting to: ${quiz.url}`);
        button.classList.add("clicked");
        button.disabled = true;
        button.textContent = "Redirecting...";
        setTimeout(() => {
            window.location.href = quiz.url;
        }, 180);
    });

    // Keyboard support
    button.addEventListener("keydown", e => {
        if (e.key === "Enter" || e.key === " ") {
            button.click();
        }
    });
});