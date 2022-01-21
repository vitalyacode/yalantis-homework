import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import st from './index.module.css';
import types from '../../../PropTypes/defaultProduct';
import { selectProductById } from '../../../store/productsSlice';
import Preloader from '../../Preloader';
import ROUTE_PATHS from '../../../routes/routes';

const ProductCardEditable = ({ productId, handleFormToggle }) => {
  const product = useSelector((state) => selectProductById(state, productId));

  if (!product) return <Preloader />;

  return (
    <div className={st.cardContainer}>
      <div className={st.cardInner}>
        <div className={st.generalInfo}>
          <h2 className={st.productName}>
            <Link to={ROUTE_PATHS.PRODUCT_ID(productId)}>{product.name}</Link>
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
              onClick={() => handleFormToggle(product)}
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div >
  );
};

ProductCardEditable.propTypes = {
  product: PropTypes.shape(types.defaultProduct),
};

export default ProductCardEditable;
