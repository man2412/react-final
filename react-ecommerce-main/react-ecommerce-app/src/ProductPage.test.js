// src/ProductPage.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import ProductPage from './ProductPage';
import { addToCart } from './cartSlice';
import { ToastContainer } from 'react-toastify';

const mockStore = configureStore([]);

const renderWithProviders = (ui, { store, ...renderOptions } = {}) => {
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/product/1']}>
        <Routes>
          <Route path="/product/:productId" element={ui} />
        </Routes>
      </MemoryRouter>
      <ToastContainer />
    </Provider>,
    renderOptions
  );
};

describe('ProductPage', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      products: {
        items: {
          products: [
            { id: 1, title: 'Test Product', description: 'Test Description', price: 100, image: 'test.jpg' },
          ],
        },
      },
    });
    store.dispatch = jest.fn();
  });

  test('renders product details', () => {
    renderWithProviders(<ProductPage />, { store });

    expect(screen.getByText(/Test Product/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Description/i)).toBeInTheDocument();
    expect(screen.getByText(/\$100/i)).toBeInTheDocument();
  });

  test('adds product to cart and shows toast message', () => {
    renderWithProviders(<ProductPage />, { store });

    const addToCartButton = screen.getByText(/Add to Cart/i);
    fireEvent.click(addToCartButton);

    expect(store.dispatch).toHaveBeenCalledWith(addToCart({ id: 1, title: 'Test Product', description: 'Test Description', price: 100, image: 'test.jpg', quantity: 1 }));
    expect(screen.getByText(/Added to cart!/i)).toBeInTheDocument();
  });
});
