const quizzes = {
  cs: {
    name: "CS Quiz",
    description: "Computer Science Fundamentals",
    questions: [
      {
        question: "What does CPU stand for?",
        options: ["Central Processing Unit", "Central Program Utility", "Computer Personal Unit", "Central Processor Utility"],
        answer: "Central Processing Unit"
      },
      {
        question: "Which of the following is a high-level programming language?",
        options: ["Assembly", "Machine Code", "Python", "Binary"],
        answer: "Python"
      },
      {
        question: "What is the time complexity of binary search?",
        options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
        answer: "O(log n)"
      },
      {
        question: "In object-oriented programming, what is encapsulation?",
        options: ["Bundling data and methods together", "Creating multiple objects", "Inheriting from a parent class", "Throwing exceptions"],
        answer: "Bundling data and methods together"
      },
      {
        question: "What is the main purpose of a database?",
        options: ["Store and retrieve data efficiently", "Execute programs", "Compile code", "Display graphics"],
        answer: "Store and retrieve data efficiently"
      },
      {
        question: "Which data structure uses LIFO (Last In First Out)?",
        options: ["Queue", "Stack", "Array", "Tree"],
        answer: "Stack"
      },
      {
        question: "What is polymorphism in OOP?",
        options: ["Multiple inheritance", "One object, many forms", "Defining multiple classes", "Method overloading only"],
        answer: "One object, many forms"
      },
      {
        question: "What does API stand for?",
        options: ["Application Programming Interface", "Advanced Programming Integration", "Application Process Interface", "Advanced Processor Interface"],
        answer: "Application Programming Interface"
      },
      {
        question: "Which sorting algorithm has the best average time complexity?",
        options: ["Bubble Sort", "Quick Sort", "Insertion Sort", "Selection Sort"],
        answer: "Quick Sort"
      },
      {
        question: "What is version control used for?",
        options: ["Managing code changes and collaboration", "Compiling code", "Testing software", "Designing databases"],
        answer: "Managing code changes and collaboration"
      }
    ]
  },
  ux: {
    name: "UX Quiz",
    description: "User Experience Design",
    questions: [
      {
        question: "What does UX stand for?",
        options: ["User Experience", "Universal Exchange", "User Extension", "Unified Extra"],
        answer: "User Experience"
      },
      {
        question: "What is the primary goal of UX design?",
        options: ["Make things look pretty", "Create a usable and enjoyable experience", "Follow design trends", "Reduce development costs"],
        answer: "Create a usable and enjoyable experience"
      },
      {
        question: "Which of the following is a key UX research method?",
        options: ["User interviews", "Trend analysis", "Color palette selection", "Font pairing"],
        answer: "User interviews"
      },
      {
        question: "What is a wireframe?",
        options: ["A low-fidelity layout blueprint", "A final design mockup", "HTML code", "A color scheme"],
        answer: "A low-fidelity layout blueprint"
      },
      {
        question: "What principle suggests that objects close together are related?",
        options: ["Proximity", "Contrast", "Alignment", "Repetition"],
        answer: "Proximity"
      },
      {
        question: "What is usability testing?",
        options: ["Testing code functionality", "Observing users interact with a product", "Checking for grammar", "Verifying design compliance"],
        answer: "Observing users interact with a product"
      },
      {
        question: "Which of the following is a design principle?",
        options: ["Consistency", "Randomness", "Complexity", "Confusion"],
        answer: "Consistency"
      },
      {
        question: "What is the purpose of user personas?",
        options: ["Represent target users for design", "Replace user research", "Create fake accounts", "Market the product"],
        answer: "Represent target users for design"
      },
      {
        question: "What does responsive design mean?",
        options: ["Design that adapts to different screen sizes", "Quick design process", "Interactive animations", "Color responsiveness"],
        answer: "Design that adapts to different screen sizes"
      },
      {
        question: "What is information architecture?",
        options: ["Organizing and structuring content", "Building information systems", "Encrypting data", "Creating databases"],
        answer: "Organizing and structuring content"
      }
    ]
  },
  game: {
    name: "Game Quiz",
    description: "Game Design Fundamentals",
    questions: [
      {
        question: "A game is generally defined as:",
        options: ["An activity with rules, objectives, and player interaction", "Only video-based entertainment", "A simulation without goals", "A story without interaction"],
        answer: "An activity with rules, objectives, and player interaction"
      },
      {
        question: "Which of the following is a key characteristic of a game?",
        options: ["No rules", "Random interaction without purpose", "Defined objectives and player engagement", "No feedback system"],
        answer: "Defined objectives and player engagement"
      },
      {
        question: "Which of the following would most likely be considered a non-game?",
        options: ["Chess", "Sudoku", "Calculator application", "Puzzle game"],
        answer: "Calculator application"
      },
      {
        question: "A Game Designer is mainly responsible for:",
        options: ["Designing gameplay mechanics and player experience", "Managing servers", "Creating financial reports", "Selling the game to retailers"],
        answer: "Designing gameplay mechanics and player experience"
      },
      {
        question: "A Game Programmer's role involves:",
        options: ["Writing the code that makes the game function", "Designing character outfits", "Creating marketing campaigns", "Recording voiceovers"],
        answer: "Writing the code that makes the game function"
      },
      {
        question: "Game genres categorize games based on:",
        options: ["Game file size", "Gameplay style and mechanics", "Number of players", "Graphics resolution"],
        answer: "Gameplay style and mechanics"
      },
      {
        question: "Which genre focuses on fast-paced gameplay and reflex-based challenges?",
        options: ["Action", "Simulation", "Puzzle", "RPG (Role-Playing Game)"],
        answer: "Action"
      },
      {
        question: "RPG (Role-Playing Game) typically includes:",
        options: ["Character progression and story-driven gameplay", "Only sports simulations", "Simple puzzle mechanics", "Racing mechanics"],
        answer: "Character progression and story-driven gameplay"
      },
      {
        question: "Strategy games usually emphasize:",
        options: ["Reflex speed only", "Planning, resource management, and decision-making", "Storyline progression only", "Physical sports simulation"],
        answer: "Planning, resource management, and decision-making"
      },
      {
        question: "Game mechanics define:",
        options: ["Hardware requirements", "How the game operates and how players interact with it", "Only story elements", "Only graphics"],
        answer: "How the game operates and how players interact with it"
      }
    ]
  }
};
