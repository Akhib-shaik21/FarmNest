import React, { useState, useContext, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const CheckoutPage = () => {
  const { cartItems, totalPrice, setCartItems } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: 'India',
  });
  const [paymentMethod, setPaymentMethod] = useState('CashOnDelivery');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [paymentOptionMessage, setPaymentOptionMessage] = useState(null);

  useEffect(() => {
    if (user) {
      setShippingAddress({
        address: user.address || '',
        city: user.city || '',
        postalCode: user.postalCode || '',
        country: user.country || 'India',
      });
    }
    if (cartItems.length === 0) {
      navigate('/cart');
    }
  }, [user, cartItems, navigate]);

  const handlePaymentMethodChange = (e) => {
    const selectedMethod = e.target.value;
    setPaymentMethod(selectedMethod);
    if (selectedMethod !== 'CashOnDelivery') {
      setPaymentOptionMessage(`"${selectedMethod}" is for demonstration only. Please select "Cash on Delivery" for sample payments.`);
      setError(null);
    } else {
      setPaymentOptionMessage(null);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    if (!shippingAddress.address || !shippingAddress.city || !shippingAddress.postalCode || !shippingAddress.country) {
      setError('Please fill in all shipping address fields.');
      setLoading(false);
      return;
    }

    if (cartItems.length === 0) {
      setError('Your cart is empty.');
      setLoading(false);
      return;
    }

    if (paymentMethod !== 'CashOnDelivery') {
      setError('Please select "Cash on Delivery" for sample payments.');
      setLoading(false);
      return;
    }

    const orderData = {
      orderItems: cartItems.map(item => ({
        productId: item.product,
        name: item.name,
        image: item.image,
        price: item.price,
        quantity: item.qty,
      })),
      shippingAddress: shippingAddress,
      paymentMethod: paymentMethod,
      taxPrice: 0,
      shippingPrice: 0,
      totalPrice: parseFloat(totalPrice),
    };

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/orders`,
        orderData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }
      );

      setSuccessMessage(data.message);
      setCartItems([]);
      navigate(`/order-confirm/${data.orderId}`);
      setLoading(false);

    } catch (err) {
      console.error('Checkout process error:', err);
      setError(err.response?.data?.message || err.message || 'Checkout failed.');
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-8 min-h-[calc(100vh-100px)] bg-neutral-light">
      <h1 className="text-4xl font-bold text-primary-brand mb-8 text-center">FarmNest Checkout</h1> {/* Changed AgriShop to FarmNest */}

      {loading && <div className="bg-blue-100 text-blue-700 p-3 rounded mb-4 text-center">Processing...</div>}
      {successMessage && <div className="bg-primary-brand text-text-light p-3 rounded mb-4 text-center">{successMessage}</div>}
      {error && <div className="bg-red-600 text-white p-3 rounded mb-4 text-center">Error: {error}</div>}

      {cartItems.length === 0 ? (
        <div className="text-center text-xl text-neutral-dark">
          Your cart is empty. <Link to="/products" className="text-primary-brand hover:underline">Start Shopping!</Link>
        </div>
      ) : (
        <form onSubmit={submitHandler} className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl mx-auto border border-neutral-light">
          <h2 className="text-2xl font-bold text-secondary-brand mb-4">Shipping Address</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-neutral-dark text-sm font-bold mb-2" htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-neutral-dark leading-tight focus:outline-none focus:shadow-outline focus:border-primary-brand"
                value={shippingAddress.address}
                onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-neutral-dark text-sm font-bold mb-2" htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-neutral-dark leading-tight focus:outline-none focus:shadow-outline focus:border-primary-brand"
                value={shippingAddress.city}
                onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-neutral-dark text-sm font-bold mb-2" htmlFor="postalCode">Postal Code</label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-neutral-dark leading-tight focus:outline-none focus:shadow-outline focus:border-primary-brand"
                value={shippingAddress.postalCode}
                onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-neutral-dark text-sm font-bold mb-2" htmlFor="country">Country</label>
              <input
                type="text"
                id="country"
                name="country"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-neutral-dark leading-tight focus:outline-none focus:shadow-outline focus:border-primary-brand"
                value={shippingAddress.country}
                onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })}
                required
              />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-secondary-brand mb-4">Payment Method</h2>
          {paymentOptionMessage && (
              <div className="bg-yellow-100 text-yellow-800 p-3 rounded mb-4 text-center">
                  {paymentOptionMessage}
              </div>
          )}
          <div className="mb-6 space-y-3">
            <div className="flex items-center">
              <input
                type="radio"
                id="cod"
                name="paymentMethod"
                value="CashOnDelivery"
                checked={paymentMethod === 'CashOnDelivery'}
                onChange={handlePaymentMethodChange}
                className="mr-2 text-primary-brand focus:ring-primary-brand"
                required
              />
              <label htmlFor="cod" className="text-neutral-dark">Cash on Delivery (COD)</label>
            </div>

            <div className="flex items-center">
              <input
                type="radio"
                id="creditCard"
                name="paymentMethod"
                value="CreditCard"
                checked={paymentMethod === 'CreditCard'}
                onChange={handlePaymentMethodChange}
                className="mr-2 text-primary-brand focus:ring-primary-brand"
              />
              <label htmlFor="creditCard" className="text-neutral-dark">Credit Card</label>
            </div>

            <div className="flex items-center">
              <input
                type="radio"
                id="upi"
                name="paymentMethod"
                value="UPI"
                checked={paymentMethod === 'UPI'}
                onChange={handlePaymentMethodChange}
                className="mr-2 text-primary-brand focus:ring-primary-brand"
              />
              <label htmlFor="upi" className="text-neutral-dark">UPI</label>
            </div>

            <div className="flex items-center">
              <input
                type="radio"
                id="netBanking"
                name="paymentMethod"
                value="NetBanking"
                checked={paymentMethod === 'NetBanking'}
                onChange={handlePaymentMethodChange}
                className="mr-2 text-primary-brand focus:ring-primary-brand"
              />
              <label htmlFor="netBanking" className="text-neutral-dark">Net Banking</label>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-secondary-brand mb-4">Order Summary</h2>
          <div className="mb-6 bg-neutral-light p-4 rounded-md">
            {cartItems.map((item) => (
              <div key={item.product} className="flex justify-between items-center mb-2 text-neutral-dark">
                <span>{item.name} x {item.qty}</span>
                <span>₹{(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}
            <hr className="my-2 border-gray-300" />
            <div className="flex justify-between items-center text-xl font-bold text-neutral-dark">
              <span>Total:</span>
              <span>₹{totalPrice}</span>
            </div>
          </div>

          <button
            type="submit"
            className="bg-primary-brand hover:bg-secondary-brand text-white font-bold py-3 px-6 rounded-full w-full transition duration-300 transform hover:scale-105 focus:outline-none focus:shadow-outline"
            disabled={loading}
          >
            Place Order
          </button>
        </form>
      )}
    </div>
  );
};

export default CheckoutPage;