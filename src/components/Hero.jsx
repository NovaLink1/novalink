import React from 'react'
import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-400 to-indigo-600 text-white text-center p-8">
      <h1 className="text-5xl font-extrabold mb-4">
        Dein persönliches App-Universum
      </h1>
      <p className="mb-8 max-w-xl">
        Erstelle dein Konto, stöbere in unserem App Store 
        und lade dir die Tools herunter, die dein Business voranbringen.
      </p>
      <Link
        to="/register"
        className="px-8 py-4 bg-white text-indigo-800 font-semibold rounded-lg hover:shadow-lg transition"
      >
        Jetzt kostenlos registrieren
      </Link>
    </section>
  )
}
