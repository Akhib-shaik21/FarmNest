const express = require('express');
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware'); // Import protect and admin
const router = express.Router();

// Public routes
router.get('/', getProducts);
router.get('/:id', getProductById);

// Admin routes (protected)
router.post('/', protect, admin, createProduct); // Admin can create products
router.put('/:id', protect, admin, updateProduct); // Admin can update products
router.delete('/:id', protect, admin, deleteProduct); // Admin can delete products

module.exports = router;