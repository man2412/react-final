// src/cartSlice.test.js
import cartReducer, { addToCart, updateQuantity, removeFromCart, clearCart } from './cartSlice';

describe('cart slice', () => {
  const initialState = {
    items: [],
  };

  it('should handle initial state', () => {
    expect(cartReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle addToCart', () => {
    const actual = cartReducer(initialState, addToCart({ id: 1, title: 'Test Product', quantity: 1 }));
    expect(actual.items[0]).toEqual({ id: 1, title: 'Test Product', quantity: 1 });
  });

  it('should handle updateQuantity', () => {
    const actual = cartReducer({ items: [{ id: 1, title: 'Test Product', quantity: 1 }] }, updateQuantity({ id: 1, quantity: 2 }));
    expect(actual.items[0].quantity).toEqual(2);
  });

  it('should handle removeFromCart', () => {
    const actual = cartReducer({ items: [{ id: 1, title: 'Test Product', quantity: 1 }] }, removeFromCart({ id: 1 }));
    expect(actual.items.length).toEqual(0);
  });

  it('should handle clearCart', () => {
    const actual = cartReducer({ items: [{ id: 1, title: 'Test Product', quantity: 1 }] }, clearCart());
    expect(actual.items.length).toEqual(0);
  });
});
