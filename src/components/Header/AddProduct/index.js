import React, { useState } from 'react';
import AddProductForm from '../../Forms/AddProductForm';
import Modal from '../../Modal';
import st from './index.module.css';

const AddProduct = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  return (
    <div>
      <h1>
        <button className={st.addProductButton} onClick={() => setShow(true)}>
          Add product
        </button>
      </h1>
      <Modal
        show={show}
        onClose={handleClose}
        title="Add product"
      >
        <AddProductForm onClose={handleClose} />
      </Modal>
    </div>
  );
};

export default AddProduct;
