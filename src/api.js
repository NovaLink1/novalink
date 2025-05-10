// src/api.js
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL   // ⇒ https://novalink.at/api
})

export default api
