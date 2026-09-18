import React from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/lalezar/400.css'
import '@fontsource/alexandria/400.css'
import '@fontsource/alexandria/600.css'
import '@fontsource/aref-ruqaa/400.css'
import App from './App.jsx'
import './styles.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
