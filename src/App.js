import React from 'react';
import {
  BrowserRouter, Routes, Route, Navigate,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import ProductPage from './components/ProductPage/index';
import SingleProductPage from './components/ProductInfo/index';
import CartPage from './components/CartPage/index';
import st from './app.module.css';
import MainLayout from './layouts/MainLayout';
import ROUTE_PATHS from './routes/routes';
import store from './store/store';

const App = () => (
  <div className={`App ${st.app}`}>
    <Provider store={store}>
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path={ROUTE_PATHS.HOME} element={<ProductPage />} />
            <Route path={ROUTE_PATHS.PRODUCT} element={<SingleProductPage />} />
            <Route path={ROUTE_PATHS.CART} element={<CartPage />} />
            <Route
              path="*"
              element={<Navigate to={ROUTE_PATHS.HOME} />}
            />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </Provider>
  </div>
);

export default App;
