import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import productService from '../../api/productService';
import ProductCardExtended from '../ProductCard/ProductCardExtended/index';

const ProductInfo = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await productService.getById(id);
        setProduct(response);
      } catch (e) {
        setProduct('error');
      }
    })();
  }, []);
  if (!product) return 'loading...';
  if (product === 'error') return 'no connection';// to fix with notification
  return <ProductCardExtended product={product} />;
};

export default ProductInfo;
