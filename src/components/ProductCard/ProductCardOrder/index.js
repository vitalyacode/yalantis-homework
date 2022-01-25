import React from 'react';
import { Link } from 'react-router-dom';
import ROUTE_PATHS from '../../../routes/routes';
import st from './index.module.css';

const ProductCardOrder = ({ product }) => {
  const price = product.count * product.product.price;
  return (
    <div className={st.productCardOrder}>
      <h3 className={st.productName}>
        x{product.count} <Link to={ROUTE_PATHS.PRODUCT_ID(product.product.id)}>{product.product.name}</Link>
      </h3>
      <p className={st.price}>{price}₴</p>
    </div>
  );
};

export default ProductCardOrder;
