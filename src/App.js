import React from 'react';
import { BrowserRouter, Routes } from 'react-router-dom';
import ProductListRoute from './routes/ProductListRoute';

const App = () => (
  <div className="App">
    <BrowserRouter>
      <Routes>{ProductListRoute()}</Routes>
    </BrowserRouter>
  </div>
);

export default App;
