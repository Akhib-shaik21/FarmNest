const express = require('express');
const { getUsers, deleteUser, updateUserRole } = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

// Admin routes for users
router.get('/', protect, admin, getUsers); // GET /api/users (all users)
router.delete('/:id', protect, admin, deleteUser); // DELETE /api/users/:id
router.put('/:id/role', protect, admin, updateUserRole); // PUT /api/users/:id/role

module.exports = router;