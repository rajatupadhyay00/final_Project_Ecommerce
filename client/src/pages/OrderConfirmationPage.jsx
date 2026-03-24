import { useLocation, Link } from 'react-router-dom';
import { FiCheckCircle, FiPackage, FiHome } from 'react-icons/fi';
import './OrderConfirmationPage.css';

export default function OrderConfirmationPage() {
    const location = useLocation();
    const order = location.state?.order;

    return (
        <div className="confirmation-page">
            <div className="confirmation-card">
                <div className="confirmation-icon">
                    <FiCheckCircle size={64} />
                </div>
                <h1>Order Placed Successfully!</h1>
                <p className="confirmation-message">
                    Thank you for your purchase. Your order has been confirmed and will be processed shortly.
                </p>

                {order && (
                    <div className="order-details">
                        <div className="order-detail-row">
                            <span>Order ID</span>
                            <strong>{order._id}</strong>
                        </div>
                        <div className="order-detail-row">
                            <span>Amount</span>
                            <strong>₹{order.totalAmount?.toLocaleString()}</strong>
                        </div>
                        <div className="order-detail-row">
                            <span>Payment</span>
                            <strong>{order.paymentMethod}</strong>
                        </div>
                        <div className="order-detail-row">
                            <span>Status</span>
                            <span className="badge badge-success">{order.status}</span>
                        </div>
                    </div>
                )}

                <div className="confirmation-items">
                    <h3><FiPackage /> Items Ordered</h3>
                    {order?.items?.map((item, i) => (
                        <div key={i} className="conf-item">
                            <img src={item.image} alt={item.name} />
                            <div>
                                <p>{item.name}</p>
                                <span>Qty: {item.quantity} × ₹{item.price}</span>
                            </div>
                            <strong>₹{item.price * item.quantity}</strong>
                        </div>
                    ))}
                </div>

                <div className="confirmation-actions">
                    <Link to="/products" className="btn btn-primary">
                        Continue Shopping
                    </Link>
                    <Link to="/" className="btn btn-outline">
                        <FiHome /> Go Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
