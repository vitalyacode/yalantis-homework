import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import usePriceInputs from '../../hooks/usePriceInputs';
import {
  fetchProducts,
  selectPaginationInfo,
  selectProductIds,
  selectStatus,
  setPage,
  setPerPage,
  resetProductsSlice,
} from '../../store/productsSlice';
import { pruneObject } from '../../utils/pruneObject';
import { toSearchObject } from '../../utils/toSearchObject';
import CountryFilter from '../../components/CountryFilter';
import ErrorCard from '../../components/ErrorCard';
import Pagination from '../../components/Pagination';
import PerPage from '../../components/PerPage';
import Preloader from '../../components/Preloader';
import PriceFilter from '../../components/PriceFilter';
import ProductList from '../../components/ProductList/index';
import st from './index.module.css';

const ProductsPage = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProductIds);
  const paginationInfo = useSelector(selectPaginationInfo);

  const { page } = paginationInfo;

  const status = useSelector(selectStatus);

  const options = [
    { value: 'europe', label: 'Europe' },
    { value: 'usa', label: 'USA' },
    { value: 'africa', label: 'Africa' },
    { value: 'asia', label: 'Asia' },
  ];

  const paginationOptions = [
    { value: 10, label: '10' },
    { value: 25, label: '25' },
    { value: 50, label: '50' },
  ];

  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedPerPage, setSelectedPerPage] = useState(10);

  const [searchParams, setSearchParams] = useSearchParams();

  const { minPrice, maxPrice, ...priceHandlers } = usePriceInputs();

  const handleCountryChange = (selected) => {
    setSelectedCountries(selected);
  };
  const handlePerPageChange = (selected) => {
    setSelectedPerPage(selected);
    dispatch(setPerPage);
  };

  const handleSearch = (e) => {
    e.preventDefault();

    const countries = selectedCountries.map((el) => el.value);

    const params = {
      origins: [countries],
      minPrice,
      maxPrice,
      perPage: selectedPerPage.value,
    };
    const parameters = pruneObject(params);
    setSearchParams(parameters);
  };

  const parameters = toSearchObject(searchParams);

  // control request amount by "status" property in slice
  useEffect(() => {
    if (status !== 'idle') dispatch(fetchProducts({ page, parameters }));
  }, [page, dispatch, searchParams]);

  useEffect(() => {
    if (status === 'idle') dispatch(fetchProducts({ page: 1, parameters }));
    return () => {
      dispatch(resetProductsSlice());// should i reset like that or add new slice?
    };
  }, []);

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
        <p className={st.filterLabel}>Price</p>
        <PriceFilter
          handlers={priceHandlers}
          minPrice={minPrice}
          maxPrice={maxPrice}
        />
        <p className={st.filterLabel}>Items per page</p>
        <PerPage
          options={paginationOptions}
          selectedPerPage={selectedPerPage}
          handlePerPageChange={handlePerPageChange}
        />
        <button type="submit" className={st.filterSearch}>Search</button>
      </form>
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

export default ProductsPage;
