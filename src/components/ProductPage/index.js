import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import {
  fetchProducts,
  selectPaginationInfo,
  selectProductIds,
  setPage,
} from '../../store/productsSlice';
import { pruneObject } from '../../utils/pruneObject';
import { toSearchObject } from '../../utils/toSearchObject';
import CountryFilter from '../CountryFilter';
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

  const options = [
    { value: 'europe', label: 'Europe' },
    { value: 'usa', label: 'USA' },
    { value: 'africa', label: 'Africa' },
    { value: 'asia', label: 'Asia' },
  ];

  const [selectedCountries, setSelectedCountries] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();

  const handleCountryChange = (selected) => {
    setSelectedCountries(selected);
  };

  const handleSearch = (e) => {
    e.preventDefault();

    const countries = selectedCountries.map((el) => el.value);

    const params = {
      origins: [countries],
      minPrice: null,
    };
    const parameters = pruneObject(params);
    setSearchParams(parameters);
  };

  const parameters = toSearchObject(searchParams);

  useEffect(() => {
    dispatch(fetchProducts({ page, parameters }));
  }, [page, dispatch]);

  useEffect(() => {
    dispatch(fetchProducts({ page: 1, parameters }));
  }, [searchParams]);

  if (status === 'error') return <ErrorCard />;
  if (status === 'loading' || status === 'idle') return <Preloader />;

  return (
    <div className={st.productPageWrapper}>
      <form onSubmit={(e) => handleSearch(e)}>
        <CountryFilter
          options={options}
          handleCountryChange={handleCountryChange}
          selectedCountries={selectedCountries}
        />
        {/* {?${encodeURIComponent(searchString)}} */}
        {/* <Link to={{ pathname: '/products', search: `?${encodeURIComponent(searchString)}` }} > */}
        <button type="submit">Search</button>
        {/* </Link> */}
      </form>
      <ProductList productIds={products} />
      <Pagination
        totalItems={paginationInfo.totalItems}
        perPage={paginationInfo.perPage}
        page={page}
        handler={(p) => dispatch(setPage(p))}
      />
    </div >
  );
};

export default ProductPage;
