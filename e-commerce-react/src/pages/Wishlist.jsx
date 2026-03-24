import React, { useContext } from 'react';
import { WishlistContext } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';
import { Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Wishlist = () => {
    const { wishlist } = useContext(WishlistContext);

    if (wishlist.length === 0) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
                <div className="w-32 h-32 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6 shadow-inner">
                    <Heart size={48} className="text-gray-400 dark:text-gray-600" />
                </div>
                <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">Your Wishlist is Empty</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-sm text-center">
                    Explore our collections and save your favorite items here to review them later.
                </p>
                <Link
                    to="/"
                    className="inline-flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-md"
                >
                    <span>Discover Products</span>
                    <ArrowRight size={20} />
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex items-center space-x-3 mb-10">
                <Heart size={32} className="text-red-500 fill-current" />
                <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Your Saved Items</h1>
                <span className="ml-4 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold px-3 py-1 rounded-full text-sm">
                    {wishlist.length} Items
                </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {wishlist.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default Wishlist;
