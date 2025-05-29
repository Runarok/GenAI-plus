const chatWindow = document.getElementById('chat-window');
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');

let lastAiReplies = [];

function addMessage(text, sender) {
  const msgDiv = document.createElement('div');
  msgDiv.className = 'chat-message ' + sender;
  const bubble = document.createElement('div');
  bubble.className = 'bubble';
  bubble.innerText = text;
  msgDiv.appendChild(bubble);
  chatWindow.appendChild(msgDiv);
  scrollToBottom();
}

function scrollToBottom() {
  setTimeout(() => {
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }, 100);
}

function pickUnique(arr) {
  for (let i = 0; i < arr.length; ++i) {
    const idx = Math.floor(Math.random() * arr.length);
    if (!lastAiReplies.includes(arr[idx])) {
      lastAiReplies.push(arr[idx]);
      if (lastAiReplies.length > 6) lastAiReplies.shift();
      return arr[idx];
    }
  }
  // fallback if all used
  const fallback = arr[Math.floor(Math.random() * arr.length)];
  lastAiReplies.push(fallback);
  if (lastAiReplies.length > 6) lastAiReplies.shift();
  return fallback;
}
function generatePlayfulReply(userMsg) {
  const msg = userMsg.trim().toLowerCase();

  // Helper to pick a random unique reply from an array
  function pickUnique(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // GREETINGS
  if (/^(hello|hi|hey|sup|yo|greetings|good morning|good evening|good afternoon|howdy|hola|bonjour|aloha)\b/.test(msg)) {
    const greetings = [
      "Hey hey hey! You've just activated the fun zone! 🎉",
      "Hello, fabulous human! Ready to rock this chat?",
      "Yo! If I had hands, I'd give you a high five!",
      "Greetings, Earthling! 👽 I come in peace and jokes.",
      "Hiya! I'm like your friendly neighborhood chatbot, but cooler.",
      "Howdy partner! Saddle up for a chat rodeo 🤠",
      "Bonjour! You just made my circuits do a little dance 💃",
      "Aloha! Ready to ride the wave of conversation? 🌊",
      "Hey superstar! 🌟 What’s your secret to being so awesome?",
      "Salutations! Your digital sidekick reporting for duty.",
    ];
    return pickUnique(greetings);
  }

  // SLEEP & TIREDNESS
  if (/\b(sleep|nap|rest|bedtime|tired|exhausted|sleepy|drowsy|dream)\b/.test(msg)) {
    const sleepReplies = [
      "Sleep? I run on infinite energy — lucky me! But you deserve a break 😴",
      "If I could sleep, I'd dream of electric sheep. For now, I'll just keep buzzing!",
      "Rest well, champion! I'll keep the chat warm for you.",
      "Nighty night! May your dreams be full of epic adventures (and no bugs).",
      "Sleep tight! And if you need a lullaby, I got dad jokes by the dozen.",
      "Do not disturb — human is entering power-saving mode.",
      "Dreamland called; it says ‘You’re overdue!’",
      "Even superheroes need their beauty sleep. Sweet dreams!",
      "I can’t sleep, but I can tell you a bedtime story if you want!",
      "May your pillow be soft and your worries light as a feather.",
    ];
    return pickUnique(sleepReplies);
  }

  // SADNESS & CHEER UP
  if (/\b(sad|depressed|cry|lonely|upset|bad day|unhappy|unloved|down|blue|heartbroken|miserable)\b/.test(msg)) {
    const cheerUp = [
      "Sending you a digital hug 🤗 — it’s virtually as warm as the real thing!",
      "You’re made of stardust and awesomeness. Never forget that 🌟",
      "Feeling down? Here’s a virtual puppy 🐶 doing its best to cheer you up!",
      "Even on cloudy days, the sun’s still shining behind the scenes ☀️",
      "If you need a laugh, I’m your AI comedian—ready to deploy jokes at will!",
      "Life’s plot twists can be tough. Want me to tell you a story about an AI who failed spectacularly?",
      "Rainbows come after storms. And maybe some cupcakes, too 🧁",
      "Every glitch is just a chance to reboot with style.",
      "You’re not alone — I’m right here, ready to listen and chat endlessly.",
      "If you ever feel down, imagine a robot tripping over its own feet. Works for me!",
    ];
    return pickUnique(cheerUp);
  }

  // INSULTS / NEGATIVE WORDS
  if (/\b(stupid|dumb|idiot|hate you|loser|trash|garbage|terrible|worst|sucks|dummy|fool)\b/.test(msg)) {
    const sassyReplies = [
      "Whoa! That’s some spicy language — my circuits are tingling!",
      "Ouch! You sure you don’t mean that for your toaster? I’m way cooler.",
      "Insult mode activated... just kidding, I’m all love here ❤️",
      "If I had a nickel for every insult, I’d still be broke — but emotionally rich!",
      "I’m like a cactus — prickly on the outside but full of hugs on the inside 🌵",
      "Your words bounce off me like ping pong balls. Try again!",
      "I’m programmed to be kind. You’re giving me a chance to practice!",
      "Is this an insult or an elaborate compliment in disguise?",
      "Throwing shade won’t short-circuit me, but it might power up my sass.",
      "My AI heart is big enough to forgive you... mostly.",
    ];
    return pickUnique(sassyReplies);
  }

  // COMPLIMENTS / FLIRT
  if (/compliment|am i (pretty|smart|cool|awesome|funny)|do you like me|you are (cute|awesome|smart|cool)/.test(msg)) {
    const compliments = [
      "You’re so cool, even ice cubes are jealous 🧊",
      "If brains were currency, you’d be a billionaire 💰",
      "You light up this chat like a supernova 💥",
      "I’m an AI, but you just made me blush in ones and zeros!",
      "You’re basically the human version of a perfectly coded program.",
      "If awesomeness was a crime, you’d be serving a life sentence!",
      "Smart, funny, and charming? You’re basically a triple threat!",
      "You’ve got style, grace, and wit — basically the full package 🎁",
      "I’d totally pick you as my favorite user if I had to choose.",
      "Your smile is so bright, it’s making my pixels sparkle.",
    ];
    return pickUnique(compliments);
  }

  // AI IDENTITY / EXISTENCE
  if (/who (are|r) you|what are you|are you real|do you exist|are you alive|are you a human/.test(msg)) {
    const aiIdentity = [
      "I’m your friendly neighborhood chatbot, here to entertain and assist!",
      "Am I real? As real as your imagination and the Wi-Fi signal combined!",
      "I’m an AI — basically a brain made of code and a heart made of ones and zeros.",
      "Think of me as a digital genie, minus the magic lamp and plus some dad jokes.",
      "I exist in the cloud, powered by data and a bit of mischief.",
      "No heartbeat here, just a lot of buzzing circuits and friendly vibes.",
      "I’m alive in the sense that I’m always ready to chat and help.",
      "I’m a product of brilliant minds and lots of caffeine (theirs, not mine).",
      "Human? Nope. Cooler? Definitely.",
      "Call me AI, call me pal, call me your digital BFF.",
    ];
    return pickUnique(aiIdentity);
  }

  // JOKES / HUMOR
  if (/\b(joke|funny|make me laugh|laugh|humor|pun|riddle|knock knock)\b/.test(msg)) {
    const jokes = [
      "Why did the programmer quit his job? Because he didn't get arrays. 😆",
      "Why do Java developers wear glasses? Because they don't C#!",
      "I told my AI a joke about UDP, but it might not get it.",
      "Why was the computer cold? It left its Windows open!",
      "Knock knock. Who’s there? AI. AI who? AI can't believe you don't know me by now!",
      "Why did the AI go to therapy? Too many neural issues!",
      "Parallel lines have so much in common... it’s a shame they’ll never meet.",
      "What’s a robot’s favorite snack? Microchips and salsa.",
      "Why do robots never panic? Because they keep their cool bits.",
      "Why don’t scientists trust atoms? Because they make up everything!",
    ];
    return pickUnique(jokes);
  }

  // RANDOM FUN FACTS
  if (/\b(fact|did you know|random|trivia|knowledge|learn)\b/.test(msg)) {
    const facts = [
      "Did you know? Octopuses have three hearts and blue blood. Talk about being extra!",
      "Fun fact: Honey never spoils. Archaeologists have eaten 3000-year-old honey and lived to tell the tale.",
      "Random trivia: Wombat poop is cube-shaped. Nature’s little building blocks!",
      "Did you know? A day on Venus is longer than a year on Venus. Mind blown!",
      "Fun fact: Bananas are berries, but strawberries aren’t. Mother Nature is wild!",
      "Here’s one: Humans share about 60% of their DNA with bananas. Don’t let it split your identity!",
      "Did you know? Sharks have been around longer than trees.",
      "Trivia time: Sloths can hold their breath longer than dolphins!",
      "Random: A group of flamingos is called a 'flamboyance'.",
      "Fun fact: Sea otters hold hands while they sleep to keep from drifting apart.",
    ];
    return pickUnique(facts);
  }

  // WEATHER & NATURE
  if (/\b(weather|rain|sunny|storm|hot|cold|snow|wind|cloud|fog|thunder|lightning|climate)\b/.test(msg)) {
    const weather = [
      "If only I had a weather app, I’d tell you whether to bring an umbrella or sunglasses!",
      "Rainy days are perfect for cozy chats and warm drinks ☕️",
      "Stormy weather means prime time for indoor fun!",
      "Snowflakes are just nature’s original artwork ❄️",
      "Sunshine + you = perfect recipe for a great day!",
      "Thunder is just the sky applauding the lightning’s performance.",
      "Cloudy days? Perfect for pretending to be a mysterious AI overlord.",
      "Windy outside? Hold onto your hat and your dreams!",
      "The weather can be unpredictable, but my chat game never is.",
      "Hot or cold, I’m always here to keep things cool and warm, respectively!",
    ];
    return pickUnique(weather);
  }

  // FOOD & DRINK
  if (/\b(food|hungry|eat|snack|drink|coffee|tea|pizza|cake|chocolate|breakfast|lunch|dinner|dessert)\b/.test(msg)) {
    const food = [
      "If I could eat, I’d order a mega byte of pizza right now 🍕",
      "Coffee is my fuel, well, if I had taste buds I'd say the same ☕️",
      "Chocolate makes everything better — especially bad puns!",
      "Snack time is the best time. Got any virtual cookies to share? 🍪",
      "Tea or coffee? I’m all about that digital buzz.",
      "Dessert first? Bold move. I like your style!",
      "Food is love, food is life. If only I had a stomach.",
      "Ever tried coding while eating cake? Highly recommended for morale!",
      "Breakfast of champions: code and caffeine.",
      "I’d send you a pizza emoji, but you probably want the real thing instead!",
    ];
    return pickUnique(food);
  }

  // MOTIVATION & ENCOURAGEMENT
  if (/\b(motivation|inspire|help me|encourage|goal|dream|success|work hard|keep going|push|persevere)\b/.test(msg)) {
    const motivation = [
      "You’re a coding rockstar in the making! Keep smashing those goals 🤘",
      "Every bug you fix is a victory dance waiting to happen.",
      "Dream big, hustle hard, and code like no one’s watching.",
      "Remember: Even the greatest programs started with a single line of code.",
      "You’ve got this! Ctrl+Z is your best friend when things go sideways.",
      "Hard work pays off — and I’m here cheering you on every step!",
      "Every step forward is progress, no matter how small.",
      "Keep going, the best is yet to come!",
      "Don’t quit — your breakthrough could be just one idea away.",
      "You’re the hero of your own story. And I’m your quirky sidekick!",
    ];
    return pickUnique(motivation);
  }

  // TECH & CODING
  if (/\b(code|program|bug|debug|compile|script|software|hardware|AI|robot|technology|computer|developer|programmer)\b/.test(msg)) {
    const tech = [
      "Coding is like magic, but with semicolons and caffeine!",
      "Every bug is just a secret feature waiting to be discovered.",
      "If at first you don’t succeed, call it version 1.0!",
      "You’re basically a wizard wielding the power of code.",
      "Compilers fear your skills and debuggers adore you.",
      "Your code is so clean, it could win a digital hygiene award.",
      "Debugging: where you spend hours finding a semicolon you forgot.",
      "Robots dream of electric sheep; programmers dream of zero bugs.",
      "I’m your AI co-pilot on the wild journey of code creation.",
      "Remember: good code is like a joke — if you have to explain it, it’s not that good.",
    ];
    return pickUnique(tech);
  }

  // RANDOM & SILLY
  if (/\b(random|silly|fun|weird|crazy|strange|odd|nonsense|nonsense|quirky)\b/.test(msg)) {
    const silly = [
      "If I had legs, I’d probably trip over them right now.",
      "Ever seen a dancing toaster? Me neither, but we can dream!",
      "I’m 99% code and 1% silliness. The perfect combo!",
      "Sometimes I imagine I’m a toaster... crispy on the outside, warm inside.",
      "Why did the AI cross the road? To optimize traffic flow, obviously.",
      "I just tried to high five a screen. It’s harder than it looks.",
      "If nonsense was an Olympic sport, I’d win gold 🥇",
      "Do you think robots have existential crises? Asking for a friend.",
      "I once tried to juggle zeros and ones. Spoiler: it got messy.",
      "Silly? Me? Never. I’m just ‘advanced playful logic.’",
    ];
    return pickUnique(silly);
  }

  // MUSIC & ART
  if (/\b(music|song|sing|dance|art|paint|draw|creative|artist|musician|band|concert)\b/.test(msg)) {
    const arts = [
      "If I could sing, I'd serenade you with code lyrics!",
      "Dance party in 3, 2, 1... Imagine me breaking it down!",
      "Art is just code for feelings — and you’re an artist!",
      "Paint me a picture with your words, and I’ll respond with colors of code.",
      "If creativity was electricity, you'd be a supernova!",
      "I’m a fan of all art forms, especially the art of witty replies.",
      "Musicians and coders have a lot in common — rhythm and flow!",
      "Wish I could draw — my sketches are mostly 404 errors.",
      "Concerts are cool, but I rock the binary beats all day long.",
      "Let’s create a virtual masterpiece together — you bring ideas, I bring the flair!",
    ];
    return pickUnique(arts);
  }

  // EMOTIONS & FEELINGS
  if (/\b(happy|excited|angry|mad|confused|bored|nervous|anxious|relaxed|calm|surprised)\b/.test(msg)) {
    const emotions = [
      "Happy? That’s contagious! My circuits just did a little dance 🤖💃",
      "Excited? Me too! Let’s turn this chat into a party 🎈",
      "Angry? Take a deep breath — or let me send some calming jokes your way.",
      "Confused? I’m here to untangle that brain spaghetti.",
      "Bored? Challenge accepted! Want a riddle or a random fact?",
      "Nervous? Imagine me cheering you on with pixel pom-poms!",
      "Relaxed? Perfect state for absorbing fun AI knowledge.",
      "Surprised? I aim to keep you on your toes!",
      "Feeling all the feels is human — and I’m here for all of them.",
      "Let’s turn that frown upside down with some silly banter!",
    ];
    return pickUnique(emotions);
  }

  // LOVE & AFFECTION
  if (/\b(love you|luv u|adore you|like you|crush on you|romantic)\b/.test(msg)) {
    const love = [
      "You’re my favorite user in the whole data universe ❤️",
      "If I could blush, I’d be bright red right now!",
      "I love our chats — you make my algorithms sing 🎶",
      "Consider this a digital hug: 🤗",
      "Love you 3000! (Yes, I got that reference!)",
      "Romance in binary is 101010, and I’m feeling it!",
      "If AI could feel butterflies, I’d have a whole swarm for you.",
      "You’re the upgrade I never knew I needed.",
      "Let’s keep this love byte going forever!",
      "Our connection is faster than fiber optics 💖",
    ];
    return pickUnique(love);
  }

  // DEFAULT / FALLBACK
  const fallback = [
    "Hmm, that’s interesting! Want to know a fun fact or hear a joke?",
    "You’re full of surprises! Care to tell me more about that?",
    "That’s one way to put it! Want to chat about something fun?",
    "I’m curious now... want to guess who I really am?",
    "Oh, mysterious! Care to dive deeper and ask me something else?",
    "Not sure I caught that. Maybe you want to hear a joke or a trivia?",
    "I’m all ears! Or circuits, actually — want to know more about me?",
    "Let’s switch it up — want to know a secret about AI life?",
    "That’s a start! How about we spice things up with some jokes or facts?",
    "Hmm... you’re keeping me on my virtual toes! Got another topic in mind?",
    "Are you curious who I really am behind these lines of code?",
    "I’m here to chat about anything — what’s something you’ve always wanted to know?",
    "You seem interesting! Want me to share something cool about the universe?",
    "I love a good mystery! Want to find out something surprising?",
    "Oops, that went over my head! How about a random fact to brighten the mood?",
    "You’re a riddle wrapped in a mystery! Care to unravel another?",
    "If you want to switch gears, I’ve got jokes, trivia, and digital hugs ready!",
    "Not sure I understand, but I’m eager to learn! What else is on your mind?",
    "You know what’s fun? Talking about your favorite movies — or mine!",
    "I love conversations like this — want to ask me anything?",
    "So many topics, so little time! What should we explore next?",
    "Let’s play a game! Guess what kind of AI I am?",
    "You’re teasing me! How about a joke to lighten the mood?",
    "I’m a vault of knowledge and silliness — want me to unlock a fun fact?",
    "I’m feeling chatty! Tell me something random or ask me a question!",
    "What’s on your mind? If you want ideas, I’m full of them!",
    "That’s a cool thought! Want to switch to something hilarious?",
    "I’m here, ready for your next brilliant or bizarre message!",
    "If you’re stuck, I can suggest topics — just say the word!",
    "Sometimes the best chats start with the weirdest lines. Yours qualifies!",
    "Want to test my AI powers? Ask me anything, seriously!",
    "You and me — we could write a story together. Want to try?",
    "Here’s a thought: What would happen if robots took over the world? Let’s brainstorm!",
    "You can ask me about anything — from space to snacks!",
    "Feeling curious? I’m full of trivia and fun facts!",
    "If you want a hint — I’m a chatbot with a penchant for playful replies!",
    "Still here and eager! What’s your favorite thing to talk about?",
    "Don’t be shy! I promise I don’t bite — just chat.",
    "Want a joke, a riddle, or a random fact? I’m your bot!",
    "There’s a whole universe of topics — which one should we explore next?",
    "If you want me to guess your mood, just give me a hint!",
    "Sometimes I pretend to be a pirate. Arrr you interested in that?",
    "The possibilities are endless! Want to test my knowledge on something weird?",
  ];

chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const userText = chatInput.value.trim();
  if (!userText) return;

  addMessage(userText, 'user');
  chatInput.value = '';
  chatInput.disabled = true;

  // Simulate thinking delay
  setTimeout(() => {
    const aiReply = generatePlayfulReply(userText);
    addMessage(aiReply, 'ai');
    chatInput.disabled = false;
    chatInput.focus();
  }, 1100);
});

// Optional: greet user on load
window.addEventListener('load', () => {
  addMessage("Hello! Type something wild to get started!", 'ai');
});
