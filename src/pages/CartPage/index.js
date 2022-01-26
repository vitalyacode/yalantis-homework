import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import st from './index.module.css';
import ProductCardExtendedQuantity from '../../components/ProductCard/ProductCardExtendedQuantity';
import {
  postOrder,
  resetCartSlice,
  selectAllCartProducts,
  selectCartProductIds,
  selectCartStatus,
} from '../../store/cartSlice';
import ErrorCard from '../../components/ErrorCard';
import ROUTE_PATHS from '../../routes/routes';

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productIds = useSelector(selectCartProductIds);
  const products = useSelector(selectAllCartProducts);

  const status = useSelector(selectCartStatus);

  const price = products.reduce(
    (prev, curr) => prev + curr.price * curr.quantity,
    0
  );

  useEffect(() => () => dispatch(resetCartSlice()), []);

  const handleSubmit = () => {
    if (products.length) dispatch(postOrder(products));
  };

  if (status === 'success') {
    navigate(ROUTE_PATHS.MY_ORDERS);
  }
  if (status === 'error') return <ErrorCard />;

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
