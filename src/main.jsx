import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';

import Login from './page/Login/index.jsx';
import Coordination from './page/Coordination/index.jsx';
import Header from './components/Header/index.jsx'
import Footer from './components/Footer/index.jsx'
import "./style/main.scss"



const App = () => 
{
return(
<BrowserRouter>
  <Header/>
  <Routes>
    <Route path='/' element={<Login />} />
    <Route path='/Coordenacao/*' element={<Coordination />} />     
  </Routes>
  <Footer />
</BrowserRouter>
);
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <App />
    
  </StrictMode>
)