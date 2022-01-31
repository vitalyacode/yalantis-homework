import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Select from 'react-select';
import st from './index.module.css';
import productService from '../../../api/productService';

const schema = yup.object({
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

const AddProductForm = () => {
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitError, setSubmitError] = useState(false);
  const [formDisabled, setFormDisabled] = useState(false);

  const {
    register, control, handleSubmit, formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const options = [ // get these values from backend
    { value: 'europe', label: 'Europe' },
    { value: 'usa', label: 'USA' },
    { value: 'africa', label: 'Africa' },
    { value: 'asia', label: 'Asia' },
  ];

  const onSubmit = async (data) => {
    setFormDisabled(true);
    const response = await productService.postProduct(data);
    if (response?.isError) {
      setSubmitError(true);
      if (response.message.includes('Duplicate key value violates unique constraint')) {
        setSubmitMessage('Product with a given name already exists.');
      } else {
        setSubmitMessage('Unknown error.');
      }
    } else {
      setSubmitError(false);
      setSubmitMessage('Product added successfully');
    }
    setFormDisabled(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset disabled={formDisabled} className={st.addProductFieldset}>
        <div className={st.inputLabelWrapper}>
          <label className={st.formLabel}>Name</label>
          <input className={st.formInput} {...register('name')} />
          <p className={st.errorMessage}>{errors.name?.message}</p>
        </div>
        <div className={st.inputLabelWrapper}>
          <label className={st.formLabel}>Price</label>
          <input type='number' className={st.formInput} {...register('price')} />
          <p className={st.errorMessage}>{errors.price?.message}</p>
        </div>
        <div className={st.inputLabelWrapper}>
          <label className={st.formLabel}>Origin</label>
          <Controller
            name='origin'
            control={control}
            render={({ field: { value, onChange, onBlur } }) => <Select
              options={options}
              onBlur={onBlur}
              onChange={(option) => {
                onChange(option.value);
              }}
              value={options.find((option) => value?.includes(option.value))}
            />

            }
          />
          <p className={st.errorMessage}>{errors.origin?.message}</p>
        </div>

        <p className={`${submitError ? st.submitError : st.submitSuccess} ${st.message}`}>{submitMessage}</p>

        <input type="submit" />
      </fieldset>

    </form>
  );
};

export default AddProductForm;
