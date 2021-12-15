import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import st from './index.module.css';
import {
  useProductDispatch,
  useProductState,
} from '../../../providers/ProductProvider';

const ProductCardExtendedQuantity = ({ product }) => {
  const dispatch = useProductDispatch();
  const { quantity } = useProductState().products.find(
    (p) => p.id === product.id
  );

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
            <div>Quantity: {quantity}</div>
          </div>
          <div className={st.buyInfo}>
            <span style={{ textAlign: 'center' }}>{product.price}₴</span>
            <button
              className={st.buyButton}
              onClick={() => dispatch({ type: 'ADD_PRODUCT', payload: product })
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

export default ProductCardExtendedQuantity;
