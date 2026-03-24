import React, { useContext } from 'react';
import { Plus, Star, Heart } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import { WishlistContext } from '../context/WishlistContext';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    const { addToCart } = useContext(CartContext);
    const { toggleWishlist, isInWishlist } = useContext(WishlistContext);

    const { id, title, price, image, images, rating, category, description, stock } = product;
    const displayImage = image || images?.[0];
    const isWished = isInWishlist(id);

    const handleWishlist = (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(product);
    };

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
    };

    return (
        <Link to={`/product/${id}`} className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-between border border-gray-100 dark:border-gray-700 relative">

            {/* Image Container with Hover Effect */}
            <div className="relative w-full h-64 overflow-hidden bg-gray-100 dark:bg-gray-900">
                <img
                    src={displayImage}
                    alt={title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute top-3 left-3 flex space-x-2">
                    <span className="bg-white/90 dark:bg-black/80 backdrop-blur-sm text-xs font-semibold px-2.5 py-1 rounded-full text-indigo-700 dark:text-indigo-400">
                        {category}
                    </span>
                </div>

                <button
                    onClick={handleWishlist}
                    className="absolute top-3 right-3 p-2 bg-white/90 dark:bg-black/80 backdrop-blur-sm rounded-full text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors shadow-sm z-10"
                >
                    <Heart size={18} className={isWished ? 'fill-red-500 text-red-500' : ''} />
                </button>
            </div>

            {/* Content */}
            <div className="p-5 w-full flex-1 flex flex-col justify-between space-y-4">
                <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                        {description}
                    </p>

                    <div className="flex items-center space-x-1 mt-3">
                        <Star className="text-yellow-400 fill-current" size={16} />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{rating}</span>
                    </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-700">
                    <span className="text-xl font-extrabold text-indigo-600 dark:text-indigo-400">
                        ${price.toFixed(2)}
                    </span>
                    <button
                        disabled={stock === 0}
                        onClick={handleAddToCart}
                        className={`flex items-center justify-center p-2 rounded-full transition-colors active:scale-95 shadow-md ${stock > 0
                                ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-700'
                            }`}
                        aria-label={`Add ${title} to cart`}
                    >
                        <Plus size={20} />
                    </button>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
