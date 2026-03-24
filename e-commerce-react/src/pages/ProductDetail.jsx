import React, { useState, useContext, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ShieldCheck, Truck, RotateCcw, Heart, Share2, Plus, Minus } from 'lucide-react';
import { products } from '../data/products';
import { CartContext } from '../context/CartContext';
import { WishlistContext } from '../context/WishlistContext';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const product = products.find(p => p.id === parseInt(id));

    const { addToCart } = useContext(CartContext);
    const { toggleWishlist, isInWishlist } = useContext(WishlistContext);

    const [mainImage, setMainImage] = useState(product?.images?.[0] || product?.image);
    const [selectedVariant, setSelectedVariant] = useState(
        product?.variants && product.variants.length > 0 ? product.variants[0] : null
    );
    const [quantity, setQuantity] = useState(1);

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <h2 className="text-2xl font-bold dark:text-white">Product not found.</h2>
                <button onClick={() => navigate('/')} className="ml-4 text-indigo-500 hover:underline">Go Home</button>
            </div>
        );
    }

    const isWished = isInWishlist(product.id);
    const stockAvailable = selectedVariant ? selectedVariant.stock : product.stock;

    const handleAddToCart = () => {
        // Add specific variant data to the cart item if variant exists
        const cartItem = {
            ...product,
            // override base image with main active one just in case
            image: mainImage,
            selectedVariant,
            id: selectedVariant ? `${product.id}-${Object.values(selectedVariant)[0]}` : product.id
        };

        // Actually we will call addToCart multiple times or use a custom function. We'll simulate adding.
        // In a real app we'd pass quantity. Our current CartContext increments by 1. Let's adapt inside.
        addToCart(cartItem);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        >
            <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">

                {/* Product Images */}
                <div className="flex flex-col-reverse lg:flex-row gap-4 mb-8 lg:mb-0">
                    <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto lg:h-[600px] hide-scrollbar pb-2 lg:pb-0 lg:pr-2">
                        {(product.images || [product.image]).map((img, idx) => (
                            <button
                                key={idx}
                                onClick={() => setMainImage(img)}
                                className={`relative flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden border-2 transition-all ${mainImage === img ? 'border-indigo-600' : 'border-transparent hover:border-indigo-400'
                                    }`}
                            >
                                <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>
                    <div className="flex-1 w-full relative bg-gray-100 dark:bg-gray-800 rounded-3xl overflow-hidden lg:h-[600px] group">
                        <img
                            src={mainImage}
                            alt={product.title}
                            className="w-full h-full object-cover transform cursor-zoom-in group-hover:scale-125 transition-transform duration-500 origin-center"
                        />
                        {/* Wishlist Floating Button */}
                        <button
                            onClick={() => toggleWishlist(product)}
                            className="absolute top-4 right-4 p-3 bg-white/80 dark:bg-black/60 backdrop-blur-md rounded-full text-gray-900 dark:text-white hover:text-red-500 dark:hover:text-red-400 transition-colors shadow-lg"
                        >
                            <Heart size={24} className={isWished ? 'fill-red-500 text-red-500' : ''} />
                        </button>
                    </div>
                </div>

                {/* Product Details */}
                <div className="flex flex-col">
                    <div className="mb-2 flex items-center space-x-2 text-sm text-indigo-600 dark:text-indigo-400 font-semibold tracking-wide uppercase">
                        <span>{product.category}</span>
                        {product.subcategory && (
                            <>
                                <span className="text-gray-400 dark:text-gray-600">/</span>
                                <span>{product.subcategory}</span>
                            </>
                        )}
                    </div>

                    <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
                        {product.title}
                    </h1>

                    {/* Price & Rating */}
                    <div className="flex items-center justify-between mb-6">
                        <p className="text-3xl font-extrabold text-gray-900 dark:text-white">
                            ${product.price.toFixed(2)}
                        </p>
                        <div className="flex items-center space-x-2">
                            <div className="flex text-yellow-400">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star key={star} size={20} className={star <= Math.round(product.rating) ? 'fill-current' : 'text-gray-300 dark:text-gray-600'} />
                                ))}
                            </div>
                            <span className="text-sm text-gray-600 dark:text-gray-400 font-medium whitespace-nowrap">
                                {product.rating} ({product.reviews?.length || 0} reviews)
                            </span>
                        </div>
                    </div>

                    <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                        {product.description}
                    </p>

                    {/* Variants */}
                    {product.variants && product.variants.length > 0 && (
                        <div className="mb-8">
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase mb-3">Available Options</h3>
                            <div className="flex flex-wrap gap-3">
                                {product.variants.map((v, idx) => {
                                    const keyName = Object.keys(v).find(k => k !== 'stock');
                                    const val = v[keyName];
                                    const disabled = v.stock === 0;

                                    return (
                                        <button
                                            key={idx}
                                            disabled={disabled}
                                            onClick={() => setSelectedVariant(v)}
                                            className={`px-5 py-2.5 rounded-xl border text-sm font-bold transition-all ${selectedVariant === v
                                                    ? 'border-indigo-600 bg-indigo-50 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300 dark:border-indigo-500 ring-2 ring-indigo-600 ring-offset-2 dark:ring-offset-gray-900'
                                                    : disabled
                                                        ? 'border-gray-200 text-gray-400 bg-gray-50 cursor-not-allowed dark:border-gray-800 dark:bg-gray-800/50 dark:text-gray-600'
                                                        : 'border-gray-300 text-gray-700 bg-white hover:border-gray-400 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300'
                                                }`}
                                        >
                                            {val} {disabled && '(Out of stock)'}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Stock Info */}
                    <div className="flex items-center mb-8">
                        <div className={`flex items-center text-sm font-semibold ${stockAvailable > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                            <span className={`w-2 h-2 rounded-full mr-2 ${stockAvailable > 0 ? 'bg-green-500' : 'bg-red-500'}`}></span>
                            {stockAvailable > 0 ? `${stockAvailable} in stock. Ready to ship.` : 'Currently Out of Stock'}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4 mb-10 pb-10 border-b border-gray-200 dark:border-gray-800">
                        <button
                            disabled={stockAvailable === 0}
                            onClick={handleAddToCart}
                            className={`flex-1 py-4 px-8 rounded-2xl text-lg font-bold transition-all duration-300 shadow-md ${stockAvailable > 0
                                    ? 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-xl active:scale-95'
                                    : 'bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-gray-800 dark:text-gray-500 border border-gray-300 dark:border-gray-700'
                                }`}
                        >
                            {stockAvailable > 0 ? 'Add to Cart' : 'Sold Out'}
                        </button>
                        <button className="p-4 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-2xl text-gray-900 dark:text-white transition-colors active:scale-95">
                            <Share2 size={24} />
                        </button>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-start space-x-3">
                            <Truck className="flex-shrink-0 text-indigo-500" size={24} />
                            <div>
                                <span className="block font-bold text-gray-900 dark:text-white">Free Global Delivery</span>
                                <span>Orders over $100</span>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3">
                            <RotateCcw className="flex-shrink-0 text-indigo-500" size={24} />
                            <div>
                                <span className="block font-bold text-gray-900 dark:text-white">30-Day Returns</span>
                                <span>No questions asked</span>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3">
                            <ShieldCheck className="flex-shrink-0 text-indigo-500" size={24} />
                            <div>
                                <span className="block font-bold text-gray-900 dark:text-white">2 Year Warranty</span>
                                <span>Full coverage</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Reviews Section */}
            {product.reviews && product.reviews.length > 0 && (
                <div className="mt-20 border-t border-gray-200 dark:border-gray-800 pt-16">
                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-10">Customer Reviews</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {product.reviews.map((review, i) => (
                            <div key={i} className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h4 className="font-bold text-gray-900 dark:text-white flex items-center">
                                            {review.user}
                                            {review.verified && (
                                                <span className="ml-2 text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 px-2 py-0.5 rounded-full font-semibold">Verified</span>
                                            )}
                                        </h4>
                                        <span className="text-sm text-gray-500 dark:text-gray-400">{review.date}</span>
                                    </div>
                                    <div className="flex text-yellow-400">
                                        {[1, 2, 3, 4, 5].map(star => (
                                            <Star key={star} size={16} className={star <= review.rating ? 'fill-current' : 'text-gray-300 dark:text-gray-600'} />
                                        ))}
                                    </div>
                                </div>
                                <p className="text-gray-700 dark:text-gray-300 italic">"{review.comment}"</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default ProductDetail;
