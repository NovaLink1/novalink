import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [tokens, setTokens] = useState({ access: null, refresh: null })

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('auth'))
    if (saved) {
      setUser({ id: saved.userId })
      setTokens({ access: saved.access, refresh: saved.refresh })
      axios.defaults.headers.common['Authorization'] = `Bearer ${saved.access}`
    }
  }, [])

  const login = async (email, password, companyName) => {
    const response = await axios.post('/auth/login', {
      email,
      password,
      company_name: companyName
    })
    const { access_token, refresh_token } = response.data
    setTokens({ access: access_token, refresh: refresh_token })
    axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`
    const payload = JSON.parse(atob(access_token.split('.')[1]))
    setUser({ id: payload.sub })
    localStorage.setItem(
      'auth',
      JSON.stringify({
        userId: payload.sub,
        access: access_token,
        refresh: refresh_token
      })
    )
  }

  const logout = () => {
    setUser(null)
    setTokens({ access: null, refresh: null })
    delete axios.defaults.headers.common['Authorization']
    localStorage.removeItem('auth')
  }

  return (
    <AuthContext.Provider value={{ user, tokens, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
