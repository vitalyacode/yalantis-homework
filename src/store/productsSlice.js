import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import productService from '../api/productService';

const productsAdapter = createEntityAdapter();

const initialState = productsAdapter.getInitialState({
  paginationInfo: {
    totalItems: 0,
    perPage: 0,
    page: 1,
  },
  status: 'idle',
  error: null,
});

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ page, parameters }) => {
    const response = await productService.getPage(page, parameters);
    return response;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setPage: (state, action) => {
      const page = action.payload;
      state.paginationInfo.page = page;
    },
    setPerPage: (state, action) => {
      const perPage = action.payload;
      state.paginationInfo.perPage = perPage;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        productsAdapter.setAll(state, action.payload.items);
        state.paginationInfo = {
          totalItems: action.payload.totalItems,
          perPage: action.payload.perPage,
          page: action.payload.page,
        };
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
      });
  },
});

export const { addProduct, setPage, setPerPage } = productsSlice.actions;

export default productsSlice.reducer;

export const selectPaginationInfo = (state) => state.products.paginationInfo;

export const selectStatus = (state) => state.products.status;

export const {
  selectAll: selectAllProducts,
  selectById: selectProductById,
  selectIds: selectProductIds,
} = productsAdapter.getSelectors((state) => state.products);
