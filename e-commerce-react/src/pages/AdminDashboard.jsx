import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, ShoppingBag, DollarSign, TrendingUp, AlertCircle } from 'lucide-react';

const AdminDashboard = () => {
    const [stats, setStats] = useState({ users: 0, orders: 0, revenue: 0, lowStock: 0 });
    const [recentOrders, setRecentOrders] = useState([]);
    const [inventory, setInventory] = useState([]);

    // Mock data for charts
    const salesData = [
        { name: 'Mon', sales: 4000 },
        { name: 'Tue', sales: 3000 },
        { name: 'Wed', sales: 5000 },
        { name: 'Thu', sales: 2780 },
        { name: 'Fri', sales: 8900 },
        { name: 'Sat', sales: 12000 },
        { name: 'Sun', sales: 15000 },
    ];

    useEffect(() => {
        // Read from DB
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
        const products = JSON.parse(localStorage.getItem('products') || '[]');

        const revenue = orders.reduce((acc, curr) => acc + curr.total, 0);
        const lowStockCount = products.filter(p => p.stock < 10).length;

        setStats({
            users: users.length,
            orders: orders.length,
            revenue,
            lowStock: lowStockCount
        });

        setRecentOrders(orders.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5));
        setInventory(products);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Admin Dashboard</h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">Overview of your store's performance.</p>
                    </div>
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl font-bold transition-all shadow-md">
                        Download Report
                    </button>
                </div>

                {/* Top Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-2xl">
                                <DollarSign className="text-blue-600 dark:text-blue-400" size={24} />
                            </div>
                            <span className="flex items-center text-green-500 text-sm font-bold bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-lg">
                                <TrendingUp size={14} className="mr-1" /> +12%
                            </span>
                        </div>
                        <h3 className="text-gray-500 dark:text-gray-400 font-medium">Total Revenue</h3>
                        <p className="text-3xl font-extrabold text-gray-900 dark:text-white">${stats.revenue.toFixed(2)}</p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-2xl">
                                <ShoppingBag className="text-indigo-600 dark:text-indigo-400" size={24} />
                            </div>
                            <span className="flex items-center text-green-500 text-sm font-bold bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-lg">
                                <TrendingUp size={14} className="mr-1" /> +5%
                            </span>
                        </div>
                        <h3 className="text-gray-500 dark:text-gray-400 font-medium">Total Orders</h3>
                        <p className="text-3xl font-extrabold text-gray-900 dark:text-white">{stats.orders}</p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-2xl">
                                <Users className="text-purple-600 dark:text-purple-400" size={24} />
                            </div>
                        </div>
                        <h3 className="text-gray-500 dark:text-gray-400 font-medium">Registered Users</h3>
                        <p className="text-3xl font-extrabold text-gray-900 dark:text-white">{stats.users}</p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-2xl">
                                <AlertCircle className="text-red-600 dark:text-red-400" size={24} />
                            </div>
                        </div>
                        <h3 className="text-gray-500 dark:text-gray-400 font-medium">Low Stock Alerts</h3>
                        <p className="text-3xl font-extrabold text-gray-900 dark:text-white">{stats.lowStock}</p>
                    </div>
                </div>

                {/* Charts & Tables Split */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">

                    {/* Main Chart */}
                    <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Revenue This Week</h3>
                        <div className="h-72 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={salesData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" opacity={0.5} />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF' }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF' }} tickFormatter={(val) => `$${val / 1000}k`} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                    />
                                    <Line type="monotone" dataKey="sales" stroke="#4F46E5" strokeWidth={4} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 8 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Recent Orders List */}
                    <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex justify-between items-center">
                            Recent Orders
                            <button className="text-sm text-indigo-600 font-semibold hover:underline">View All</button>
                        </h3>
                        <div className="flex-1 overflow-auto divide-y divide-gray-100 dark:divide-gray-700 hide-scrollbar">
                            {recentOrders.length === 0 ? (
                                <p className="text-gray-500 text-center py-10">No recent orders</p>
                            ) : (
                                recentOrders.map(order => (
                                    <div key={order.id} className="py-4 flex justify-between items-center group">
                                        <div>
                                            <p className="font-bold text-gray-900 dark:text-white text-sm">{order.id}</p>
                                            <p className="text-xs text-gray-500">{new Date(order.date).toLocaleDateString()}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-extrabold text-indigo-600 dark:text-indigo-400">${order.total.toFixed(2)}</p>
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                                                {order.status}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                </div>

                {/* Inventory Table */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 overflow-x-auto">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Inventory Status</h3>
                    <table className="min-w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-200 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400">
                                <th className="py-3 px-4 font-semibold uppercase tracking-wider">Product</th>
                                <th className="py-3 px-4 font-semibold uppercase tracking-wider">SKU</th>
                                <th className="py-3 px-4 font-semibold uppercase tracking-wider">Price</th>
                                <th className="py-3 px-4 font-semibold uppercase tracking-wider">Stock</th>
                                <th className="py-3 px-4 font-semibold uppercase tracking-wider text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {inventory.slice(0, 10).map(item => (
                                <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                    <td className="py-4 px-4">
                                        <div className="flex items-center gap-3">
                                            <img src={item?.images?.[0] || item?.image} alt="" className="w-10 h-10 rounded-lg object-cover" />
                                            <span className="font-bold text-gray-900 dark:text-white text-sm">{item.title}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4 text-sm text-gray-500 dark:text-gray-400">{item.sku}</td>
                                    <td className="py-4 px-4 text-sm font-bold text-indigo-600 dark:text-indigo-400">${item.price.toFixed(2)}</td>
                                    <td className="py-4 px-4">
                                        <div className="flex items-center gap-2 text-sm font-bold">
                                            {item.stock}
                                            {item.stock < 10 && <AlertCircle size={14} className="text-red-500" />}
                                        </div>
                                    </td>
                                    <td className="py-4 px-4 text-right">
                                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${item.stock > 10 ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'}`}>
                                            {item.stock > 10 ? 'In Stock' : 'Low Stock'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
};

export default AdminDashboard;
