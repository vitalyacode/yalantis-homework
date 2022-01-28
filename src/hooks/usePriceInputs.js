import { useState } from 'react';

const usePriceInputs = () => {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const regex = /^[0-9]*$/;

  const handleMinPrice = (e) => {
    if (regex.test(e.target.value)) setMinPrice(e.target.value);
  };
  const handleMaxPrice = (e) => {
    if (regex.test(e.target.value)) setMaxPrice(e.target.value);
  };

  const validateRange = () => {
    if (parseInt(minPrice, 10) > parseInt(maxPrice, 10) && maxPrice.length) setMaxPrice(minPrice);
  };

  return {
    minPrice, handleMinPrice, maxPrice, handleMaxPrice, validateRange, setMinPrice, setMaxPrice,
  };
};

export default usePriceInputs;
