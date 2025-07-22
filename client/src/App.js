import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ProductListPage from './pages/ProductListPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage'; // <<< UNCOMMENTED
import OrderConfirmationPage from './pages/OrderConfirmationPage'; // <<< UNCOMMENTED
import OtpVerificationPage from './pages/OtpVerificationPage';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow pt-16">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/verify-otp" element={<OtpVerificationPage />} />

            {/* Public Product Listing */}
            <Route path="/products" element={<ProductListPage />} />

            {/* Protected User Routes */}
            <Route path="/user/dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
            <Route path="/cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
            <Route path="/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} /> {/* <<< UNCOMMENTED */}
            <Route path="/order-confirm/:orderId" element={<ProtectedRoute><OrderConfirmationPage /></ProtectedRoute>} /> {/* <<< UNCOMMENTED */}

            {/* Protected Admin Routes */}
            <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />

            {/* Fallback for 404 Not Found pages */}
            <Route path="*" element={
              <div className="min-h-[calc(100vh-100px)] flex items-center justify-center text-center text-2xl font-bold text-gray-700 bg-neutral-light">
                404 Not Found
              </div>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;