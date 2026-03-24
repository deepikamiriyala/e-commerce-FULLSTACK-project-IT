import React, { createContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Provide a boolean for quick route checks
    const isAuthenticated = !!user;

    useEffect(() => {
        const session = localStorage.getItem('sessionUser');
        if (session) {
            setUser(JSON.parse(session));
        }
    }, []);

    const login = (email, password) => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const found = users.find(u => u.email === email && u.password === password);
        if (found) {
            setUser(found);
            localStorage.setItem('sessionUser', JSON.stringify(found));
            toast.success(`Welcome back, ${found.name || 'User'}!`);
            return true;
        } else {
            toast.error("Invalid email or password.");
            return false;
        }
    };

    const register = (email, password, name) => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        if (users.find(u => u.email === email)) {
            toast.error("User with this email already exists.");
            return false;
        }
        const newUser = { id: Date.now(), email, password, name, role: 'user' };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        // Auto-login
        setUser(newUser);
        localStorage.setItem('sessionUser', JSON.stringify(newUser));
        toast.success("Registration successful!");
        return true;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('sessionUser');
        toast.success("Logged out successfully.");
    };

    const updateProfile = (data) => {
        const updated = { ...user, ...data };
        setUser(updated);
        localStorage.setItem('sessionUser', JSON.stringify(updated));
        // Also update in users mock table
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const idx = users.findIndex(u => u.id === user.id);
        if (idx > -1) {
            users[idx] = updated;
            localStorage.setItem('users', JSON.stringify(users));
        }
        toast.success("Profile updated!");
    };

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated,
            login,
            register,
            logout,
            updateProfile
        }}>
            {children}
        </AuthContext.Provider>
    );
};
