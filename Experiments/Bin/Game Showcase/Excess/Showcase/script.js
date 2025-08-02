    class GameShowcase {
        constructor() {
            this.currentPath = [];
            this.showcaseData = null;
            this.searchTerm = '';
            this.currentView = 'grid';

            this.initializeElements();
            this.setupEventListeners();
            this.loadData();
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

        loadData() {
            // Try to load from localStorage first (from editor)
            const saved = localStorage.getItem('showcaseData');
            if (saved) {
                try {
                    this.showcaseData = JSON.parse(saved);
                    this.loadFromURL();
                    this.render();
                    return;
                } catch (e) {
                    console.error('Failed to load saved data:', e);
                }
            }

            // Fallback to default data if no saved data
            this.showcaseData = {
                title: "Game Showcase",
                items: [{
                    title: "Welcome to Game Showcase",
                    description: "Use the editor to create your own showcase content. Click 'Edit Content' in the header to get started!",
                    showImage: false,
                    markdown: `
    # Welcome to Game Showcase! 🎮

    This is your **dynamic game showcase system**. You can create, edit, and organize your game content with ease.

    ## Getting Started

    1. **Click "Edit Content"** in the header to open the visual editor
    2. **Create folders** to organize your games by category
    3. **Add games** with descriptions, images, and detailed markdown content
    4. **Use markdown** to create rich content with images, code blocks, and formatting

    ## Features

    - 📁 **Nested folder structure** for organization
    - 🖼️ **Base64 image support** in both items and markdown
    - 🎨 **Multiple themes** (Dark, Light, Cyberpunk, Ocean)
    - 📱 **Responsive design** with multiple view modes
    - 🔗 **URL parameterization** for sharing direct links
    - ✏️ **Visual editor** for easy content management

    ## Example Markdown Features

    ### Code Blocks
    \`\`\`javascript
    function createAwesomeGame() {
    return "Your next favorite game!";
    }
    \`\`\`

    ### Lists
    - Feature 1
    - Feature 2
    - Feature 3

    ### Images
    You can embed images directly in markdown using base64 or URLs!

    > Start creating your showcase by clicking **"Edit Content"** above!
    `
                }]
            };

            this.loadFromURL();
            this.render();
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
            if (!this.showcaseData) return {
                items: []
            };

            let data = this.showcaseData;

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
                        return this.showcaseData;
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
            if (!this.showcaseData) return;

            const breadcrumbItems = ['🏠 Home'];
            let currentData = this.showcaseData;

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
    ${!this.searchTerm && this.currentPath.length === 0 ? '<p><a href="editor.html" class="edit-btn" style="margin-top: 1rem; display: inline-flex;"><i class="fas fa-edit"></i> Start Creating Content</a></p>' : ''}
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

    // Auto-refresh data when returning from editor
    window.addEventListener('focus', () => {
        gameShowcase.loadData();
    });