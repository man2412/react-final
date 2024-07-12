// src/Cart.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateQuantity, removeFromCart, clearCart } from './cartSlice';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleQuantityChange = (id, quantity) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart({ id }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const handleReturnToShopping = () => {
    navigate('/');
  };


  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-2/3">
            {cartItems.map((item) => (
              <div key={item.id} className="border p-4 mb-4 rounded">
                <h3 className="text-lg font-bold">{item.title}</h3>
                <p>${item.price}</p>
                <div className="flex items-center">
                  <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)} className="px-2 py-1 bg-gray-200 rounded">-</button>
                  <span className="mx-2">{item.quantity}</span>
                  <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)} className="px-2 py-1 bg-gray-200 rounded">+</button>
                </div>
                <button onClick={() => handleRemove(item.id)} className="px-4 py-2 bg-red-700 text-white rounded mt-2">Remove</button>
              </div>
            ))}
          </div>
          <div className="lg:w-1/3 lg:ml-4">
            <div className="border p-4 rounded">
              <h3 className="text-lg font-bold mb-4">Order Summary</h3>
              <p>Total Items: {totalItems}</p>
              <p>Total Price: ${total.toFixed(2)}</p>
              <button onClick={handleCheckout} className="px-4 py-2 bg-blue-600 text-white rounded mt-4 w-full">Continue to Checkout</button>
              <button onClick={handleClearCart} className="px-4 py-2 bg-red-700 text-white rounded mt-2 w-full">Clear Cart</button>
              <button onClick={handleReturnToShopping} className="px-4 py-2 bg-green-700 text-white rounded mt-2 w-full">Return to Shopping</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
