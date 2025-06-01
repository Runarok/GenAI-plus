import React from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/ui/ProductCard';
import Button from '../components/ui/Button';
import { ArrowRight } from 'lucide-react';

const HomePage: React.FC = () => {
  const featuredProducts = products.filter(product => product.featured);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-700 to-indigo-900 dark:from-purple-900 dark:to-indigo-950">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/8089185/pexels-photo-8089185.jpeg?auto=compress&cs=tinysrgb&w=1600')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Your Ultimate Anime & Manga Shop
            </h1>
            <p className="text-xl text-purple-100 mb-8">
              Discover premium collectibles, manga, apparel, and more from your favorite series.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/products">
                <Button variant="primary" size="lg">
                  Shop Now
                </Button>
              </Link>
              <Link to="/products?category=featured">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                  Featured Items
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Featured Products
          </h2>
          <Link to="/products" className="text-purple-600 dark:text-purple-400 font-medium flex items-center hover:underline">
            View All <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-gray-100 dark:bg-gray-900 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Shop By Category
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <CategoryCard 
              title="Figurines & Collectibles"
              image="https://images.pexels.com/photos/2124696/pexels-photo-2124696.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              link="/products?category=Figurines"
            />
            <CategoryCard 
              title="Manga & Comics"
              image="https://images.pexels.com/photos/3747139/pexels-photo-3747139.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              link="/products?category=Manga"
            />
            <CategoryCard 
              title="Apparel & Accessories"
              image="https://images.pexels.com/photos/6311387/pexels-photo-6311387.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              link="/products?category=Apparel"
            />
            <CategoryCard 
              title="Posters & Art"
              image="https://images.pexels.com/photos/5083225/pexels-photo-5083225.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              link="/products?category=Posters"
            />
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-purple-100 dark:bg-purple-900/20 rounded-xl p-8 md:p-12">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Join Our Newsletter
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Subscribe to get exclusive deals, early access to new collections, and more!
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <Button variant="primary">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

interface CategoryCardProps {
  title: string;
  image: string;
  link: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, image, link }) => {
  return (
    <Link to={link} className="group relative overflow-hidden rounded-lg shadow-md h-64">
      <div className="absolute inset-0 bg-black opacity-40 group-hover:opacity-30 transition-opacity z-10"></div>
      <img 
        src={image} 
        alt={title}
        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <h3 className="text-white text-xl font-bold text-center px-4">{title}</h3>
      </div>
    </Link>
  );
};

export default HomePage;