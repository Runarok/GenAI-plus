// Global variables
let currentTest = null
let currentQuestionIndex = 0
let answers = []
let selectedPrecision = null
let questionCount = 0
let autoAdvance = false

// MBTI Questions Database
const questions = {
  basic: [
    {
      text: "You prefer to focus on the outer world of people and things rather than the inner world of ideas.",
      dimension: "E",
    },
    {
      text: "You prefer to focus on basic information you take in rather than interpreting and adding meaning.",
      dimension: "S",
    },
    { text: "When making decisions, you prefer to first look at logic and consistency.", dimension: "T" },
    {
      text: "In dealing with the outside world, you prefer to get things decided rather than stay open to new information.",
      dimension: "J",
    },
    { text: "You are energized by spending time with people.", dimension: "E" },
    { text: "You focus on details and facts rather than ideas and concepts.", dimension: "S" },
    { text: "You make decisions based on objective analysis rather than personal values.", dimension: "T" },
    { text: "You prefer structure and closure rather than flexibility and spontaneity.", dimension: "J" },
    { text: "You enjoy being the center of attention.", dimension: "E" },
    { text: "You trust experience more than hunches.", dimension: "S" },
    { text: "You value truth and justice over tact and harmony.", dimension: "T" },
    { text: "You prefer to have things settled and organized.", dimension: "J" },
    { text: "You feel comfortable in groups and enjoy meeting new people.", dimension: "E" },
    { text: "You prefer practical and realistic approaches.", dimension: "S" },
    { text: "You are more convinced by logical reasoning than emotional appeals.", dimension: "T" },
    { text: "You like to have a plan and stick to it.", dimension: "J" },
    { text: "You think out loud and process ideas by talking about them.", dimension: "E" },
    { text: "You focus on what is real and concrete.", dimension: "S" },
    { text: "You make decisions with your head rather than your heart.", dimension: "T" },
    { text: "You prefer closure and completion over open-ended possibilities.", dimension: "J" },
  ],
  intermediate: [
    // Basic questions plus additional ones
    {
      text: "You prefer to focus on the outer world of people and things rather than the inner world of ideas.",
      dimension: "E",
    },
    {
      text: "You prefer to focus on basic information you take in rather than interpreting and adding meaning.",
      dimension: "S",
    },
    { text: "When making decisions, you prefer to first look at logic and consistency.", dimension: "T" },
    {
      text: "In dealing with the outside world, you prefer to get things decided rather than stay open to new information.",
      dimension: "J",
    },
    { text: "You are energized by spending time with people.", dimension: "E" },
    { text: "You focus on details and facts rather than ideas and concepts.", dimension: "S" },
    { text: "You make decisions based on objective analysis rather than personal values.", dimension: "T" },
    { text: "You prefer structure and closure rather than flexibility and spontaneity.", dimension: "J" },
    { text: "You enjoy being the center of attention.", dimension: "E" },
    { text: "You trust experience more than hunches.", dimension: "S" },
    { text: "You value truth and justice over tact and harmony.", dimension: "T" },
    { text: "You prefer to have things settled and organized.", dimension: "J" },
    { text: "You feel comfortable in groups and enjoy meeting new people.", dimension: "E" },
    { text: "You prefer practical and realistic approaches.", dimension: "S" },
    { text: "You are more convinced by logical reasoning than emotional appeals.", dimension: "T" },
    { text: "You like to have a plan and stick to it.", dimension: "J" },
    { text: "You think out loud and process ideas by talking about them.", dimension: "E" },
    { text: "You focus on what is real and concrete.", dimension: "S" },
    { text: "You make decisions with your head rather than your heart.", dimension: "T" },
    { text: "You prefer closure and completion over open-ended possibilities.", dimension: "J" },
    // Additional intermediate questions
    { text: "You find it easy to introduce yourself to new people.", dimension: "E" },
    { text: "You prefer to work with established methods rather than experimental approaches.", dimension: "S" },
    { text: "You believe efficiency is more important than people's feelings.", dimension: "T" },
    { text: "You prefer to make decisions quickly rather than keep your options open.", dimension: "J" },
    { text: "You feel drained after spending too much time alone.", dimension: "E" },
    { text: "You pay more attention to what is happening now than future possibilities.", dimension: "S" },
    { text: "You find it easy to critique others' ideas objectively.", dimension: "T" },
    { text: "You feel stressed when things are left unfinished.", dimension: "J" },
    { text: "You prefer group activities over solitary pursuits.", dimension: "E" },
    { text: "You trust facts and data more than theories and possibilities.", dimension: "S" },
    { text: "You can easily set aside personal feelings when making important decisions.", dimension: "T" },
    { text: "You prefer to follow a schedule rather than go with the flow.", dimension: "J" },
    { text: "You gain energy from social interactions.", dimension: "E" },
    { text: "You prefer step-by-step instructions over general guidelines.", dimension: "S" },
    { text: "You value competence over compassion in leadership.", dimension: "T" },
    { text: "You like to complete tasks well before deadlines.", dimension: "J" },
    { text: "You enjoy networking and building professional relationships.", dimension: "E" },
    { text: "You focus on immediate, practical concerns rather than long-term implications.", dimension: "S" },
    { text: "You believe constructive criticism is more valuable than praise.", dimension: "T" },
    { text: "You prefer having clear expectations and guidelines.", dimension: "J" },
    { text: "You feel more comfortable speaking than listening in conversations.", dimension: "E" },
    { text: "You prefer concrete examples over abstract concepts.", dimension: "S" },
    { text: "You make decisions based on logical analysis rather than gut feelings.", dimension: "T" },
    { text: "You prefer to plan your day in advance rather than be spontaneous.", dimension: "J" },
    { text: "You enjoy being around people most of the time.", dimension: "E" },
    { text: "You trust your five senses more than your intuition.", dimension: "S" },
    { text: "You believe being right is more important than being liked.", dimension: "T" },
    { text: "You prefer routine and predictability over variety and surprise.", dimension: "J" },
    { text: "You find it easy to start conversations with strangers.", dimension: "E" },
    { text: "You prefer dealing with facts rather than interpretations.", dimension: "S" },
    { text: "You can easily separate logic from emotion in decision-making.", dimension: "T" },
    { text: "You feel more comfortable when decisions are made rather than pending.", dimension: "J" },
  ],
  advanced: [
    // All previous questions plus more detailed ones
    {
      text: "You prefer to focus on the outer world of people and things rather than the inner world of ideas.",
      dimension: "E",
    },
    {
      text: "You prefer to focus on basic information you take in rather than interpreting and adding meaning.",
      dimension: "S",
    },
    { text: "When making decisions, you prefer to first look at logic and consistency.", dimension: "T" },
    {
      text: "In dealing with the outside world, you prefer to get things decided rather than stay open to new information.",
      dimension: "J",
    },
    { text: "You are energized by spending time with people.", dimension: "E" },
    { text: "You focus on details and facts rather than ideas and concepts.", dimension: "S" },
    { text: "You make decisions based on objective analysis rather than personal values.", dimension: "T" },
    { text: "You prefer structure and closure rather than flexibility and spontaneity.", dimension: "J" },
    { text: "You enjoy being the center of attention.", dimension: "E" },
    { text: "You trust experience more than hunches.", dimension: "S" },
    { text: "You value truth and justice over tact and harmony.", dimension: "T" },
    { text: "You prefer to have things settled and organized.", dimension: "J" },
    { text: "You feel comfortable in groups and enjoy meeting new people.", dimension: "E" },
    { text: "You prefer practical and realistic approaches.", dimension: "S" },
    { text: "You are more convinced by logical reasoning than emotional appeals.", dimension: "T" },
    { text: "You like to have a plan and stick to it.", dimension: "J" },
    { text: "You think out loud and process ideas by talking about them.", dimension: "E" },
    { text: "You focus on what is real and concrete.", dimension: "S" },
    { text: "You make decisions with your head rather than your heart.", dimension: "T" },
    { text: "You prefer closure and completion over open-ended possibilities.", dimension: "J" },
    { text: "You find it easy to introduce yourself to new people.", dimension: "E" },
    { text: "You prefer to work with established methods rather than experimental approaches.", dimension: "S" },
    { text: "You believe efficiency is more important than people's feelings.", dimension: "T" },
    { text: "You prefer to make decisions quickly rather than keep your options open.", dimension: "J" },
    { text: "You feel drained after spending too much time alone.", dimension: "E" },
    { text: "You pay more attention to what is happening now than future possibilities.", dimension: "S" },
    { text: "You find it easy to critique others' ideas objectively.", dimension: "T" },
    { text: "You feel stressed when things are left unfinished.", dimension: "J" },
    { text: "You prefer group activities over solitary pursuits.", dimension: "E" },
    { text: "You trust facts and data more than theories and possibilities.", dimension: "S" },
    { text: "You can easily set aside personal feelings when making important decisions.", dimension: "T" },
    { text: "You prefer to follow a schedule rather than go with the flow.", dimension: "J" },
    { text: "You gain energy from social interactions.", dimension: "E" },
    { text: "You prefer step-by-step instructions over general guidelines.", dimension: "S" },
    { text: "You value competence over compassion in leadership.", dimension: "T" },
    { text: "You like to complete tasks well before deadlines.", dimension: "J" },
    { text: "You enjoy networking and building professional relationships.", dimension: "E" },
    { text: "You focus on immediate, practical concerns rather than long-term implications.", dimension: "S" },
    { text: "You believe constructive criticism is more valuable than praise.", dimension: "T" },
    { text: "You prefer having clear expectations and guidelines.", dimension: "J" },
    { text: "You feel more comfortable speaking than listening in conversations.", dimension: "E" },
    { text: "You prefer concrete examples over abstract concepts.", dimension: "S" },
    { text: "You make decisions based on logical analysis rather than gut feelings.", dimension: "T" },
    { text: "You prefer to plan your day in advance rather than be spontaneous.", dimension: "J" },
    { text: "You enjoy being around people most of the time.", dimension: "E" },
    { text: "You trust your five senses more than your intuition.", dimension: "S" },
    { text: "You believe being right is more important than being liked.", dimension: "T" },
    { text: "You prefer routine and predictability over variety and surprise.", dimension: "J" },
    { text: "You find it easy to start conversations with strangers.", dimension: "E" },
    { text: "You prefer dealing with facts rather than interpretations.", dimension: "S" },
    { text: "You can easily separate logic from emotion in decision-making.", dimension: "T" },
    { text: "You feel more comfortable when decisions are made rather than pending.", dimension: "J" },
    // Additional advanced questions (continuing to 100)
    { text: "You feel energized after attending large social gatherings.", dimension: "E" },
    { text: "You prefer to focus on present realities rather than future possibilities.", dimension: "S" },
    { text: "You find it easier to be firm than gentle with people.", dimension: "T" },
    { text: "You prefer to have decisions made rather than keep exploring options.", dimension: "J" },
    { text: "You enjoy being in the spotlight and receiving attention.", dimension: "E" },
    { text: "You trust established procedures more than innovative approaches.", dimension: "S" },
    { text: "You believe logic should override personal considerations in decisions.", dimension: "T" },
    { text: "You feel uncomfortable when plans change at the last minute.", dimension: "J" },
    { text: "You prefer working in teams rather than independently.", dimension: "E" },
    { text: "You focus on practical applications rather than theoretical concepts.", dimension: "S" },
    { text: "You can easily point out flaws in others' reasoning.", dimension: "T" },
    { text: "You prefer to finish one project before starting another.", dimension: "J" },
    { text: "You feel more alive when surrounded by people.", dimension: "E" },
    { text: "You prefer detailed, specific information over general concepts.", dimension: "S" },
    { text: "You value truth over tact in communication.", dimension: "T" },
    { text: "You like to have your day structured and organized.", dimension: "J" },
    { text: "You enjoy meeting new people at social events.", dimension: "E" },
    { text: "You prefer hands-on experience over theoretical learning.", dimension: "S" },
    { text: "You find it easy to remain objective in emotional situations.", dimension: "T" },
    { text: "You prefer to make lists and follow them.", dimension: "J" },
    { text: "You feel comfortable being the leader in group situations.", dimension: "E" },
    { text: "You trust what you can see and touch more than abstract ideas.", dimension: "S" },
    { text: "You believe competence is more important than warmth in relationships.", dimension: "T" },
    { text: "You prefer to have closure on issues rather than leave them open-ended.", dimension: "J" },
    { text: "You enjoy brainstorming sessions with others.", dimension: "E" },
    { text: "You prefer to work with concrete data rather than possibilities.", dimension: "S" },
    { text: "You can easily make tough decisions that may hurt others' feelings.", dimension: "T" },
    { text: "You feel stressed when too many things are left undecided.", dimension: "J" },
    { text: "You prefer to process your thoughts by talking them through with others.", dimension: "E" },
    { text: "You focus on what is rather than what could be.", dimension: "S" },
    { text: "You believe being honest is more important than being diplomatic.", dimension: "T" },
    { text: "You prefer to have a routine and stick to it.", dimension: "J" },
    { text: "You feel more confident in social situations than when alone.", dimension: "E" },
    { text: "You prefer proven methods over experimental approaches.", dimension: "S" },
    { text: "You find it easier to criticize than to praise.", dimension: "T" },
    { text: "You like to have clear deadlines and meet them early.", dimension: "J" },
    { text: "You enjoy parties and social gatherings.", dimension: "E" },
    { text: "You prefer to deal with immediate concerns rather than long-term planning.", dimension: "S" },
    { text: "You value consistency and logic over personal harmony.", dimension: "T" },
    { text: "You prefer to have things decided rather than keep options open.", dimension: "J" },
    { text: "You feel energized by external stimulation and activity.", dimension: "E" },
    { text: "You trust your experience more than your imagination.", dimension: "S" },
    { text: "You believe being right is more important than being popular.", dimension: "T" },
    { text: "You prefer structure and organization over flexibility and spontaneity.", dimension: "J" },
    { text: "You enjoy being around people and feel lonely when isolated.", dimension: "E" },
    { text: "You focus on facts and details rather than patterns and meanings.", dimension: "S" },
    { text: "You make decisions based on objective criteria rather than personal values.", dimension: "T" },
    { text: "You prefer to plan ahead rather than improvise.", dimension: "J" },
    { text: "You feel more comfortable in groups than when alone.", dimension: "E" },
    { text: "You prefer practical solutions over creative alternatives.", dimension: "S" },
    { text: "You can easily separate your emotions from your decisions.", dimension: "T" },
    { text: "You like to have a clear schedule and follow it.", dimension: "J" },
    { text: "You enjoy being the center of attention in social situations.", dimension: "E" },
    { text: "You trust established facts more than new theories.", dimension: "S" },
    { text: "You believe efficiency is more important than people's comfort.", dimension: "T" },
    { text: "You prefer to have things settled and decided.", dimension: "J" },
    { text: "You gain energy from interacting with others.", dimension: "E" },
    { text: "You focus on present realities rather than future possibilities.", dimension: "S" },
    { text: "You value logic and analysis over empathy and compassion.", dimension: "T" },
    { text: "You prefer closure and completion over open-ended exploration.", dimension: "J" },
    { text: "You feel more alive and energetic when around other people.", dimension: "E" },
    { text: "You prefer to work with concrete information rather than abstract concepts.", dimension: "S" },
    { text: "You find it easy to make decisions based on objective analysis.", dimension: "T" },
    { text: "You like to have a plan and stick to it rather than adapt as you go.", dimension: "J" },
  ],
}

