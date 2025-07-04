const referenceTime = new Date("2025-07-04T09:40:00");

function updateTime() {
  const now = new Date();
  const diffMs = now - referenceTime;

  if (diffMs < 0) {
    document.getElementById("timeElapsed").textContent = "The reference time is in the future!";
    return;
  }

  const totalSeconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  const displayText = `${days} day(s), ${hours % 24} hour(s), ${minutes % 60} minute(s) ago`;
  document.getElementById("timeElapsed").textContent = displayText;

  const achievements = [];
  const milestoneDays = [365, 180, 90, 30, 10, 5, 1];

  milestoneDays.forEach(day => {
    if (days >= day) {
      achievements.push({
        label: day === 30 ? "1 month" : `${day} day${day > 1 ? 's' : ''}`,
        value: day
      });
    }
  });

  const topAchievements = achievements.sort((a, b) => b.value - a.value).slice(0, 5);

  const list = document.getElementById("achievements");
  list.innerHTML = '';
  topAchievements.forEach(ach => {
    const li = document.createElement("li");
    li.textContent = `✅ It has been ${ach.label} since then`;
    list.appendChild(li);
  });
}

updateTime();
setInterval(updateTime, 60000);