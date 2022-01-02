import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProducts,
  selectPaginationInfo,
  selectProductIds,
  setPage,
} from '../../store/productsSlice';
import ErrorCard from '../ErrorCard';
import Pagination from '../Pagination';
import Preloader from '../Preloader';
import ProductList from '../ProductList/index';
import st from './index.module.css';

const ProductPage = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProductIds);
  const paginationInfo = useSelector(selectPaginationInfo);

  const { page } = paginationInfo;

  const status = useSelector((state) => state.products.status);

  useEffect(() => {
    if (products.length) {
      dispatch(fetchProducts(page));
    }
  }, [page, dispatch]);

  useEffect(() => {
    if (!products.length) {
      dispatch(fetchProducts(page));
    }
  }, []);

  if (status === 'error') return <ErrorCard />;
  if (status === 'loading' || status === 'idle') return <Preloader />;

  return (
    <div className={st.productPageWrapper}>
      <ProductList productIds={products} />
      <Pagination
        totalItems={paginationInfo.totalItems}
        perPage={paginationInfo.perPage}
        page={page}
        handler={(p) => dispatch(setPage(p))}
      />
    </div>
  );
};

export default ProductPage;
