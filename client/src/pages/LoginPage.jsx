import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import './AuthPages.css';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, loading } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const result = await login(email, password);
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
                    <h1>Welcome Back</h1>
                    <p>Sign in to your Nawal account</p>
                </div>

                {error && <div className="auth-error">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label><FiMail size={14} /> Email</label>
                        <input className="form-input" type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="Enter your email" />
                    </div>
                    <div className="form-group">
                        <label><FiLock size={14} /> Password</label>
                        <input className="form-input" type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="Enter your password" />
                    </div>
                    <button type="submit" className="btn btn-gold btn-lg auth-submit" disabled={loading}>
                        {loading ? 'Signing in...' : <><FiLogIn /> Sign In</>}
                    </button>
                </form>

                <p className="auth-switch">
                    Don't have an account? <Link to="/register">Create one</Link>
                </p>

                <div className="demo-credentials">
                    <p><strong>Demo Admin:</strong> admin@nawal.com / admin123</p>
                    <p><strong>Demo User:</strong> rajat@example.com / user123</p>
                </div>
            </div>
        </div>
    );
}
