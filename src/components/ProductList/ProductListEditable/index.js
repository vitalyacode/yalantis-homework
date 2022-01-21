import React from 'react';
import PropTypes from 'prop-types';
import ProductCardEditable from '../../ProductCard/ProductCardEditable';

const ProductListEditable = ({ productIds, handleFormToggle }) => productIds.map(
  (p) => <ProductCardEditable productId={p} key={p} handleFormToggle={handleFormToggle} />
);

ProductListEditable.propTypes = {
  productIds: PropTypes.arrayOf(PropTypes.string),
};

export default ProductListEditable;
