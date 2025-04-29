import React, { useState } from 'react'

export default function LandingPage() {
  const [showRegistration, setShowRegistration] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault()
    console.log('Login abgeschickt')
  }

  const handleRegistration = (e) => {
    e.preventDefault()
    console.log('Registrierung abgeschickt')
    setShowRegistration(false)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="flex flex-wrap justify-between items-center bg-gray-100 shadow py-4 px-6">
        {/* Logo als Link zur Startseite */}
        <a href="/" className="flex items-center gap-4">
          <img
            src="/logo.png"
            alt="NovaLink Logo"
            className="h-12 w-auto"
          />
        </a>

        {/* Login-Formular */}
        <form
          onSubmit={handleLogin}
          className="flex flex-wrap items-center gap-2 mt-4 md:mt-0 w-full md:w-auto"
        >
          <input
            type="email"
            placeholder="E-Mail"
            required
            className="w-full sm:w-48 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="password"
            placeholder="Passwort"
            required
            className="w-full sm:w-48 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="text"
            placeholder="Firmenname"
            required
            className="w-full sm:w-48 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            className="px-5 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors"
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setShowRegistration(true)}
            className="ml-auto text-sm text-primary hover:underline"
          >
            Registrierung
          </button>
        </form>
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
          <a
            href="#appstore"
            className="px-8 py-3 bg-primary text-white rounded hover:bg-primary/90 transition-colors"
          >
            App Store
          </a>
          <a
            href="#kontakt"
            className="px-8 py-3 bg-secondary text-white rounded hover:bg-secondary/90 transition-colors"
          >
            Kontakt
          </a>
        </div>
      </main>

      {/* Registrierungs-Popup */}
      {showRegistration && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
            <button
              onClick={() => setShowRegistration(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4 text-center text-primary">
              Registrierung
            </h2>
            <form onSubmit={handleRegistration} className="space-y-4">
              <input
                type="text"
                placeholder="Name*"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="email"
                placeholder="E-Mail*"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="text"
                placeholder="Adresse*"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="text"
                placeholder="Firmenname"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="text"
                placeholder="UID"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="w-full mt-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors"
              >
                Registrierung abschließen
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
