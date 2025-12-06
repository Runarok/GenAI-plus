// Toggle individual program expansion
        function toggleProgram(id) {
            const content = document.getElementById(id);
            const card = content.closest('.program-card');
            
            if (content.classList.contains('show')) {
                content.classList.remove('show');
                card.classList.remove('expanded');
            } else {
                content.classList.add('show');
                card.classList.add('expanded');
            }
        }

        // Toggle quiz hints
        function toggleHint(id) {
            const hint = document.getElementById(id);
            hint.classList.toggle('show');
        }

        // Toggle individual code/flashcard
        function toggleFlashcard(id) {
            const element = document.getElementById(id);
            element.classList.toggle('hidden-content');
        }

        // Toggle all code blocks
        function toggleAllCodes() {
            const codes = document.querySelectorAll('.code-box');
            codes.forEach(code => {
                code.classList.toggle('hidden-content');
            });
        }

        // Toggle all explanations
        function toggleAllExplanations() {
            const explanations = document.querySelectorAll('.explanation');
            explanations.forEach(exp => {
                exp.classList.toggle('hidden-content');
            });
        }

        // Toggle Tools Panel
        function toggleToolsPanel() {
            const panel = document.getElementById('toolsPanel');
            const overlay = document.getElementById('panelOverlay');
            panel.classList.toggle('open');
            overlay.classList.toggle('active');
        }

        // Toggle Theme
        function toggleTheme() {
            const html = document.documentElement;
            const currentTheme = html.getAttribute('data-theme') || 'dark';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', newTheme);
            
            // Update toggle checkbox
            const themeToggle = document.getElementById('themeToggle');
            themeToggle.checked = (newTheme === 'dark');
            
            // Save preference
            localStorage.setItem('theme', newTheme);
        }

        // Apply Display Options from Tools Panel
        function applyDisplayOptions() {
            const showCode = document.getElementById('showCode').checked;
            const showComments = document.getElementById('showComments').checked;
            const showExplanations = document.getElementById('showExplanations').checked;
            const showQuestions = document.getElementById('showQuestions').checked;

            // Show/hide code blocks
            document.querySelectorAll('.code-container').forEach(container => {
                container.style.display = showCode ? 'block' : 'none';
            });

            // Show/hide comments in code
            document.querySelectorAll('.comment').forEach(comment => {
                comment.style.display = showComments ? 'inline' : 'none';
            });

            // Show/hide explanations
            document.querySelectorAll('.explanation').forEach(exp => {
                exp.style.display = showExplanations ? 'block' : 'none';
            });

            // Show/hide quiz sections
            document.querySelectorAll('.quiz-section').forEach(quiz => {
                quiz.style.display = showQuestions ? 'block' : 'none';
            });
        }

        // Apply Viva Options
        function applyVivaOptions() {
            const showAnswers = document.getElementById('showVivaAnswers').checked;
            
            // Toggle visibility of quiz hints based on showAnswers
            document.querySelectorAll('.quiz-hint').forEach(hint => {
                if (showAnswers) {
                    hint.classList.add('show');
                } else {
                    hint.classList.remove('show');
                }
            });
        }

        // Keyboard Shortcuts
        document.addEventListener('keydown', function(e) {
            // Ctrl/Cmd + K: Toggle Tools Panel
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                toggleToolsPanel();
            }
            
            // Esc: Close Tools Panel
            if (e.key === 'Escape') {
                const panel = document.getElementById('toolsPanel');
                const overlay = document.getElementById('panelOverlay');
                if (panel.classList.contains('open')) {
                    panel.classList.remove('open');
                    overlay.classList.remove('active');
                }
            }
            
            // Ctrl/Cmd + T: Toggle Theme
            if ((e.ctrlKey || e.metaKey) && e.key === 't') {
                e.preventDefault();
                toggleTheme();
            }
        });

        // Initialize on page load
        window.addEventListener('DOMContentLoaded', function() {
            console.log('Network Programming Study Companion loaded successfully!');
            
            // Load saved theme preference
            const savedTheme = localStorage.getItem('theme') || 'dark';
            document.documentElement.setAttribute('data-theme', savedTheme);
            document.getElementById('themeToggle').checked = (savedTheme === 'dark');
            
            // Initialize display options
            applyDisplayOptions();
            applyVivaOptions();
        });