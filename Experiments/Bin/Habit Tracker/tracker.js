document.addEventListener("DOMContentLoaded", function () {
  let habits = JSON.parse(localStorage.getItem("habitList")) || {
    Default: "16.23 - 26 07 2025"
  };
  let currentHabit = Object.keys(habits)[0];
  let countdownIntervals = [];

  // -------- RENDERING --------

  function renderTabs() {
    const tabContainer = document.getElementById("tab-buttons");
    tabContainer.innerHTML = "";

    for (const name in habits) {
      const btn = document.createElement("button");
      btn.textContent = name;
      btn.classList.toggle("active", name === currentHabit);
      btn.onclick = () => {
        currentHabit = name;
        renderTabs();
        renderHabit();
      };
      tabContainer.appendChild(btn);
    }
  }

  function clearCountdowns() {
    countdownIntervals.forEach(intervalId => clearInterval(intervalId));
    countdownIntervals = [];
  }

  function renderHabit() {
    clearCountdowns();
    const content = document.getElementById("habit-content");
    content.innerHTML = "";

    if (!currentHabit || !habits[currentHabit]) {
      content.innerHTML = "<p>No habits yet</p>";
      return;
    }

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

    const formatDate = (d) => d.toLocaleDateString('en-GB', {
      day: 'numeric', month: 'short', year: 'numeric'
    });

    const achievements = [];

    if (totalYears >= 1) {
      const d = new Date(startTime); d.setFullYear(d.getFullYear() + totalYears);
      achievements.push({ title: `📅 ${totalYears} year${totalYears > 1 ? 's' : ''}`, achievedOn: formatDate(d), weight: 10000 });
    }

    if (totalMonths >= 1) {
      const d = new Date(startTime); d.setMonth(d.getMonth() + totalMonths);
      achievements.push({ title: `🌙 ${totalMonths} month${totalMonths > 1 ? 's' : ''}`, achievedOn: formatDate(d), weight: 1000 });
    }

    if (totalWeeks >= 1) {
      const d = new Date(startTime.getTime() + totalWeeks * 7 * 86400000);
      achievements.push({ title: `🗓️ ${totalWeeks} week${totalWeeks > 1 ? 's' : ''}`, achievedOn: formatDate(d), weight: 100 });
    }

    if (totalDays >= 1) {
      const d = new Date(startTime.getTime() + totalDays * 86400000);
      achievements.push({ title: `✅ ${totalDays} day${totalDays > 1 ? 's' : ''}`, achievedOn: formatDate(d), weight: 10 });
    }

    const topAchievements = achievements.sort((a, b) => b.weight - a.weight).slice(0, 4);
    topAchievements.forEach(entry => {
      const div = document.createElement("div");
      div.className = "achievement";
      div.innerHTML = `<strong>${entry.title}</strong><span>Achieved on: ${entry.achievedOn}</span>`;
      content.appendChild(div);
    });

    const nextTargets = [
      { label: "Next Day", date: new Date(startTime.getTime() + (totalDays + 1) * 86400000) },
      { label: "Next Week", date: new Date(startTime.getTime() + (totalWeeks + 1) * 7 * 86400000) },
      { label: "Next Month", date: new Date(startTime) },
      { label: "Next Year", date: new Date(startTime) }
    ];

    nextTargets[2].date.setMonth(startTime.getMonth() + totalMonths + 1);
    nextTargets[3].date.setFullYear(startTime.getFullYear() + totalYears + 1);

    nextTargets.forEach(entry => {
      const id = `${currentHabit}-${entry.label.replace(/\s+/g, "_")}`;
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

        document.getElementById(id).textContent = `${days}d ${hours}h ${minutes}m ${seconds}s left`;
      };

      update();
      countdownIntervals.push(setInterval(update, 1000));
    });
  }

  // -------- MANAGE HABITS MODAL --------

  function showManageModal() {
    document.getElementById("manageModal").classList.remove("hidden");
    renderHabitsList();
    document.getElementById("newHabitName").value = '';
    document.getElementById("newHabitTime").value = '';
  }

  function closeManageModal() {
    document.getElementById("manageModal").classList.add("hidden");
  }

  function renderHabitsList() {
    const habitsListDiv = document.getElementById("habitsList");
    habitsListDiv.innerHTML = "";

    if (Object.keys(habits).length === 0) {
      habitsListDiv.innerHTML = "<p>No habits yet.</p>";
      return;
    }

    for (const habitName in habits) {
      const row = document.createElement("div");
      row.className = "habit-row";

      const nameInput = document.createElement("input");
      nameInput.type = "text";
      nameInput.value = habitName;
      nameInput.setAttribute("data-old", habitName);

      const timeInput = document.createElement("input");
      timeInput.type = "text";
      timeInput.value = habits[habitName];
      timeInput.setAttribute("data-old", habits[habitName]);

      const saveBtn = document.createElement("button");
      saveBtn.textContent = "💾";
      saveBtn.className = "save-btn";
      saveBtn.disabled = true;

      // Enable save if changed
      function checkIfChanged() {
        saveBtn.disabled = (
          nameInput.value.trim() === nameInput.getAttribute("data-old") &&
          timeInput.value.trim() === timeInput.getAttribute("data-old")
        );
      }
      nameInput.addEventListener("input", checkIfChanged);
      timeInput.addEventListener("input", checkIfChanged);

      // Save edited habit
      saveBtn.onclick = () => {
        const newName = nameInput.value.trim();
        const newTime = timeInput.value.trim();
        const oldName = nameInput.getAttribute("data-old");
        if (!newName || !newTime) {
          alert("Name and time cannot be empty!");
          return;
        }
        if (newName !== oldName && habits[newName]) {
          alert("A habit with this name already exists!");
          return;
        }
        // Rename key if name changed
        if (newName !== oldName) {
          habits[newName] = newTime;
          delete habits[oldName];
          if (currentHabit === oldName) currentHabit = newName;
        } else {
          habits[newName] = newTime;
        }
        localStorage.setItem("habitList", JSON.stringify(habits));
        renderTabs();
        renderHabit();
        renderHabitsList();
      };

      // Delete habit
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "🗑️";
      deleteBtn.className = "delete-btn";
      deleteBtn.onclick = () => {
        if (!confirm(`Delete habit "${habitName}"?`)) return;
        delete habits[habitName];
        if (currentHabit === habitName) {
          currentHabit = Object.keys(habits)[0] || null;
        }
        localStorage.setItem("habitList", JSON.stringify(habits));
        renderTabs();
        renderHabit();
        renderHabitsList();
      };

      row.appendChild(nameInput);
      row.appendChild(timeInput);
      row.appendChild(saveBtn);
      row.appendChild(deleteBtn);
      habitsListDiv.appendChild(row);
    }
  }

  // -------- ADD HABIT IN MODAL --------
  function addHabitFromModal() {
    const name = document.getElementById("newHabitName").value.trim();
    const time = document.getElementById("newHabitTime").value.trim();
    if (!name || !time) {
      alert("Please enter both name and time!");
      return;
    }
    if (habits[name]) {
      alert("A habit with this name already exists!");
      return;
    }
    habits[name] = time;
    currentHabit = name;
    localStorage.setItem("habitList", JSON.stringify(habits));
    renderTabs();
    renderHabit();
    renderHabitsList();
    document.getElementById("newHabitName").value = '';
    document.getElementById("newHabitTime").value = '';
  }

  // -------- EXPORT/IMPORT IN MODAL --------
  function exportHabitsFromModal() {
    const blob = new Blob([JSON.stringify(habits, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "habits.json";
    a.click();
  }

  function importHabitsFromModal(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        if (typeof data !== "object" || Array.isArray(data) || !Object.keys(data).length) {
          alert("Invalid file format.");
          return;
        }
        habits = data;
        currentHabit = Object.keys(habits)[0];
        localStorage.setItem("habitList", JSON.stringify(habits));
        renderTabs();
        renderHabit();
        renderHabitsList();
      } catch (err) {
        alert("Failed to import. Invalid JSON.");
      }
    };
    reader.readAsText(file);
  }

  // -------- Bind UI controls --------
  document.getElementById("manageHabitsBtn").onclick = showManageModal;
  document.getElementById("closeManageModalBtn").onclick = closeManageModal;
  document.getElementById("addHabitModalBtn").onclick = addHabitFromModal;
  document.getElementById("exportModalBtn").onclick = exportHabitsFromModal;
  document.getElementById("importModalFile").addEventListener("change", importHabitsFromModal);

  // -------- Initial render --------
  renderTabs();
  renderHabit();
});