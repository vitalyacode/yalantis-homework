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
import useDebouncedValues from '../../hooks/useDebouncedValues';
import { options, paginationOptions } from '../../utils/constants';

const ProductsPage = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProductIds);
  const paginationInfo = useSelector(selectPaginationInfo);

  const { page } = paginationInfo;

  const status = useSelector(selectStatus);

  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedCountries, setSelectedCountries] = useState(
    searchParams
      .get('origins')
      ?.split(',')
      .map((country) => options.find((option) => option.value === country)) || []
  );
  const [selectedPerPage, setSelectedPerPage] = useState(
    paginationOptions.find((option) => option.value === parseInt(searchParams.get('perPage'), 10))
    || paginationOptions[0]
  );
  const {
    minPrice, maxPrice, ...priceHandlers
  } = usePriceInputs(searchParams);

  const handleSearch = (e) => {
    if (e) e.preventDefault();

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

  const handleCountryChange = (selected) => {
    setSelectedCountries(selected);
  };
  const handlePerPageChange = (selected) => {
    setSelectedPerPage(selected);
    dispatch(setPerPage);
  };
  const parameters = toSearchObject(searchParams);

  // control request amount by "status" property in slice
  useEffect(() => {
    if (status !== 'idle' && status !== 'loading') dispatch(fetchProducts({ page, parameters }));
  }, [page, dispatch, searchParams]);

  const [
    debouncedCountries,
    debouncedMinPrice,
    debouncedMaxPrice,
  ] = useDebouncedValues(selectedCountries, minPrice, maxPrice, 500);
  useEffect(() => {
    if (status !== 'idle') {
      handleSearch();
    }
  }, [debouncedCountries, debouncedMinPrice, debouncedMaxPrice]);

  useEffect(() => {
    if (status === 'idle') dispatch(fetchProducts({ page: 1, parameters }));
    return () => {
      dispatch(resetProductsSlice());
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
