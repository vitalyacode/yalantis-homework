import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import PropTypes from 'prop-types';
import st from './index.module.css';
import { useProductDispatch } from '../../../providers/ProductProvider';
import providerTypes from '../../../providers/types';
import types from '../../../PropTypes/defaultProduct';

const ProductCardExtended = ({ product }) => {
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
        <div style={{ display: 'flex' }}>
          <div className={st.additionalInfo}>
            <div>
              Created: {moment(product.createdAt).format('YYYY-MM-DD HH:MM:SS')}
            </div>
            <div>
              Updated: {moment(product.updatedAt).format('YYYY-MM-DD HH:MM:SS')}
            </div>
          </div>
          <div className={st.buyInfo}>
            <span style={{ textAlign: 'center' }}>{product.price}₴</span>
            <button
              className={st.buyButton}
              onClick={() => dispatch({ type: providerTypes.ADD_PRODUCT, payload: product })
              }
            >
              Buy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

ProductCardExtended.PropTypes = {
  product: PropTypes.shape(types.defaultProduct),
};

export default ProductCardExtended;
