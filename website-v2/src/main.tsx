import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './design/tokens.css'
import './design/base.css'
import './design/components.css'
import './design/home.css'
import './design/pages.css'
import './b/b.css'
import './b/pages.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
