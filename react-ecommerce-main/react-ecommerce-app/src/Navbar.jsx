// src/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white font-bold text-xl">Shopping</Link>
        <div className="flex space-x-4">
          <Link to="/orders" className="text-white">Orders</Link>
          <Link to="/cart" className="text-white">Cart</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
