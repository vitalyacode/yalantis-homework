import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import st from './index.module.css';
import { useProductDispatch } from '../../providers/ProductProvider';
import types from '../../PropTypes/defaultProduct';

const ProductCard = ({ product }) => {
  const dispatch = useProductDispatch();

  return (
    <div className={st.cardContainer}>
      <div className={st.cardInner}>
        <div className={st.generalInfo}>
          <h2 className={st.productName}>
            <Link to={`/${product.id}`}>{product.name}</Link>
          </h2>
          <span>Origin: {product.origin}</span>
        </div>
        <div className={st.buyInfo}>
          <span style={{ textAlign: 'center' }}>{product.price}₴</span>
          <button
            className={st.buyButton}
            onClick={() => dispatch({ type: 'ADD_PRODUCT', payload: product })}
          >
            Buy
          </button>
        </div>
      </div>
    </div>
  );
};

ProductCard.PropTypes = {
  product: PropTypes.shape(types.defaultProduct),
};

export default ProductCard;
