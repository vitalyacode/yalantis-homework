import React from 'react';
import PropTypes from 'prop-types';
import ProductCard from '../ProductCard/index';

const ProductList = ({ productIds }) => productIds.map((id) => <ProductCard productId={id} key={id} />);

ProductList.propTypes = {
  productIds: PropTypes.arrayOf(PropTypes.string),
};

export default ProductList;
