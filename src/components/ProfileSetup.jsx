// src/components/ProfileSetup.jsx
import { AuthContext } from '../context/AuthContext'
import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'





export default function ProfileSetup() {
  const { user, completeProfile, loading } = useContext(AuthContext)
  const [displayName, setDisplayName] = useState('')
  const [avatarFile, setAvatarFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [error, setError] = useState(null)
  const [busy, setBusy] = useState(false)
  const navigate = useNavigate()

  const ctx = useContext(AuthContext)
console.log('🔥 AuthContext liefert:', ctx)

  console.log('Context liefert:', { completeProfile, user, loading })

  // Sobald der User aus dem Context vorhanden ist, Felder vorbelegen
  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || '')
      setPreview(user.avatarUrl || null)
    }
  }, [user])

  // Drag & Drop Handler
  function handleDrop(e) {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      setAvatarFile(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  function handleDragOver(e) {
    e.preventDefault()
  }

  // Fallback für Klick → Dateiauswahl
  function handleFileSelect(e) {
    const file = e.target.files[0]
    if (file && file.type.startsWith('image/')) {
      setAvatarFile(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  // Formular-Abschicken
  async function handleSubmit(e) {
    e.preventDefault()
    setBusy(true)
    setError(null)

    try {
      let avatarUrl = user.avatarUrl

      // Wenn neues Bild ausgewählt, zuerst hochladen
      if (avatarFile) {
        const formData = new FormData()
        formData.append('file', avatarFile)
        const uploadRes = await axios.post('/auth/upload-avatar', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        avatarUrl = uploadRes.data.url
      }

      // Profil komplett speichern
      await completeProfile({ displayName, avatarUrl })
      navigate('/dashboard')
    } catch (err) {
      console.error(err)
      setError('Profil konnte nicht gespeichert werden.')
    } finally {
      setBusy(false)
    }
  }

  // Während wir den User laden
  if (loading) {
    return <div className="p-8 text-center">Lädt…</div>
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center">Profil einrichten</h2>

        {error && (
          <p className="text-red-600 text-center">{error}</p>
        )}

        <div>
          <label className="block text-sm font-medium mb-1">Anzeigename</label>
          <input
            type="text"
            value={displayName}
            onChange={e => setDisplayName(e.target.value)}
            required
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Profilbild (optional)
          </label>
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="border-2 border-dashed border-gray-300 rounded h-32 flex items-center justify-center cursor-pointer"
            onClick={() => document.getElementById('avatarInput').click()}
          >
            {preview ? (
              <img
                src={preview}
                alt="Vorschau"
                className="h-full object-contain"
              />
            ) : (
              <span className="text-gray-500">
                Bild hierhin ziehen oder klicken
              </span>
            )}
          </div>
          <input
            id="avatarInput"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileSelect}
          />
        </div>

        <button
          type="submit"
          disabled={busy}
          className={`w-full py-2 rounded text-white ${
            busy
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-primary hover:bg-primary/90'
          } transition-colors`}
        >
          {busy ? 'Speichern…' : 'Profil speichern'}
        </button>
      </form>
    </div>
  )
}
