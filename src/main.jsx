import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Login from './page/Login/index.jsx';
import Header from './components/Header/index.jsx'
import Footer from './components/Footer/index.jsx'
import "./style/main.css"


const App = () => <div style={{
  display:"flex",
  flexDirection: "column",
  gap:"30px"
}}>
  <Header />
  <Login />
  <Footer />
</div>;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)