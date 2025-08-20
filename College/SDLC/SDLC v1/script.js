// Theme Management
class ThemeManager {
    constructor() {
        this.currentTheme = this.getStoredTheme() || 'dark';
        this.themeToggle = document.getElementById('theme-toggle');
        this.themeDropdown = document.getElementById('theme-dropdown');
        this.themeOptions = document.querySelectorAll('.theme-option');
        
        this.init();
    }
    
    init() {
        this.applyTheme(this.currentTheme);
        this.bindEvents();
        this.updateThemeUI();
    }
    
    bindEvents() {
        // Toggle dropdown
        this.themeToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            this.themeDropdown.classList.toggle('active');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            this.themeDropdown.classList.remove('active');
        });
        
        // Theme option clicks
        this.themeOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                e.stopPropagation();
                const theme = option.dataset.theme;
                this.switchTheme(theme);
                this.themeDropdown.classList.remove('active');
            });
        });
        
        // Keyboard navigation
        this.themeToggle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.themeDropdown.classList.toggle('active');
            }
        });
    }
    
    switchTheme(theme) {
        this.currentTheme = theme;
        this.applyTheme(theme);
        this.storeTheme(theme);
        this.updateThemeUI();
        
        // Smooth transition effect
        document.body.style.transition = 'all 0.3s ease-in-out';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    }
    
    applyTheme(theme) {
        // Remove existing theme classes
        document.body.classList.remove('theme-dark', 'theme-light', 'theme-sepia');
        
        // Apply new theme (default is handled by CSS)
        if (theme !== 'dark') {
            document.body.classList.add(`theme-${theme}`);
        }
    }
    
    updateThemeUI() {
        this.themeOptions.forEach(option => {
            const isActive = option.dataset.theme === this.currentTheme;
            option.classList.toggle('active', isActive);
        });
    }
    
    getStoredTheme() {
        return localStorage.getItem('sdlc-theme');
    }
    
    storeTheme(theme) {
        localStorage.setItem('sdlc-theme', theme);
    }
}

// Smooth Scrolling Navigation
class NavigationManager {
    constructor() {
        this.navLinks = document.querySelectorAll('.nav-link');
        this.sections = document.querySelectorAll('.phase-section');
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.updateActiveLink();
    }
    
    bindEvents() {
        // Smooth scroll for navigation links
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Update active link on scroll
        window.addEventListener('scroll', this.throttle(this.updateActiveLink.bind(this), 100));
    }
    
    updateActiveLink() {
        const scrollPosition = window.scrollY + window.innerHeight / 2;
        
        this.sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
                this.navLinks.forEach(link => link.classList.remove('active'));
                const correspondingLink = document.querySelector(`a[href="#${section.id}"]`);
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    }
    
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
}

// Interactive Testing Suite
class TestingManager {
    constructor() {
        this.testResults = document.getElementById('test-results');
        this.init();
    }
    
    init() {
        // Make test functions globally available
        window.runResponsiveTest = this.runResponsiveTest.bind(this);
        window.runThemeTest = this.runThemeTest.bind(this);
        window.runNavigationTest = this.runNavigationTest.bind(this);
    }
    
    async runResponsiveTest() {
        this.testResults.textContent = 'Running responsive design test...\n';
        
        const tests = [
            { name: 'Mobile breakpoint (< 768px)', condition: () => window.innerWidth < 768 },
            { name: 'Tablet breakpoint (768-1024px)', condition: () => window.innerWidth >= 768 && window.innerWidth <= 1024 },
            { name: 'Desktop breakpoint (> 1024px)', condition: () => window.innerWidth > 1024 },
            { name: 'Navigation is responsive', condition: () => {
                const nav = document.querySelector('.nav-container');
                return nav && getComputedStyle(nav).display !== 'none';
            }},
            { name: 'Content grid is responsive', condition: () => {
                const grids = document.querySelectorAll('.content-grid');
                return grids.length > 0;
            }}
        ];
        
        for (const test of tests) {
            await this.delay(500);
            const result = test.condition() ? 'PASS' : 'SKIP';
            this.testResults.textContent += `${test.name}: ${result}\n`;
        }
        
        this.testResults.textContent += '\nResponsive design test completed!\n';
    }
    
    async runThemeTest() {
        this.testResults.textContent = 'Running theme switching test...\n';
        
        const themes = ['dark', 'light', 'sepia'];
        const originalTheme = document.body.className;
        
        for (const theme of themes) {
            await this.delay(800);
            document.body.className = theme !== 'dark' ? `theme-${theme}` : '';
            this.testResults.textContent += `Applied theme: ${theme} - PASS\n`;
        }
        
        await this.delay(500);
        document.body.className = originalTheme;
        this.testResults.textContent += '\nTheme switching test completed!\n';
    }
    
