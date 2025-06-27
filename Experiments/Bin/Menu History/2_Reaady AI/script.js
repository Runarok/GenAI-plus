// Tailwind CSS Configuration
tailwind.config = {
    theme: {
        extend: {
            colors: {
                primary: "#6E57E0",
                secondary: "#2A2A2A",
            },
            borderRadius: {
                none: "0px",
                sm: "4px",
                DEFAULT: "8px",
                md: "12px",
                lg: "16px",
                xl: "20px",
                "2xl": "24px",
                "3xl": "32px",
                full: "9999px",
                button: "8px",
            },
        },
    },
};

// Fetch GitHub Projects
async function fetchGithubProjects(sort = "updated") {
    try {
        const response = await fetch(`https://api.github.com/users/RUNAROK/repos?sort=${sort}`);
        const projects = await response.json();
        const projectsContainer = document.getElementById("github-projects");
        projectsContainer.innerHTML = "";

        let filteredProjects = projects;
        const searchTerm = document.getElementById("search-projects").value.toLowerCase();

        if (searchTerm) {
            filteredProjects = projects.filter((project) =>
                project.name.toLowerCase().includes(searchTerm) ||
                (project.description && project.description.toLowerCase().includes(searchTerm))
            );
        }

        filteredProjects.forEach((project) => {
            const languages = project.language ? [project.language] : [];

            const card = document.createElement("div");
            card.className =
                "bg-secondary/50 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-transform duration-300";

            card.innerHTML = `
                <div class="p-6">
                    <h3 class="text-xl font-semibold mb-2">${project.name}</h3>
                    <p class="text-gray-400 mb-4">
                        ${project.description ? project.description.slice(0, 100) + "..." : "No description available"}
                    </p>
                    <div class="flex flex-wrap gap-2 mb-4">
                        ${languages.map((lang) =>
                            `<span class="px-3 py-1 bg-primary/10 rounded-full text-sm">${lang}</span>`
                        ).join("")}
                    </div>
                    <a href="${project.html_url}" target="_blank" class="text-primary hover:text-primary/80 transition-colors">
                        View Project →
                    </a>
                </div>
            `;

            projectsContainer.appendChild(card);
        });

    } catch (error) {
        console.error("Error fetching GitHub projects:", error);
        document.getElementById("github-projects").innerHTML = `
            <div class="col-span-3 text-center text-gray-400">
                <i class="ri-error-warning-line text-4xl mb-4"></i>
                <p>Failed to load GitHub projects. Please try again later.</p>
            </div>
        `;
    }
}

// DOMContentLoaded Handler
document.addEventListener("DOMContentLoaded", () => {
    fetchGithubProjects();

    document.getElementById("sort-projects").addEventListener("change", (e) => {
        fetchGithubProjects(e.target.value);
    });

    document.getElementById("search-projects").addEventListener("input", debounce(() => {
        const sortValue = document.getElementById("sort-projects").value;
        fetchGithubProjects(sortValue);
    }, 300));
});

// Debounce Utility
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}
