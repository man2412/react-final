// src/Orders.jsx
import React from 'react';
import { useSelector } from 'react-redux';

const Orders = () => {
  const orders = useSelector((state) => state.orders.items);

  return (
    <div className="container mx-auto p-4">
      <h2 id= 'main-content'className="text-2xl font-bold mb-4">Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order, index) => (
          <div key={index} className="mb-4 p-4 bg-white shadow-md rounded-lg">
            <p><strong>Name:</strong> {order.name}</p>
            <p><strong>Address:</strong> {order.address}</p>
            <p><strong>City:</strong> {order.city}</p>
            <p><strong>Postal Code:</strong> {order.postalCode}</p>
            <p><strong>Total Price:</strong> ${order.totalPrice.toFixed(2)}</p>
            <p><strong>Order Date:</strong> {new Date(order.date).toLocaleDateString()}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
