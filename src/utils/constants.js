import createApiRequestActions from './createApiRequestActions';

export const PER_PAGE = 25;
export const placeholder = 0; // unnecessary now

export const orderByIdActions = createApiRequestActions('FETCH_ORDER');
export const createOrderActions = createApiRequestActions('CREATE_ORDER');
