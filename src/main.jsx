// src/main.jsx
import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import axios from 'axios'
import App from './App'

// Prod: /api → nginx → FastAPI
// Dev:  /api → vite.config.js → 127.0.0.1:8000
axios.defaults.baseURL = import.meta.env.PROD ? '/' : '/';

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
