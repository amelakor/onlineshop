import React, { useEffect } from 'react';
import Orders from '../components/Orders';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../actions/orderActions';

export const OrdersScreen = () => {
  const dispatch = useDispatch();

  const ordersList = useSelector(state => state.ordersList);
  const { orders, loading, error } = ordersList;

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);
  return (
    <Orders title="Orders" orders={orders} error={error} loading={loading} />
  );
};
