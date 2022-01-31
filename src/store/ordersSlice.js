import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import orderService from '../api/orderService';
import { orderByIdActions } from '../utils/constants';

const ordersAdapter = createEntityAdapter();

const initialState = ordersAdapter.getInitialState({
  status: 'idle',
  error: null,
});

// commented code according to hw-4 guidelines

// export const fetchOrderById = createAsyncThunk(
//   'orders/getOrderById',
//   async (id) => {
//     const response = await orderService.getById(id);
//     return response;
//   }
// );

export const fetchOrders = createAsyncThunk(
  'orders/getOrder',
  async () => {
    const response = await orderService.getAll();
    return response;
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    resetOrdersSlice: (state) => initialState,
  },
  extraReducers(builder) {
    builder
      .addCase(orderByIdActions.start, (state) => {
        state.status = 'loading';
      })
      .addCase(orderByIdActions.success, (state, action) => {
        state.status = 'succeeded';
        ordersAdapter.setAll(state, [action.payload]);
      })
      .addCase(orderByIdActions.error, (state) => {
        state.status = 'error';
        state.error = 'Cannot get order';
      })
      .addCase(fetchOrders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        ordersAdapter.setAll(state, action.payload.items);
      })
      .addCase(fetchOrders.rejected, (state) => {
        state.status = 'error';
        state.error = 'Cannot get orders';
      });
  },
});

export const {
  resetOrdersSlice,
} = ordersSlice.actions;

export default ordersSlice.reducer;

export const selectOrdersStatus = (state) => state.orders.status;

export const {
  selectAll: selectAllOrders,
  selectById: selectOrderById,
  selectIds: selectOrderIds,
} = ordersAdapter.getSelectors((state) => state.orders);
