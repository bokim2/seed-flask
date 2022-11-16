import ReactDOM from 'react-dom';
import * as ReactDOMClient from 'react-dom/client';
import React, { Component } from 'react';
import { App } from './components/App.jsx';

const container = document.getElementById('root');
import styles from './stylesheets/styles.css';

// Create a root.
const root = ReactDOMClient.createRoot(container);
// Initial render
root.render(<App />);


//   render (
//       <App />,
//      document.getElementById('root')
//   );



