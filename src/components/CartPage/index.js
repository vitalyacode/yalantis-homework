import React from 'react';
import st from './index.module.css';
import { useProductState } from '../../providers/ProductProvider';
import ProductCardExtendedQuantity from '../ProductCard/ProductCardExtendedQuantity';

const CartPage = () => {
  const { products } = useProductState();
  const price = products.reduce(
    (prev, curr) => prev + curr.price * curr.quantity,
    0
  );
  return (
    <div className={st.cartPageWrapper}>
      {products.map((p) => (
        <ProductCardExtendedQuantity key={p.id} product={p} />
      ))}
      <h3 className={st.totalPrice}>Total price: {price}₴</h3>
    </div>
  );
};

export default CartPage;
