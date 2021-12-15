import React from 'react';
import { Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import CartPage from '../components/CartPage/index';

const CartPageRoute = () => (
  <Route
    path="/cart"
    element={
      <MainLayout>
        <CartPage />
      </MainLayout>
    }
  />
);

export default CartPageRoute;
