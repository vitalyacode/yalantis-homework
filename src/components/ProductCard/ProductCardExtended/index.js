import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import st from './index.module.css';
import { addProduct } from '../../../store/cartSlice';
import { selectProductById } from '../../../store/productsSlice';
import productService from '../../../api/productService';
import Preloader from '../../Preloader';
import ROUTE_PATHS from '../../../routes/routes';

const ProductCardExtended = ({ productId }) => {
  const dispatch = useDispatch();

  const storeProduct = useSelector((state) => selectProductById(state, productId));
  const [product, setProduct] = useState(storeProduct);

  useEffect(() => {
    if (!product) {
      (async () => {
        const response = await productService.getById(productId);
        setProduct(response);
      })();
    }
  }, []);

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

ProductCardExtended.propTypes = {
  productId: PropTypes.string.isRequired,
};

export default ProductCardExtended;
