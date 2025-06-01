import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import LoginPage from './pages/LoginPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import CartModal from './components/ui/CartModal';
import { ShoppingCart } from 'lucide-react';

function App() {
  const [cartModalOpen, setCartModalOpen] = useState(false);

  // Fixed cart toggle button for mobile
  const CartToggle = () => (
    <button
      onClick={() => setCartModalOpen(true)}
      className="md:hidden fixed bottom-6 right-6 z-30 bg-purple-600 text-white p-3 rounded-full shadow-lg flex items-center justify-center"
      aria-label="Open cart"
    >
      <ShoppingCart size={24} />
    </button>
  );

  return (
    <ThemeProvider>
      <CartProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
            </Routes>
          </Layout>
          <CartToggle />
          <CartModal isOpen={cartModalOpen} onClose={() => setCartModalOpen(false)} />
        </Router>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;