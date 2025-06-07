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

// ========== CONTENT (Paste all 50 hacks here in this format for full version) ==========
const HACKS = [
{
  title: "1. Prioritize your tasks",
  details: `
<p>Prioritizing your tasks is a crucial productivity hack that can help you make the most of your time and energy. When you prioritize your tasks, you are able to identify the most important and urgent tasks and focus your efforts on completing them first.</p>
<ul>
<li><b>Identify your goals:</b> Start by identifying your goals for the day, week, or month. These could be personal or professional goals, or a combination of both. Knowing what you want to achieve will help you prioritize your tasks more effectively.</li>
<li><b>Use a task list:</b> Make a list of all the tasks you need to complete, including both small and large tasks. This will help you get a clear picture of everything you need to do.</li>
<li><b>Categorize your tasks:</b> Categorize your tasks into three categories: urgent and important, important but not urgent, and neither urgent nor important. This will help you prioritize your tasks based on their level of urgency and importance.</li>
<li><b>Focus on the most important tasks:</b> Start with the tasks that are both urgent and important. These are the tasks that require your immediate attention and will have the biggest impact on your goals.</li>
<li><b>Break down large tasks:</b> If you have large tasks on your list, break them down into smaller, more manageable tasks. This will make them less overwhelming and easier to prioritize.</li>
<li><b>Be flexible:</b> Remember that priorities can change throughout the day or week. Be willing to adjust your priorities as needed to ensure that you are focusing your time and energy on the most important tasks.</li>
</ul>
`
},
{
  title: "2. Use the Pomodoro Technique",
  details: `
<p>The Pomodoro Technique is a time-management method that can help you stay focused and productive throughout the day. It involves breaking your workday into 25-minute intervals (called Pomodoros) separated by short breaks.</p>
<ul>
<li><b>Set a timer:</b> Use a timer (either a physical timer or a timer app) to set 25-minute intervals for focused work. During each Pomodoro, work on one specific task without interruption.</li>
<li><b>Take breaks:</b> After each Pomodoro, take a short break (usually around 5 minutes). This break allows your mind and body to recharge and prepare for the next Pomodoro.</li>
<li><b>Track your progress:</b> Keep track of how many Pomodoros you complete each day. This will help you see how much time you are spending on specific tasks and can help you adjust your priorities if needed.</li>
<li><b>Eliminate distractions:</b> During each Pomodoro, eliminate all distractions (such as phone notifications or email alerts) that could interrupt your work.</li>
<li><b>Adjust the length of Pomodoros:</b> If 25-minute Pomodoros don't work for you, adjust the length of each Pomodoro to suit your needs. You may find that 30-minute Pomodoros work better for you, or that shorter (or longer) breaks are more effective.</li>
<li><b>Take longer breaks:</b> After completing four Pomodoros, take a longer break (usually around 15-30 minutes). This longer break allows you to fully recharge before starting the next set of Pomodoros.</li>
</ul>
<p>Overall, the Pomodoro Technique can help you stay focused and productive by breaking your workday into manageable intervals and providing regular breaks for rest and recharge.</p>
`
},
{
  title: "3. Use the Eisenhower Matrix",
  details: `
<p>The Eisenhower Matrix is a tool for prioritizing tasks based on their level of urgency and importance. It helps you focus on the tasks that are most important and need to be completed first.</p>
<ul>
<li><b>Define your tasks:</b> Start by listing all the tasks you need to complete, no matter how big or small.</li>
<li><b>Categorize your tasks:</b> Categorize your tasks into four categories: urgent and important, important but not urgent, urgent but not important, and neither urgent nor important.</li>
<li><b>Prioritize urgent and important tasks:</b> These are the tasks that need to be completed immediately, such as deadlines or emergencies. Prioritize these tasks and complete them first.</li>
<li><b>Schedule important but not urgent tasks:</b> These are the tasks that are important but not time-sensitive. Schedule time in your calendar to work on these tasks, so they don't fall by the wayside.</li>
<li><b>Delegate urgent but not important tasks:</b> These are the tasks that are urgent but not important to you specifically. Delegate these tasks to someone else if possible, so you can focus on your own important tasks.</li>
<li><b>Eliminate neither urgent nor important tasks:</b> These are the tasks that are neither urgent nor important. Eliminate them from your to-do list if they are not necessary.</li>
<li><b>Reassess regularly:</b> Regularly reassess your tasks and priorities, as they may change over time. Use the Eisenhower Matrix to help you stay focused on what's important and manage your time more effectively.</li>
</ul>
<p>Overall, the Eisenhower Matrix can help you prioritize your tasks and focus on what's most important, so you can make the most of your time and energy.</p>
`
},
{
  title: "4. Batch similar tasks together",
  details: `
<p>Batching similar tasks together is a productivity hack that can help you work more efficiently by reducing context switching. Context switching occurs when you switch from one task to another and can lead to a loss of productivity and focus.</p>
<ul>
<li><b>Identify similar tasks:</b> Identify tasks that are similar in nature or require similar skills. For example, responding to emails or phone calls, scheduling meetings, or doing research.</li>
<li><b>Group tasks together:</b> Once you've identified similar tasks, group them together and do them all at once. For example, schedule a block of time each day to respond to emails or make phone calls.</li>
<li><b>Minimize distractions:</b> When batching tasks, it's important to minimize distractions to stay focused. Turn off notifications, close unnecessary tabs or applications, and let others know that you're not available during this time.</li>
<li><b>Take breaks:</b> Taking breaks is important to avoid burnout and stay productive. Take short breaks between batches to recharge and avoid fatigue.</li>
<li><b>Be flexible:</b> Be open to adjusting your batched tasks as needed. For example, if a new urgent task comes up, you may need to adjust your batched tasks to accommodate it.</li>
<li><b>Review and adjust:</b> Regularly review your batching process to see if it's working for you. Adjust as needed to maximize your productivity and efficiency.</li>
</ul>
<p>Overall, batching similar tasks together can help you stay focused, minimize context switching, and work more efficiently. By grouping tasks together, you can make the most of your time and energy and increase your productivity.</p>
`
},
{
  title: "5. Use a task management tool",
  details: `
<p>A task management tool is a software application that helps you keep track of your tasks and manage your to-do list. Using a task management tool can help you stay organized, prioritize your tasks, and increase your productivity.</p>
<ul>
<li><b>Choose a tool that works for you:</b> There are many task management tools available, so choose one that suits your needs and preferences. Consider factors like the interface, features, and compatibility with other tools you use.</li>
<li><b>Create a comprehensive task list:</b> List down all the tasks you need to complete, no matter how small or big. This will help you avoid forgetting important tasks and stay focused on your goals.</li>
<li><b>Set deadlines:</b> Set deadlines for each task to help you prioritize and stay on track. This will also help you plan your time and avoid procrastination.</li>
<li><b>Prioritize your tasks:</b> Use the task management tool to prioritize your tasks based on their importance and urgency. This will help you focus on the most important tasks and avoid getting overwhelmed.</li>
<li><b>Break down larger tasks:</b> If you have a large task, break it down into smaller, more manageable tasks. This will help you avoid feeling overwhelmed and make it easier to track progress.</li>
<li><b>Use categories or tags:</b> Categorize or tag your tasks based on project, priority, or any other relevant criteria. This will help you filter and sort your tasks, making it easier to find what you need.</li>
<li><b>Review regularly:</b> Regularly review your task list to ensure it's up-to-date and relevant. This will help you stay on top of your tasks and avoid missing important deadlines.</li>
</ul>
<p>Overall, using a task management tool can help you stay organized, prioritize your tasks, and increase your productivity. By incorporating these tips into your task management process, you can make the most of your time and achieve your goals more efficiently.</p>
`
},
{
  title: "6. Delegate tasks",
  details: `
<p>Delegating tasks is a productivity hack that can help you free up time, reduce stress, and increase your focus on important tasks. Delegating involves assigning tasks to someone else, either within your organization or externally, and can be a powerful tool for increasing your productivity.</p>
<ul>
<li><b>Identify tasks that can be delegated:</b> Identify tasks that can be done by someone else, either because they are outside your area of expertise or because someone else has the required skills.</li>
<li><b>Choose the right person for the job:</b> Select someone who has the necessary skills and experience to complete the task successfully. It's also important to consider their workload and availability.</li>
<li><b>Clearly define the task:</b> Clearly communicate the task, including the expected outcome, deadline, and any specific requirements. Make sure the person you're delegating to understands what's expected of them.</li>
<li><b>Provide resources and support:</b> Provide the necessary resources and support to help the person complete the task successfully. This could include access to tools, training, or guidance.</li>
<li><b>Set expectations and check-in:</b> Set expectations for how the person should communicate progress and when you should check in. Regular check-ins will help you track progress and ensure that the task is on track.</li>
<li><b>Provide feedback:</b> Provide feedback on the completed task, including what was done well and what could be improved. This will help the person learn and improve, and also help you refine your delegation skills.</li>
</ul>
<p>Delegating tasks can help you increase your productivity by freeing up time, reducing stress, and allowing you to focus on important tasks. By following these tips, you can delegate effectively and achieve better results with less effort.</p>
`
},
{
  title: "7. Set clear goals",
  details: `
<p>Setting clear goals is an essential productivity hack that can help you stay focused, motivated, and productive. Clear goals provide direction and purpose, helping you prioritize tasks and make progress towards your objectives.</p>
<ul>
<li><b>Be specific:</b> Clearly define what you want to achieve and why. Make sure your goals are specific, measurable, achievable, relevant, and time-bound (SMART).</li>
<li><b>Break down larger goals:</b> If you have a large goal, break it down into smaller, more manageable steps. This will help you track progress and avoid feeling overwhelmed.</li>
<li><b>Align goals with your values and vision:</b> Make sure your goals align with your personal or professional values and vision. This will help you stay motivated and focused on what's important.</li>
<li><b>Write down your goals:</b> Writing down your goals can help you clarify your thinking and commit to them. It can also serve as a reminder and help you track progress.</li>
<li><b>Review and adjust goals regularly:</b> Regularly review your goals to ensure they are still relevant and aligned with your priorities. Adjust them as needed to reflect changes in your circumstances or objectives.</li>
<li><b>Celebrate progress:</b> Celebrate small wins along the way to help you stay motivated and focused on your goals.</li>
</ul>
<p>Setting clear goals can help you stay focused, motivated, and productive. By following these tips, you can set goals that are specific, achievable, and aligned with your values and vision.</p>
`
}
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