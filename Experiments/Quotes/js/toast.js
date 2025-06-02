// Toast management
const toastContainer = document.getElementById('toastContainer');

// Enhanced toast functionality with clickable links
function showToast(message, url = null) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    
    if (url) {
        const link = document.createElement('a');
        link.href = url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = message;
        toast.appendChild(link);
    } else {
        toast.textContent = message;
    }
    
    toastContainer.appendChild(toast);
    toast.classList.add('show');
    
    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}
