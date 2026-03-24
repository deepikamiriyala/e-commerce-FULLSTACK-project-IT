import React, { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LogIn, UserPlus } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const { login, register, isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    // If already authenticated, go home or checkout
    React.useEffect(() => {
        if (isAuthenticated) {
            if (location.state?.from === '/checkout') navigate('/checkout');
            else navigate('/profile');
        }
    }, [isAuthenticated, navigate, location]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isLogin) {
            if (login(email, password)) {
                navigate(location.state?.from || '/profile');
            }
        } else {
            if (register(email, password, name)) {
                navigate(location.state?.from || '/profile');
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 transition-colors">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700"
            >
                <div>
                    <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
                        {isLogin ? 'Sign in to your account' : 'Create a new account'}
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                        {isLogin ? 'Or ' : 'Already have an account? '}
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 transition-colors"
                        >
                            {isLogin ? 'start your 14-day free trial' : 'Sign in instead'}
                        </button>
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm space-y-4">
                        <AnimatePresence>
                            {!isLogin && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden"
                                >
                                    <label className="sr-only" htmlFor="name">Full Name</label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        required={!isLogin}
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="appearance-none rounded-xl relative block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition-all"
                                        placeholder="Full Name"
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div>
                            <label className="sr-only" htmlFor="email-address">Email address</label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="appearance-none rounded-xl relative block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition-all"
                                placeholder="Email address"
                            />
                        </div>
                        <div>
                            <label className="sr-only" htmlFor="password">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete={isLogin ? "current-password" : "new-password"}
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="appearance-none rounded-xl relative block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition-all"
                                placeholder="Password"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform active:scale-95 transition-all shadow-md"
                        >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                {isLogin ? (
                                    <LogIn className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                                ) : (
                                    <UserPlus className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                                )}
                            </span>
                            {isLogin ? 'Sign in' : 'Create Account'}
                        </button>
                    </div>
                </form>

                {/* Mock Social Logins */}
                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                                Or continue with
                            </span>
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-3">
                        <button disabled className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 opacity-60 cursor-not-allowed">
                            Google
                        </button>
                        <button disabled className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 opacity-60 cursor-not-allowed">
                            GitHub
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Auth;
