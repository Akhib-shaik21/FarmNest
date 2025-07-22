import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/products');
      }
    }
  }, [user, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const userData = await login(email, password);
      console.log('Logged in as:', userData);
    } catch (err) {
      setError(err || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="container mx-auto p-4 flex justify-center items-center min-h-[calc(100vh-100px)] bg-neutral-light">
      <form onSubmit={submitHandler} className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md border border-neutral-light">
        <h2 className="text-3xl font-bold text-primary-brand mb-6 text-center">Login to FarmNest</h2> {/* Changed AgriShop to FarmNest */}

        {error && <div className="bg-red-600 text-white p-3 rounded mb-4">{error}</div>}

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
        <div className="mb-6">
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
        <button
          type="submit"
          className="bg-primary-brand hover:bg-secondary-brand text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full transition duration-300 transform hover:scale-105"
        >
          Sign In
        </button>
        <p className="mt-4 text-center text-neutral-dark">
          New Customer? <Link to="/register" className="text-primary-brand hover:underline">Register Here</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;