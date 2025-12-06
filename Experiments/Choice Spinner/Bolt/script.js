// ========================================
        // STATE MANAGEMENT
        // ========================================
        let choices = [];
        let isSpinning = false;

        // DOM Elements
        const choiceInput = document.getElementById('choiceInput');
        const addBtn = document.getElementById('addBtn');
        const clearBtn = document.getElementById('clearBtn');
        const choicesList = document.getElementById('choicesList');
        const choiceCount = document.getElementById('choiceCount');
        const spinBtn = document.getElementById('spinBtn');
        const resultText = document.getElementById('resultText');

        // ========================================
        // INITIALIZATION
        // ========================================
        document.addEventListener('DOMContentLoaded', () => {
            loadChoicesFromStorage();
            renderChoices();
            updateUI();
        });

        // ========================================
        // LOCAL STORAGE FUNCTIONS
        // ========================================
        function saveChoicesToStorage() {
            localStorage.setItem('spinnerChoices', JSON.stringify(choices));
        }

        function loadChoicesFromStorage() {
            const saved = localStorage.getItem('spinnerChoices');
            if (saved) {
                try {
                    choices = JSON.parse(saved);
                } catch (e) {
                    choices = [];
                }
            }
        }

        // ========================================
        // CHOICE MANAGEMENT
        // ========================================
        function addChoice() {
            const value = choiceInput.value.trim();

            if (!value) {
                shakeElement(choiceInput);
                return;
            }

            // Split by commas or newlines, trim each, and filter out empty strings
            const newChoices = value
                .split(/[,\n]+/)
                .map(choice => choice.trim())
                .filter(choice => choice.length > 0);

            if (newChoices.length === 0) {
                shakeElement(choiceInput);
                return;
            }

            // Track duplicates and new additions
            let addedCount = 0;
            let duplicateCount = 0;

            newChoices.forEach(choice => {
                if (!choices.includes(choice)) {
                    choices.push(choice);
                    addedCount++;
                } else {
                    duplicateCount++;
                }
            });

            choiceInput.value = '';
            choiceInput.focus();

            saveChoicesToStorage();
            renderChoices();
            updateUI();

            if (addedCount > 0) {
                playSound('add');
                if (duplicateCount > 0) {
                    showNotification(`Added ${addedCount} choice${addedCount > 1 ? 's' : ''}, ${duplicateCount} duplicate${duplicateCount > 1 ? 's' : ''} skipped`);
                }
            } else if (duplicateCount > 0) {
                shakeElement(choiceInput);
                showNotification('All choices already exist!');
            }
        }

        function removeChoice(index) {
            choices.splice(index, 1);
            saveChoicesToStorage();
            renderChoices();
            updateUI();
            playSound('remove');
        }

        function clearAllChoices() {
            if (choices.length === 0) return;

            if (confirm('Are you sure you want to clear all choices?')) {
                choices = [];
                resultText.textContent = 'Ready to spin!';
                resultText.classList.remove('show');
                saveChoicesToStorage();
                renderChoices();
                updateUI();
                playSound('clear');
            }
        }

        // ========================================
        // RENDERING
        // ========================================
        function renderChoices() {
            choicesList.innerHTML = '';

            if (choices.length === 0) {
                choicesList.classList.add('empty');
                return;
            }

            choicesList.classList.remove('empty');

            choices.forEach((choice, index) => {
                const tag = document.createElement('div');
                tag.className = 'choice-tag';
                tag.innerHTML = `
                    <span>${choice}</span>
                    <button class="remove-choice" onclick="removeChoice(${index})">
                        <i class="fas fa-times"></i>
                    </button>
                `;
                choicesList.appendChild(tag);
            });

            choiceCount.textContent = choices.length;
        }

        function updateUI() {
            spinBtn.disabled = choices.length < 2;

            if (choices.length < 2) {
                resultText.textContent = choices.length === 0
                    ? 'Add some choices to get started!'
                    : 'Add at least 2 choices to spin!';
            } else if (resultText.textContent === 'Add some choices to get started!' ||
                       resultText.textContent === 'Add at least 2 choices to spin!') {
                resultText.textContent = 'Ready to spin!';
            }
        }

        // ========================================
        // SPINNING LOGIC
        // ========================================
        async function spinWheel() {
            if (isSpinning || choices.length < 2) return;

            isSpinning = true;
            spinBtn.classList.add('spinning');
            spinBtn.disabled = true;
            resultText.textContent = 'Spinning...';
            resultText.classList.remove('show');

            playSound('spin');

            const choiceTags = document.querySelectorAll('.choice-tag');
            const spinDuration = 3000;
            const spinInterval = 150;
            const spins = spinDuration / spinInterval;

            let currentIndex = 0;

            for (let i = 0; i < spins; i++) {
                await new Promise(resolve => setTimeout(resolve, spinInterval));

                choiceTags.forEach(tag => tag.classList.remove('spinning'));
                choiceTags[currentIndex].classList.add('spinning');

                currentIndex = (currentIndex + 1) % choices.length;
            }

            const selectedIndex = Math.floor(Math.random() * choices.length);
            const winner = choices[selectedIndex];

            choiceTags.forEach(tag => tag.classList.remove('spinning'));
            choiceTags[selectedIndex].classList.add('selected');

            await new Promise(resolve => setTimeout(resolve, 300));

            resultText.textContent = winner;
            resultText.classList.add('show');

            createConfetti();
            playSound('win');

            setTimeout(() => {
                choiceTags[selectedIndex].classList.remove('selected');
                isSpinning = false;
                spinBtn.classList.remove('spinning');
                spinBtn.disabled = false;
            }, 2000);
        }

        // ========================================
        // VISUAL EFFECTS
        // ========================================
        function createConfetti() {
            const colors = ['#667eea', '#764ba2', '#10b981', '#f59e0b', '#ef4444', '#ec4899'];
            const confettiCount = 50;

            for (let i = 0; i < confettiCount; i++) {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.top = '-10px';
                confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
                confetti.style.animationDelay = Math.random() * 0.5 + 's';

                document.body.appendChild(confetti);

                setTimeout(() => confetti.remove(), 3000);
            }
        }

        function shakeElement(element) {
            element.style.animation = 'none';
            setTimeout(() => {
                element.style.animation = 'shake 0.3s ease';
            }, 10);
        }

        function showNotification(message) {
            resultText.textContent = message;
            setTimeout(() => {
                if (choices.length >= 2) {
                    resultText.textContent = 'Ready to spin!';
                }
            }, 2000);
        }

        // ========================================
        // SOUND EFFECTS (Simple beep sounds)
        // ========================================
        function playSound(type) {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            gainNode.gain.value = 0.1;

            switch(type) {
                case 'add':
                    oscillator.frequency.value = 600;
                    oscillator.start();
                    oscillator.stop(audioContext.currentTime + 0.1);
                    break;
                case 'remove':
                    oscillator.frequency.value = 400;
                    oscillator.start();
                    oscillator.stop(audioContext.currentTime + 0.1);
                    break;
                case 'spin':
                    oscillator.frequency.value = 800;
                    oscillator.start();
                    oscillator.stop(audioContext.currentTime + 0.2);
                    break;
                case 'win':
                    oscillator.frequency.value = 1000;
                    oscillator.start();
                    oscillator.stop(audioContext.currentTime + 0.3);
                    break;
                case 'clear':
                    oscillator.frequency.value = 300;
                    oscillator.start();
                    oscillator.stop(audioContext.currentTime + 0.15);
                    break;
            }
        }

        // ========================================
        // EVENT LISTENERS
        // ========================================
        addBtn.addEventListener('click', addChoice);
        clearBtn.addEventListener('click', clearAllChoices);
        spinBtn.addEventListener('click', spinWheel);

        choiceInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && e.ctrlKey) {
                e.preventDefault();
                addChoice();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space' && !isSpinning && choices.length >= 2) {
                if (document.activeElement !== choiceInput) {
                    e.preventDefault();
                    spinWheel();
                }
            }
        });

        // Add shake animation dynamically
        const style = document.createElement('style');
        style.textContent = `
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-10px); }
                75% { transform: translateX(10px); }
            }
        `;
        document.head.appendChild(style);