import React from 'react';
import PropTypes from 'prop-types';
import st from './index.module.css';

const PriceFilter = ({ handlers, minPrice, maxPrice }) => (
  <div className={st.priceFilter}>
    <div className={st.inputWrapper}>
      <input
        type="text"
        min="1"
        step="1"
        value={minPrice}
        onChange={handlers.handleMinPrice}
        onBlur={handlers.validateRange}
        className={st.input}
      />
      <span className={st.textBetweenInputs}>to</span>
      <input
        type="text"
        min="1"
        step="1"
        value={maxPrice}
        onChange={handlers.handleMaxPrice}
        onBlur={handlers.validateRange}
        className={st.input}
      />
    </div>
  </div>
);

PriceFilter.propTypes = {
  handlers: PropTypes.shape(PropTypes.func.isRequired),
  minPrice: PropTypes.string,
  maxPrice: PropTypes.string,
};

export default PriceFilter;