// MBTI Type Descriptions
const mbtiTypes = {
  INTJ: {
    name: "The Architect",
    description:
      "Imaginative and strategic thinkers, with a plan for everything. INTJs are independent, decisive, and have strong convictions. They see the big picture and are natural leaders who are not afraid to challenge the status quo.",
  },
  INTP: {
    name: "The Thinker",
    description:
      "Innovative inventors with an unquenchable thirst for knowledge. INTPs are logical, analytical, and objective. They love theoretical and abstract concepts and are always seeking to understand how things work.",
  },
  ENTJ: {
    name: "The Commander",
    description:
      "Bold, imaginative and strong-willed leaders, always finding a way or making one. ENTJs are natural-born leaders who are decisive, confident, and charismatic. They excel at organizing people and resources to achieve their goals.",
  },
  ENTP: {
    name: "The Debater",
    description:
      "Smart and curious thinkers who cannot resist an intellectual challenge. ENTPs are innovative, enthusiastic, and strategic. They love exploring new ideas and possibilities and are excellent at seeing connections others miss.",
  },
  INFJ: {
    name: "The Advocate",
    description:
      "Quiet and mystical, yet very inspiring and tireless idealists. INFJs are creative, insightful, and principled. They have a strong sense of purpose and are driven to help others and make the world a better place.",
  },
  INFP: {
    name: "The Mediator",
    description:
      "Poetic, kind and altruistic people, always eager to help a good cause. INFPs are idealistic, loyal, and adaptable. They are driven by their values and seek to understand themselves and others on a deep level.",
  },
  ENFJ: {
    name: "The Protagonist",
    description:
      "Charismatic and inspiring leaders, able to mesmerize their listeners. ENFJs are warm, empathetic, and responsible. They are natural teachers and mentors who are passionate about helping others reach their potential.",
  },
  ENFP: {
    name: "The Campaigner",
    description:
      "Enthusiastic, creative and sociable free spirits, who can always find a reason to smile. ENFPs are energetic, optimistic, and spontaneous. They love exploring new ideas and connecting with people.",
  },
  ISTJ: {
    name: "The Logistician",
    description:
      "Practical and fact-minded, reliable and responsible. ISTJs are organized, dependable, and thorough. They value tradition and loyalty and are committed to fulfilling their duties and obligations.",
  },
  ISFJ: {
    name: "The Protector",
    description:
      "Warm-hearted and dedicated, always ready to protect their loved ones. ISFJs are caring, reliable, and conscientious. They are attentive to others' needs and work hard to maintain harmony and stability.",
  },
  ESTJ: {
    name: "The Executive",
    description:
      "Excellent administrators, unsurpassed at managing things or people. ESTJs are organized, practical, and decisive. They are natural leaders who value efficiency, tradition, and getting things done.",
  },
  ESFJ: {
    name: "The Consul",
    description:
      "Extraordinarily caring, social and popular people, always eager to help. ESFJs are warm, cooperative, and responsible. They are attentive to others' needs and work to create harmony in their relationships.",
  },
  ISTP: {
    name: "The Virtuoso",
    description:
      "Bold and practical experimenters, masters of all kinds of tools. ISTPs are adaptable, logical, and hands-on. They are excellent problem-solvers who prefer to learn through direct experience.",
  },
  ISFP: {
    name: "The Adventurer",
    description:
      "Flexible and charming artists, always ready to explore new possibilities. ISFPs are gentle, caring, and artistic. They value harmony and authenticity and are driven by their personal values.",
  },
  ESTP: {
    name: "The Entrepreneur",
    description:
      "Smart, energetic and very perceptive people, truly enjoy living on the edge. ESTPs are spontaneous, adaptable, and pragmatic. They are excellent at reading people and situations and thrive in dynamic environments.",
  },
  ESFP: {
    name: "The Entertainer",
    description:
      "Spontaneous, energetic and enthusiastic people – life is never boring around them. ESFPs are warm, friendly, and outgoing. They love being around people and are always ready to help others have a good time.",
  },
}

