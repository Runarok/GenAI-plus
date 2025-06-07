// ========== THEMES ==========
const THEMES = [
  { name: "ClassicLight", label: "Classic Light" },
  { name: "ElegantDark", label: "Elegant Dark" },
  { name: "MintyNight", label: "Minty Night" },
  { name: "Solarized", label: "Solarized" },
  { name: "Sunset", label: "Sunset" },
  { name: "NordicBlue", label: "Nordic Blue" },
  { name: "RetroPop", label: "Retro Pop" },
  { name: "Paper", label: "Paper" },
  { name: "CodeBlack", label: "Code Black" },
  { name: "ForestGreen", label: "Forest Green" }
];

// ========== CONTENT ==========
const HACKS = [
  // ... [Hacks 1–7 should be here, see previous responses] ...
  // Example for hack 8 onward:
{
  title: "8. Use the two-minute rule",
  details: `
<p>The two-minute rule is a productivity hack that can help you tackle small tasks quickly
and avoid procrastination. The rule is simple: if a task takes less than two minutes to
complete, do it immediately. Here are some pointers to keep in mind when using the
two-minute rule:</p>
<ul>
<li><b>Identify small tasks:</b> Look for small tasks that can be completed quickly, such as
responding to an email, filing a document, or making a quick phone call.</li>
<li><b>Prioritize small tasks:</b> Prioritize small tasks based on their importance and urgency. If
a small task is important and urgent, do it right away, even if it takes more than two
minutes.</li>
<li><b>Set a time limit:</b> If a task takes more than two minutes but less than 15 minutes,
consider setting a timer and completing it within that time frame. This will help you avoid
getting sidetracked and spending too much time on small tasks.</li>
<li><b>Avoid distractions:</b> When working on small tasks, avoid distractions such as social
media or email notifications. Turn off notifications and set specific times to check your
email or social media accounts.</li>
<li><b>Use the two-minute rule regularly:</b> Make the two-minute rule a regular habit. By
completing small tasks quickly, you can free up time and focus on larger, more important
tasks.</li>
</ul>
<p>Using the two-minute rule can help you avoid procrastination and increase your
productivity. By following these pointers, you can identify and prioritize small tasks and
complete them quickly and efficiently.</p>
`
},
{
  title: "9. Avoid multitasking",
  details: `
<p>Multitasking can be tempting, but it can actually decrease productivity and increase
stress. Here are some pointers to keep in mind when trying to avoid multitasking:</p>
<ul>
<li><b>Recognize the limitations of the brain:</b> The human brain can only effectively focus on
one task at a time. When we try to multitask, our brain has to constantly switch between
tasks, which can lead to decreased productivity and increased stress.</li>
<li><b>Prioritize tasks:</b> Prioritize your tasks and focus on one task at a time. This will help
you stay focused and avoid getting distracted.</li>
<li><b>Use time blocking:</b> Time blocking involves scheduling blocks of time for specific
tasks. This can help you stay focused on one task at a time and avoid the temptation to
multitask.</li>
<li><b>Turn off notifications:</b> Notifications can be a major distraction and can lead to
multitasking. Turn off notifications for non-essential apps or during certain times of the
day when you need to focus.</li>
<li><b>Take breaks:</b> Taking breaks can help you recharge and refocus. Instead of
multitasking during breaks, take a walk, read a book, or engage in a relaxing activity.</li>
</ul>
<p>By avoiding multitasking, you can increase your productivity and decrease stress. By
prioritizing tasks, using time blocking, turning off notifications, and taking breaks, you
can stay focused and accomplish more.</p>
`
},
{
  title: "10. Use keyboard shortcuts",
  details: `
<p>Using keyboard shortcuts can save you time and increase productivity. Here are some
pointers to keep in mind when using keyboard shortcuts:</p>
<ul>
<li><b>Identify the most commonly used shortcuts:</b> Start by identifying the most commonly
used shortcuts for your operating system and software. You can find a list of shortcuts
online or in the software's help menu.</li>
<li><b>Memorize shortcuts:</b> Once you have identified the most commonly used shortcuts,
take the time to memorize them. This will help you use them quickly and efficiently.</li>
<li><b>Customize shortcuts:</b> Some software allows you to customize keyboard shortcuts to
fit your workflow. Consider customizing shortcuts for tasks that you do frequently.</li>
<li><b>Use a cheat sheet:</b> If you are having trouble remembering shortcuts, use a cheat
sheet. You can create your own or download one online.</li>
<li><b>Practice regularly:</b> The more you use keyboard shortcuts, the more comfortable and
efficient you will become. Make it a habit to use shortcuts whenever possible.</li>
</ul>
<p>Using keyboard shortcuts can help you work more efficiently and save time. By
identifying commonly used shortcuts, memorizing them, customizing shortcuts, using a
cheat sheet, and practicing regularly, you can increase your productivity and streamline
your workflow.</p>
`
},
// ... continue adding hacks 11-50 with full details as shown above ...
];

// ========== STATE ==========
let theme = localStorage.getItem('theme') || THEMES[2].name; // Default: MintyNight
let openState = Array(HACKS.length).fill(false);

// ========== RENDER ==========
function renderThemes() {
  const nav = document.getElementById('theme-switcher');
  nav.innerHTML = '';
  THEMES.forEach(({ name, label }) => {
    const btn = document.createElement('button');
    btn.className = 'theme-btn' + (theme === name ? ' active' : '');
    btn.type = 'button';
    btn.setAttribute('data-theme', name);
    btn.textContent = label;
    btn.setAttribute('aria-current', theme === name ? 'true' : 'false');
    btn.onclick = () => {
      setTheme(name);
    };
    nav.appendChild(btn);
  });
}
function setTheme(name) {
  theme = name;
  localStorage.setItem('theme', name);
  document.body.className = `theme-${name}`;
  renderThemes();
}
function renderHacks() {
  const list = document.getElementById('hack-list');
  list.innerHTML = '';
  HACKS.forEach((hack, i) => {
    // item
    const li = document.createElement('li');
    li.className = "hack-item";
    // heading
    const btn = document.createElement('button');
    btn.className = "hack-heading";
    btn.type = "button";
    btn.id = `hack-heading-${i}`;
    btn.setAttribute("aria-controls", `hack-details-${i}`);
    btn.setAttribute("aria-expanded", openState[i] ? "true" : "false");
    btn.tabIndex = 0;
    btn.innerText = hack.title;
    btn.onclick = () => {
      openState[i] = !openState[i];
      renderHacks();
      setTimeout(() => { btn.focus(); }, 0);
    };
    btn.onkeydown = e => {
      if (e.key === 'ArrowDown' && i < HACKS.length - 1)
        document.getElementById(`hack-heading-${i+1}`).focus();
      if (e.key === 'ArrowUp' && i > 0)
        document.getElementById(`hack-heading-${i-1}`).focus();
    };
    // details
    const details = document.createElement('section');
    details.className = 'hack-details' + (openState[i] ? ' open' : '');
    details.id = `hack-details-${i}`;
    details.setAttribute("role", "region");
    details.setAttribute("aria-labelledby", btn.id);
    details.style.display = openState[i] ? "block" : "none";
    details.innerHTML = hack.details;
    // add
    li.appendChild(btn);
    li.appendChild(details);
    list.appendChild(li);
  });
}
function init() {
  renderThemes();
  setTheme(theme);
  renderHacks();
}
window.addEventListener('DOMContentLoaded', init);