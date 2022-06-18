import React from 'react';
import { Controller } from 'react-hook-form';
import Select from 'react-select';
import PropTypes from 'prop-types';
import st from './index.module.css';
import { optionType } from '../../../PropTypes/options';

const Form = ({
  handleSubmit,
  onSubmit,
  formDisabled,
  errors,
  register,
  control,
  options,
  submitError = 'Something went wrong',
  submitMessage = 'Success',
  children,
}) => (<form onSubmit={handleSubmit(onSubmit)}>
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
    {children}
  </fieldset>

</form>);

Form.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  formDisabled: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.shape(optionType)),
  submitError: PropTypes.bool,
  submitMessage: PropTypes.string,
  children: PropTypes.element,
};

export default Form;
