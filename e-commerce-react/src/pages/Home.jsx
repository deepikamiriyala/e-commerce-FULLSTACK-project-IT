import React, { useState, useMemo } from 'react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { Filter, X } from 'lucide-react';

const Home = ({ searchTerm }) => {
    const [selectedCategory, setSelectedCategory] = useState("All");

    const categories = ["All", ...new Set(products.map(p => p.category))];

    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;

            return matchesSearch && matchesCategory;
        });
    }, [searchTerm, selectedCategory]);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors py-8">
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header section with categories */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                    <div>
                        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">
                            Discover Products
                        </h1>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                            Browse our curated collection of premium goods.
                        </p>
                    </div>

                    {/* Category Filter */}
                    <div className="flex bg-white dark:bg-gray-800 p-1.5 rounded-full shadow-sm overflow-x-auto border border-gray-100 dark:border-gray-700 hide-scrollbar scroll-smooth">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedCategory === category
                                    ? 'bg-indigo-600 text-white shadow-md'
                                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-indigo-600 dark:hover:text-indigo-400'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Results Info */}
                {(searchTerm || selectedCategory !== "All") && (
                    <div className="mb-6 flex items-center justify-between bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-xl border border-indigo-100 dark:border-indigo-800">
                        <span className="text-indigo-800 dark:text-indigo-300 font-medium">
                            Showing {filteredProducts.length} results {searchTerm && `for "${searchTerm}"`}
                        </span>
                        <button
                            onClick={() => {
                                // To reset search term we'd need passed function, here we just reset category,
                                // but we let Navbar handle the search reset if needed.
                                setSelectedCategory("All");
                            }}
                            className="text-indigo-600 dark:text-indigo-400 hover:underline text-sm font-semibold flex items-center gap-1"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}

                {/* Product Grid */}
                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-900 mb-4">
                            <span className="text-2xl">🔍</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No products found</h3>
                        <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
                            We couldn't find anything matching "{searchTerm}". Try adjusting your search or filters.
                        </p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Home;
