import React from 'react';
import { CartItem as CartItemType } from '../../types';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity } = item;

  return (
    <div className="flex items-center py-4 border-b border-gray-200 dark:border-gray-700">
      <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover"
        />
      </div>
      
      <div className="ml-4 flex-1">
        <h3 className="text-sm font-medium text-gray-900 dark:text-white">
          {product.name}
        </h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          ₹{product.price.toLocaleString('en-IN')} each
        </p>
      </div>
      
      <div className="flex items-center">
        <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md">
          <button
            type="button"
            className="p-1 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
            onClick={() => updateQuantity(product.id, quantity - 1)}
          >
            <Minus size={16} />
          </button>
          <span className="px-2 py-1 text-gray-700 dark:text-gray-300">
            {quantity}
          </span>
          <button
            type="button"
            className="p-1 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
            onClick={() => updateQuantity(product.id, quantity + 1)}
          >
            <Plus size={16} />
          </button>
        </div>
        
        <button
          type="button"
          className="ml-4 text-red-500 hover:text-red-700"
          onClick={() => removeFromCart(product.id)}
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;