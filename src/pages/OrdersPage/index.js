import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ErrorCard from '../../components/ErrorCard';
import OrderCard from '../../components/OrderCard';
import Preloader from '../../components/Preloader';
import st from './index.module.css';
import {
  fetchOrders, resetOrdersSlice, selectOrderIds, selectOrdersStatus,
} from '../../store/ordersSlice';

const OrdersPage = () => {
  const dispatch = useDispatch();

  const status = useSelector(selectOrdersStatus);
  const orderIds = useSelector(selectOrderIds);

  useEffect(() => {
    dispatch(resetOrdersSlice());
  }, []);
  useEffect(() => {
    if (status === 'idle') dispatch(fetchOrders());
  }, [status]);

  if (status === 'error') return <ErrorCard />;
  if (status === 'loading' || status === 'idle') return <Preloader />;

  return (
    <div className={st.ordersContainer}>
      {orderIds.map((orderId) => <OrderCard id={orderId} key={orderId} isList={true} />)}
    </div >
  );
};

export default OrdersPage;
