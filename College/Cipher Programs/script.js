const ciphers = [
  {
    name: "Atbash Cipher",
    description: "A substitution cipher where letters are mapped to their reverse alphabet equivalents.",
    link: "Atbash Cipher/index.html"
  },
  {
    name: "Caesar Cipher",
    description: "Each letter is shifted by a fixed number of positions in the alphabet.",
    link: "Caesar Cipher/index.html"
  },
  {
    name: "Playfair Cipher",
    description: "A digraph substitution cipher using a 5x5 key matrix.",
    link: "Playfair Cipher/index.html"
  },
  {
    name: "Vigenère Cipher",
    description: "Polyalphabetic substitution cipher using a keyword.",
    link: "Vigenere Cipher/index.html"
  }
];

const container = document.getElementById('container');

window.addEventListener('DOMContentLoaded', () => {
  ciphers.forEach(({name, description, link}) => {
    const card = document.createElement('a');
    card.className = 'card';
    card.href = link;
    card.tabIndex = 0;

    card.innerHTML = `
      <h2>${name}</h2>
      <p>${description}</p>
      <span class="try-button" aria-label="Try ${name} cipher">Try</span>
    `;

    container.appendChild(card);
  });
});
