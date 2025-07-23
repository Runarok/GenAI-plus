// Global State Management
let products = [];
let filteredProducts = [];
let cart = [];
let actionStack = []; // For undo functionality
let orderQueue = []; // For order processing
let currentTheme = 'dark';

// Product Catalog Data
const productCatalog = [{
        id: 1,
        name: "Wireless Bluetooth Headphones",
        description: "Premium quality wireless headphones with noise cancellation and 30-hour battery life.",
        price: 199.99,
        rating: 4.8,
        category: "Electronics",
        image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=300"
    },
    {
        id: 2,
        name: "Smart Fitness Watch",
        description: "Advanced fitness tracker with heart rate monitor, GPS, and sleep tracking capabilities.",
        price: 299.99,
        rating: 4.6,
        category: "Electronics",
        image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=300"
    },
    {
        id: 3,
        name: "Organic Cotton T-Shirt",
        description: "Comfortable and sustainable organic cotton t-shirt available in multiple colors.",
        price: 29.99,
        rating: 4.4,
        category: "Clothing",
        image: "https://images.pexels.com/photos/1070948/pexels-photo-1070948.jpeg?auto=compress&cs=tinysrgb&w=300"
    },
    {
        id: 4,
        name: "Professional Camera Lens",
        description: "High-quality 50mm f/1.8 lens perfect for portrait and street photography.",
        price: 449.99,
        rating: 4.9,
        category: "Electronics",
        image: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=300"
    },
    {
        id: 5,
        name: "Ergonomic Office Chair",
        description: "Comfortable office chair with lumbar support and adjustable height for long work sessions.",
        price: 349.99,
        rating: 4.5,
        category: "Furniture",
        image: "https://images.pexels.com/photos/2762247/pexels-photo-2762247.jpeg?auto=compress&cs=tinysrgb&w=300"
    },
    {
        id: 6,
        name: "Stainless Steel Water Bottle",
        description: "Insulated water bottle that keeps drinks cold for 24 hours or hot for 12 hours.",
        price: 39.99,
        rating: 4.7,
        category: "Sports",
        image: "https://images.pexels.com/photos/1000084/pexels-photo-1000084.jpeg?auto=compress&cs=tinysrgb&w=300"
    },
    {
        id: 7,
        name: "Mechanical Gaming Keyboard",
        description: "RGB backlit mechanical keyboard with cherry MX switches for gaming and typing.",
        price: 129.99,
        rating: 4.6,
        category: "Electronics",
        image: "https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg?auto=compress&cs=tinysrgb&w=300"
    },
    {
        id: 8,
        name: "Yoga Mat Premium",
        description: "Non-slip yoga mat made from eco-friendly materials, perfect for all yoga practices.",
        price: 59.99,
        rating: 4.3,
        category: "Sports",
        image: "https://images.pexels.com/photos/3822906/pexels-photo-3822906.jpeg?auto=compress&cs=tinysrgb&w=300"
    },
    {
        id: 9,
        name: "Ceramic Coffee Mug Set",
        description: "Set of 4 handcrafted ceramic mugs perfect for your morning coffee or tea.",
        price: 49.99,
        rating: 4.2,
        category: "Home",
        image: "https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=300"
    },
    {
        id: 10,
        name: "Leather Messenger Bag",
        description: "Genuine leather messenger bag with multiple compartments for work and travel.",
        price: 179.99,
        rating: 4.8,
        category: "Accessories",
        image: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=300"
    },
    {
        id: 11,
        name: "Portable Phone Charger",
        description: "High-capacity portable charger with fast charging and multiple USB ports.",
        price: 79.99,
        rating: 4.4,
        category: "Electronics",
        image: "https://images.pexels.com/photos/4526943/pexels-photo-4526943.jpeg?auto=compress&cs=tinysrgb&w=300"
    },
    {
        id: 12,
        name: "Minimalist Desk Lamp",
        description: "Modern LED desk lamp with adjustable brightness and USB charging port.",
        price: 89.99,
        rating: 4.5,
        category: "Home",
        image: "https://images.pexels.com/photos/1484799/pexels-photo-1484799.jpeg?auto=compress&cs=tinysrgb&w=300"
    },
    {
        id: 13,
        name: "Running Shoes",
        description: "Lightweight running shoes with advanced cushioning and breathable mesh upper.",
        price: 139.99,
        rating: 4.6,
        category: "Sports",
        image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=300"
    },
    {
        id: 14,
        name: "Wireless Mouse",
        description: "Ergonomic wireless mouse with precision tracking and long battery life.",
        price: 49.99,
        rating: 4.3,
        category: "Electronics",
        image: "https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=300"
    },
    {
        id: 15,
        name: "Scented Candle Collection",
        description: "Set of 3 luxury scented candles with relaxing lavender, vanilla, and eucalyptus scents.",
        price: 34.99,
        rating: 4.7,
        category: "Home",
        image: "https://images.pexels.com/photos/1123260/pexels-photo-1123260.jpeg?auto=compress&cs=tinysrgb&w=300"
    },
    {
        id: 16,
        name: "Bluetooth Speaker",
        description: "Waterproof portable Bluetooth speaker with 360-degree sound and 12-hour battery.",
        price: 99.99,
        rating: 4.5,
        category: "Electronics",
        image: "https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=300"
    },
    {
        id: 17,
        name: "Denim Jacket",
        description: "Classic denim jacket with a modern fit, perfect for casual and semi-formal occasions.",
        price: 79.99,
        rating: 4.4,
        category: "Clothing",
        image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=300"
    },
    {
        id: 18,
        name: "Indoor Plant Pot Set",
        description: "Set of 3 ceramic plant pots with drainage holes, perfect for indoor gardening.",
        price: 39.99,
        rating: 4.6,
        category: "Home",
        image: "https://images.pexels.com/photos/1263986/pexels-photo-1263986.jpeg?auto=compress&cs=tinysrgb&w=300"
    },
    {
        id: 19,
        name: "Sunglasses",
        description: "UV protection sunglasses with polarized lenses and stylish frame design.",
        price: 89.99,
        rating: 4.3,
        category: "Accessories",
        image: "https://images.pexels.com/photos/46710/pexels-photo-46710.jpeg?auto=compress&cs=tinysrgb&w=300"
    },
    {
        id: 20,
        name: "Cookbook Collection",
        description: "Set of 3 bestselling cookbooks featuring international cuisine and healthy recipes.",
        price: 59.99,
        rating: 4.8,
        category: "Books",
        image: "https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg?auto=compress&cs=tinysrgb&w=300"
    },
    {
        id: 21,
        name: "Gaming Mouse Pad",
        description: "Large gaming mouse pad with anti-slip base and smooth surface for precision gaming.",
        price: 24.99,
        rating: 4.4,
        category: "Electronics",
        image: "https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=300"
    },
    {
        id: 22,
        name: "Backpack Laptop Bag",
        description: "Professional laptop backpack with padded compartments and weather-resistant material.",
        price: 119.99,
        rating: 4.7,
        category: "Accessories",
        image: "https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=300"
    }
];

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    products = [...productCatalog];
    filteredProducts = [...products];

    setupEventListeners();
    populateCategories();
    renderProducts();
    updateCartDisplay();
}

