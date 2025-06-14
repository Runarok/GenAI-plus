    // Theme toggle
    const btn = document.getElementById('theme-toggle-btn');
    const themeLabel = document.getElementById('theme-label');
    const moonIcon = document.getElementById('moon-icon');
    const sunIcon = document.getElementById('sun-icon');
    function setTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    if (theme === 'light') {
    sunIcon.style.display = 'inline';
    moonIcon.style.display = 'none';
    themeLabel.textContent = 'Light';
    } else {
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'inline';
    themeLabel.textContent = 'Dark';
    }
    localStorage.setItem('theme', theme);
    }
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    btn.onclick = function() {
    setTheme(document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    };