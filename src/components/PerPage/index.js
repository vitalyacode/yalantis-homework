import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import st from './index.module.css';
import { optionTypeNumber } from '../../PropTypes/options';

const PerPage = ({ options, handlePerPageChange, selectedPerPage }) => (
  <Select
    options={options}
    onChange={handlePerPageChange}
    value={selectedPerPage}
    className={st.perPage}
  />
);

PerPage.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape(optionTypeNumber)),
  handlePerPageChange: PropTypes.func.isRequired,
  selectedPerPage: PropTypes.shape(optionTypeNumber),
};

export default PerPage;
