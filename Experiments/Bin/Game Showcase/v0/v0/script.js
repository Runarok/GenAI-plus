        // Enhanced sample game showcase data with markdown support
        const showcaseData = {
            title: "Game Showcase",
            items: [
                {
                    title: "Action Games",
                    description: "High-octane action and adventure games with intense gameplay and stunning visuals.",
                    showImage: false, // This folder won't show an image placeholder
                    folder: {
                        items: [
                            {
                                title: "Cyber Runner 2077",
                                description: "A futuristic cyberpunk action game with stunning visuals and intense combat.",
                                image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImN5YmVyR3JhZGllbnQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiMwYTBhMGE7c3RvcC1vcGFjaXR5OjEiIC8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojMWExYTFhO3N0b3Atb3BhY2l0eToxIiAvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSJ1cmwoI2N5YmVyR3JhZGllbnQpIi8+PGNpcmNsZSBjeD0iMjAwIiBjeT0iMTUwIiByPSI4MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDBmZjQxIiBzdHJva2Utd2lkdGg9IjMiIG9wYWNpdHk9IjAuOCIvPjx0ZXh0IHg9IjIwMCIgeT0iMTYwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSIjMDBmZjQxIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+Q1lCRVI8L3RleHQ+PHRleHQgeD0iMjAwIiB5PSIxOTAiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iI2ZmMDA4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPlJVTk5FUiAyMDc3PC90ZXh0Pjwvc3ZnPg==",
                                markdown: `
# Cyber Runner 2077

## Overview
Welcome to the neon-soaked streets of Neo Tokyo in the year 2077. **Cyber Runner 2077** is an action-packed cyberpunk adventure that combines fast-paced combat with deep narrative choices.

## Key Features
- **Advanced Combat System**: Utilize cybernetic enhancements and high-tech weapons
- **Branching Storylines**: Your choices shape the fate of Neo Tokyo
- **Stunning Visuals**: Ray-traced reflections and dynamic lighting
- **Immersive Soundtrack**: Synthwave and electronic beats

## System Requirements
\`\`\`
Minimum:
- OS: Windows 10 64-bit
- Processor: Intel i5-8400 / AMD Ryzen 5 2600
- Memory: 8 GB RAM
- Graphics: GTX 1060 6GB / RX 580 8GB
\`\`\`

## Screenshots
![Game Screenshot](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNjAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzBhMGEwYSIvPjx0ZXh0IHg9IjMwMCIgeT0iMTUwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiMwMGZmNDEiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5HYW1lIFNjcmVlbnNob3Q8L3RleHQ+PC9zdmc+)

> "The future is now, and it's more dangerous than ever." - GameReviewer Pro

**Rating**: ⭐⭐⭐⭐⭐ (5/5)
                                `
                            },
                            {
                                title: "Space Warriors",
                                description: "Epic space battles and exploration in a vast galaxy filled with mysteries.",
                                image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cmFkaWFsR3JhZGllbnQgaWQ9InNwYWNlR3JhZGllbnQiIGN4PSI1MCUiIGN5PSI1MCUiIHI9IjUwJSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3R5bGU9InN0b3AtY29sb3I6IzFhMjMzYTtzdG9wLW9wYWNpdHk6MSIgLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiMwYzE4MjE7c3RvcC1vcGFjaXR5OjEiIC8+PC9yYWRpYWxHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9InVybCgjc3BhY2VHcmFkaWVudCkiLz48Y2lyY2xlIGN4PSIxMDAiIGN5PSI4MCIgcj0iMyIgZmlsbD0iI2ZmZmZmZiIgb3BhY2l0eT0iMC44Ii8+PGNpcmNsZSBjeD0iMzIwIiBjeT0iNjAiIHI9IjIiIGZpbGw9IiNmZmZmZmYiIG9wYWNpdHk9IjAuNiIvPjxjaXJjbGUgY3g9IjI1MCIgY3k9IjQwIiByPSIxLjUiIGZpbGw9IiNmZmZmZmYiIG9wYWNpdHk9IjAuNyIvPjxwb2x5Z29uIHBvaW50cz0iMjAwLDE1MCAyMjAsMTMwIDI0MCwxNTAgMjIwLDE3MCIgZmlsbD0iIzAwYmNkNCIgb3BhY2l0eT0iMC45Ii8+PHRleHQgeD0iMjAwIiB5PSIyMDAiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IiNlMGYyZmUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5TUEFDRSBXQVJSSU9SUzwvdGV4dD48L3N2Zz4=",
                                markdown: `
# Space Warriors

Embark on an **epic journey** across the cosmos in Space Warriors, where tactical combat meets exploration in the vast expanse of space.

## Game Features
- Massive space battles with up to 100 ships
- Explore over 50 unique star systems
- Customize your fleet with advanced technology
- Multiplayer campaigns for up to 8 players

## Controls
| Action | Key |
|--------|-----|
| Move | WASD |
| Fire | Space |
| Shield | Shift |
| Boost | Ctrl |
                                `
                            }
                        ]
                    }
                },
                {
                    title: "RPG Collection",
                    description: "Immersive role-playing games with rich storylines and character development.",
                    folder: {
                        items: [
                            {
                                title: "Fantasy Realms",
                                description: "A classic fantasy RPG with magic, dragons, and epic quests that span multiple kingdoms.",
                                image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImZhbnRhc3lHcmFkaWVudCIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3R5bGU9InN0b3AtY29sb3I6IzJhMWEyYTtzdG9wLW9wYWNpdHk6MSIgLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiM0YTJhNGE7c3RvcC1vcGFjaXR5OjEiIC8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9InVybCgjZmFudGFzeUdyYWRpZW50KSIvPjxwb2x5Z29uIHBvaW50cz0iMjAwLDUwIDIyMCw5MCAyNjAsOTAgMjMwLDEyMCAyNDAsMTYwIDIwMCwxNDAgMTYwLDE2MCAxNzAsMTIwIDE0MCw5MCAMTgwLDkwIiBmaWxsPSIjZmZkNzAwIiBvcGFjaXR5PSIwLjgiLz48Y2lyY2xlIGN4PSIzMDAiIGN5PSI4MCIgcj0iNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmMDA4MCIgc3Ryb2tlLXdpZHRoPSIzIiBvcGFjaXR5PSIwLjYiLz48dGV4dCB4PSIyMDAiIHk9IjIyMCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjIwIiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0iI2ZmMDA4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkZBTlRBU1kgUkVBTE1TPC90ZXh0Pjwvc3ZnPg=="
                            },
                            {
                                title: "Modern Adventures",
                                description: "Contemporary RPG with modern settings and complex characters.",
                                showImage: false, // This folder won't show an image
                                folder: {
                                    items: [
                                        {
                                            title: "City Detective",
                                            description: "Solve mysteries in a noir-style detective RPG set in a rain-soaked metropolis.",
                                            image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9Im5vaXJHcmFkaWVudCIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3R5bGU9InN0b3AtY29sb3I6IzBhMGEwYTtzdG9wLW9wYWNpdHk6MSIgLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiMxYTFhMWE7c3RvcC1vcGFjaXR5OjEiIC8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9InVybCgjbm9pckdyYWRpZW50KSIvPjxyZWN0IHg9IjUwIiB5PSI1MCIgd2lkdGg9IjMwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIyIiBvcGFjaXR5PSIwLjMiLz48Y2lyY2xlIGN4PSIyMDAiIGN5PSIxNTAiIHI9IjMwIiBmaWxsPSIjZmZmZmZmIiBvcGFjaXR5PSIwLjEiLz48dGV4dCB4PSIyMDAiIHk9IjI3MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE4IiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0iI2ZmZmZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkNJVFkgREVURUNUSVZFPC90ZXh0Pjwvc3ZnPg==",
                                            markdown: `
# City Detective

## The Case Awaits

In the **rain-soaked streets** of Metro City, crime never sleeps. As Detective Sarah Chen, you'll navigate through:

### Investigation Tools
- 🔍 **Evidence Scanner**: Analyze crime scenes
- 📱 **Digital Forensics**: Hack into suspects' devices  
- 🗣️ **Interrogation System**: Read body language and lies

### Key Features
- **Branching Investigations**: Multiple solutions to each case
- **Moral Choices**: Your decisions affect the city's fate
- **Character Development**: Build relationships with NPCs
- **Atmospheric Setting**: Film noir meets modern technology

\`\`\`javascript
// Sample evidence analysis
function analyzeEvidence(evidence) {
    return evidence.fingerprints.match(suspectDatabase);
}
\`\`\`

*"In this city, everyone has secrets. Your job is to uncover the right ones."*
                                            `
                                        },
                                        {
                                            title: "Corporate Espionage",
                                            description: "Navigate the dangerous world of corporate secrets and industrial espionage.",
                                            showImage: false // This item won't show an image
                                        }
                                    ]
                                }
                            }
                        ]
                    }
                },
                {
                    title: "Indie Gems",
                    description: "Unique and creative independent games that push the boundaries of interactive entertainment.",
                    image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImluZGllR3JhZGllbnQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiMzYjgyZjY7c3RvcC1vcGFjaXR5OjEiIC8+PHN0b3Agb2Zmc2V0PSI1MCUiIHN0eWxlPSJzdG9wLWNvbG9yOiM4YjVjZjY7c3RvcC1vcGFjaXR5OjEiIC8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojZjU5ZTBiO3N0b3Atb3BhY2l0eToxIiAvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSJ1cmwoI2luZGllR3JhZGllbnQpIi8+PGNpcmNsZSBjeD0iMTAwIiBjeT0iMTAwIiByPSIyMCIgZmlsbD0iI2ZmZmZmZiIgb3BhY2l0eT0iMC44Ii8+PGNpcmNsZSBjeD0iMzAwIiBjeT0iMjAwIiByPSIxNSIgZmlsbD0iI2ZmZmZmZiIgb3BhY2l0eT0iMC42Ii8+PHBvbHlnb24gcG9pbnRzPSIyMDAsMTAwIDIyMCwxMjAgMjAwLDE0MCAyMDAsMTQwIDE4MCwxMjAiIGZpbGw9IiNmZmZmZmYiIG9wYWNpdHk9IjAuOSIvPjx0ZXh0IHg9IjIwMCIgeT0iMjUwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjAiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSIjZmZmZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SU5ESUUgR0VNUzwvdGV4dD48L3N2Zz4=",
                    markdown: `
# Indie Gems Collection

Welcome to our curated collection of **independent games** that showcase creativity, innovation, and artistic vision.

## What Makes Indie Games Special?

> Indie games represent the pure essence of creative freedom in game development.

### Our Selection Criteria
1. **Innovation**: Games that introduce new mechanics or concepts
2. **Artistic Vision**: Unique visual and audio design
3. **Storytelling**: Compelling narratives that resonate
4. **Community Impact**: Games that have influenced the industry

## Featured Categories
- 🎨 **Artistic Masterpieces**
- 🧩 **Puzzle Innovators** 
- 📖 **Narrative Adventures**
- 🎵 **Music-Driven Experiences**

*Discover your next favorite game in our carefully curated indie collection.*
                    `
                },
                {
                    title: "Pixel Art Adventures",
                    description: "Beautiful pixel art games with retro charm and modern gameplay mechanics.",
                    showImage: false // This folder shows no image, just title and description
                },
                {
                    title: "VR Experiences",
                    description: "Immersive virtual reality games that transport you to other worlds."
                    // No image property and no showImage: false means it will show default icon
                }
            ]
        };

        class GameShowcase {
            constructor() {
                this.currentPath = [];
                this.currentData = showcaseData;
                this.searchTerm = '';
                this.currentView = 'grid';
                
                this.initializeElements();
                this.setupEventListeners();
                this.loadFromURL();
                this.render();
            }

            initializeElements() {
                this.showcaseContainer = document.getElementById('showcaseContainer');
                this.breadcrumbNav = document.getElementById('breadcrumbNav');
                this.backButton = document.getElementById('backButton');
                this.searchBox = document.getElementById('searchBox');
                this.themeSelector = document.getElementById('themeSelector');
                this.modal = document.getElementById('itemModal');
                this.modalTitle = document.getElementById('modalTitle');
                this.modalBody = document.getElementById('modalBody');
                this.modalClose = document.getElementById('modalClose');
            }

            setupEventListeners() {
                // Theme selector
                this.themeSelector.addEventListener('change', (e) => {
                    document.body.setAttribute('data-theme', e.target.value);
                    localStorage.setItem('theme', e.target.value);
                });

                // Load saved theme
                const savedTheme = localStorage.getItem('theme') || 'dark';
                document.body.setAttribute('data-theme', savedTheme);
                this.themeSelector.value = savedTheme;

                // Load saved view
                const savedView = localStorage.getItem('view') || 'grid';
                this.currentView = savedView;

                // Search functionality
                this.searchBox.addEventListener('input', (e) => {
                    this.searchTerm = e.target.value.toLowerCase();
                    this.render();
                });

                // Back button
                this.backButton.addEventListener('click', () => {
                    this.navigateBack();
                });

                // View toggles
                document.querySelectorAll('.view-toggle').forEach(toggle => {
                    toggle.addEventListener('click', (e) => {
                        const view = e.currentTarget.dataset.view;
                        this.setView(view);
                    });
                });

                // Modal controls
                this.modalClose.addEventListener('click', () => {
                    this.closeModal();
                });

                this.modal.addEventListener('click', (e) => {
                    if (e.target === this.modal) {
                        this.closeModal();
                    }
                });

                // Keyboard shortcuts
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape') {
                        this.closeModal();
                    }
                    if (e.key === 'Backspace' && e.ctrlKey && this.currentPath.length > 0) {
                        this.navigateBack();
                    }
                });

                // Handle browser back/forward
                window.addEventListener('popstate', () => {
                    this.loadFromURL();
                    this.render();
                });
            }

            setView(view) {
                this.currentView = view;
                localStorage.setItem('view', view);
                
                // Update active toggle
                document.querySelectorAll('.view-toggle').forEach(toggle => {
                    toggle.classList.toggle('active', toggle.dataset.view === view);
                });
                
                this.render();
            }

            loadFromURL() {
                const urlParams = new URLSearchParams(window.location.search);
                const path = urlParams.get('path');
                
                if (path) {
                    this.currentPath = path.split('/').filter(p => p);
                } else {
                    this.currentPath = [];
                }
            }

            updateURL() {
                const path = this.currentPath.join('/');
                const url = path ? `?path=${encodeURIComponent(path)}` : window.location.pathname;
                window.history.pushState({}, '', url);
            }

            getCurrentData() {
                let data = showcaseData;
                
                for (const pathSegment of this.currentPath) {
                    if (data.items) {
                        const item = data.items.find(item => 
                            this.slugify(item.title) === pathSegment
                        );
                        if (item && item.folder) {
                            data = item.folder;
                        } else {
                            // Path not found, reset to root
                            this.currentPath = [];
                            return showcaseData;
                        }
                    }
                }
                
                return data;
            }

            slugify(text) {
                return text.toLowerCase()
                    .replace(/[^\w\s-]/g, '')
                    .replace(/[\s_-]+/g, '-')
                    .replace(/^-+|-+$/g, '');
            }

            navigateTo(item) {
                if (item.folder) {
                    this.currentPath.push(this.slugify(item.title));
                    this.updateURL();
                    this.render();
                } else if (item.markdown) {
                    this.showItemModal(item);
                }
            }

            navigateBack() {
                if (this.currentPath.length > 0) {
                    this.currentPath.pop();
                    this.updateURL();
                    this.render();
                }
            }

            navigateToBreadcrumb(index) {
                this.currentPath = this.currentPath.slice(0, index);
                this.updateURL();
                this.render();
            }

            showItemModal(item) {
                this.modalTitle.textContent = item.title;
                
                let modalContent = '';
                
                if (item.image) {
                    modalContent += `<img src="${item.image}" alt="${item.title}" class="modal-image">`;
                }
                
                if (item.markdown) {
                    modalContent += `<div class="markdown-content">${marked.parse(item.markdown)}</div>`;
                } else if (item.description) {
                    modalContent += `<p>${item.description}</p>`;
                }
                
                this.modalBody.innerHTML = modalContent;
                this.modal.classList.add('active');
                document.body.style.overflow = 'hidden';
                
                // Highlight code blocks
                if (window.Prism) {
                    Prism.highlightAllUnder(this.modalBody);
                }
            }

            closeModal() {
                this.modal.classList.remove('active');
                document.body.style.overflow = '';
            }

            filterItems(items) {
                if (!this.searchTerm) return items;
                
                return items.filter(item => 
                    item.title.toLowerCase().includes(this.searchTerm) ||
                    (item.description && item.description.toLowerCase().includes(this.searchTerm))
                );
            }

            renderBreadcrumb() {
                const breadcrumbItems = ['🏠 Home'];
                let currentData = showcaseData;
                
                for (const pathSegment of this.currentPath) {
                    if (currentData.items) {
                        const item = currentData.items.find(item => 
                            this.slugify(item.title) === pathSegment
                        );
                        if (item) {
                            breadcrumbItems.push(item.title);
                            if (item.folder) {
                                currentData = item.folder;
                            }
                        }
                    }
                }

                this.breadcrumbNav.innerHTML = breadcrumbItems.map((item, index) => {
                    const isLast = index === breadcrumbItems.length - 1;
                    const isFirst = index === 0;
                    
                    let html = '';
                    if (!isFirst) {
                        html += '<span class="breadcrumb-separator"><i class="fas fa-chevron-right"></i></span>';
                    }
                    
                    html += `<a href="#" class="breadcrumb-item ${isLast ? 'active' : ''}" 
                             onclick="gameShowcase.navigateToBreadcrumb(${index}); return false;"
                             title="Navigate to ${item}">
                             ${item}
                           </a>`;
                    
                    return html;
                }).join('');
            }

            renderShowcase() {
                const currentData = this.getCurrentData();
                const items = currentData.items || [];
                const filteredItems = this.filterItems(items);

                // Show/hide back button
                this.backButton.style.display = this.currentPath.length > 0 ? 'inline-flex' : 'none';

                // Set active view toggle
                document.querySelectorAll('.view-toggle').forEach(toggle => {
                    toggle.classList.toggle('active', toggle.dataset.view === this.currentView);
                });

                if (filteredItems.length === 0) {
                    this.showcaseContainer.innerHTML = `
                        <div class="empty-state">
                            <i class="fas fa-search"></i>
                            <h3>No items found</h3>
                            <p>${this.searchTerm ? 'Try adjusting your search terms' : 'This folder is empty'}</p>
                        </div>
                    `;
                    return;
                }

                const showcaseHTML = `
                    <div class="showcase-grid ${this.currentView}-view">
                        ${filteredItems.map(item => this.renderItem(item)).join('')}
                    </div>
                `;

                this.showcaseContainer.innerHTML = showcaseHTML;

                // Add click listeners
                this.showcaseContainer.querySelectorAll('.showcase-item').forEach((element, index) => {
                    element.addEventListener('click', () => {
                        this.navigateTo(filteredItems[index]);
                    });
                });
            }

            renderItem(item) {
                const hasFolder = !!item.folder;
                const hasImage = item.image || (item.showImage !== false && !hasFolder);
                const hasMarkdown = !!item.markdown;
                const isListView = this.currentView === 'list';
                const isCompactView = this.currentView === 'compact';
                
                let itemClasses = 'showcase-item';
                if (!hasImage) itemClasses += ' no-image';
                if (isListView) itemClasses += ' list-item';

                let imageContent = '';
                if (hasImage) {
                    const imageClasses = `showcase-image ${isCompactView ? 'compact' : ''} ${isListView ? 'list-image' : ''}`;
                    if (item.image) {
                        imageContent = `
                            <div class="${imageClasses}">
                                <img src="${item.image}" alt="${item.title}" loading="lazy">
                            </div>
                        `;
                    } else {
                        const iconClass = hasFolder ? 'fa-folder' : (hasMarkdown ? 'fa-file-alt' : 'fa-gamepad');
                        imageContent = `
                            <div class="${imageClasses}">
                                <i class="fas ${iconClass} placeholder-icon"></i>
                            </div>
                        `;
                    }
                }

                const contentClasses = `showcase-content ${isCompactView ? 'compact' : ''} ${isListView ? 'list-content' : ''}`;
                const titleClasses = `showcase-title ${isCompactView ? 'compact' : ''}`;
                const descClasses = `showcase-description ${isCompactView ? 'compact' : ''}`;

                let badge = '';
                if (hasFolder) {
                    badge = '<span class="item-type-badge">Folder</span>';
                } else if (hasMarkdown) {
                    badge = '<span class="item-type-badge">Info</span>';
                }

                return `
                    <div class="${itemClasses}" role="button" tabindex="0" aria-label="${item.title}${hasFolder ? ' (folder)' : ''}">
                        ${imageContent}
                        <div class="${contentClasses}">
                            <h3 class="${titleClasses}">
                                ${hasFolder ? '<i class="fas fa-folder folder-icon" aria-hidden="true"></i>' : ''}
                                ${item.title}
                            </h3>
                            ${item.description ? `<p class="${descClasses}">${item.description}</p>` : ''}
                        </div>
                        ${badge}
                    </div>
                `;
            }

            render() {
                this.renderBreadcrumb();
                this.renderShowcase();
            }
        }

        // Initialize the showcase
        const gameShowcase = new GameShowcase();

        // Initialize view toggles
        document.addEventListener('DOMContentLoaded', () => {
            const savedView = localStorage.getItem('view') || 'grid';
            gameShowcase.setView(savedView);
        });