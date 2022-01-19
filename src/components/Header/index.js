import React from 'react';
import { Link } from 'react-router-dom';
import st from './index.module.css';
import Cart from './Cart/index';
import ROUTE_PATHS from '../../routes/routes';
import AddProduct from './AddProduct';

const Header = () => (
  <header className={st.headerStyle}>
    <div className={st.headerWrapper}>
      <h1 className={st.logo}>
        <Link to={ROUTE_PATHS.HOME}>VitalX</Link>
      </h1>
      <div className={st.actions}>
        <AddProduct />
        <Cart />
      </div>
    </div>
  </header>
);

export default Header;
