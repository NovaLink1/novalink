// src/components/PrivateRoute.jsx
import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export default function PrivateRoute({ children }) {
  const { user, loading } = useContext(AuthContext)
  const location = useLocation()

  // Noch beim Laden: Lade-Indicator
  if (loading) {
    return <div className="p-8 text-center">Lädt…</div>
  }

  // Nicht eingeloggt → zur Anmeldung
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // Profil noch nicht eingerichtet und nicht schon auf profile-setup → dorthin navigieren
  if (!user.display_name && location.pathname !== '/profile-setup') {
    return <Navigate to="/profile-setup" replace />
  }

  // Alles gut → geschützte Komponente rendern
  return children
}
