    // Default showcase data structure
    let showcaseData = {
        title: "Game Showcase",
        items: [{
            title: "Sample Game",
            description: "This is a sample game entry. Edit or delete this to get started!",
            image: "",
            showImage: true,
            markdown: "# Sample Game\n\nThis is a **sample game** with markdown content.\n\n## Features\n- Feature 1\n- Feature 2\n- Feature 3\n\n```javascript\nconsole.log('Hello, World!');\n```"
        }]
    };

    let currentEditingPath = [];
    let currentEditingItem = null;

    class ShowcaseEditor {
        constructor() {
            this.loadData();
            this.render();
        }

        loadData() {
            const saved = localStorage.getItem('showcaseData');
            if (saved) {
                try {
                    showcaseData = JSON.parse(saved);
                } catch (e) {
                    console.error('Failed to load saved data:', e);
                    this.showToast('Failed to load saved data', 'error');
                }
            }
        }

        saveData() {
            try {
                localStorage.setItem('showcaseData', JSON.stringify(showcaseData));
                this.showToast('Data saved successfully!', 'success');
            } catch (e) {
                console.error('Failed to save data:', e);
                this.showToast('Failed to save data', 'error');
            }
        }

        render() {
            this.renderTree();
            this.updateItemCount();
        }

        renderTree() {
            const container = document.getElementById('treeContainer');
            container.innerHTML = this.renderTreeItems(showcaseData.items, []);
        }

        renderTreeItems(items, path) {
            if (!items || items.length === 0) {
                return '<p class="text-muted">No items</p>';
            }

            return items.map((item, index) => {
                const currentPath = [...path, index];
                const pathString = currentPath.join('-');
                const isFolder = !!item.folder;
                const isActive = this.pathsEqual(currentPath, currentEditingPath);

                let html = `
    <div class="tree-item ${isFolder ? 'folder' : ''} ${isActive ? 'active' : ''}"
    onclick="editor.selectItem([${currentPath.join(',')}])">
    <div class="tree-item-content">
    <div class="tree-item-info">
    <div class="tree-item-title">
    <i class="fas ${isFolder ? 'fa-folder' : 'fa-file-alt'}"></i>
    ${item.title || 'Untitled'}
    </div>
    ${item.description ? `<div class="tree-item-desc">${item.description.substring(0, 50)}${item.description.length > 50 ? '...' : ''}</div>` : ''}
    </div>
    <div class="tree-item-actions">
    ${isFolder ? `<button class="tree-item-btn" onclick="event.stopPropagation(); editor.addChildItem([${currentPath.join(',')}])" title="Add Child">
    <i class="fas fa-plus"></i>
    </button>` : ''}
    <button class="tree-item-btn delete" onclick="event.stopPropagation(); editor.deleteItem([${currentPath.join(',')}])" title="Delete">
    <i class="fas fa-trash"></i>
    </button>
    </div>
    </div>
    </div>
    `;

                if (isFolder && item.folder.items) {
                    html += `<div class="tree-children">${this.renderTreeItems(item.folder.items, currentPath.concat(['folder', 'items']))}</div>`;
                }

                return html;
            }).join('');
        }

        pathsEqual(path1, path2) {
            if (path1.length !== path2.length) return false;
            return path1.every((val, index) => val === path2[index]);
        }

        selectItem(path) {
            currentEditingPath = path;
            currentEditingItem = this.getItemByPath(path);
            this.renderForm();
            this.render();
        }

        getItemByPath(path) {
            let current = showcaseData;
            for (let i = 0; i < path.length; i++) {
                const segment = path[i];
                if (segment === 'folder' || segment === 'items') {
                    current = current[segment];
                } else {
                    current = current.items[segment];
                }
            }
            return current;
        }

        setItemByPath(path, item) {
            let current = showcaseData;
            for (let i = 0; i < path.length - 1; i++) {
                const segment = path[i];
                if (segment === 'folder' || segment === 'items') {
                    current = current[segment];
                } else {
                    current = current.items[segment];
                }
            }
            const lastSegment = path[path.length - 1];
            if (lastSegment === 'folder' || lastSegment === 'items') {
                current[lastSegment] = item;
            } else {
                current.items[lastSegment] = item;
            }
        }

        renderForm() {
            const container = document.getElementById('formContainer');

            if (!currentEditingItem) {
                container.innerHTML = '<p class="text-muted">Select an item to edit, or create a new one.</p>';
                return;
            }

            const item = currentEditingItem;
            const isFolder = !!item.folder;

            container.innerHTML = `
    <form onsubmit="editor.saveCurrentItem(event)">
    <div class="form-group">
    <label class="form-label">Title *</label>
    <input type="text" class="form-input" id="itemTitle" value="${item.title || ''}" required>
    </div>

    <div class="form-group">
    <label class="form-label">Description</label>
    <textarea class="form-textarea" id="itemDescription" placeholder="Brief description of this item...">${item.description || ''}</textarea>
    </div>

    <div class="form-group">
    <div class="checkbox-group">
    <input type="checkbox" class="checkbox" id="isFolder" ${isFolder ? 'checked' : ''} onchange="editor.toggleFolder()">
    <label class="form-label" for="isFolder">This is a folder</label>
    </div>
    </div>

    ${!isFolder ? `
    <div class="form-group">
    <div class="checkbox-group">
    <input type="checkbox" class="checkbox" id="showImage" ${item.showImage !== false ? 'checked' : ''}>
    <label class="form-label" for="showImage">Show image placeholder</label>
    </div>
    </div>

    <div class="form-group">
    <label class="form-label">Image (Base64 or URL)</label>
    <div class="image-upload ${item.image ? 'has-image' : ''}" onclick="document.getElementById('imageInput').click()">
    <input type="file" id="imageInput" accept="image/*" style="display: none;" onchange="editor.handleImageUpload(event)">
    <i class="fas fa-cloud-upload-alt"></i>
    <p>Click to upload image or paste URL below</p>
    </div>
    <input type="text" class="form-input" id="itemImage" value="${item.image || ''}" placeholder="Or paste image URL here..." style="margin-top: 0.5rem;">
    ${item.image ? `<img src="${item.image}" class="image-preview" alt="Preview">` : ''}
    </div>

    <div class="form-group">
    <label class="form-label">Markdown Content</label>
    <textarea class="form-textarea markdown" id="itemMarkdown" placeholder="# Title\n\nYour markdown content here...\n\n## Features\n- Feature 1\n- Feature 2\n\n![Image](data:image/...)">${item.markdown || ''}</textarea>
    <button type="button" class="btn secondary" onclick="editor.previewMarkdown()" style="margin-top: 0.5rem;">
    <i class="fas fa-eye"></i>
    Preview Markdown
    </button>
    <div id="markdownPreview" class="markdown-preview" style="display: none;"></div>
    </div>
    ` : ''}

    <div style="display: flex; gap: 1rem; margin-top: 2rem;">
    <button type="submit" class="btn success">
    <i class="fas fa-save"></i>
    Save Changes
    </button>
    <button type="button" class="btn secondary" onclick="editor.clearSelection()">
    <i class="fas fa-times"></i>
    Cancel
    </button>
    </div>
    </form>
    `;
        }

        toggleFolder() {
            const isFolder = document.getElementById('isFolder').checked;
            if (isFolder && !currentEditingItem.folder) {
                currentEditingItem.folder = {
                    items: []
                };
            } else if (!isFolder && currentEditingItem.folder) {
                delete currentEditingItem.folder;
            }
            this.renderForm();
        }

        handleImageUpload(event) {
            const file = event.target.files[0];
            if (!file) return;

            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                this.showToast('Image too large. Please use an image under 5MB.', 'error');
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                document.getElementById('itemImage').value = e.target.result;
                this.renderForm();
            };
            reader.readAsDataURL(file);
        }

        previewMarkdown() {
            const markdown = document.getElementById('itemMarkdown').value;
            const preview = document.getElementById('markdownPreview');

            if (markdown.trim()) {
                preview.innerHTML = marked.parse(markdown);
                preview.style.display = 'block';
            } else {
                preview.style.display = 'none';
            }
        }

        saveCurrentItem(event) {
            event.preventDefault();

            if (!currentEditingItem) return;

            const title = document.getElementById('itemTitle').value;
            const description = document.getElementById('itemDescription').value;
            const isFolder = document.getElementById('isFolder').checked;

            currentEditingItem.title = title;
            currentEditingItem.description = description;

            if (!isFolder) {
                const showImage = document.getElementById('showImage').checked;
                const image = document.getElementById('itemImage').value;
                const markdown = document.getElementById('itemMarkdown').value;

                currentEditingItem.showImage = showImage;
                currentEditingItem.image = image;
                currentEditingItem.markdown = markdown;

                // Clean up folder properties if switching from folder to item
                delete currentEditingItem.folder;
            } else {
                // Ensure folder structure exists
                if (!currentEditingItem.folder) {
                    currentEditingItem.folder = {
                        items: []
                    };
                }

                // Clean up item properties if switching from item to folder
                delete currentEditingItem.showImage;
                delete currentEditingItem.image;
                delete currentEditingItem.markdown;
            }

            this.saveData();
            this.render();
            this.showToast('Item saved successfully!', 'success');
        }

        addRootItem() {
            const newItem = {
                title: "New Item",
                description: "",
                showImage: true,
                image: "",
                markdown: ""
            };

            showcaseData.items.push(newItem);
            const newPath = [showcaseData.items.length - 1];
            this.selectItem(newPath);
            this.render();
        }

        addChildItem(parentPath) {
            const parent = this.getItemByPath(parentPath);
            if (!parent.folder) {
                parent.folder = {
                    items: []
                };
            }

            const newItem = {
                title: "New Item",
                description: "",
                showImage: true,
                image: "",
                markdown: ""
            };

            parent.folder.items.push(newItem);
            const newPath = [...parentPath, 'folder', 'items', parent.folder.items.length - 1];
            this.selectItem(newPath);
            this.render();
        }

        deleteItem(path) {
            if (confirm('Are you sure you want to delete this item and all its children?')) {
                const parentPath = path.slice(0, -1);
                const index = path[path.length - 1];

                if (parentPath.length === 0) {
                    showcaseData.items.splice(index, 1);
                } else {
                    const parent = this.getItemByPath(parentPath);
                    parent.splice(index, 1);
                }

                this.clearSelection();
                this.saveData();
                this.render();
                this.showToast('Item deleted successfully!', 'success');
            }
        }

        clearSelection() {
            currentEditingPath = [];
            currentEditingItem = null;
            this.renderForm();
            this.render();
        }

        updateItemCount() {
            const count = this.countItems(showcaseData.items);
            document.getElementById('itemCount').textContent = `${count} items`;
        }

        countItems(items) {
            if (!items) return 0;
            let count = items.length;
            items.forEach(item => {
                if (item.folder && item.folder.items) {
                    count += this.countItems(item.folder.items);
                }
            });
            return count;
        }

        exportJSON() {
            document.getElementById('jsonOutput').textContent = JSON.stringify(showcaseData, null, 2);
            this.showModal('jsonModal');
        }

        importJSON() {
            this.showModal('importModal');
        }

        processImport() {
            const jsonText = document.getElementById('importTextarea').value;
            try {
                const imported = JSON.parse(jsonText);
                if (imported.items && Array.isArray(imported.items)) {
                    showcaseData = imported;
                    this.saveData();
                    this.clearSelection();
                    this.render();
                    this.closeModal('importModal');
                    this.showToast('Data imported successfully!', 'success');
                } else {
                    throw new Error('Invalid data structure');
                }
            } catch (e) {
                this.showToast('Invalid JSON data. Please check the format.', 'error');
            }
        }

        copyJSON() {
            const jsonText = document.getElementById('jsonOutput').textContent;
            navigator.clipboard.writeText(jsonText).then(() => {
                this.showToast('JSON copied to clipboard!', 'success');
            }).catch(() => {
                this.showToast('Failed to copy to clipboard', 'error');
            });
        }

        previewShowcase() {
            // Save current data and open showcase in new tab
            this.saveData();
            const showcaseURL = '../Showcase/showcase.html';
            window.open(showcaseURL, '_blank');
        }

        showModal(modalId) {
            document.getElementById(modalId).classList.add('active');
        }

        closeModal(modalId) {
            document.getElementById(modalId).classList.remove('active');
        }

        showToast(message, type = 'success') {
            const toast = document.createElement('div');
            toast.className = `toast ${type}`;
            toast.innerHTML = `<i class="fas ${type === 'success' ? 'fa-check' : type === 'error' ? 'fa-exclamation-triangle' : 'fa-info'}"></i> ${message}`;

            document.body.appendChild(toast);

            setTimeout(() => toast.classList.add('show'), 100);
            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => document.body.removeChild(toast), 300);
            }, 3000);
        }
    }

    // Global functions
    const editor = new ShowcaseEditor();

    function saveData() {
        editor.saveData();
    }

    function exportJSON() {
        editor.exportJSON();
    }

    function importJSON() {
        editor.importJSON();
    }

    function processImport() {
        editor.processImport();
    }

    function copyJSON() {
        editor.copyJSON();
    }

    function previewShowcase() {
        editor.previewShowcase();
    }

    function addRootItem() {
        editor.addRootItem();
    }

    function closeModal(modalId) {
        editor.closeModal(modalId);
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey || e.metaKey) {
            switch (e.key) {
                case 's':
                    e.preventDefault();
                    saveData();
                    break;
                case 'n':
                    e.preventDefault();
                    addRootItem();
                    break;
            }
        }
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal.active').forEach(modal => {
                modal.classList.remove('active');
            });
        }
    });