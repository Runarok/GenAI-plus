// ============================================
// PHARMACY MANAGEMENT SYSTEM - LOGIC
// ============================================

// ============================================
// DATA MANAGEMENT
// ============================================

// Initialize localStorage with default data
function initializeData() {
    // Default users (demo data)
    if (!localStorage.getItem('users')) {
        const defaultUsers = [
            {
                id: 1,
                name: 'Admin User',
                email: 'admin@pharmacy.com',
                password: 'admin123',
                role: 'admin'
            },
            {
                id: 2,
                name: 'John Doe',
                email: 'john@example.com',
                password: 'member123',
                role: 'member'
            }
        ];
        localStorage.setItem('users', JSON.stringify(defaultUsers));
    }

    // Default medicines
    if (!localStorage.getItem('medicines')) {
        const defaultMedicines = [
            {
                id: 1,
                name: 'Aspirin',
                category: 'Pain Relief',
                price: 5.99,
                quantity: 100,
                expiry: '2025-12-31',
                description: 'Effective pain relief and fever reducer'
            },
            {
                id: 2,
                name: 'Amoxicillin',
                category: 'Antibiotics',
                price: 12.99,
                quantity: 50,
                expiry: '2025-10-15',
                description: 'Antibiotic for bacterial infections'
            },
            {
                id: 3,
                name: 'Vitamin C',
                category: 'Vitamins',
                price: 8.99,
                quantity: 150,
                expiry: '2026-05-20',
                description: 'Immune system support'
            }
        ];
        localStorage.setItem('medicines', JSON.stringify(defaultMedicines));
    }

    // Initialize orders
    if (!localStorage.getItem('orders')) {
        localStorage.setItem('orders', JSON.stringify([]));
    }

    // Initialize cart
    if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', JSON.stringify([]));
    }
}

// Get all users
function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

// Get all medicines
function getMedicines() {
    return JSON.parse(localStorage.getItem('medicines')) || [];
}

// Get all orders
function getOrders() {
    return JSON.parse(localStorage.getItem('orders')) || [];
}

// Get cart
function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

// Save medicines
function saveMedicines(medicines) {
    localStorage.setItem('medicines', JSON.stringify(medicines));
}

// Save orders
function saveOrders(orders) {
    localStorage.setItem('orders', JSON.stringify(orders));
}

// Save cart
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Save users
function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

// ============================================
// AUTHENTICATION
// ============================================

// Get current logged-in user
function getCurrentUser() {
    const user = sessionStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
}

// Set current logged-in user
function setCurrentUser(user) {
    sessionStorage.setItem('currentUser', JSON.stringify(user));
}

// Switch between login and register forms
function switchAuthForm() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    loginForm.classList.toggle('active');
    registerForm.classList.toggle('active');
}

// Validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Handle login
document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;

    if (!email || !password) {
        showToast('Please fill in all fields', 'error');
        return;
    }

    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        setCurrentUser(user);
        showToast(`Welcome back, ${user.name}!`, 'success');
        setTimeout(() => {
            showDashboard(user.role);
        }, 500);
    } else {
        showToast('Invalid email or password', 'error');
    }
});

// Handle registration
document.getElementById('register-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('register-name').value.trim();
    const email = document.getElementById('register-email').value.trim();
    const password = document.getElementById('register-password').value;
    const role = document.getElementById('register-role').value;

    // Validation
    if (!name || !email || !password) {
        showToast('Please fill in all fields', 'error');
        return;
    }

    if (!isValidEmail(email)) {
        showToast('Please enter a valid email', 'error');
        return;
    }

    if (password.length < 6) {
        showToast('Password must be at least 6 characters', 'error');
        return;
    }

    const users = getUsers();
    if (users.find(u => u.email === email)) {
        showToast('Email already registered', 'error');
        return;
    }

    // Create new user
    const newUser = {
        id: Date.now(),
        name,
        email,
        password,
        role
    };

    users.push(newUser);
    saveUsers(users);
    showToast('Registration successful! Please log in.', 'success');

    // Clear form and switch to login
    document.getElementById('register-form').reset();
    setTimeout(() => {
        switchAuthForm();
    }, 1000);
});

