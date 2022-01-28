import { useDebounce } from 'use-debounce';

const useDebouncedValues = (selectedCountries, minPrice, maxPrice, ms) => {
  const [debouncedCountries] = useDebounce(selectedCountries, ms);
  const [debouncedMinPrice] = useDebounce(minPrice, ms);
  const [debouncedMaxPrice] = useDebounce(maxPrice, ms);
  return [debouncedCountries, debouncedMinPrice, debouncedMaxPrice];
};

export default useDebouncedValues;