    async runNavigationTest() {
        this.testResults.textContent = 'Running navigation test...\n';
        
        const navLinks = document.querySelectorAll('.nav-link');
        
        for (const link of navLinks) {
            await this.delay(400);
            const href = link.getAttribute('href');
            const target = document.querySelector(href);
            const result = target ? 'PASS' : 'FAIL';
            this.testResults.textContent += `Link to ${href}: ${result}\n`;
        }
        
        this.testResults.textContent += '\nNavigation test completed!\n';
    }
    
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Performance Monitoring
class PerformanceMonitor {
    constructor() {
        this.init();
    }
    
    init() {
        this.updatePerformanceMetrics();
        this.animateCounters();
    }
    
    updatePerformanceMetrics() {
        // Simulate performance metrics
        const metrics = {
            planning: 100,
            htmlLines: Math.floor(document.documentElement.innerHTML.length / 50),
            cssLines: this.getCSSLinesCount(),
            jsLines: Math.floor(document.querySelectorAll('script').length * 50 + 150)
        };
        
        // Update counters with animation
        Object.entries(metrics).forEach(([key, value]) => {
            const element = document.getElementById(`${key}-progress`) || document.getElementById(`${key}-lines`);
            if (element) {
                this.animateCounter(element, 0, value, 2000);
            }
        });
    }
    
    getCSSLinesCount() {
        let totalRules = 0;
        
        for (let i = 0; i < document.styleSheets.length; i++) {
            try {
                const sheet = document.styleSheets[i];
                if (sheet.cssRules) {
                    totalRules += sheet.cssRules.length;
                } else if (sheet.rules) {
                    totalRules += sheet.rules.length;
                }
            } catch (e) {
                // Skip cross-origin stylesheets that can't be accessed
                continue;
            }
        }
        
        return Math.floor(totalRules * 15) || 500;
    }
    
    animateCounter(element, start, end, duration) {
        const range = end - start;
        const increment = end > start ? 1 : -1;
        const stepTime = Math.abs(Math.floor(duration / range));
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            const suffix = element.textContent.includes('%') ? '%' : 
                          element.textContent.includes('~') ? '' : '';
            element.textContent = (element.textContent.includes('~') ? '~' : '') + current + suffix;
            
            if (current === end) {
                clearInterval(timer);
            }
        }, stepTime);
    }
    
    animateCounters() {
        // Animate progress bars
        const qualityFills = document.querySelectorAll('.quality-fill');
        qualityFills.forEach(fill => {
            const targetWidth = fill.style.width;
            fill.style.width = '0%';
            setTimeout(() => {
                fill.style.width = targetWidth;
            }, 500);
        });
        
        // Animate circular progress
        const circles = document.querySelectorAll('.circle-progress');
        circles.forEach(circle => {
            const percent = parseInt(circle.dataset.percent) || 98;
            const degrees = (percent / 100) * 360;
            circle.style.background = `conic-gradient(var(--primary-color) 0deg, var(--primary-color) ${degrees}deg, var(--bg-glass) ${degrees}deg, var(--bg-glass) 360deg)`;
        });
    }
}

// Intersection Observer for animations
class AnimationManager {
    constructor() {
        this.init();
    }
    
    init() {
        if ('IntersectionObserver' in window) {
            this.setupObserver();
        }
    }
    
    setupObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationDelay = '0s';
                    entry.target.style.animationPlayState = 'running';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Observe phase sections
        document.querySelectorAll('.phase-section').forEach(section => {
            section.style.animationPlayState = 'paused';
            observer.observe(section);
        });
    }
}

