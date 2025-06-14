// Quotes management
const quotes = [
    {
        id: 1,
        quote: "Nostalgia whispers sweet lies, but the present calls for your full presence. Don’t trade today’s light for yesterday’s shadows—let memories guide you, not bind you.",
        author: "Runarok Hrafn",
        source: "Youtube",
        url: "https://www.youtube.com/shorts/I3ZKegVC9R4"
    },
    {
        id: 2,
        quote: "Indifference and neglect often do much more damage than outright dislike.",
        author: "J.K. Rowling",
        source: "goodreads",
        url: "https://www.goodreads.com/author/show/1077326.J_K_Rowling"
    },
    {
        id: 3,
        quote: "Peace is not the absence of chaos — it’s learning what deserves your reaction.",
        author: "Runarok Hrafn",
        source: "Own",
        url: "https://github.com/Runarok"
    },
    {
        id: 4,
        quote: "Be the change that you wish to see in the world.",
        author: "Mahatma Gandhi",
        source: "goodreads",
        url: "https://www.goodreads.com/author/show/5810891.Mahatma_Gandhi"
    },
    {
        id: 5,
        quote: "Growth is when you stop needing to win every argument and start choosing peace over ego.",
        author: "Runarok Hrafn",
        source: "Own",
        url: "https://github.com/Runarok"
    },
    {
        id: 6,
        quote: "Effort speaks louder than words — especially when no one asked for it.",
        author: "Runarok Hrafn",
        source: "Own",
        url: "https://github.com/Runarok"
    },
    {
        id: 7,
        quote: "If you tell the truth, you don't have to remember anything.",
        author: "Mark Twain",
        source: "goodreads",
        url: "https://www.goodreads.com/author/show/1244.Mark_Twain"
    },
    {
        id: 8,
        quote: "Even if the pace is slow, win in a way that reflects growth — not reaction. Because true evolution isn't loud, it's mindful.",
        author: "Runarok Hrafn",
        source: "Own",
        url: "https://github.com/Runarok"
    },
    {
        id: 9,
        quote: "The most painful thing is losing yourself in the process of loving someone too much, and forgetting that you are special too",
        author: "Ernest Hemingway",
        source: "Goodreads",
        url: "https://www.goodreads.com/author/show/1455.Ernest_Hemingway"
    },
    {
        id: 10,
        quote: "Morality is simply the attitude we adopt towards people we personally dislike",
        author: "Oscar Wilde",
        source: "Goodreads",
        url: "https://www.goodreads.com/author/show/3565.Oscar_Wilde"
    },
    {
        id: 11,
        quote: "Sometimes we break the things that keep us safe, just because we don’t understand why they’re there.",
        author: "Runarok Hrafn",
        source: "Instagram",
        url: "https://www.instagram.com/reel/DKrvdJnTLbI/"
    },
    {
        id: 12,
        quote: "Even a fire learns to stop burning when it realizes the warmth is wasted on cold hands.",
        author: "Runarok Hrafn",
        source: "Instagram",
        url: "https://www.instagram.com/reel/DKpSVc-TACA"
    },
    {
        id: 13,
        quote: "Focus on the good, and you'll attract more of it.",
        author: "Runarok Hrafn",
        source: "Instagram",
        url: "https://www.instagram.com/reel/DKuXDMFIBup/?igsh=MTNrbTluZjVicHk2Zg=="
    },
    {
        id: 14,
        quote: "Nothing can be gained without losing. Even the heaven demands death.",
        author: "Unknown",
        source: "Youtube",
        url: "https://youtube.com/shorts/R-6xXITIwfE?si=scdbEznsdoFUOycS"
    },
    {
        id: 15,
        quote: "Who am I to judge another, when I myself walk as an imperfect man.",
        author: "Unknown",
        source: "Instagram",
        url: "https://www.instagram.com/p/DBr2nQqR5ms/?igsh=MWE0eDE3YzI2N3hibQ=="
    },
    {
        id: 16,
        quote: "He who worries before it is necessary worries more than necessary.",
        author: "Unknown",
        source: "Instagram",
        url: "https://www.instagram.com/p/DBr2nQqR5ms/?igsh=MWE0eDE3YzI2N3hibQ=="
    },
    {
        id: 17,
        quote: "If the situation isn't in your hands it shouldn't be in your head.",
        author: "Unknown",
        source: "Instagram",
        url: "https://www.instagram.com/p/DBr2nQqR5ms/?igsh=MWE0eDE3YzI2N3hibQ=="
    },
    {
        id: 18,
        quote: "A candle loses nothing by lighting another candle.",
        author: "Unknown",
        source: "Instagram",
        url: "https://www.instagram.com/p/DBr2nQqR5ms/?igsh=MWE0eDE3YzI2N3hibQ=="
    },
    {
        id: 19,
        quote: "Patience isn't the ability to wait but is the ability to keep a positive attitude while waiting.",
        author: "Unknown",
        source: "Instagram",
        url: "https://www.instagram.com/p/DBr2nQqR5ms/?igsh=MWE0eDE3YzI2N3hibQ=="
    },
    {
        id: 20,
        quote: "You can't control the wind, but you can adjust your sails.",
        author: "Unknown",
        source: "Instagram",
        url: "https://www.instagram.com/p/DBr2nQqR5ms/?igsh=MWE0eDE3YzI2N3hibQ=="
    },
    {
        id: 21,
        quote: "A river cuts through rock not because of its power, but because of its persistence.",
        author: "Unknown",
        source: "Instagram",
        url: "https://www.instagram.com/p/DBr2nQqR5ms/?igsh=MWE0eDE3YzI2N3hibQ=="
    },
    {
        id: 22,
        quote: "The best revenge is not to be like your enemy.",
        author: "Marcus Aurelius",
        source: "Instagram",
        url: "https://www.instagram.com/p/DBr2nQqR5ms/?igsh=MWE0eDE3YzI2N3hibQ=="
    },
    {
        id: 23,
        quote: "Happiness isn't about getting what you want, but enjoying what you have.",
        author: "Unknown",
        source: "Instagram",
        url: "https://www.instagram.com/p/DBr2nQqR5ms/?igsh=MWE0eDE3YzI2N3hibQ=="
    },
    {
        id: 24,
        quote: "Worrying doesn't take away tomorrow's trouble. It takes away today's peace.",
        author: "Unknown",
        source: "Instagram",
        url: "https://www.instagram.com/p/DBr2nQqR5ms/?igsh=MWE0eDE3YzI2N3hibQ=="
    }
];
