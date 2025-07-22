const User = require('../models/user');
const generateToken = require('../utils/generateToken');
const otpService = require('../utils/otpService');

// @desc    Register a new user
// @route   POST /api/auth/register
const registerUser = async (req, res, next) => {
  const { name, email, password, phone } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
    const otpExpires = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes

    user = await User.create({
      name,
      email,
      password,
      phone,
      otp,
      otpExpires,
      isVerified: false, // Ensure not verified until OTP confirms
    });

    // Send OTP via email
    await otpService.sendOTPEmail(email, otp);

    res.status(201).json({
      message: 'User registered. OTP sent to your email for verification.',
      userId: user._id,
      email: user.email,
    });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

// @desc    Verify OTP
// @route   POST /api/auth/verify-otp
const verifyOTP = async (req, res, next) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.otp !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    user.isVerified = true;
    user.otp = undefined; // Clear OTP after verification
    user.otpExpires = undefined; // Clear OTP expiry
    await user.save();

    res.status(200).json({
      message: 'Account verified successfully!',
      token: generateToken(user._id),
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('OTP Verification Error:', error);
    res.status(500).json({ message: 'Server error during OTP verification' });
  }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
const authUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      if (!user.isVerified) {
        return res.status(401).json({ message: 'Account not verified. Please verify using OTP.' });
      }

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

module.exports = { registerUser, verifyOTP, authUser };