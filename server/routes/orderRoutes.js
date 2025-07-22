const express = require('express');
const {
  addOrderItems,
  getOrderById,
  getMyOrders,
  getOrders, // Import the new function
} = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, addOrderItems);
router.get('/myorders', protect, getMyOrders);
router.get('/:id', protect, getOrderById);

// Admin routes
router.get('/', protect, admin, getOrders); // Admin can get all orders (note: this is now the default GET /api/orders)

module.exports = router;