// Answer options
const answerOptions = [
  { text: "Strongly Disagree", value: 1 },
  { text: "Disagree", value: 2 },
  { text: "Neutral", value: 3 },
  { text: "Agree", value: 4 },
  { text: "Strongly Agree", value: 5 },
]

// Functions
function selectPrecision(level, count, element) {
  selectedPrecision = level
  questionCount = count

  // Remove selected class from all cards
  document.querySelectorAll(".precision-card").forEach((card) => {
    card.classList.remove("selected")
  })

  // Add selected class to clicked card
  element.classList.add("selected")

  // Enable start button
  document.getElementById("start-test-btn").disabled = false
}

function startTest() {
  if (!selectedPrecision) return

  currentTest = questions[selectedPrecision]
  currentQuestionIndex = 0
  answers = []

  document.getElementById("welcome-screen").classList.add("hidden")
  document.getElementById("test-screen").classList.remove("hidden")

  showQuestion()
}

function showQuestion() {
  const question = currentTest[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / currentTest.length) * 100

  document.getElementById("progress-fill").style.width = progress + "%"
  document.getElementById("question-number").textContent =
    `Question ${currentQuestionIndex + 1} of ${currentTest.length}`
  document.getElementById("question-text").textContent = question.text

  const optionsContainer = document.getElementById("answer-options")
  optionsContainer.innerHTML = ""

  answerOptions.forEach((option, index) => {
    const optionElement = document.createElement("div")
    optionElement.className = "answer-option"
    optionElement.textContent = option.text
    optionElement.onclick = () => selectAnswer(index, option.value)
    optionsContainer.appendChild(optionElement)
  })

  // Update navigation buttons
  document.getElementById("prev-btn").disabled = currentQuestionIndex === 0
  document.getElementById("next-btn").disabled = true

  const nextBtn = document.getElementById("next-btn")
  if (currentQuestionIndex === currentTest.length - 1) {
    nextBtn.innerHTML = 'Finish Test <i class="fas fa-check"></i>'
  } else {
    nextBtn.innerHTML = 'Next <i class="fas fa-arrow-right"></i>'
  }
}

