// src/Cart.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CartItem from './CartItem';
import { clearCart } from './cartSlice';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const handleBackToShopping = () => {
    navigate('/');
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      {cartItems.length > 0 ? (
        <div className="flex flex-wrap">
          <div className="w-full md:w-2/3">
            {cartItems.map((item) => <CartItem key={item.id} item={item} />)}
          </div>

          <div className="w-full md:w-1/3 md:pl-4">
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">Order Summary</h3>
              <p className="text-lg mb-2">Total: ${totalPrice.toFixed(2)}</p>

              <div className="mt-4 flex flex-col space-y-2">
                <button onClick={handleBackToShopping} className="px-4 py-2 bg-gray-500 text-white rounded">Back to Shopping</button>
                <button onClick={handleCheckout} className="px-4 py-2 bg-blue-500 text-white rounded">Continue to Checkout</button>
                <button onClick={handleClearCart} className="px-4 py-2 bg-red-500 text-white rounded">Clear Cart</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  );
};

export default Cart;
