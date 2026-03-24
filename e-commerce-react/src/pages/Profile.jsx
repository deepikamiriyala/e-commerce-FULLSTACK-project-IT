import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Package, User, MapPin, Settings, LogOut, Download, CheckCircle, Truck, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

const Profile = () => {
    const { user, updateProfile, logout } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState('orders');
    const [orders, setOrders] = useState([]);

    const [editName, setEditName] = useState(user?.name || '');

    useEffect(() => {
        // Fetch user specific orders from local storage mock DB
        const allOrders = JSON.parse(localStorage.getItem('orders') || '[]');
        setOrders(allOrders.filter(o => o.userId === user?.id).sort((a, b) => new Date(b.date) - new Date(a.date)));
    }, [user]);

    const handleUpdate = (e) => {
        e.preventDefault();
        updateProfile({ name: editName });
    };

    const handleInvoiceDownload = (orderId) => {
        toast.success(`Invoice for ${orderId} downloaded!`);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col md:flex-row gap-8">

                {/* Sidebar */}
                <div className="md:w-1/4">
                    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                        <div className="p-6 bg-indigo-50 dark:bg-indigo-900/20 flex flex-col items-center">
                            <div className="w-24 h-24 bg-indigo-200 dark:bg-indigo-800 rounded-full flex items-center justify-center text-3xl font-bold text-indigo-700 dark:text-indigo-300 mb-4 shadow-inner border-4 border-white dark:border-gray-800">
                                {user?.name?.charAt(0) || 'U'}
                            </div>
                            <h3 className="font-extrabold text-gray-900 dark:text-white text-xl">{user?.name}</h3>
                            <p className="text-gray-500 text-sm truncate w-full text-center">{user?.email}</p>
                        </div>
                        <div className="flex flex-col p-2 space-y-1">
                            <button onClick={() => setActiveTab('orders')} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'orders' ? 'bg-indigo-50 text-indigo-600 dark:bg-gray-700 dark:text-indigo-400' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'}`}>
                                <Package size={20} /> Order History
                            </button>
                            <button onClick={() => setActiveTab('profile')} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'profile' ? 'bg-indigo-50 text-indigo-600 dark:bg-gray-700 dark:text-indigo-400' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'}`}>
                                <User size={20} /> Account Details
                            </button>
                            <button onClick={() => setActiveTab('address')} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'address' ? 'bg-indigo-50 text-indigo-600 dark:bg-gray-700 dark:text-indigo-400' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'}`}>
                                <MapPin size={20} /> Saved Addresses
                            </button>
                            <button onClick={() => logout()} className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors mt-4">
                                <LogOut size={20} /> Log Out
                            </button>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="md:w-3/4">

                    {activeTab === 'orders' && (
                        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 p-8">
                            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-6">Order History</h2>

                            {orders.length === 0 ? (
                                <div className="text-center py-12 text-gray-500">No past orders found.</div>
                            ) : (
                                <div className="space-y-6">
                                    {orders.map(order => (
                                        <div key={order.id} className="border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-sm">
                                            <div className="bg-gray-50 dark:bg-gray-900 px-6 py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                                <div className="flex gap-8 text-sm">
                                                    <div><span className="block text-gray-500">Order Placed</span> <span className="font-bold dark:text-white">{new Date(order.date).toLocaleDateString()}</span></div>
                                                    <div><span className="block text-gray-500">Total</span> <span className="font-bold dark:text-white">${order.total.toFixed(2)}</span></div>
                                                    <div><span className="block text-gray-500">Order ID:</span> <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">{order.id}</span></div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <span className={`px-3 py-1 text-xs font-bold rounded-full ${order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500' : 'bg-green-100 text-green-800'}`}>
                                                        {order.status}
                                                    </span>
                                                    <button onClick={() => handleInvoiceDownload(order.id)} className="text-indigo-600 hover:underline text-sm font-semibold flex items-center gap-1">
                                                        <Download size={16} /> Invoice
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Tracking Stepper */}
                                            <div className="px-6 pt-6 pb-2 border-b border-gray-100 dark:border-gray-700">
                                                <div className="relative">
                                                    <div className="absolute top-4 left-4 right-4 h-1 bg-gray-200 dark:bg-gray-700 rounded"></div>
                                                    <div className="absolute top-4 left-4 h-1 bg-green-500 rounded transition-all duration-500" style={{ width: order.status === 'Processing' ? '33%' : order.status === 'Shipped' ? '66%' : '100%' }}></div>
                                                    <div className="flex justify-between relative z-10">
                                                        <div className="flex flex-col items-center">
                                                            <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold border-4 border-gray-50 dark:border-gray-800 shadow-sm"><CheckCircle size={16} /></div>
                                                            <span className="text-xs font-bold mt-2 dark:text-gray-300">Processing</span>
                                                        </div>
                                                        <div className="flex flex-col items-center">
                                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold border-4 border-gray-50 dark:border-gray-800 shadow-sm ${order.status !== 'Processing' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400 dark:bg-gray-700'}`}><Truck size={16} /></div>
                                                            <span className="text-xs font-bold mt-2 dark:text-gray-300">Shipped</span>
                                                        </div>
                                                        <div className="flex flex-col items-center">
                                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold border-4 border-gray-50 dark:border-gray-800 shadow-sm ${order.status === 'Delivered' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400 dark:bg-gray-700'}`}><Package size={16} /></div>
                                                            <span className="text-xs font-bold mt-2 dark:text-gray-300">Delivered</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="p-6 divide-y divide-gray-100 dark:divide-gray-700">
                                                {order.items.map((item, idx) => (
                                                    <div key={idx} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                                                        <img src={item.image} className="w-16 h-16 rounded-xl object-cover" alt="" />
                                                        <div className="flex-1">
                                                            <h4 className="font-bold text-gray-900 dark:text-white">{item.title}</h4>
                                                            {item.selectedVariant && (
                                                                <p className="text-sm text-gray-500">Options: {Object.values(item.selectedVariant)[0]}</p>
                                                            )}
                                                            <p className="text-indigo-600 dark:text-indigo-400 font-extrabold mt-1">${item.price.toFixed(2)} <span className="text-gray-400 text-sm font-normal">x {item.quantity}</span></p>
                                                        </div>
                                                        <div className="hidden sm:block">
                                                            <button className="px-4 py-2 border border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400 rounded-lg text-sm font-bold hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors">
                                                                Write Review
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="bg-gray-50 dark:bg-gray-900/50 px-6 py-4 text-sm flex items-center justify-between border-t border-gray-200 dark:border-gray-700">
                                                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                                    {order.status === 'Delivered' ? (
                                                        <><CheckCircle size={16} className="text-green-500" /> Delivered On: <span className="font-bold text-gray-900 dark:text-white">{new Date(order.estimatedDelivery).toLocaleDateString()}</span></>
                                                    ) : (
                                                        <><Clock size={16} className="text-indigo-500" /> Estimated Delivery: <span className="font-bold text-gray-900 dark:text-white">{new Date(order.estimatedDelivery).toLocaleDateString()}</span></>
                                                    )}
                                                </div>
                                                {order.status === 'Processing' && (
                                                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">Arriving Soon</span>
                                                )}
                                                {order.status === 'Delivered' && (
                                                    <span className="text-xs font-bold text-green-600 dark:text-green-400">Completed</span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'profile' && (
                        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 p-8">
                            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-6">Account Details</h2>
                            <form onSubmit={handleUpdate} className="space-y-6 max-w-lg">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                                    <input type="text" value={editName} onChange={e => setEditName(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                                    <input type="email" disabled value={user?.email} className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-500 cursor-not-allowed" />
                                    <p className="text-xs text-gray-400 mt-1">Email cannot be changed.</p>
                                </div>
                                <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-md active:scale-95">
                                    Save Changes
                                </button>
                            </form>
                        </div>
                    )}

                    {activeTab === 'address' && (
                        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 p-8">
                            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-6">Saved Addresses</h2>

                            <div className="border border-indigo-200 dark:border-indigo-800 rounded-2xl p-6 relative bg-indigo-50/50 dark:bg-indigo-900/10">
                                <span className="absolute top-4 right-4 bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded font-bold dark:bg-indigo-900 dark:text-indigo-300">Default</span>
                                <p className="font-bold text-lg dark:text-white">{user?.name}</p>
                                <p className="text-gray-600 dark:text-gray-400 mt-2">
                                    123 Tech Avenue, Suite 400<br />
                                    San Francisco, CA 94105<br />
                                    United States
                                </p>
                                <div className="mt-4 flex gap-4 text-sm">
                                    <button className="text-indigo-600 font-bold hover:underline">Edit</button>
                                    <button className="text-red-500 font-bold hover:underline">Remove</button>
                                </div>
                            </div>

                            <button className="mt-6 flex items-center justify-center gap-2 w-full py-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl text-gray-600 dark:text-gray-400 font-bold hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                                <span>+ Add New Address</span>
                            </button>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default Profile;
