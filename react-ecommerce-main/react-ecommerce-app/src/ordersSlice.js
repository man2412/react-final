// src/ordersSlice.js
import { createSlice } from '@reduxjs/toolkit';

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    items: [],
  },
  reducers: {
    addOrder: (state, action) => {
      state.items.push(action.payload);
    },
  },
});

export const { addOrder } = ordersSlice.actions;

export default ordersSlice.reducer;
