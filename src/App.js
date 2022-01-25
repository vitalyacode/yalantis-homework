import React from 'react';
import {
  BrowserRouter, Routes, Route, Navigate,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import ProductsPage from './pages/ProductsPage/index';
import SingleProductPage from './pages/ProductInfo/index';
import CartPage from './pages/CartPage/index';
import st from './app.module.css';
import MainLayout from './layouts/MainLayout';
import ROUTE_PATHS from './routes/routes';
import store from './store/store';
import MyProductsPage from './pages/MyProductsPage';
import OrderPage from './pages/SingleOrderPage';

const App = () => (
  <div className={`App ${st.app}`}>
    <Provider store={store}>
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path={ROUTE_PATHS.HOME} element={<ProductsPage />} />
            <Route path={ROUTE_PATHS.PRODUCT} element={<SingleProductPage />} />
            <Route path={ROUTE_PATHS.CART} element={<CartPage />} />
            <Route path={ROUTE_PATHS.MY_PRODUCTS} element={<MyProductsPage />} />
            <Route path={ROUTE_PATHS.ORDER} element={<OrderPage />} />
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
