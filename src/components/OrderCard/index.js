import React from 'react';
import ProductCardOrder from '../ProductCard/ProductCardOrder';
import st from './index.module.css';

const OrderCard = ({ order }) => {
  const price = order.pieces.reduce(
    (prev, curr) => prev + curr.product.price * curr.count,
    0
  );
  return (
    <div className={st.orderContainer}>
      <h2>Order id: {order.id}</h2>
      {order.pieces.map((product) => <ProductCardOrder product={product} key={product.id} />)}
      <h2 className={st.total}>Total: <span>{price}₴</span></h2>
    </div>
  );
};

export default OrderCard;
