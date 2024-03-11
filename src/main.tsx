import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { store } from './redux/store';
import { routs } from './routers';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {routs.map(({ path, component }) => (
            <Route key={path} path={path} Component={component} />
          ))}
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
