import React from 'react';
import st from './index.module.css';
import Header from '../../components/Header/index';

const MainLayout = ({ children }) => (
  <div className={st.siteContainer}>
    <Header />
    <main className={st.mainContainer}>{children}</main>
  </div>
);

export default MainLayout;
