import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductPage from './components/ProductPage/index';
import SingleProductPage from './components/ProductInfo/index';
import CartPage from './components/CartPage/index';
import st from './app.module.css';
import ProductProvider from './providers/ProductProvider';
import MainLayout from './layouts/MainLayout';
import ROUTE_PATHS from './routes/routes';

const App = () => (
  <div className={`App ${st.app}`}>
    <ProductProvider>
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path={ROUTE_PATHS.HOME} element={<ProductPage />} />
            <Route path={ROUTE_PATHS.PRODUCT} element={<SingleProductPage />} />
            <Route path={ROUTE_PATHS.CART} element={<CartPage />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </ProductProvider>
  </div>
);

export default App;
