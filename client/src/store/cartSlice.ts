import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartProduct } from '../types';

interface CartState {
  items: CartProduct[];
  total: number;
}

const initialState: CartState = {
  items: [],
  total: 0,
};

export const cartSlice = createSlice({
  name: 'Cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartProduct>) => {
      const existingProduct = state.items.find(
        (item) =>
          item.id === action.payload.id && item.sizes === action.payload.sizes
      );

      if (existingProduct) {
        existingProduct.quantity += action.payload.quantity;
      } else {
        state.items.push({
          ...action.payload,
          quantity: action.payload.quantity || 1,
        });
      }
      state.total += Number(action.payload.price);
    },

    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