// Logout
function logout() {
    sessionStorage.removeItem('currentUser');
    localStorage.removeItem('cart');
    document.getElementById('auth-container').classList.remove('hidden');
    document.getElementById('admin-dashboard').classList.add('hidden');
    document.getElementById('member-dashboard').classList.add('hidden');
    document.getElementById('login-email').value = '';
    document.getElementById('login-password').value = '';
    showToast('Logged out successfully', 'success');
}

// Show dashboard based on role
function showDashboard(role) {
    document.getElementById('auth-container').classList.add('hidden');
    if (role === 'admin') {
        document.getElementById('admin-dashboard').classList.remove('hidden');
        document.getElementById('member-dashboard').classList.add('hidden');
        loadAdminDashboard();
    } else {
        document.getElementById('member-dashboard').classList.remove('hidden');
        document.getElementById('admin-dashboard').classList.add('hidden');
        loadMemberDashboard();
    }
}

// ============================================
// ADMIN DASHBOARD
// ============================================

function loadAdminDashboard() {
    const user = getCurrentUser();
    document.getElementById('admin-username').textContent = user.name;
    loadMedicinesTable();
    updateAnalytics();
}

// Show admin section
function showAdminSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });

    // Remove active class from nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });

    // Show selected section
    document.getElementById(sectionId + '-section').classList.add('active');

    // Add active class to clicked link
    event.target.closest('.nav-link').classList.add('active');

    if (sectionId === 'medicines') {
        loadMedicinesTable();
    } else if (sectionId === 'orders') {
        loadAdminOrders();
    } else if (sectionId === 'analytics') {
        updateAnalytics();
    }
}

// Load medicines table
function loadMedicinesTable() {
    const medicines = getMedicines();
    const tbody = document.querySelector('#medicines-table tbody');
    tbody.innerHTML = '';

    medicines.forEach(medicine => {
        const row = document.createElement('tr');
        const expiryDate = new Date(medicine.expiry);
        const today = new Date();
        const isExpired = expiryDate < today;

        row.innerHTML = `
            <td>${medicine.name}</td>
            <td>${medicine.category}</td>
            <td>$${medicine.price.toFixed(2)}</td>
            <td>${medicine.quantity}</td>
            <td>${isExpired ? '<span style="color: var(--error);">EXPIRED ' + medicine.expiry + '</span>' : medicine.expiry}</td>
            <td>
                <button class="btn btn-secondary btn-small" onclick="editMedicine(${medicine.id})">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn btn-danger btn-small" onclick="deleteMedicine(${medicine.id})">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });

    // Add search functionality
    document.getElementById('search-medicine').addEventListener('keyup', function () {
        filterMedicinesTable(this.value);
    });
}

// Filter medicines table
function filterMedicinesTable(searchTerm) {
    const medicines = getMedicines();
    const filtered = medicines.filter(m =>
        m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const tbody = document.querySelector('#medicines-table tbody');
    tbody.innerHTML = '';

    filtered.forEach(medicine => {
        const row = document.createElement('tr');
        const expiryDate = new Date(medicine.expiry);
        const today = new Date();
        const isExpired = expiryDate < today;

        row.innerHTML = `
            <td>${medicine.name}</td>
            <td>${medicine.category}</td>
            <td>$${medicine.price.toFixed(2)}</td>
            <td>${medicine.quantity}</td>
            <td>${isExpired ? '<span style="color: var(--error);">EXPIRED ' + medicine.expiry + '</span>' : medicine.expiry}</td>
            <td>
                <button class="btn btn-secondary btn-small" onclick="editMedicine(${medicine.id})">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn btn-danger btn-small" onclick="deleteMedicine(${medicine.id})">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Add medicine form submission
document.getElementById('add-medicine-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const medicine = {
        id: Date.now(),
        name: document.getElementById('medicine-name').value.trim(),
        category: document.getElementById('medicine-category').value,
        price: parseFloat(document.getElementById('medicine-price').value),
        quantity: parseInt(document.getElementById('medicine-quantity').value),
        expiry: document.getElementById('medicine-expiry').value,
        description: document.getElementById('medicine-description').value.trim()
    };

    if (!medicine.name || !medicine.category || medicine.price <= 0 || medicine.quantity < 0) {
        showToast('Please fill in all required fields correctly', 'error');
        return;
    }

    const medicines = getMedicines();
    medicines.push(medicine);
    saveMedicines(medicines);

    showToast('Medicine added successfully', 'success');
    this.reset();
    loadMedicinesTable();
});

// Edit medicine
function editMedicine(id) {
    const medicines = getMedicines();
    const medicine = medicines.find(m => m.id === id);

    if (!medicine) return;

    document.getElementById('edit-medicine-id').value = id;
    document.getElementById('edit-medicine-name').value = medicine.name;
    document.getElementById('edit-medicine-category').value = medicine.category;
    document.getElementById('edit-medicine-price').value = medicine.price;
    document.getElementById('edit-medicine-quantity').value = medicine.quantity;
    document.getElementById('edit-medicine-expiry').value = medicine.expiry;
    document.getElementById('edit-medicine-description').value = medicine.description;

    document.getElementById('edit-modal').classList.remove('hidden');
}

// Close edit modal
function closeEditModal() {
    document.getElementById('edit-modal').classList.add('hidden');
}

// Update medicine
document.getElementById('edit-medicine-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const id = parseInt(document.getElementById('edit-medicine-id').value);
    const medicines = getMedicines();
    const medicineIndex = medicines.findIndex(m => m.id === id);

    if (medicineIndex === -1) return;

    medicines[medicineIndex] = {
        id,
        name: document.getElementById('edit-medicine-name').value.trim(),
        category: document.getElementById('edit-medicine-category').value,
        price: parseFloat(document.getElementById('edit-medicine-price').value),
        quantity: parseInt(document.getElementById('edit-medicine-quantity').value),
        expiry: document.getElementById('edit-medicine-expiry').value,
        description: document.getElementById('edit-medicine-description').value.trim()
    };

    saveMedicines(medicines);
    showToast('Medicine updated successfully', 'success');
    closeEditModal();
    loadMedicinesTable();
});

