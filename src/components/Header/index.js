import React from 'react';
import { Link } from 'react-router-dom';
import st from './index.module.css';
import Cart from './Cart/index';

const Header = () => (
  <header className={st.headerStyle}>
    <div className={st.headerWrapper}>
      <h1 className={st.logo}>
        <Link to="/products">VitalX</Link>
      </h1>
      <Cart />
    </div>
  </header>
);

export default Header;
