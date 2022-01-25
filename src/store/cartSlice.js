import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import orderService from '../api/orderService';

const cartAdapter = createEntityAdapter(); // each entity will also have *quantity* property

const initialState = cartAdapter.getInitialState({});

export const postOrder = createAsyncThunk(
  'cart/postOrder',
  async (payload) => {
    const response = await orderService.postOrder(payload);
    return response;
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const productToUpdate = state.entities[action.payload.id]; // might not exist
      // if productToUpdate doesn't exist, insert payload object with additional property "quantity"
      if (!productToUpdate) return cartAdapter.upsertOne(state, { ...action.payload, quantity: 1 });
      // if productToUpdate exists, update the existing one
      return cartAdapter.upsertOne(state, {
        ...productToUpdate,
        quantity: productToUpdate.quantity + 1,
      });
    },
    removeProduct: (state, action) => {
      if (!state.entities[action.payload]) return state;
      return cartAdapter.removeOne(state, action.payload);
    },
    incrementProduct: (state, action) => {
      const productToUpdate = state.entities[action.payload];

      return cartAdapter.updateOne(state, {
        id: action.payload,
        changes: { quantity: productToUpdate.quantity + 1 },
      });
    },
    decrementProduct: (state, action) => {
      const productToUpdate = state.entities[action.payload];
      if (productToUpdate.quantity > 1) {
        return cartAdapter.updateOne(state, {
          id: action.payload,
          changes: { quantity: productToUpdate.quantity - 1 },
        });
      }
      return state;
    },
    setQuantity: (state, action) => {
      const numb = parseInt(action.payload.quantity, 10);
      if (action.payload.quantity > 0) {
        return cartAdapter.updateOne(state, {
          id: action.payload.id,
          changes: { quantity: numb },
        });
      }
      return state;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(postOrder.fulfilled, (state) => {
        state = initialState;
      });
  },
});

export const {
  addProduct, incrementProduct, decrementProduct, setQuantity, removeProduct,
} = cartSlice.actions;

export default cartSlice.reducer;

export const {
  selectAll: selectAllCartProducts,
  selectById: selectCartProductById,
  selectIds: selectCartProductIds,
} = cartAdapter.getSelectors((state) => state.cart);
