import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UserDashboard = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMyOrders = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        setError(null);
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/orders/myorders`,
          {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          }
        );
        setOrders(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching my orders:', err);
        setError(err.response?.data?.message || err.message || 'Failed to load your orders.');
        setLoading(false);
      }
    };

    fetchMyOrders();
  }, [user]);

  if (!user) {
    return <div className="container mx-auto p-8 text-center text-xl text-red-600 min-h-[calc(100vh-100px)]">Please log in to view your dashboard.</div>;
  }

  if (loading) {
    return <div className="container mx-auto p-8 text-center text-xl text-primary-brand min-h-[calc(100vh-100px)]">Loading your orders...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-8 text-center text-xl text-red-600 min-h-[calc(100vh-100px)]">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-8 min-h-[calc(100vh-100px)] bg-neutral-light">
      <h2 className="text-4xl font-bold text-primary-brand mb-8 text-center">Welcome to FarmNest Dashboard, {user.username}!</h2> {/* Changed AgriShop to FarmNest */}
      <p className="text-lg text-neutral-dark mb-8 text-center">Here you can view your past orders and track their status.</p>

      <div className="bg-white p-8 rounded-lg shadow-xl border border-neutral-light">
        <h3 className="text-2xl font-bold text-secondary-brand mb-6">My Orders</h3>
        {orders.length === 0 ? (
          <div className="text-center text-xl text-neutral-dark">
            You haven't placed any orders yet. <Link to="/products" className="text-primary-brand hover:underline">Start Shopping!</Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-left text-neutral-dark">Order ID</th>
                  <th className="py-2 px-4 border-b text-left text-neutral-dark">Date</th>
                  <th className="py-2 px-4 border-b text-left text-neutral-dark">Total</th>
                  <th className="py-2 px-4 border-b text-left text-neutral-dark">Status</th>
                  <th className="py-2 px-4 border-b text-left text-neutral-dark">Payment</th>
                  <th className="py-2 px-4 border-b text-left text-neutral-dark">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border-b text-neutral-dark">{order._id.substring(order._id.length - 6)}</td>
                    <td className="py-2 px-4 border-b text-neutral-dark">{new Date(order.orderDate).toLocaleDateString()}</td>
                    <td className="py-2 px-4 border-b text-neutral-dark">₹{order.totalPrice.toFixed(2)}</td>
                    <td className="py-2 px-4 border-b text-neutral-dark">{order.orderStatus}</td>
                    <td className="py-2 px-4 border-b text-neutral-dark">{order.isPaid ? 'Paid' : 'Pending'}</td>
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
    </div>
  );
};

export default UserDashboard;