import React from 'react';
import { useSelector } from 'react-redux';
import st from './index.module.css';
import ProductCardExtendedQuantity from '../ProductCard/ProductCardExtendedQuantity';
import { selectAllCartProducts, selectCartProductIds } from '../../store/cartSlice';

const CartPage = () => {
  const productIds = useSelector(selectCartProductIds);
  const products = useSelector(selectAllCartProducts);
  const price = products.reduce(
    (prev, curr) => prev + curr.price * curr.quantity,
    0
  );
  return (
    <div className={st.cartPageWrapper}>
      {productIds.map((p) => (
        <ProductCardExtendedQuantity key={p} productId={p} />
      ))}
      <h3 className={st.totalPrice}>Total price: {price}₴</h3>
    </div>
  );
};

export default CartPage;
