import React from 'react';
import Select from 'react-select';
import st from './index.module.css';

const PerPage = ({ options, handlePerPageChange, selectedPerPage }) => (
  <Select
    options={options}
    onChange={handlePerPageChange}
    value={selectedPerPage}
    className={st.perPage}
  />
);

export default PerPage;
