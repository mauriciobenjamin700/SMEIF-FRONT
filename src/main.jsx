import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Coordination from './page/Coordination/index.jsx';
import Teacher from './page/Teacher/index.jsx';
import Parent from './page/Parent/index.jsx';
import Login from './page/Login/index.jsx';
import Header from './components/Header/index.jsx';
import Footer from './components/Footer/index.jsx';
import './style/main.scss';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './services/redux/store.js';
import ProfilePage from './page/Profile.jsx';



const App = () => {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Header />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Coordenacao/*" element={<Coordination />} />
            <Route path="/Professor/*" element={<Teacher />} />
            <Route path="/Responsavel/*" element={<Parent />} />
            <Route path="Perfil/" element={<ProfilePage/>} />
          </Routes>
          <Footer />
        </PersistGate>
      </Provider>
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
