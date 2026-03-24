import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Sun, Moon, Package, Heart, User, LayoutDashboard, LogIn, Menu, X } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';
import { CartContext } from '../context/CartContext';
import { WishlistContext } from '../context/WishlistContext';
import { AuthContext } from '../context/AuthContext';

const Navbar = ({ searchTerm, setSearchTerm }) => {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const { cartCount } = useContext(CartContext);
    const { wishlist } = useContext(WishlistContext);
    const { user, isAuthenticated } = useContext(AuthContext);
    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800 transition-colors shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-[72px]">

                    <div className="flex items-center">
                        <Link to="/" className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 transition-colors group">
                            <Package size={30} className="transform group-hover:rotate-12 transition-transform duration-300" />
                            <span className="font-extrabold text-2xl tracking-tight hidden sm:block">NexusShop</span>
                        </Link>
                    </div>

                    {location.pathname === '/' && (
                        <div className="flex-1 max-w-2xl mx-8 hidden md:block">
                            <div className="relative group">
                                <input
                                    type="text"
                                    placeholder="Search products, categories, brands..."
                                    value={searchTerm || ''}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 border-2 border-transparent rounded-2xl py-2.5 px-6 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 outline-none transition-all shadow-inner font-medium"
                                />
                            </div>
                        </div>
                    )}

                    <div className="hidden md:flex items-center space-x-6">
                        <button
                            onClick={toggleTheme}
                            className="p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300 border border-transparent hover:border-gray-200 dark:hover:border-gray-700 hover:shadow-sm"
                            aria-label="Toggle Dark Mode"
                        >
                            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                        </button>

                        <div className="h-6 w-px bg-gray-200 dark:bg-gray-700"></div>

                        <Link to="/wishlist" className="relative p-2.5 text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors">
                            <Heart size={24} className={wishlist.length > 0 ? "fill-red-500 text-red-500" : ""} />
                            {wishlist.length > 0 && (
                                <span className="absolute top-0 right-0 -mt-1 -mr-1 flex items-center justify-center bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 border-2 border-white dark:border-gray-900 shadow-sm animate-pulse-slow">
                                    {wishlist.length}
                                </span>
                            )}
                        </Link>

                        <Link to="/cart" className="relative p-2.5 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors group">
                            <ShoppingCart size={24} className="transform group-hover:-rotate-12 transition-transform duration-300" />
                            {cartCount > 0 && (
                                <span className="absolute top-0 right-0 -mt-1 -mr-1 flex items-center justify-center bg-indigo-600 text-white text-xs font-bold rounded-full h-5 w-5 border-2 border-white dark:border-gray-900 shadow-sm">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        {isAuthenticated ? (
                            <div className="flex items-center space-x-4 ml-2">
                                {user?.role === 'admin' && (
                                    <Link to="/admin" className="p-2.5 text-gray-600 dark:text-gray-300 hover:text-indigo-600 transition-colors" title="Admin Dashboard">
                                        <LayoutDashboard size={24} />
                                    </Link>
                                )}
                                <Link to="/profile" className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 py-2 px-4 rounded-full transition-colors border border-gray-200 dark:border-gray-700">
                                    <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold">
                                        {user.name?.charAt(0) || 'U'}
                                    </div>
                                    <span className="text-sm font-bold text-gray-700 dark:text-gray-200 hidden lg:block max-w-[100px] truncate">{user.name}</span>
                                </Link>
                            </div>
                        ) : (
                            <Link to="/auth" className="flex items-center space-x-2 bg-gray-900 dark:bg-indigo-600 hover:bg-gray-800 dark:hover:bg-indigo-700 text-white py-2 px-5 rounded-full transition-colors shadow-md active:scale-95 font-semibold text-sm">
                                <LogIn size={18} />
                                <span>Sign In</span>
                            </Link>
                        )}
                    </div>

                    <div className="md:hidden flex items-center">
                        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-gray-600 dark:text-gray-300">
                            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden border-t border-gray-200 dark:border-gray-800 py-4 pb-6 space-y-4">
                        {location.pathname === '/' && (
                            <div className="px-4">
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    value={searchTerm || ''}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 rounded-xl py-3 px-4 outline-none"
                                />
                            </div>
                        )}
                        <div className="flex justify-around px-4 border-b border-gray-200 dark:border-gray-800 pb-4">
                            <Link to="/wishlist" onClick={() => setMobileMenuOpen(false)} className="flex flex-col items-center text-gray-600 dark:text-gray-300">
                                <Heart size={24} className={wishlist.length > 0 ? "fill-red-500 text-red-500" : ""} />
                                <span className="text-xs mt-1 font-bold">Wishlist</span>
                            </Link>
                            <Link to="/cart" onClick={() => setMobileMenuOpen(false)} className="flex flex-col items-center text-gray-600 dark:text-gray-300 relative">
                                <ShoppingCart size={24} />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 right-2 flex items-center justify-center bg-indigo-600 text-white text-[10px] font-bold rounded-full h-4 w-4">
                                        {cartCount}
                                    </span>
                                )}
                                <span className="text-xs mt-1 font-bold">Cart</span>
                            </Link>
                            <button
                                onClick={() => { toggleTheme(); setMobileMenuOpen(false); }}
                                className="flex flex-col items-center text-gray-600 dark:text-gray-300"
                            >
                                {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
                                <span className="text-xs mt-1 font-bold">Theme</span>
                            </button>
                        </div>

                        <div className="px-6 flex flex-col space-y-3 pt-2">
                            {isAuthenticated ? (
                                <>
                                    <Link to="/profile" onClick={() => setMobileMenuOpen(false)} className="flex items-center space-x-3 text-gray-700 dark:text-gray-200 font-bold bg-gray-100 dark:bg-gray-800 p-3 rounded-xl">
                                        <User size={20} /> <span>My Profile</span>
                                    </Link>
                                    {user?.role === 'admin' && (
                                        <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className="flex items-center space-x-3 text-gray-700 dark:text-gray-200 font-bold bg-gray-100 dark:bg-gray-800 p-3 rounded-xl">
                                            <LayoutDashboard size={20} /> <span>Admin Panel</span>
                                        </Link>
                                    )}
                                </>
                            ) : (
                                <Link to="/auth" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-center space-x-2 bg-indigo-600 text-white py-3 rounded-xl font-bold">
                                    <LogIn size={20} /> <span>Sign In / Register</span>
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
