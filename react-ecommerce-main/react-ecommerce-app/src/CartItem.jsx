// src/components/CartItem.jsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from './cartSlice';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleIncrement = () => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
    }
  };

  const handleRemove = () => {
    dispatch(removeFromCart({ id: item.id }));
  };

  return (
    <div className="flex items-center mb-4">
      <div className="flex-1">
        <h2 className="text-lg font-semibold">{item.title}</h2>
        <p className="text-gray-700">${item.price}</p>
        <div className="flex items-center">
          <button onClick={handleDecrement} className="px-2 py-1 bg-gray-300 text-gray-700 rounded">-</button>
          <input
            type="number"
            value={item.quantity}
            readOnly
            className="mx-2 border rounded p-2 w-16 text-center"
          />
          <button onClick={handleIncrement} className="px-2 py-1 bg-gray-300 text-gray-700 rounded">+</button>
        </div>
      </div>
      <button onClick={handleRemove} className="px-4 py-2 bg-red-500 text-white rounded">
        Remove
      </button>
    </div>
  );
};

export default CartItem;
