const quizzes = [
{
  name: "UX Design Fundamentals 1",
  description: "Core principles of UX design and usability foundations.",
  questions: [
  {
    question: "UX design primarily focuses on:",
    options: ["Visual aesthetics only", "Overall user experience, usability, and satisfaction", "Backend coding", "Graphic illustration"],
    answer: "Overall user experience, usability, and satisfaction"
  },
  {
    question: "The main difference between UX and UI is that:",
    options: ["UX deals with visuals, UI deals with research", "UX focuses on user journey and usability, while UI focuses on visual interface elements", "Both are identical", "UI includes backend programming"],
    answer: "UX focuses on user journey and usability, while UI focuses on visual interface elements"
  },
  {
    question: "In the UX design lifecycle, the “Define” stage primarily involves:",
    options: ["Creating final UI designs", "Synthesizing research findings into problem statements", "Conducting usability testing", "Launching the product"],
    answer: "Synthesizing research findings into problem statements"
  },
  {
    question: "Why does UX matter in digital products?",
    options: ["It increases file size", "It improves user satisfaction and conversion rates", "It reduces branding efforts", "It eliminates development costs"],
    answer: "It improves user satisfaction and conversion rates"
  },
  {
    question: "A UX specialist review is best described as:",
    options: ["Random user feedback", "Expert evaluation of usability based on principles", "Developer testing only", "Visual redesign process"],
    answer: "Expert evaluation of usability based on principles"
  },
  {
    question: "Heuristic evaluation primarily involves:",
    options: ["Surveying 1,000 users", "Comparing a product against established usability principles", "Conducting coding audits", "Running paid advertisements"],
    answer: "Comparing a product against established usability principles"
  },
  {
    question: "Identifying friction points in UX refers to:",
    options: ["Color brightness only", "Areas where users experience confusion or friction", "Increasing animation effects", "Adding more content"],
    answer: "Areas where users experience confusion or friction"
  },
  {
    question: "A severity rating system helps UX teams to:",
    options: ["Ignore minor issues", "Prioritize usability problems based on impact and frequency", "Increase development cost", "Remove testing phases"],
    answer: "Prioritize usability problems based on impact and frequency"
  },
  {
    question: "Jakob Nielsen’s heuristic “Visibility of system status” emphasizes:",
    options: ["Hiding loading indicators", "Keeping users informed about what is happening", "Reducing feedback", "Complex navigation"],
    answer: "Keeping users informed about what is happening"
  },
  {
    question: "The heuristic “Consistency and standards” ensures that:",
    options: ["Every page looks completely different", "Similar elements behave similarly across the interface", "Users must relearn navigation on each page", "UI patterns are unpredictable"],
    answer: "Similar elements behave similarly across the interface"
  }]
},
{
  name: "UX Research & Testing 2",
  description: "User research methods, testing, and optimization strategies.",
  questions: [
  {
    question: "“Error prevention” as a usability principle suggests:",
    options: ["Allowing users to make frequent mistakes", "Designing systems that minimize the chance of user errors", "Ignoring form validation", "Removing confirmation messages"],
    answer: "Designing systems that minimize the chance of user errors"
  },
  {
    question: "Qualitative UX research typically includes:",
    options: ["Large-scale statistical analysis", "Interviews and usability observations", "Revenue reports", "Server analytics only"],
    answer: "Interviews and usability observations"
  },
  {
    question: "Quantitative research differs because it focuses on:",
    options: ["Open-ended interviews", "Measurable data and numerical patterns", "User storytelling", "Design mockups"],
    answer: "Measurable data and numerical patterns"
  },
  {
    question: "Selecting research participants should prioritize:",
    options: ["Users who represent the target audience", "Only internal employees", "Random internet users", "Only stakeholders"],
    answer: "Users who represent the target audience"
  },
  {
    question: "A user persona primarily helps teams to:",
    options: ["Replace real users", "Represent typical user behaviors, goals, and pain points", "Increase documentation length", "Design logos"],
    answer: "Represent typical user behaviors, goals, and pain points"
  },
  {
    question: "Usability testing aims to:",
    options: ["Test only visual colors", "Observe real users completing tasks to identify issues", "Replace research", "Increase development speed only"],
    answer: "Observe real users completing tasks to identify issues"
  },
  {
    question: "A/B testing is most useful when:",
    options: ["Comparing two versions of a design to measure performance differences", "Designing logos", "Running interviews", "Testing backend servers"],
    answer: "Comparing two versions of a design to measure performance differences"
  },
  {
    question: "Reducing user friction in onboarding means:",
    options: ["Adding more required steps", "Simplifying sign-up and guiding users clearly", "Removing instructions", "Hiding important buttons"],
    answer: "Simplifying sign-up and guiding users clearly"
  },
  {
    question: "Low-fidelity wireframes are mainly used to:",
    options: ["Finalize pixel-perfect design", "Quickly outline layout and structure", "Add animations", "Publish product live"],
    answer: "Quickly outline layout and structure"
  },
  {
    question: "In e-commerce UX, optimizing the checkout process primarily aims to:",
    options: ["Increase cart abandonment", "Reduce friction and improve conversion rates", "Add unnecessary fields", "Hide pricing details"],
    answer: "Reduce friction and improve conversion rates"
  }]
},
{
  name: "User Flow & UX Architecture",
  description: "Understanding user flows, navigation structure, and interaction design in UX.",
  questions: [
  {
    question: "A user flow primarily represents:",
    options: ["Visual color palette", "Step-by-step path a user takes to complete a task", "Backend database structure", "Marketing strategy"],
    answer: "Step-by-step path a user takes to complete a task"
  },
  {
    question: "The key difference between a user journey and a user flow is that:",
    options: ["They are identical", "User journey maps overall experience, while user flow maps specific task steps", "User flow focuses only on emotions", "User journey ignores touchpoints"],
    answer: "User journey maps overall experience, while user flow maps specific task steps"
  },
  {
    question: "Structured navigation in digital products helps to:",
    options: ["Increase cognitive load", "Improve usability and reduce confusion", "Add more screens", "Hide important actions"],
    answer: "Improve usability and reduce confusion"
  },
  {
    question: "Task-based flow mapping should begin with:",
    options: ["Final UI colors", "Identifying the primary user goal", "Adding animations", "Choosing typography"],
    answer: "Identifying the primary user goal"
  },
  {
    question: "In flowcharts, a diamond symbol typically represents:",
    options: ["Start/End", "Decision point", "Process step", "Database"],
    answer: "Decision point"
  },
  {
    question: "Considering edge cases in user flows ensures that:",
    options: ["Only ideal paths are designed", "Alternate scenarios and error conditions are handled", "Users are restricted", "Complexity increases unnecessarily"],
    answer: "Alternate scenarios and error conditions are handled"
  },
  {
    question: "Logical screen progression primarily ensures:",
    options: ["Random navigation", "Clear, predictable movement between steps", "Repeated steps", "Longer onboarding"],
    answer: "Clear, predictable movement between steps"
  },
  {
    question: "Reducing friction in flow design means:",
    options: ["Adding mandatory steps", "Removing unnecessary actions and confusion", "Increasing data entry", "Hiding instructions"],
    answer: "Removing unnecessary actions and confusion"
  },
  {
    question: "In Figma, a “Frame” is primarily used to:",
    options: ["Apply color styles", "Act as a container for design screens or layouts", "Add animations", "Export code"],
    answer: "Act as a container for design screens or layouts"
  },
  {
    question: "Layers in Figma help designers to:",
    options: ["Delete screens", "Organize and control design elements hierarchically", "Replace components", "Avoid grouping"],
    answer: "Organize and control design elements hierarchically"
  }]
},
{
  name: "Figma Prototyping & Advanced UX Concepts",
  description: "Exploring prototyping, components, interactions, and advanced UX evaluation techniques.",
  questions: [
  {
    question: "Assets in Figma typically include:",
    options: ["Financial data", "Reusable components, styles, and icons", "Backend scripts", "Hosting configurations"],
    answer: "Reusable components, styles, and icons"
  },
  {
    question: "When creating introduction screens (onboarding), the primary focus should be:",
    options: ["Complex information", "Clear value proposition and simple guidance", "Long text paragraphs", "Multiple distractions"],
    answer: "Clear value proposition and simple guidance"
  },
  {
    question: "Using components in Figma primarily helps to:",
    options: ["Increase duplication", "Maintain consistency and enable reuse", "Create random variations", "Slow down workflow"],
    answer: "Maintain consistency and enable reuse"
  },
  {
    question: "Auto-layout is useful for:",
    options: ["Fixing elements in one position only", "Automatically adjusting spacing and alignment dynamically", "Removing responsiveness", "Avoiding grouping"],
    answer: "Automatically adjusting spacing and alignment dynamically"
  },
  {
    question: "Linking screens in prototype mode allows designers to:",
    options: ["Create static mockups only", "Simulate navigation and user flow interactions", "Export HTML", "Delete frames"],
    answer: "Simulate navigation and user flow interactions"
  },
  {
    question: "Variants in Figma components are mainly used to:",
    options: ["Create unrelated designs", "Represent different states like hover, active, or disabled", "Increase file size", "Remove interactions"],
    answer: "Represent different states like hover, active, or disabled"
  },
  {
    question: "Micro-interactions enhance UX by:",
    options: ["Adding unnecessary animations", "Providing subtle feedback for user actions", "Slowing navigation", "Increasing friction"],
    answer: "Providing subtle feedback for user actions"
  },
  {
    question: "Strong information hierarchy ensures that:",
    options: ["All elements look equal", "Important information stands out clearly", "Text sizes are identical", "Users read everything in detail"],
    answer: "Important information stands out clearly"
  },
  {
    question: "When integrating an augmented reality (AR) feature concept into a product page, the key UX consideration is:",
    options: ["Adding it without context", "Ensuring it solves a real user need (e.g., product visualization)", "Increasing loading time", "Hiding instructions"],
    answer: "Ensuring it solves a real user need (e.g., product visualization)"
  },
  {
    question: "Self-heuristic evaluation before final submission helps to:",
    options: ["Skip user testing", "Identify usability gaps and refine flow consistency", "Increase design complexity", "Ignore feedback"],
    answer: "Identify usability gaps and refine flow consistency"
  }]
},
{
  name: "E-commerce UX Design Fundamentals",
  description: "Key UX principles for improving usability and conversions in e-commerce products.",
  questions: [
  {
    question: "Visual hierarchy on an e-commerce homepage primarily helps users to:",
    options: ["Read everything equally", "Identify important elements like offers and CTAs quickly", "Increase scrolling time", "Ignore navigation"],
    answer: "Identify important elements like offers and CTAs quickly"
  },
  {
    question: "A strong Call-To-Action (CTA) button should:",
    options: ["Blend into the background", "Be visually distinct and action-oriented", "Contain long paragraphs", "Be placed randomly"],
    answer: "Be visually distinct and action-oriented"
  },
  {
    question: "Clear navigation on an e-commerce site allows users to:",
    options: ["Manually browse every product", "Easily find relevant products using navigation and search", "Avoid filtering", "Spend excessive time searching"],
    answer: "Easily find relevant products using navigation and search"
  },
  {
    question: "Filtering and sorting usability improves when:",
    options: ["Filters are hidden", "Filters are clear, relevant, and easy to reset", "Sorting options are limited to one", "No price range is shown"],
    answer: "Filters are clear, relevant, and easy to reset"
  },
  {
    question: "Ratings and reviews support decision-making by:",
    options: ["Increasing product price", "Providing social proof and reducing uncertainty", "Slowing down page load", "Replacing product descriptions"],
    answer: "Providing social proof and reducing uncertainty"
  },
  {
    question: "Product comparison features are most useful when:",
    options: ["Users buy only one fixed product", "Users need to evaluate multiple options side-by-side", "There are no alternatives", "Checkout is mandatory"],
    answer: "Users need to evaluate multiple options side-by-side"
  },
  {
    question: "A well-designed wishlist primarily helps to:",
    options: ["Remove products permanently", "Save products for future consideration", "Increase cart abandonment", "Reduce personalization"],
    answer: "Save products for future consideration"
  },
  {
    question: "Product detail page optimization should prioritize:",
    options: ["Decorative graphics only", "Clear images, pricing, benefits, and specifications", "Minimal information", "Hidden shipping details"],
    answer: "Clear images, pricing, benefits, and specifications"
  },
  {
    question: "Reducing decision friction involves:",
    options: ["Increasing product variations without guidance", "Simplifying choices and clarifying benefits", "Removing reviews", "Hiding pricing"],
    answer: "Simplifying choices and clarifying benefits"
  },
  {
    question: "A well-designed checkout flow should:",
    options: ["Include unnecessary steps", "Be short, clear, and distraction-free", "Force account creation always", "Add complex verification steps"],
    answer: "Be short, clear, and distraction-free"
  }]
},
{
  name: "E-commerce UX Optimization & Onboarding",
  description: "Improving checkout, trust, onboarding, and post-purchase user experience.",
  questions: [
  {
    question: "Offering multiple payment options improves UX because it:",
    options: ["Increases confusion", "Accommodates diverse customer preferences", "Slows down checkout", "Reduces trust"],
    answer: "Accommodates diverse customer preferences"
  },
  {
    question: "Guest checkout is important because it:",
    options: ["Reduces convenience", "Minimizes friction for first-time buyers", "Eliminates account benefits", "Increases drop-off rates"],
    answer: "Minimizes friction for first-time buyers"
  },
  {
    question: "Delivery and shipping transparency builds trust by:",
    options: ["Hiding extra costs", "Clearly displaying timelines and charges upfront", "Changing prices later", "Removing tracking"],
    answer: "Clearly displaying timelines and charges upfront"
  },
  {
    question: "Easy access to customer care improves:",
    options: ["User frustration", "Customer satisfaction and trust", "Cart abandonment", "Decision fatigue"],
    answer: "Customer satisfaction and trust"
  },
  {
    question: "A smooth returns and refund UX process helps to:",
    options: ["Increase complaints", "Encourage repeat purchases", "Reduce brand trust", "Increase complexity"],
    answer: "Encourage repeat purchases"
  },
  {
    question: "Post-purchase engagement strategies may include:",
    options: ["Ignoring customers after checkout", "Order updates, feedback requests, and loyalty rewards", "Removing communication", "Increasing spam"],
    answer: "Order updates, feedback requests, and loyalty rewards"
  },
  {
    question: "Onboarding primarily aims to:",
    options: ["Add unnecessary tutorials", "Help users understand product value quickly", "Increase app complexity", "Delay feature access"],
    answer: "Help users understand product value quickly"
  },
  {
    question: "Progressive disclosure in onboarding means:",
    options: ["Showing all features at once", "Revealing information gradually as needed", "Hiding features permanently", "Removing help content"],
    answer: "Revealing information gradually as needed"
  },
  {
    question: "A common reason for low app adoption is:",
    options: ["Clear value proposition", "Complex onboarding and unclear benefits", "Simple navigation", "Fast loading speed"],
    answer: "Complex onboarding and unclear benefits"
  },
  {
    question: "Combining e-commerce UX with onboarding strategy ensures that:",
    options: ["Only new users benefit", "First-time visitors are guided smoothly toward purchase", "Checkout is skipped", "Features remain hidden"],
    answer: "First-time visitors are guided smoothly toward purchase"
  }]
}];
