require('dotenv').config(); // Load environment variables from .env
const express = require('express');
const connectDB = require('./config/db'); // Database connection
const authRoutes = require('./routes/authRoutes'); // Auth routes
const productRoutes = require('./routes/productRoutes'); // Product routes
const contactRoutes = require('./routes/contactRoutes'); // Contact form routes
const orderRoutes = require('./routes/orderRoutes'); // Order routes
const userRoutes = require('./routes/userRoutes'); // Add this line for User routes
const { notFound, errorHandler } = require('./middleware/errorMiddleware'); // Error handling middleware
const cors = require('cors'); // CORS middleware

const app = express();

// Connect Database
connectDB(); // Call the async function to connect to MongoDB

// Middleware for CORS (Cross-Origin Resource Sharing)
const allowedOrigins = [
  'http://localhost:3000', // Default Create React App port (keep it)
  'http://localhost:3001',
  'https://farm-nest-zeta.vercel.app', // Your current frontend port (from previous diagnostics)
  // IMPORTANT: When you deploy your frontend (e.g., to Vercel/Netlify),
  // add its deployed URL here, like: 'https://your-frontend-app.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like direct API calls, Postman, curl, or mobile apps)
    if (!origin) return callback(null, true);
    // Check if the requesting origin is in our allowed list
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true, // This allows cookies, authorization headers, etc. to be sent
}));

// Middleware to parse JSON request bodies
app.use(express.json());

// Define API Routes
app.use('/api/auth', authRoutes); // Handles user registration, OTP, login
app.use('/api/products', productRoutes); // Handles product fetching and admin CRUD operations
app.use('/api/contact', contactRoutes); // Handles contact form submissions
app.use('/api/orders', orderRoutes); // Handles order creation (COD), retrieval
app.use('/api/users', userRoutes); // Add this line for user routes (Admin user management)

// Error Handling Middleware (MUST be placed after all routes)
// This catches any requests that don't match existing routes (404 Not Found)
app.use(notFound);
// This handles all other errors that occur in your routes/middleware
app.use(errorHandler);

// Get the port from environment variables or default to 5000
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});