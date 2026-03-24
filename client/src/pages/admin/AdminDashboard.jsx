import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPlus, FiEdit2, FiTrash2, FiPackage, FiShoppingBag, FiDollarSign, FiUsers } from 'react-icons/fi';
import API from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import './AdminDashboard.css';

export default function AdminDashboard() {
    const { isAdmin } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('products');
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editProduct, setEditProduct] = useState(null);
    const [form, setForm] = useState({
        name: '', category: 'Cements', price: '', originalPrice: '',
        image: '', description: '', stock: '', unit: 'piece', featured: false
    });

    useEffect(() => {
        if (!isAdmin) { navigate('/'); return; }
        fetchData();
    }, [isAdmin]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [prodRes, orderRes] = await Promise.all([
                API.get('/products?limit=100'),
                API.get('/orders')
            ]);
            setProducts(prodRes.data.products);
            setOrders(orderRes.data.orders);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
    };

    const openAddModal = () => {
        setEditProduct(null);
        setForm({ name: '', category: 'Cements', price: '', originalPrice: '', image: '', description: '', stock: '', unit: 'piece', featured: false });
        setShowModal(true);
    };

    const openEditModal = (product) => {
        setEditProduct(product);
        setForm({
            name: product.name, category: product.category, price: product.price,
            originalPrice: product.originalPrice || '', image: product.image,
            description: product.description, stock: product.stock,
            unit: product.unit, featured: product.featured
        });
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = { ...form, price: Number(form.price), stock: Number(form.stock), originalPrice: form.originalPrice ? Number(form.originalPrice) : null };
            if (editProduct) {
                await API.put(`/products/${editProduct._id}`, data);
            } else {
                await API.post('/products', data);
            }
            setShowModal(false);
            fetchData();
        } catch (err) {
            alert('Error saving product');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;
        try {
            await API.delete(`/products/${id}`);
            fetchData();
        } catch (err) {
            alert('Error deleting product');
        }
    };

    const updateOrderStatus = async (orderId, status) => {
        try {
            await API.put(`/orders/${orderId}/status`, { status });
            fetchData();
        } catch (err) {
            alert('Error updating order');
        }
    };

    const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);

    if (loading) return <div className="spinner-container"><div className="spinner" /></div>;

    return (
        <div className="admin-page">
            <div className="container">
                <h1 className="admin-title">Admin Dashboard</h1>

                {/* Stats */}
                <div className="admin-stats">
                    <div className="stat-card">
                        <FiPackage size={28} />
                        <div>
                            <span className="stat-value">{products.length}</span>
                            <span className="stat-label">Products</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <FiShoppingBag size={28} />
                        <div>
                            <span className="stat-value">{orders.length}</span>
                            <span className="stat-label">Orders</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <FiDollarSign size={28} />
                        <div>
                            <span className="stat-value">₹{totalRevenue.toLocaleString()}</span>
                            <span className="stat-label">Revenue</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <FiUsers size={28} />
                        <div>
                            <span className="stat-value">{new Set(orders.map(o => o.shippingAddress?.email)).size}</span>
                            <span className="stat-label">Customers</span>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="admin-tabs">
                    <button className={activeTab === 'products' ? 'active' : ''} onClick={() => setActiveTab('products')}>
                        <FiPackage /> Products
                    </button>
                    <button className={activeTab === 'orders' ? 'active' : ''} onClick={() => setActiveTab('orders')}>
                        <FiShoppingBag /> Orders
                    </button>
                </div>

                {/* Products Tab */}
                {activeTab === 'products' && (
                    <div className="admin-section">
                        <div className="section-header">
                            <h2>Manage Products</h2>
                            <button className="btn btn-gold" onClick={openAddModal}><FiPlus /> Add Product</button>
                        </div>
                        <div className="admin-table-wrapper">
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Category</th>
                                        <th>Price</th>
                                        <th>Stock</th>
                                        <th>Featured</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map(p => (
                                        <tr key={p._id}>
                                            <td>
                                                <div className="product-cell">
                                                    <img src={p.image} alt={p.name} />
                                                    <span>{p.name}</span>
                                                </div>
                                            </td>
                                            <td>{p.category}</td>
                                            <td>₹{p.price}</td>
                                            <td>{p.stock}</td>
                                            <td>{p.featured ? '⭐' : '—'}</td>
                                            <td>
                                                <div className="action-btns">
                                                    <button className="btn btn-sm btn-outline" onClick={() => openEditModal(p)}><FiEdit2 /></button>
                                                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(p._id)}><FiTrash2 /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Orders Tab */}
                {activeTab === 'orders' && (
                    <div className="admin-section">
                        <h2>All Orders</h2>
                        {orders.length === 0 ? (
                            <p style={{ color: 'var(--gray-500)', padding: '40px', textAlign: 'center' }}>No orders yet</p>
                        ) : (
                            <div className="admin-table-wrapper">
                                <table className="admin-table">
                                    <thead>
                                        <tr>
                                            <th>Order ID</th>
                                            <th>Customer</th>
                                            <th>Items</th>
                                            <th>Total</th>
                                            <th>Status</th>
                                            <th>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map(o => (
                                            <tr key={o._id}>
                                                <td className="order-id">{o._id.slice(-8)}</td>
                                                <td>{o.shippingAddress?.fullName}</td>
                                                <td>{o.items.length} item{o.items.length > 1 ? 's' : ''}</td>
                                                <td>₹{o.totalAmount?.toLocaleString()}</td>
                                                <td>
                                                    <select
                                                        className="status-select"
                                                        value={o.status}
                                                        onChange={(e) => updateOrderStatus(o._id, e.target.value)}
                                                    >
                                                        <option>Pending</option>
                                                        <option>Processing</option>
                                                        <option>Shipped</option>
                                                        <option>Delivered</option>
                                                        <option>Cancelled</option>
                                                    </select>
                                                </td>
                                                <td>{new Date(o.createdAt).toLocaleDateString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}

                {/* Modal */}
                {showModal && (
                    <div className="modal-overlay" onClick={() => setShowModal(false)}>
                        <div className="modal-content" onClick={e => e.stopPropagation()}>
                            <h2>{editProduct ? 'Edit Product' : 'Add New Product'}</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>Name</label>
                                    <input className="form-input" name="name" value={form.name} onChange={handleChange} required />
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Category</label>
                                        <select className="form-input" name="category" value={form.category} onChange={handleChange}>
                                            {['Cements', 'Sand & Dust', 'Tiles', 'Paints', 'Stones', 'Iron Rods', 'Bricks', 'Plumbing'].map(c => <option key={c}>{c}</option>)}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Unit</label>
                                        <input className="form-input" name="unit" value={form.unit} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Price (₹)</label>
                                        <input className="form-input" name="price" type="number" value={form.price} onChange={handleChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Original Price</label>
                                        <input className="form-input" name="originalPrice" type="number" value={form.originalPrice} onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>Stock</label>
                                        <input className="form-input" name="stock" type="number" value={form.stock} onChange={handleChange} required />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Image URL</label>
                                    <input className="form-input" name="image" value={form.image} onChange={handleChange} required />
                                </div>
                                <div className="form-group">
                                    <label>Description</label>
                                    <textarea className="form-input" name="description" value={form.description} onChange={handleChange} required rows={3} />
                                </div>
                                <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} id="featured" />
                                    <label htmlFor="featured" style={{ margin: 0 }}>Featured Product</label>
                                </div>
                                <div className="modal-actions">
                                    <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
                                    <button type="submit" className="btn btn-gold">{editProduct ? 'Update' : 'Add'} Product</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
