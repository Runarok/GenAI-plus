// Default fallback start time
const defaultStartInput = "16.23 - 26 07 2025";

// Load from localStorage or fallback
const saved = localStorage.getItem("streakStart");
const customStartInput = saved || defaultStartInput;

// Parse start time
const [timeStr, dateStr] = customStartInput.split(" - ");
const [hour, minute] = timeStr.split('.').map(Number);
const [day, month, year] = dateStr.split(' ').map(Number);
const startTime = new Date(year, month - 1, day, hour, minute);

// Current time
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
const container = document.getElementById("achievements");

topAchievements.forEach(entry => {
  const el = document.createElement("div");
  el.className = "achievement";
  el.innerHTML = `<strong>${entry.title}</strong><span>Achieved on: ${entry.achievedOn}</span>`;
  container.appendChild(el);
});

// Countdown targets
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

const countdownContainer = document.getElementById("countdowns");

nextTargets.forEach(entry => {
  const div = document.createElement("div");
  div.className = "countdown";
  div.innerHTML = `<strong>${entry.label}</strong><span id="${entry.label.replace(/\s+/g, '_')}">Calculating...</span>`;
  countdownContainer.appendChild(div);

  const update = () => {
    const current = new Date();
    let diff = entry.date - current;

    if (diff <= 0) {
      document.getElementById(entry.label.replace(/\s+/g, '_')).textContent = "Achieved!";
      return;
    }

    const days = Math.floor(diff / 86400000);
    diff -= days * 86400000;
    const hours = Math.floor(diff / 3600000);
    diff -= hours * 3600000;
    const minutes = Math.floor(diff / 60000);
    diff -= minutes * 60000;
    const seconds = Math.floor(diff / 1000);

    document.getElementById(entry.label.replace(/\s+/g, '_')).textContent =
      `${days}d ${hours}h ${minutes}m ${seconds}s left`;
  };

  update();
  setInterval(update, 1000);
});

// Import/Export functions
function exportStreakData() {
  const data = { start: customStartInput };
  const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "streak.json";
  a.click();
}

function importStreakData(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    const data = JSON.parse(e.target.result);
    if (data.start) {
      localStorage.setItem("streakStart", data.start);
      location.reload();
    }
  };
  reader.readAsText(file);
}

document.getElementById("exportBtn").addEventListener("click", exportStreakData);
document.getElementById("importInput").addEventListener("change", importStreakData);
