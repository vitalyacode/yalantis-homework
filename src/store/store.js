import { configureStore } from '@reduxjs/toolkit';

import createSagaMiddleware from 'redux-saga';
import productsReducer from './productsSlice';
import cartReducer from './cartSlice';
import ordersReducer from './ordersSlice';
import rootSaga from '../rootSaga';

const sagaMiddleware = createSagaMiddleware();
export default configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    orders: ordersReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
