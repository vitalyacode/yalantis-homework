import React from 'react';
import { Link } from 'react-router-dom';
import st from './index.module.css';

const ProductCard = ({ product }) => (
  <div className={st.cardContainer}>
    <div className={st.cardInner}>
      <div className={st.generalInfo}>
        <h2 className={st.productName}><Link to={`/${product.id}`}>{product.name}</Link></h2>
        <span>Origin: {product.origin}</span>
      </div>
      <div className={st.buyInfo}>
        <span style={{ textAlign: 'center' }}>{product.price}₴</span>
        <button className={st.buyButton}>Buy</button>
      </div>
    </div>
  </div>
);

export default ProductCard;
