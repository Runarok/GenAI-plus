        // Sample game showcase data
        const showcaseData = {
            title: "Game Showcase",
            items: [
                {
                    title: "Action Games",
                    description: "High-octane action and adventure games",
                    folder: {
                        items: [
                            {
                                title: "Cyber Runner 2077",
                                description: "A futuristic cyberpunk action game with stunning visuals and intense combat.",
                                image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzFhMWExYSIvPjx0ZXh0IHg9IjE1MCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiMwMGZmNDEiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5DeWJlciBSdW5uZXIgMjA3NzwvdGV4dD48L3N2Zz4="
                            },
                            {
                                title: "Space Warriors",
                                description: "Epic space battles and exploration in a vast galaxy.",
                                image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzBjMTgyMSIvPjx0ZXh0IHg9IjE1MCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiNlMGYyZmUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5TcGFjZSBXYXJyaW9yczwvdGV4dD48L3N2Zz4="
                            }
                        ]
                    }
                },
                {
                    title: "RPG Collection",
                    description: "Immersive role-playing games with rich storylines",
                    folder: {
                        items: [
                            {
                                title: "Fantasy Realms",
                                description: "A classic fantasy RPG with magic, dragons, and epic quests.",
                                image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzJhMWEyYSIvPjx0ZXh0IHg9IjE1MCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiNmZjAwODAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5GYW50YXN5IFJlYWxtczwvdGV4dD48L3N2Zz4="
                            },
                            {
                                title: "Modern Adventures",
                                description: "Contemporary RPG with modern settings and complex characters.",
                                folder: {
                                    items: [
                                        {
                                            title: "City Detective",
                                            description: "Solve mysteries in a noir-style detective RPG.",
                                            image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzFhMWExYSIvPjx0ZXh0IHg9IjE1MCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiNmZmZmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5DaXR5IERldGVjdGl2ZTwvdGV4dD48L3N2Zz4="
                                        }
                                    ]
                                }
                            }
                        ]
                    }
                },
                {
                    title: "Indie Gems",
                    description: "Unique and creative independent games",
                    image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzNiODJmNiIvPjx0ZXh0IHg9IjE1MCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW5kaWUgR2VtczwvdGV4dD48L3N2Zz4="
                },
                {
                    title: "Pixel Art Adventures",
                    description: "Beautiful pixel art games with retro charm"
                }
            ]
        };

        class GameShowcase {
            constructor() {
                this.currentPath = [];
                this.currentData = showcaseData;
                this.filteredData = null;
                this.searchTerm = '';
                
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

                // Search functionality
                this.searchBox.addEventListener('input', (e) => {
                    this.searchTerm = e.target.value.toLowerCase();
                    this.render();
                });

                // Back button
                this.backButton.addEventListener('click', () => {
                    this.navigateBack();
                });

                // Handle browser back/forward
                window.addEventListener('popstate', () => {
                    this.loadFromURL();
                    this.render();
                });
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

            filterItems(items) {
                if (!this.searchTerm) return items;
                
                return items.filter(item => 
                    item.title.toLowerCase().includes(this.searchTerm) ||
                    (item.description && item.description.toLowerCase().includes(this.searchTerm))
                );
            }

            renderBreadcrumb() {
                const breadcrumbItems = ['Home'];
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
                             onclick="gameShowcase.navigateToBreadcrumb(${index}); return false;">
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
                    <div class="showcase-grid">
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
                const imageContent = item.image 
                    ? `<img src="${item.image}" alt="${item.title}">`
                    : `<i class="fas ${hasFolder ? 'fa-folder' : 'fa-gamepad'}"></i>`;

                return `
                    <div class="showcase-item">
                        <div class="showcase-image">
                            ${imageContent}
                        </div>
                        <div class="showcase-content">
                            <h3 class="showcase-title">
                                ${hasFolder ? '<i class="fas fa-folder folder-icon"></i>' : ''}
                                ${item.title}
                            </h3>
                            ${item.description ? `<p class="showcase-description">${item.description}</p>` : ''}
                        </div>
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