function setupEventListeners() {
    // Search functionality
    document.getElementById('search').addEventListener('input', debounce(filterProducts, 300));

    // Filter and sort
    document.getElementById('category-filter').addEventListener('change', filterProducts);
    document.getElementById('price-range').addEventListener('input', updatePriceDisplay);
    document.getElementById('price-range').addEventListener('change', filterProducts);
    document.getElementById('sort-by').addEventListener('change', filterProducts);
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function populateCategories() {
    const categories = [...new Set(products.map(p => p.category))];
    const categoryFilter = document.getElementById('category-filter');

    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

function updatePriceDisplay() {
    const priceRange = document.getElementById('price-range');
    const priceDisplay = document.getElementById('price-display');
    priceDisplay.textContent = `$${priceRange.value}`;
}

function filterProducts() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const selectedCategory = document.getElementById('category-filter').value;
    const maxPrice = parseFloat(document.getElementById('price-range').value);
    const sortBy = document.getElementById('sort-by').value;

    filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm);
        const matchesCategory = !selectedCategory || product.category === selectedCategory;
        const matchesPrice = product.price <= maxPrice;

        return matchesSearch && matchesCategory && matchesPrice;
    });

    // Sort products
    filteredProducts.sort((a, b) => {
        switch (sortBy) {
            case 'name':
                return a.name.localeCompare(b.name);
            case 'name-desc':
                return b.name.localeCompare(a.name);
            case 'price':
                return a.price - b.price;
            case 'price-desc':
                return b.price - a.price;
            case 'rating':
                return a.rating - b.rating;
            case 'rating-desc':
                return b.rating - a.rating;
            default:
                return 0;
        }
    });

    renderProducts();
}

