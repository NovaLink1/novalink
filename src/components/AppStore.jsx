// src/components/AppStore.jsx
import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export default function AppStore() {
  const [apps, setApps] = useState([])
  const { user, refreshUser } = useContext(AuthContext)

  useEffect(() => {
    fetch('/api/apps')
      .then(r=>r.json())
      .then(setApps)
  }, [])

  async function buy(appId) {
    await fetch(`/api/purchase/${appId}`, { method: 'POST' })
    await refreshUser()
  }

  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
      {apps.map(a => (
        <div key={a.id} className="flex flex-col bg-white p-6 rounded-lg shadow">
          <img src={a.icon} alt={a.name} className="h-24 mb-4" />
          <h3 className="font-bold text-lg">{a.name}</h3>
          <p className="flex-grow text-gray-700">{a.description}</p>
          <button
            disabled={user.purchased.includes(a.id)}
            onClick={()=>buy(a.id)}
            className="mt-4 px-4 py-2 bg-primary text-white rounded disabled:opacity-50"
          >
            {user.purchased.includes(a.id) ? 'Gekauft' : `€${a.price} kaufen`}
          </button>
        </div>
      ))}
    </div>
  )
}
