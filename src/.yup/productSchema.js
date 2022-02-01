import * as yup from 'yup';

export const productSchema = yup.object({
  name: yup.string()
    .min(3, 'Name must have 3 or more characters')
    .max(20, 'Name must have 20 or less characters')
    .required('Name is required'),
  price: yup.number()
    .typeError('Price must be a number')
    .integer()
    .positive('Price must be greater than 0')
    .required('Price is required'),
  origin: yup.string().required('Origin is required'),
});