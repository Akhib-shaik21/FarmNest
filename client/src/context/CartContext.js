import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext'; // Import AuthContext to potentially link cart to user

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const storedCart = localStorage.getItem('cartItems');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  // Save cart to localStorage whenever cartItems changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    const existItem = cartItems.find(x => x.product === product._id);

    if (existItem) {
      // If item already exists, update its quantity
      setCartItems(cartItems.map(x =>
        x.product === product._id
          ? { ...existItem, qty: existItem.qty + quantity }
          : x
      ));
    } else {
      // If new item, add to cart
      setCartItems([...cartItems, {
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        qty: quantity,
        countInStock: product.stock_quantity // To prevent adding more than available
      }]);
    }
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter(x => x.product !== id));
  };

  const updateCartQuantity = (id, newQty) => {
    setCartItems(cartItems.map(x =>
      x.product === id
        ? { ...x, qty: newQty }
        : x
    ));
  };

  // Calculate total number of items for the cart icon
  const totalCartItems = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const totalPrice = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2);


  // Optional: Sync cart with database when user logs in (Future Enhancement)
  // useEffect(() => {
  //   if (user) {
  //     // Fetch user's persistent cart from DB or merge local cart
  //   }
  // }, [user]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateCartQuantity, totalCartItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};