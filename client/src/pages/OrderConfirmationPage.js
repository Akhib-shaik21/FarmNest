import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const OrderConfirmationPage = () => {
  const { orderId } = useParams();
  const { user } = useContext(AuthContext);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!user || !orderId) {
        setError('Not authorized or Order ID is missing.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/orders/${orderId}`,
          {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          }
        );
        setOrder(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching order:', err);
        setError(err.response?.data?.message || err.message || 'Failed to load order details.');
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, user]);

  if (loading) {
    return <div className="container mx-auto p-8 text-center text-xl text-primary-brand min-h-[calc(100vh-100px)]">Loading order details...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-8 text-center text-xl text-red-600 min-h-[calc(100vh-100px)]">Error: {error}</div>;
  }

  if (!order) {
    return <div className="container mx-auto p-8 text-center text-xl text-neutral-dark min-h-[calc(100vh-100px)]">Order not found.</div>;
  }

  return (
    <div className="container mx-auto p-8 min-h-[calc(100vh-100px)] bg-neutral-light">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-3xl mx-auto border border-primary-brand">
        <h1 className="text-4xl font-bold text-primary-brand mb-6 text-center">FarmNest Order Confirmation</h1> {/* Changed AgriShop to FarmNest */}
        <p className="text-center text-xl text-secondary-brand mb-8">Thank you for your purchase!</p>

        <div className="mb-8 space-y-3">
          <h2 className="text-2xl font-semibold text-neutral-dark">Order Summary ({order.orderId})</h2>
          <p><strong>Order ID:</strong> {order._id}</p>
          <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
          <p><strong>Total Amount:</strong> ₹{order.totalPrice.toFixed(2)}</p>
          <p><strong>Payment Status:</strong> {order.isPaid ? 'Paid' : 'Pending'}</p>
          <p><strong>Order Status:</strong> {order.orderStatus}</p>
        </div>

        <div className="mb-8 space-y-3">
          <h2 className="text-2xl font-semibold text-neutral-dark">Shipping Address</h2>
          <p>{order.shippingAddress.address}</p>
          <p>{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
          <p>{order.shippingAddress.country}</p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-neutral-dark mb-4">Ordered Items</h2>
          <div className="divide-y divide-gray-200">
            {order.orderItems.map((item) => (
              <div key={item.productId} className="flex items-center py-3">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md mr-4" />
                <div className="flex-grow">
                  <Link to={`/products/${item.productId}`} className="text-lg font-semibold text-neutral-dark hover:text-primary-brand">
                    {item.name}
                  </Link>
                  <p className="text-gray-600 text-sm">₹{item.price.toFixed(2)} x {item.quantity}</p>
                </div>
                <span className="text-lg font-bold text-neutral-dark">₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-8">
          <Link to="/user/dashboard" className="bg-primary-brand hover:bg-secondary-brand text-white font-bold py-3 px-6 rounded-full inline-block transition duration-300 transform hover:scale-105">
            View My Orders
          </Link>
          <Link to="/products" className="ml-4 text-primary-brand hover:underline">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;