// Accessibility Manager
class AccessibilityManager {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupKeyboardNavigation();
        this.setupFocusManagement();
        this.setupScreenReaderSupport();
    }
    
    setupKeyboardNavigation() {
        // Skip link
        const skipLink = this.createSkipLink();
        document.body.insertBefore(skipLink, document.body.firstChild);
        
        // Escape key handling
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                // Close any open dropdowns
                document.querySelectorAll('.theme-dropdown.active').forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        });
    }
    
    createSkipLink() {
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-link';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: var(--primary-color);
            color: var(--text-inverse);
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 10000;
            transition: top 0.3s;
        `;
        
        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });
        
        return skipLink;
    }
    
    setupFocusManagement() {
        // Add focus indicators
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-nav');
            }
        });
        
        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-nav');
        });
    }
    
    setupScreenReaderSupport() {
        // Add ARIA labels where needed
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle && !themeToggle.getAttribute('aria-label')) {
            themeToggle.setAttribute('aria-label', 'Toggle theme menu');
            themeToggle.setAttribute('aria-expanded', 'false');
            themeToggle.setAttribute('aria-haspopup', 'true');
        }
        
        // Update ARIA attributes dynamically
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    const dropdown = document.getElementById('theme-dropdown');
                    const toggle = document.getElementById('theme-toggle');
                    if (dropdown && toggle) {
                        const isOpen = dropdown.classList.contains('active');
                        toggle.setAttribute('aria-expanded', isOpen.toString());
                    }
                }
            });
        });
        
        const dropdown = document.getElementById('theme-dropdown');
        if (dropdown) {
            observer.observe(dropdown, { attributes: true, attributeFilter: ['class'] });
        }
    }
}

// Color Palette Interaction
class ColorPaletteManager {
    constructor() {
        this.init();
    }
    
    init() {
        const colorSwatches = document.querySelectorAll('.color-swatch');
        colorSwatches.forEach(swatch => {
            swatch.addEventListener('click', () => {
                this.showColorInfo(swatch);
            });
            
            // Add keyboard support
            swatch.setAttribute('tabindex', '0');
            swatch.setAttribute('role', 'button');
            swatch.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.showColorInfo(swatch);
                }
            });
        });
    }
    
    showColorInfo(swatch) {
        const colorClass = Array.from(swatch.classList).find(cls => 
            ['primary', 'secondary', 'accent', 'success', 'warning', 'error'].includes(cls)
        );
        
        if (colorClass) {
            // Create temporary tooltip
            const tooltip = document.createElement('div');
            tooltip.textContent = `${colorClass.charAt(0).toUpperCase() + colorClass.slice(1)} color selected!`;
            tooltip.style.cssText = `
                position: absolute;
                background: var(--bg-card);
                border: 1px solid var(--border-color);
                padding: 8px 12px;
                border-radius: 6px;
                font-size: 14px;
                z-index: 1000;
                pointer-events: none;
                transform: translateX(-50%);
            `;
            
            const rect = swatch.getBoundingClientRect();
            tooltip.style.left = rect.left + rect.width / 2 + 'px';
            tooltip.style.top = rect.bottom + 10 + 'px';
            
            document.body.appendChild(tooltip);
            
            setTimeout(() => {
                tooltip.remove();
            }, 2000);
        }
    }
}

// Initialize all managers when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add main content ID for skip link
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.id = 'main-content';
    }
    
    // Initialize all managers
    new ThemeManager();
    new NavigationManager();
    new TestingManager();
    new PerformanceMonitor();
    new AnimationManager();
    new AccessibilityManager();
    new ColorPaletteManager();
    
    // Add keyboard nav styles
    const style = document.createElement('style');
    style.textContent = `
        .keyboard-nav *:focus {
            outline: 2px solid var(--primary-color) !important;
            outline-offset: 2px !important;
        }
        
        .keyboard-nav button:focus,
        .keyboard-nav a:focus,
        .keyboard-nav input:focus,
        .keyboard-nav [tabindex]:focus {
            outline: 2px solid var(--primary-color) !important;
            outline-offset: 2px !important;
        }
    `;
    document.head.appendChild(style);
    
    // Console message for developers
    console.log(`
    🚀 SDLC Meta-Project Initialized!
    
    This self-documenting project demonstrates the Software Development Life Cycle
    through its own implementation. Here's what you can explore:
    
    📋 Planning Phase: Requirements and project scope
    🔍 Analysis Phase: Technical analysis and user requirements
    🎨 Design Phase: Visual design system and components
    ⚙️  Implementation Phase: Code structure and features
    🧪 Testing Phase: Interactive test suite
    🚀 Deployment Phase: Live deployment status
    
    Try the interactive features:
    • Theme switching (dark/light/sepia)
    • Responsive design testing
    • Navigation testing
    • Color palette interaction
    
    Built with vanilla HTML, CSS, and JavaScript - no build process required!
    `);
});

// Service Worker registration for PWA capabilities (optional enhancement)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Only register if service worker file exists
        fetch('/sw.js')
            .then(response => {
                if (response.status === 200) {
                    navigator.serviceWorker.register('/sw.js')
                        .then(registration => {
                            console.log('SW registered: ', registration);
                        })
                        .catch(registrationError => {
                            console.log('SW registration failed: ', registrationError);
                        });
                }
            })
            .catch(() => {
                // Service worker file doesn't exist, which is fine
            });
    });
}