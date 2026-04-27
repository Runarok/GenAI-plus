const chapters = {
	internship: {
		name: "Internship Program",
		description: "Master the fundamentals of internship topics",
		chapters: [{
			id: "chapter1",
			name: "Chapter 1: Computer Science Fundamentals",
			description: "Master the core concepts of computer science, C programming, and algorithms.",
			icon: "📚",
			quizzes: [{
				id: "ch1-q1",
				name: "Quiz 1: Introduction",
				questions: [{
					question: "Computer Science is best defined as the study of:",
					options: ["Computers only", "Software applications", "Computation, data, and algorithms", "Internet technologies"],
					answer: "Computation, data, and algorithms"
				}, {
					question: "Which best describes the relationship between the real world and computing?",
					options: ["Computing replaces the real world", "Computing models and solves real-world problems", "Computing works independently of reality", "Computing is limited to games"],
					answer: "Computing models and solves real-world problems"
				}, {
					question: "Mathematics is important in computer science because it helps in:",
					options: ["Designing user interfaces", "Logical reasoning and problem solving", "Hardware manufacturing", "Marketing software"],
					answer: "Logical reasoning and problem solving"
				}, {
					question: "Which of the following is a key historical milestone in computer science?",
					options: ["Invention of smartphones", "Development of algorithms and programming languages", "Creation of social media", "Launch of e-commerce websites"],
					answer: "Development of algorithms and programming languages"
				}, {
					question: "Computer science is critical today mainly because it:",
					options: ["Replaces all human work", "Powers innovation across industries", "Is used only by programmers", "Is limited to academics"],
					answer: "Powers innovation across industries"
				}, {
					question: "The Input → Process → Output (IPO) model represents:",
					options: ["Data storage", "Computer hardware design", "Basic working of a computer system", "Internet communication"],
					answer: "Basic working of a computer system"
				}, {
					question: "Data can be best described as:",
					options: ["Processed results", "Raw facts and figures", "Final reports", "Decisions"],
					answer: "Raw facts and figures"
				}, {
					question: "Information is:",
					options: ["Unprocessed data", "Random numbers", "Meaningful processed data", "Computer instructions"],
					answer: "Meaningful processed data"
				}, {
					question: "Which component is responsible for executing instructions?",
					options: ["Memory", "Storage", "CPU", "Input device"],
					answer: "CPU"
				}, {
					question: "Which of the following is an example of primary memory?",
					options: ["Hard disk", "SSD", "RAM", "Pen drive"],
					answer: "RAM"
				}]
			}, {
				id: "ch1-q2",
				name: "Quiz 2: Basic Concepts",
				questions: [{
					question: "The C programming language was developed by:",
					options: ["James Gosling", "Dennis Ritchie", "Bjarne Stroustrup", "Guido van Rossum"],
					answer: "Dennis Ritchie"
				}, {
					question: "C was originally developed at:",
					options: ["Microsoft", "Bell Labs", "IBM", "Google"],
					answer: "Bell Labs"
				}, {
					question: "The C language was mainly created to develop:",
					options: ["Mobile applications", "Operating systems", "Web applications", "Games"],
					answer: "Operating systems"
				}, {
					question: "Which operating system was written using C?",
					options: ["Windows XP", "UNIX", "Android", "macOS"],
					answer: "UNIX"
				}, {
					question: "C is called a procedural language because it:",
					options: ["Uses objects", "Follows step-by-step procedures", "Works only with hardware", "Uses markup"],
					answer: "Follows step-by-step procedures"
				}, {
					question: "C is a compiled language, which means:",
					options: ["It runs directly without translation", "Code is converted to machine code before execution", "It is interpreted line by line", "It does not need a compiler"],
					answer: "Code is converted to machine code before execution"
				}, {
					question: "Portability in C means:",
					options: ["C programs run only on one system", "C code can run on different machines with little or no change", "C programs are very large", "C does not support hardware"],
					answer: "C code can run on different machines with little or no change"
				}, {
					question: "C is widely used today in:",
					options: ["Graphic design", "Embedded systems", "Blogging platforms", "Spreadsheet software"],
					answer: "Embedded systems"
				}, {
					question: "Which of the following is NOT a common use of C?",
					options: ["Operating systems", "Embedded systems", "Web page styling", "Compilers"],
					answer: "Web page styling"
				}, {
					question: "GCC stands for:",
					options: ["General Code Compiler", "GNU Compiler Collection", "Global C Compiler", "Graphical Code Creator"],
					answer: "GNU Compiler Collection"
				}]
			}, {
				id: "ch1-q3",
				name: "Quiz 3: Core Skills",
				questions: [{
					question: "C is a case-sensitive language, which means:",
					options: ["Uppercase and lowercase letters are treated the same", "Only uppercase letters are allowed", "Uppercase and lowercase letters are treated differently", "Keywords can be written in any case"],
					answer: "Uppercase and lowercase letters are treated differently"
				}, {
					question: "Which of the following is a valid C keyword?",
					options: ["Integer", "constant", "int", "number"],
					answer: "int"
				}, {
					question: "In C, every statement usually ends with:",
					options: [":", ",", ";", "."],
					answer: ";"
				}, {
					question: "Curly braces { } in C are used to:",
					options: ["End statements", "Define blocks of code", "Write comments", "Declare variables"],
					answer: "Define blocks of code"
				}, {
					question: "Which of the following is a valid identifier in C?",
					options: ["2value", "float", "total_sum", "total-sum"],
					answer: "total_sum"
				}, {
					question: "Which is NOT allowed in an identifier?",
					options: ["Letters", "Underscore (_)", "Digits (not at start)", "Special symbols like @ or #"],
					answer: "Special symbols like @ or #"
				}, {
					question: "Missing semicolon in C results in:",
					options: ["Runtime error", "Syntax error", "Logical error", "No error"],
					answer: "Syntax error"
				}, {
					question: "Which of the following is a primitive data type in C?",
					options: ["array", "structure", "int", "pointer"],
					answer: "int"
				}, {
					question: "The float data type is used to store:",
					options: ["Whole numbers", "Characters", "Decimal numbers", "True/False values"],
					answer: "Decimal numbers"
				}, {
					question: "Which data type stores a single character?",
					options: ["int", "float", "char", "double"],
					answer: "char"
				}]
			}, {
				id: "ch1-q4",
				name: "Quiz 4: Applications",
				questions: [{
					question: "Computers evaluate conditions using:",
					options: ["Boolean expressions", "Images", "Audio files", "Hardware ports"],
					answer: "Boolean expressions"
				}, {
					question: "Which statement is used for decision making?",
					options: ["for", "if", "return", "include"],
					answer: "if"
				}, {
					question: "The if-else statement is used to:",
					options: ["Repeat code", "Choose between two conditions", "Define variables", "Create arrays"],
					answer: "Choose between two conditions"
				}, {
					question: "else-if is useful when:",
					options: ["Only one condition exists", "Multiple conditions need checking", "Loops are required", "Functions are removed"],
					answer: "Multiple conditions need checking"
				}, {
					question: "The switch-case statement is commonly used for:",
					options: ["Multiple fixed value comparisons", "Looping arrays", "Creating variables", "File handling"],
					answer: "Multiple fixed value comparisons"
				}, {
					question: "Which is a relational operator?",
					options: ["+", "==", "&", "#"],
					answer: "=="
				}, {
					question: "Logical AND operator is:",
					options: ["||", "&&", "==", "%"],
					answer: "&&"
				}, {
					question: "Loops are mainly used for:",
					options: ["Repetitive execution", "Styling code", "Storing images", "Creating servers"],
					answer: "Repetitive execution"
				}, {
					question: "Which loop is best when iteration count is known?",
					options: ["for", "while", "do-while", "switch"],
					answer: "for"
				}, {
					question: "Which loop checks condition before execution?",
					options: ["while", "do-while", "switch", "case"],
					answer: "while"
				}]
			}, {
				id: "ch1-q5",
				name: "Quiz 5: Problem Solving",
				questions: [{
					question: "A single-dimensional array stores:",
					options: ["One value only", "Multiple values of same type", "Different data types always", "Only characters"],
					answer: "Multiple values of same type"
				}, {
					question: "A multi-dimensional array is commonly used for:",
					options: ["Storing tables or matrices", "Writing loops", "Declaring functions", "Managing files"],
					answer: "Storing tables or matrices"
				}, {
					question: "Array elements are stored in memory:",
					options: ["Randomly", "Contiguously", "In separate files", "In CPU registers only"],
					answer: "Contiguously"
				}, {
					question: "Array indexing in C starts from:",
					options: ["1", "-1", "0", "v"],
					answer: "0"
				}, {
					question: "The name of an array represents:",
					options: ["First element value", "Base memory address", "Loop counter", "Data type only"],
					answer: "Base memory address"
				}, {
					question: "To access the third element of arr, we use:",
					options: ["arr[3]", "arr(2)", "arr[2]", "arr{2}"],
					answer: "arr[2]"
				}, {
					question: "A pointer is a variable that stores:",
					options: ["Data value only", "Memory address", "File name", "Loop count"],
					answer: "Memory address"
				}, {
					question: "The & operator is used to:",
					options: ["Perform addition", "Get memory address", "Declare pointer", "Dereference pointer"],
					answer: "Get memory address"
				}, {
					question: "The * symbol in pointer declaration means:",
					options: ["Multiplication", "Pointer variable", "Loop operator", "File operator"],
					answer: "Pointer variable"
				}, {
					question: "Dereferencing a pointer allows you to:",
					options: ["Access the value at stored address", "Delete memory", "Create arrays", "Close program"],
					answer: "Access the value at stored address"
				}]
			}, {
				id: "ch1-q6",
				name: "Quiz 6: Learning Strategies",
				questions: [{
					question: "Variable argument functions allow:",
					options: ["Passing flexible number of parameters", "Only fixed arguments", "No parameters", "Only arrays"],
					answer: "Passing flexible number of parameters"
				}, {
					question: "Which header file supports variable arguments?",
					options: ["stdarg.h", "stdio.h", "string.h", "math.h"],
					answer: "stdarg.h"
				}, {
					question: "va_list is used to:",
					options: ["Declare a variable argument list", "Allocate memory", "Define arrays", "Print output"],
					answer: "Declare a variable argument list"
				}, {
					question: "va_start is used to:",
					options: ["Initialize argument access", "End function execution", "Free memory", "Declare pointer"],
					answer: "Initialize argument access"
				}, {
					question: "va_arg retrieves:",
					options: ["Next argument from list", "Array index", "Loop variable", "File name"],
					answer: "Next argument from list"
				}, {
					question: "va_end is used to:",
					options: ["Clean up variable argument processing", "End program", "Stop loops", "Free heap memory"],
					answer: "Clean up variable argument processing"
				}, {
					question: "A common real-world example of variable arguments is:",
					options: ["printf()", "scanf() only", "malloc()", "fopen()"],
					answer: "printf()"
				}, {
					question: "Variable argument lists improve:",
					options: ["Function flexibility", "Memory usage only", "File storage", "Compilation speed"],
					answer: "Function flexibility"
				}, {
					question: "Stack memory is typically used for:",
					options: ["Local variables", "Dynamic arrays", "Files", "Graphics"],
					answer: "Local variables"
				}, {
					question: "Heap memory is used for:",
					options: ["Dynamic memory allocation", "Loop counters", "Preprocessor macros", "Static variables"],
					answer: "Dynamic memory allocation"
				}]
			}, {
				id: "ch1-q7",
				name: "Quiz 7: Advanced Fundamentals",
				questions: [{
					question: "File handling allows programs to:",
					options: ["Read and write data to files", "Design UI", "Edit hardware", "Create networks"],
					answer: "Read and write data to files"
				}, {
					question: "Which function is used to open a file?",
					options: ["fopen()", "fclose()", "fprintf()", "fscanf()"],
					answer: "fopen()"
				}, {
					question: "fclose() is used to:",
					options: ["Close an opened file", "Open memory", "Write strings", "Allocate memory"],
					answer: "Close an opened file"
				}, {
					question: "fprintf() is mainly used to:",
					options: ["Write formatted data to a file", "Read files", "Allocate arrays", "Debug code"],
					answer: "Write formatted data to a file"
				}, {
					question: "fscanf() is used to:",
					options: ["Read formatted data from a file", "Write arrays", "Print output to console", "Free memory"],
					answer: "Read formatted data from a file"
				}, {
					question: "fgets() reads:",
					options: ["A line of text from file", "Integer values only", "Binary data only", "Memory address"],
					answer: "A line of text from file"
				}, {
					question: "File mode \"r\" means:",
					options: ["Read-only", "Write-only", "Append", "Execute"],
					answer: "Read-only"
				}, {
					question: "File mode \"a\" is used to:",
					options: ["Append data to file", "Delete file", "Read file only", "Replace file always"],
					answer: "Append data to file"
				}, {
					question: "Runtime errors occur during:",
					options: ["Program execution", "Compilation", "Code writing", "Linking only"],
					answer: "Program execution"
				}, {
					question: "Logical errors cause:",
					options: ["Incorrect program output", "Compilation failure", "Hardware crash", "Memory allocation"],
					answer: "Incorrect program output"
				}]
			}]
		}, {
			id: "chapter2",
			name: "Chapter 2: User Experience & Design",
			description: "Learn UX principles, design thinking, and create user-centered digital products.",
			icon: "🚀",
			quizzes: [{
				id: "ch2-q1",
				name: "Quiz 1: Building On Basics",
				questions: [{
					question: "UX design primarily focuses on:",
					options: ["Visual aesthetics only", "Overall user experience, usability, and satisfaction", "Backend coding", "Graphic illustration"],
					answer: "Overall user experience, usability, and satisfaction"
				}, {
					question: "The main difference between UX and UI is that:",
					options: ["UX deals with visuals, UI deals with research", "UX focuses on user journey and usability, while UI focuses on visual interface elements", "Both are identical", "UI includes backend programming"],
					answer: "UX focuses on user journey and usability, while UI focuses on visual interface elements"
				}, {
					question: "In the UX design lifecycle, the “Define” stage primarily involves:",
					options: ["Creating final UI designs", "Synthesizing research findings into problem statements", "Conducting usability testing", "Launching the product"],
					answer: "Synthesizing research findings into problem statements"
				}, {
					question: "Why does UX matter in digital products?",
					options: ["It increases file size", "It improves user satisfaction and conversion rates", "It reduces branding efforts", "It eliminates development costs"],
					answer: "It improves user satisfaction and conversion rates"
				}, {
					question: "A UX specialist review is best described as:",
					options: ["Random user feedback", "Expert evaluation of usability based on principles", "Developer testing only", "Visual redesign process"],
					answer: "Expert evaluation of usability based on principles"
				}, {
					question: "Heuristic evaluation primarily involves:",
					options: ["Surveying 1,000 users", "Comparing a product against established usability principles", "Conducting coding audits", "Running paid advertisements"],
					answer: "Comparing a product against established usability principles"
				}, {
					question: "Identifying friction points in UX refers to:",
					options: ["Color brightness only", "Areas where users experience confusion or friction", "Increasing animation effects", "Adding more content"],
					answer: "Areas where users experience confusion or friction"
				}, {
					question: "A severity rating system helps UX teams to:",
					options: ["Ignore minor issues", "Prioritize usability problems based on impact and frequency", "Increase development cost", "Remove testing phases"],
					answer: "Prioritize usability problems based on impact and frequency"
				}, {
					question: "Jakob Nielsen’s heuristic “Visibility of system status” emphasizes:",
					options: ["Hiding loading indicators", "Keeping users informed about what is happening", "Reducing feedback", "Complex navigation"],
					answer: "Keeping users informed about what is happening"
				}, {
					question: "The heuristic “Consistency and standards” ensures that:",
					options: ["Every page looks completely different", "Similar elements behave similarly across the interface", "Users must relearn navigation on each page", "UI patterns are unpredictable"],
					answer: "Similar elements behave similarly across the interface"
				}]
			}, {
				id: "ch2-q2",
				name: "Quiz 2: Advanced Applications",
				questions: [{
					question: "“Error prevention” as a usability principle suggests:",
					options: ["Allowing users to make frequent mistakes", "Designing systems that minimize the chance of user errors", "Ignoring form validation", "Removing confirmation messages"],
					answer: "Designing systems that minimize the chance of user errors"
				}, {
					question: "Qualitative UX research typically includes:",
					options: ["Large-scale statistical analysis", "Interviews and usability observations", "Revenue reports", "Server analytics only"],
					answer: "Interviews and usability observations"
				}, {
					question: "Quantitative research differs because it focuses on:",
					options: ["Open-ended interviews", "Measurable data and numerical patterns", "User storytelling", "Design mockups"],
					answer: "Measurable data and numerical patterns"
				}, {
					question: "Selecting research participants should prioritize:",
					options: ["Users who represent the target audience", "Only internal employees", "Random internet users", "Only stakeholders"],
					answer: "Users who represent the target audience"
				}, {
					question: "A user persona primarily helps teams to:",
					options: ["Replace real users", "Represent typical user behaviors, goals, and pain points", "Increase documentation length", "Design logos"],
					answer: "Represent typical user behaviors, goals, and pain points"
				}, {
					question: "Usability testing aims to:",
					options: ["Test only visual colors", "Observe real users completing tasks to identify issues", "Replace research", "Increase development speed only"],
					answer: "Observe real users completing tasks to identify issues"
				}, {
					question: "A/B testing is most useful when:",
					options: ["Comparing two versions of a design to measure performance differences", "Designing logos", "Running interviews", "Testing backend servers"],
					answer: "Comparing two versions of a design to measure performance differences"
				}, {
					question: "Reducing user friction in onboarding means:",
					options: ["Adding more required steps", "Simplifying sign-up and guiding users clearly", "Removing instructions", "Hiding important buttons"],
					answer: "Simplifying sign-up and guiding users clearly"
				}, {
					question: "Low-fidelity wireframes are mainly used to:",
					options: ["Finalize pixel-perfect design", "Quickly outline layout and structure", "Add animations", "Publish product live"],
					answer: "Quickly outline layout and structure"
				}, {
					question: "In e-commerce UX, optimizing the checkout process primarily aims to:",
					options: ["Increase cart abandonment", "Reduce friction and improve conversion rates", "Add unnecessary fields", "Hide pricing details"],
					answer: "Reduce friction and improve conversion rates"
				}]
			}, {
				id: "ch2-q3",
				name: "Quiz 3: Integration",
				questions: [{
					question: "A user flow primarily represents:",
					options: ["Visual color palette", "Step-by-step path a user takes to complete a task", "Backend database structure", "Marketing strategy"],
					answer: "Step-by-step path a user takes to complete a task"
				}, {
					question: "The key difference between a user journey and a user flow is that:",
					options: ["They are identical", "User journey maps overall experience, while user flow maps specific task steps", "User flow focuses only on emotions", "User journey ignores touchpoints"],
					answer: "User journey maps overall experience, while user flow maps specific task steps"
				}, {
					question: "Structured navigation in digital products helps to:",
					options: ["Increase cognitive load", "Improve usability and reduce confusion", "Add more screens", "Hide important actions"],
					answer: "Improve usability and reduce confusion"
				}, {
					question: "Task-based flow mapping should begin with:",
					options: ["Final UI colors", "Identifying the primary user goal", "Adding animations", "Choosing typography"],
					answer: "Identifying the primary user goal"
				}, {
					question: "In flowcharts, a diamond symbol typically represents:",
					options: ["Start/End", "Decision point", "Process step", "Database"],
					answer: "Decision point"
				}, {
					question: "Considering edge cases in user flows ensures that:",
					options: ["Only ideal paths are designed", "Alternate scenarios and error conditions are handled", "Users are restricted", "Complexity increases unnecessarily"],
					answer: "Alternate scenarios and error conditions are handled"
				}, {
					question: "Logical screen progression primarily ensures:",
					options: ["Random navigation", "Clear, predictable movement between steps", "Repeated steps", "Longer onboarding"],
					answer: "Clear, predictable movement between steps"
				}, {
					question: "Reducing friction in flow design means:",
					options: ["Adding mandatory steps", "Removing unnecessary actions and confusion", "Increasing data entry", "Hiding instructions"],
					answer: "Removing unnecessary actions and confusion"
				}, {
					question: "In Figma, a “Frame” is primarily used to:",
					options: ["Apply color styles", "Act as a container for design screens or layouts", "Add animations", "Export code"],
					answer: "Act as a container for design screens or layouts"
				}, {
					question: "Layers in Figma help designers to:",
					options: ["Delete screens", "Organize and control design elements hierarchically", "Replace components", "Avoid grouping"],
					answer: "Organize and control design elements hierarchically"
				}]
			}, {
				id: "ch2-q4",
				name: "Quiz 4: Optimization",
				questions: [{
					question: "Assets in Figma typically include:",
					options: ["Financial data", "Reusable components, styles, and icons", "Backend scripts", "Hosting configurations"],
					answer: "Reusable components, styles, and icons"
				}, {
					question: "When creating introduction screens (onboarding), the primary focus should be:",
					options: ["Complex information", "Clear value proposition and simple guidance", "Long text paragraphs", "Multiple distractions"],
					answer: "Clear value proposition and simple guidance"
				}, {
					question: "Using components in Figma primarily helps to:",
					options: ["Increase duplication", "Maintain consistency and enable reuse", "Create random variations", "Slow down workflow"],
					answer: "Maintain consistency and enable reuse"
				}, {
					question: "Auto-layout is useful for:",
					options: ["Fixing elements in one position only", "Automatically adjusting spacing and alignment dynamically", "Removing responsiveness", "Avoiding grouping"],
					answer: "Automatically adjusting spacing and alignment dynamically"
				}, {
					question: "Linking screens in prototype mode allows designers to:",
					options: ["Create static mockups only", "Simulate navigation and user flow interactions", "Export HTML", "Delete frames"],
					answer: "Simulate navigation and user flow interactions"
				}, {
					question: "Variants in Figma components are mainly used to:",
					options: ["Create unrelated designs", "Represent different states like hover, active, or disabled", "Increase file size", "Remove interactions"],
					answer: "Represent different states like hover, active, or disabled"
				}, {
					question: "Micro-interactions enhance UX by:",
					options: ["Adding unnecessary animations", "Providing subtle feedback for user actions", "Slowing navigation", "Increasing friction"],
					answer: "Providing subtle feedback for user actions"
				}, {
					question: "Strong information hierarchy ensures that:",
					options: ["All elements look equal", "Important information stands out clearly", "Text sizes are identical", "Users read everything in detail"],
					answer: "Important information stands out clearly"
				}, {
					question: "When integrating an augmented reality (AR) feature concept into a product page, the key UX consideration is:",
					options: ["Adding it without context", "Ensuring it solves a real user need (e.g., product visualization)", "Increasing loading time", "Hiding instructions"],
					answer: "Ensuring it solves a real user need (e.g., product visualization)"
				}, {
					question: "Self-heuristic evaluation before final submission helps to:",
					options: ["Skip user testing", "Identify usability gaps and refine flow consistency", "Increase design complexity", "Ignore feedback"],
					answer: "Identify usability gaps and refine flow consistency"
				}]
			}, {
				id: "ch2-q5",
				name: "Quiz 5: Quality Assurance",
				questions: [{
					question: "Visual hierarchy on an e-commerce homepage primarily helps users to:",
					options: ["Read everything equally", "Identify important elements like offers and CTAs quickly", "Increase scrolling time", "Ignore navigation"],
					answer: "Identify important elements like offers and CTAs quickly"
				}, {
					question: "A strong Call-To-Action (CTA) button should:",
					options: ["Blend into the background", "Be visually distinct and action-oriented", "Contain long paragraphs", "Be placed randomly"],
					answer: "Be visually distinct and action-oriented"
				}, {
					question: "Clear navigation on an e-commerce site allows users to:",
					options: ["Manually browse every product", "Easily find relevant products using navigation and search", "Avoid filtering", "Spend excessive time searching"],
					answer: "Easily find relevant products using navigation and search"
				}, {
					question: "Filtering and sorting usability improves when:",
					options: ["Filters are hidden", "Filters are clear, relevant, and easy to reset", "Sorting options are limited to one", "No price range is shown"],
					answer: "Filters are clear, relevant, and easy to reset"
				}, {
					question: "Ratings and reviews support decision-making by:",
					options: ["Increasing product price", "Providing social proof and reducing uncertainty", "Slowing down page load", "Replacing product descriptions"],
					answer: "Providing social proof and reducing uncertainty"
				}, {
					question: "Product comparison features are most useful when:",
					options: ["Users buy only one fixed product", "Users need to evaluate multiple options side-by-side", "There are no alternatives", "Checkout is mandatory"],
					answer: "Users need to evaluate multiple options side-by-side"
				}, {
					question: "A well-designed wishlist primarily helps to:",
					options: ["Remove products permanently", "Save products for future consideration", "Increase cart abandonment", "Reduce personalization"],
					answer: "Save products for future consideration"
				}, {
					question: "Product detail page optimization should prioritize:",
					options: ["Decorative graphics only", "Clear images, pricing, benefits, and specifications", "Minimal information", "Hidden shipping details"],
					answer: "Clear images, pricing, benefits, and specifications"
				}, {
					question: "Reducing decision friction involves:",
					options: ["Increasing product variations without guidance", "Simplifying choices and clarifying benefits", "Removing reviews", "Hiding pricing"],
					answer: "Simplifying choices and clarifying benefits"
				}, {
					question: "A well-designed checkout flow should:",
					options: ["Include unnecessary steps", "Be short, clear, and distraction-free", "Force account creation always", "Add complex verification steps"],
					answer: "Be short, clear, and distraction-free"
				}]
			}, {
				id: "ch2-q6",
				name: "Quiz 6: Collaboration",
				questions: [{
					question: "Offering multiple payment options improves UX because it:",
					options: ["Increases confusion", "Accommodates diverse customer preferences", "Slows down checkout", "Reduces trust"],
					answer: "Accommodates diverse customer preferences"
				}, {
					question: "Guest checkout is important because it:",
					options: ["Reduces convenience", "Minimizes friction for first-time buyers", "Eliminates account benefits", "Increases drop-off rates"],
					answer: "Minimizes friction for first-time buyers"
				}, {
					question: "Delivery and shipping transparency builds trust by:",
					options: ["Hiding extra costs", "Clearly displaying timelines and charges upfront", "Changing prices later", "Removing tracking"],
					answer: "Clearly displaying timelines and charges upfront"
				}, {
					question: "Easy access to customer care improves:",
					options: ["User frustration", "Customer satisfaction and trust", "Cart abandonment", "Decision fatigue"],
					answer: "Customer satisfaction and trust"
				}, {
					question: "A smooth returns and refund UX process helps to:",
					options: ["Increase complaints", "Encourage repeat purchases", "Reduce brand trust", "Increase complexity"],
					answer: "Encourage repeat purchases"
				}, {
					question: "Post-purchase engagement strategies may include:",
					options: ["Ignoring customers after checkout", "Order updates, feedback requests, and loyalty rewards", "Removing communication", "Increasing spam"],
					answer: "Order updates, feedback requests, and loyalty rewards"
				}, {
					question: "Onboarding primarily aims to:",
					options: ["Add unnecessary tutorials", "Help users understand product value quickly", "Increase app complexity", "Delay feature access"],
					answer: "Help users understand product value quickly"
				}, {
					question: "Progressive disclosure in onboarding means:",
					options: ["Showing all features at once", "Revealing information gradually as needed", "Hiding features permanently", "Removing help content"],
					answer: "Revealing information gradually as needed"
				}, {
					question: "A common reason for low app adoption is:",
					options: ["Clear value proposition", "Complex onboarding and unclear benefits", "Simple navigation", "Fast loading speed"],
					answer: "Complex onboarding and unclear benefits"
				}, {
					question: "Combining e-commerce UX with onboarding strategy ensures that:",
					options: ["Only new users benefit", "First-time visitors are guided smoothly toward purchase", "Checkout is skipped", "Features remain hidden"],
					answer: "First-time visitors are guided smoothly toward purchase"
				}]
			}, {
				id: "ch2-q7",
				name: "Quiz 7: Real-World Scenarios",
				questions: [{
					question: "Understanding an e-commerce app structure primarily involves identifying:",
					options: ["Only color themes", "Core modules like Home, Search, Product, Cart, Checkout, and Profile", "Animation styles only", "Logo placement"],
					answer: "Core modules like Home, Search, Product, Cart, Checkout, and Profile"
				}, {
					question: "When setting up a Figma project for a mobile app, the first step should be:",
					options: ["Adding animations", "Creating appropriate device frames and organizing pages", "Exporting assets", "Publishing prototype"],
					answer: "Creating appropriate device frames and organizing pages"
				}, {
					question: "The main goal of onboarding screens in an e-commerce app is to:",
					options: ["Display all features at once", "Introduce core value and guide first-time users", "Increase screen count", "Increase screen count"],
					answer: "Introduce core value and guide first-time users"
				}, {
					question: "Figma plugins are primarily used to:",
					options: ["Replace design skills", "Enhance workflow efficiency (icons, content, accessibility checks, etc.)", "Delete components", "Reduce prototype quality"],
					answer: "Enhance workflow efficiency (icons, content, accessibility checks, etc.)"
				}, {
					question: "Basic animation principles in UI design should prioritize:",
					options: ["Decorative complexity", "Smooth transitions that support usability", "Random movement", "Long loading animations"],
					answer: "Smooth transitions that support usability"
				}, {
					question: "Layout consistency improves UX because it:",
					options: ["Forces users to relearn navigation on each screen", "Builds familiarity and predictability", "Reduces branding", "Increases friction"],
					answer: "Builds familiarity and predictability"
				}, {
					question: "Auto-layout in Figma helps designers to:",
					options: ["Fix elements permanently", "Automatically manage spacing and alignment dynamically", "Remove responsiveness", "Prevent grouping"],
					answer: "Automatically manage spacing and alignment dynamically"
				}, {
					question: "Smart Animate transitions are useful for:",
					options: ["Creating unrelated screen jumps", "Simulating smooth transitions between similar elements", "Increasing confusion", "Removing interactions"],
					answer: "Simulating smooth transitions between similar elements"
				}, {
					question: "Micro-interactions are important because they:",
					options: ["Distract users", "Provide subtle feedback for user actions", "Replace navigation", "Increase friction"],
					answer: "Provide subtle feedback for user actions"
				}, {
					question: "Conditional logic in form design refers to:",
					options: ["Static forms only", "Showing or hiding fields based on user input", "Removing validation", "Adding unnecessary steps"],
					answer: "Showing or hiding fields based on user input"
				}]
			}, {
				id: "ch2-q8",
				name: "Quiz 8: Chapter Summary",
				questions: [{
					question: "Proper form validation helps to:",
					options: ["Allow incorrect inputs", "Prevent errors before submission", "Increase form length", "Reduce clarity"],
					answer: "Prevent errors before submission"
				}, {
					question: "An effective error state design should:",
					options: ["Blame the user", "Clearly explain the issue and guide correction", "Hide the error", "Reset the entire form"],
					answer: "Clearly explain the issue and guide correction"
				}, {
					question: "Success state feedback (e.g., “Order Placed Successfully”) ensures:",
					options: ["Confusion", "Confirmation and reassurance", "Delayed navigation", "Hidden status"],
					answer: "Confirmation and reassurance"
				}, {
					question: "A password visibility toggle improves UX by:",
					options: ["Increasing security risks automatically", "Allowing users to verify typed passwords", "Removing encryption", "Eliminating login forms"],
					answer: "Allowing users to verify typed passwords"
				}, {
					question: "A well-designed “Forgot Password” flow should:",
					options: ["Require multiple complex steps", "Be simple, secure, and clearly guided", "Remove email verification", "Hide reset instructions"],
					answer: "Be simple, secure, and clearly guided"
				}, {
					question: "Reducing UX friction in authentication primarily means:",
					options: ["Adding CAPTCHA repeatedly", "Minimizing unnecessary steps and confusion", "Removing feedback messages", "Increasing data entry"],
					answer: "Minimizing unnecessary steps and confusion"
				}, {
					question: "Highlighting active navigation states helps users to:",
					options: ["Get lost", "Understand their current location in the app", "Ignore menus", "Navigate randomly"],
					answer: "Understand their current location in the app"
				}, {
					question: "The “Add-to-Cart” interaction should:",
					options: ["Redirect without feedback", "Provide instant visual confirmation (animation or badge update)", "Hide cart icon", "Delay response"],
					answer: "Provide instant visual confirmation (animation or badge update)"
				}, {
					question: "A cart overview page should clearly display:",
					options: ["Only product images", "Items, quantity, price breakdown, and edit options", "Decorative banners", "Hidden totals"],
					answer: "Items, quantity, price breakdown, and edit options"
				}, {
					question: "Testing the complete user journey ensures that:",
					options: ["Only individual screens look good", "The entire flow works logically from onboarding to payment confirmation", "Animations are complex", "Errors are ignored"],
					answer: "The entire flow works logically from onboarding to payment confirmation"
				}]
			}]
		}, {
			id: "chapter3",
			name: "Chapter 3: Game Design & Development",
			description: "Master game design principles, mechanics, and create engaging game experiences.",
			icon: "⭐",
			quizzes: [{
				"id": "ch3-q1",
				"name": "Quiz: Foundations of Game Design & Development",
				"questions": [{
					"question": "A game is generally defined as:",
					"options": ["An activity with rules, objectives, and player interaction", "Only video-based entertainment", "A simulation without goals"],
					"answer": "An activity with rules, objectives, and player interaction"
				}, {
					"question": "Which of the following is a key characteristic of a game?",
					"options": ["No rules", "Random interaction without purpose", "Defined objectives and player engagement", "No feedback system"],
					"answer": "Defined objectives and player engagement"
				}, {
					"question": "Which of the following would most likely be considered a non-game?",
					"options": ["Chess", "Sudoku", "Calculator application", "Puzzle game"],
					"answer": "Calculator application"
				}, {
					"question": "A Game Designer is mainly responsible for:",
					"options": ["Designing gameplay mechanics and player experience", "Managing servers", "Creating financial reports"],
					"answer": "Designing gameplay mechanics and player experience"
				}, {
					"question": "A Game Programmer’s role involves:",
					"options": ["Writing the code that makes the game function", "Designing character outfits", "Creating marketing campaigns"],
					"answer": "Writing the code that makes the game function"
				}, {
					"question": "Game genres categorize games based on:",
					"options": ["Game file size", "Gameplay style and mechanics", "Number of players", "Graphics resolution"],
					"answer": "Gameplay style and mechanics"
				}, {
					"question": "Which genre focuses on fast-paced gameplay and reflex-based challenges?",
					"options": ["Action", "Simulation", "Puzzle", "RPG (Role-Playing Game)"],
					"answer": "Action"
				}, {
					"question": "RPG (Role-Playing Game) typically includes:",
					"options": ["Character progression and story-driven gameplay", "Only sports simulations", "Simple puzzle mechanics", "Racing mechanics"],
					"answer": "Character progression and story-driven gameplay"
				}, {
					"question": "Strategy games usually emphasize:",
					"options": ["Reflex speed only", "Planning, resource management, and decision-making", "Storyline progression only", "Physical sports simulation"],
					"answer": "Planning, resource management, and decision-making"
				}, {
					"question": "A compound genre game combines:",
					"options": ["Multiple gameplay genres", "Multiple programming languages", "Multiple operating systems", "Multiple consoles"],
					"answer": "Multiple gameplay genres"
				}]
			}, {
				"id": "ch3-q2",
				"name": "Quiz 2: Game Design Roles and Mechanics",
				"questions": [{
					"question": "Game design mainly focuses on:",
					"options": ["Hardware configuration", "Creating engaging gameplay and player experience", "Database design", "Marketing campaigns"],
					"answer": "Creating engaging gameplay and player experience"
				}, {
					"question": "Sources of inspiration for game ideas can include:",
					"options": ["Real-world experiences and stories", "Scientific research only", "Programming syntax", "Operating system updates"],
					"answer": "Real-world experiences and stories"
				}, {
					"question": "Which element defines what players must accomplish in a game?",
					"options": ["Environment", "Player objectives", "Sound effects", "UI layout"],
					"answer": "Player objectives"
				}, {
					"question": "Characters in game design help to:",
					"options": ["Improve server performance", "Create narrative and player engagement", "Replace mechanics", "Remove gameplay challenges"],
					"answer": "Create narrative and player engagement"
				}, {
					"question": "The art and animation team is responsible for:",
					"options": ["Coding gameplay logic", "Visual elements such as characters and environments", "Testing bugs", "Server management"],
					"answer": "Visual elements such as characters and environments"
				}, {
					"question": "The sound team primarily creates:",
					"options": ["Code modules", "Music, sound effects, and voice acting", "Game rules", "Game physics"],
					"answer": "Music, sound effects, and voice acting"
				}, {
					"question": "Game testers are responsible for:",
					"options": ["Marketing the game", "Identifying bugs and gameplay issues", "Writing the storyline", "Designing characters"],
					"answer": "Identifying bugs and gameplay issues"
				}, {
					"question": "Game mechanics define:",
					"options": ["Hardware requirements", "How the game operates and how players interact with it", "Only story elements", "Only graphics"],
					"answer": "How the game operates and how players interact with it"
				}, {
					"question": "A scoring system is an example of:",
					"options": ["Game mechanics", "Game graphics", "Game engine", "Game platform"],
					"answer": "Game mechanics"
				}, {
					"question": "Prototyping in game development helps to:",
					"options": ["Launch final game immediately", "Test gameplay ideas before full development", "Replace programming", "Avoid testing"],
					"answer": "Test gameplay ideas before full development"
				}]
			}, {
				"id": "game-foundations-q3",
				"name": "Quiz 3: Prototyping and Game Engines",
				"questions": [{
					"question": "In game development, a prototype is:",
					"options": ["The final version of the game", "An early version used to test gameplay ideas", "A marketing concept"],
					"answer": "An early version used to test gameplay ideas"
				}, {
					"question": "The main purpose of prototyping is to:",
					"options": ["Increase development cost", "Test ideas and identify problems early", "Replace game testing", "Avoid game design"],
					"answer": "Test ideas and identify problems early"
				}, {
					"question": "A paper prototype usually involves:",
					"options": ["Coding game mechanics", "Sketching game elements using paper and physical objects", "Developing a 3D environment", "Creating a full digital version"],
					"answer": "Sketching game elements using paper and physical objects"
				}, {
					"question": "A gameplay prototype focuses on testing:",
					"options": ["Marketing strategies", "Core gameplay mechanics", "Financial planning", "Game distribution"],
					"answer": "Core gameplay mechanics"
				}, {
					"question": "Creating prototypes early helps developers to:",
					"options": ["Avoid design changes", "Detect design flaws before full development", "Skip testing phases", "Launch the game faster without testing"],
					"answer": "Detect design flaws before full development"
				}, {
					"question": "A game engine is:",
					"options": ["A hardware component", "Software used to develop and run video games", "A gaming console", "A graphics card"],
					"answer": "Software used to develop and run video games"
				}, {
					"question": "Unity is widely used because it:",
					"options": ["Supports only 2D games", "Supports both 2D and 3D game development", "Works only on consoles", "Cannot support scripting"],
					"answer": "Supports both 2D and 3D game development"
				}, {
					"question": "Unreal Engine is particularly known for:",
					"options": ["Low graphical capability", "High-end visuals and cinematic quality", "Mobile-only development", "No scripting support"],
					"answer": "High-end visuals and cinematic quality"
				}, {
					"question": "Godot is often recommended for beginners because:",
					"options": ["It is extremely complex", "It is lightweight, open-source, and beginner-friendly", "It only supports large studios", "It requires expensive licensing"],
					"answer": "It is lightweight, open-source, and beginner-friendly"
				}, {
					"question": "GameMaker is mostly used for:",
					"options": ["Simulation of aircraft engines", "Creating 2D games easily", "Machine learning models", "Network security"],
					"answer": "Creating 2D games easily"
				}]
			}, {
				"id": "game-foundations-q4",
				"name": "Quiz 4: Godot Basics and Scripting",
				"questions": [{
					"question": "In Godot, a Scene is:",
					"options": ["A programming function", "A collection of nodes forming a game object or level", "A file system", "A testing module"],
					"answer": "A collection of nodes forming a game object or level"
				}, {
					"question": "Nodes in Godot represent:",
					"options": ["Hardware components", "Building blocks of a scene", "Only scripts", "Player scores"],
					"answer": "Building blocks of a scene"
				}, {
					"question": "The Inspector panel is used to:",
					"options": ["Write scripts only", "Modify properties of selected nodes", "Run the game", "Test performance"],
					"answer": "Modify properties of selected nodes"
				}, {
					"question": "The File System panel in Godot allows developers to:",
					"options": ["Edit gameplay mechanics", "Manage project files and assets", "Run debugging tools", "Edit 3D models only"],
					"answer": "Manage project files and assets"
				}, {
					"question": "GDScript is:",
					"options": ["A graphics engine", "The primary scripting language used in Godot", "A database language", "A hardware driver"],
					"answer": "The primary scripting language used in Godot"
				}, {
					"question": "Variables in scripting are used to:",
					"options": ["Store data values during gameplay", "Create textures", "Design characters", "Render graphics"],
					"answer": "Store data values during gameplay"
				}, {
					"question": "Functions in GDScript help to:",
					"options": ["Organize reusable blocks of code", "Increase file size", "Remove nodes", "Design levels"],
					"answer": "Organize reusable blocks of code"
				}, {
					"question": "A first-person camera shows the game world from:",
					"options": ["Above the character", "The character’s own viewpoint", "Behind the character", "Side angle"],
					"answer": "The character’s own viewpoint"
				}, {
					"question": "A top-down camera is commonly used in:",
					"options": ["Racing games", "Strategy and simulation games", "First-person shooters", "Puzzle games only"],
					"answer": "Strategy and simulation games"
				}, {
					"question": "Playtesting mainly helps developers to:",
					"options": ["Advertise the game", "Identify gameplay problems and improve player experience", "Replace game programming", "Skip development stages"],
					"answer": "Identify gameplay problems and improve player experience"
				}]
			}, {
				"id": "game-foundations-q5",
				"name": "Quiz 5: Debugging and Gameplay Balance",
				"questions": [{
					"question": "Debugging refers to:",
					"options": ["Writing new features", "Identifying and fixing errors in code", "Designing characters", "Improving graphics"],
					"answer": "Identifying and fixing errors in code"
				}, {
					"question": "A syntax error occurs when:",
					"options": ["Game mechanics are unbalanced", "The program violates the language’s grammar rules", "The game crashes due to memory issues", "The player cannot progress in the game"],
					"answer": "The program violates the language’s grammar rules"
				}, {
					"question": "A logical error occurs when:",
					"options": ["Code cannot run at all", "Code runs but produces incorrect results", "Program stops immediately", "Compiler cannot understand code"],
					"answer": "Code runs but produces incorrect results"
				}, {
					"question": "A runtime error occurs when:",
					"options": ["The program runs successfully", "An error happens while the program is executing", "Code is being written", "The compiler checks syntax"],
					"answer": "An error happens while the program is executing"
				}, {
					"question": "Which debugging technique prints variable values during execution?",
					"options": ["Breakpoints", "Logging or print statements", "Pathfinding", "Iteration"],
					"answer": "Logging or print statements"
				}, {
					"question": "Breakpoints help developers by:",
					"options": ["Pausing execution to inspect program state", "Increasing game performance", "Removing errors automatically", "Preventing compilation"],
					"answer": "Pausing execution to inspect program state"
				}, {
					"question": "Game mechanics determine:",
					"options": ["Hardware performance", "How players interact with the game", "Marketing strategies", "Sound effects only"],
					"answer": "How players interact with the game"
				}, {
					"question": "The “fun factor” in game mechanics measures:",
					"options": ["Code efficiency", "How enjoyable the gameplay is for players", "Graphics resolution", "Game file size"],
					"answer": "How enjoyable the gameplay is for players"
				}, {
					"question": "Balance in game mechanics ensures that:",
					"options": ["One player always wins", "Gameplay remains fair and challenging", "All players lose", "No difficulty exists"],
					"answer": "Gameplay remains fair and challenging"
				}, {
					"question": "Player engagement increases when mechanics:",
					"options": ["Are repetitive and boring", "Provide meaningful challenges and rewards", "Have no objectives", "Ignore difficulty levels"],
					"answer": "Provide meaningful challenges and rewards"
				}]
			}, {
				"id": "game-foundations-q6",
				"name": "Quiz 6: Iteration, Project Management, and AI",
				"questions": [{
					"question": "Iteration in game development means:",
					"options": ["Repeatedly testing and improving the game", "Avoiding testing", "Launching the game immediately"],
					"answer": "Repeatedly testing and improving the game"
				}, {
					"question": "The iterative development cycle is commonly:",
					"options": ["Design → Launch → Stop", "Test → Improve → Test again", "Design → Delete → Restart"],
					"answer": "Test → Improve → Test again"
				}, {
					"question": "Iteration helps developers improve:",
					"options": ["Only graphics", "Both gameplay mechanics and code quality", "Marketing strategies", "Hardware performance"],
					"answer": "Both gameplay mechanics and code quality"
				}, {
					"question": "Scope creep refers to:",
					"options": ["Removing features from the game", "Uncontrolled expansion of project features", "Reducing development time", "Improving game performance"],
					"answer": "Uncontrolled expansion of project features"
				}, {
					"question": "Scope creep negatively affects projects by:",
					"options": ["Increasing productivity", "Delaying deadlines and increasing costs", "Improving gameplay mechanics", "Reducing development complexity"],
					"answer": "Delaying deadlines and increasing costs"
				}, {
					"question": "Feature freeze is used to:",
					"options": ["Add unlimited features", "Stop adding new features to stabilize development", "Remove gameplay mechanics", "Restart the project"],
					"answer": "Stop adding new features to stabilize development"
				}, {
					"question": "AI in games is mainly used to:",
					"options": ["Replace graphics", "Control behavior of non-player characters (NPCs)", "Design levels", "Reduce gameplay difficulty"],
					"answer": "Control behavior of non-player characters (NPCs)"
				}, {
					"question": "Rule-based AI works by:",
					"options": ["Learning automatically from players", "Following predefined rules and conditions", "Generating random actions", "Replacing scripts"],
					"answer": "Following predefined rules and conditions"
				}, {
					"question": "Pathfinding AI helps NPCs to:",
					"options": ["Improve graphics", "Navigate environments and reach destinations", "Generate sound effects", "Create game levels"],
					"answer": "Navigate environments and reach destinations"
				}, {
					"question": "Scoring systems in games mainly:",
					"options": ["Reduce player motivation", "Track player achievements and encourage engagement", "Replace gameplay mechanics", "Prevent players from progressing"],
					"answer": "Track player achievements and encourage engagement"
				}]
			}, {
				"id": "game-foundations-q7",
				"name": "Quiz 7: Narrative, Assets, and MVG",
				"questions": [{
					"question": "Why is completing the Minimum Viable Game (MVG) before narrative design often recommended?",
					"options": ["To reduce graphics requirements", "To ensure gameplay mechanics are functional before adding story elements", "To avoid testing the game", "To remove player objectives"],
					"answer": "To ensure gameplay mechanics are functional before adding story elements"
				}, {
					"question": "Mechanics and story are related because:",
					"options": ["Mechanics and story are unrelated", "Mechanics influence how the story is experienced by players", "Story replaces gameplay mechanics", "Mechanics only affect graphics"],
					"answer": "Mechanics influence how the story is experienced by players"
				}, {
					"question": "Environmental storytelling refers to:",
					"options": ["Story delivered only through dialogue", "Story conveyed through the game world, objects, and surroundings", "Story written only in menus", "Story delivered through advertisements"],
					"answer": "Story conveyed through the game world, objects, and surroundings"
				}, {
					"question": "Character-driven narrative focuses mainly on:",
					"options": ["Game engine performance", "Character development and interactions", "Background music", "Game scoring systems"],
					"answer": "Character development and interactions"
				}, {
					"question": "Mission-based storytelling presents the narrative through:",
					"options": ["Player achievements and missions", "Random dialogues", "Graphics improvements", "Multiplayer systems"],
					"answer": "Player achievements and missions"
				}, {
					"question": "Game assets refer to:",
					"options": ["Programming code only", "Visual, audio, and interactive resources used in a game", "Game engines", "Game servers"],
					"answer": "Visual, audio, and interactive resources used in a game"
				}, {
					"question": "3D models in games represent:",
					"options": ["Sound effects", "Visual objects such as characters, environments, and props", "Game scripts", "Game menus"],
					"answer": "Visual objects such as characters, environments, and props"
				}, {
					"question": "When choosing assets, developers consider:",
					"options": ["File size only", "Compatibility with the game’s style and performance requirements", "Programming language", "Game engine logo"],
					"answer": "Compatibility with the game’s style and performance requirements"
				}, {
					"question": "Importing models into a game engine allows developers to:",
					"options": ["Modify hardware", "Use assets directly in the game scene", "Increase game difficulty", "Remove animations"],
					"answer": "Use assets directly in the game scene"
				}, {
					"question": "Sound effects in games are mainly used to:",
					"options": ["Replace gameplay mechanics", "Provide audio feedback for player actions", "Reduce graphics quality", "Replace background music"],
					"answer": "Provide audio feedback for player actions"
				}]
			}, {
				"id": "game-foundations-q8",
				"name": "Quiz 8: Audio, Visual Polish, and UI",
				"questions": [{
					"question": "Background music primarily enhances:",
					"options": ["Game code efficiency", "Player immersion and emotional tone", "Network performance", "Hardware compatibility"],
					"answer": "Player immersion and emotional tone"
				}, {
					"question": "Ambient sounds are used to:",
					"options": ["Replace character dialogue", "Create environmental atmosphere", "Control player movement", "Replace graphics"],
					"answer": "Create environmental atmosphere"
				}, {
					"question": "Triggering sounds through gameplay events means:",
					"options": ["Sounds play randomly", "Sounds are activated when specific actions occur in the game", "Sounds replace animations", "Sounds stop gameplay"],
					"answer": "Sounds are activated when specific actions occur in the game"
				}, {
					"question": "Textures in games are used to:",
					"options": ["Store gameplay logic", "Add surface details to 3D models", "Control player movement", "Generate sound effects"],
					"answer": "Add surface details to 3D models"
				}, {
					"question": "Physically Based Rendering (PBR) improves:",
					"options": ["Network speed", "Realistic lighting and materials in game graphics", "Game scoring systems", "Game scripting"],
					"answer": "Realistic lighting and materials in game graphics"
				}, {
					"question": "Texture painting tools allow developers to:",
					"options": ["Create detailed surface designs for models", "Design gameplay mechanics", "Create UI menus", "Manage server databases"],
					"answer": "Create detailed surface designs for models"
				}, {
					"question": "Game “juice” refers to:",
					"options": ["Game storyline", "Visual and audio polish that improves player experience", "Game engine performance", "Game difficulty"],
					"answer": "Visual and audio polish that improves player experience"
				}, {
					"question": "Particle systems are commonly used to create:",
					"options": ["Database queries", "Visual effects such as explosions, smoke, or sparks", "Game menus", "AI logic"],
					"answer": "Visual effects such as explosions, smoke, or sparks"
				}, {
					"question": "The main purpose of a game UI is to:",
					"options": ["Improve graphics resolution", "Provide players with information and controls during gameplay", "Replace gameplay mechanics", "Remove sound effects"],
					"answer": "Provide players with information and controls during gameplay"
				}, {
					"question": "Before releasing a game, developers must ensure:",
					"options": ["Only graphics are optimized", "The game runs smoothly across target platforms and is properly tested", "All gameplay mechanics are removed", "The game contains unlimited features"],
					"answer": "The game runs smoothly across target platforms and is properly tested"
				}]
			}]
		}]
	}
};