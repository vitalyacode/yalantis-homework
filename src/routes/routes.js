const ROUTE_PATHS = {
  HOME: '/products',
  PRODUCT: '/products/:id',
  CART: '/cart',
  MY_PRODUCTS: '/products/my',
  PRODUCT_ID: (id) => `/products/${id}`,
};

export default ROUTE_PATHS;
