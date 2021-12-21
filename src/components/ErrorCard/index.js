import React from 'react';
import st from './index.module.css';

const ErrorCard = () => {
  const handleReload = () => {
    window.location.reload();
  };
  return (
    <div className={st.error}>
      <h1>Something went wrong</h1>
      <button onClick={handleReload}>Try Again</button>
    </div>
  );
};

export default ErrorCard;
