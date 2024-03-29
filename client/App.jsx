
import { BrowserRouter, useNavigate } from "react-router-dom";
import { Route, Routes, Link } from "react-router-dom"
import React from 'react';

// import {createRoot} from 'react-dom/client';
// import ReactDOM from 'react-dom';
import Home from './routes/Home';
import Sample from "./routes/Sample";
import { FlasksContextProvider } from "./context/FlasksContext";
import Data from "./routes/Data";

// import './stylesheets/styles.css';

function App() {
  return (
  
    <FlasksContextProvider>
      <nav className="navbar navbar-expand-lg navbar-light bg-light ">
        <ul className="navbar-nav float-end">
          <li className="nav-link"><Link to="/">Home</Link></li>
          {/* <li className="nav-link"><Link to="/sample">Sample</Link></li> */}
          <li className="nav-link"><Link to="/data">Data</Link></li>
        </ul>
      </nav>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<Sample />} />
        <Route path="/data" element={<Data />} />
      </Routes>
    </FlasksContextProvider>
    

  )
}

export default App;
///////////////////////////////////////////////////////
