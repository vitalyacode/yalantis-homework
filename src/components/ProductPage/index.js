import React, { useState, useEffect } from 'react';
import productService from '../../api/productService';
import Pagination from '../Pagination';
import ProductList from '../ProductList/index';
import st from './index.module.css';

const ProductPage = () => {
  const [products, setProducts] = useState(null);
  const [paginationInfo, setPaginationInfo] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    (async () => {
      const response = await productService.getPage(page);
      setProducts(response.items);
      setPaginationInfo({
        totalItems: response.totalItems,
        perPage: response.perPage,
      });
      setPage(page);
    })();
  }, [page]);

  if (!products || !paginationInfo) return 'loading';
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
