import React, { useState, useContext } from 'react';

import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, CreditCard, CheckCircle, Truck } from 'lucide-react';

const steps = [
    { id: 1, name: 'Shipping Address', icon: MapPin },
    { id: 2, name: 'Payment Details', icon: CreditCard },
    { id: 3, name: 'Review Order', icon: CheckCircle },
];

const Checkout = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const { cartItems, cartTotal, clearCart } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    // Simple state for forms since react-form needs specific configuration,
    // we'll use standard controlled inputs to guarantee stability.
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [formData, setFormData] = useState({
        fullName: user?.name || '',
        address: '',
        city: '',
        zipCode: '',
        cardNumber: '',
        expiryDate: '',
        cvv: ''
    });

    if (cartItems.length === 0) {
        navigate('/cart');
        return null;
    }

    const handleNext = () => {
        if (currentStep === 1) {
            if (!formData.fullName || !formData.address || !formData.city || !formData.zipCode) {
                toast.error("Please fill out all shipping fields");
                return;
            }
        }
        if (currentStep === 2) {
            if (paymentMethod === 'card') {
                if (!formData.cardNumber || !formData.expiryDate || !formData.cvv) {
                    toast.error("Please fill out all payment fields");
                    return;
                }
                if (formData.cardNumber.length < 16) {
                    toast.error("Invalid card number");
                    return;
                }
            }
        }
        setCurrentStep(prev => Math.min(prev + 1, 3));
    };

    const handlePlaceOrder = () => {
        toast.success('Order placed successfully! Processing payment...');
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + 3);

        const newOrder = {
            id: `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
            userId: user.id,
            items: cartItems,
            total: cartTotal * 1.08, // with Tax
            status: 'Processing',
            date: new Date().toISOString(),
            shipping: formData.address,
            paymentMethod,
            estimatedDelivery: targetDate.toISOString()
        };

        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
        orders.push(newOrder);
        localStorage.setItem('orders', JSON.stringify(orders));

        setTimeout(() => {
            clearCart();
            toast.success('Invoice generated! Thank you for shopping.');
            navigate('/profile');
        }, 2000);
    };

    const tax = cartTotal * 0.08;
    const total = cartTotal + tax;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 transition-colors">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Stepper Header */}
                <div className="mb-12">
                    <div className="flex justify-between items-center relative">
                        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-200 dark:bg-gray-700 z-0"></div>
                        <div
                            className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-indigo-600 transition-all duration-500 z-0"
                            style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
                        ></div>

                        {steps.map((step) => {
                            const Icon = step.icon;
                            const isActive = step.id === currentStep;
                            const isCompleted = step.id < currentStep;

                            return (
                                <div key={step.id} className="relative z-10 flex flex-col items-center">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 font-bold border-4 border-gray-50 dark:border-gray-900 shadow-md
                    ${isActive ? 'bg-indigo-600 text-white scale-110' :
                                            isCompleted ? 'bg-indigo-500 text-white' : 'bg-white text-gray-400 dark:bg-gray-800 dark:text-gray-500'}
                  `}>
                                        <Icon size={20} />
                                    </div>
                                    <span className={`mt-3 text-sm font-bold absolute -bottom-8 w-32 text-center ${isActive ? 'text-indigo-600 dark:text-indigo-400' :
                                        isCompleted ? 'text-gray-900 dark:text-gray-100' : 'text-gray-400 dark:text-gray-500'
                                        }`}>
                                        {step.name}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Content Container */}
                <motion.div
                    key={currentStep}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden mt-16 border border-gray-100 dark:border-gray-700 p-8"
                >
                    {/* Step 1: Shipping */}
                    {currentStep === 1 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                <MapPin className="text-indigo-500" /> Shipping Information
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                                    <input type="text" value={formData.fullName} onChange={e => setFormData({ ...formData, fullName: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Street Address</label>
                                    <input type="text" value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">City</label>
                                    <input type="text" value={formData.city} onChange={e => setFormData({ ...formData, city: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">ZIP / Postal Code</label>
                                    <input type="text" value={formData.zipCode} onChange={e => setFormData({ ...formData, zipCode: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Payment */}
                    {currentStep === 2 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                <CreditCard className="text-indigo-500" /> Payment Details
                            </h2>

                            <div className="flex gap-4 mb-6">
                                <button
                                    onClick={() => setPaymentMethod('card')}
                                    className={`flex-1 py-4 px-4 rounded-2xl border-2 font-bold transition-all ${paymentMethod === 'card' ? 'border-indigo-600 bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300' : 'border-gray-200 text-gray-600 dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800'}`}
                                >
                                    Pay with Card
                                </button>
                                <button
                                    onClick={() => setPaymentMethod('cod')}
                                    className={`flex-1 py-4 px-4 rounded-2xl border-2 font-bold transition-all ${paymentMethod === 'cod' ? 'border-indigo-600 bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300' : 'border-gray-200 text-gray-600 dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800'}`}
                                >
                                    Cash on Delivery
                                </button>
                            </div>

                            {paymentMethod === 'card' ? (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                                    <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 md:mb-6 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                                        <div className="flex gap-4">
                                            <div className="h-10 w-16 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-xs italic">VISA</div>
                                            <div className="h-10 w-16 bg-orange-500 rounded flex items-center justify-center text-white font-bold text-xs italic">MC</div>
                                        </div>
                                        <div className="text-sm font-medium text-green-600 dark:text-green-400 flex items-center gap-1">
                                            <CheckCircle size={16} /> Secure Encrypted Connection
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Card Number</label>
                                            <input type="text" maxLength={16} placeholder="0000 0000 0000 0000" value={formData.cardNumber} onChange={e => setFormData({ ...formData, cardNumber: e.target.value.replace(/\D/g, '') })} className="w-full tracking-widest px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-mono" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Expiry Date (MM/YY)</label>
                                            <input type="text" maxLength={5} placeholder="MM/YY" value={formData.expiryDate} onChange={e => setFormData({ ...formData, expiryDate: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">CVV</label>
                                            <input type="password" maxLength={3} placeholder="123" value={formData.cvv} onChange={e => setFormData({ ...formData, cvv: e.target.value.replace(/\D/g, '') })} className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center text-center">
                                    <Truck size={48} className="text-indigo-500 mb-4" />
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Pay upon delivery</h3>
                                    <p className="text-gray-500 dark:text-gray-400">You can pay in cash or via UPI when your order reaches your doorstep.</p>
                                </motion.div>
                            )}
                        </div>
                    )}

                    {/* Step 3: Review */}
                    {currentStep === 3 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                <CheckCircle className="text-green-500" /> Review Your Order
                            </h2>

                            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 space-y-4">
                                <h3 className="font-bold text-lg dark:text-white border-b dark:border-gray-700 pb-2">Order Items</h3>
                                {cartItems.map((item, idx) => (
                                    <div key={idx} className="flex justify-between text-sm py-2">
                                        <div className="flex items-center gap-4">
                                            <img src={item.image} className="w-12 h-12 rounded object-cover" alt="" />
                                            <div>
                                                <p className="font-semibold dark:text-white">{item.title}</p>
                                                <p className="text-gray-500">Qty: {item.quantity}</p>
                                            </div>
                                        </div>
                                        <p className="font-bold dark:text-white">${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                <div className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                                    <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                        <MapPin size={18} /> Shipping To
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                                        {formData.fullName}<br />
                                        {formData.address}<br />
                                        {formData.city}, {formData.zipCode}
                                    </p>
                                </div>

                                <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl p-6 border border-indigo-100 dark:border-indigo-800/50">
                                    <div className="space-y-3 text-sm mb-4 border-b border-indigo-200 dark:border-indigo-800 pb-4">
                                        <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">Subtotal</span><span className="font-bold dark:text-white">${cartTotal.toFixed(2)}</span></div>
                                        <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">Shipping</span><span className="font-bold text-green-600">Free</span></div>
                                        <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">Tax</span><span className="font-bold dark:text-white">${tax.toFixed(2)}</span></div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="font-bold text-gray-900 dark:text-white">Total</span>
                                        <span className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">${total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="mt-10 flex justify-between pt-6 border-t border-gray-100 dark:border-gray-700">
                        {currentStep > 1 ? (
                            <button
                                onClick={() => setCurrentStep(prev => prev - 1)}
                                className="px-6 py-3 rounded-xl font-bold text-gray-700 dark:text-gray-300 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
                            >
                                Back
                            </button>
                        ) : <div></div>}

                        {currentStep < 3 ? (
                            <button
                                onClick={handleNext}
                                className="px-8 py-3 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md transition-all active:scale-95 flex items-center gap-2"
                            >
                                Continue
                            </button>
                        ) : (
                            <button
                                onClick={handlePlaceOrder}
                                className="px-10 py-3 rounded-xl font-extrabold text-white bg-green-600 hover:bg-green-700 shadow-lg shadow-green-500/30 transition-all active:scale-95 flex items-center gap-2"
                            >
                                <CheckCircle /> Confirm & Pay
                            </button>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Checkout;
