// src/productsSlice.test.js
import axios from 'axios';
import { fetchProducts } from './productsSlice';
import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productsSlice';

jest.mock('axios');

describe('products slice', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        products: productsReducer,
      },
    });
  });

  it('should handle fetchProducts', async () => {
    const products = [{ id: 1, title: 'Test Product' }];
    axios.get.mockResolvedValueOnce({ data: products });

    await store.dispatch(fetchProducts({ category: 'test', minPrice: 0, maxPrice: 100, rating: 5 }));

    const state = store.getState().products;
    expect(state.items).toEqual(products);
  });
});
