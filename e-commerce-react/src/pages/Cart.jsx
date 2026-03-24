import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import { CartContext } from '../context/CartContext';

const Cart = () => {
    const { cartItems, updateQuantity, removeFromCart, cartTotal, clearCart } = useContext(CartContext);

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-white dark:bg-gray-800 rounded-3xl p-12 shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="w-32 h-32 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span className="text-4xl text-gray-400">🛒</span>
                    </div>
                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">Your cart is empty</h2>
                    <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
                        Looks like you haven't added anything to your cart yet. Browse our products and find something you'll love!
                    </p>
                    <Link
                        to="/"
                        className="inline-flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
                    >
                        <span>Start Shopping</span>
                        <ArrowRight size={20} />
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="flex flex-col md:flex-row gap-8">

                    {/* Cart Items */}
                    <div className="md:w-2/3">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Shopping Cart</h2>
                            <span className="text-gray-600 dark:text-gray-400 font-medium bg-gray-200 dark:bg-gray-800 px-3 py-1 rounded-full">
                                {cartItems.length} items
                            </span>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden divide-y divide-gray-100 dark:divide-gray-700">
                            {cartItems.map((item) => (
                                <div key={item.id} className="p-6 flex flex-col sm:flex-row items-center gap-6 group hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">

                                    <img src={item.image} alt={item.title} className="w-24 h-24 object-cover rounded-xl shadow-sm" />

                                    <div className="flex-1 text-center sm:text-left">
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                            <Link to="/">{item.title}</Link>
                                        </h3>
                                        <p className="text-indigo-600 dark:text-indigo-400 font-extrabold mt-1">${item.price.toFixed(2)}</p>
                                    </div>

                                    <div className="flex items-center space-x-4">
                                        <div className="flex items-center bg-gray-100 dark:bg-gray-900 rounded-full border border-gray-200 dark:border-gray-700">
                                            <button
                                                onClick={() => updateQuantity(item.id, -1)}
                                                className="p-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                                                aria-label="Decrease quantity"
                                            >
                                                <Minus size={18} />
                                            </button>
                                            <span className="w-8 text-center font-semibold text-gray-900 dark:text-white">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, 1)}
                                                className="p-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                                                aria-label="Increase quantity"
                                            >
                                                <Plus size={18} />
                                            </button>
                                        </div>

                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-full transition-all duration-300 hover:scale-110"
                                            aria-label={`Remove ${item.title}`}
                                        >
                                            <Trash2 size={22} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={clearCart}
                                className="text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 font-semibold transition-colors flex items-center gap-2"
                            >
                                <Trash2 size={16} /> Empty entire cart
                            </button>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="md:w-1/3">
                        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 p-8 sticky top-24">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">Order Summary</h3>

                            <div className="space-y-4 text-gray-600 dark:text-gray-300 mb-6">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span className="font-semibold text-gray-900 dark:text-white">${cartTotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping limit</span>
                                    <span className="text-green-500 font-semibold">Free</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Tax (estimated)</span>
                                    <span className="font-semibold text-gray-900 dark:text-white">${(cartTotal * 0.08).toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="border-t border-gray-100 dark:border-gray-700 pt-6 mb-8 flex items-end justify-between">
                                <div>
                                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Due</span>
                                </div>
                                <span className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">
                                    ${(cartTotal * 1.08).toFixed(2)}
                                </span>
                            </div>

                            <Link to="/checkout" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-6 rounded-2xl shadow-md transition-all duration-300 transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2">
                                Checkout Now <ArrowRight size={20} />
                            </Link>

                            <div className="mt-4 text-center">
                                <Link to="/" className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
                                    Or continue shopping
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Cart;
