// src/components/MyApps.jsx
import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Link } from 'react-router-dom'

export default function MyApps() {
  const { user } = useContext(AuthContext)

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Meine Apps</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {user.purchased.map(id => (
          <Link key={id} to={`/apps/${id}`} className="block bg-white p-6 rounded-lg shadow hover:shadow-lg">
            {/* Du kannst hier Icon + Name anhand der ID rendern */}
            <div className="text-primary font-semibold">App {id}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}
