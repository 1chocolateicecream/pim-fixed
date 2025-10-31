import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { App2 } from './App';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App2 />
  </StrictMode>,
)
