import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState(''); // Optional
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const res = await register(name, email, password, phone);
      setMessage(res.message || 'Registration successful. Please check your email for OTP.');
      navigate('/verify-otp', { state: { email } });
    } catch (err) {
      setError(err.message || String(err) || 'Registration failed');
    }
  };

  return (
    <div className="container mx-auto p-4 flex justify-center items-center min-h-[calc(100vh-100px)] bg-neutral-light">
      <form onSubmit={submitHandler} className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md border border-neutral-light">
        <h2 className="text-3xl font-bold text-primary-brand mb-6 text-center">Register for FarmNest</h2> {/* Changed AgriShop to FarmNest */}

        {message && <div className="bg-primary-brand text-text-light p-3 rounded mb-4">{message}</div>}
        {error && <div className="bg-red-600 text-white p-3 rounded mb-4">{error}</div>}

        <div className="mb-4">
          <label className="block text-neutral-dark text-sm font-bold mb-2" htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-neutral-dark leading-tight focus:outline-none focus:shadow-outline focus:border-primary-brand"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-neutral-dark text-sm font-bold mb-2" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-neutral-dark leading-tight focus:outline-none focus:shadow-outline focus:border-primary-brand"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-neutral-dark text-sm font-bold mb-2" htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-neutral-dark mb-3 leading-tight focus:outline-none focus:shadow-outline focus:border-primary-brand"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-neutral-dark text-sm font-bold mb-2" htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-neutral-dark mb-3 leading-tight focus:outline-none focus:shadow-outline focus:border-primary-brand"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-neutral-dark text-sm font-bold mb-2" htmlFor="phone">Phone (Optional)</label>
          <input
            type="text"
            id="phone"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-neutral-dark leading-tight focus:outline-none focus:shadow-outline focus:border-primary-brand"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="bg-primary-brand hover:bg-secondary-brand text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full transition duration-300 transform hover:scale-105"
        >
          Register
        </button>
        <p className="mt-4 text-center text-neutral-dark">
          Already have an account? <Link to="/login" className="text-primary-brand hover:underline">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;