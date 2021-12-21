import React, { useState, useEffect } from 'react';
import productService from '../../api/productService';
import ErrorCard from '../ErrorCard';
import Pagination from '../Pagination';
import Preloader from '../Preloader';
import ProductList from '../ProductList/index';
import st from './index.module.css';

const ProductPage = () => {
  const [products, setProducts] = useState(null);
  const [paginationInfo, setPaginationInfo] = useState(null);
  const [page, setPage] = useState(1);

  const [isError, setIsError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await productService.getPage(page);
        setProducts(response.items);
        setPaginationInfo({
          totalItems: response.totalItems,
          perPage: response.perPage,
        });
        setPage(page);
      } catch (e) {
        setIsError(true);
      }
    })();
  }, [page]);

  if (isError) return <ErrorCard />;
  if (!products || !paginationInfo) return <Preloader />;
  return (
    <div className={st.productPageWrapper}>
      <ProductList products={products} />
      <Pagination
        totalItems={paginationInfo.totalItems}
        perPage={paginationInfo.perPage}
        page={page}
        handler={setPage}
      />
    </div>
  );
};

export default ProductPage;
