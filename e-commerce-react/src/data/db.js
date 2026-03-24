export const initialProducts = [
    {
        id: 1,
        title: "Premium Wireless ANC Headphones",
        price: 299.99,
        category: "Electronics",
        subcategory: "Audio",
        brand: "SonicTech",
        sku: "ST-ANC-9000",
        stock: 45,
        description: "High-quality noise-canceling wireless headphones with up to 30 hours of battery life and studio-grade sound.",
        details: "These headphones feature dual noise sensor technology, seamless bluetooth connection, and high-res audio support.",
        images: [
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&h=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=800&h=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=800&h=800&auto=format&fit=crop"
        ],
        variants: [
            { color: "Black", stock: 25 },
            { color: "Silver", stock: 20 }
        ],
        rating: 4.8,
        reviews: [
            { user: "Alex J.", rating: 5, comment: "Best headphones ever! The ANC is crazy good.", date: "2023-11-12", verified: true },
            { user: "Sarah M.", rating: 4, comment: "Great sound, slightly heavy on the head for long hours.", date: "2023-12-05", verified: true }
        ],
        createdAt: new Date().toISOString()
    },
    {
        id: 2,
        title: "Minimalist Mechanical Keyboard Pro",
        price: 149.50,
        category: "Electronics",
        subcategory: "Peripherals",
        brand: "KeyMaster",
        sku: "KM-PRO-84",
        stock: 12,
        description: "Compact mechanical keyboard with tactile brown switches and customizable RGB backlight.",
        details: "Hot-swappable PCB, PBT keycaps, and a solid aluminum frame.",
        images: [
            "https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=800&h=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1601445638532-3c6f6c3aa831?q=80&w=800&h=800&auto=format&fit=crop"
        ],
        variants: [
            { switch: "Brown", stock: 5 },
            { switch: "Red", stock: 7 }
        ],
        rating: 4.6,
        reviews: [],
        createdAt: new Date(Date.now() - 10000000).toISOString()
    },
    {
        id: 3,
        title: "Ergonomic Office Chair V2",
        price: 349.00,
        category: "Furniture",
        subcategory: "Office",
        brand: "ErgoSit",
        sku: "ES-CH-V2",
        stock: 0,
        description: "Ergonomic chair with lumbar support, breathable mesh, and 4D adjustable armrests.",
        details: "Designed for 8+ hours of comfortable sitting. Holds up to 300 lbs.",
        images: [
            "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?q=80&w=800&h=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=800&h=800&auto=format&fit=crop"
        ],
        variants: [
            { color: "Black", stock: 0 },
            { color: "Grey", stock: 0 }
        ],
        rating: 4.5,
        reviews: [
            { user: "Mike R.", rating: 5, comment: "Fixed my back pain!", date: "2024-01-10", verified: true }
        ],
        createdAt: new Date(Date.now() - 50000000).toISOString()
    },
    {
        id: 4,
        title: "Smart Watch Series 7 X",
        price: 399.00,
        category: "Electronics",
        subcategory: "Wearables",
        brand: "NovaTech",
        sku: "SW-S7X",
        stock: 120,
        description: "Advanced smartwatch with fitness tracking, ECG, SpO2 sensor, and always-on retina display.",
        details: "Water-resistant up to 50m. Built-in GPS and cellular capabilities.",
        images: [
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&h=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=800&h=800&auto=format&fit=crop"
        ],
        variants: [
            { size: "41mm", stock: 50 },
            { size: "45mm", stock: 70 }
        ],
        rating: 4.9,
        reviews: [
            { user: "Emily C.", rating: 5, comment: "Love the battery life and display brightness.", date: "2024-02-15", verified: true }
        ],
        createdAt: new Date().toISOString()
    },
    {
        id: 5,
        title: "Urban Tech Backpack",
        price: 85.00,
        category: "Accessories",
        subcategory: "Bags",
        brand: "Nomad",
        sku: "NMD-BP-01",
        stock: 80,
        description: "Water-resistant laptop backpack with USB charging port and anti-theft design.",
        details: "Fits up to 15.6 inch laptops. Hidden pockets and padded back panel.",
        images: [
            "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&h=800&auto=format&fit=crop"
        ],
        variants: [
            { color: "Black", stock: 40 },
            { color: "Navy", stock: 40 }
        ],
        rating: 4.7,
        reviews: [],
        createdAt: new Date().toISOString()
    },
    {
        id: 6,
        title: "Pro DSLR Camera Kit",
        price: 1299.99,
        category: "Electronics",
        subcategory: "Cameras",
        brand: "Lumina",
        sku: "LUM-DSLR-K",
        stock: 5,
        description: "24.2 MP Full-Frame Mirrorless camera with 28-70mm lens kit. Perfect for pros and beginners.",
        details: "4K video recording, 5-axis image stabilization, fast autofocus.",
        images: [
            "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800&h=800&auto=format&fit=crop"
        ],
        variants: [],
        rating: 4.9,
        reviews: [
            { user: "Dave W.", rating: 5, comment: "Incredible image quality. Perfect upgrade.", date: "2023-10-05", verified: true }
        ],
        createdAt: new Date().toISOString()
    }
];

export const initDB = () => {
    if (!localStorage.getItem('products')) {
        localStorage.setItem('products', JSON.stringify(initialProducts));
    }
    if (!localStorage.getItem('users')) {
        // default admin
        localStorage.setItem('users', JSON.stringify([
            { id: 1, email: "admin@nexus.com", password: "password", role: "admin", name: "Admin Nexus" }
        ]));
    }
    if (!localStorage.getItem('orders')) {
        localStorage.setItem('orders', JSON.stringify([]));
    }
};
