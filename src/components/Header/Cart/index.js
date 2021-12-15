import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useProductState } from '../../../providers/ProductProvider';
import st from './index.module.css';

const Cart = () => {
  const { quantity } = useProductState();
  const location = useLocation();
  if (location.pathname === '/cart') return null;
  return (
    <h1 className={st.cart}>
      <Link to="/cart" className={st.link}>
        <div style={{ display: 'flex' }}>
          Cart
          <div className={st.items}>{quantity}</div>
        </div>
      </Link>
    </h1>
  );
};

export default Cart;
