import React from 'react';
import { BrowserRouter, Routes } from 'react-router-dom';
import ProductPageRoute from './routes/ProductPageRoute';
import st from './app.module.css';

const App = () => (
  <div className={`App ${st.app}`}>
    <BrowserRouter>
      <Routes>{ProductPageRoute()}</Routes>
    </BrowserRouter>
  </div>
);

export default App;
