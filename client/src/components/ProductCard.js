import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext'; // Import CartContext

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    // Ensure product has a valid stock quantity for display
    if (product.countInStock > 0) {
      addToCart(product); // Add the whole product object to cart
    } else {
      // Optional: Show a temporary message or animation for out of stock attempt
      console.warn(`${product.name} is out of stock and cannot be added.`);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-xl overflow-hidden transform hover:scale-105 transition duration-300 border border-neutral-light"> {/* Enhanced shadow and border */}
      <Link to={`/products/${product._id}`} className="block relative h-48 overflow-hidden"> {/* Added block and relative for image */}
        <img src={product.image} alt={product.name} className="w-full h-full object-cover object-center transform hover:scale-110 transition duration-500" /> {/* Image hover effect */}
      </Link>
      <div className="p-4 flex flex-col justify-between flex-grow"> {/* Flex column to push button to bottom */}
        <div>
          <h3 className="text-xl font-semibold text-neutral-dark mb-2"> {/* Neutral dark text */}
            <Link to={`/products/${product._id}`} className="hover:text-primary-brand transition duration-300"> {/* Primary brand hover */}
              {product.name}
            </Link>
          </h3>
          <p className="text-gray-600 text-sm mb-3">Category: {product.category}</p> {/* Gray for category text */}
          <p className="text-2xl font-bold text-primary-brand mb-4">₹{product.price.toFixed(2)}</p> {/* Primary brand for price */}
        </div>

        {/* Add to Cart / Out of Stock Button */}
        {product.countInStock > 0 ? (
          <button
            className="mt-4 bg-primary-brand hover:bg-secondary-brand text-white font-bold py-2 px-4 rounded-full w-full transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-brand focus:ring-opacity-50"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        ) : (
          <button
            className="mt-4 bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full cursor-not-allowed opacity-75"
            disabled
          >
            Out of Stock
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;