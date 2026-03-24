import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Cart from './pages/Cart';
import ProductDetail from './pages/ProductDetail';
import Auth from './pages/Auth';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import Wishlist from './pages/Wishlist';

import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';

// Protected Route Wrapper
const ProtectedRoute = ({ children, adminOnly = false }) => {
    return (
        <AuthContext.Consumer>
            {({ user, isAuthenticated }) => {
                if (!isAuthenticated) return <Navigate to="/auth" />;
                if (adminOnly && user?.role !== 'admin') return <Navigate to="/" />;
                return children;
            }}
        </AuthContext.Consumer>
    );
};

function App() {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <ThemeProvider>
            <AuthProvider>
                <WishlistProvider>
                    <CartProvider>
                        <Router>
                            <div className="flex flex-col min-h-screen font-sans bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
                                <Toaster position="top-right" />
                                <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

                                <main className="flex-grow">
                                    <Routes>
                                        <Route path="/" element={<Home searchTerm={searchTerm} />} />
                                        <Route path="/product/:id" element={<ProductDetail />} />
                                        <Route path="/cart" element={<Cart />} />
                                        <Route path="/auth" element={<Auth />} />
                                        <Route path="/wishlist" element={<Wishlist />} />

                                        {/* Protected Routes */}
                                        <Route path="/checkout" element={
                                            <ProtectedRoute>
                                                <Checkout />
                                            </ProtectedRoute>
                                        } />
                                        <Route path="/profile" element={
                                            <ProtectedRoute>
                                                <Profile />
                                            </ProtectedRoute>
                                        } />

                                        {/* Admin Routes */}
                                        <Route path="/admin/*" element={
                                            <ProtectedRoute adminOnly={true}>
                                                <AdminDashboard />
                                            </ProtectedRoute>
                                        } />
                                    </Routes>
                                </main>

                                {/* Advanced Footer */}
                                <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-12 mt-auto text-gray-500 dark:text-gray-400">
                                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
                                        <div>
                                            <h4 className="font-bold text-gray-900 dark:text-white mb-4">NexusShop</h4>
                                            <p className="text-sm">Your ultimate advanced e-commerce platform offering premium products with unparalleled smart AI-driven recommendations.</p>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 dark:text-white mb-4">Quick Links</h4>
                                            <ul className="space-y-2 text-sm">
                                                <li><a href="/" className="hover:text-indigo-500 transition-colors">Home</a></li>
                                                <li><a href="/cart" className="hover:text-indigo-500 transition-colors">Cart</a></li>
                                                <li><a href="/wishlist" className="hover:text-indigo-500 transition-colors">Wishlist</a></li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 dark:text-white mb-4">Support</h4>
                                            <ul className="space-y-2 text-sm">
                                                <li><a href="#" className="hover:text-indigo-500 transition-colors">FAQs</a></li>
                                                <li><a href="#" className="hover:text-indigo-500 transition-colors">Return Policy</a></li>
                                                <li><a href="#" className="hover:text-indigo-500 transition-colors">Track Order</a></li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 dark:text-white mb-4">Secure Checkout</h4>
                                            <p className="text-sm mb-4">We accept multiple payment methods including credit cards and UPI with full encryption.</p>
                                        </div>
                                    </div>
                                    <div className="border-t border-gray-100 dark:border-gray-800 mt-8 pt-8 text-center text-sm">
                                        &copy; {new Date().getFullYear()} NexusShop. All rights reserved. Built for production scale.
                                    </div>
                                </footer>
                            </div>
                        </Router>
                    </CartProvider>
                </WishlistProvider>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;
