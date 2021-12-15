import axios from 'axios';
import { PER_PAGE } from '../utils/constants';

const productClient = axios.create({
  baseURL: 'https://yalantis-react-school-api.yalantis.com/api/v1',
});

const getPage = async (page) => {
  const response = await productClient.get(`products?page=${page}&perPage=${PER_PAGE}`);
  return response.data;
};

const getById = async (id) => {
  const response = await productClient.get(`products/${id}`);
  return response.data;
};

const productService = {
  getPage,
  getById,
};

export default productService;
