import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiTruck, FiShield, FiClock, FiStar } from 'react-icons/fi';
import API from '../api/axios';
import ProductCard from '../components/ProductCard';
import './HomePage.css';

const categories = [
    { name: 'Cements', image: '/images/cement-opc.png', color: '#e3f2fd' },
    { name: 'Sand & Dust', image: '/images/river-sand.png', color: '#fff3e0' },
    { name: 'Tiles', image: '/images/floor-tiles.png', color: '#f3e5f5' },
    { name: 'Paints', image: '/images/paint-emulsion.png', color: '#e8f5e9' },
    { name: 'Stones', image: '/images/stone-kota.png', color: '#fce4ec' },
    { name: 'Iron Rods', image: '/images/iron-tmt.png', color: '#e0f2f1' },
    { name: 'Bricks', image: '/images/bricks-red.png', color: '#fff8e1' },
    { name: 'Plumbing', image: '/images/plumbing-pipes.png', color: '#e8eaf6' },
];

const features = [
    { icon: <FiTruck size={28} />, title: 'Free Delivery', desc: 'On orders above ₹5,000' },
    { icon: <FiShield size={28} />, title: 'Quality Assured', desc: 'Genuine branded products' },
    { icon: <FiClock size={28} />, title: 'Fast Dispatch', desc: 'Same day processing' },
    { icon: <FiStar size={28} />, title: 'Best Prices', desc: 'Competitive wholesale rates' },
];

export default function HomePage() {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        API.get('/products?featured=true&limit=8')
            .then(res => setFeaturedProducts(res.data.products))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-overlay" />
                <div className="container hero-content">
                    <span className="hero-badge">🏆 Trusted Since 2010</span>
                    <h1 className="hero-title">
                        Build Your <span className="text-gold">Dream</span> With
                        <br />Premium Materials
                    </h1>
                    <p className="hero-desc">
                        Nawal Building Material – Your one-stop shop for quality cements, tiles, paints, stones & more. Serving contractors and homeowners with excellence.
                    </p>
                    <div className="hero-actions">
                        <Link to="/products" className="btn btn-gold btn-lg">
                            Shop Now <FiArrowRight />
                        </Link>
                        <Link to="/products?category=Cements" className="btn btn-outline btn-lg hero-outline-btn">
                            Browse Cements
                        </Link>
                    </div>
                    <div className="hero-stats">
                        <div className="stat"><span>15K+</span>Happy Customers</div>
                        <div className="stat"><span>200+</span>Products</div>
                        <div className="stat"><span>50+</span>Brands</div>
                    </div>
                </div>
            </section>

            {/* Features Strip */}
            <section className="features-strip">
                <div className="container">
                    <div className="features-grid">
                        {features.map((f, i) => (
                            <div key={i} className="feature-item">
                                <div className="feature-icon">{f.icon}</div>
                                <div>
                                    <strong>{f.title}</strong>
                                    <p>{f.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="section">
                <div className="container">
                    <h2 className="section-title">Shop by Category</h2>
                    <p className="section-subtitle">Find exactly what you need for your project</p>
                    <div className="categories-grid">
                        {categories.map((cat) => (
                            <Link
                                key={cat.name}
                                to={`/products?category=${encodeURIComponent(cat.name)}`}
                                className="category-card"
                                style={{ background: cat.color }}
                            >
                                <img src={cat.image} alt={cat.name} className="category-img" />
                                <span className="category-name">{cat.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="section featured-section">
                <div className="container">
                    <h2 className="section-title">Featured Products</h2>
                    <p className="section-subtitle">Hand-picked top quality materials for your project</p>
                    {loading ? (
                        <div className="spinner-container"><div className="spinner" /></div>
                    ) : (
                        <div className="products-grid">
                            {featuredProducts.map(product => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    )}
                    <div style={{ textAlign: 'center', marginTop: '40px' }}>
                        <Link to="/products" className="btn btn-primary btn-lg">
                            View All Products <FiArrowRight />
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Banner */}
            <section className="cta-section">
                <div className="container cta-content">
                    <h2>Need Bulk Orders?</h2>
                    <p>Contact us for wholesale pricing and special contractor discounts</p>
                    <a href="tel:+919876543210" className="btn btn-gold btn-lg">
                        Call Us Now: +91 98765 43210
                    </a>
                </div>
            </section>
        </div>
    );
}
