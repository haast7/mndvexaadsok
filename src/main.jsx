import React from 'react'
import ReactDOM from 'react-dom/client'
import Router from './components/Router.jsx'
import './index.css'
import { initPageViewTracking } from './services/metaTracking'

// Inicializar tracking de PageView após o React carregar
initPageViewTracking();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
)

