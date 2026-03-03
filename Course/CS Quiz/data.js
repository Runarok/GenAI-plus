// Quiz Data
const quizzes = [{
    name: "Computer Science Fundamentals 1",
    description: "Basic concepts of computer science and its importance.",
    questions: [{
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
    name: "C Programming Basics 2",
    description: "Introduction to C language, its origin, and basic usage.",
    questions: [{
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
    name: "C Programming Basics 3",
    description: "Understanding C syntax, keywords, and case sensitivity.",
    questions: [{
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
    questions: [{
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
    questions: [{
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
  },
  {
    name: "C Programming Advanced 3",
    description: "Understanding variable argument functions and memory concepts in C.",
    questions: [{
        question: "Variable argument functions allow:",
        options: ["Passing flexible number of parameters", "Only fixed arguments", "No parameters", "Only arrays"],
        answer: "Passing flexible number of parameters"
      },
      {
        question: "Which header file supports variable arguments?",
        options: ["stdarg.h", "stdio.h", "string.h", "math.h"],
        answer: "stdarg.h"
      },
      {
        question: "va_list is used to:",
        options: ["Declare a variable argument list", "Allocate memory", "Define arrays", "Print output"],
        answer: "Declare a variable argument list"
      },
      {
        question: "va_start is used to:",
        options: ["Initialize argument access", "End function execution", "Free memory", "Declare pointer"],
        answer: "Initialize argument access"
      },
      {
        question: "va_arg retrieves:",
        options: ["Next argument from list", "Array index", "Loop variable", "File name"],
        answer: "Next argument from list"
      },
      {
        question: "va_end is used to:",
        options: ["Clean up variable argument processing", "End program", "Stop loops", "Free heap memory"],
        answer: "Clean up variable argument processing"
      },
      {
        question: "A common real-world example of variable arguments is:",
        options: ["printf()", "scanf() only", "malloc()", "fopen()"],
        answer: "printf()"
      },
      {
        question: "Variable argument lists improve:",
        options: ["Function flexibility", "Memory usage only", "File storage", "Compilation speed"],
        answer: "Function flexibility"
      },
      {
        question: "Stack memory is typically used for:",
        options: ["Local variables", "Dynamic arrays", "Files", "Graphics"],
        answer: "Local variables"
      },
      {
        question: "Heap memory is used for:",
        options: ["Dynamic memory allocation", "Loop counters", "Preprocessor macros", "Static variables"],
        answer: "Dynamic memory allocation"
      },
    ]
  },
  {
    name: "C Programming Advanced 4",
    description: "File operations and common types of errors in C programming.",
    questions: [{
        question: "File handling allows programs to:",
        options: ["Read and write data to files", "Design UI", "Edit hardware", "Create networks"],
        answer: "Read and write data to files"
      },
      {
        question: "Which function is used to open a file?",
        options: ["fopen()", "fclose()", "fprintf()", "fscanf()"],
        answer: "fopen()"
      },
      {
        question: "fclose() is used to:",
        options: ["Close an opened file", "Open memory", "Write strings", "Allocate memory"],
        answer: "Close an opened file"
      },
      {
        question: "fprintf() is mainly used to:",
        options: ["Write formatted data to a file", "Read files", "Allocate arrays", "Debug code"],
        answer: "Write formatted data to a file"
      },
      {
        question: "fscanf() is used to:",
        options: ["Read formatted data from a file", "Write arrays", "Print output to console", "Free memory"],
        answer: "Read formatted data from a file"
      },
      {
        question: "fgets() reads:",
        options: ["A line of text from file", "Integer values only", "Binary data only", "Memory address"],
        answer: "A line of text from file"
      },
      {
        question: "File mode \"r\" means:",
        options: ["Read-only", "Write-only", "Append", "Execute"],
        answer: "Read-only"
      },
      {
        question: "File mode \"a\" is used to:",
        options: ["Append data to file", "Delete file", "Read file only", "Replace file always"],
        answer: "Append data to file"
      },
      {
        question: "Runtime errors occur during:",
        options: ["Program execution", "Compilation", "Code writing", "Linking only"],
        answer: "Program execution"
      },
      {
        question: "Logical errors cause:",
        options: ["Incorrect program output", "Compilation failure", "Hardware crash", "Memory allocation"],
        answer: "Incorrect program output"
      }
    ]
  }
];