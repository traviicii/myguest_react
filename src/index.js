import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import UserContextProvider from './Context/UserContext';
import GlobalContextProvider from './Context/GlobalContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <UserContextProvider>
      <GlobalContextProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </GlobalContextProvider>
    </UserContextProvider>
  </BrowserRouter>
);

