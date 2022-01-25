import axios from 'axios';

require('dotenv').config();

const httpClient = axios.create({
  baseURL: 'https://yalantis-react-school-api.yalantis.com/api/v1',
  headers: { Authorization: process.env.REACT_APP_API_KEY },
});

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

const orderService = {
  postOrder,
  getById,
};

export default orderService;
