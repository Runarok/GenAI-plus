        // Sample game showcase data structure - 4 levels: Game -> Level Type -> Levels -> Markdown Content
        const showcaseData = {
            title: "Game Showcase",
            items: {
                "call-of-duty": {
                    title: "Call of Duty: Modern Warfare",
                    description: "Intense military FPS action",
                    image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjNjM2NmYxIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTEwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSI0OCI+8J+UqjwvdGV4dD4KPC9zdmc+Cg==",
                    folder: {
                        "campaign": {
                            title: "Campaign Levels",
                            description: "Single-player story missions",
                            image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjZmY2b2ZmIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTEwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSI0OCI+8J+OhzwvdGV4dD4KPC9zdmc+Cg==",
                            folder: {
                                "mission-1": {
                                    title: "Fog of War",
                                    description: "Opening mission in urban warfare",
                                    markdown: `# Fog of War - Mission Briefing
                                    
## Overview
This is the opening mission where you learn the basic mechanics of urban warfare. Navigate through fog-covered streets while engaging enemy forces.

## Mission Objectives
- Secure the checkpoint
- Eliminate hostile forces 
- Extract to the landing zone

## Screenshots

### Initial Spawn Area
![Mission Start](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==)

### Combat Zone
![Urban Combat](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==)

## Tips
- Use cover effectively
- Watch for enemy flanking maneuvers
- Coordinate with your squad`
                                },
                                "mission-2": {
                                    title: "Clean House",
                                    description: "Close-quarters building clearing",
                                    markdown: `# Clean House - Tactical Operations

## Mission Brief
Infiltrate and clear a multi-story building containing high-value targets. Precision and stealth are key.

## Gameplay Screenshots

### Entry Point
![Building Entry](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==)

### CQB Action
![Close Quarters](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==)`
                                }
                            }
                        },
                        "multiplayer": {
                            title: "Multiplayer Maps",
                            description: "Competitive online battlefields",
                            image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjNDBkNGYwIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTEwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSI0OCI+8J+SpDwvdGV4dD4KPC9zdmc+Cg==",
                            folder: {
                                "shipment": {
                                    title: "Shipment",
                                    description: "Fast-paced close-quarters map",
                                    markdown: `# Shipment - Map Overview

## Map Description
A small, intense map set in a shipping container yard. Expect constant action and quick respawns.

## Map Layout
![Shipment Overview](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==)

## Key Features
- Small map size promotes fast gameplay
- Multiple shipping containers provide cover
- Domination and Team Deathmatch modes available`
                                }
                            }
                        }
                    }
                },
                "the-witcher-3": {
                    title: "The Witcher 3: Wild Hunt",
                    description: "Epic fantasy RPG adventure",
                    image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjOGI1Y2Y2Ii8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTEwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSI0OCI+4p2k77iPPC90ZXh0Pgo8L3N2Zz4K",
                    folder: {
                        "main-quests": {
                            title: "Main Quest Areas",
                            description: "Primary storyline locations",
                            folder: {
                                "white-orchard": {
                                    title: "White Orchard",
                                    description: "Starting area - tutorial region",
                                    markdown: `# White Orchard - Starting Region

## Area Overview
White Orchard serves as the tutorial area where players learn the basic mechanics of The Witcher 3.

## Key Locations
- Inn at the Crossroads
- Abandoned village
- Griffin nest

## Screenshots

### Village View
![White Orchard Village](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==)

### Griffin Fight
![Griffin Battle](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==)

## Gameplay Tips
- Complete all tutorial objectives
- Gather herbs and craft items
- Talk to all NPCs for side quests`
                                }
                            }
                        },
                        "side-quests": {
                            title: "Side Quest Areas", 
                            description: "Optional content and exploration",
                            folder: {
                                "velen": {
                                    title: "Velen Contracts",
                                    description: "Witcher contracts in Velen region",
                                    markdown: `# Velen Contracts - Monster Hunting

## Region Overview
Velen is a war-torn swampland filled with monsters, bandits, and desperate people.

## Contract Screenshots

### Swamp Combat
![Velen Swamps](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==)

### Monster Tracking
![Witcher Senses](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==)`
                                }
                            }
                        }
                    }
                }
            }
        };

        // Application state
        let currentPath = [];
        let currentData = showcaseData.items;
        let filteredData = null;
        let searchTerm = '';

        // DOM elements
        const contentDiv = document.getElementById('content');
        const breadcrumbNav = document.getElementById('breadcrumb');
        const searchBar = document.getElementById('searchBar');

        // Theme management
        function initThemes() {
            const themeButtons = document.querySelectorAll('.theme-btn');
            
            themeButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    const theme = btn.dataset.theme;
                    document.body.dataset.theme = theme;
                    
                    themeButtons.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    
                    // Save theme preference
                    localStorage.setItem('theme', theme);
                    updateURL();
                });
            });

            // Load saved theme
            const savedTheme = localStorage.getItem('theme') || 'dark';
            document.body.dataset.theme = savedTheme;
            document.querySelector(`[data-theme="${savedTheme}"]`).classList.add('active');
            document.querySelectorAll('.theme-btn').forEach(btn => {
                if (btn.dataset.theme !== savedTheme) {
                    btn.classList.remove('active');
                }
            });
        }

        // URL parameter management
        function updateURL() {
            const params = new URLSearchParams();
            
            if (currentPath.length > 0) {
                params.set('path', currentPath.join('/'));
            }
            
            if (searchTerm) {
                params.set('search', searchTerm);
            }

            const theme = document.body.dataset.theme;
            if (theme !== 'dark') {
                params.set('theme', theme);
            }

            const newURL = window.location.pathname + (params.toString() ? '?' + params.toString() : '');
            window.history.replaceState({}, '', newURL);
        }

        function parseURL() {
            const params = new URLSearchParams(window.location.search);
            
            // Parse path
            const pathParam = params.get('path');
            if (pathParam) {
                currentPath = pathParam.split('/').filter(p => p);
                navigateToPath(currentPath);
            }

            // Parse search
            const searchParam = params.get('search');
            if (searchParam) {
                searchTerm = searchParam;
                searchBar.value = searchTerm;
                performSearch(searchTerm);
            }

            // Parse theme
            const themeParam = params.get('theme');
            if (themeParam) {
                document.body.dataset.theme = themeParam;
                document.querySelectorAll('.theme-btn').forEach(btn => {
                    btn.classList.toggle('active', btn.dataset.theme === themeParam);
                });
            }
        }

        // Navigation functions
        function navigateToPath(path) {
            currentPath = [...path];
            currentData = showcaseData.items;
            
            for (const segment of path) {
                if (currentData[segment] && currentData[segment].folder) {
                    currentData = currentData[segment].folder;
                } else {
                    // Invalid path, reset to root
                    currentPath = [];
                    currentData = showcaseData.items;
                    break;
                }
            }
            
            filteredData = null;
            searchTerm = '';
            searchBar.value = '';
            updateBreadcrumb();
            renderContent();
            updateURL();
        }

        function navigateToFolder(folderKey) {
            currentPath.push(folderKey);
            currentData = currentData[folderKey].folder;
            filteredData = null;
            searchTerm = '';
            searchBar.value = '';
            updateBreadcrumb();
            renderContent();
            updateURL();
        }

        function navigateBack() {
            if (currentPath.length > 0) {
                currentPath.pop();
                navigateToPath(currentPath);
            }
        }

        function navigateToBreadcrumb(index) {
            const newPath = currentPath.slice(0, index + 1);
            navigateToPath(newPath);
        }

        // Search functionality
        function performSearch(term) {
            searchTerm = term.toLowerCase().trim();
            
            if (!searchTerm) {
                filteredData = null;
                renderContent();
                updateURL();
                return;
            }

            filteredData = {};
            searchInData(showcaseData.items, [], filteredData);
            renderContent();
            updateURL();
        }

        function searchInData(data, path, results) {
            for (const [key, item] of Object.entries(data)) {
                const matchesSearch = 
                    item.title?.toLowerCase().includes(searchTerm) ||
                    item.description?.toLowerCase().includes(searchTerm) ||
                    key.toLowerCase().includes(searchTerm);

                if (matchesSearch) {
                    results[key] = { ...item, _path: [...path, key] };
                }

                if (item.folder) {
                    searchInData(item.folder, [...path, key], results);
                }
            }
        }

        // UI rendering functions
        function updateBreadcrumb() {
            if (currentPath.length === 0) {
                breadcrumbNav.style.display = 'none';
                return;
            }

            breadcrumbNav.style.display = 'flex';
            breadcrumbNav.innerHTML = `
                <a href="#" class="breadcrumb-item" onclick="navigateToPath([])">Home</a>
                ${currentPath.map((segment, index) => `
                    <span class="breadcrumb-separator">></span>
                    <a href="#" class="breadcrumb-item" onclick="navigateToBreadcrumb(${index})">
                        ${getItemTitle(segment, index)}
                    </a>
                `).join('')}
            `;
        }

        function getItemTitle(segment, index) {
            let data = showcaseData.items;
            for (let i = 0; i < index; i++) {
                data = data[currentPath[i]].folder;
            }
            return data[segment]?.title || segment;
        }

        function renderContent() {
            const dataToRender = filteredData || currentData;
            
            if (Object.keys(dataToRender).length === 0) {
                contentDiv.innerHTML = `
                    <div class="empty-state">
                        <h2>No items found</h2>
                        <p>${searchTerm ? `No results for "${searchTerm}"` : 'This folder is empty'}</p>
                    </div>
                `;
                return;
            }

            let html = '';
            
            if (currentPath.length > 0 && !filteredData) {
                html += `<a href="#" class="back-btn" onclick="navigateBack()">← Back</a>`;
            }

            html += `<div class="grid">`;
            
            for (const [key, item] of Object.entries(dataToRender)) {
                const isFolder = !!item.folder;
                const imageSrc = item.image || null;
                const itemPath = item._path ? item._path.join('/') : [...currentPath, key].join('/');
                
                html += `
                    <div class="card" onclick="${isFolder ? `navigateToFolder('${key}')` : `showItemDetails('${key}')`}">
                        ${isFolder ? '<div class="folder-icon">📁</div>' : ''}
                        ${imageSrc ? 
                            `<img src="${imageSrc}" alt="${item.title}" class="card-image">` :
                            `<div class="card-image">🎮</div>`
                        }
                        <div class="card-content">
                            <h3 class="card-title">${item.title || key}</h3>
                            ${item.description ? `<p class="card-description">${item.description}</p>` : ''}
                            ${item._path ? `<p class="card-description" style="font-size: 0.8em; opacity: 0.7;">📂 ${item._path.slice(0, -1).join(' > ')}</p>` : ''}
                        </div>
                    </div>
                `;
            }
            
            html += `</div>`;
            contentDiv.innerHTML = html;
        }

        function showItemDetails(key) {
            const item = (filteredData || currentData)[key];
            
            if (item.markdown) {
                showMarkdownModal(item.markdown, item.title || key);
            } else {
                alert(`${item.title || key}\n\n${item.description || 'No description available'}`);
            }
        }

        function showMarkdownModal(markdownContent, title) {
            // Create modal
            const modal = document.createElement('div');
            modal.className = 'markdown-modal';
            modal.innerHTML = `
                <div class="markdown-content">
                    <div class="markdown-header">
                        <h2 class="markdown-title">${title}</h2>
                        <button class="markdown-close" onclick="closeMarkdownModal()">&times;</button>
                    </div>
                    <div class="markdown-body" id="markdown-body"></div>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            // Convert markdown to HTML (enhanced conversion)
            const htmlContent = convertMarkdownToHTML(markdownContent);
            document.getElementById('markdown-body').innerHTML = htmlContent;
            
            // Close on background click
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeMarkdownModal();
                }
            });

            // Close on Escape key
            const handleEscape = (e) => {
                if (e.key === 'Escape') {
                    closeMarkdownModal();
                    document.removeEventListener('keydown', handleEscape);
                }
            };
            document.addEventListener('keydown', handleEscape);
        }

        function closeMarkdownModal() {
            const modal = document.querySelector('.markdown-modal');
            if (modal) {
                modal.remove();
            }
        }

        function convertMarkdownToHTML(markdown) {
            let html = markdown;
            
            // Headers
            html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
            html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
            html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
            
            // Images with base64 support
            html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img alt="$1" src="$2" />');
            
            // Lists
            html = html.replace(/^\- (.+)$/gim, '<li>$1</li>');
            html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
            
            // Paragraphs
            html = html.split('\n\n').map(paragraph => {
                paragraph = paragraph.trim();
                if (paragraph && !paragraph.startsWith('<')) {
                    return `<p>${paragraph}</p>`;
                }
                return paragraph;
            }).join('\n');
            
            return html;
        }

        // Search bar event listener
        searchBar.addEventListener('input', (e) => {
            performSearch(e.target.value);
        });

        // Initialize application
        function init() {
            initThemes();
            parseURL();
            
            if (currentPath.length === 0 && !searchTerm) {
                updateBreadcrumb();
                renderContent();
            }
        }

        // Handle browser back/forward
        window.addEventListener('popstate', () => {
            parseURL();
        });

        // Start the application
        init();

        // Make functions global for onclick handlers
        window.navigateToPath = navigateToPath;
        window.navigateToFolder = navigateToFolder;
        window.navigateBack = navigateBack;
        window.navigateToBreadcrumb = navigateToBreadcrumb;
        window.showItemDetails = showItemDetails;