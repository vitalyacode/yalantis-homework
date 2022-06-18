import createApiRequestActions from './createApiRequestActions';

export const PER_PAGE = 25;
export const placeholder = 0; // unnecessary now

export const orderByIdActions = createApiRequestActions('FETCH_ORDER');
export const createOrderActions = createApiRequestActions('CREATE_ORDER');

export const options = [
  { value: 'europe', label: 'Europe' },
  { value: 'usa', label: 'USA' },
  { value: 'africa', label: 'Africa' },
  { value: 'asia', label: 'Asia' },
];

export const paginationOptions = [
  { value: 10, label: '10' },
  { value: 25, label: '25' },
  { value: 50, label: '50' },
];
