import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import productService from '../../api/productService';
import ErrorCard from '../ErrorCard';
import Preloader from '../Preloader';
import ProductCardExtended from '../ProductCard/ProductCardExtended/index';

const ProductInfo = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await productService.getById(id);
        setProduct(response);
      } catch (e) {
        setIsError(true);
      }
    })();
  }, []);
  if (isError) return <ErrorCard />;
  if (!product) return <Preloader />;
  return <ProductCardExtended product={product} />;
};

export default ProductInfo;
