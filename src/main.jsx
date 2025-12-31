import React from 'react'
import ReactDOM from 'react-dom/client'
import Router from './components/Router.jsx'
import './index.css'

// NOTA: O tracking de PageView é gerenciado pelo Router.jsx
// para evitar duplicação em navegação SPA
// Não chamar initPageViewTracking() aqui

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
)

