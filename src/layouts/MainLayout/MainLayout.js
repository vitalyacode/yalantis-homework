import React from 'react';
import st from './index.module.css';
import Header from '../../components/Header/Header';

const MainLayout = ({ children }) => (
  <div className={st.siteContainer}>
    <Header />
    <main>{children}</main>
  </div>
);

export default MainLayout;
