import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-secondary-brown text-white py-8">
      <div className="container mx-auto text-center px-4">
        <h3 className="text-2xl font-bold mb-4">Contact Us</h3>
        <p className="text-lg mb-2">Email: info@organicharvest.com</p>
        <p className="text-lg mb-2">Phone: +91 98765 43210</p>
        <p className="text-lg">Address: 123 Farm Road, Green Valley, India</p>
        <p className="text-md mt-4">&copy; {new Date().getFullYear()} Organic Harvest. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;