const Order = require('../models/order');
const Product = require('../models/product');

// @desc    Create new order (for COD)
// @route   POST /api/orders
const addOrderItems = async (req, res, next) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400).json({ message: 'No order items' });
    return;
  } else {
    try {
      const order = new Order({
        user: req.user._id,
        username: req.user.username,
        userEmail: req.user.email,
        orderItems,
        shippingAddress,
        paymentMethod,
        taxPrice,
        shippingPrice,
        totalPrice,
        isPaid: false,
        orderStatus: 'pending'
      });

      const createdOrder = await order.save();

      // Update product stock quantities immediately upon order creation for COD
      for (const item of order.orderItems) {
        const product = await Product.findById(item.productId);
        if (product) {
          product.stockQuantity -= item.quantity;
          await product.save();
        }
      }

      res.status(201).json({
        message: 'Order placed successfully (Cash on Delivery)!',
        orderId: createdOrder._id,
        order: createdOrder
      });
    } catch (error) {
      console.error('Error creating order:', error);
      next(error);
    }
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'username email role');

    if (order) {
      if (order.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        return res.status(401).json({ message: 'Not authorized to view this order' });
      }
      res.json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    console.error('Error fetching order by ID:', error);
    next(error);
  }
};

// @desc    Get logged in user's orders (for User Dashboard)
// @route   GET /api/orders/myorders
const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ orderDate: -1 });
    res.json(orders);
  } catch (error) {
    console.error('Error fetching my orders:', error);
    next(error);
  }
};

// @desc    Get all orders (Admin only)
// @route   GET /api/orders
const getOrders = async (req, res, next) => {
  try {
    // Populating user to display customer name/email in admin view
    const orders = await Order.find({}).populate('user', 'username email').sort({ orderDate: -1 });
    res.json(orders);
  } catch (error) {
    console.error('Error fetching all orders (Admin):', error);
    next(error);
  }
};

module.exports = {
  addOrderItems,
  getOrderById,
  getMyOrders,
  getOrders, // Export the new function
};