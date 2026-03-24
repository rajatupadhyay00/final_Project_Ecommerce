const mongoose = require('mongoose');
require('dotenv').config();

const Product = require('./models/Product');
const User = require('./models/User');

const products = [
    // Cements
    {
        name: 'UltraTech Cement OPC 53 Grade',
        category: 'Cements',
        price: 420,
        originalPrice: 460,
        image: '/images/cement-opc.png',
        description: 'High-quality OPC 53 grade cement suitable for all types of construction. Provides excellent strength and durability for structural work.',
        stock: 500,
        featured: true,
        rating: 4.5,
        unit: 'bag (50kg)'
    },
    {
        name: 'ACC Gold Cement PPC',
        category: 'Cements',
        price: 390,
        originalPrice: 420,
        image: '/images/cement-ppc.png',
        description: 'Portland Pozzolana Cement with superior finish quality. Ideal for plastering, brickwork and general construction.',
        stock: 350,
        featured: true,
        rating: 4.3,
        unit: 'bag (50kg)'
    },
    {
        name: 'Ambuja Cement OPC 43 Grade',
        category: 'Cements',
        price: 380,
        image: '/images/cement-opc.png',
        description: 'Reliable OPC 43 grade cement for residential construction. Known for its consistent quality and easy workability.',
        stock: 400,
        rating: 4.2,
        unit: 'bag (50kg)'
    },

    // Sand & Dust
    {
        name: 'River Sand (Fine Grade)',
        category: 'Sand & Dust',
        price: 65,
        originalPrice: 80,
        image: '/images/river-sand.png',
        description: 'Premium quality fine river sand for plastering and finishing work. Clean, sieved and free from impurities.',
        stock: 1000,
        featured: true,
        rating: 4.4,
        unit: 'cubic ft'
    },
    {
        name: 'M-Sand (Manufactured Sand)',
        category: 'Sand & Dust',
        price: 55,
        image: '/images/msand-dust.png',
        description: 'Eco-friendly manufactured sand, perfect substitute for river sand. Uniform grain size for better concrete quality.',
        stock: 800,
        rating: 4.1,
        unit: 'cubic ft'
    },
    {
        name: 'Stone Dust / Crusher Dust',
        category: 'Sand & Dust',
        price: 35,
        image: '/images/msand-dust.png',
        description: 'Quality stone dust ideal for backfilling, road construction and PCC work. Compacts well and provides solid base.',
        stock: 1200,
        rating: 4.0,
        unit: 'cubic ft'
    },

    // Tiles
    {
        name: 'Kajaria Glazed Vitrified Floor Tile',
        category: 'Tiles',
        price: 85,
        originalPrice: 110,
        image: '/images/floor-tiles.png',
        description: 'Premium 600x600mm glazed vitrified tile with marble finish. Scratch-resistant, anti-skid and easy to maintain.',
        stock: 2000,
        featured: true,
        rating: 4.6,
        unit: 'sq ft'
    },
    {
        name: 'Somany Ceramic Wall Tile',
        category: 'Tiles',
        price: 55,
        originalPrice: 70,
        image: '/images/wall-tiles.png',
        description: 'Beautiful 300x450mm ceramic wall tile with glossy finish. Perfect for kitchen and bathroom walls.',
        stock: 3000,
        rating: 4.3,
        unit: 'sq ft'
    },
    {
        name: 'Orient Bell Anti-Skid Floor Tile',
        category: 'Tiles',
        price: 72,
        image: '/images/antiskid-tiles.png',
        description: 'Heavy-duty anti-skid tiles for outdoor areas, balconies and parking. Weather resistant and durable.',
        stock: 1500,
        rating: 4.2,
        unit: 'sq ft'
    },

    // Paints
    {
        name: 'Asian Paints Royale Luxury Emulsion',
        category: 'Paints',
        price: 750,
        originalPrice: 850,
        image: '/images/paint-emulsion.png',
        description: 'Ultra-premium interior emulsion with Teflon surface protector. Stain-proof, washable and silk-smooth finish.',
        stock: 200,
        featured: true,
        rating: 4.7,
        unit: 'litre'
    },
    {
        name: 'Berger Weathercoat Exterior Paint',
        category: 'Paints',
        price: 520,
        image: '/images/paint-exterior.png',
        description: 'Long-lasting exterior paint with anti-algal and anti-fungal properties. Resists peeling and cracking for years.',
        stock: 150,
        rating: 4.4,
        unit: 'litre'
    },
    {
        name: 'Nerolac Excel Primer',
        category: 'Paints',
        price: 280,
        image: '/images/paint-primer.png',
        description: 'Water-based wall primer for interior and exterior surfaces. Ensures smooth and even paint application.',
        stock: 300,
        rating: 4.1,
        unit: 'litre'
    },

    // Stones
    {
        name: 'Kota Stone (Natural Brown)',
        category: 'Stones',
        price: 45,
        originalPrice: 55,
        image: '/images/stone-kota.png',
        description: 'Natural Kota limestone with fine grain texture. Perfect for flooring in commercial and residential spaces.',
        stock: 5000,
        featured: true,
        rating: 4.5,
        unit: 'sq ft'
    },
    {
        name: 'White Marble Slab',
        category: 'Stones',
        price: 120,
        image: '/images/stone-marble.png',
        description: 'Premium white marble slab with elegant veining. Ideal for countertops, flooring and decorative applications.',
        stock: 300,
        rating: 4.6,
        unit: 'sq ft'
    },
    {
        name: 'Granite Black Galaxy',
        category: 'Stones',
        price: 180,
        image: '/images/stone-granite.png',
        description: 'Exotic Black Galaxy granite with gold speckles. Perfect for kitchen countertops and premium flooring.',
        stock: 200,
        rating: 4.8,
        unit: 'sq ft'
    },

    // Iron Rods
    {
        name: 'TATA Tiscon TMT Bar 8mm',
        category: 'Iron Rods',
        price: 72,
        originalPrice: 82,
        image: '/images/iron-tmt.png',
        description: 'High-strength Fe-500D TMT rebars. Excellent ductility, weldability and earthquake resistance for RCC construction.',
        stock: 5000,
        featured: true,
        rating: 4.7,
        unit: 'kg'
    },
    {
        name: 'JSW NeoSteel TMT Bar 12mm',
        category: 'Iron Rods',
        price: 70,
        image: '/images/iron-tmt.png',
        description: 'Premium quality TMT bars with CRS technology. Superior bendability and corrosion resistance for lasting structures.',
        stock: 4000,
        rating: 4.5,
        unit: 'kg'
    },
    {
        name: 'Sail TMT Bar 16mm',
        category: 'Iron Rods',
        price: 68,
        image: '/images/iron-tmt.png',
        description: 'ISI certified TMT bars ideal for columns, beams and foundations. Consistent quality and reliable performance.',
        stock: 3500,
        rating: 4.3,
        unit: 'kg'
    },

    // Bricks
    {
        name: 'Red Clay Brick (First Class)',
        category: 'Bricks',
        price: 9,
        originalPrice: 11,
        image: '/images/bricks-red.png',
        description: 'Premium quality first-class red bricks with uniform shape and size. High compressive strength and low water absorption.',
        stock: 50000,
        featured: true,
        rating: 4.4,
        unit: 'piece'
    },
    {
        name: 'AAC Block (Autoclaved Aerated Concrete)',
        category: 'Bricks',
        price: 55,
        image: '/images/bricks-aac.png',
        description: 'Lightweight AAC blocks for modern construction. Excellent thermal insulation, fire resistance and sound absorption.',
        stock: 10000,
        rating: 4.5,
        unit: 'piece'
    },

    // Plumbing
    {
        name: 'CPVC Pipe 1 inch (3m)',
        category: 'Plumbing',
        price: 320,
        image: '/images/plumbing-pipes.png',
        description: 'High-quality CPVC pipes for hot and cold water supply. Lead-free, corrosion resistant with smooth inner surface.',
        stock: 500,
        rating: 4.3,
        unit: 'piece (3m)'
    },
    {
        name: 'PVC Drainage Pipe 4 inch (3m)',
        category: 'Plumbing',
        price: 450,
        image: '/images/plumbing-pipes.png',
        description: 'Heavy-duty PVC drainage pipes for sewage and waste water. High impact strength and chemical resistance.',
        stock: 300,
        rating: 4.2,
        unit: 'piece (3m)'
    }
];

const adminUser = {
    name: 'Admin',
    email: 'admin@nawal.com',
    password: 'admin123',
    role: 'admin'
};

const customerUser = {
    name: 'Rajat',
    email: 'rajat@example.com',
    password: 'user123',
    role: 'user'
};

async function seed() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Clear existing data
        await Product.deleteMany({});
        await User.deleteMany({});
        console.log('🗑️  Cleared existing data');

        // Seed products
        await Product.insertMany(products);
        console.log(`📦 Seeded ${products.length} products`);

        // Seed users
        const admin = new User(adminUser);
        await admin.save();
        const customer = new User(customerUser);
        await customer.save();
        console.log('👤 Seeded admin (admin@nawal.com / admin123) and customer (rajat@example.com / user123)');

        console.log('\n🎉 Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Seeding error:', error.message);
        process.exit(1);
    }
}

seed();