function selectAnswer(optionIndex, value) {
  // Remove selected class from all options
  document.querySelectorAll(".answer-option").forEach((option) => {
    option.classList.remove("selected")
  })

  // Add selected class to clicked option
  document.querySelectorAll(".answer-option")[optionIndex].classList.add("selected")

  // Store answer
  answers[currentQuestionIndex] = {
    dimension: currentTest[currentQuestionIndex].dimension,
    value: value,
  }

  // Enable next button
  document.getElementById("next-btn").disabled = false

  // Auto-advance if enabled
  if (autoAdvance) {
    setTimeout(() => {
      if (currentQuestionIndex < currentTest.length - 1) {
        nextQuestion()
      } else {
        finishTest()
      }
    }, 800) // Small delay for visual feedback
  }
}

function nextQuestion() {
  if (currentQuestionIndex < currentTest.length - 1) {
    currentQuestionIndex++
    showQuestion()
  } else {
    finishTest()
  }
}

function previousQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--
    showQuestion()

    // Restore previous answer if exists
    if (answers[currentQuestionIndex]) {
      const answerValue = answers[currentQuestionIndex].value
      const optionIndex = answerValue - 1
      document.querySelectorAll(".answer-option")[optionIndex].classList.add("selected")
      document.getElementById("next-btn").disabled = false
    }
  }
}

