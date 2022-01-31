import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import usePriceInputs from '../../hooks/usePriceInputs';
import {
  fetchEditableProducts,
  resetProductsSlice,
  selectPaginationInfo,
  selectProductIds,
  selectStatus,
  setPage,
  setPerPage,
} from '../../store/productsSlice';
import { pruneObject } from '../../utils/pruneObject';
import { toSearchObject } from '../../utils/toSearchObject';
import CountryFilter from '../../components/CountryFilter';
import ErrorCard from '../../components/ErrorCard';
import Pagination from '../../components/Pagination';
import PerPage from '../../components/PerPage';
import Preloader from '../../components/Preloader';
import PriceFilter from '../../components/PriceFilter';
import st from './index.module.css';
import ProductListEditable from '../../components/ProductList/ProductListEditable';
import Modal from '../../components/Modal';
import EditProductForm from '../../components/Forms/EditProductForm';
import useDebouncedValues from '../../hooks/useDebouncedValues';

const MyProductsPage = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProductIds);
  const paginationInfo = useSelector(selectPaginationInfo);

  const { page } = paginationInfo;

  const status = useSelector(selectStatus);

  const [show, setShow] = useState(false);
  const [initFormObject, setInitFormObject] = useState({});

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

  const handleCountryChange = (selected) => {
    setSelectedCountries(selected);
  };
  const handlePerPageChange = (selected) => {
    setSelectedPerPage(selected);
    dispatch(setPerPage);
  };

  const handleFormToggle = (obj) => { // this function is used in ProductList->ProductCard->edit button to get initObj
    setInitFormObject(obj);
    setShow(true);
  };

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

  const parameters = toSearchObject(searchParams);

  useEffect(() => {
    if (status !== 'idle' && status !== 'loading') dispatch(fetchEditableProducts({ page, parameters }));
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
    if (status === 'idle') dispatch(fetchEditableProducts({ page: 1, parameters }));
    return () => {
      dispatch(resetProductsSlice());
    };
  }, []);

  if (status === 'error') return <ErrorCard />;
  if (status === 'loading' || status === 'idle') return <Preloader />;

  return (
    <div className={st.productPageWrapper}>
      <Modal
        show={show}
        onClose={() => setShow(false)}
        title='Edit product'
      >
        <EditProductForm
          onClose={() => setShow(false)}
          initialObject={initFormObject}// get initFormObject in handleFormToggle function
        />
      </Modal>
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
      <ProductListEditable
        productIds={products}
        show={show}
        handleFormToggle={handleFormToggle}
      />
      <Pagination
        totalItems={paginationInfo.totalItems}
        perPage={paginationInfo.perPage}
        page={page}
        handler={(p) => dispatch(setPage(p))}
      />
    </div>
  );
};

export default MyProductsPage;
