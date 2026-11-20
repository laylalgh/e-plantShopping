/* Redux slice; this file deliberately exports state logic instead of React components. */
/* eslint-disable react-refresh/only-export-components */
import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: { items: [] },
  reducers: {
    addItem(state, action) {
      const plant = action.payload;
      const item = state.items.find(entry => entry.name === plant.name);
      if (item) {
        item.quantity += 1;
      } else {
        state.items.push({ ...plant, quantity: 1 });
      }
    },
    removeItem(state, action) {
      state.items = state.items.filter(item => item.name !== action.payload);
    },
    updateQuantity(state, action) {
      const { name, quantity } = action.payload;
      const index = state.items.findIndex(item => item.name === name);
      if (index === -1 || !Number.isInteger(quantity)) return;
      if (quantity <= 0) {
        state.items.splice(index, 1);
      } else {
        state.items[index].quantity = quantity;
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;
export default CartSlice.reducer;
