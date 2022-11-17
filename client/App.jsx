
import { Route, Routes, Link } from "react-router-dom"
import React from 'react';
// import {createRoot} from 'react-dom/client';
// import ReactDOM from 'react-dom';
import Home from './routes/Home';
import Sample from "./routes/Sample";
import { FlasksContextProvider } from "./context/FlasksContext";

// import './stylesheets/styles.css';

function App() {
  return (
    <>
    <FlasksContextProvider>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-nav mr-auto"><Link to="/">Home</Link></li>
          <li><Link to="/sample">Sample</Link></li>
          <li><Link to="/data">Data</Link></li>
        </ul>
      </nav>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<Sample />} />
      </Routes>
    </FlasksContextProvider>
    
  </>
  )
}

export default App;
///////////////////////////////////////////////////////
