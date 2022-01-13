import React from 'react';
import st from './index.module.css';

const Preloader = () => (
  <div className={st.wrapper}>
    <div className={st.profileMainLoader}>
      <div className={st.loader}>
        <svg className={st.circularLoader} viewBox="25 25 50 50">
          <circle
            className={st.loaderPath}
            cx="50"
            cy="50"
            r="20"
            fill="none"
            stroke="#70c542"
            strokeWidth="2"
          />
        </svg>
      </div>
    </div>
  </div>
);

export default Preloader;
