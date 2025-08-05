const cards = [
  {
    icon: "fa-bullseye",
    title: "Master Productive",
    subtitle: "Begin your journey to mastering productivity. Start with the introduction.",
    buttons: [
      {
        label: "Start Intro",
        href: "Intro/index.html",  // ← Matches current structure
        caption: "A friendly introduction to mastering productivity fundamentals."
      }
    ]
  },
  {
    icon: "fa-lightbulb",
    title: "Productive Tips",
    subtitle: "Select how you’d like to explore the content. Each path offers a unique perspective tailored to your needs.",
    buttons: [
      {
        label: "Summarised",
        href: "Summarised/index.html",  // ← Matches current structure
        caption: "Quick overview with key highlights."
      },
      {
        label: "In-Depth",
        href: "In-Depth/index.html",  // ← Matches current structure
        caption: "Comprehensive analysis."
      }
    ]
  }
];


const container = document.getElementById("cards-container");

cards.forEach(card => {
  const cardDiv = document.createElement("div");
  cardDiv.className = "card";

  cardDiv.innerHTML = `
    <div class="icon-circle">
      <i class="fas ${card.icon}"></i>
    </div>
    <div class="title">${card.title}</div>
    <div class="subtitle">${card.subtitle}</div>
    ${
      card.buttons.length === 1
        ? `
      <a href="${card.buttons[0].href}" class="btn">${card.buttons[0].label}</a>
      <div class="caption">${card.buttons[0].caption}</div>
    `
        : `
      <div class="btn-group">
        ${card.buttons
          .map(
            btn => `
          <div>
            <a href="${btn.href}" class="btn">${btn.label}</a>
            <div class="caption">${btn.caption}</div>
          </div>
        `
          )
          .join("")}
      </div>
    `
    }
  `;

  container.appendChild(cardDiv);
});
