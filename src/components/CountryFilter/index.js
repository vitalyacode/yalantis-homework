import React from 'react';
import Select from 'react-select';

const CountryFilter = ({ options, handleCountryChange, selectedCountries }) => (
  <Select
    isMulti
    options={options}
    onChange={handleCountryChange}
    value={selectedCountries}
  />
);

export default CountryFilter;
