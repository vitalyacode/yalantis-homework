import axios from 'axios';
import { PER_PAGE } from '../utils/constants';

const productClient = axios.create({
  baseURL: 'https://yalantis-react-school-api.yalantis.com/api/v1/products?',
});

const getPage = async (page) => {
  const response = await productClient.get(`page=${page}&perPage=${PER_PAGE}`);
  return response.data;
};
const getTotalItems = async () => {
  const response = await productClient.get('page=1&perPage=1');
  return response.data.totalItems;
};

const productService = {
  getPage,
  getTotalItems,
};

export default productService;
