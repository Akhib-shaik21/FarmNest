import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { useLocation } from 'react-router-dom';

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const queryParams = new URLSearchParams(location.search);
        const searchTerm = queryParams.get('search');

        let url = `${process.env.REACT_APP_API_BASE_URL}/products`;
        if (searchTerm) {
          url = `${url}?search=${encodeURIComponent(searchTerm)}`;
        }

        const { data } = await axios.get(url);
        setProducts(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err.response?.data?.message || err.message || 'Failed to fetch products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, [location.search]);

  if (loading) {
    return <div className="min-h-[calc(100vh-100px)] flex items-center justify-center text-center text-xl text-primary-brand bg-neutral-light">Loading products...</div>;
  }

  if (error) {
    return <div className="min-h-[calc(100vh-100px)] flex items-center justify-center text-center text-xl text-red-600 bg-neutral-light">Error: {error}</div>;
  }

  return (
    // Stronger background with overlay for ProductListPage
    <div
      className="relative min-h-[calc(100vh-100px)] bg-cover bg-center py-12 md:py-20"
      style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1579658097103-625292a17058?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")', backgroundAttachment: 'fixed' }}
    >
      {/* Stronger Overlay for readability */}
      <div className="absolute inset-0 bg-white opacity-85 md:opacity-90"></div> {/* Increased opacity */}

      <div className="container mx-auto p-6 relative z-10 bg-white bg-opacity-95 rounded-xl shadow-2xl border-2 border-primary-brand"> {/* Inner container for content */}
        <h1 className="text-4xl font-bold text-primary-brand mb-10 text-center">Our Organic Products</h1>
        {products.length === 0 ? (
          <div className="text-center text-xl text-neutral-dark p-8">
            {location.search ? `No products found for "${new URLSearchParams(location.search).get('search')}". Try a different search term.` : "No products found. Please add some from the Admin Dashboard!"}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductListPage;