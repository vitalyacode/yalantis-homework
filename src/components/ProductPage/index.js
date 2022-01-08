import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import usePriceInputs from '../../hooks/usePriceInputs';
import {
  fetchProducts,
  selectPaginationInfo,
  selectProductIds,
  setPage,
  setPerPage,
} from '../../store/productsSlice';
import { pruneObject } from '../../utils/pruneObject';
import { toSearchObject } from '../../utils/toSearchObject';
import CountryFilter from '../CountryFilter';
import ErrorCard from '../ErrorCard';
import Pagination from '../Pagination';
import PerPage from '../PerPage';
import Preloader from '../Preloader';
import PriceFilter from '../PriceFilter';
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
        <button type="submit">Search</button>
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
