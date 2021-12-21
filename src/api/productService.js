import axios from 'axios';
import { PER_PAGE } from '../utils/constants';

const httpClient = axios.create({
  baseURL: 'https://yalantis-react-school-api.yalantis.com/api/v1',
});

const getPage = async (page) => {
  const params = { page, perPage: PER_PAGE };
  const response = await httpClient.get('products', { params });
  return response.data;
};

const getById = async (id) => {
  const response = await httpClient.get(`products/${id}`);
  return response.data;
};

const productService = {
  getPage,
  getById,
};

export default productService;
