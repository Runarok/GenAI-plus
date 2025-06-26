// Main application initialization
class HTMLJoiner {
    constructor() {
        this.initializeComponents();
        this.loadSampleContent();
    }

    initializeComponents() {
        // Initialize all components
        window.themeManager = new ThemeManager();
        window.fileHandler = new FileHandler();
        window.uiManager = new UIManager();
        window.htmlCombiner = new HTMLCombiner();
        window.previewManager = new PreviewManager();
        
        // Load saved preview mode
        window.previewManager.loadSavedPreviewMode();
        
        // Make combiner available globally for other components
        this.combineHTML = window.htmlCombiner.combineHTML.bind(window.htmlCombiner);
    }

    loadSampleContent() {
        // Load sample content after a short delay
        setTimeout(() => {
            const htmlInput = document.getElementById('html-input');
            const cssInput = document.getElementById('css-input');
            const jsInput = document.getElementById('js-input');
            
            // Only load if inputs are empty
            if (htmlInput && !htmlInput.value.trim()) {
                htmlInput.value = this.getSampleHTML();
            }
            if (cssInput && !cssInput.value.trim()) {
                cssInput.value = this.getSampleCSS();
            }
            if (jsInput && !jsInput.value.trim()) {
                jsInput.value = this.getSampleJS();
            }
            
            // Trigger combining
            if (window.htmlCombiner) {
                window.htmlCombiner.combineHTML();
            }
        }, 500);
    }

    getSampleHTML() {
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Awesome Website</title>
</head>
<body>
    <div class="container">
        <header class="hero">
            <h1>Welcome to My Website</h1>
            <p>This is a sample page created with the HTML Joiner.</p>
            <button id="clickMe" class="button">Click Me!</button>
        </header>
        
        <main class="content">
            <section class="features">
                <div class="feature-card">
                    <i class="icon">🚀</i>
                    <h3>Fast</h3>
                    <p>Lightning fast performance</p>
                </div>
                <div class="feature-card">
                    <i class="icon">🎨</i>
                    <h3>Beautiful</h3>
                    <p>Stunning visual design</p>
                </div>
                <div class="feature-card">
                    <i class="icon">📱</i>
                    <h3>Responsive</h3>
                    <p>Works on all devices</p>
                </div>
            </section>
            
            <div id="output" class="output-area"></div>
        </main>
    </div>
</body>
</html>`;
    }

    getSampleCSS() {
        return `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    line-height: 1.6;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
}

.hero {
    text-align: center;
    background: rgba(255, 255, 255, 0.95);
    padding: 3rem 2rem;
    border-radius: 20px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    margin-bottom: 3rem;
}

.hero h1 {
    font-size: 3rem;
    color: #333;
    margin-bottom: 1rem;
    background: linear-gradient(45deg, #667eea, #764ba2);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.hero p {
    font-size: 1.2rem;
    color: #666;
    margin-bottom: 2rem;
}

.button {
    background: linear-gradient(45deg, #667eea, #764ba2);
    color: white;
    padding: 15px 30px;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.button:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

.button:active {
    transform: translateY(-1px);
}

.features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    margin-bottom: 3rem;
}

.feature-card {
    background: rgba(255, 255, 255, 0.9);
    padding: 2rem;
    border-radius: 15px;
    text-align: center;
    transition: all 0.3s ease;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.feature-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.feature-card .icon {
    font-size: 3rem;
    margin-bottom: 1rem;
    display: block;
}

.feature-card h3 {
    color: #333;
    margin-bottom: 1rem;
    font-size: 1.5rem;
}

.feature-card p {
    color: #666;
}

.output-area {
    background: rgba(255, 255, 255, 0.9);
    padding: 2rem;
    border-radius: 15px;
    min-height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
}

.output-area.active {
    background: linear-gradient(45deg, #667eea, #764ba2);
    color: white;
    transform: scale(1.02);
}

@media (max-width: 768px) {
    .hero h1 {
        font-size: 2rem;
    }
    
    .container {
        padding: 1rem;
    }
    
    .features {
        grid-template-columns: 1fr;
    }
}`;
    }

    getSampleJS() {
        return `document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('clickMe');
    const output = document.getElementById('output');
    let clickCount = 0;
    
    // Button click handler
    button.addEventListener('click', function() {
        clickCount++;
        
        // Update output content
        output.innerHTML = \`
            <div style="text-align: center;">
                <h3 style="color: #667eea; margin-bottom: 1rem;">
                    🎉 Button clicked \${clickCount} time(s)! 🎉
                </h3>
                <p style="font-size: 1.1rem;">
                    Thanks for testing the HTML Joiner!
                </p>
            </div>
        \`;
        
        // Add active class for animation
        output.classList.add('active');
        
        // Button animation
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
        }, 150);
        
        // Remove active class after animation
        setTimeout(() => {
            output.classList.remove('active');
        }, 2000);
        
        // Special effects for milestone clicks
        if (clickCount % 5 === 0) {
            showConfetti();
            showSpecialMessage();
        }
    });
    
    // Confetti effect
    function showConfetti() {
        const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe'];
        
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                createConfetti(colors[Math.floor(Math.random() * colors.length)]);
            }, i * 100);
        }
    }
    
    function createConfetti(color) {
        const confetti = document.createElement('div');
        confetti.style.cssText = \`
            position: fixed;
            width: 10px;
            height: 10px;
            background: \${color};
            top: -10px;
            left: \${Math.random() * 100}vw;
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            animation: confettiFall 3s linear forwards;
        \`;
        
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.remove();
            }
        }, 3000);
    }
    
    function showSpecialMessage() {
        const message = document.createElement('div');
        message.style.cssText = \`
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(45deg, #667eea, #764ba2);
            color: white;
            padding: 2rem;
            border-radius: 15px;
            font-size: 1.5rem;
            font-weight: bold;
            text-align: center;
            z-index: 1001;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            animation: specialMessage 3s ease-in-out forwards;
        \`;
        
        message.innerHTML = \`
            <div>🌟 Milestone Reached! 🌟</div>
            <div style="font-size: 1rem; margin-top: 0.5rem; opacity: 0.9;">
                You've clicked \${clickCount} times!
            </div>
        \`;
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            if (message.parentNode) {
                message.remove();
            }
        }, 3000);
    }
    
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = \`
        @keyframes confettiFall {
            to {
                transform: translateY(100vh) rotate(720deg);
                opacity: 0;
            }
        }
        
        @keyframes specialMessage {
            0% {
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.5);
            }
            20% {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1.1);
            }
            80% {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1);
            }
            100% {
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.8);
            }
        }
    \`;
    document.head.appendChild(style);
    
    // Feature card hover effects
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.background = 'linear-gradient(45deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.background = 'rgba(255, 255, 255, 0.9)';
        });
    });
    
    console.log('🚀 HTML Joiner demo loaded successfully!');
    console.log('✨ Try clicking the button and see the magic happen!');
});`;
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.htmlJoiner = new HTMLJoiner();
});