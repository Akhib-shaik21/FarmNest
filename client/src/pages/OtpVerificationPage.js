import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const OtpVerificationPage = () => {
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const { verifyOtp, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || ''; // Get email from registration page state

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate(user.role === 'admin' ? '/admin/dashboard' : '/user/dashboard');
    }
  }, [user, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!email) {
      setError('Email not found. Please go back to registration page.');
      return;
    }

    try {
      await verifyOtp(email, otp);
      setMessage('Account verified successfully!');
      navigate('/user/dashboard'); // Or wherever you want to redirect after successful login
    } catch (err) {
      setError(err || 'OTP verification failed');
    }
  };

  return (
    <div className="container mx-auto p-4 flex justify-center items-center min-h-[calc(100vh-100px)]">
      <form onSubmit={submitHandler} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold text-primary-green mb-6 text-center">Verify Your Account</h2>
        <p className="text-center text-gray-600 mb-6">An OTP has been sent to your email: <span className="font-semibold">{email}</span></p>

        {message && <div className="bg-green-100 text-green-700 p-3 rounded mb-4">{message}</div>}
        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="otp">Enter OTP</label>
          <input
            type="text"
            id="otp"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-center text-lg tracking-widest"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength="6"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-primary-green hover:bg-dark-green text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        >
          Verify
        </button>
      </form>
    </div>
  );
};

export default OtpVerificationPage;