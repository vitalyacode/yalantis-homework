import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import ROUTE_PATHS from '../../../routes/routes';
import { selectAllCartProducts } from '../../../store/cartSlice';
import st from './index.module.css';

const Cart = () => {
  const products = useSelector(selectAllCartProducts);
  const price = products.reduce(
    (prev, curr) => prev + curr.price * curr.quantity,
    0
  );
  const location = useLocation();
  if (location.pathname === ROUTE_PATHS.CART) return null;
  return (
    <h1 className={st.cart}>
      <Link to={ROUTE_PATHS.CART} className={st.link}>
        <div className={st.flex}>
          Cart
          <div className={st.price}>{price}</div>
        </div>
      </Link>
    </h1>
  );
};

export default Cart;
