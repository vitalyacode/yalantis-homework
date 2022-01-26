import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ROUTE_PATHS from '../../routes/routes';
import { selectOrderById } from '../../store/ordersSlice';
import ProductCardOrder from '../ProductCard/ProductCardOrder';
import st from './index.module.css';

const OrderCard = ({ id, isList }) => {
  const order = useSelector((state) => selectOrderById(state, id));

  const price = order.pieces.reduce(
    (prev, curr) => prev + curr.product.price * curr.count,
    0
  );
  return (
    <div className={`${st.orderContainer} ${isList ? st.border : ''}`}>
      <h2><Link to={ROUTE_PATHS.ORDER_ID(order.id)}>Order id: {order.id}</Link></h2>
      {order.pieces.map((product) => <ProductCardOrder product={product} key={product.id} />)}
      <h2 className={st.total}>Total: <span>{price}₴</span></h2>
    </div>
  );
};

export default OrderCard;
