import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { StockContextProvider } from './context/stockContext.jsx'
import { UserAuthContextProvider } from './context/userAuthContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
        <BrowserRouter>
            <UserAuthContextProvider>
                <StockContextProvider>
                    <App />
                </StockContextProvider>
            </UserAuthContextProvider>
        </BrowserRouter>
  </StrictMode>,
)