function renderProducts() {
    const productsGrid = document.getElementById('products-grid');

    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = `
<div class="loading">
<i class="fas fa-search"></i> No products found
</div>
`;
        return;
    }

    productsGrid.innerHTML = filteredProducts.map(product => `
<div class="product-card fade-in">
<img src="${product.image}" alt="${product.name}" class="product-image"
onerror="this.style.background='var(--border-color)'; this.style.display='block';">
<div class="product-info">
<div class="product-category">${product.category}</div>
<div class="product-name">${product.name}</div>
<div class="product-description">${product.description}</div>
<div class="product-meta">
<div class="product-price">$${product.price.toFixed(2)}</div>
<div class="product-rating">
<i class="fas fa-star"></i>
${product.rating}
</div>
</div>
<button class="btn btn-primary" onclick="addToCart(${product.id})">
<i class="fas fa-cart-plus"></i> Add to Cart
</button>
</div>
</div>
`).join('');
}

// Cart Management Functions
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);

    // Store action for undo functionality
    if (existingItem) {
        actionStack.push({
            type: 'increase',
            productId: productId,
            previousQuantity: existingItem.quantity
        });
        existingItem.quantity += 1;
    } else {
        actionStack.push({
            type: 'add',
            productId: productId
        });
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCartDisplay();
    updateUndoButton();

    // Visual feedback
    const button = event.target.closest('button');
    button.classList.add('pulse');
    setTimeout(() => button.classList.remove('pulse'), 300);
}

function removeFromCart(productId) {
    const itemIndex = cart.findIndex(item => item.id === productId);
    if (itemIndex === -1) return;

    const item = cart[itemIndex];

    // Store action for undo functionality
    actionStack.push({
        type: 'remove',
        productId: productId,
        item: {
            ...item
        }
    });

    cart.splice(itemIndex, 1);
    updateCartDisplay();
    updateUndoButton();
}

function updateQuantity(productId, newQuantity) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;

    const previousQuantity = item.quantity;

    if (newQuantity <= 0) {
        removeFromCart(productId);
        return;
    }

    // Store action for undo functionality
    actionStack.push({
        type: 'quantity',
        productId: productId,
        previousQuantity: previousQuantity,
        newQuantity: newQuantity
    });

    item.quantity = newQuantity;
    updateCartDisplay();
    updateUndoButton();
}

function undoLastAction() {
    if (actionStack.length === 0) return;

    const lastAction = actionStack.pop();

    switch (lastAction.type) {
        case 'add':
            cart = cart.filter(item => item.id !== lastAction.productId);
            break;
        case 'remove':
            cart.push(lastAction.item);
            break;
        case 'increase':
            const increaseItem = cart.find(item => item.id === lastAction.productId);
            if (increaseItem) {
                increaseItem.quantity = lastAction.previousQuantity;
            }
            break;
        case 'quantity':
            const quantityItem = cart.find(item => item.id === lastAction.productId);
            if (quantityItem) {
                quantityItem.quantity = lastAction.previousQuantity;
            }
            break;
        case 'clear':
            cart = lastAction.cartState;
            break;
    }

    updateCartDisplay();
    updateUndoButton();
}

function clearCart() {
    if (cart.length === 0) return;

    // Store action for undo functionality
    actionStack.push({
        type: 'clear',
        cartState: [...cart]
    });

    cart = [];
    updateCartDisplay();
    updateUndoButton();
}

function updateCartDisplay() {
    const cartCount = document.getElementById('cart-count');
    const cartContent = document.getElementById('cart-content');
    const cartTotal = document.getElementById('cart-total');

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    cartCount.textContent = totalItems;
    cartTotal.textContent = `Total: $${totalPrice.toFixed(2)}`;

    if (cart.length === 0) {
        cartContent.innerHTML = `
<div class="cart-empty">
<i class="fas fa-shopping-cart" style="font-size: 3rem; margin-bottom: 1rem; color: var(--text-secondary);"></i>
<p>Your cart is empty</p>
</div>
`;
    } else {
        cartContent.innerHTML = cart.map(item => `
<div class="cart-item">
<img src="${item.image}" alt="${item.name}" class="cart-item-image">
<div class="cart-item-info">
<div class="cart-item-name">${item.name}</div>
<div class="cart-item-price">$${item.price.toFixed(2)} each</div>
<div class="cart-item-controls">
<button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">
<i class="fas fa-minus"></i>
</button>
<span class="quantity-display">${item.quantity}</span>
<button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">
<i class="fas fa-plus"></i>
</button>
<button class="btn btn-error btn-sm" onclick="removeFromCart(${item.id})" style="margin-left: auto;">
<i class="fas fa-trash"></i>
</button>
</div>
</div>
</div>
`).join('');
    }
}

