/* ---------- STATE ---------- */
let lastDeleted = null;

/* ---------- TOAST ---------- */
function showToast(message, type = 'info', timeout = 3000) {
    const t = document.createElement('div');
    t.className = `toast ${type}`;
    t.textContent = message;

    document.getElementById('toast-container').appendChild(t);
    setTimeout(() => t.remove(), timeout);
}

/* ---------- UNDO TOAST ---------- */
function showUndoToast(message, timeout = 5000) {
    const t = document.createElement('div');
    t.className = 'toast success';

    t.innerHTML = `
        <span style="flex:1">${message}</span>
        <button class="btn btn-sm">Undo</button>
    `;

    const undoBtn = t.querySelector('button');

    const timer = setTimeout(() => {
        lastDeleted = null;
        t.remove();
    }, timeout);

    undoBtn.onclick = () => {
        if (lastDeleted) {
            localStorage.setItem(lastDeleted.key, lastDeleted.value);
            render();
            showToast(`Restored "${lastDeleted.key}"`, 'success');
        }
        lastDeleted = null;
        clearTimeout(timer);
        t.remove();
    };

    document.getElementById('toast-container').appendChild(t);
}

/* ---------- CONFIRM TOAST ---------- */
function showConfirmToast(message, onConfirm) {
    const t = document.createElement('div');
    t.className = 'toast error';
    t.tabIndex = -1;

    t.innerHTML = `
        <span style="flex:1">${message}</span>
        <button class="btn btn-sm btn-danger">Delete</button>
        <button class="btn btn-sm">Cancel</button>
    `;

    const [confirmBtn, cancelBtn] = t.querySelectorAll('button');

    const cleanup = () => {
        document.removeEventListener('keydown', onKey);
        t.remove();
    };

    const onKey = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            onConfirm();
            cleanup();
        }
        if (e.key === 'Escape') {
            e.preventDefault();
            cleanup();
        }
    };

    confirmBtn.onclick = () => {
        onConfirm();
        cleanup();
    };

    cancelBtn.onclick = cleanup;

    document.addEventListener('keydown', onKey);
    document.getElementById('toast-container').appendChild(t);

    // Focus delete by default
    confirmBtn.focus();
}

/* ---------- HELPERS ---------- */
function formatBytes(bytes) {
    if (!bytes) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (bytes / Math.pow(k, i)).toFixed(2) + ' ' + sizes[i];
}

function syntaxHighlight(json) {
    json = JSON.stringify(json, null, 2)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

    return json.replace(
        /("(\\.|[^"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(\.\d+)?)/g,
        (m) => {
            if (/^"/.test(m))
                return /:$/.test(m)
                    ? `<span class="key">${m}</span>`
                    : `<span class="string">${m}</span>`;
            if (/true|false/.test(m)) return `<span class="boolean">${m}</span>`;
            if (/null/.test(m)) return `<span class="null">${m}</span>`;
            return `<span class="number">${m}</span>`;
        }
    );
}

/* ---------- RENDER ---------- */
function render() {
    const list = document.getElementById('storage-list');
    const stats = document.getElementById('stats-bar');
    list.innerHTML = '';

    const keys = Object.keys(localStorage).sort();
    let totalSize = 0;

    if (!keys.length) {
        list.innerHTML = `<div class="empty-state"><h3>No Data Found</h3></div>`;
        stats.textContent = '0 items • 0 Bytes';
        return;
    }

    keys.forEach((key) => {
        const raw = localStorage.getItem(key);
        const size = new Blob([key + raw]).size;
        totalSize += size;

        let value;
        let isJson = false;

        try {
            value = syntaxHighlight(JSON.parse(raw));
            isJson = true;
        } catch {
            value = `<span class="string">"${raw.replace(/</g, '&lt;')}"</span>`;
        }

        const card = document.createElement('div');
        card.className = 'item-card';
        card.innerHTML = `
            <div class="item-header">
                <div>
                    <div class="key-name">${key}</div>
                    <div class="item-meta">
                        Size: ${formatBytes(size)} • ${isJson ? 'JSON' : 'String'}
                    </div>
                </div>
                <div class="actions">
                    <button class="btn btn-sm" onclick="copyValue('${key}')">Copy</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteItem('${key}')">Delete</button>
                </div>
            </div>
            <pre>${value}</pre>
        `;
        list.appendChild(card);
    });

    stats.textContent = `${keys.length} items • ~${formatBytes(totalSize)}`;
}

/* ---------- ACTIONS ---------- */
function deleteItem(key) {
    showConfirmToast(`Delete "${key}"?`, () => {
        const value = localStorage.getItem(key);
        lastDeleted = { key, value };

        localStorage.removeItem(key);
        render();
        showUndoToast(`Deleted "${key}"`);
    });
}

function confirmClearAll() {
    if (!localStorage.length) {
        showToast('Storage already empty');
        return;
    }

    showConfirmToast('Delete ALL LocalStorage data?', () => {
        const backup = {};
        Object.keys(localStorage).forEach(
            (k) => (backup[k] = localStorage.getItem(k))
        );

        lastDeleted = { bulk: true, backup };

        localStorage.clear();
        render();
        showToast('All data cleared', 'error');
    });
}

function copyValue(key) {
    navigator.clipboard.writeText(localStorage.getItem(key));
    showToast('Copied to clipboard', 'success');
}

function refreshList() {
    render();
    showToast('List refreshed');
}

window.addEventListener('storage', () => {
    render();
    showToast('Storage updated externally');
});

/* ---------- INIT ---------- */
render();
