import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
};

const productsSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const productToChange = state.products.find(
        (p) => p.id === action.payload.id
      );

      state.products.concat(action.payload);
    },
  },
});

export const { addProduct } = productsSlice.actions;

export default productsSlice.reducer;

export const selectAllProducts = (state) => state.products.products;
