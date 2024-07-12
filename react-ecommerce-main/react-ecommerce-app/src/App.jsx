// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import ProductList from './ProductList';
import Checkout from './Checkout';
import Orders from './Orders';
import Cart from './Cart';
import Navbar from './Navbar';
import ProductPage from './ProductPage';
import { ToastContainer } from 'react-toastify';
import ThankYou from './ThankYou';
import 'react-toastify/dist/ReactToastify.css';

import './index.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="container mx-auto p-4">
        <Navbar />
        <ToastContainer />
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/product/:productId" element={<ProductPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/thank-you" element={<ThankYou />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