function finishTest() {
  const results = calculateResults()
  showResults(results)
}

function calculateResults() {
  const scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 }

  answers.forEach((answer) => {
    const dimension = answer.dimension
    const value = answer.value

    if (dimension === "E") {
      scores.E += value
      scores.I += 6 - value
    } else if (dimension === "S") {
      scores.S += value
      scores.N += 6 - value
    } else if (dimension === "T") {
      scores.T += value
      scores.F += 6 - value
    } else if (dimension === "J") {
      scores.J += value
      scores.P += 6 - value
    }
  })

  const type =
    (scores.E > scores.I ? "E" : "I") +
    (scores.S > scores.N ? "S" : "N") +
    (scores.T > scores.F ? "T" : "F") +
    (scores.J > scores.P ? "J" : "P")

  return {
    type: type,
    scores: scores,
    percentages: {
      EI: Math.round((scores.E / (scores.E + scores.I)) * 100),
      SN: Math.round((scores.S / (scores.S + scores.N)) * 100),
      TF: Math.round((scores.T / (scores.T + scores.F)) * 100),
      JP: Math.round((scores.J / (scores.J + scores.P)) * 100),
    },
  }
}

function showResults(results) {
  document.getElementById("test-screen").classList.add("hidden")
  document.getElementById("results-screen").classList.remove("hidden")

  const typeInfo = mbtiTypes[results.type]

  document.getElementById("mbti-type").textContent = results.type
  document.getElementById("type-name").textContent = typeInfo.name
  document.getElementById("type-description").textContent = typeInfo.description

  // Show dimension percentages
  const dimensionsContainer = document.getElementById("dimensions")
  dimensionsContainer.innerHTML = `
        <div class="dimension">
            <div class="dimension-label">${results.type[0] === "E" ? "Extraversion" : "Introversion"}</div>
            <div class="dimension-value">${results.type[0] === "E" ? results.percentages.EI : 100 - results.percentages.EI}%</div>
        </div>
        <div class="dimension">
            <div class="dimension-label">${results.type[1] === "S" ? "Sensing" : "Intuition"}</div>
            <div class="dimension-value">${results.type[1] === "S" ? results.percentages.SN : 100 - results.percentages.SN}%</div>
        </div>
        <div class="dimension">
            <div class="dimension-label">${results.type[2] === "T" ? "Thinking" : "Feeling"}</div>
            <div class="dimension-value">${results.type[2] === "T" ? results.percentages.TF : 100 - results.percentages.TF}%</div>
        </div>
        <div class="dimension">
            <div class="dimension-label">${results.type[3] === "J" ? "Judging" : "Perceiving"}</div>
            <div class="dimension-value">${results.type[3] === "J" ? results.percentages.JP : 100 - results.percentages.JP}%</div>
        </div>
    `
}

