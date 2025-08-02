const prototypes = [
  {
    title: "💖 Lovable v0",
    description: "Early lovable version prototype.",
    url: "Lovable/v0/index.html",
    status: "In use elsewhere"
  },
  {
    title: "💖 Lovable v1",
    description: "Improved lovable version prototype.",
    url: "Lovable/v1/index.html",
    status: "In use elsewhere"
  },
  {
    title: "🧪 v0",
    description: "Basic prototype version 0.",
    url: "v0/v0/index.html",
    status: "In use elsewhere"
  },
  {
    title: "🧪 v1",
    description: "Updated prototype version 1.",
    url: "v0/v1/index.html",
    status: "In use elsewhere"
  },
  {
    title: "📺 Showcaser",
    description: "Visual showcase for prototype outputs.",
    url: "excess/showcase/showcase.html",
    status: "Implemented, not externally used"
  },
  {
    title: "📝 Editor",
    description: "Editor with live editing and preview capabilities.",
    url: "excess/Editor/Editor.html",
    status: "Implemented, not externally used"
  }
];

const hub = document.getElementById('hub');

prototypes.forEach(({ title, description, url, status }) => {
  const card = document.createElement('div');
  card.className = 'card';

  card.innerHTML = `
    <h2>${title}</h2>
    <p>${description}</p>
    <div class="status">${status}</div>
    <div class="click-note">Click to open</div>
  `;

  card.addEventListener('click', () => {
    window.location.href = url;
  });

  hub.appendChild(card);
});
