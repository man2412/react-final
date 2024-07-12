// src/Checkout.jsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from './cartSlice';
import { addOrder } from './ordersSlice';

const Checkout = () => {
  const [shippingInfo, setShippingInfo] = useState({ name: '', address: '', city: '', postalCode: '' });
  const [paymentInfo, setPaymentInfo] = useState({ cardNumber: '', expiryDate: '', cVV: '' });
  const [errors, setErrors] = useState({});
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in shippingInfo) {
      setShippingInfo({ ...shippingInfo, [name]: value });
    } else if (name in paymentInfo) {
      setPaymentInfo({ ...paymentInfo, [name]: value });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    Object.entries(shippingInfo).forEach(([key, value]) => {
      if (!value) newErrors[key] = `${key} is required`;
    });
    Object.entries(paymentInfo).forEach(([key, value]) => {
      if (!value) newErrors[key] = `${key} is required`;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = () => {
    if (validateForm()) {
      const order = {
        ...shippingInfo,
        ...paymentInfo,
        items: cartItems,
        totalPrice,
        date: new Date().toISOString(),
      };
      dispatch(addOrder(order));
      dispatch(clearCart());
      navigate('/thank-you');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-xl font-bold mb-2">Shipping Information</h3>
          <form>
            {['name', 'address', 'city', 'postalCode'].map((field) => (
              <div key={field} className="mb-4">
                <label className="block text-gray-700">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                <input
                  type="text"
                  name={field}
                  value={shippingInfo[field]}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border ${errors[field] ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                />
                {errors[field] && <p className="text-red-500 text-xs mt-1">{errors[field]}</p>}
              </div>
            ))}
          </form>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2">Payment Details</h3>
          <form>
            {['cardNumber', 'expiryDate', 'cVV'].map((field) => (
              <div key={field} className="mb-4">
                <label className="block text-gray-700">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                <input
                  type="text"
                  name={field}
                  value={paymentInfo[field]}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border ${errors[field] ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                />
                {errors[field] && <p className="text-red-500 text-xs mt-1">{errors[field]}</p>}
              </div>
            ))}
          </form>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-xl font-bold mb-2">Order Summary</h3>
        <ul>
          {cartItems.map((item) => (
            <li key={item.id} className="mb-2">
              {item.title} x {item.quantity} - ${(item.price * item.quantity).toFixed(2)}
            </li>
          ))}
        </ul>
        <p className="font-bold">Total: ${totalPrice.toFixed(2)}</p>
      </div>
      <div className="mt-4">
        <button onClick={() => navigate('/cart')} className="px-4 py-2 bg-gray-500 text-white rounded">Back to Cart</button>
        <button onClick={handlePlaceOrder} className="px-4 py-2 bg-blue-500 text-white rounded">Place Order</button>
      </div>
    </div>
  );
};

export default Checkout;
