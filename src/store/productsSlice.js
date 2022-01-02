import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import productService from '../api/productService';

const initialState = {
  products: [],
  status: 'idle',
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: {

  },
});

export const { addProduct } = productsSlice.actions;

export default productsSlice.reducer;

export const selectAllProducts = (state) => state.products.products;
