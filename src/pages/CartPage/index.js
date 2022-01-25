import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import st from './index.module.css';
import ProductCardExtendedQuantity from '../../components/ProductCard/ProductCardExtendedQuantity';
import {
  postOrder,
  selectAllCartProducts,
  selectCartProductIds,
} from '../../store/cartSlice';

const CartPage = () => {
  const dispatch = useDispatch();

  const productIds = useSelector(selectCartProductIds);
  const products = useSelector(selectAllCartProducts);
  const price = products.reduce(
    (prev, curr) => prev + curr.price * curr.quantity,
    0
  );

  const handleSubmit = () => {
    if (products.length) dispatch(postOrder(products));
  };

  return (
    <div className={st.cartPageWrapper}>
      {productIds.map((p) => (
        <ProductCardExtendedQuantity key={p} productId={p} />
      ))}
      <h3 className={st.totalPrice}>Total price: {price}₴</h3>
      <button onClick={handleSubmit} className={st.submitOrder}>Submit order</button>
    </div>
  );
};

export default CartPage;
