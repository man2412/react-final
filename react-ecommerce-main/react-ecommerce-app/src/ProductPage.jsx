import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addToCart } from './cartSlice';
import { toast } from 'react-toastify';


const ProductPage = () => {
  const { productId } = useParams();
  const productsResponse = useSelector((state) => state.products.items);
  const products = productsResponse.products || []; 
  const product = products.find(p => p.id === parseInt(productId));

  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  if (!product) {
    return <p>Product not found</p>;
  }

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity }));
    toast.success('Added to cart!', {
      style: {
        // Black background
        color: '#ffffff',
        background: '#006B00', // White text
      },
    });
  };

  return (
    <div className="container mx-auto p-4">
      <div id="main-content" className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden md:max-w-2xl">
        <img className="h-48 w-full object-cover" src={product.image} alt={product.title} />
        <div className="p-4">
          <h2 className="text-2xl font-bold">{product.title}</h2>
          <p className="mt-2 text-gray-600">{product.description}</p>
          <p className="mt-2 text-gray-600">${product.price}</p>
          <div className="flex items-center mt-4">
            <button onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)} className="px-2 py-1 bg-gray-200 rounded">-</button>
            <span className="mx-2">{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)} className="px-2 py-1 bg-gray-200 rounded">+</button>
          </div>
          <div className="mt-4">
            <button onClick={handleAddToCart} className="px-4 py-2 bg-blue-900 text-white rounded">Add to Cart (${(product.price * quantity).toFixed(2)})</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
