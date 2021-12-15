import React from 'react';
import { Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import ProductPage from '../components/ProductPage/index';

const ProductPageRoute = () => (
  <Route
    path="/"
    element={
      <MainLayout>
        <ProductPage />
      </MainLayout>
    }
  />
);

export default ProductPageRoute;
