import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUserPlus, FiUser, FiMail, FiLock } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import './AuthPages.css';

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { register, loading } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }
        const result = await register(name, email, password);
        if (result.success) {
            navigate('/');
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <div className="auth-header">
                    <div className="auth-logo">N</div>
                    <h1>Create Account</h1>
                    <p>Join Nawal Building Material</p>
                </div>

                {error && <div className="auth-error">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label><FiUser size={14} /> Full Name</label>
                        <input className="form-input" value={name} onChange={e => setName(e.target.value)} required placeholder="Enter your name" />
                    </div>
                    <div className="form-group">
                        <label><FiMail size={14} /> Email</label>
                        <input className="form-input" type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="Enter your email" />
                    </div>
                    <div className="form-group">
                        <label><FiLock size={14} /> Password</label>
                        <input className="form-input" type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="Min 6 characters" />
                    </div>
                    <button type="submit" className="btn btn-gold btn-lg auth-submit" disabled={loading}>
                        {loading ? 'Creating...' : <><FiUserPlus /> Create Account</>}
                    </button>
                </form>

                <p className="auth-switch">
                    Already have an account? <Link to="/login">Sign in</Link>
                </p>
            </div>
        </div>
    );
}
