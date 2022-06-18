import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { createOrderActions } from '../utils/constants';

const cartAdapter = createEntityAdapter(); // each entity will also have *quantity* property

const initialState = cartAdapter.getInitialState({
  status: 'idle',
});

// commented code according to hw-4 guidelines

// export const postOrder = createAsyncThunk(
//   'cart/postOrder',
//   async (payload) => {
//     const response = await orderService.postOrder(payload);
//     return response;
//   }
// );

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    resetCartSlice: (state) => initialState,
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
      .addCase(createOrderActions.success, (state) => {
        state.status = 'success';
        state = initialState;
      })
      .addCase(createOrderActions.error, (state) => {
        state.status = 'error';
      });
  },
});

export const {
  addProduct, incrementProduct, decrementProduct, setQuantity, removeProduct, resetCartSlice,
} = cartSlice.actions;

export default cartSlice.reducer;

export const selectCartStatus = (state) => state.cart.status;

export const {
  selectAll: selectAllCartProducts,
  selectById: selectCartProductById,
  selectIds: selectCartProductIds,
} = cartAdapter.getSelectors((state) => state.cart);
