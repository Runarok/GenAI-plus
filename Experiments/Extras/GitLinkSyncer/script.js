    const input = document.getElementById('link');
    const errorEl = document.getElementById('error');
    const output = document.getElementById('output');
    const copyRepoBtn = document.getElementById('copyRepoBtn');
    const openRepoBtn = document.getElementById('openRepoBtn');
    const copyPagesBtn = document.getElementById('copyPagesBtn');
    const openPagesBtn = document.getElementById('openPagesBtn');
    const rawRow = document.getElementById('rawRow');
    const copyRawBtn = document.getElementById('copyRawBtn');
    const openRawBtn = document.getElementById('openRawBtn');
    const toast = document.getElementById('toast');

    let repoURL = '', pagesURL = '', rawURL = '';

    function showToast(msg) {
      toast.textContent = msg;
      toast.className = "show";
      setTimeout(() => { toast.className = toast.className.replace("show", ""); }, 1500);
    }

    function getRawUrlFromGithubUrl(url) {
      try {
        const u = new URL(url);
        if (u.hostname !== 'github.com') return '';
        const parts = u.pathname.split('/').filter(Boolean);
        if (parts.length < 5) return '';
        if (parts[2] !== 'blob' && parts[2] !== 'tree') return '';
        const user = parts[0], repo = parts[1], branch = parts[3];
        const filePath = parts.slice(4).join('/');
        return `https://raw.githubusercontent.com/${user}/${repo}/${branch}/${filePath}`;
      } catch {
        return '';
      }
    }

    function getRawUrlFromPagesUrl(url) {
      try {
        const u = new URL(url);
        if (!/^[^.]+\.github\.io$/.test(u.hostname)) return '';
        const user = u.hostname.split('.')[0];
        const parts = u.pathname.split('/').filter(Boolean);
        if (parts.length < 1) return '';
        const repo = parts[0];
        const filePath = parts.slice(1).join('/');
        if (!filePath) return '';
        return `https://raw.githubusercontent.com/${user}/${repo}/main/${filePath}`;
      } catch {
        return '';
      }
    }

    function getGithubUrlFromRawUrl(url) {
      try {
        const u = new URL(url);
        if (u.hostname !== 'raw.githubusercontent.com') return '';
        const parts = u.pathname.split('/').filter(Boolean);
        if (parts.length < 4) return '';
        const user = parts[0], repo = parts[1], branch = parts[2];
        const filePath = parts.slice(3).join('/');
        return `https://github.com/${user}/${repo}/blob/${branch}/${filePath}`;
      } catch {
        return '';
      }
    }

    function getPagesUrlFromRawUrl(url) {
      try {
        const u = new URL(url);
        if (u.hostname !== 'raw.githubusercontent.com') return '';
        const parts = u.pathname.split('/').filter(Boolean);
        if (parts.length < 4) return '';
        const user = parts[0], repo = parts[1];
        const filePath = parts.slice(3).join('/');
        if (!filePath) return `https://${user}.github.io/${repo}`;
        return `https://${user}.github.io/${repo}/${filePath}`;
      } catch {
        return '';
      }
    }

    function analyzeLink(val) {
      repoURL = '';
      pagesURL = '';
      rawURL = '';
      errorEl.textContent = '';
      output.style.display = 'none';
      rawRow.style.display = 'none';

      if (!val || val.trim() === '') return;

      try {
        const url = new URL(val.trim());
        let user = '', repo = '', branch = '', subPath = '', filePath = '';

        if (url.hostname === 'github.com') {
          const parts = url.pathname.split('/').filter(Boolean);
          if (parts.length < 2) throw new Error('Invalid GitHub repository link!');
          user = parts[0];
          repo = parts[1];
          let basePagesURL = `https://${user}.github.io/${repo}`;
          if (parts[2] === 'blob' || parts[2] === 'tree') {
            branch = parts[3];
            if (parts.length > 4) {
              subPath = parts.slice(4).join('/');
              filePath = subPath;
            }
          }
          repoURL = val;
          pagesURL = basePagesURL;
          if (subPath) pagesURL += '/' + subPath;
          rawURL = getRawUrlFromGithubUrl(val);
        }
        else if (/^[^.]+\.github\.io$/.test(url.hostname)) {
          user = url.hostname.split('.')[0];
          const parts = url.pathname.split('/').filter(Boolean);
          if (parts.length < 1) throw new Error('Invalid GitHub Pages link!');
          repo = parts[0];
          if (parts.length > 1) {
            subPath = parts.slice(1).join('/');
            filePath = subPath;
          }
          pagesURL = val.replace(/\/+$/, '');
          repoURL = subPath
            ? `https://github.com/${user}/${repo}/blob/main/${subPath}`
            : `https://github.com/${user}/${repo}`;
          rawURL = subPath
            ? getRawUrlFromPagesUrl(val)
            : '';
        }
        else if (url.hostname === 'raw.githubusercontent.com') {
          const parts = url.pathname.split('/').filter(Boolean);
          if (parts.length < 4) throw new Error('Invalid Raw link!');
          user = parts[0];
          repo = parts[1];
          branch = parts[2];
          filePath = parts.slice(3).join('/');
          rawURL = val.replace(/\/+$/, '');
          repoURL = getGithubUrlFromRawUrl(val);
          pagesURL = getPagesUrlFromRawUrl(val);
        }
        else {
          throw new Error('Link must be a github.com, github.io, or raw.githubusercontent.com URL!');
        }

        // Update open link anchors
        openRepoBtn.href = repoURL;
        openPagesBtn.href = pagesURL;
        openRawBtn.href = rawURL;

        openRepoBtn.setAttribute('target', '_self');
        openPagesBtn.setAttribute('target', '_self');
        openRawBtn.setAttribute('target', '_self');

        output.style.display = '';
        if (rawURL) {
          rawRow.style.display = '';
        } else {
          rawRow.style.display = 'none';
        }
      } catch (e) {
        errorEl.textContent = e.message;
      }
    }

    input.addEventListener('input', e => {
      analyzeLink(e.target.value);
    });

    copyRepoBtn.onclick = () => {
      if (repoURL) {
        navigator.clipboard.writeText(repoURL);
        showToast("Copied GitHub Repository or File link!");
      }
    };
    copyPagesBtn.onclick = () => {
      if (pagesURL) {
        navigator.clipboard.writeText(pagesURL);
        showToast("Copied GitHub Pages Site or Subpath link!");
      }
    };
    copyRawBtn.onclick = () => {
      if (rawURL) {
        navigator.clipboard.writeText(rawURL);
        showToast("Copied Raw File Content link!");
      }
    };

    window.addEventListener('DOMContentLoaded', () => {
      if (input.value) {
        analyzeLink(input.value);
      }
    });