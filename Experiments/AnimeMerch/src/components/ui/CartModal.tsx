import React from 'react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import CartItem from './CartItem';
import Button from './Button';
import { X, ShoppingBag } from 'lucide-react';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
  const { cartItems, totalPrice, totalItems } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="cart-modal">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div 
          className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity" 
          aria-hidden="true"
          onClick={onClose}
        ></div>

        <div className="inline-block align-bottom bg-white dark:bg-gray-900 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white dark:bg-gray-900 px-4 pt-5 pb-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Your Cart</h3>
              <button
                type="button"
                className="text-gray-400 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-300"
                onClick={onClose}
              >
                <X size={24} aria-hidden="true" />
              </button>
            </div>
            
            {cartItems.length === 0 ? (
              <div className="py-8 text-center">
                <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">Your cart is empty</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Start shopping to add items to your cart
                </p>
                <div className="mt-6">
                  <Button 
                    variant="primary" 
                    onClick={onClose}
                  >
                    Continue Shopping
                  </Button>
                </div>
              </div>
            ) : (
              <div className="mt-2">
                <div className="flow-root">
                  <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {cartItems.map((item) => (
                      <CartItem key={item.product.id} item={item} />
                    ))}
                  </div>
                </div>
                
                <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white">
                    <p>Subtotal ({totalItems} items)</p>
                    <p>${totalPrice.toFixed(2)}</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
                    Shipping and taxes calculated at checkout.
                  </p>
                  
                  <div className="mt-6 flex justify-between gap-4">
                    <Button 
                      variant="outline" 
                      fullWidth
                      onClick={onClose}
                    >
                      Continue Shopping
                    </Button>
                    <Link to="/checkout" className="w-full">
                      <Button
                        variant="primary"
                        fullWidth
                        onClick={onClose}
                      >
                        Checkout
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartModal;