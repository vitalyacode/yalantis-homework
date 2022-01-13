import { configureStore } from '@reduxjs/toolkit';

import productsReducer from './productsSlice';
import cartReducer from './cartSlice';

export default configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
  },
});
