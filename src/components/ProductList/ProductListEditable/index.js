import React from 'react';
import PropTypes from 'prop-types';
import ProductCardEditable from '../../ProductCard/ProductCardEditable';

const ProductListEditable = ({ productIds, handleFormToggle }) => productIds.map(
  (id) => <ProductCardEditable productId={id} key={id} handleFormToggle={handleFormToggle} />
);

ProductListEditable.propTypes = {
  productIds: PropTypes.arrayOf(PropTypes.string),
};

export default ProductListEditable;
