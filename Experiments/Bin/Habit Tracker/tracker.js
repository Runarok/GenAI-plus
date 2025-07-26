let habits = JSON.parse(localStorage.getItem("habitList")) || {
  Default: "16.23 - 26 07 2025"
};

let currentHabit = Object.keys(habits)[0] || "Default";

// Renders tabs for each habit
function renderTabs() {
  const tabContainer = document.getElementById("tab-buttons");
  tabContainer.innerHTML = "";

  for (const habitName in habits) {
    const button = document.createElement("button");
    button.textContent = habitName;
    button.classList.toggle("active", habitName === currentHabit);
    button.onclick = () => {
      currentHabit = habitName;
      renderTabs();
      renderHabit();
    };
    tabContainer.appendChild(button);
  }
}

function renderHabit() {
  const content = document.getElementById("habit-content");
  content.innerHTML = "";

  const input = habits[currentHabit];
  const [timeStr, dateStr] = input.split(" - ");
  const [hour, minute] = timeStr.split('.').map(Number);
  const [day, month, year] = dateStr.split(' ').map(Number);
  const startTime = new Date(year, month - 1, day, hour, minute);
  const now = new Date();

  const diffMs = now - startTime;
  const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const totalWeeks = Math.floor(totalDays / 7);
  const totalMonths = Math.floor(totalDays / 30.44);
  const totalYears = Math.floor(totalDays / 365.25);

  const formatDate = (date) => date.toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric'
  });

  const achievements = [];

  if (totalYears >= 1) {
    const d = new Date(startTime);
    d.setFullYear(d.getFullYear() + totalYears);
    achievements.push({
      title: `📅 ${totalYears} year${totalYears > 1 ? 's' : ''} clean`,
      achievedOn: formatDate(d),
      weight: 10000
    });
  }

  if (totalMonths >= 1) {
    const d = new Date(startTime);
    d.setMonth(d.getMonth() + totalMonths);
    achievements.push({
      title: `🌙 ${totalMonths} month${totalMonths > 1 ? 's' : ''} strong`,
      achievedOn: formatDate(d),
      weight: 1000
    });
  }

  if (totalWeeks >= 1) {
    const d = new Date(startTime.getTime() + totalWeeks * 7 * 86400000);
    achievements.push({
      title: `🗓️ ${totalWeeks} week${totalWeeks > 1 ? 's' : ''} consistent`,
      achievedOn: formatDate(d),
      weight: 100
    });
  }

  if (totalDays >= 1) {
    const d = new Date(startTime.getTime() + totalDays * 86400000);
    achievements.push({
      title: `✅ ${totalDays} day${totalDays > 1 ? 's' : ''} clean`,
      achievedOn: formatDate(d),
      weight: 10
    });
  }

  const topAchievements = achievements.sort((a, b) => b.weight - a.weight).slice(0, 4);

  topAchievements.forEach(entry => {
    const div = document.createElement("div");
    div.className = "achievement";
    div.innerHTML = `<strong>${entry.title}</strong><span>Achieved on: ${entry.achievedOn}</span>`;
    content.appendChild(div);
  });

  const nextTargets = [
    {
      label: "Next Day Milestone",
      date: new Date(startTime.getTime() + (totalDays + 1) * 86400000)
    },
    {
      label: "Next Week Milestone",
      date: new Date(startTime.getTime() + (totalWeeks + 1) * 7 * 86400000)
    },
    {
      label: "Next Month Milestone",
      date: new Date(startTime.getTime())
    },
    {
      label: "Next Year Milestone",
      date: new Date(startTime.getTime())
    }
  ];

  nextTargets[2].date.setMonth(startTime.getMonth() + totalMonths + 1);
  nextTargets[3].date.setFullYear(startTime.getFullYear() + totalYears + 1);

  nextTargets.forEach(entry => {
    const id = `${currentHabit}-${entry.label.replace(/\s+/g, '_')}`;
    const div = document.createElement("div");
    div.className = "countdown";
    div.innerHTML = `<strong>${entry.label}</strong><span id="${id}">Calculating...</span>`;
    content.appendChild(div);

    const update = () => {
      const now = new Date();
      let diff = entry.date - now;

      if (diff <= 0) {
        document.getElementById(id).textContent = "Achieved!";
        return;
      }

      const days = Math.floor(diff / 86400000);
      diff %= 86400000;
      const hours = Math.floor(diff / 3600000);
      diff %= 3600000;
      const minutes = Math.floor(diff / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);

      document.getElementById(id).textContent =
        `${days}d ${hours}h ${minutes}m ${seconds}s left`;
    };

    update();
    setInterval(update, 1000);
  });
}

function promptNewHabit() {
  const name = prompt("Habit Name?");
  if (!name || habits[name]) return;

  const now = new Date();
  const formatted = `${now.getHours()}.${now.getMinutes()} - ${now.getDate()} ${now.getMonth() + 1} ${now.getFullYear()}`;
  habits[name] = formatted;
  localStorage.setItem("habitList", JSON.stringify(habits));
  currentHabit = name;
  renderTabs();
  renderHabit();
}

function exportHabits() {
  const blob = new Blob([JSON.stringify(habits)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "habits.json";
  a.click();
}

document.getElementById("importFile").addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (event) => {
    const imported = JSON.parse(event.target.result);
    habits = imported;
    localStorage.setItem("habitList", JSON.stringify(habits));
    currentHabit = Object.keys(habits)[0];
    renderTabs();
    renderHabit();
  };
  reader.readAsText(file);
});

renderTabs();
renderHabit();