function restartTest() {
  currentTest = null
  currentQuestionIndex = 0
  answers = []
  selectedPrecision = null
  questionCount = 0

  document.getElementById("results-screen").classList.add("hidden")
  document.getElementById("welcome-screen").classList.remove("hidden")

  // Reset precision selection
  document.querySelectorAll(".precision-card").forEach((card) => {
    card.classList.remove("selected")
  })
  document.getElementById("start-test-btn").disabled = true
}

function openSettings() {
  document.getElementById("settings-modal").classList.add("active")
}

function closeSettings() {
  document.getElementById("settings-modal").classList.remove("active")
}

function openInfo() {
  document.getElementById("info-modal").classList.add("active")
  populateInfoModal()
}

function closeInfo() {
  document.getElementById("info-modal").classList.remove("active")
}

function populateInfoModal() {
  const grid = document.getElementById("mbti-types-grid")
  grid.innerHTML = ""

  Object.entries(mbtiTypes).forEach(([type, info]) => {
    const card = document.createElement("div")
    card.className = "mbti-type-card"
    card.innerHTML = `
            <div class="mbti-type-header">
                <div class="mbti-type-code">${type}</div>
                <div class="mbti-type-title">${info.name}</div>
            </div>
            <div class="mbti-type-desc">${info.description}</div>
        `
    grid.appendChild(card)
  })
}

