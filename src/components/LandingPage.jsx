// src/components/LandingPage.jsx
import React, { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export default function LandingPage() {
  const { login } = useContext(AuthContext)
  const navigate    = useNavigate()

  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [company, setCompany]   = useState('')
  const [error, setError]       = useState(null)
  const [busy, setBusy]         = useState(false)

  // Echte Login-Funktion aus dem Context
  const handleSubmit = async e => {
    e.preventDefault()
    setBusy(true)
    setError(null)

    try {
      // login gibt das User-Objekt zurück
      const user = await login(email, password, company)

      // je nach Profilstatus weiterleiten
      if (!user.displayName) {
        navigate('/profile-setup')
      } else {
        navigate('/dashboard')
      }
    } catch (err) {
      console.error(err)
      setError(
        err.response?.data?.detail ||
        'Login fehlgeschlagen: prüfe E-Mail, Passwort oder Firmenname'
      )
    } finally {
      setBusy(false)
    }
  }

  // Registrierung → eigene Seite
  const handleRegistration = e => {
    e.preventDefault()
    navigate('/register')
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="flex flex-wrap justify-between items-center bg-gray-100 shadow py-4 px-6">
        <Link to="/" className="flex items-center gap-4">
          <img src="/logo.png" alt="NovaLink Logo" className="h-12 w-auto" />
        </Link>

        {/* Inline-Login */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-wrap items-center gap-2 mt-4 md:mt-0 w-full md:w-auto"
        >
          <input
            type="email"
            placeholder="E-Mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            disabled={busy}
            className="w-full sm:w-48 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="password"
            placeholder="Passwort"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            disabled={busy}
            className="w-full sm:w-48 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="text"
            placeholder="Firmenname"
            value={company}
            onChange={e => setCompany(e.target.value)}
            required
            disabled={busy}
            className="w-full sm:w-48 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            disabled={busy}
            className={`px-5 py-2 rounded text-white ${
              busy ? 'bg-gray-400' : 'bg-primary hover:bg-primary/90'
            } transition-colors`}
          >
            {busy ? 'Bitte warten…' : 'Login'}
          </button>
          <button
            type="button"
            onClick={handleRegistration}
            className="ml-auto text-sm text-primary hover:underline"
          >
            Registrierung
          </button>
        </form>

        {error && (
          <p className="w-full mt-2 text-sm text-red-600 text-center">{error}</p>
        )}
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center flex-grow p-8 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
          Willkommen bei <span className="text-primary">NovaLink</span>
        </h2>
        <p className="mb-8 text-gray-700 max-w-lg">
          Deine Lösung für smarte Leadverwaltung und Business-Optimierung.
        </p>
        <div className="flex flex-col md:flex-row gap-4">
          <Link
            to="/store"
            className="px-8 py-3 bg-primary text-white rounded hover:bg-primary/90 transition-colors"
          >
            App Store
          </Link>
          <Link
            to="/contact"
            className="px-8 py-3 bg-secondary text-white rounded hover:bg-secondary/90 transition-colors"
          >
            Kontakt
          </Link>
        </div>
      </main>
    </div>
  )
}
