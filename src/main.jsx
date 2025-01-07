import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Coordination from './page/Coordination/index.jsx';
import Login from './page/Login/index.jsx';
import Header from './components/Header/index.jsx';
import Footer from './components/Footer/index.jsx';
import './style/main.scss';


const Teacher = React.lazy(() => import('./page/Teacher/index.jsx'));
const Parent = React.lazy(() => import('./page/Parent/index.jsx'));

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Coordenacao/*" element={<Coordination />} />
        <Route path="/Professor/*" element={<Teacher />} />
        <Route path="/Responsavel/*" element={<Parent />} />
      </Routes>
      <Footer />
    </>
  );
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
