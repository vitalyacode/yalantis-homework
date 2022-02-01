import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import st from './index.module.css';
import productService from '../../../api/productService';
import formStyles from '../formStyles.module.css';
import { editProduct } from '../../../store/productsSlice';
import { options } from '../../../utils/constants';
import { productSchema } from '../../../.yup/productSchema';
import Form from '../Form/Form';

const EditProductForm = ({
  initialObject: {
    name, origin, price, id,
  }, onClose,
}) => {
  const dispatch = useDispatch();

  const [submitMessage, setSubmitMessage] = useState('');
  const [submitError, setSubmitError] = useState(false);
  const [formDisabled, setFormDisabled] = useState(false);

  const defaultValues = { // additional object for better code readibility
    name,
    price,
    origin,
  };

  const {
    register, control, handleSubmit, formState: { errors, isDirty }, reset,
  } = useForm({
    defaultValues,
    resolver: yupResolver(productSchema),
  });

  const onSubmit = async (data) => {
    setFormDisabled(true);

    const updateObj = { product: data, id };
    const response = await productService.editProduct(updateObj);
    if (response?.isError) {
      setSubmitError(true);
      if (response.message.includes('Duplicate key value violates unique constraint')) {
        setSubmitMessage('Product with a given name already exists.');
      } else {
        setSubmitMessage('Unknown error.');
      }
    } else {
      dispatch(editProduct(updateObj));
      setSubmitError(false);
      setSubmitMessage('Product edited successfully');
      onClose();
    }
    setFormDisabled(false);
  };

  return (
    <Form
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      formDisabled={formDisabled}
      errors={errors}
      register={register}
      control={control}
      options={options}
      submitError={submitError}
      submitMessage={submitMessage}
    >
      <div className={st.formActions}>
        <button
          type="button"
          onClick={() => reset()}
          className={`${formStyles.formButton} ${formStyles.clearButton}`}
          disabled={!isDirty}
        >Clear</button>
        <button
          type="submit"
          className={`${formStyles.formButton} ${formStyles.editButton}`}
          disabled={!isDirty}
        >Edit</button>
      </div>
    </Form>
  );
};

export default EditProductForm;
