// src/main.jsx
import './index.css'           // ← ganz oben
import React from 'react'
import ReactDOM from 'react-dom/client'
import axios from 'axios'       // ← diesen Import hinzufügen
import App from './App'

// optional: Basis-URL einstellen
axios.defaults.baseURL = 'http://127.0.0.1:8000'



const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
