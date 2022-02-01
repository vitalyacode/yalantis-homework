import { httpClient } from './client';

const postOrder = async (payload) => {
  const requestObject = {
    order: {
      pieces: payload.map((product) => ({ productId: product.id, count: product.quantity })),
    },
  };
  const response = await httpClient.post('orders', requestObject);
  return response.data;
};

const getById = async (id) => {
  const response = await httpClient.get(`orders/${id}`);
  return response.data;
};

const getAll = async () => {
  const response = await httpClient.get('orders');
  return response.data;
};

const orderService = {
  postOrder,
  getById,
  getAll,
};

export default orderService;
