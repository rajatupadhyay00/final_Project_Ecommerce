import { Link } from 'react-router-dom';
import { FiTrash2, FiMinus, FiPlus, FiShoppingBag, FiArrowRight } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import './CartPage.css';

export default function CartPage() {
    const { cartItems, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();

    if (cartItems.length === 0) {
        return (
            <div className="empty-cart">
                <div className="empty-cart-icon"><FiShoppingBag size={64} /></div>
                <h2>Your Cart is Empty</h2>
                <p>Looks like you haven't added any products yet</p>
                <Link to="/products" className="btn btn-primary btn-lg">
                    Browse Products <FiArrowRight />
                </Link>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <div className="container">
                <h1 className="cart-title">Shopping Cart</h1>
                <p className="cart-subtitle">{cartCount} item{cartCount !== 1 ? 's' : ''} in your cart</p>

                <div className="cart-layout">
                    <div className="cart-items">
                        {cartItems.map(item => (
                            <div key={item._id} className="cart-item card">
                                <Link to={`/products/${item._id}`} className="cart-item-image">
                                    <img src={item.image} alt={item.name} />
                                </Link>
                                <div className="cart-item-details">
                                    <span className="cart-item-category">{item.category}</span>
                                    <Link to={`/products/${item._id}`}>
                                        <h3>{item.name}</h3>
                                    </Link>
                                    <p className="cart-item-unit">₹{item.price} / {item.unit}</p>
                                </div>
                                <div className="cart-item-actions">
                                    <div className="qty-selector">
                                        <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>
                                            <FiMinus size={14} />
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>
                                            <FiPlus size={14} />
                                        </button>
                                    </div>
                                    <span className="cart-item-total">₹{item.price * item.quantity}</span>
                                    <button className="remove-btn" onClick={() => removeFromCart(item._id)}>
                                        <FiTrash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="cart-summary card">
                        <h3>Order Summary</h3>
                        <div className="summary-row">
                            <span>Subtotal ({cartCount} items)</span>
                            <span>₹{cartTotal.toLocaleString()}</span>
                        </div>
                        <div className="summary-row">
                            <span>Delivery</span>
                            <span className="free-delivery">{cartTotal >= 5000 ? 'FREE' : '₹200'}</span>
                        </div>
                        <div className="summary-divider" />
                        <div className="summary-row total-row">
                            <span>Total</span>
                            <span>₹{(cartTotal + (cartTotal >= 5000 ? 0 : 200)).toLocaleString()}</span>
                        </div>
                        {cartTotal < 5000 && (
                            <p className="free-delivery-note">
                                Add ₹{(5000 - cartTotal).toLocaleString()} more for free delivery!
                            </p>
                        )}
                        <Link to="/checkout" className="btn btn-gold btn-lg checkout-btn">
                            Proceed to Checkout <FiArrowRight />
                        </Link>
                        <Link to="/products" className="btn btn-outline continue-btn">
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
