// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  // Beim Mounten: User laden, z.B. von /api/user
  useEffect(() => {
    axios.get('/api/user').then(res => setUser(res.data))
  }, [])

  async function login(email, password, company) {
    const res = await axios.post('/api/login', { email, password, company })
    setUser(res.data)
    return res
  }

  async function register(form) {
    const res = await axios.post('/api/register', form)
    setUser(res.data)
    return res
  }

  // Profil-Setup abschließen
  async function completeProfile(profileData) {
    const res = await axios.post('/api/user/profile', profileData)
    setUser(res.data)
    return res
  }

  return (
    <AuthContext.Provider value={{ user, login, register, completeProfile }}>
      {children}
    </AuthContext.Provider>
  )
}
