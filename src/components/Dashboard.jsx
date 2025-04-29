// src/components/Dashboard.jsx
import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'

export default function Dashboard() {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  // Wenn Profil noch nicht komplett, dann zum Profil-Setup schieben
  useEffect(() => {
    if (user && !user.profileComplete) {
      navigate('/profile-setup', { replace: true })
    }
  }, [user, navigate])

  if (!user) {
    // Optional: Lade-Indikator, bis User aus dem Context geladen ist
    return <div className="p-8 text-center">Lädt…</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-4">
        Willkommen, {user.displayName || user.email}!
      </h1>
      <p className="mb-6 text-gray-700">
        Wähle unten, was du als Nächstes tun möchtest:
      </p>
      <div className="flex flex-wrap gap-4">
        <Link
          to="/store"
          className="px-6 py-3 bg-primary text-white rounded hover:bg-primary/90 transition"
        >
          Zum App Store
        </Link>
        <Link
          to="/my-apps"
          className="px-6 py-3 bg-secondary text-white rounded hover:bg-secondary/90 transition"
        >
          Meine Apps
        </Link>
      </div>
    </div>
  )
}
