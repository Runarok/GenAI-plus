import React from 'react';
import { Product } from '../../types';
import Button from './Button';
import { useCart } from '../../context/CartContext';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover"
        />
        {product.featured && (
          <div className="absolute top-2 right-2 bg-pink-500 text-white text-xs px-2 py-1 rounded-full">
            Featured
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
          {product.category}
        </div>
        <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-3 text-sm line-clamp-2">
          {product.description}
        </p>
        <div className="flex justify-between items-center">
          <span className="font-bold text-lg text-purple-600 dark:text-purple-400">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          <Button 
            variant="primary" 
            size="sm"
            onClick={() => addToCart(product)}
            className="flex items-center gap-1"
          >
            <ShoppingCart size={16} />
            <span>Add</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;