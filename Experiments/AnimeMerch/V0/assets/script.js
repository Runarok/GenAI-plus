        // Cart state
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Theme management
        function initTheme() {
            const savedTheme = localStorage.getItem('theme') || 'dark';
            document.documentElement.className = savedTheme;
        }

        function toggleTheme() {
            const currentTheme = document.documentElement.className;
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.className = newTheme;
            localStorage.setItem('theme', newTheme);
        }

        // Navigation
        function showPage(pageId) {
            // Hide all pages
            document.querySelectorAll('.page').forEach(page => {
                page.classList.remove('active');
            });
            
            // Show selected page
            document.getElementById(pageId + '-page').classList.add('active');
            
            // Load page content
            if (pageId === 'cart') {
                loadCartPage();
            } else if (pageId === 'checkout') {
                loadCheckoutPage();
            }
        }

        function toggleMobileMenu() {
            const mobileNav = document.getElementById('mobile-nav');
            const menuIcon = document.getElementById('menu-icon');
            const closeIcon = document.getElementById('close-icon');
            
            mobileNav.classList.toggle('hidden');
            menuIcon.classList.toggle('hidden');
            closeIcon.classList.toggle('hidden');
        }

        // Cart functionality
        function addToCart(productId) {
            const product = products.find(p => p.id === productId);
            const existingItem = cart.find(item => item.id === productId);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ ...product, quantity: 1 });
            }
            
            saveCart();
            updateCartBadge();
            
            // Show success message
            alert('Product added to cart!');
        }

        function removeFromCart(productId) {
            cart = cart.filter(item => item.id !== productId);
            saveCart();
            updateCartBadge();
            loadCartModal();
            loadCartPage();
        }

        function updateQuantity(productId, newQuantity) {
            if (newQuantity <= 0) {
                removeFromCart(productId);
                return;
            }
            
            const item = cart.find(item => item.id === productId);
            if (item) {
                item.quantity = newQuantity;
                saveCart();
                updateCartBadge();
                loadCartModal();
                loadCartPage();
            }
        }

        function saveCart() {
            localStorage.setItem('cart', JSON.stringify(cart));
        }

        function updateCartBadge() {
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            const badges = ['cart-badge', 'cart-badge-mobile'];
            
            badges.forEach(badgeId => {
                const badge = document.getElementById(badgeId);
                if (badge) {
                    if (totalItems > 0) {
                        badge.textContent = totalItems;
                        badge.classList.remove('hidden');
                    } else {
                        badge.classList.add('hidden');
                    }
                }
            });
        }

        function getCartTotal() {
            return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        }

        function formatPrice(price) {
            return `₹${price.toLocaleString('en-IN')}`;
        }

        // Cart modal
        function toggleCart() {
            const modal = document.getElementById('cart-modal');
            modal.classList.toggle('show');
            if (modal.classList.contains('show')) {
                loadCartModal();
            }
        }

        function loadCartModal() {
            const content = document.getElementById('cart-modal-content');
            const footer = document.getElementById('cart-modal-footer');
            
            if (cart.length === 0) {
                content.innerHTML = `
                    <div class="text-center py-8">
                        <svg class="w-16 h-16 mx-auto mb-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <path d="M16 10a4 4 0 0 1-8 0"></path>
                        </svg>
                        <p class="text-muted-foreground">Your cart is empty</p>
                    </div>
                `;
                footer.innerHTML = '';
                return;
            }
            
            content.innerHTML = cart.map(item => `
                <div class="flex items-center space-x-3 border-b border-border pb-4 mb-4">
                    <div class="relative w-16 h-16 rounded-lg overflow-hidden bg-muted">
                        <img src="images/${item.image}" alt="${item.name}" class="w-full h-full object-cover" onerror="this.src='/placeholder.svg?height=64&width=64'">
                    </div>
                    <div class="flex-1">
                        <h3 class="font-medium text-sm">${item.name}</h3>
                        <p class="text-purple-400 font-semibold">${formatPrice(item.price)}</p>
                        <div class="flex items-center space-x-2 mt-2">
                            <button onclick="updateQuantity('${item.id}', ${item.quantity - 1})" class="btn btn-outline btn-sm">-</button>
                            <span class="w-8 text-center">${item.quantity}</span>
                            <button onclick="updateQuantity('${item.id}', ${item.quantity + 1})" class="btn btn-outline btn-sm">+</button>
                            <button onclick="removeFromCart('${item.id}')" class="btn btn-ghost btn-sm text-red-500 hover:text-red-700">Remove</button>
                        </div>
                    </div>
                </div>
            `).join('');
            
            footer.innerHTML = `
                <div class="flex justify-between text-lg font-semibold mb-4">
                    <span>Total: </span>
                    <span class="text-purple-400">${formatPrice(getCartTotal())}</span>
                </div>
                <div class="space-y-2">
                    <button onclick="showPage('cart'); toggleCart()" class="btn btn-primary w-full">View Cart</button>
                    <button onclick="showPage('checkout'); toggleCart()" class="btn btn-outline w-full">Checkout</button>
                </div>
            `;
        }

        // Product rendering
        function createProductCard(product) {
            return `
                <div class="card group hover:shadow-lg transition-all duration-300 border-2 hover:border-purple-500/50">
                    <div class="p-4">
                        <div class="aspect-square relative mb-4 overflow-hidden rounded-lg bg-muted">
                            <img src="images/${product.image}" alt="${product.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onerror="this.src='/placeholder.svg?height=300&width=300'">
                        </div>
                        <h3 class="font-semibold text-lg mb-2 line-clamp-2">${product.name}</h3>
                        <p class="text-muted-foreground text-sm mb-3 line-clamp-2">${product.description}</p>
                        <p class="text-2xl font-bold text-purple-400">${formatPrice(product.price)}</p>
                    </div>
                    <div class="p-4 pt-0">
                        <button onclick="addToCart('${product.id}')" class="btn btn-primary w-full">
                            <svg class="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                                <line x1="3" y1="6" x2="21" y2="6"></line>
                                <path d="M16 10a4 4 0 0 1-8 0"></path>
                            </svg>
                            Add to Cart
                        </button>
                    </div>
                </div>
            `;
        }

        function loadFeaturedProducts() {
            const container = document.getElementById('featured-products');
            const featuredProducts = products.slice(0, 8);
            container.innerHTML = featuredProducts.map(createProductCard).join('');
        }

        function loadAllProducts() {
            const container = document.getElementById('all-products');
            container.innerHTML = products.map(createProductCard).join('');
        }

        // Cart page
        function loadCartPage() {
            const container = document.getElementById('cart-content');
            
            if (cart.length === 0) {
                container.innerHTML = `
                    <div class="text-center py-16">
                        <svg class="w-24 h-24 mx-auto mb-6 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <path d="M16 10a4 4 0 0 1-8 0"></path>
                        </svg>
                        <h2 class="text-2xl font-bold mb-4">Your cart is empty</h2>
                        <p class="text-muted-foreground mb-6">Add some awesome anime merchandise to get started!</p>
                        <button onclick="showPage('products')" class="btn btn-primary">Continue Shopping</button>
                    </div>
                `;
                return;
            }
            
            container.innerHTML = `
                <div class="grid lg:grid-cols-3 gap-8">
                    <div class="lg:col-span-2 space-y-4">
                        ${cart.map(item => `
                            <div class="flex items-center space-x-4 p-4 border border-border rounded-lg">
                                <div class="relative w-20 h-20 rounded-lg overflow-hidden bg-muted">
                                    <img src="images/${item.image}" alt="${item.name}" class="w-full h-full object-cover" onerror="this.src='/placeholder.svg?height=80&width=80'">
                                </div>
                                <div class="flex-1">
                                    <h3 class="font-semibold">${item.name}</h3>
                                    <p class="text-purple-400 font-semibold">${formatPrice(item.price)}</p>
                                </div>
                                <div class="flex items-center space-x-2">
                                    <button onclick="updateQuantity('${item.id}', ${item.quantity - 1})" class="btn btn-outline btn-icon">-</button>
                                    <span class="w-12 text-center">${item.quantity}</span>
                                    <button onclick="updateQuantity('${item.id}', ${item.quantity + 1})" class="btn btn-outline btn-icon">+</button>
                                </div>
                                <button onclick="removeFromCart('${item.id}')" class="btn btn-ghost btn-icon text-red-500 hover:text-red-700">
                                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <polyline points="3,6 5,6 21,6"></polyline>
                                        <path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6m3,0V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2V6"></path>
                                        <line x1="10" y1="11" x2="10" y2="17"></line>
                                        <line x1="14" y1="11" x2="14" y2="17"></line>
                                    </svg>
                                </button>
                            </div>
                        `).join('')}
                    </div>
                    
                    <div class="lg:col-span-1">
                        <div class="card p-6 sticky top-24">
                            <h2 class="text-xl font-semibold mb-4">Order Summary</h2>
                            <div class="space-y-2 mb-4">
                                <div class="flex justify-between">
                                    <span>Subtotal:</span>
                                    <span>${formatPrice(getCartTotal())}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span>Shipping:</span>
                                    <span>Free</span>
                                </div>
                                <div class="border-t border-border pt-2">
                                    <div class="flex justify-between font-semibold text-lg">
                                        <span>Total:</span>
                                        <span class="text-purple-400">${formatPrice(getCartTotal())}</span>
                                    </div>
                                </div>
                            </div>
                            <button onclick="showPage('checkout')" class="btn btn-primary w-full mb-2">Proceed to Checkout</button>
                            <button onclick="showPage('products')" class="btn btn-outline w-full">Continue Shopping</button>
                        </div>
                    </div>
                </div>
            `;
        }

        // Checkout page
        function loadCheckoutPage() {
            const container = document.getElementById('checkout-summary');
            
            if (cart.length === 0) {
                container.innerHTML = '<p class="text-muted-foreground">Your cart is empty. Add some items before checkout.</p>';
                return;
            }
            
            container.innerHTML = `
                <div class="space-y-2">
                    ${cart.map(item => `
                        <div class="flex justify-between">
                            <span>${item.name} x ${item.quantity}</span>
                            <span>${formatPrice(item.price * item.quantity)}</span>
                        </div>
                    `).join('')}
                    <div class="border-t border-border pt-2">
                        <div class="flex justify-between font-semibold text-lg">
                            <span>Total:</span>
                            <span class="text-purple-400">${formatPrice(getCartTotal())}</span>
                        </div>
                    </div>
                </div>
            `;
        }

        // Form handlers
        function handleLogin(event) {
            event.preventDefault();
            alert('Login functionality will be implemented with backend integration!');
        }

        function handleCheckout(event) {
            event.preventDefault();
            alert('Order placed successfully! (This is a demo - no real payment was processed)');
            cart = [];
            saveCart();
            updateCartBadge();
            showPage('home');
        }

        // Initialize app
        document.addEventListener('DOMContentLoaded', function() {
            initTheme();
            updateCartBadge();
            loadFeaturedProducts();
            loadAllProducts();
        });
