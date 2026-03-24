import { Link } from 'react-router-dom';
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi';
import './Footer.css';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <div className="footer-logo">
                            <div className="logo-icon">N</div>
                            <div>
                                <div className="logo-brand">Nawal</div>
                                <div className="logo-sub">Building Material</div>
                            </div>
                        </div>
                        <p className="footer-desc">
                            Your trusted partner for premium building materials. Quality products at competitive prices since 2010.
                        </p>
                    </div>

                    <div className="footer-section">
                        <h4>Quick Links</h4>
                        <Link to="/">Home</Link>
                        <Link to="/products">Products</Link>
                        <Link to="/cart">Cart</Link>
                    </div>

                    <div className="footer-section">
                        <h4>Categories</h4>
                        <Link to="/products?category=Cements">Cements</Link>
                        <Link to="/products?category=Tiles">Tiles</Link>
                        <Link to="/products?category=Paints">Paints</Link>
                        <Link to="/products?category=Iron Rods">Iron Rods</Link>
                    </div>

                    <div className="footer-section">
                        <h4>Contact Us</h4>
                        <p><FiPhone size={14} /> +91 87911 27454</p>
                        <p><FiMail size={14} /> nawalbuildingmaterial@gmail.com</p>
                        <p><FiMapPin size={14} /> Agra, Uttar Pradesh</p>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; 2026 Nawal Building Material. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
