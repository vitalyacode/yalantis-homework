import React from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import st from './index.module.css';

const Modal = ({
  children, show, onClose, title,
}) => {
  if (!show) return null;

  const titleContent = title || 'Please provide \'title\' prop';

  return createPortal(
    <div className={st.modal} onClick={onClose}>
      <div className={st.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={st.modalHeader}>
          <h2 className={st.modalTitle}>{titleContent}</h2>
        </div>
        <div className={st.modalBody}>
          {children}
        </div>
        <div className={st.modalFooter}>
          <button className={st.modalCloseButton} onClick={onClose}>Close</button>
        </div>
      </div>
    </div>,
    document.querySelector('#root')
  );
};

Modal.propTypes = {
  children: PropTypes.element,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
};

export default Modal;
