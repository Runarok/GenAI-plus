let currentScreen = 'onboard1';
        const screens = ['onboard1', 'onboard2', 'onboard3', 'home', 'categories', 'cart', 'profile'];

        function getScreenIndex(screenId) {
            return screens.indexOf(screenId);
        }

        function showScreen(screenId) {
            const currentIndex = getScreenIndex(currentScreen);
            const newIndex = getScreenIndex(screenId);
            const direction = newIndex > currentIndex ? 1 : -1;

            document.getElementById(currentScreen).classList.remove('active');
            if (direction > 0) {
                document.getElementById(currentScreen).classList.add('prev');
            }

            document.getElementById(screenId).classList.remove('prev');
            document.getElementById(screenId).classList.add('active');

            currentScreen = screenId;

            // Update nav items
            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.remove('active');
            });
            if (screenId === 'home') {
                document.querySelectorAll('.nav-item')[0].classList.add('active');
            } else if (screenId === 'categories') {
                document.querySelectorAll('.nav-item')[1].classList.add('active');
            } else if (screenId === 'cart') {
                document.querySelectorAll('.nav-item')[2].classList.add('active');
            } else if (screenId === 'profile') {
                document.querySelectorAll('.nav-item')[3].classList.add('active');
            }
        }

        function nextScreen() {
            const currentIndex = getScreenIndex(currentScreen);
            const nextIndex = currentIndex + 1;
            if (nextIndex < screens.length) {
                showScreen(screens[nextIndex]);
            }
        }

        function startApp() {
            showScreen('home');
        }

        // Add click animation to buttons
        document.querySelectorAll('.btn, .product-card, .category-card').forEach(element => {
            element.addEventListener('click', function() {
                this.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 100);
            });
        });