function updateUndoButton() {
    const undoBtn = document.getElementById('undo-btn');
    undoBtn.disabled = actionStack.length === 0;
}

// Cart Import/Export Functions
function exportCart() {
    if (cart.length === 0) {
        alert('Cart is empty. Nothing to export.');
        return;
    }

    const cartData = {
        timestamp: new Date().toISOString(),
        items: cart,
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    };

    const dataStr = JSON.stringify(cartData, null, 2);
    const dataBlob = new Blob([dataStr], {
        type: 'application/json'
    });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `cart-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
}

function importCart(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const cartData = JSON.parse(e.target.result);

            if (cartData.items && Array.isArray(cartData.items)) {
                // Store current cart for undo
                actionStack.push({
                    type: 'clear',
                    cartState: [...cart]
                });

                cart = cartData.items;
                updateCartDisplay();
                updateUndoButton();
                alert('Cart imported successfully!');
            } else {
                alert('Invalid cart file format.');
            }
        } catch (error) {
            alert('Error reading cart file.');
        }
    };
    reader.readAsText(file);

    // Reset file input
    event.target.value = '';
}

// Order Processing Functions (Queue Implementation)
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    const order = {
        id: generateOrderId(),
        items: [...cart],
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        status: 'processing',
        timestamp: new Date().toISOString()
    };

    // Add to order queue
    orderQueue.push(order);

    // Clear cart after checkout
    actionStack.push({
        type: 'clear',
        cartState: [...cart]
    });
    cart = [];

    updateCartDisplay();
    updateUndoButton();
    processOrderQueue();

    alert(`Order #${order.id} has been placed successfully!`);
    toggleCart();
}

function generateOrderId() {
    return 'ORD-' + Date.now().toString().slice(-6);
}

function processOrderQueue() {
    if (orderQueue.length === 0) return;

    // Show order history section
    document.getElementById('order-history').style.display = 'block';

    // Simulate order processing
    const currentOrder = orderQueue[0];

    setTimeout(() => {
        if (orderQueue.length > 0) {
            orderQueue[0].status = 'completed';
            renderOrderHistory();

            // Process next order after 2 seconds
            setTimeout(() => {
                orderQueue.shift(); // Remove completed order
                processOrderQueue(); // Process next order
            }, 2000);
        }
    }, 3000);

    renderOrderHistory();
}

function renderOrderHistory() {
    const ordersList = document.getElementById('orders-list');

    if (orderQueue.length === 0) {
        ordersList.innerHTML = '<p class="cart-empty">No orders yet.</p>';
        return;
    }

    ordersList.innerHTML = orderQueue.map(order => `
<div class="order-item">
<div class="order-header">
<span class="order-id">Order #${order.id}</span>
<span class="order-status ${order.status}">${order.status.toUpperCase()}</span>
</div>
<div style="font-size: 0.875rem; color: var(--text-secondary); margin-bottom: 0.5rem;">
${new Date(order.timestamp).toLocaleString()}
</div>
<div style="font-weight: 600;">Total: $${order.total.toFixed(2)}</div>
<div style="font-size: 0.875rem; color: var(--text-secondary);">
${order.items.length} item(s)
</div>
</div>
`).join('');
}

// UI Functions
function toggleCart() {
    const sidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('cart-overlay');

    sidebar.classList.toggle('open');
    overlay.classList.toggle('show');
}

function toggleTheme() {
    const body = document.body;
    const themeIcon = document.getElementById('theme-icon');

    if (currentTheme === 'dark') {
        body.setAttribute('data-theme', 'light');
        themeIcon.className = 'fas fa-sun';
        currentTheme = 'light';
    } else {
        body.setAttribute('data-theme', 'dark');
        themeIcon.className = 'fas fa-moon';
        currentTheme = 'dark';
    }
}

// Initialize price display
updatePriceDisplay();