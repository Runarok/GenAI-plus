// State Management
        let choices = [];
        let isSpinning = false;

        // DOM Elements
        const choiceInput = document.getElementById('choiceInput');
        const addBtn = document.getElementById('addBtn');
        const spinBtn = document.getElementById('spinBtn');
        const clearBtn = document.getElementById('clearBtn');
        const choicesContainer = document.getElementById('choicesContainer');
        const resultSection = document.getElementById('resultSection');
        const resultText = document.getElementById('resultText');

        // Initialize
        loadChoices();
        updateUI();

        // Event Listeners
        addBtn.addEventListener('click', addChoice);
        spinBtn.addEventListener('click', spinWheel);
        clearBtn.addEventListener('click', clearAllChoices);
        choiceInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') addChoice();
        });
        document.addEventListener('keypress', (e) => {
            if (e.code === 'Space' && !isSpinning && choices.length > 0) {
                e.preventDefault();
                spinWheel();
            }
        });

        function addChoice() {
            const value = choiceInput.value.trim();
            if (value === '') {
                choiceInput.focus();
                return;
            }

            // Split by commas or newlines, trim each choice
            const newChoices = value
                .split(/[,\n]/)
                .map(choice => choice.trim())
                .filter(choice => choice.length > 0);

            let addedCount = 0;
            for (const choice of newChoices) {
                if (!choices.includes(choice)) {
                    choices.push(choice);
                    addedCount++;
                }
            }

            if (addedCount === 0) {
                alert('All choices already exist or were invalid!');
            }

            choiceInput.value = '';
            saveChoices();
            updateUI();
            choiceInput.focus();
        }

        // Remove Choice
        function removeChoice(index) {
            choices.splice(index, 1);
            saveChoices();
            updateUI();
        }

        // Clear All Choices
        function clearAllChoices() {
            if (choices.length === 0) return;
            if (confirm('Are you sure you want to clear all choices?')) {
                choices = [];
                resultSection.classList.remove('active');
                saveChoices();
                updateUI();
            }
        }

        // Spin Wheel
        async function spinWheel() {
            if (isSpinning || choices.length === 0) return;

            isSpinning = true;
            spinBtn.disabled = true;
            resultSection.classList.remove('active');

            // Spinning animation
            const spinDuration = 2000 + Math.random() * 1000;
            const spinStart = Date.now();
            const choiceTags = document.querySelectorAll('.choice-tag');

            const spinInterval = setInterval(() => {
                const elapsed = Date.now() - spinStart;
                if (elapsed < spinDuration) {
                    const randomIndex = Math.floor(Math.random() * choices.length);
                    choiceTags.forEach((tag, idx) => {
                        tag.classList.toggle('spinning', idx === randomIndex);
                    });
                } else {
                    clearInterval(spinInterval);
                    choiceTags.forEach(tag => tag.classList.remove('spinning'));
                }
            }, 100);

            // Wait for spin to complete
            await new Promise(resolve => setTimeout(resolve, spinDuration));

            // Select final choice
            const selectedIndex = Math.floor(Math.random() * choices.length);
            const selectedChoice = choices[selectedIndex];

            // Update UI
            choiceTags.forEach((tag, idx) => {
                tag.classList.toggle('selected', idx === selectedIndex);
            });

            resultText.textContent = selectedChoice;
            resultSection.classList.add('active');

            // Confetti effect
            createConfetti();

            // Play sound (optional)
            playSound();

            isSpinning = false;
            spinBtn.disabled = false;
        }

        // Create Confetti
        function createConfetti() {
            const confettiCount = 30;
            for (let i = 0; i < confettiCount; i++) {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.background = Math.random() > 0.5 ? '#00ffc8' : '#8a2be2';
                confetti.style.delay = Math.random() * 0.3 + 's';
                document.body.appendChild(confetti);

                setTimeout(() => confetti.remove(), 3300);
            }
        }

        // Play Sound (using Web Audio API)
        function playSound() {
            try {
                const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();

                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);

                oscillator.frequency.value = 800;
                oscillator.type = 'sine';

                gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.3);
            } catch (e) {
                // Audio context not available
            }
        }

        // Update UI
        function updateUI() {
            // Update choices display
            if (choices.length === 0) {
                choicesContainer.innerHTML = `
                    <div class="empty-state">
                        <i class="fas fa-inbox"></i>
                        <p>No choices yet. Add one to get started!</p>
                    </div>
                `;
            } else {
                choicesContainer.innerHTML = choices
                    .map((choice, index) => `
                        <div class="choice-tag">
                            <span>${choice}</span>
                            <button class="btn-remove" onclick="removeChoice(${index})" title="Remove this choice">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    `)
                    .join('');
            }

            // Update button states
            spinBtn.disabled = choices.length === 0;
            clearBtn.disabled = choices.length === 0;
        }

        // LocalStorage
        function saveChoices() {
            localStorage.setItem('spinnerChoices', JSON.stringify(choices));
        }

        function loadChoices() {
            const saved = localStorage.getItem('spinnerChoices');
            if (saved) {
                try {
                    choices = JSON.parse(saved);
                } catch (e) {
                    choices = [];
                }
            }
        }