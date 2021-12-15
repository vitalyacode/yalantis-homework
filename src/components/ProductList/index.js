import React from 'react';
import ProductCard from '../ProductCard/index';

const ProductList = ({ products }) => products.map((p) => <ProductCard product={p} key={p.id} />);

export default ProductList;
