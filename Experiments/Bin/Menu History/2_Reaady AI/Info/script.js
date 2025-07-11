// Toggle between dark and light mode
function toggleTheme() {
    document.body.classList.toggle('light-mode');
}

// Add GitHub Stats and Badges dynamically via JavaScript
document.getElementById("github-stats").innerHTML = `
    <!-- GitHub Readme Stats -->
    <a href="https://github.com/runarok">
        <img height="180em" src="https://github-readme-stats.vercel.app/api/?username=runarok&show_icons=true&theme=dracula&include_all_commits=true&count_private=true&hide=prs&border_radius=10&hide_title=true" />
    </a>

    <!-- Top Languages Card -->
    <a href="https://github.com/runarok">
        <img height="180em" src="https://github-readme-stats.vercel.app/api/top-langs/?username=runarok&layout=compact&langs_count=8&theme=dracula" />
    </a>

    <!-- GitHub Streak Stats -->
    <a href="https://github.com/runarok">
        <img height="180em" src="https://github-readme-streak-stats.herokuapp.com/?user=runarok&theme=dracula" />
    </a>

    <!-- GitHub Contribution Graph -->
    <a href="https://github.com/runarok">
        <img height="180em" src="https://github-readme-activity-graph.vercel.app/graph?username=runarok&theme=dracula" />
    </a>

    <!-- GitHub Trophies Card -->
    <a href="https://github.com/runarok">
        <img height="180em" src="https://github-profile-trophy.vercel.app/?username=runarok&theme=dracula&row=2&column=4" />
    </a>

    <!-- Badges (e.g., Languages/Tech Stack) -->
    <div class="badges">
        <img src="https://img.shields.io/badge/-JavaScript-ff69b4?style=for-the-badge&logo=javascript" />
        <img src="https://img.shields.io/badge/-MATLAB-ff69b4?style=for-the-badge&logo=matlab" />
        <img src="https://img.shields.io/badge/-HTML-ff69b4?style=for-the-badge&logo=html5" />
        <img src="https://img.shields.io/badge/-CSS-ff69b4?style=for-the-badge&logo=css3" />
        <img src="https://img.shields.io/badge/-Git-ff69b4?style=for-the-badge&logo=git" />
        <img src="https://img.shields.io/badge/-Python-ff69b4?style=for-the-badge&logo=python" />
        <img src="https://img.shields.io/badge/-LabVIEW-ff69b4?style=for-the-badge&logo=labview" />
        <img src="https://img.shields.io/badge/-ASM%208051-ff69b4?style=for-the-badge&logo=assembly" />
        <img src="https://img.shields.io/badge/-C%2B%2B-ff69b4?style=for-the-badge&logo=c%2B%2B" />
    </div>

    <!-- Footer -->
    <div class="footer">
        <p>I am familiar with the basics of these technologies, though I still need more experience.</p>
    </div>
`;
