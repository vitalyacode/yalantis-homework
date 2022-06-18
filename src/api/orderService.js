import { API_ROUTES } from './apiRoutes';
import { httpClient } from './client';

const postOrder = async (payload) => {
  const requestObject = {
    order: {
      pieces: payload.map((product) => ({ productId: product.id, count: product.quantity })),
    },
  };
  const response = await httpClient.post(API_ROUTES.ORDERS, requestObject);
  return response.data;
};

const getById = async (id) => {
  const response = await httpClient.get(API_ROUTES.ORDER_BY_ID(id));
  return response.data;
};

const getAll = async () => {
  const response = await httpClient.get(API_ROUTES.ORDERS);
  return response.data;
};

const orderService = {
  postOrder,
  getById,
  getAll,
};

export default orderService;
