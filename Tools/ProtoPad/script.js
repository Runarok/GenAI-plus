class NotePadApp {
    constructor() {
        this.tabs = [];
        this.activeTabId = null;
        this.nextTabId = 1;
        this.settings = {
            theme: 'blue',
            author: 'Runarok',
            includeWatermark: true
        };
        
        this.init();
    }

    init() {
        this.loadSettings();
        this.applyTheme();
        this.setupEventListeners();
        this.createNewTab();
        this.loadAutoSaveData();
        this.autoResizeEditor();
    }

    setupEventListeners() {
        // Theme toggle
        document.getElementById('themeToggle').addEventListener('click', () => {
            this.cycleTheme();
        });

        // Settings
        document.getElementById('settingsBtn').addEventListener('click', () => {
            this.openSettings();
        });

        document.getElementById('closeSettings').addEventListener('click', () => {
            this.closeSettings();
        });

        // New tab
        document.getElementById('newTabBtn').addEventListener('click', () => {
            this.createNewTab();
        });

        // Download
        document.getElementById('downloadBtn').addEventListener('click', () => {
            this.downloadFile();
        });

        // Editor events
        const editor = document.getElementById('editor');
        const fileName = document.getElementById('fileName');
        
        editor.addEventListener('input', () => {
            this.updateStats();
            this.autoResizeEditor();
            this.autoSave();
        });

        fileName.addEventListener('input', () => {
            this.updateTabName();
            this.autoSave();
        });

        // Settings events
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setTheme(e.currentTarget.dataset.theme);
            });
        });

        document.getElementById('authorName').addEventListener('input', (e) => {
            this.settings.author = e.target.value;
            this.saveSettings();
        });

        document.getElementById('includeWatermark').addEventListener('change', (e) => {
            this.settings.includeWatermark = e.target.checked;
            this.saveSettings();
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 's') {
                e.preventDefault();
                this.downloadFile();
            } else if (e.ctrlKey && e.key === 'n') {
                e.preventDefault();
                this.createNewTab();
            } else if (e.ctrlKey && e.shiftKey && e.key === 'P') {
                e.preventDefault();
                this.openSettings();
            }
        });

        // Modal close on outside click
        document.getElementById('settingsModal').addEventListener('click', (e) => {
            if (e.target === e.currentTarget) {
                this.closeSettings();
            }
        });

    }

    cycleTheme() {
        const themes = ['dark', 'light', 'blue', 'purple'];
        const currentIndex = themes.indexOf(this.settings.theme);
        const nextIndex = (currentIndex + 1) % themes.length;
        this.setTheme(themes[nextIndex]);
    }

    setTheme(theme) {
        this.settings.theme = theme;
        this.applyTheme();
        this.saveSettings();
        this.updateThemeButtons();
    }

    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.settings.theme);
        
        // Update theme toggle icon
        const themeIcon = document.querySelector('#themeToggle i');
        const icons = {
            dark: 'fa-moon',
            light: 'fa-sun',
            blue: 'fa-water',
            purple: 'fa-gem'
        };
        
        themeIcon.className = `fas ${icons[this.settings.theme]}`;
    }

    updateThemeButtons() {
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.theme === this.settings.theme);
        });
    }

    openSettings() {
        const modal = document.getElementById('settingsModal');
        modal.classList.add('show');
        this.updateThemeButtons();
        
        // Update settings form
        document.getElementById('authorName').value = this.settings.author;
        document.getElementById('includeWatermark').checked = this.settings.includeWatermark;
    }

    closeSettings() {
        document.getElementById('settingsModal').classList.remove('show');
    }

    createNewTab() {
        const tab = {
            id: this.nextTabId++,
            name: 'untitled.txt',
            content: '',
            fileName: 'untitled.txt'
        };
        
        this.tabs.push(tab);
        this.renderTabs();
        this.switchToTab(tab.id);
    }

    renderTabs() {
        const container = document.getElementById('tabsContainer');
        container.innerHTML = '';
        
        this.tabs.forEach(tab => {
            const tabElement = document.createElement('div');
            tabElement.className = `tab ${tab.id === this.activeTabId ? 'active' : ''}`;
            tabElement.innerHTML = `
                <span class="tab-name">${tab.name}</span>
                <button class="tab-close" onclick="app.closeTab(${tab.id})">
                    <i class="fas fa-times"></i>
                </button>
            `;
            
            tabElement.addEventListener('click', (e) => {
                if (!e.target.closest('.tab-close')) {
                    this.switchToTab(tab.id);
                }
            });
            
            container.appendChild(tabElement);
        });
    }

    switchToTab(tabId) {
        // Save current tab content
        if (this.activeTabId) {
            const currentTab = this.tabs.find(t => t.id === this.activeTabId);
            if (currentTab) {
                currentTab.content = document.getElementById('editor').value;
                currentTab.fileName = document.getElementById('fileName').value;
                currentTab.name = this.extractFileName(currentTab.fileName);
            }
        }
        
        // Switch to new tab
        this.activeTabId = tabId;
        const tab = this.tabs.find(t => t.id === tabId);
        
        if (tab) {
            document.getElementById('editor').value = tab.content;
            document.getElementById('fileName').value = tab.fileName;
            this.updateStats();
            this.autoResizeEditor();
            this.renderTabs();
        }
    }

    closeTab(tabId) {
        if (this.tabs.length === 1) {
            // Don't close the last tab, just clear it
            this.tabs[0].content = '';
            this.tabs[0].fileName = 'untitled.txt';
            this.tabs[0].name = 'untitled.txt';
            document.getElementById('editor').value = '';
            document.getElementById('fileName').value = 'untitled.txt';
            this.updateStats();
            this.autoResizeEditor();
            this.renderTabs();
            return;
        }
        
        const tabIndex = this.tabs.findIndex(t => t.id === tabId);
        this.tabs.splice(tabIndex, 1);
        
        if (this.activeTabId === tabId) {
            // Switch to adjacent tab
            const newActiveIndex = Math.min(tabIndex, this.tabs.length - 1);
            this.switchToTab(this.tabs[newActiveIndex].id);
        } else {
            this.renderTabs();
        }
    }

    updateTabName() {
        const fileName = document.getElementById('fileName').value;
        const currentTab = this.tabs.find(t => t.id === this.activeTabId);
        if (currentTab) {
            currentTab.fileName = fileName;
            currentTab.name = this.extractFileName(fileName);
            this.renderTabs();
        }
    }

    extractFileName(fileName) {
        return fileName || 'untitled.txt';
    }

    updateStats() {
        const content = document.getElementById('editor').value;
        const words = content.trim() ? content.trim().split(/\s+/).length : 0;
        const chars = content.length;
        
        document.getElementById('wordCount').textContent = `${words} word${words !== 1 ? 's' : ''}`;
        document.getElementById('charCount').textContent = `${chars} character${chars !== 1 ? 's' : ''}`;
    }

    autoResizeEditor() {
        const editor = document.getElementById('editor');
        if (editor) {
            // Reset height to auto to get the correct scrollHeight
            editor.style.height = 'auto';
            // Set height to scrollHeight, but maintain minimum height
            const newHeight = Math.max(400, editor.scrollHeight);
            editor.style.height = newHeight + 'px';
        }
    }

    downloadFile() {
        const content = document.getElementById('editor').value;
        const fileName = document.getElementById('fileName').value || 'untitled.txt';
        
        let finalContent = content;
        
        // Add metadata header
        const metadata = `# File: ${fileName}\n# Author: ${this.settings.author}\n# Created: ${new Date().toISOString()}\n# Generated by: Lightweight Notepad\n\n`;
        
        // Add watermark if enabled
        const watermark = this.settings.includeWatermark ? '\n\n---\nMade with ♥ by Runarok' : '';
        
        finalContent = metadata + content + watermark;
        
        const blob = new Blob([finalContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    autoSave() {
        const currentTab = this.tabs.find(t => t.id === this.activeTabId);
        if (currentTab) {
            currentTab.content = document.getElementById('editor').value;
            currentTab.fileName = document.getElementById('fileName').value;
            currentTab.name = this.extractFileName(currentTab.fileName);
        }
        
        const saveData = {
            tabs: this.tabs,
            activeTabId: this.activeTabId,
            nextTabId: this.nextTabId
        };
        
        localStorage.setItem('notepad_autosave', JSON.stringify(saveData));
    }

    loadAutoSaveData() {
        try {
            const saveData = localStorage.getItem('notepad_autosave');
            if (saveData) {
                const data = JSON.parse(saveData);
                if (data.tabs && data.tabs.length > 0) {
                    this.tabs = data.tabs;
                    this.activeTabId = data.activeTabId;
                    this.nextTabId = data.nextTabId;
                    
                    this.renderTabs();
                    this.switchToTab(this.activeTabId);
                    return;
                }
            }
        } catch (error) {
            console.error('Error loading auto-save data:', error);
        }
    }

    saveSettings() {
        localStorage.setItem('notepad_settings', JSON.stringify(this.settings));
    }

    loadSettings() {
        try {
            const settings = localStorage.getItem('notepad_settings');
            if (settings) {
                this.settings = { ...this.settings, ...JSON.parse(settings) };
            }
        } catch (error) {
            console.error('Error loading settings:', error);
        }
    }
}

// Initialize the app
const app = new NotePadApp();

// Make app globally available for tab close functionality
window.app = app;