import React from 'react';
import { Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout/MainLayout';
import ProductList from '../components/ProductList/ProductList';

const ProductListRoute = () => (
  <Route
    path="/"
    element={
      <MainLayout>
        <ProductList />
      </MainLayout>
    }
  />
);

export default ProductListRoute;
