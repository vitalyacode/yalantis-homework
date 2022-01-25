import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import orderService from '../api/orderService';

const ordersAdapter = createEntityAdapter();

const initialState = ordersAdapter.getInitialState({
  status: 'idle',
  error: null,
});

export const fetchOrder = createAsyncThunk(
  'orders/getOrder',
  async (id) => {
    const response = await orderService.getById(id);
    return response;
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {

  },
  extraReducers(builder) {
    builder
      .addCase(fetchOrder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.status = 'succeeded';
        ordersAdapter.setAll(state, [action.payload]);
      })
      .addCase(fetchOrder.rejected, (state) => {
        state.status = 'error';
        state.error = 'Cannot get order';
      });
  },
});

// export const {

// } = orderSlice.actions;

export default ordersSlice.reducer;

export const selectOrdersStatus = (state) => state.orders.status;

export const {
  selectAll: selectAllOrders,
  selectById: selectOrderById,
  selectIds: selectOrderIds,
} = ordersAdapter.getSelectors((state) => state.orders);
