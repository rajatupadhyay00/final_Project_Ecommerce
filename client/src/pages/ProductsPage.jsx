import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiSearch, FiFilter, FiX } from 'react-icons/fi';
import API from '../api/axios';
import ProductCard from '../components/ProductCard';
import './ProductsPage.css';

const allCategories = ['Cements', 'Sand & Dust', 'Tiles', 'Paints', 'Stones', 'Iron Rods', 'Bricks', 'Plumbing'];

export default function ProductsPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState(searchParams.get('search') || '');
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalProducts, setTotalProducts] = useState(0);
    const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, [selectedCategory, currentPage]);

    const fetchProducts = async (searchTerm = search) => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (searchTerm) params.append('search', searchTerm);
            if (selectedCategory) params.append('category', selectedCategory);
            params.append('page', currentPage);
            params.append('limit', 12);

            const res = await API.get(`/products?${params.toString()}`);
            setProducts(res.data.products);
            setTotalPages(res.data.totalPages);
            setTotalProducts(res.data.totalProducts);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setCurrentPage(1);
        fetchProducts(search);
    };

    const handleCategoryChange = (cat) => {
        setSelectedCategory(cat);
        setCurrentPage(1);
        setMobileFilterOpen(false);
        if (cat) {
            setSearchParams({ category: cat });
        } else {
            setSearchParams({});
        }
    };

    const clearFilters = () => {
        setSearch('');
        setSelectedCategory('');
        setCurrentPage(1);
        setSearchParams({});
        fetchProducts('');
    };

    return (
        <div className="products-page">
            <div className="products-header">
                <div className="container">
                    <h1>Our Products</h1>
                    <p>Browse our complete range of building materials</p>
                </div>
            </div>

            <div className="container products-layout">
                {/* Sidebar */}
                <aside className={`products-sidebar ${mobileFilterOpen ? 'open' : ''}`}>
                    <div className="sidebar-header">
                        <h3><FiFilter /> Filters</h3>
                        <button className="close-filters" onClick={() => setMobileFilterOpen(false)}>
                            <FiX size={20} />
                        </button>
                    </div>

                    <div className="filter-group">
                        <h4>Categories</h4>
                        <button
                            className={`filter-btn ${selectedCategory === '' ? 'active' : ''}`}
                            onClick={() => handleCategoryChange('')}
                        >
                            All Products
                        </button>
                        {allCategories.map(cat => (
                            <button
                                key={cat}
                                className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                                onClick={() => handleCategoryChange(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {(selectedCategory || search) && (
                        <button className="btn btn-outline btn-sm clear-btn" onClick={clearFilters}>
                            Clear All Filters
                        </button>
                    )}
                </aside>

                {/* Main Content */}
                <main className="products-main">
                    {/* Search Bar */}
                    <form className="search-bar" onSubmit={handleSearch}>
                        <FiSearch className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="form-input search-input"
                        />
                        <button type="submit" className="btn btn-primary btn-sm">Search</button>
                    </form>

                    <div className="products-info">
                        <span>{totalProducts} product{totalProducts !== 1 ? 's' : ''} found</span>
                        <button className="mobile-filter-btn btn btn-outline btn-sm" onClick={() => setMobileFilterOpen(true)}>
                            <FiFilter /> Filters
                        </button>
                    </div>

                    {loading ? (
                        <div className="spinner-container"><div className="spinner" /></div>
                    ) : products.length === 0 ? (
                        <div className="no-products">
                            <h3>No products found</h3>
                            <p>Try adjusting your search or filters</p>
                            <button className="btn btn-primary" onClick={clearFilters}>Clear Filters</button>
                        </div>
                    ) : (
                        <div className="products-grid">
                            {products.map(product => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="pagination">
                            <button
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(p => p - 1)}
                            >
                                ← Prev
                            </button>
                            {[...Array(totalPages)].map((_, i) => (
                                <button
                                    key={i}
                                    className={currentPage === i + 1 ? 'active' : ''}
                                    onClick={() => setCurrentPage(i + 1)}
                                >
                                    {i + 1}
                                </button>
                            ))}
                            <button
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage(p => p + 1)}
                            >
                                Next →
                            </button>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
