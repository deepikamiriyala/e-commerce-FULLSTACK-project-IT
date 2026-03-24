import React, { createContext, useState, useEffect, useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from './AuthContext';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const { user } = useContext(AuthContext);

    // Persist locally tied to user if exists, otherwise general
    const getStorageKey = () => user ? `wishlist_${user.id}` : 'wishlist_guest';

    const [wishlist, setWishlist] = useState(() => {
        const saved = localStorage.getItem(getStorageKey());
        return saved ? JSON.parse(saved) : [];
    });

    // Whenever user changes, load their specific wishlist
    useEffect(() => {
        const saved = localStorage.getItem(getStorageKey());
        setWishlist(saved ? JSON.parse(saved) : []);
    }, [user]);

    // Save whenever wishlist changes
    useEffect(() => {
        localStorage.setItem(getStorageKey(), JSON.stringify(wishlist));
    }, [wishlist, user]);

    const toggleWishlist = (product) => {
        setWishlist(prev => {
            const exists = prev.find(item => item.id === product.id);
            if (exists) {
                toast.success(`Removed ${product.title} from wishlist.`);
                return prev.filter(item => item.id !== product.id);
            } else {
                toast.success(`Added ${product.title} to wishlist!`);
                return [...prev, product];
            }
        });
    };

    const isInWishlist = (productId) => wishlist.some(item => item.id === productId);

    return (
        <WishlistContext.Provider value={{
            wishlist,
            toggleWishlist,
            isInWishlist
        }}>
            {children}
        </WishlistContext.Provider>
    );
};
