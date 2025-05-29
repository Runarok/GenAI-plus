// --- Gemini API Key Modal Logic ---
function showGeminiModal() {
  document.getElementById('gemini-modal-bg').style.display = 'flex';
  document.getElementById('gemini-key-input').focus();
}
function hideGeminiModal() {
  document.getElementById('gemini-modal-bg').style.display = 'none';
}
function getGeminiKey() {
  return localStorage.getItem('gemini_api_key') || '';
}
function setGeminiKey(key) {
  localStorage.setItem('gemini_api_key', key);
}

// Modal submit logic
document.getElementById('gemini-save-btn').onclick = function (e) {
  e.preventDefault();
  const key = document.getElementById('gemini-key-input').value.trim();
  const msg = document.getElementById('modal-err');
  msg.textContent = '';
  if (!/^AIza[0-9A-Za-z\-_]{30,}$/.test(key)) {
    msg.textContent = "Please enter a valid Gemini API key (starts with 'AIza...')";
    return;
  }
  setGeminiKey(key);
  hideGeminiModal();
  if (window.onGeminiKeyReady) window.onGeminiKeyReady();
};
document.getElementById('gemini-key-input').addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    document.getElementById('gemini-save-btn').click();
  }
});

// --- Chat App Logic ---
let GEMINI_API_KEY = '';
function updateGeminiKeyFromStorage() {
  GEMINI_API_KEY = getGeminiKey();
}
const chatWindow = document.getElementById('chat-window');
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');

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

// Only Gemini LLM for all replies
async function fetchGeminiReply(userMsg) {
  updateGeminiKeyFromStorage();
  if (!GEMINI_API_KEY) {
    showGeminiModal();
    return "Oops, Gemini API key required! Please enter it above.";
  }
  const GEMINI_API_URL =
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' +
    encodeURIComponent(GEMINI_API_KEY);

  // Instead of system role, prepend the prompt to the user's message
  const systemPrompt =
    "You are a playful, witty, optimistic, and sarcastic AI assistant. Always reply with something upbeat, funny, or lighthearted. You may roast, gaslight, or twist the user's message in a humorous and friendly way. Never be mean-spirited. Make every reply wild, unique, and non-repetitive. If possible, include a joke, a playful twist, or an overly enthusiastic response. Be creative and surprising! Respond in a chatty, conversational, bubble-friendly style. Do not explain your reasoning, just reply as if you are a wild, positive, unpredictable chat AI. Never say you are an AI unless asked directly. Do not break character.";

  const body = {
    contents: [{ parts: [{ text: systemPrompt + '\n\n' + userMsg }] }],
    generationConfig: {
      temperature: 1.22,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 120,
      stopSequences: [],
    },
    safetySettings: [
      { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_CIVIC_INTEGRITY', threshold: 'BLOCK_NONE' },
    ],
  };

  try {
    const response = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      let errMsg = 'API error';
      try {
        const errData = await response.json();
        if (errData.error && errData.error.message) {
          errMsg = errData.error.message;
        }
      } catch {}
      throw new Error(errMsg);
    }

    const data = await response.json();

    if (data.error && data.error.message) {
      throw new Error(data.error.message);
    }

    let aiText = '';
    if (data.candidates && data.candidates[0]?.content?.parts) {
      aiText = data.candidates[0].content.parts.map((p) => p.text).join('');
    } else if (data.candidates && data.candidates[0]?.content?.text) {
      aiText = data.candidates[0].content.text;
    } else if (
      Array.isArray(data.candidates) &&
      data.candidates.length > 0 &&
      typeof data.candidates[0].content === 'string'
    ) {
      aiText = data.candidates[0].content;
    } else {
      aiText = '';
    }
    if (!aiText || aiText.length < 2) {
      aiText =
        "I'm feeling especially quirky right now, but it looks like my circuits are tangled! Try again?";
    }
    return aiText.trim();
  } catch (e) {
    if (
      e &&
      typeof e.message === 'string' &&
      (e.message.toLowerCase().includes('api key') ||
        e.message.toLowerCase().includes('permission') ||
        e.message.toLowerCase().includes('unauthorized') ||
        e.message.toLowerCase().includes('forbidden'))
    ) {
      showGeminiModal();
      return 'Looks like your Gemini API key is invalid or missing permission. Please update it above.';
    }
    return 'API error: ' + (e?.message || e);
  }
}
async function handleUserMessage(userMsg) {
  addMessage(userMsg, 'user');
  addMessage('...', 'ai');
  let aiReply = await fetchGeminiReply(userMsg);
  const aiBubbles = [...chatWindow.querySelectorAll('.chat-message.ai .bubble')];
  if (aiBubbles.length) {
    aiBubbles[aiBubbles.length - 1].innerText = aiReply;
  }
  scrollToBottom();
}

chatForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const userMsg = chatInput.value.trim();
  if (!userMsg) return;
  chatInput.value = '';
  await handleUserMessage(userMsg);
});
chatInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    chatForm.dispatchEvent(new Event('submit'));
  }
});

// On load, check for Gemini key, otherwise prompt
window.onload = () => {
  updateGeminiKeyFromStorage();
  chatInput.focus();
  setTimeout(() => {
    addMessage(
      "Hey there! I'm your playful AI powered by Gemini. Type something wild to start the fun!",
      'ai'
    );
  }, 600);
  if (!GEMINI_API_KEY) {
    showGeminiModal();
  }
  // Optional: callback after user sets key
  window.onGeminiKeyReady = () => {
    addMessage("Gemini key saved! Let's chat!", 'ai');
  };
};
