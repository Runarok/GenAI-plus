// --- Product data (15 items, INR prices, Indian number formatting) ---
const PRODUCTS = [
  {id:1, title:"Attack on Titan Eren Yeager Figurine", price:3299, img:"attack-on-titan-eren-yeager-figurine.png", featured:true},
  {id:2, title:"My Hero Academia Volume 1", price:599, img:"my-hero-academia-volume-1.png", featured:true},
  {id:3, title:"One Piece Crew T-shirt", price:899, img:"one-piece-crew-tshirt.png", featured:true},
  {id:4, title:"Demon Slayer Poster Set", price:499, img:"demon-slayer-poster-set.png", featured:true},
  {id:5, title:"Naruto Shippuden Box Set", price:4499, img:"naruto-shippuden-box-set.png"},
  {id:6, title:"Dragon Ball Z Goku Figure", price:2199, img:"dragon-ball-z-goku-figure.png"},
  {id:7, title:"Sailor Moon Crystal Wand", price:1399, img:"sailor-moon-crystal-wand.png"},
  {id:8, title:"Death Note Notebook", price:299, img:"death-note-notebook.png"},
  {id:9, title:"Jujutsu Kaisen Hoodie", price:1099, img:"jujutsu-kaisen-hoodie.png"},
  {id:10, title:"Tokyo Ghoul Manga Set", price:3499, img:"tokyo-ghoul-manga-set.png"},
  {id:11, title:"Chainsaw Man Pochita Plush", price:799, img:"chainsaw-man-pochita-plush.png"},
  {id:12, title:"Hunter x Hunter Card Game", price:549, img:"hunter-x-hunter-card-game.png"},
  {id:13, title:"Fullmetal Alchemist Watch", price:1799, img:"fullmetal-alchemist-watch.png"},
  {id:14, title:"Sword Art Online Sword", price:2999, img:"sword-art-online-sword.png"},
  {id:15, title:"Attack on Titan 3D Gear", price:3899, img:"attack-on-titan-3d-gear.png"}
];

// --- State ---
let cart = JSON.parse(localStorage.getItem("cart") || "{}");
let loggedIn = false;

// --- Routing (simple hash-based) ---
window.addEventListener("DOMContentLoaded", renderApp);
window.addEventListener("hashchange", renderApp);

function renderApp() {
  const app = document.getElementById("app");
  const hash = location.hash.replace("#", "");
  if (hash === "products") renderProductsPage(app);
  else renderHomePage(app);
  updateCartCount();
}

// --- Home Page ---
function renderHomePage(app) {
  app.innerHTML = `
    <div>
      <div class="section-title">Featured Merchandise</div>
      <div id="featured">
        ${PRODUCTS.filter(p=>p.featured).map(cardHTML).join("")}
      </div>
      <div style="text-align:center;margin:2.5em 0 0 0;">
        <a href="#products" class="btn" style="font-size:1.1em;">Browse All Products</a>
      </div>
    </div>
  `;
  attachAddToCart();
}

// --- Products Page ---
function renderProductsPage(app) {
  app.innerHTML = `
    <div>
      <div class="section-title">All Products</div>
      <div id="product-grid">
        ${PRODUCTS.map(cardHTML).join("")}
      </div>
      <div style="text-align:center;margin:2.5em 0 0 0;">
        <a href="#" class="btn" style="font-size:1.1em;">Back to Home</a>
      </div>
    </div>
  `;
  attachAddToCart();
}

// --- Product Card HTML ---
function cardHTML(p) {
  return `
    <div class="product-card">
      <img src="assets/${p.img}" alt="${p.title}" />
      <div class="prod-title">${p.title}</div>
      <div class="prod-price">₹${p.price.toLocaleString('en-IN')}</div>
      <button class="btn" data-id="${p.id}">Add to Cart</button>
    </div>
  `;
}

// --- Cart Logic ---
function attachAddToCart() {
  document.querySelectorAll('.btn[data-id]').forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute("data-id");
      cart[id] = (cart[id] || 0) + 1;
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCount();
    };
  });
}
function updateCartCount() {
  const count = Object.values(cart).reduce((a,b)=>a+b, 0);
  document.getElementById("cart-count").textContent = count;
}

