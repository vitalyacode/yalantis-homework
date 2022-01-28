import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toSearchObject } from '../utils/toSearchObject';

const useParamsSetup = (
  options,
  paginationOptions,
  setSelectedCountries,
  setSelectedPerPage,
  setMinPrice,
  setMaxPrice
) => {
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const obj = toSearchObject(searchParams);
    if (obj?.origins) {
      setSelectedCountries(obj.origins.split(',').map((country) => options.find((option) => option.value === country)));
    } else setSelectedCountries([]);
    if (obj?.perPage) {
      setSelectedPerPage(paginationOptions.find((option) => option.value === parseInt(obj.perPage, 10)));
    }
    if (obj?.minPrice) {
      setMinPrice(obj.minPrice);
    }
    if (obj?.maxPrice) {
      setMaxPrice(obj.maxPrice);
    }
  }, []);
};

export default useParamsSetup;
