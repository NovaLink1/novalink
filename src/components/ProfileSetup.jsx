// src/components/ProfileSetup.jsx
import React, { useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function ProfileSetup() {
  const { user, completeProfile } = useContext(AuthContext)
  const [form, setForm] = useState({ displayName: user.displayName || '', avatarUrl: user.avatarUrl || '' })
  const navigate = useNavigate()

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    await completeProfile(form)
    navigate('/dashboard')  // oder /store, je nach Flow
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm space-y-4">
        <h2 className="text-2xl font-bold">Profil einrichten</h2>
        <input name="displayName" value={form.displayName} onChange={handleChange}
               placeholder="Anzeigename" className="w-full p-2 border rounded" required />
        <input name="avatarUrl" value={form.avatarUrl} onChange={handleChange}
               placeholder="Avatar-URL" className="w-full p-2 border rounded" />
        <button type="submit"
                className="w-full py-2 bg-primary text-white rounded hover:bg-primary/90">
          Profil speichern
        </button>
      </form>
    </div>
  )
}