function changeTheme() {
  const theme = document.getElementById("theme-select").value
  document.body.setAttribute("data-theme", theme)
}

function changeFont() {
  const font = document.getElementById("font-select").value
  document.body.className = ""
  if (font === "roboto") {
    document.body.classList.add("font-roboto")
  } else if (font === "poppins") {
    document.body.classList.add("font-poppins")
  } else if (font === "playfair") {
    document.body.classList.add("font-playfair")
  } else if (font === "luminos") {
    document.body.classList.add("font-luminos")
  } else if (font === "times") {
    document.body.classList.add("font-times")
  } else if (font === "courier") {
    document.body.classList.add("font-courier")
  } else if (font === "georgia") {
    document.body.classList.add("font-georgia")
  }
}

function toggleAutoAdvance() {
  autoAdvance = document.getElementById("auto-advance").checked
}

// Close modals when clicking outside
window.onclick = (event) => {
  const settingsModal = document.getElementById("settings-modal")
  const infoModal = document.getElementById("info-modal")

  if (event.target === settingsModal) {
    closeSettings()
  }
  if (event.target === infoModal) {
    closeInfo()
  }
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  // Set initial theme and font
  document.getElementById("theme-select").value = "dark"
  document.getElementById("font-select").value = "inter"
  document.getElementById("auto-advance").checked = false
})
