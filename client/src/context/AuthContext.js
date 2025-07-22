import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // To handle initial load/check for token

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        // Decode token to get basic user info like ID
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const decoded = JSON.parse(window.atob(base64));
        // For full user details including role, you might fetch user profile from backend here if needed
        setUser({
          _id: decoded.id, // Assuming your JWT payload has an 'id' field
          // Placeholder for role - you might need to fetch full user details on login
          role: decoded.role || 'user', // Assuming role might also be in JWT payload or set default
          name: decoded.name || 'User', // Placeholder
          email: decoded.email || 'user@example.com' // Placeholder
        });
      } catch (error) {
        console.error('Invalid token or failed to decode:', error);
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/login`, { email, password });
      localStorage.setItem('token', res.data.token);
      // Ensure the user object returned by backend includes role
      setUser(res.data);
      return res.data;
    } catch (err) {
      // FIX IS HERE: Safely extract a string message from the error object
      throw err.response?.data?.message || err.message || 'An unexpected error occurred during login.';
    }
  };

  const register = async (name, email, password, phone) => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/register`, { name, email, password, phone });
      return res.data; // Should return message about OTP sent
    } catch (err) {
      // FIX IS HERE: Safely extract a string message from the error object
      throw err.response?.data?.message || err.message || 'An unexpected error occurred during registration.';
    }
  };

  const verifyOtp = async (email, otp) => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/verify-otp`, { email, otp });
      localStorage.setItem('token', res.data.token);
      setUser(res.data.user); // Backend verify-otp should return user object
      return res.data;
    } catch (err) {
      // FIX IS HERE: Safely extract a string message from the error object
      throw err.response?.data?.message || err.message || 'An unexpected error occurred during OTP verification.';
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, verifyOtp, logout }}>
      {children}
    </AuthContext.Provider>
  );
};