import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

// Import direct de chaque fichier CSS
import './index.css'
import './styles/components/sidebar.css'
import './styles/components/header.css'
import './styles/components/stats-card.css'
import './styles/pages/dashboard.css'
import './styles/pages/products.css'
import './styles/pages/orders.css'
import './styles/pages/order-detail.css'
import './styles/pages/customers.css'
import './styles/pages/login.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)