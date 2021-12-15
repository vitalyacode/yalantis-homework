import React from 'react';
import { Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import ProductInfo from '../components/ProductInfo/index';

const ProductPageRoute = () => (
  <Route
    path="/:id"
    element={
      <MainLayout>
        <ProductInfo />
      </MainLayout>
    }
  />
);

export default ProductPageRoute;
