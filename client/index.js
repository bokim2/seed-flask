import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from "react-router-dom"

import styles from './stylesheets/styles.css';

// Create a root.
const root = ReactDOM.createRoot(document.getElementById('root'));
// Initial render
root.render(
    <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
    );


///////////////////////////////////////////
// import ReactDOM from 'react-dom';
// import * as ReactDOMClient from 'react-dom/client';
// import React, { Component } from 'react';
// import { App } from './App.jsx';

// const container = document.getElementById('root');
// import styles from './stylesheets/styles.css';
// // Create a root.
// const root = ReactDOMClient.createRoot(container);
// // Initial render
// root.render(<App />);


////////////////////////////////////////////////////

