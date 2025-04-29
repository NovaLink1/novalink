import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export default function Login() {
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [company, setCompany] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await login(email, password, company)
      navigate('/dashboard')
    } catch (err) {
      setError('Login fehlgeschlagen: prüfe E-Mail, Passwort oder Firmenname')
    }
  }
  
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-lg space-y-6"
      >
        <h2 className="text-3xl font-extrabold text-center text-primary">NovaLink</h2>
        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 p-2 rounded">
            {error}
          </p>
        )}
        <div className="space-y-4">
          <input
            type="email"
            placeholder="E-Mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="password"
            placeholder="Passwort"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="text"
            placeholder="Firmenname"
            value={company}
            onChange={e => setCompany(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-primary text-white font-medium rounded hover:bg-primary/90 transition-colors"
        >
          Login
        </button>
        <p className="text-center text-sm">
          Noch kein Konto?{' '}
          <a href="/register" className="text-primary hover:underline">
            Registrieren
          </a>
        </p>
      </form>
    </div>
  )
}
