import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiMenu, FiX, FiUser, FiLogOut, FiSettings } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { cartCount } = useCart();
    const { user, logout, isAdmin } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="container navbar-inner">
                <Link to="/" className="navbar-logo">
                    <div className="logo-icon">N</div>
                    <div className="logo-text">
                        <span className="logo-brand">Nawal</span>
                        <span className="logo-sub">Building Material</span>
                    </div>
                </Link>

                <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
                    <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
                    <Link to="/products" onClick={() => setMenuOpen(false)}>Products</Link>
                    {user ? (
                        <>
                            {isAdmin && (
                                <Link to="/admin" onClick={() => setMenuOpen(false)}>
                                    <FiSettings size={14} /> Admin
                                </Link>
                            )}
                            <button className="nav-logout" onClick={handleLogout}>
                                <FiLogOut size={14} /> Logout
                            </button>
                            <span className="nav-user-name">
                                <FiUser size={14} /> {user.name}
                            </span>
                        </>
                    ) : (
                        <Link to="/login" onClick={() => setMenuOpen(false)}>
                            <FiUser size={14} /> Login
                        </Link>
                    )}
                </div>

                <div className="navbar-actions">
                    <Link to="/cart" className="cart-icon-link">
                        <FiShoppingCart size={22} />
                        {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                    </Link>
                    <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                    </button>
                </div>
            </div>
        </nav>
    );
}
