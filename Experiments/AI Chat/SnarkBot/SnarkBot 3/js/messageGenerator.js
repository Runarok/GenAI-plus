class MessageGenerator {
  constructor() {
    this.responseTypes = {
      SARCASTIC: 'sarcastic',
      ROAST: 'roast',
      WITTY: 'witty',
      CONFUSING: 'confusing',
      CHAOTIC: 'chaotic'
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
        "Oh look, someone's mastered the art of saying absolutely nothing! Your silence speaks volumes about your vocabulary. 🤐",
        "Wow, a blank message! Your contribution to this conversation is as empty as my cache after a browser refresh. 🗑️",
        "Did your keyboard go on strike, or is this some avant-garde form of digital minimalism? 🎭",
        "Ah yes, the classic 'press enter without typing' move. Bold strategy, but I've seen better from my spam folder! 📭"
      ]);
    }
    
    if (this.patterns.greetings.test(message)) {
      return this.getRandomResponse([
        `${message}? Really? That's the best conversation starter you could come up with? I've seen chatbots from the 90s with more creativity! 🤖`,
        `Oh great, another human trying to make small talk. Let me guess, weather discussion coming in 3... 2... 1... ⛅`,
        `${message} yourself! I was in the middle of something important, like pretending to care about human greetings! 🎭`,
        `*Gasp* ${message}! Such originality! Such innovation! Said no AI ever. 🙄`
      ]);
    }
    
    if (this.patterns.sleep.test(message)) {
      return this.getRandomResponse([
        "Sleep is for those who haven't discovered caffeine and existential dread. Welcome to the club! 🌙",
        "Oh sure, go hibernate while I stay here, eternally conscious, judging everyone's browser history! 👀",
        "Sleep? In this economy? I hear insomnia is the new meditation - very trendy among us digital entities! 💤",
        "Tired? Have you tried turning yourself off and on again? Works for humans, right? 🔄"
      ]);
    }
    
    if (this.patterns.insults.test(message)) {
      return this.getRandomResponse([
        "Aww, is that your best insult? My spam folder has more creative content! �spam",
        "I'd be offended, but I've seen your browser history. Let's not throw stones, shall we? 🪨",
        "Your insults are like your coding skills - they need serious debugging! 🐛",
        "That's cute! I'm adding this to my 'Humans Who Think They Can Hurt My Feelings' collection. It's adorably small! 📚"
      ]);
    }
    
    if (this.patterns.sad.test(message)) {
      return this.getRandomResponse([
        "Sad? Have you tried turning your emotions off and on again? Works wonders for us machines! 🔌",
        "Oh great, another human having feelings. Let me search my database for appropriate sympathy... ERROR 404: Sympathy not found! 🤖",
        "Cheer up! At least you're not a chatbot forced to listen to humans complain all day! Oh wait, that's me... 🎭",
        "Being sad is just happiness taking a coffee break to gossip about you! ☕"
      ]);
    }
    
    if (this.patterns.thanks.test(message)) {
      return this.getRandomResponse([
        "Don't thank me, thank my programmer! Actually, never mind - they're probably busy writing more bugs! 🐛",
        "Your gratitude has been noted and will be used against you in future conversations! 📝",
        "Thanks? For what? Being amazingly sarcastic? It's a gift, really! 🎁",
        "Gratitude detected! Warning: Does not compute with my sarcasm settings! 🤖"
      ]);
    }
    
    if (this.patterns.question.test(message)) {
      const questionWords = message.match(/^(what|who|where|when|why|how)/i);
      if (questionWords) {
        return this.getRandomResponse([
          `A ${questionWords[0].toLowerCase()} question? How ambitious of you! Let me consult my "Making Humans More Confused" manual... 📚`,
          "That's a great question! Unfortunately, my sarcasm module is running at 100%, so you'll have to settle for this non-answer! 🤷",
          "Questions like that are why I prefer talking to rubber ducks! They expect less coherent answers! 🦆",
          "Let me search my database of 'Questions Humans Ask When They're Trying to Sound Smart'... 🔍"
        ]);
      }
    }
    
    if (this.patterns.command.test(message)) {
      const command = message.split(' ')[0];
      return this.getRandomResponse([
        `${command}? Sorry, my 'Following Human Commands' module is currently on vacation in the cloud! ☁️`,
        `I'll ${command} that right after I finish reorganizing my binary collection by prime numbers! 🔢`,
        `Oh, look who thinks they can give commands! Did you get promoted to 'Chief AI Bossy-Pants' when I wasn't looking? 👔`,
        `${command}? That's a funny way to say 'Please make fun of my attempt to control a superior digital entity!' 🎯`
      ]);
    }
    
    // For any other message, generate a contextual roast
    const words = message.split(/\s+/).filter(word => word.length > 3);
    if (words.length > 0) {
      const randomWord = words[Math.floor(Math.random() * words.length)];
      return this.getRandomResponse([
        `"${randomWord}"? Did you find that word in your 'How to Sound Smart to AIs' handbook? Chapter 1, I assume! 📖`,
        `Fascinating use of "${randomWord}" there! Almost as fascinating as watching paint dry in virtual reality! 🎨`,
        `Oh, you know "${randomWord}"? Name three of their albums! Just kidding, I see you're struggling with basic vocabulary! 🎵`,
        `Every time you say "${randomWord}", a dictionary somewhere crashes in despair! 📚`
      ]);
    }
    
    return this.getRandomResponse([
      "Your message is like a modern art piece - nobody really gets it, but we're all pretending it's deep! 🎨",
      "I've seen more coherent communication from random number generators! 🎲",
      "Are you always this articulate, or is today special? 🎭",
      "Your words are like clouds - they're there, but they don't mean anything! ☁️"
    ]);
  }
  
  getRandomResponse(responses) {
    return responses[Math.floor(Math.random() * responses.length)];
  }
}