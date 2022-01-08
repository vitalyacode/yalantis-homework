import React from 'react';
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
      />
      <span className={st.textBetweenInputs}>to</span>
      <input
        type="text"
        min="1"
        step="1"
        value={maxPrice}
        onChange={handlers.handleMaxPrice}
        onBlur={handlers.validateRange}
      />
    </div>
  </div>
);

export default PriceFilter;
