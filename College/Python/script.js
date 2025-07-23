// Theme toggle functionality
function toggleTheme() {
    const body = document.body;
    const themeIcon = document.getElementById('theme-icon');
    const themeText = document.getElementById('theme-text');

    if (body.getAttribute('data-theme') === 'dark') {
        body.setAttribute('data-theme', 'light');
        themeIcon.className = 'fas fa-sun';
        themeText.textContent = 'Dark Mode';
        localStorage.setItem('theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        themeIcon.className = 'fas fa-moon';
        themeText.textContent = 'Light Mode';
        localStorage.setItem('theme', 'dark');
    }
}

// Load saved theme
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const body = document.body;
    const themeIcon = document.getElementById('theme-icon');
    const themeText = document.getElementById('theme-text');

    body.setAttribute('data-theme', savedTheme);

    if (savedTheme === 'light') {
        themeIcon.className = 'fas fa-sun';
        themeText.textContent = 'Dark Mode';
    } else {
        themeIcon.className = 'fas fa-moon';
        themeText.textContent = 'Light Mode';
    }
});

// Project accordion functionality
function toggleProject(projectId) {
    const projectElement = document.getElementById(projectId);
    const header = projectElement.previousElementSibling;
    const collapseIcon = header.querySelector('.collapse-icon');

    if (projectElement.classList.contains('show')) {
        projectElement.classList.remove('show');
        header.classList.add('collapsed');
    } else {
        // Close all other projects
        document.querySelectorAll('.collapse.show').forEach(element => {
            element.classList.remove('show');
            element.previousElementSibling.classList.add('collapsed');
        });

        // Open clicked project
        projectElement.classList.add('show');
        header.classList.remove('collapsed');
    }
}

// Section tab functionality
function showSection(projectId, sectionType) {
    // Hide all sections for this project
    const sections = ['oop', 'dsa', 'algo'];
    sections.forEach(section => {
        const sectionElement = document.getElementById(`${projectId}-${section}`);
        if (sectionElement) {
            sectionElement.classList.add('d-none');
        }
    });

    // Remove active class from all tabs
    const projectElement = document.getElementById(projectId);
    const tabs = projectElement.querySelectorAll('.section-tab');
    tabs.forEach(tab => tab.classList.remove('active'));

    // Show selected section
    const targetSection = document.getElementById(`${projectId}-${sectionType}`);
    if (targetSection) {
        targetSection.classList.remove('d-none');
    }

    // Add active class to clicked tab
    const clickedTab = Array.from(tabs).find(tab =>
        tab.onclick.toString().includes(sectionType)
    );
    if (clickedTab) {
        clickedTab.classList.add('active');
    }
}

// Smooth scrolling for better UX
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Prism.js configuration
Prism.plugins.autoloader.languages_path = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/';