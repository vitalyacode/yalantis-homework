import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ErrorCard from '../../components/ErrorCard';
import OrderCard from '../../components/OrderCard';
import Preloader from '../../components/Preloader';
import {
  fetchOrderById, resetOrdersSlice, selectOrderById, selectOrdersStatus,
} from '../../store/ordersSlice';
import st from './index.module.css';

const SingleOrderPage = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const status = useSelector(selectOrdersStatus);
  const order = useSelector((state) => selectOrderById(state, id));

  useEffect(() => {
    if (status === 'idle' && !order) dispatch(fetchOrderById(id));

    return () => {
      dispatch(resetOrdersSlice());
    };
  }, []);

  if (status === 'error') return <ErrorCard />;
  if (status === 'loading' || status === 'idle') return <Preloader />;

  return (
    <div className={st.ordersContainer}>
      <OrderCard id={order.id} />
    </div>
  );
};

export default SingleOrderPage;
