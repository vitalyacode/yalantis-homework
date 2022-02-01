import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { optionType } from '../../PropTypes/options';

const CountryFilter = ({ options, handleCountryChange, selectedCountries }) => (
  <Select
    isMulti
    options={options}
    onChange={handleCountryChange}
    value={selectedCountries}
  />
);

CountryFilter.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape(optionType)),
  handleCountryChange: PropTypes.func.isRequired,
  selectedCountries: PropTypes.arrayOf(PropTypes.shape(optionType)),
};

export default CountryFilter;
