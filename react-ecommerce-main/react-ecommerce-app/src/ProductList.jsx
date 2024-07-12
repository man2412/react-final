import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from './productsSlice';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const dispatch = useDispatch();
  const productsData = useSelector((state) => state.products.items);
  const productStatus = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);

  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    dispatch(fetchProducts({ category, minPrice: priceRange[0], maxPrice: priceRange[1], rating }));
  }, [category, priceRange, rating, dispatch]);

  const products = productsData.products || [];

  return (
    <div className="container mx-auto p-4">
      {/* Skip to Main Content Link */}
      <a href="#main-content" className="sr-only focus:not-sr-only">
        Skip to Main Content
      </a>
      
      <header className="mb-4">
        <h1 className="text-3xl font-bold text-black mb-2">Ecommerce Shop App</h1>
        <p>Welcome to the best ecommerce shop. Browse our products below and find the best deals!</p>
      </header>
      
      <div className="flex">
        <aside className="w-1/4 p-4 border-r border-gray-200" role="complementary">
          <h2 className="text-lg font-semibold mb-4">Filters</h2>
          <div className="mb-4">
            <label htmlFor="category-select" className="block text-lg font-semibold mb-1">Category</label>
            <select
              id="category-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border rounded p-2 w-full"
            >
              <option value="">All Categories</option>
              <option value="smartphones">Smartphones</option>
              <option value="laptops">Laptops</option>
              <option value="furniture">Furniture</option>
              <option value="clothing">Clothing</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-1">Price Range</label>
            <div className="flex space-x-2">
              <input
                type="number"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                className="border rounded p-2 w-1/2"
                placeholder="Min Price"
              />
              <input
                type="number"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                className="border rounded p-2 w-1/2"
                placeholder="Max Price"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-1">Rating</label>
            <input
              type="number"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="border rounded p-2 w-full"
              placeholder="Rating (0-5)"
              min="0"
              max="5"
            />
          </div>
        </aside>

        <main className="w-3/4 p-4" id="main-content" role="main">
          <section>
            <h2 className="text-lg font-semibold mb-4">Products</h2>
            {productStatus === 'loading' && <p>Loading...</p>}
            {productStatus === 'failed' && <p>Error: {error}</p>}
            {productStatus === 'succeeded' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.length > 0 ? (
                  products.map((product) => (
                    <Link to={`/product/${product.id}`} key={product.id} className="bg-white border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
                      <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
                      <p className="text-gray-700 mb-2">{product.description}</p>
                      <p className="text-green-700 font-bold mb-2">${product.price}</p>
                      <p className="text-yellow-800">Rating: {product.rating.toFixed(1)}</p>
                    </Link>
                  ))
                ) : (
                  <p>No products available.</p>
                )}
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
};

export default ProductList;
