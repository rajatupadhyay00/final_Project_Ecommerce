import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiShoppingCart, FiStar, FiMinus, FiPlus, FiArrowLeft, FiCheck } from 'react-icons/fi';
import API from '../api/axios';
import { useCart } from '../context/CartContext';
import './ProductDetailPage.css';

export default function ProductDetailPage() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();

    useEffect(() => {
        API.get(`/products/${id}`)
            .then(res => setProduct(res.data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <div className="spinner-container"><div className="spinner" /></div>;
    if (!product) return <div className="container" style={{ padding: '80px 24px', textAlign: 'center' }}><h2>Product not found</h2></div>;

    const discount = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;

    return (
        <div className="product-detail-page">
            <div className="container">
                <Link to="/products" className="back-link">
                    <FiArrowLeft /> Back to Products
                </Link>

                <div className="detail-grid">
                    <div className="detail-image-section">
                        <div className="detail-image-wrapper">
                            <img src={product.image} alt={product.name} />
                            {discount > 0 && <span className="discount-badge">-{discount}%</span>}
                        </div>
                    </div>

                    <div className="detail-info">
                        <span className="detail-category">{product.category}</span>
                        <h1 className="detail-name">{product.name}</h1>

                        <div className="detail-rating">
                            {[...Array(5)].map((_, i) => (
                                <FiStar
                                    key={i}
                                    size={18}
                                    fill={i < Math.floor(product.rating) ? '#f9a825' : 'none'}
                                    color="#f9a825"
                                />
                            ))}
                            <span>{product.rating} / 5</span>
                        </div>

                        <div className="detail-price-section">
                            <span className="detail-price">₹{product.price}</span>
                            {product.originalPrice && (
                                <span className="detail-original-price">₹{product.originalPrice}</span>
                            )}
                            <span className="detail-unit">per {product.unit}</span>
                        </div>

                        <p className="detail-description">{product.description}</p>

                        <div className="detail-meta">
                            <div className="meta-item">
                                <FiCheck color="var(--success)" />
                                <span>{product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}</span>
                            </div>
                        </div>

                        <div className="detail-actions">
                            <div className="qty-selector">
                                <button onClick={() => setQuantity(q => Math.max(1, q - 1))}><FiMinus /></button>
                                <span>{quantity}</span>
                                <button onClick={() => setQuantity(q => q + 1)}><FiPlus /></button>
                            </div>
                            <button
                                className="btn btn-gold btn-lg"
                                onClick={() => addToCart(product, quantity)}
                                disabled={product.stock === 0}
                            >
                                <FiShoppingCart /> Add to Cart – ₹{product.price * quantity}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
