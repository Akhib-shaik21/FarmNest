import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext'; // To check if user is logged in

const CartPage = () => {
  const { cartItems, removeFromCart, updateCartQuantity, totalPrice } = useContext(CartContext);
  const { user } = useContext(AuthContext); // Get user from AuthContext

  return (
    <div className="container mx-auto p-8 min-h-[calc(100vh-100px)] bg-neutral-light">
      <h1 className="text-4xl font-bold text-primary-brand mb-8 text-center">Your Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center text-xl text-neutral-dark">
          Your cart is empty. <Link to="/products" className="text-primary-brand hover:underline">Start Shopping!</Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items List */}
          <div className="lg:w-3/4 bg-white p-6 rounded-lg shadow-xl border border-neutral-light">
            <h2 className="text-2xl font-semibold text-neutral-dark mb-4">Items in Cart</h2>
            <div className="divide-y divide-gray-200">
              {cartItems.map((item) => (
                <div key={item.product} className="flex items-center py-4">
                  <Link to={`/products/${item.product}`} className="w-24 h-24 mr-4 flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-md" />
                  </Link>
                  <div className="flex-grow">
                    <Link to={`/products/${item.product}`} className="text-xl font-semibold text-neutral-dark hover:text-primary-brand">
                      {item.name}
                    </Link>
                    <p className="text-gray-600">₹{item.price.toFixed(2)} each</p>
                    <p className="text-gray-500 text-sm">In Stock: {item.countInStock}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center border border-gray-300 rounded-md">
                      <button
                        onClick={() => updateCartQuantity(item.product, item.qty - 1)}
                        disabled={item.qty <= 1}
                        className="p-2 text-neutral-dark hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={item.qty}
                        onChange={(e) => {
                          const newQty = Math.max(1, Math.min(item.countInStock, Number(e.target.value)));
                          updateCartQuantity(item.product, newQty);
                        }}
                        className="w-12 text-center border-x border-gray-300 focus:outline-none text-neutral-dark"
                        min="1"
                        max={item.countInStock}
                      />
                      <button
                        onClick={() => updateCartQuantity(item.product, item.qty + 1)}
                        disabled={item.qty >= item.countInStock}
                        className="p-2 text-neutral-dark hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product)}
                      className="text-red-600 hover:text-red-800 transition duration-300"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary / Checkout Section */}
          <div className="lg:w-1/4 bg-white p-6 rounded-lg shadow-xl border border-neutral-light h-fit">
            <h2 className="text-2xl font-semibold text-neutral-dark mb-4">Order Summary</h2>
            <div className="flex justify-between items-center mb-2">
              <p className="text-neutral-dark">Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)} items):</p>
              <p className="text-lg font-bold text-neutral-dark">₹{totalPrice}</p>
            </div>

            <hr className="my-4" />

            {/* Checkout Button / Login Prompt - THIS IS THE RELEVANT PART */}
            {user ? (
              <Link
                to="/checkout"
                className="block text-center bg-primary-brand hover:bg-secondary-brand text-white font-bold py-3 px-4 rounded-full w-full transition duration-300 transform hover:scale-105"
              >
                Proceed to Checkout
              </Link>
            ) : (
              <div className="text-center">
                <p className="text-red-600 mb-3">Please login or register to proceed to checkout.</p>
                <Link
                  to="/login"
                  className="block text-center bg-secondary-brand hover:bg-primary-brand text-white font-bold py-3 px-4 rounded-full w-full transition duration-300"
                >
                  Login to Checkout
                </Link>
                <p className="mt-2 text-neutral-dark">
                  New Customer? <Link to="/register" className="text-primary-brand hover:underline">Register Here</Link>
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;