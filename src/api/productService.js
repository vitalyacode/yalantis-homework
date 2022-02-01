import { PER_PAGE } from '../utils/constants';
import { makeError } from '../utils/makeError';
import { API_ROUTES } from './apiRoutes';
import { httpClient } from './client';

const getPage = async (page, parameters) => {
  // if perPage provided, gets it from parameters
  const params = { page, perPage: PER_PAGE, ...parameters };
  const response = await httpClient.get(API_ROUTES.PRODUCTS, { params });
  return response.data;
};

const getEditablePage = async (page, parameters) => {
  // if perPage provided, gets it from parameters
  const params = {
    page, editable: true, perPage: PER_PAGE, ...parameters,
  };
  const response = await httpClient.get(API_ROUTES.PRODUCTS, { params });
  return response.data;
};

const getById = async (id) => {
  const response = await httpClient.getAPI_ROUTES.PRODUCT_BY_ID(id);
  return response.data;
};

const postProduct = async (payload) => {
  try {
    const response = await httpClient.post(API_ROUTES.PRODUCTS, { product: payload });
    return response.data;
  } catch (err) {
    return makeError(err.response.data.error.message);
  }
};

const editProduct = async (payload) => {
  const response = await httpClient.patch(API_ROUTES.PRODUCT_BY_ID(payload.id), { product: payload.product });
  return response.data;
};

const productService = {
  getPage,
  getById,
  postProduct,
  getEditablePage,
  editProduct,
};

export default productService;
