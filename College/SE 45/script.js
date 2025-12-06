// Theme Toggle
        const themeToggle = document.getElementById('themeToggle');
        const htmlElement = document.documentElement;
        const savedTheme = localStorage.getItem('theme') || 'dark';
        
        htmlElement.setAttribute('data-theme', savedTheme);
        updateThemeButton();

        themeToggle.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeButton();
        });

        function updateThemeButton() {
            const currentTheme = htmlElement.getAttribute('data-theme');
            themeToggle.textContent = currentTheme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
        }

        // Sidebar Navigation
        const sidebarItems = document.querySelectorAll('.sidebar-item');
        const contentSections = document.querySelectorAll('.content-section');

        sidebarItems.forEach(item => {
            item.addEventListener('click', () => {
                // Remove active from all items and sections
                sidebarItems.forEach(i => i.classList.remove('active'));
                contentSections.forEach(s => s.classList.remove('active'));

                // Add active to clicked item
                item.classList.add('active');

                // Show corresponding section
                const contentId = item.getAttribute('data-content');
                const targetSection = document.getElementById(contentId);
                if (targetSection) {
                    targetSection.classList.add('active');
                    window.scrollTo(0, 0);
                }
            });
        });

        // Toggle Buttons
        document.querySelectorAll('.toggle-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const targetId = btn.getAttribute('data-toggle');
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.classList.toggle('show');
                    btn.textContent = targetElement.classList.contains('show') ? 'Hide Details ▼' : 'Show Details ▶';
                }
            });
        });

        // Scroll to Top Button
        const scrollToTopBtn = document.getElementById('scrollToTop');

        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // Responsive sidebar for mobile
        let isFirstLoad = true;
        window.addEventListener('resize', () => {
            if (window.innerWidth <= 768 && isFirstLoad) {
                // Reset on resize
            }
        });