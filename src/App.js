import React from 'react';
import { BrowserRouter, Routes } from 'react-router-dom';
import ProductPageRoute from './routes/ProductPageRoute';
import SingleProductPageRoute from './routes/SingleProductPageRoute';
import CartPageRoute from './routes/CartPageRoute';
import st from './app.module.css';
import ProductProvider from './providers/ProductProvider';

const App = () => (
  <div className={`App ${st.app}`}>
    <ProductProvider>
      <BrowserRouter>
        <Routes>
          {ProductPageRoute()}
          {SingleProductPageRoute()}
          {CartPageRoute()}
        </Routes>
      </BrowserRouter>
    </ProductProvider>
  </div>
);

export default App;
