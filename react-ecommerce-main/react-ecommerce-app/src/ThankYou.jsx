import React from 'react';
import { Link } from 'react-router-dom';

const ThankYou = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden md:max-w-2xl">
        <div className="p-4">
          <h2 className="text-2xl font-bold">Thank You for Your Order!</h2>
          <p className="mt-2 text-gray-600">We appreciate your business.</p>
          <Link to="/" className="mt-4 block text-center px-4 py-2 bg-blue-800 text-white rounded">Back to Shopping</Link>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
