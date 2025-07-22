const express = require('express');
const { registerUser, verifyOTP, authUser } = require('../controllers/authController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/verify-otp', verifyOTP);
router.post('/login', authUser);

module.exports = router;