import axios from 'axios';
import { PER_PAGE } from '../utils/constants';
import { makeError } from '../utils/makeError';

require('dotenv').config();

const httpClient = axios.create({
  baseURL: 'https://yalantis-react-school-api.yalantis.com/api/v1',
  headers: { Authorization: process.env.REACT_APP_API_KEY },
});

const getPage = async (page, parameters) => {
  // if perPage provided, gets it from parameters
  const params = { page, perPage: PER_PAGE, ...parameters };
  const response = await httpClient.get('products', { params });
  return response.data;
};

const getById = async (id) => {
  const response = await httpClient.get(`products/${id}`);
  return response.data;
};

const postProduct = async (payload) => {
  try {
    const response = await httpClient.post('products', { product: payload });
    return response.data;
  } catch (err) {
    return makeError(err.response.data.error.message);
  }
};

const productService = {
  getPage,
  getById,
  postProduct,
};

export default productService;
