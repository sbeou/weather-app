import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/globalcss.scss'
import Header from './components/Header';
import Form from './components/Form';
import { Provider } from 'react-redux';
import store from './utils/store';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path='/' element={<Form />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  </Provider> 
);

