const chapters = {
  internship: {
    name: "Internship Program",
    description: "Master the fundamentals of internship topics",
    chapters: [
      {
        id: "chapter1",
        name: "Data Analytics Basics",
        description: "Data Analytics Certification/Certified Data Analyst.",
        icon: "📚",
        quizzes: [
          {
            id: "ch1-q1",
            name: "Introduction to Data Analytics",
            questions: [
              {
                question: "Data analytics is the process of:",
                options: [
                  "Writing programs",
                  "Collecting, cleaning, and analyzing data to gain insights",
                  "Designing databases",
                  "Creating websites"
                ],
                answer: "Collecting, cleaning, and analyzing data to gain insights"
              },
              {
                question: "Why is data analysis important for business decision-making?",
                options: [
                  "It reduces coding effort",
                  "It supports decisions using facts and trends",
                  "It replaces managers",
                  "It increases storage"
                ],
                answer: "It supports decisions using facts and trends"
              },
              {
                question: "Which of the following is an example of a data source?",
                options: ["Keyboard", "Database", "Monitor", "Printer"],
                answer: "Database"
              },
              {
                question: "Structured data is best described as:",
                options: [
                  "Images and videos",
                  "Data organized in rows and columns",
                  "Audio files",
                  "Social media posts"
                ],
                answer: "Data organized in rows and columns"
              },
              {
                question: "Data cleaning mainly involves:",
                options: [
                  "Deleting all data",
                  "Fixing errors and inconsistencies",
                  "Creating charts",
                  "Writing reports"
                ],
                answer: "Fixing errors and inconsistencies"
              },
              {
                question: "Which is an example of a logical check in data?",
                options: [
                  "Font size check",
                  "Missing value detection",
                  "File compression",
                  "Chart formatting"
                ],
                answer: "Missing value detection"
              },
              {
                question: "Excel is commonly used for:",
                options: [
                  "Game development",
                  "Basic data analysis and visualization",
                  "Network security",
                  "Web design"
                ],
                answer: "Basic data analysis and visualization"
              },
              {
                question: "Which option is used to import data into Excel?",
                options: [
                  "Data → Get Data",
                  "Insert → Shapes",
                  "Review → Spelling",
                  "View → Zoom"
                ],
                answer: "Data → Get Data"
              },
              {
                question: "R is mainly used for:",
                options: [
                  "Graphic design",
                  "Statistical computing and data analysis",
                  "Web browsing",
                  "File storage"
                ],
                answer: "Statistical computing and data analysis"
              },
              {
                question: "RStudio is:",
                options: [
                  "A programming language",
                  "An operating system",
                  "An IDE for R programming",
                  "A database"
                ],
                answer: "An IDE for R programming"
              }
            ]
          },
          {
            id: "ch2-q1",
            name: "Quiz 1: Descriptive Statistics and Probability",
            questions: [
              {
                question: "Mean is best described as:",
                options: [
                  "The most frequent value",
                  "The middle value",
                  "The average of all values",
                  "The difference between values"
                ],
                answer: "The average of all values"
              },
              {
                question: "Which statistic represents the middle value of a dataset?",
                options: ["Mean", "Mode", "Median", "Range"],
                answer: "Median"
              },
              {
                question: "Mode refers to:",
                options: [
                  "The smallest value",
                  "The most frequently occurring value",
                  "The average value",
                  "The spread of data"
                ],
                answer: "The most frequently occurring value"
              },
              {
                question: "Range is calculated as:",
                options: [
                  "Mean − Median",
                  "Maximum − Minimum",
                  "Sum of values",
                  "Variance − Standard deviation"
                ],
                answer: "Maximum − Minimum"
              },
              {
                question: "Variance measures:",
                options: [
                  "Central value",
                  "Spread of data from the mean",
                  "Frequency of data",
                  "Shape of distribution"
                ],
                answer: "Spread of data from the mean"
              },
              {
                question: "Standard deviation is:",
                options: [
                  "Square of variance",
                  "Square root of variance",
                  "Same as range",
                  "Same as mean"
                ],
                answer: "Square root of variance"
              },
              {
                question: "Which Excel function calculates the mean?",
                options: ["=COUNT()", "=SUM()", "=AVERAGE()", "=MEAN()"],
                answer: "=AVERAGE()"
              },
              {
                question: "Interpreting descriptive statistics helps to:",
                options: [
                  "Design websites",
                  "Understand data behavior and patterns",
                  "Store data",
                  "Write programs"
                ],
                answer: "Understand data behavior and patterns"
              },
              {
                question: "The Excel Data Analysis Toolpak is used for:",
                options: [
                  "Graphic design",
                  "Statistical analysis",
                  "Web development",
                  "Email automation"
                ],
                answer: "Statistical analysis"
              },
              {
                question: "Probability is the measure of:",
                options: [
                  "Data size",
                  "Likelihood of an event occurring",
                  "Data accuracy",
                  "Variance"
                ],
                answer: "Likelihood of an event occurring"
              }
            ]
          },
          {
            id: "ch1-q2",
            name: "Population, Sampling, and Variance",
            questions: [
              {
                question: "A population refers to:",
                options: [
                  "A small subset of data",
                  "The entire group of interest in a study",
                  "Only numerical data",
                  "Random observations"
                ],
                answer: "The entire group of interest in a study"
              },
              {
                question: "A sample is:",
                options: [
                  "The entire population",
                  "A subset taken from the population",
                  "Always larger than population",
                  "A biased group"
                ],
                answer: "A subset taken from the population"
              },
              {
                question: "Why is sampling necessary?",
                options: [
                  "Population data is always inaccurate",
                  "Studying the entire population is often impractical",
                  "Samples are more biased",
                  "It removes variability"
                ],
                answer: "Studying the entire population is often impractical"
              },
              {
                question: "A good sample should be:",
                options: ["Large only", "Representative of the population", "Easy to collect", "Biased toward one group"],
                answer: "Representative of the population"
              },
              {
                question: "Sampling bias occurs when:",
                options: [
                  "Random sampling is used",
                  "Some members of the population are systematically excluded",
                  "Sample size is large",
                  "Data is numerical"
                ],
                answer: "Some members of the population are systematically excluded"
              },
              {
                question: "Representativeness means the sample:",
                options: ["Has equal values", "Reflects characteristics of the population", "Has no variation", "Is very small"],
                answer: "Reflects characteristics of the population"
              },
              {
                question: "Variance measures:",
                options: ["Central tendency", "Spread of data around the mean", "Sample size", "Data accuracy"],
                answer: "Spread of data around the mean"
              },
              {
                question: "Standard deviation is:",
                options: ["Square of variance", "Square root of variance", "Mean of the data", "Range of data"],
                answer: "Square root of variance"
              },
              {
                question: "Population variance is usually denoted by:",
                options: ["s2", "σ2", "x̄", "μ"],
                answer: "σ2"
              },
              {
                question: "Sample variance is usually denoted by:",
                options: ["σ2", "μ", "s2", "x"],
                answer: "s2"
              }
            ]
          },
          {
            id: "ch1-q3",
            name: "Hypothesis Errors, CLT, and Law of Large Numbers",
            questions: [
              {
                question: "A Type I error occurs when we:",
                options: [
                  "Fail to reject a false null hypothesis",
                  "Reject a true null hypothesis",
                  "Accept the alternative hypothesis incorrectly",
                  "Make no decision"
                ],
                answer: "Reject a true null hypothesis"
              },
              {
                question: "A Type II error occurs when we:",
                options: [
                  "Reject a true null hypothesis",
                  "Accept a false alternative hypothesis",
                  "Fail to reject a false null hypothesis",
                  "Use wrong data"
                ],
                answer: "Fail to reject a false null hypothesis"
              },
              {
                question: "Type I error is also known as:",
                options: ["False negative", "False positive", "Sampling error", "Random error"],
                answer: "False positive"
              },
              {
                question: "Type II error is also known as:",
                options: ["False positive", "False negative", "Measurement error", "Bias error"],
                answer: "False negative"
              },
              {
                question: "The significance level (α) represents:",
                options: [
                  "Probability of Type II error",
                  "Probability of Type I error",
                  "Sample size",
                  "Confidence level"
                ],
                answer: "Probability of Type I error"
              },
              {
                question: "A commonly used value of α is:",
                options: ["0.50", "0.10", "0.05", "1.00"],
                answer: "0.05"
              },
              {
                question: "Lowering the significance level makes it:",
                options: ["Easier to reject H0", "Harder to reject H0", "Increase Type I error", "Eliminate errors"],
                answer: "Harder to reject H0"
              },
              {
                question: "The Central Limit Theorem (CLT) states that:",
                options: [
                  "Population must be normal",
                  "Sample means become normally distributed as sample size increases",
                  "All data is normally distributed",
                  "Variance becomes zero"
                ],
                answer: "Sample means become normally distributed as sample size increases"
              },
              {
                question: "CLT is important because it allows:",
                options: [
                  "Ignoring sample size",
                  "Use of normal distribution for inference",
                  "Use of normal distribution for inference",
                  "Perfect predictions"
                ],
                answer: "Use of normal distribution for inference"
              },
              {
                question: "The Law of Large Numbers states that:",
                options: [
                  "Larger samples increase bias",
                  "Sample mean approaches population mean as sample size increases",
                  "Variance increases with sample size",
                  "All samples are identical"
                ],
                answer: "Sample mean approaches population mean as sample size increases"
              }
            ]
          },
          {
            id: "ch1-q4",
            name: "Introduction to R and RStudio",
            questions: [
              {
                question: "R is mainly used for:",
                options: [
                  "Graphic design",
                  "Statistical computing and data analysis",
                  "Web hosting",
                  "Video editing"
                ],
                answer: "Statistical computing and data analysis"
              },
              {
                question: "RStudio is best described as:",
                options: [
                  "Database server",
                  "Integrated Development Environment (IDE) for R",
                  "Programming language",
                  "Operating system"
                ],
                answer: "Integrated Development Environment (IDE) for R"
              },
              {
                question: "One reason analysts use R is:",
                options: [
                  "Strong data visualization and analysis tools",
                  "Faster internet",
                  "Hardware upgrades",
                  "Email automation"
                ],
                answer: "Strong data visualization and analysis tools"
              },
              {
                question: "Which area in RStudio shows written code?",
                options: ["Console only", "Script editor", "Environment tab", "Files tab"],
                answer: "Script editor"
              },
              {
                question: "Where do commands run immediately in RStudio?",
                options: ["Plots panel", "Console", "Help tab", "Viewer tab"],
                answer: "Console"
              },
              {
                question: "What symbol is commonly used for assignment in R?",
                options: ["==", "<-", "&&", "=>"],
                answer: "<-"
              },
              {
                question: "In R, objects are used to:",
                options: ["Store data values", "Style text", "Create servers", "Manage hardware"],
                answer: "Store data values"
              },
              {
                question: "Which is a numeric data type example?",
                options: ["\"Hello\"", "TRUE", "25.5", "NULL"],
                answer: "25.5"
              },
              {
                question: "Which data type represents text?",
                options: ["Numeric", "Logical", "Character", "Integer only"],
                answer: "Character"
              },
              {
                question: "TRUE or FALSE values belong to which type?",
                options: ["Numeric", "Logical", "Character", "Factor"],
                answer: "Logical"
              }
            ]
          },
          {
            id: "ch1-q5",
            name: "Tidy Data and Data Joins",
            questions: [
              {
                question: "Tidy data means:",
                options: [
                  "Structured data where each variable is a column",
                  "Random dataset",
                  "Unorganized spreadsheet",
                  "Data with no headers"
                ],
                answer: "Structured data where each variable is a column"
              },
              {
                question: "In tidy data, each row represents:",
                options: ["A file", "A single observation", "A database", "A function"],
                answer: "A single observation"
              },
              {
                question: "Wide format data usually:",
                options: [
                  "Has many columns for similar values",
                  "Has one column per variable",
                  "Is always incorrect",
                  "Cannot be analyzed"
                ],
                answer: "Has many columns for similar values"
              },
              {
                question: "Long format data is useful because it:",
                options: [
                  "Is harder to read",
                  "Works well for analysis and visualization",
                  "Removes variables",
                  "Prevents joins"
                ],
                answer: "Works well for analysis and visualization"
              },
              {
                question: "A common data problem is:",
                options: ["Perfect formatting", "Missing values", "High clarity", "Clear column names"],
                answer: "Missing values"
              },
              {
                question: "The tidyr package is mainly used for:",
                options: ["Data cleaning and reshaping", "Creating servers", "Writing loops", "Designing UI"],
                answer: "Data cleaning and reshaping"
              },
              {
                question: "Joins are needed to:",
                options: ["Delete datasets", "Combine datasets", "Create charts only", "Install packages"],
                answer: "Combine datasets"
              },
              {
                question: "An inner join returns:",
                options: ["All rows from both tables", "Only matching rows", "Only left table", "Only right table"],
                answer: "Only matching rows"
              },
              {
                question: "A left join keeps:",
                options: ["Only right table rows", "Only matching rows", "All rows from left table", "No rows"],
                answer: "All rows from left table"
              },
              {
                question: "A right join keeps:",
                options: ["All rows from right table", "All rows from left table", "Only matching rows", "No rows"],
                answer: "All rows from right table"
              }
            ]
          },
          {
            id: "ch1-q6",
            name: "Date-Time Data and Scatter Plots",
            questions: [
              {
                question: "Date-time data is important because it helps analyze:",
                options: ["Time-based trends", "Image resolution", "CSS layout", "Hardware speed"],
                answer: "Time-based trends"
              },
              {
                question: "A common date format example is:",
                options: ["YYYY-MM-DD", "ABC-123", "IMG-FILE", "TEXT-DATA"],
                answer: "YYYY-MM-DD"
              },
              {
                question: "Parsing dates means:",
                options: ["Converting text into date objects", "Deleting time values", "Formatting HTML", "Creating arrays"],
                answer: "Converting text into date objects"
              },
              {
                question: "Formatting dates refers to:",
                options: ["Changing display style of dates", "Deleting datasets", "Running models", "Writing loops"],
                answer: "Changing display style of dates"
              },
              {
                question: "Extracting components from dates may include:",
                options: ["Year, month, and day", "File size", "Screen resolution", "CSS classes"],
                answer: "Year, month, and day"
              },
              {
                question: "Weekday extraction helps analysts to:",
                options: ["Study weekly patterns", "Edit images", "Manage servers", "Write functions"],
                answer: "Study weekly patterns"
              },
              {
                question: "Time-based calculations are used to measure:",
                options: ["Durations or differences", "Font sizes", "Network speed", "Memory allocation"],
                answer: "Durations or differences"
              },
              {
                question: "Calculating time difference between events helps:",
                options: ["Analyze intervals", "Change UI color", "Remove records", "Create loops"],
                answer: "Analyze intervals"
              },
              {
                question: "Scatter plots are mainly used to:",
                options: ["Show relationships between two variables", "Store data", "Style charts", "Remove trends"],
                answer: "Show relationships between two variables"
              },
              {
                question: "Correlation measures:",
                options: ["Strength of relationship between variables", "File format", "Screen size", "Hardware capacity"],
                answer: "Strength of relationship between variables"
              }
            ]
          },
          {
            id: "ch1-q7",
            name: "Model Evaluation and Multiple Regression",
            questions: [
              {
                question: "A model summary mainly shows:",
                options: ["Key statistics about model performance", "File size", "HTML layout", "Chart colors"],
                answer: "Key statistics about model performance"
              },
              {
                question: "R2 represents:",
                options: [
                  "Proportion of variance explained by the model",
                  "Dataset size",
                  "Training speed",
                  "Feature count"
                ],
                answer: "Proportion of variance explained by the model"
              },
              {
                question: "Adjusted R2 differs from R2 because it:",
                options: [
                  "Accounts for number of predictors",
                  "Ignores model complexity",
                  "Measures classification accuracy",
                  "Removes residuals"
                ],
                answer: "Accounts for number of predictors"
              },
              {
                question: "Residuals are:",
                options: [
                  "Differences between actual and predicted values",
                  "Input variables",
                  "Hyperparameters",
                  "Charts"
                ],
                answer: "Differences between actual and predicted values"
              },
              {
                question: "Error analysis helps to:",
                options: ["Understand model weaknesses", "Increase file storage", "Remove features randomly", "Edit graphs"],
                answer: "Understand model weaknesses"
              },
              {
                question: "Large residual values may indicate:",
                options: ["Poor predictions", "Perfect model fit", "High accuracy always", "Correct coefficients"],
                answer: "Poor predictions"
              },
              {
                question: "Overfitting occurs when:",
                options: ["Model learns noise instead of pattern", "Model is too simple", "No data exists", "Only one feature used"],
                answer: "Model learns noise instead of pattern"
              },
              {
                question: "Underfitting happens when:",
                options: [
                  "Model is too simple to capture relationships",
                  "Model memorizes training data",
                  "Too many parameters exist",
                  "Residuals are zero"
                ],
                answer: "Model is too simple to capture relationships"
              },
              {
                question: "Multiple regression is used when:",
                options: ["More than one predictor exists", "Only one feature is present", "Data is categorical only", "No target variable exists"],
                answer: "More than one predictor exists"
              },
              {
                question: "Multiple predictors help to:",
                options: ["Improve explanatory power", "Remove relationships", "Reduce analysis", "Avoid evaluation"],
                answer: "Improve explanatory power"
              }
            ]
          }
        ]
      }
    ]
  }
};