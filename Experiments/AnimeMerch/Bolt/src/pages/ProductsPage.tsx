import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products, categories } from '../data/products';
import ProductCard from '../components/ui/ProductCard';
import { Filter, Search } from 'lucide-react';
import Button from '../components/ui/Button';

const ProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const category = searchParams.get('category') || '';
    setActiveCategory(category);
    
    let filtered = [...products];
    
    // Filter by category if selected
    if (category) {
      filtered = filtered.filter(product => 
        category === 'featured' 
          ? product.featured 
          : product.category === category
      );
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query)
      );
    }
    
    setFilteredProducts(filtered);
  }, [searchParams, searchQuery]);

  const handleCategoryChange = (category: string) => {
    if (category === activeCategory) {
      // If clicking the active category, clear it
      searchParams.delete('category');
      setActiveCategory('');
    } else {
      searchParams.set('category', category);
      setActiveCategory(category);
    }
    setSearchParams(searchParams);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The filtering is handled by the useEffect
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {activeCategory ? (
            activeCategory === 'featured' ? 'Featured Products' : `${activeCategory}`
          ) : 'All Products'}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Discover our collection of high-quality anime and manga merchandise
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-8">
        {/* Mobile Filter Toggle */}
        <div className="md:hidden">
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={18} className="mr-2" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </Button>
        </div>

        {/* Sidebar Filters */}
        <div className={`w-full md:w-64 ${showFilters ? 'block' : 'hidden'} md:block`}>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="font-semibold text-lg text-gray-900 dark:text-white mb-4">Categories</h2>
            <div className="space-y-2">
              <button
                className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                  activeCategory === '' 
                    ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                onClick={() => handleCategoryChange('')}
              >
                All Products
              </button>
              <button
                className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                  activeCategory === 'featured' 
                    ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                onClick={() => handleCategoryChange('featured')}
              >
                Featured
              </button>
              {categories.map(category => (
                <button
                  key={category}
                  className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                    activeCategory === category 
                      ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => handleCategoryChange(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          {/* Search */}
          <form onSubmit={handleSearch} className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full py-2 px-4 pr-10 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <Search size={20} className="text-gray-400" />
              </div>
            </div>
          </form>

          {filteredProducts.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No products found</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Try adjusting your search or filter criteria
              </p>
              <Button 
                variant="primary"
                onClick={() => {
                  setSearchQuery('');
                  setSearchParams({});
                }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;