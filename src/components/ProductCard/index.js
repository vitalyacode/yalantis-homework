import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import st from './index.module.css';
import { selectProductById } from '../../store/productsSlice';
import { addProduct } from '../../store/cartSlice';
import ROUTE_PATHS from '../../routes/routes';

const ProductCard = ({ productId }) => {
  const dispatch = useDispatch();

  const product = useSelector((state) => selectProductById(state, productId));

  return (
    <div className={st.cardContainer}>
      <div className={st.cardInner}>
        <div className={st.generalInfo}>
          <h2 className={st.productName}>
            <Link to={ROUTE_PATHS.PRODUCT_ID(productId)}>{product.name}</Link>
          </h2>
          <span>Origin: {product.origin}</span>
        </div>
        <div className={st.buyInfo}>
          <span style={{ textAlign: 'center' }}>{product.price}₴</span>
          <button
            className={st.buyButton}
            onClick={() => dispatch(addProduct(product))}
          >
            Buy
          </button>
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  productId: PropTypes.string,
};

export default ProductCard;
