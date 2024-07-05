import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
// import './index.css'


// const rootNode = document.getElementById('app');
// const root = ReactDOM.createRoot(rootNode);

// const heading = React.createElement("h1", {}, "Hello, World!");
// root.render(heading);


ReactDOM.createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)