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
      navigate(user.role === 'admin' ? '/admin/dashboard' : '/products'); // Redirect customers to products page
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
      navigate('/products'); // Redirect to products page after successful verification
    } catch (err) {
      setError(err.message || String(err) || 'OTP verification failed');
    }
  };

  return (
    <div className="container mx-auto p-4 flex justify-center items-center min-h-[calc(100vh-100px)] bg-neutral-light"> {/* Added background */}
      <form onSubmit={submitHandler} className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md border border-neutral-light"> {/* Enhanced styling */}
        <h2 className="text-3xl font-bold text-primary-brand mb-6 text-center">Verify Your Account</h2> {/* Primary brand color */}
        <p className="text-center text-neutral-dark mb-6">An OTP has been sent to your email: <span className="font-semibold">{email}</span></p> {/* Neutral dark text */}

        {message && <div className="bg-primary-brand text-text-light p-3 rounded mb-4 text-center">{message}</div>} {/* Styled with new colors */}
        {error && <div className="bg-red-600 text-white p-3 rounded mb-4 text-center">{error}</div>} {/* Styled with new colors */}

        <div className="mb-4">
          <label className="block text-neutral-dark text-sm font-bold mb-2" htmlFor="otp">Enter OTP</label> {/* Neutral dark text */}
          <input
            type="text"
            id="otp"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-neutral-dark leading-tight focus:outline-none focus:shadow-outline focus:border-primary-brand text-center text-lg tracking-widest" // Focus border color
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength="6"
            required
          />
        </div>

        {/* VERIFY BUTTON - THIS IS THE RELEVANT PART */}
        <button
          type="submit"
          className="bg-primary-brand hover:bg-secondary-brand text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full transition duration-300 transform hover:scale-105"
        >
          Verify
        </button>
      </form>
    </div>
  );
};

export default OtpVerificationPage;