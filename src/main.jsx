import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './page/Login/index.jsx';
import Coordenacao from './page/Coordenacao/index.jsx';
import Header from './components/Header/index.jsx'
import Footer from './components/Footer/index.jsx'
import "./style/main.scss"


const App = () => 
<Router>
  <Header />
  <Routes>
    <Route path='/' element={<Login />} />
    <Route path='/Coordenacao' element={<Coordenacao />} />
  </Routes>
  <Footer />
</Router>;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <App />
    
  </StrictMode>
)