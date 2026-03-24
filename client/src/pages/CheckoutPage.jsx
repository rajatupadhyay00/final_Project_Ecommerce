import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCreditCard } from 'react-icons/fi';
import API from '../api/axios';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './CheckoutPage.css';

export default function CheckoutPage() {
    const { cartItems, cartTotal, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        fullName: user?.name || '',
        email: user?.email || '',
        phone: '',
        address: '',
        city: '',
        state: '',
        pincode: ''
    });

    const delivery = cartTotal >= 5000 ? 0 : 200;
    const total = cartTotal + delivery;

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const orderData = {
                items: cartItems.map(item => ({
                    product: item._id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    image: item.image
                })),
                shippingAddress: form,
                totalAmount: total,
                paymentMethod: 'Cash on Delivery',
                userId: user?._id || null
            };

            const res = await API.post('/orders', orderData);
            clearCart();
            navigate('/order-confirmation', { state: { order: res.data } });
        } catch (err) {
            alert('Failed to place order. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (cartItems.length === 0) {
        navigate('/cart');
        return null;
    }

    return (
        <div className="checkout-page">
            <div className="container">
                <h1 className="checkout-title">Checkout</h1>

                <form className="checkout-layout" onSubmit={handleSubmit}>
                    <div className="checkout-form card">
                        <h2><FiCreditCard /> Shipping Information</h2>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Full Name</label>
                                <input className="form-input" name="fullName" value={form.fullName} onChange={handleChange} required placeholder="Enter full name" />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input className="form-input" name="email" type="email" value={form.email} onChange={handleChange} required placeholder="Enter email" />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Phone Number</label>
                            <input className="form-input" name="phone" value={form.phone} onChange={handleChange} required placeholder="Enter phone number" />
                        </div>

                        <div className="form-group">
                            <label>Address</label>
                            <textarea className="form-input" name="address" value={form.address} onChange={handleChange} required rows={3} placeholder="Enter full address" />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>City</label>
                                <input className="form-input" name="city" value={form.city} onChange={handleChange} required placeholder="City" />
                            </div>
                            <div className="form-group">
                                <label>State</label>
                                <input className="form-input" name="state" value={form.state} onChange={handleChange} required placeholder="State" />
                            </div>
                            <div className="form-group">
                                <label>Pincode</label>
                                <input className="form-input" name="pincode" value={form.pincode} onChange={handleChange} required placeholder="Pincode" />
                            </div>
                        </div>

                        <div className="payment-section">
                            <h3>Payment Method</h3>
                            <div className="payment-option active">
                                <span className="radio-dot" />
                                Cash on Delivery
                            </div>
                        </div>
                    </div>

                    <div className="checkout-summary card">
                        <h3>Order Summary</h3>
                        <div className="checkout-items">
                            {cartItems.map(item => (
                                <div key={item._id} className="checkout-item">
                                    <img src={item.image} alt={item.name} />
                                    <div>
                                        <p className="checkout-item-name">{item.name}</p>
                                        <p className="checkout-item-qty">Qty: {item.quantity} × ₹{item.price}</p>
                                    </div>
                                    <span>₹{item.price * item.quantity}</span>
                                </div>
                            ))}
                        </div>
                        <div className="summary-divider" />
                        <div className="summary-row">
                            <span>Subtotal</span>
                            <span>₹{cartTotal.toLocaleString()}</span>
                        </div>
                        <div className="summary-row">
                            <span>Delivery</span>
                            <span className={delivery === 0 ? 'free-delivery' : ''}>{delivery === 0 ? 'FREE' : `₹${delivery}`}</span>
                        </div>
                        <div className="summary-divider" />
                        <div className="summary-row total-row">
                            <span>Total</span>
                            <span>₹{total.toLocaleString()}</span>
                        </div>
                        <button type="submit" className="btn btn-gold btn-lg checkout-btn" disabled={loading}>
                            {loading ? 'Placing Order...' : `Place Order – ₹${total.toLocaleString()}`}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
