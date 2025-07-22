import React, { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { totalCartItems } = useContext(CartContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');

  const handleScrollToSection = (sectionId) => {
    if (location.pathname === '/') {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/', { state: { scrollTo: sectionId } });
    }
  };

  React.useEffect(() => {
    if (location.pathname === '/' && location.state?.scrollTo) {
      const section = document.getElementById(location.state.scrollTo);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        navigate(location.pathname, { replace: true, state: {} });
      }
    }
  }, [location, navigate]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-primary-brand p-4 text-neutral-dark shadow-lg z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-3xl font-extrabold text-neutral-dark tracking-wide hover:text-neutral-dark transition duration-300">
          FarmNest {/* Changed from AgriShop */}
        </Link>
        <div className="flex items-center space-x-6">

          <form onSubmit={handleSearchSubmit} className="relative flex items-center bg-secondary-brand rounded-full overflow-hidden">
            <input
              type="text"
              placeholder="Search products..."
              className="p-2 pl-4 bg-transparent text-text-light placeholder-neutral-light focus:outline-none focus:ring-0 focus:border-transparent w-48 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              type="submit"
              className="px-4 text-text-light hover:bg-primary-brand transition duration-300"
              aria-label="Search"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </form>

          <Link to="/products" className="font-semibold text-neutral-dark hover:text-neutral-dark transition duration-300">Products</Link>
          <button
            onClick={() => handleScrollToSection('about-section')}
            className="font-semibold bg-transparent border-none text-neutral-dark hover:text-neutral-dark cursor-pointer p-0 transition duration-300"
          >
            About
          </button>
          <button
            onClick={() => handleScrollToSection('contact-section')}
            className="font-semibold bg-transparent border-none text-neutral-dark hover:text-neutral-dark cursor-pointer p-0 transition duration-300"
          >
            Contact
          </button>

          <Link to="/cart" className="relative hover:text-neutral-dark transition duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5.4M7 13l-2.293 2.293c-.63.63-.184 1.769.743 1.769H19M11 15h1m-1 0a2 2 0 110 4 2 2 0 010-4zm7 0a2 2 0 110 4 2 2 0 010-4z"
              />
            </svg>
            {totalCartItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent-warm text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {totalCartItems}
              </span>
            )}
          </Link>

          {user ? (
            <>
              <Link to={user.role === 'admin' ? '/admin/dashboard' : '/user/dashboard'} className="font-semibold text-neutral-dark hover:text-neutral-dark transition duration-300">Dashboard</Link>
              <button onClick={logout} className="bg-secondary-brand px-3 py-1 rounded-full text-text-light hover:bg-primary-brand transition duration-300">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="bg-secondary-brand px-3 py-1 rounded-full text-text-light hover:bg-primary-brand transition duration-300">Login</Link>
              <Link to="/register" className="bg-secondary-brand px-3 py-1 rounded-full text-text-light hover:bg-primary-brand transition duration-300">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;