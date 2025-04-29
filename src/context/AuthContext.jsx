// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Beim Start: falls schon ein Token da ist, User laden
    const token = localStorage.getItem('token')
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
      axios.get('/auth/me')
        .then(res => setUser(res.data))
        .catch(() => {
          localStorage.removeItem('token')
          delete axios.defaults.headers.common.Authorization
        })
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  // Login-Funktion: holt Token, dann holt User und gibt ihn zurück
  async function login(email, password, company) {
    // 1) Login-Request
    const loginRes = await axios.post('/auth/login', { email, password, company })
    const token    = loginRes.data.access_token

    // 2) Token speichern
    localStorage.setItem('token', token)
    axios.defaults.headers.common.Authorization = `Bearer ${token}`

    // 3) aktuellen User abfragen
    const userRes = await axios.get('/auth/me')
    const userObj = userRes.data

    // 4) in State setzen
    setUser(userObj)

    // 5) und User weitergeben
    return userObj
  }

  // Registration analog: Token + User holen
  async function register(form) {
    const regRes = await axios.post('/auth/register', form)
    const token  = regRes.data.access_token

    localStorage.setItem('token', token)
    axios.defaults.headers.common.Authorization = `Bearer ${token}`

    const userRes = await axios.get('/auth/me')
    const userObj = userRes.data

    setUser(userObj)
    return userObj
  }

  // Profil-Setup abschließen
  async function completeProfile(profileData) {
    const res = await axios.post('/auth/profile', profileData)
    setUser(res.data)
    return res.data
  }

  function logout() {
    localStorage.removeItem('token')
    delete axios.defaults.headers.common.Authorization
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, completeProfile, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}
