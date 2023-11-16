import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import Login from './components/loginComponent.js'
import SignUp from './components/signupComponent.js';
import Home from './components/homeComponent.js'
import Layout from './components/layoutComponent.js'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={ isAuthenticated ? (
              <Layout>
                <Route path="/home" element={<Home />} />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export default App;