// src/components/Registration.jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export default function Registration() {
  const navigate = useNavigate()
  const { register } = useContext(AuthContext)
  const [form, setForm] = useState({ name:'', email:'', password:'', address:'' })
  const [error, setError] = useState(null)

  const handleChange = e => {
    setForm(prev=>({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await register(form)
      navigate('/store')
    } catch(err) {
      setError('Registrierung fehlgeschlagen')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg space-y-4">
        <h2 className="text-3xl font-bold text-center text-primary">Registrieren</h2>
        {error && <p className="text-red-600">{error}</p>}
        <input name="name"     placeholder="Name*"     onChange={handleChange} required className="w-full p-2 border rounded"/>
        <input name="email"    type="email" placeholder="E-Mail*"   onChange={handleChange} required className="w-full p-2 border rounded"/>
        <input name="password" type="password" placeholder="Passwort*" onChange={handleChange} required className="w-full p-2 border rounded"/>
        <input name="address"  placeholder="Adresse*"  onChange={handleChange} required className="w-full p-2 border rounded"/>
        <button type="submit" className="w-full py-2 bg-primary text-white rounded hover:bg-primary/90">
          Registrieren
        </button>
      </form>
    </div>
  )
}
