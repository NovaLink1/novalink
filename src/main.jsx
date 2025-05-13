// src/main.jsx
import './assets/tailwind.css'
// (optional) eigene Ergänzungen
// import './index.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'


// axios-Grundsetup …

axios.defaults.baseURL = import.meta.env.VITE_API_URL || ''


const token = localStorage.getItem('token')
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

// Systembasierten Darkmode anwenden (wenn kein manuelles Theme gesetzt ist)
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)')

function applySystemTheme(e) {
  if (!localStorage.getItem('theme')) {
    document.documentElement.classList.toggle('dark', e.matches)
  }
}

applySystemTheme(systemPrefersDark)
systemPrefersDark.addEventListener('change', applySystemTheme)


const app = createApp(App)
app.use(router)
app.mount('#app')

