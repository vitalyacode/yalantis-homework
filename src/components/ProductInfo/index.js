import React from 'react';
import { useParams } from 'react-router-dom';
import ProductCardExtended from '../ProductCard/ProductCardExtended/index';

const ProductInfo = () => {
  const { id } = useParams();

  return <ProductCardExtended productId={id} />;
};

export default ProductInfo;
