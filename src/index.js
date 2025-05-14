import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css'; // if you're using this

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
