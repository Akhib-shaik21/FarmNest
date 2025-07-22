const User = require('../models/user');

// @desc    Get all users (Admin only)
// @route   GET /api/users
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).select('-password'); // Exclude passwords
    res.json(users);
  } catch (error) {
    console.error('Error fetching all users (Admin):', error);
    next(error);
  }
};

// @desc    Delete user (Admin only)
// @route   DELETE /api/users/:id
const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      if (user.role === 'admin') {
        res.status(400).json({ message: 'Cannot delete admin user' });
        return;
      }
      await User.deleteOne({ _id: user._id });
      res.json({ message: 'User removed' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    next(error);
  }
};

// @desc    Update user role (Admin only)
// @route   PUT /api/users/:id/role
const updateUserRole = async (req, res, next) => {
  const { role } = req.body; // New role
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      if (!['customer', 'admin', 'farmer'].includes(role)) {
        return res.status(400).json({ message: 'Invalid user role' });
      }
      if (user.role === 'admin' && role !== 'admin' && req.user._id.toString() === user._id.toString()) {
          return res.status(400).json({ message: 'Cannot demote yourself' });
      }
      user.role = role;
      await user.save();
      res.json({ message: `User role updated to ${role}` });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error updating user role:', error);
    next(error);
  }
};

module.exports = {
  getUsers,
  deleteUser,
  updateUserRole,
};