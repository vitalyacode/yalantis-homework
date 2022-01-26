const ROUTE_PATHS = {
  HOME: '/products',
  PRODUCT: '/products/:id',
  CART: '/cart',
  MY_PRODUCTS: '/products/my',
  ORDER: '/orders/:id',
  MY_ORDERS: '/orders',
  PRODUCT_ID: (id) => `/products/${id}`,
  ORDER_ID: (id) => `/orders/${id}`,
};

export default ROUTE_PATHS;
