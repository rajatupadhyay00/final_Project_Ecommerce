import { Link } from 'react-router-dom';
import { FiShoppingCart, FiStar } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

export default function ProductCard({ product }) {
    const { addToCart } = useCart();
    const discount = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;

    return (
        <div className="product-card card">
            <Link to={`/products/${product._id}`} className="product-card-image">
                <img src={product.image} alt={product.name} loading="lazy" />
                {discount > 0 && (
                    <span className="discount-badge">-{discount}%</span>
                )}
                {product.featured && (
                    <span className="featured-badge">★ Featured</span>
                )}
            </Link>
            <div className="product-card-body">
                <span className="product-card-category">{product.category}</span>
                <Link to={`/products/${product._id}`}>
                    <h3 className="product-card-name">{product.name}</h3>
                </Link>
                <div className="product-card-rating">
                    {[...Array(5)].map((_, i) => (
                        <FiStar
                            key={i}
                            size={14}
                            fill={i < Math.floor(product.rating) ? '#f9a825' : 'none'}
                            color="#f9a825"
                        />
                    ))}
                    <span>{product.rating}</span>
                </div>
                <div className="product-card-footer">
                    <div className="product-card-price">
                        <span className="price">₹{product.price}</span>
                        {product.originalPrice && (
                            <span className="original-price">₹{product.originalPrice}</span>
                        )}
                        <span className="unit">/ {product.unit}</span>
                    </div>
                    <button
                        className="btn btn-gold btn-sm add-to-cart-btn"
                        onClick={() => addToCart(product)}
                    >
                        <FiShoppingCart size={14} /> Add
                    </button>
                </div>
            </div>
        </div>
    );
}
