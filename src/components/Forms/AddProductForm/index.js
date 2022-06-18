import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import productService from '../../../api/productService';
import { options } from '../../../utils/constants';
import { productSchema } from '../../../.yup/productSchema';
import Form from '../Form/Form';

const AddProductForm = ({ onClose }) => {
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitError, setSubmitError] = useState(false);
  const [formDisabled, setFormDisabled] = useState(false);

  const {
    register, control, handleSubmit, formState: { errors },
  } = useForm({
    resolver: yupResolver(productSchema),
  });

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
      setTimeout(onClose, 1000);
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
      <input type="submit" />
    </Form>
  );
};

AddProductForm.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default AddProductForm;
