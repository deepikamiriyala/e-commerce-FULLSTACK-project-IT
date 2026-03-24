import { initDB } from './db';

initDB();

export const getProducts = () => {
    return JSON.parse(localStorage.getItem('products') || '[]');
};

// Create an explicit cache reference in case dynamic parts need it
const products = getProducts();
export { products };
