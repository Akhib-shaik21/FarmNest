import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('products');

  const [productForm, setProductForm] = useState({
    _id: null,
    name: '',
    image: '',
    description: '',
    price: '',
    category: '',
    countInStock: '',
  });
  const [isEditingProduct, setIsEditingProduct] = useState(false);

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/products`);
      setProducts(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err.response?.data?.message || err.message || 'Failed to fetch products');
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/orders`, config);
      setOrders(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError(err.response?.data?.message || err.message || 'Failed to fetch orders');
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/users`, config);
      setUsers(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError(err.response?.data?.message || err.message || 'Failed to fetch users');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && user.role === 'admin') {
      if (activeTab === 'products') fetchProducts();
      if (activeTab === 'orders') fetchOrders();
      if (activeTab === 'users') fetchUsers();
    }
  }, [user, activeTab]);

  const handleProductFormChange = (e) => {
    setProductForm({ ...productForm, [e.target.name]: e.target.value });
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage('');

    try {
      if (isEditingProduct) {
        await axios.put(`${process.env.REACT_APP_API_BASE_URL}/products/${productForm._id}`, productForm, config);
        setMessage('Product updated successfully!');
      } else {
        await axios.post(`${process.env.REACT_APP_API_BASE_URL}/products`, productForm, config);
        setMessage('Product added successfully!');
      }
      setProductForm({ _id: null, name: '', image: '', description: '', price: '', category: '', countInStock: '' });
      setIsEditingProduct(false);
      fetchProducts();
    } catch (err) {
      console.error('Error saving product:', err);
      setError(err.response?.data?.message || err.message || 'Failed to save product');
    }
  };

  const handleEditProduct = (product) => {
    setProductForm(product);
    setIsEditingProduct(true);
    setMessage('');
    setError(null);
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/products/${id}`, config);
        setMessage('Product deleted successfully!');
        fetchProducts();
      } catch (err) {
        console.error('Error deleting product:', err);
        setError(err.response?.data?.message || err.message || 'Failed to delete product');
      }
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/users/${id}`, config);
        setMessage('User deleted successfully!');
        fetchUsers();
      } catch (err) {
        console.error('Error deleting user:', err);
        setError(err.response?.data?.message || err.message || 'Failed to delete user');
      }
    }
  };

  const handleUpdateUserRole = async (userId, newRole) => {
    if (window.confirm(`Are you sure you want to change this user's role to ${newRole}?`)) {
      try {
        await axios.put(`${process.env.REACT_APP_API_BASE_URL}/users/${userId}/role`, { role: newRole }, config);
        setMessage(`User role updated to ${newRole}!`);
        fetchUsers();
      } catch (err) {
        console.error('Error updating user role:', err);
        setError(err.response?.data?.message || err.message || 'Failed to update user role');
      }
    }
  };

  if (!user || user.role !== 'admin') {
    return <div className="container mx-auto p-8 text-center text-red-600 min-h-[calc(100vh-100px)]">Access Denied. You must be an admin to view this page.</div>;
  }

  return (
    <div className="container mx-auto p-8 min-h-[calc(100vh-100px)] bg-neutral-light">
      <h2 className="text-4xl font-bold text-secondary-brand mb-8 text-center">FarmNest Admin Dashboard</h2> {/* Changed AgriShop to FarmNest */}

      {message && <div className="bg-primary-brand text-text-light p-3 rounded mb-4">{message}</div>}
      {error && <div className="bg-red-600 text-white p-3 rounded mb-4">Error: {error}</div>}

      <div className="flex justify-center mb-8 border-b border-gray-300">
        <button
          className={`py-2 px-6 -mb-px font-semibold ${activeTab === 'products' ? 'border-b-2 border-primary-brand text-primary-brand' : 'text-gray-600 hover:text-gray-800'}`}
          onClick={() => setActiveTab('products')}
        >
          Manage Products
        </button>
        <button
          className={`py-2 px-6 -mb-px font-semibold ${activeTab === 'orders' ? 'border-b-2 border-primary-brand text-primary-brand' : 'text-gray-600 hover:text-gray-800'}`}
          onClick={() => setActiveTab('orders')}
        >
          View Orders
        </button>
        <button
          className={`py-2 px-6 -mb-px font-semibold ${activeTab === 'users' ? 'border-b-2 border-primary-brand text-primary-brand' : 'text-gray-600 hover:text-gray-800'}`}
          onClick={() => setActiveTab('users')}
        >
          Manage Users
        </button>
      </div>

      {loading ? (
        <div className="text-center text-xl text-primary-brand">Loading {activeTab}...</div>
      ) : (
        <>
          {activeTab === 'products' && (
            <div className="bg-white p-6 rounded-lg shadow-xl border border-neutral-light">
              <h3 className="text-2xl font-bold text-primary-brand mb-4">{isEditingProduct ? 'Edit Product' : 'Add New Product'}</h3>
              <form onSubmit={handleProductSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-neutral-dark text-sm font-bold mb-2" htmlFor="name">Product Name</label>
                  <input type="text" id="name" name="name" className="shadow appearance-none border rounded w-full py-2 px-3 text-neutral-dark leading-tight focus:outline-none focus:shadow-outline focus:border-primary-brand" value={productForm.name} onChange={handleProductFormChange} required />
                </div>
                <div>
                  <label className="block text-neutral-dark text-sm font-bold mb-2" htmlFor="image">Image URL</label>
                  <input type="text" id="image" name="image" className="shadow appearance-none border rounded w-full py-2 px-3 text-neutral-dark leading-tight focus:outline-none focus:shadow-outline focus:border-primary-brand" value={productForm.image} onChange={handleProductFormChange} placeholder="e.g., https://placehold.co/300x200" required />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-neutral-dark text-sm font-bold mb-2" htmlFor="description">Description</label>
                  <textarea id="description" name="description" rows="3" className="shadow appearance-none border rounded w-full py-2 px-3 text-neutral-dark leading-tight focus:outline-none focus:shadow-outline focus:border-primary-brand" value={productForm.description} onChange={handleProductFormChange} required></textarea>
                </div>
                <div>
                  <label className="block text-neutral-dark text-sm font-bold mb-2" htmlFor="price">Price (₹)</label>
                  <input type="number" id="price" name="price" className="shadow appearance-none border rounded w-full py-2 px-3 text-neutral-dark leading-tight focus:outline-none focus:shadow-outline focus:border-primary-brand" value={productForm.price} onChange={handleProductFormChange} required min="0" step="0.01" />
                </div>
                <div>
                  <label className="block text-neutral-dark text-sm font-bold mb-2" htmlFor="category">Category</label>
                  <select id="category" name="category" className="shadow appearance-none border rounded w-full py-2 px-3 text-neutral-dark leading-tight focus:outline-none focus:shadow-outline focus:border-primary-brand" value={productForm.category} onChange={handleProductFormChange} required>
                    <option value="">Select Category</option>
                    <option value="Fruits">Fruits</option>
                    <option value="Vegetables">Vegetables</option>
                    <option value="Grains">Grains</option>
                    <option value="Dairy">Dairy</option>
                    <option value="Herbs">Herbs</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-neutral-dark text-sm font-bold mb-2" htmlFor="countInStock">Count In Stock</label>
                  <input type="number" id="countInStock" name="countInStock" className="shadow appearance-none border rounded w-full py-2 px-3 text-neutral-dark leading-tight focus:outline-none focus:shadow-outline focus:border-primary-brand" value={productForm.countInStock} onChange={handleProductFormChange} required min="0" />
                </div>
                <div className="md:col-span-2 flex justify-end space-x-4">
                  <button type="submit" className="bg-primary-brand hover:bg-secondary-brand text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 transform hover:scale-105">
                    {isEditingProduct ? 'Update Product' : 'Add Product'}
                  </button>
                  {isEditingProduct && (
                    <button type="button" onClick={() => { setIsEditingProduct(false); setProductForm({ _id: null, name: '', image: '', description: '', price: '', category: '', countInStock: '' }); setMessage(''); setError(null); }} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300">
                      Cancel Edit
                    </button>
                  )}
                </div>
              </form>

              <h3 className="text-2xl font-bold text-secondary-brand mb-4 mt-8">Manage Products</h3>
              {products.length === 0 ? (
                <p className="text-neutral-dark">No products added yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                    <thead>
                      <tr>
                        <th className="py-2 px-4 border-b text-left text-neutral-dark">Image</th>
                        <th className="py-2 px-4 border-b text-left text-neutral-dark">Name</th>
                        <th className="py-2 px-4 border-b text-left text-neutral-dark">Category</th>
                        <th className="py-2 px-4 border-b text-left text-neutral-dark">Price</th>
                        <th className="py-2 px-4 border-b text-left text-neutral-dark">Stock</th>
                        <th className="py-2 px-4 border-b text-left text-neutral-dark">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr key={product._id} className="hover:bg-gray-50">
                          <td className="py-2 px-4 border-b"><img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded" /></td>
                          <td className="py-2 px-4 border-b text-neutral-dark">{product.name}</td>
                          <td className="py-2 px-4 border-b text-neutral-dark">{product.category}</td>
                          <td className="py-2 px-4 border-b text-neutral-dark">₹{product.price.toFixed(2)}</td>
                          <td className="py-2 px-4 border-b text-neutral-dark">{product.countInStock}</td>
                          <td className="py-2 px-4 border-b">
                            <button onClick={() => handleEditProduct(product)} className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded text-sm mr-2 transition duration-300">Edit</button>
                            <button onClick={() => handleDeleteProduct(product._id)} className="bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded text-sm transition duration-300">Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="bg-white p-6 rounded-lg shadow-xl border border-neutral-light">
              <h3 className="text-2xl font-bold text-primary-brand mb-4">All Customer Orders</h3>
              {orders.length === 0 ? (
                <p className="text-neutral-dark">No orders found yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                    <thead>
                      <tr>
                        <th className="py-2 px-4 border-b text-left text-neutral-dark">Order ID</th>
                        <th className="py-2 px-4 border-b text-left text-neutral-dark">Customer</th>
                        <th className="py-2 px-4 border-b text-left text-neutral-dark">Date</th>
                        <th className="py-2 px-4 border-b text-left text-neutral-dark">Total</th>
                        <th className="py-2 px-4 border-b text-left text-neutral-dark">Payment</th>
                        <th className="py-2 px-4 border-b text-left text-neutral-dark">Status</th>
                        <th className="py-2 px-4 border-b text-left text-neutral-dark">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order._id} className="hover:bg-gray-50">
                          <td className="py-2 px-4 border-b text-neutral-dark">{order._id.substring(order._id.length - 6)}</td>
                          <td className="py-2 px-4 border-b text-neutral-dark">{order.username || order.user?.username || 'N/A'}</td>
                          <td className="py-2 px-4 border-b text-neutral-dark">{new Date(order.orderDate).toLocaleDateString()}</td>
                          <td className="py-2 px-4 border-b text-neutral-dark">₹{order.totalPrice.toFixed(2)}</td>
                          <td className="py-2 px-4 border-b text-neutral-dark">{order.isPaid ? 'Paid' : 'Pending'}</td>
                          <td className="py-2 px-4 border-b text-neutral-dark">{order.orderStatus}</td>
                          <td className="py-2 px-4 border-b">
                            <Link to={`/order-confirm/${order._id}`} className="bg-primary-brand hover:bg-secondary-brand text-white py-1 px-3 rounded-full text-sm">
                              View Details
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === 'users' && (
            <div className="bg-white p-6 rounded-lg shadow-xl border border-neutral-light">
              <h3 className="text-2xl font-bold text-primary-brand mb-4">Manage Users</h3>
              {users.length === 0 ? (
                <p className="text-neutral-dark">No users found.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                    <thead>
                      <tr>
                        <th className="py-2 px-4 border-b text-left text-neutral-dark">ID</th>
                        <th className="py-2 px-4 border-b text-left text-neutral-dark">Name</th>
                        <th className="py-2 px-4 border-b text-left text-neutral-dark">Email</th>
                        <th className="py-2 px-4 border-b text-left text-neutral-dark">Role</th>
                        <th className="py-2 px-4 border-b text-left text-neutral-dark">Verified</th>
                        <th className="py-2 px-4 border-b text-left text-neutral-dark">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((userItem) => (
                        <tr key={userItem._id} className="hover:bg-gray-50">
                          <td className="py-2 px-4 border-b text-neutral-dark">{userItem._id.substring(userItem._id.length - 6)}</td>
                          <td className="py-2 px-4 border-b text-neutral-dark">{userItem.username}</td>
                          <td className="py-2 px-4 border-b text-neutral-dark">{userItem.email}</td>
                          <td className="py-2 px-4 border-b text-neutral-dark">{userItem.role}</td>
                          <td className="py-2 px-4 border-b text-neutral-dark">{userItem.isVerified ? 'Yes' : 'No'}</td>
                          <td className="py-2 px-4 border-b">
                            {userItem.role !== 'admin' && (
                              <button onClick={() => handleDeleteUser(userItem._id)} className="bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded text-sm mr-2 transition duration-300">Delete</button>
                            )}
                            {userItem.role === 'customer' && (
                              <button onClick={() => handleUpdateUserRole(userItem._id, 'farmer')} className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded text-sm mr-2 transition duration-300">Make Farmer</button>
                            )}
                            {userItem.role === 'farmer' && (
                              <button onClick={() => handleUpdateUserRole(userItem._id, 'customer')} className="bg-purple-500 hover:bg-purple-700 text-white py-1 px-3 rounded text-sm mr-2 transition duration-300">Make Customer</button>
                            )}
                            {userItem.role === 'customer' && (
                              <button onClick={() => handleUpdateUserRole(userItem._id, 'admin')} className="bg-yellow-500 hover:bg-yellow-700 text-white py-1 px-3 rounded text-sm transition duration-300">Make Admin</button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminDashboard;