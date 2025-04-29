// src/App.jsx
import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import PrivateRoute from './components/PrivateRoute'

import LandingPage    from './components/LandingPage'
import Login          from './components/Login'
import Registration   from './components/Registration'
import ProfileSetup   from './components/ProfileSetup'
import Dashboard      from './components/Dashboard'

// Lazy load feature modules
const AppStore = lazy(() => import('./components/AppStore'))
const MyApps   = lazy(() => import('./components/MyApps'))

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Suspense fallback={<div className="p-8 text-center">Lädt…</div>}>
          <Routes>
            <Route path="/" element={<LandingPage />} />

            <Route path="/register" element={<Registration />} />
            <Route path="/login"    element={<Login />} />

            <Route
              path="/profile-setup"
              element={
                <PrivateRoute>
                  <ProfileSetup />
                </PrivateRoute>
              }
            />

            <Route
              path="/store/*"
              element={
                <PrivateRoute>
                  <AppStore />
                </PrivateRoute>
              }
            />

            <Route
              path="/my-apps"
              element={
                <PrivateRoute>
                  <MyApps />
                </PrivateRoute>
              }
            />

            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  )
}
