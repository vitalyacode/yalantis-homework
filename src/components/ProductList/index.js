import React from 'react';
import PropTypes from 'prop-types';
import ProductCard from '../ProductCard/index';
import types from '../../PropTypes/defaultProduct';

const ProductList = ({ products }) => products.map((p) => <ProductCard product={p} key={p.id} />);

ProductList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape(types)),
};

export default ProductList;
