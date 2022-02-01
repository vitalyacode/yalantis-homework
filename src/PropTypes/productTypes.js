import PropTypes from 'prop-types';

export const defaultProduct = {
  isEditable: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  origin: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
};

export const defaultEditProductForm = {
  name: PropTypes.string,
  origin: PropTypes.string,
  price: PropTypes.number,
  id: PropTypes.string,
};
