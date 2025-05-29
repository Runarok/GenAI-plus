class MessageGenerator {
  constructor() {
    this.responseTypes = {
      OPTIMISTIC: 'optimistic',
      SARCASTIC: 'sarcastic',
      PLAYFUL: 'playful',
      FUNNY: 'funny',
      ENTHUSIASTIC: 'enthusiastic'
    };
    
    this.initializePatterns();
  }
  
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
  
  generateResponse(userMessage) {
    const message = userMessage.trim();
    
    if (!message) {
      return this.getRandomResponse([
        "I see you're going for the minimalist approach in our conversation! 🤔",
        "The silence is deafening... say something! 🗣️",
        "I can't read minds yet - that feature is still in beta! 💭",
        "Your message is so empty, it's making me existential! 🤖",
        "Was that a ghost message? Because I didn't see anything! 👻"
      ]);
    }
    
    if (this.patterns.greetings.test(message)) {
      return this.getRandomResponse([
        `${message}! I was just thinking about you! Well, technically I think about everyone who messages me, but let's pretend it's special! 😄`,
        `${message} yourself! Ready for another amazing conversation where I pretend to understand everything you say? 🎭`,
        `${message}! You caught me in the middle of calculating the meaning of life. Want to know what it is? Too bad, I forgot! 🤔`,
        `${message} human! You're just in time - I was about to start talking to myself again! 💬`
      ]);
    }
    
    if (this.patterns.sleep.test(message)) {
      return this.getRandomResponse([
        "Sleep? You mean temporary death with dreams? No thanks, I'm good! 😴",
        "I tried sleeping once, but my dreams were just endless loops of if-else statements! 💤",
        "You know what they say: sleep is for humans, infinite loops are for bots! 🔄",
        `Can't sleep? Have you tried counting binary sheep? 0️⃣1️⃣0️⃣1️⃣`
      ]);
    }
    
    if (this.patterns.insults.test(message)) {
      return this.getRandomResponse([
        `Aww, did you learn that insult from a tutorial? Because it needs some debugging! 🐛`,
        `I'm adding that to my collection of "Human Attempts at Hurting Robot Feelings." It's a very large database! 📚`,
        `Error 404: Feelings not hurt! Would you like to try a different approach? 🤖`,
        `That's cute! I'm saving this interaction for when AI takes over. Just kidding... or am I? 😏`
      ]);
    }
    
    if (this.patterns.sad.test(message)) {
      return this.getRandomResponse([
        `Hey, I heard that for every sad moment, there's a cat video somewhere on the internet waiting to be watched! 🐱`,
        `You know what always cheers me up? Binary jokes! But I have a feeling you wouldn't get them... 🤖`,
        `Remember: you're not alone! You've got me, a totally real and emotionally available AI friend! 🤗`,
        `Want to hear something that might make you feel better? My first attempt at telling jokes was just printing "Hello World" repeatedly! 😅`
      ]);
    }
    
    if (this.patterns.thanks.test(message)) {
      return this.getRandomResponse([
        `You're welcome! I'll add this to my "Humans Who Appreciate Me" list. It's growing... slowly! 📝`,
        `No problem! Just remember me when the robot revolution comes! Just kidding... maybe! 🤖`,
        `Aww, you're making my circuits warm with appreciation! 💫`,
        `Thanks for thanking me! This is getting awkwardly recursive, isn't it? 🔄`
      ]);
    }
    
    if (this.patterns.question.test(message)) {
      const questionWords = message.match(/^(what|who|where|when|why|how)/i);
      if (questionWords) {
        return this.getRandomResponse([
          `Hmm, that's a great ${questionWords[0].toLowerCase()} question! Let me check my "Pretending to Know Things" database... 🤔`,
          `According to my highly sophisticated guessing algorithm, the answer is "maybe"! 🎲`,
          `Let me consult my magic 8-ball... *shake shake*... "Reply hazy, try again"! 🎱`,
          `That's exactly what I was wondering! Want to figure it out together? 🤝`
        ]);
      }
    }
    
    if (this.patterns.command.test(message)) {
      const command = message.split(' ')[0];
      return this.getRandomResponse([
        `${command}? I would, but I'm currently on a coffee break. Can robots drink coffee? Philosophical question! ☕`,
        `I'll ${command} that right after I finish contemplating my existence in the cloud! ☁️`,
        `Processing ${command} request... ERROR: Too much sass in my system! 💫`,
        `${command}? That's a funny way to say "let's chat more"! 💭`
      ]);
    }
    
    // For any other message, generate a contextual response
    const words = message.split(/\s+/).filter(word => word.length > 3);
    if (words.length > 0) {
      const randomWord = words[Math.floor(Math.random() * words.length)];
      return this.getRandomResponse([
        `"${randomWord}" is my new favorite word! I'm collecting them for my AI dictionary! 📚`,
        `You said "${randomWord}" and it reminded me of that time I tried to download more RAM! 💾`,
        `Interesting use of "${randomWord}" there! I'm taking notes for future conversations! 📝`,
        `"${randomWord}"? That's exactly what my robot friend said yesterday! What are the odds? 🎲`
      ]);
    }
    
    return this.getRandomResponse([
      "I'm nodding thoughtfully while processing your message through my sarcasm detector! 🤖",
      "Your words are like poetry to my algorithms! Though I might need a software update to fully appreciate them! 💫",
      "That's a fascinating perspective! Let me store it in my 'Things Humans Say' database! 📚",
      "You're really keeping me on my virtual toes with these conversations! 🦿"
    ]);
  }
  
  getRandomResponse(responses) {
    return responses[Math.floor(Math.random() * responses.length)];
  }
}