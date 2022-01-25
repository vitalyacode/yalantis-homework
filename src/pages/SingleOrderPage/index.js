import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ErrorCard from '../../components/ErrorCard';
import OrderCard from '../../components/OrderCard';
import Preloader from '../../components/Preloader';
import { fetchOrder, selectOrderById, selectOrdersStatus } from '../../store/ordersSlice';
import st from './index.module.css';

const OrderPage = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const status = useSelector(selectOrdersStatus);
  const order = useSelector((state) => selectOrderById(state, id));

  useEffect(() => {
    if (status === 'idle') dispatch(fetchOrder(id));
  }, []);

  if (status === 'error') return <ErrorCard />;
  if (status === 'loading' || status === 'idle') return <Preloader />;

  return (
    <div className={st.ordersContainer}>
      <OrderCard order={order} />
    </div>
  );
};

export default OrderPage;