// --- Cart Modal ---
document.getElementById("cart-btn").onclick = () => showCartModal();
document.getElementById("close-cart").onclick = () => hideModal("cart-modal");
function showCartModal() {
  const modal = document.getElementById("cart-modal");
  const items = Object.entries(cart);
  const itemsDiv = document.getElementById("cart-items");
  if (!items.length) {
    itemsDiv.innerHTML = "<p>Your cart is empty.</p>";
    document.getElementById("cart-total").textContent = "₹0";
  } else {
    itemsDiv.innerHTML = items.map(([id,qty]) => cartItemHTML(id, qty)).join("");
    attachQtyBtns();
    document.getElementById("cart-total").textContent = "₹" + getCartTotal().toLocaleString('en-IN');
  }
  modal.classList.remove("hidden");
}
function cartItemHTML(id, qty) {
  const p = PRODUCTS.find(p=>p.id==id);
  return `
    <div class="cart-item" data-id="${id}">
      <img src="assets/${p.img}" alt="${p.title}" />
      <div class="prod-title">${p.title}</div>
      <div class="prod-qty">
        <button class="qty-btn" data-op="dec">-</button>
        <span>${qty}</span>
        <button class="qty-btn" data-op="inc">+</button>
      </div>
      <div class="prod-price">₹${(p.price*qty).toLocaleString('en-IN')}</div>
      <button class="remove-btn" title="Remove item">&times;</button>
    </div>
  `;
}
function attachQtyBtns() {
  document.querySelectorAll('.cart-item .qty-btn').forEach(btn => {
    btn.onclick = () => {
      const id = btn.closest(".cart-item").getAttribute("data-id");
      if (btn.getAttribute("data-op") === "inc") cart[id]++;
      else if (cart[id]>1) cart[id]--;
      localStorage.setItem("cart", JSON.stringify(cart));
      showCartModal();
      updateCartCount();
    };
  });
  document.querySelectorAll('.cart-item .remove-btn').forEach(btn => {
    btn.onclick = () => {
      const id = btn.closest(".cart-item").getAttribute("data-id");
      delete cart[id];
      localStorage.setItem("cart", JSON.stringify(cart));
      showCartModal();
      updateCartCount();
    };
  });
}
function getCartTotal() {
  return Object.entries(cart).reduce((sum, [id, qty]) => {
    const p = PRODUCTS.find(p=>p.id==id);
    return sum + p.price * qty;
  }, 0);
}
document.getElementById("checkout-btn").onclick = () => {
  hideModal("cart-modal");
  showCheckoutModal();
};

// --- Checkout Modal ---
document.getElementById("close-checkout").onclick = () => hideModal("checkout-modal");
function showCheckoutModal() {
  const modal = document.getElementById("checkout-modal");
  document.getElementById("checkout-success").classList.add("hidden");
  document.getElementById("checkout-form").reset();
  modal.classList.remove("hidden");
}
document.getElementById("checkout-form").onsubmit = (e) => {
  e.preventDefault();
  document.getElementById("checkout-success").classList.remove("hidden");
  cart = {};
  localStorage.removeItem("cart");
  updateCartCount();
};

// --- Login Modal (purely visual, no real auth) ---
document.getElementById("login-btn").onclick = () => {
  document.getElementById("login-modal").classList.remove("hidden");
};
document.getElementById("close-login").onclick = () => hideModal("login-modal");
document.getElementById("login-form").onsubmit = (e) => {
  e.preventDefault();
  loggedIn = true;
  hideModal("login-modal");
  alert("Login successful (fake, just a demo)!");
};

// --- Modal Utility ---
function hideModal(id) {
  document.getElementById(id).classList.add("hidden");
}

// --- Theme Toggle ---
const themeBtn = document.getElementById("theme-toggle");
themeBtn.onclick = () => {
  const body = document.body;
  const isDark = body.classList.toggle("light");
  themeBtn.innerHTML = isDark
    ? '<span class="icon-moon"></span>'
    : '<span class="icon-sun"></span>';
};