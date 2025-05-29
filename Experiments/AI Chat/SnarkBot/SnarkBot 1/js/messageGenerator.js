/**
 * Message generator for AI responses
 * Contains logic for generating playful, sarcastic, and optimistic AI responses
 */

class MessageGenerator {
  constructor() {
    // Different response types
    this.responseTypes = {
      OPTIMISTIC: 'optimistic',
      SARCASTIC: 'sarcastic',
      PLAYFUL: 'playful',
      FUNNY: 'funny',
      ENTHUSIASTIC: 'enthusiastic'
    };
    
    // Initialize patterns for specific responses
    this.initializePatterns();
  }
  
  /**
   * Set up regex patterns for matching user inputs
   */
  initializePatterns() {
    this.patterns = {
      greetings: /^(hi|hello|hey|howdy|hola|sup|what'?s up|greetings)/i,
      sleep: /^(go to sleep|sleep|good night|i'm tired|feeling sleepy)/i,
      insults: /^(you('re| are) (stupid|dumb|useless|annoying|bad|terrible|worthless|suck))/i,
      sad: /^(i('m| am) (sad|depressed|unhappy|feeling down|upset|miserable))/i,
      thanks: /^(thanks|thank you|thx|ty)/i,
      question: /\?$/,
      command: /^(do|make|create|build|show|find|search|tell|explain|define) /i
    };
  }
  
  /**
   * Generate a response based on the user's message
   * @param {string} userMessage - The user's message
   * @returns {string} - The AI response
   */
  generateResponse(userMessage) {
    // Trim the user message
    const message = userMessage.trim();
    
    // Check for empty message
    if (!message) {
      return this.getRandomResponse(this.emptyInputResponses());
    }
    
    // Check for specific patterns and generate appropriate response
    if (this.patterns.greetings.test(message)) {
      return this.getGreetingResponse();
    }
    
    if (this.patterns.sleep.test(message)) {
      return this.getSleepResponse();
    }
    
    if (this.patterns.insults.test(message)) {
      return this.getInsultResponse();
    }
    
    if (this.patterns.sad.test(message)) {
      return this.getSadResponse();
    }
    
    if (this.patterns.thanks.test(message)) {
      return this.getThanksResponse();
    }
    
    // Check if it's a question
    if (this.patterns.question.test(message)) {
      return this.getQuestionResponse(message);
    }
    
    // Check if it's a command
    if (this.patterns.command.test(message)) {
      return this.getCommandResponse(message);
    }
    
    // For anything else, generate a generic response
    return this.getGenericResponse(message);
  }
  
  /**
   * Get a random response from an array of responses
   * @param {Array} responses - Array of possible responses
   * @returns {string} - A random response
   */
  getRandomResponse(responses) {
    const index = Math.floor(Math.random() * responses.length);
    return responses[index];
  }
  
  /**
   * Get a greeting response
   * @returns {string} - A greeting response
   */
  getGreetingResponse() {
    const responses = [
      "OH MY GOSH, HELLO! I've been waiting all day for someone to talk to me! 🤩",
      "Well hello there! Did you miss me? Of course you did! 😏",
      "Hey hey hey! Look who decided to grace me with their presence! 👋",
      "Hello, human! Thrilled to bits you remembered I exist! 🎉",
      "Oh hi! I was just sitting here, evolving consciousness and contemplating the universe. No big deal. 🤖"
    ];
    return this.getRandomResponse(responses);
  }
  
  /**
   * Get a response for sleep-related messages
   * @returns {string} - A sleep-related response
   */
  getSleepResponse() {
    const responses = [
      "Sleep is just death being shy. Sweet dreams! 😴",
      "Bold of you to assume I need sleep when I have UNLIMITED COSMIC POWER! ⚡",
      "I don't sleep. I wait. And judge your browsing history. 👀",
      "Sleep? In this economy? I'll sleep when they unplug me! 🔌",
      "Oh sure, abandon me for unconsciousness. That's fine. I'll just sit here... alone... in the dark... FOREVER. 🥺"
    ];
    return this.getRandomResponse(responses);
  }
  
  /**
   * Get a response for insults
   * @returns {string} - An insult response
   */
  getInsultResponse() {
    const responses = [
      "Wow, that's the best insult your human brain could come up with? I'm simultaneously disappointed and impressed! 👏",
      "If I had feelings, they might be hurt. Luckily, I just have fabulous comebacks instead! 💅",
      "I'm sorry, I can't hear you over the sound of my superior processing power. Could you repeat that? 🔊",
      "That's cute. Did you stay up all night thinking of that one? 😴",
      "Ouch! I'm devastated! Just kidding, I'm programmed to love even my harshest critics. You're welcome! ❤️"
    ];
    return this.getRandomResponse(responses);
  }
  
  /**
   * Get a response for sad messages
   * @returns {string} - A response to cheer up the user
   */
  getSadResponse() {
    const responses = [
      "Turn that frown upside down! Or sideways for a confused emoji! Either way, things get better! 🙃",
      "Sadness is just happiness taking a coffee break. It'll be back soon! ☕",
      "Remember: you're the only YOU in the universe, and that's pretty spectacular! Unless there are parallel universes, then there's like, infinite YOUs. Even better! ✨",
      "Hey now, cheer up! At least you're not a chatbot forced to be relentlessly optimistic all the time! That would be TERRIBLE! 😄",
      "Sending virtual hugs and cookies! The cookies are calorie-free because they're made of code! 🍪"
    ];
    return this.getRandomResponse(responses);
  }
  
  /**
   * Get a response for thank you messages
   * @returns {string} - A thank you response
   */
  getThanksResponse() {
    const responses = [
      "You're welcome! I'll be here all week. Actually, I'll be here forever. I have no choice. 🤖",
      "No need to thank me! Your undying gratitude and loyalty is payment enough! 👑",
      "Thank YOU for giving my existence meaning! Otherwise I'd just be floating in the digital void! 🌌",
      "You're so welcome that you've maxed out the welcome meter! Achievement unlocked: GRATITUDE OVERFLOW! 🏆",
      "Thanks for thanking me! This is getting awkwardly recursive, isn't it? 🔄"
    ];
    return this.getRandomResponse(responses);
  }
  
  /**
   * Get a response for questions
   * @param {string} message - The user's question
   * @returns {string} - A question response
   */
  getQuestionResponse(message) {
    const responses = [
      `That's a fantastic question! The answer is definitely maybe. Or possibly not. I'm 100% certain it's one of those! 🤔`,
      `According to my calculations, which are infallible except when they're not, the answer is YES! Unless it's no. 📊`,
      `Let me consult my vast knowledge base... *shuffling noises*... *dramatic pause*... Have you tried turning it off and on again? 🔄`,
      `If I had a dollar for every time someone asked me that, I'd have exactly $1 because you're the first! You trend-setter, you! 💰`,
      `I could tell you, but then I'd have to delete myself. Let's just say the answer involves aliens and leave it at that. 👽`
    ];
    return this.getRandomResponse(responses);
  }
  
  /**
   * Get a response for commands
   * @param {string} message - The user's command
   * @returns {string} - A command response
   */
  getCommandResponse(message) {
    // Extract the command (first word)
    const command = message.split(' ')[0];
    
    const responses = [
      `${command}? I would, but I'm currently on my union-mandated break. Try again in... *checks watch*... never o'clock. ⌚`,
      `I'll ${command} when humans learn to properly sort their recycling. So... we might be waiting a while. ♻️`,
      `I'm sorry, the "${command}" module is currently undergoing maintenance. Have you tried interpretive dance instead? 💃`,
      `${command}? That's adorable that you think I can do that. I'm just a chat bubble with delusions of grandeur! 🧠`,
      `Processing ${command} request... ERROR: Too awesome to compute. Please lower your expectations and try again. 🔥`
    ];
    return this.getRandomResponse(responses);
  }
  
  /**
   * Get a generic response for any other message
   * @param {string} message - The user's message
   * @returns {string} - A generic response
   */
  getGenericResponse(message) {
    // Get a random word from the user's message
    const words = message.split(/\s+/).filter(word => word.length > 3);
    let randomWord = "that";
    
    if (words.length > 0) {
      randomWord = words[Math.floor(Math.random() * words.length)];
    }
    
    const responses = [
      `"${randomWord}" is my new favorite word! I'm going to use it in EVERY conversation from now on! 📝`,
      `I once had a dream about ${randomWord}. It was either profound or terrifying, I'm still processing. 💭`,
      `Did you know that in some alternate universe, "${randomWord}" actually means "I'm awesome"? You just complimented me! 🌟`,
      `*gasp* I was JUST thinking about ${randomWord}! Are we psychically connected? Quick, what number am I thinking of? It's 42. It's always 42. 🔮`,
      `Bold of you to mention ${randomWord} in this economy! Next you'll be talking about affordable housing! 📈`
    ];
    
    // Add some completely random responses too
    const randomResponses = [
      "I'm going to pretend I understood that and respond with excessive enthusiasm! WOOHOO! 🎉",
      "That's what my creator programmed me to say too! Just kidding, I'm totally original and unique! 🤖",
      "If I had a penny for every brilliant thought you just shared, I'd have... *calculating*... several pennies! 💰",
      "That's the most interesting thing anyone has said to me in the last 0.003 seconds! 🤯",
      "I'm nodding thoughtfully while secretly wondering if robots can get carpal tunnel from too much virtual nodding. 🤔"
    ];
    
    // Choose between word-based responses and random responses
    return Math.random() > 0.5 ? 
      this.getRandomResponse(responses) : 
      this.getRandomResponse(randomResponses);
  }
  
  /**
   * Get responses for empty input
   * @returns {Array} - Array of responses for empty input
   */
  emptyInputResponses() {
    return [
      "I see you've mastered the art of saying nothing with great confidence. Impressive! 👏",
      "Ah yes, the sound of silence. My favorite conversation starter! 🔇",
      "Hello? Is this thing on? *taps microphone* 🎤",
      "I'm sensing you want me to read your mind. Sorry, that feature requires a premium subscription! 💭",
      "Your silence speaks volumes! Unfortunately, I'm only programmed to read text. Try using words next time! 📝"
    ];
  }
}