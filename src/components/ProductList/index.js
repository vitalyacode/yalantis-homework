import React from 'react';
import PropTypes from 'prop-types';
import ProductCard from '../ProductCard/index';

const ProductList = ({ productIds }) => productIds.map((p) => <ProductCard productId={p} key={p} />);

ProductList.propTypes = {
  productIds: PropTypes.arrayOf(PropTypes.string),
};

export default ProductList;