// Delete medicine
function deleteMedicine(id) {
    if (confirm('Are you sure you want to delete this medicine?')) {
        let medicines = getMedicines();
        medicines = medicines.filter(m => m.id !== id);
        saveMedicines(medicines);
        showToast('Medicine deleted successfully', 'success');
        loadMedicinesTable();
    }
}

// Load admin orders
function loadAdminOrders() {
    const orders = getOrders();
    const ordersList = document.getElementById('orders-list');
    ordersList.innerHTML = '';

    if (orders.length === 0) {
        ordersList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-inbox"></i>
                <p>No orders yet</p>
            </div>
        `;
        return;
    }

    orders.forEach(order => {
        const orderCard = document.createElement('div');
        orderCard.className = 'order-card';
        orderCard.innerHTML = `
            <div class="order-header">
                <div>
                    <h3>Order #${order.id}</h3>
                    <p style="font-size: 12px; color: var(--text-secondary);">${new Date(order.date).toLocaleDateString()}</p>
                </div>
                <span class="order-status status-completed">Completed</span>
            </div>
            <div class="order-items">
                ${order.items.map(item => `
                    <div class="order-item">
                        <span>${item.name} x ${item.quantity}</span>
                        <span>$${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                `).join('')}
            </div>
            <div class="order-total">Total: $${order.total.toFixed(2)}</div>
            <p style="font-size: 12px; color: var(--text-secondary); margin-top: 10px;">
                <i class="fas fa-user"></i> ${order.memberName}
            </p>
        `;
        ordersList.appendChild(orderCard);
    });
}

// Update analytics
function updateAnalytics() {
    const medicines = getMedicines();
    const users = getUsers();
    const orders = getOrders();

    const totalMembers = users.filter(u => u.role === 'member').length;
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

    document.getElementById('stat-medicines').textContent = medicines.length;
    document.getElementById('stat-members').textContent = totalMembers;
    document.getElementById('stat-orders').textContent = orders.length;
    document.getElementById('stat-revenue').textContent = '$' + totalRevenue.toFixed(2);
}

// ============================================
// MEMBER DASHBOARD
// ============================================

function loadMemberDashboard() {
    const user = getCurrentUser();
    document.getElementById('member-username').textContent = user.name;
    loadMedicinesGrid();
    updateCartCount();
    loadMemberOrders();
}

// Show member section
function showMemberSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('#member-dashboard .section').forEach(section => {
        section.classList.remove('active');
    });

    // Remove active class from nav links
    document.querySelectorAll('#member-dashboard .nav-link').forEach(link => {
        link.classList.remove('active');
    });

    // Show selected section
    document.getElementById(sectionId + '-section').classList.add('active');

    // Add active class to clicked link
    if (event && event.target.closest('.nav-link')) {
        event.target.closest('.nav-link').classList.add('active');
    }

    if (sectionId === 'browse') {
        loadMedicinesGrid();
    } else if (sectionId === 'cart') {
        loadCart();
    } else if (sectionId === 'orders') {
        loadMemberOrders();
    }
}

// Load medicines grid for members
function loadMedicinesGrid() {
    let medicines = getMedicines();
    const grid = document.getElementById('medicines-grid');
    grid.innerHTML = '';

    medicines.forEach(medicine => {
        const card = document.createElement('div');
        card.className = 'medicine-card';

        const expiryDate = new Date(medicine.expiry);
        const today = new Date();
        const isExpired = expiryDate < today;
        const daysUntilExpiry = Math.floor((expiryDate - today) / (1000 * 60 * 60 * 24));

        card.innerHTML = `
            <div class="medicine-card-header">
                <h3>${medicine.name}</h3>
                <span class="category-badge">${medicine.category}</span>
            </div>
            <p class="price">$${medicine.price.toFixed(2)}</p>
            <p class="description">${medicine.description}</p>
            <div class="meta">
                <p><i class="fas fa-cube"></i> Stock: ${medicine.quantity}</p>
                <p><i class="fas fa-calendar"></i> Expires: ${medicine.expiry} ${isExpired ? '(EXPIRED)' : daysUntilExpiry < 30 ? '(Expires soon)' : ''}</p>
            </div>
            <div class="actions">
                <button class="btn btn-primary" onclick="addToCart(${medicine.id})" ${medicine.quantity === 0 || isExpired ? 'disabled' : ''}>
                    <i class="fas fa-shopping-cart"></i> Add to Cart
                </button>
                <button class="btn btn-secondary" onclick="viewMedicineDetails(${medicine.id})">
                    <i class="fas fa-info-circle"></i> Details
                </button>
            </div>
        `;
        grid.appendChild(card);
    });

    // Add filter and search
    document.getElementById('search-products').addEventListener('keyup', filterMedicines);
    document.getElementById('category-filter').addEventListener('change', filterMedicines);
    document.getElementById('sort-filter').addEventListener('change', sortMedicines);
}

// Filter medicines
function filterMedicines() {
    const searchTerm = document.getElementById('search-products').value.toLowerCase();
    const category = document.getElementById('category-filter').value;

    let medicines = getMedicines();
    medicines = medicines.filter(m =>
        (m.name.toLowerCase().includes(searchTerm) || m.description.toLowerCase().includes(searchTerm)) &&
        (category === '' || m.category === category)
    );

    const grid = document.getElementById('medicines-grid');
    grid.innerHTML = '';

    medicines.forEach(medicine => {
        const card = document.createElement('div');
        card.className = 'medicine-card';

        const expiryDate = new Date(medicine.expiry);
        const today = new Date();
        const isExpired = expiryDate < today;

        card.innerHTML = `
            <div class="medicine-card-header">
                <h3>${medicine.name}</h3>
                <span class="category-badge">${medicine.category}</span>
            </div>
            <p class="price">$${medicine.price.toFixed(2)}</p>
            <p class="description">${medicine.description}</p>
            <div class="meta">
                <p><i class="fas fa-cube"></i> Stock: ${medicine.quantity}</p>
                <p><i class="fas fa-calendar"></i> Expires: ${medicine.expiry}</p>
            </div>
            <div class="actions">
                <button class="btn btn-primary" onclick="addToCart(${medicine.id})" ${medicine.quantity === 0 || isExpired ? 'disabled' : ''}>
                    <i class="fas fa-shopping-cart"></i> Add to Cart
                </button>
                <button class="btn btn-secondary" onclick="viewMedicineDetails(${medicine.id})">
                    <i class="fas fa-info-circle"></i> Details
                </button>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Sort medicines
function sortMedicines() {
    const sortType = document.getElementById('sort-filter').value;
    let medicines = getMedicines();

    if (sortType === 'price-low') {
        medicines.sort((a, b) => a.price - b.price);
    } else if (sortType === 'price-high') {
        medicines.sort((a, b) => b.price - a.price);
    } else {
        medicines.sort((a, b) => a.name.localeCompare(b.name));
    }

    const grid = document.getElementById('medicines-grid');
    grid.innerHTML = '';

    medicines.forEach(medicine => {
        const card = document.createElement('div');
        card.className = 'medicine-card';

        const expiryDate = new Date(medicine.expiry);
        const today = new Date();
        const isExpired = expiryDate < today;

        card.innerHTML = `
            <div class="medicine-card-header">
                <h3>${medicine.name}</h3>
                <span class="category-badge">${medicine.category}</span>
            </div>
            <p class="price">$${medicine.price.toFixed(2)}</p>
            <p class="description">${medicine.description}</p>
            <div class="meta">
                <p><i class="fas fa-cube"></i> Stock: ${medicine.quantity}</p>
                <p><i class="fas fa-calendar"></i> Expires: ${medicine.expiry}</p>
            </div>
            <div class="actions">
                <button class="btn btn-primary" onclick="addToCart(${medicine.id})" ${medicine.quantity === 0 || isExpired ? 'disabled' : ''}>
                    <i class="fas fa-shopping-cart"></i> Add to Cart
                </button>
                <button class="btn btn-secondary" onclick="viewMedicineDetails(${medicine.id})">
                    <i class="fas fa-info-circle"></i> Details
                </button>
            </div>
        `;
        grid.appendChild(card);
    });
}

// View medicine details (can be expanded later)
function viewMedicineDetails(id) {
    const medicines = getMedicines();
    const medicine = medicines.find(m => m.id === id);
    if (medicine) {
        alert(`${medicine.name}\n\nCategory: ${medicine.category}\nPrice: $${medicine.price.toFixed(2)}\nExpires: ${medicine.expiry}\n\n${medicine.description}`);
    }
}

// Add to cart
function addToCart(medicineId) {
    const medicines = getMedicines();
    const medicine = medicines.find(m => m.id === medicineId);

    if (!medicine || medicine.quantity === 0) {
        showToast('Medicine out of stock', 'error');
        return;
    }

    let cart = getCart();
    const cartItem = cart.find(item => item.id === medicineId);

    if (cartItem) {
        if (cartItem.quantity < medicine.quantity) {
            cartItem.quantity += 1;
        } else {
            showToast('Cannot add more, insufficient stock', 'error');
            return;
        }
    } else {
        cart.push({
            id: medicineId,
            name: medicine.name,
            price: medicine.price,
            quantity: 1
        });
    }

    saveCart(cart);
    updateCartCount();
    showToast(`${medicine.name} added to cart`, 'success');
}

// Update cart count
function updateCartCount() {
    const cart = getCart();
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').textContent = count;
}

// Load cart
function loadCart() {
    const cart = getCart();
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';

    if (cart.length === 0) {
        document.getElementById('cart-content').innerHTML = `
            <div class="empty-state">
                <i class="fas fa-shopping-cart"></i>
                <p>Your cart is empty</p>
                <button class="btn btn-primary" onclick="showMemberSection('browse')">
                    Continue Shopping
                </button>
            </div>
        `;
        return;
    }

    let subtotal = 0;
    cart.forEach(item => {
        const row = document.createElement('tr');
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        row.innerHTML = `
            <td>${item.name}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>
                <input type="number" value="${item.quantity}" min="1" onchange="updateCartQuantity(${item.id}, this.value)" style="width: 60px; padding: 5px;">
            </td>
            <td>$${itemTotal.toFixed(2)}</td>
            <td>
                <button class="btn btn-danger btn-small" onclick="removeFromCart(${item.id})">
                    <i class="fas fa-trash"></i> Remove
                </button>
            </td>
        `;
        cartItems.appendChild(row);
    });

    const tax = subtotal * 0.05;
    const total = subtotal + tax;

    document.getElementById('cart-subtotal').textContent = '$' + subtotal.toFixed(2);
    document.getElementById('cart-tax').textContent = '$' + tax.toFixed(2);
    document.getElementById('cart-total').textContent = '$' + total.toFixed(2);
}

// Update cart quantity
function updateCartQuantity(medicineId, newQuantity) {
    const medicines = getMedicines();
    const medicine = medicines.find(m => m.id === medicineId);
    const quantity = parseInt(newQuantity);

    if (quantity <= 0) {
        removeFromCart(medicineId);
        return;
    }

    if (quantity > medicine.quantity) {
        showToast('Insufficient stock', 'error');
        loadCart();
        return;
    }

    let cart = getCart();
    const cartItem = cart.find(item => item.id === medicineId);
    if (cartItem) {
        cartItem.quantity = quantity;
    }

    saveCart(cart);
    updateCartCount();
    loadCart();
}

// Remove from cart
function removeFromCart(medicineId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== medicineId);
    saveCart(cart);
    updateCartCount();
    loadCart();
    showToast('Item removed from cart', 'success');
}

// Place order
function placeOrder() {
    const cart = getCart();
    if (cart.length === 0) {
        showToast('Your cart is empty', 'error');
        return;
    }

    const medicines = getMedicines();
    const user = getCurrentUser();

    // Check stock availability
    for (let item of cart) {
        const medicine = medicines.find(m => m.id === item.id);
        if (!medicine || medicine.quantity < item.quantity) {
            showToast(`Insufficient stock for ${item.name}`, 'error');
            return;
        }
    }

    // Update medicine quantities
    cart.forEach(item => {
        const medicineIndex = medicines.findIndex(m => m.id === item.id);
        if (medicineIndex !== -1) {
            medicines[medicineIndex].quantity -= item.quantity;
        }
    });
    saveMedicines(medicines);

    // Create order
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.05;
    const total = subtotal + tax;

    const order = {
        id: Date.now(),
        memberId: user.id,
        memberName: user.name,
        items: cart,
        subtotal,
        tax,
        total,
        date: new Date().toISOString(),
        status: 'completed'
    };

    const orders = getOrders();
    orders.push(order);
    saveOrders(orders);

    // Clear cart
    localStorage.removeItem('cart');
    updateCartCount();

    showToast('Order placed successfully!', 'success');
    setTimeout(() => {
        showMemberSection('orders');
    }, 1000);
}

// Load member orders
function loadMemberOrders() {
    const user = getCurrentUser();
    const orders = getOrders();
    const userOrders = orders.filter(o => o.memberId === user.id);
    const ordersList = document.getElementById('member-orders-list');
    ordersList.innerHTML = '';

    if (userOrders.length === 0) {
        ordersList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-inbox"></i>
                <p>No orders yet</p>
                <button class="btn btn-primary" onclick="showMemberSection('browse')">
                    Start Shopping
                </button>
            </div>
        `;
        return;
    }

    userOrders.reverse().forEach(order => {
        const orderCard = document.createElement('div');
        orderCard.className = 'order-card';
        orderCard.innerHTML = `
            <div class="order-header">
                <div>
                    <h3>Order #${order.id}</h3>
                    <p style="font-size: 12px; color: var(--text-secondary);">${new Date(order.date).toLocaleDateString()}</p>
                </div>
                <span class="order-status status-completed">Completed</span>
            </div>
            <div class="order-items">
                ${order.items.map(item => `
                    <div class="order-item">
                        <span>${item.name} x ${item.quantity}</span>
                        <span>$${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                `).join('')}
            </div>
            <div class="order-total">Total: $${order.total.toFixed(2)}</div>
        `;
        ordersList.appendChild(orderCard);
    });
}

// ============================================
// UTILITIES
// ============================================

// Show toast notification
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type}`;
    toast.style.display = 'block';

    setTimeout(() => {
        toast.style.display = 'none';
    }, 3000);
}

// Initialize app on page load
document.addEventListener('DOMContentLoaded', function () {
    initializeData();
    const user = getCurrentUser();
    if (user) {
        showDashboard(user.role);
    }
});

// Close modal when clicking outside
document.getElementById('edit-modal').addEventListener('click', function (event) {
    if (event.target === this) {
        closeEditModal();
    }
});