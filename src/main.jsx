import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

const App = () => <h1>Front Rodando!</h1>;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)