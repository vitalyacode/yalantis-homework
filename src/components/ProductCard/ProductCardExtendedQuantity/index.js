import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import st from './index.module.css';
import types from '../../../PropTypes/defaultProduct';
import { addProduct, selectCartProductById } from '../../../store/cartSlice';

const ProductCardExtendedQuantity = ({ productId }) => {
  const dispatch = useDispatch();

  const product = useSelector((state) => selectCartProductById(state, productId));

  return (
    <div className={st.cardContainer}>
      <div className={st.cardInner}>
        <div className={st.generalInfo}>
          <h2 className={st.productName}>
            <Link to={`/${productId}`}>{product.name}</Link>
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
            <div>Quantity: {product.quantity}</div>
          </div>
          <div className={st.buyInfo}>
            <span className={st.price}>{product.price}₴</span>
            <button
              className={st.buyButton}
              onClick={() => dispatch(addProduct(product))}
            >
              Buy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

ProductCardExtendedQuantity.propTypes = {
  product: PropTypes.shape(types.defaultProduct),
};

export default ProductCardExtendedQuantity;
