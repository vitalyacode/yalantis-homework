import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import productService from '../../api/productService';
import ProductCard from '../ProductCard/index';

const ProductInfo = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await productService.getById(id);
      setProduct(response);
    })();
  }, []);
  if (!product) return 'loading...';
  return (
    <ProductCard product={product}/>
  );
};

export default ProductInfo;
