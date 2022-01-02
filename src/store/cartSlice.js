/* eslint-disable */

import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

const cartAdapter = createEntityAdapter();//each entity will also have *quantity* property

const initialState = cartAdapter.getInitialState({});

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const productToUpdate = state.entities[action.payload.id] //might not exist
      //if productToUpdate doesn't exist, insert payload object with additional property "quantity"
      if (!productToUpdate) return cartAdapter.upsertOne(state, { ...action.payload, quantity: 1 })
      console.log({ ...productToUpdate, quantity: productToUpdate.quantity + 1 })
      //if productToUpdate exists, update the existing one
      return cartAdapter.upsertOne(state, { ...productToUpdate, quantity: productToUpdate.quantity + 1 })
    },
  },
});

export const { addProduct } = cartSlice.actions;

export default cartSlice.reducer;

export const {
  selectAll: selectAllCartProducts,
  selectById: selectCartProductById,
  selectIds: selectCartProductIds,
} = cartAdapter.getSelectors((state) => state.cart);
