<template>
  <div class="min-h-screen flex flex-col bg-white text-nn-darkgray font-sans">
    <!-- Header -->
    <header class="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-200">
       <!-- Logo & Title -->
       <div class="flex items-center space-x-4">
        <span class="text-3xl sm:text-5xl font-bold text-nn-indigo">
          NovaNite Technologies
        </span>
      </div>

      <!-- Login-Form rechts -->
      <div class="w-80 bg-white p-6 rounded-lg shadow-lg text-black">
        <h2 class="text-xl font-semibold mb-4 text-nn-indigo">Login</h2>
        <form @submit.prevent="onSubmit" class="space-y-4">
          <input
            v-model="form.email"
            type="email"
            placeholder="E-Mail"
            class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-nn-indigo outline-none"
            required
          />
          <input
            v-model="form.password"
            type="password"
            placeholder="Passwort"
            class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-nn-indigo outline-none"
            required
          />
          <button
            type="submit"
            class="w-full py-2 bg-nn-indigo text-white font-semibold rounded-lg transition-colors duration-200 hover:bg-nn-neon-teal"
          >
            Einloggen
          </button>
        </form>
        <p class="mt-3 text-sm text-gray-600 text-center">
          Noch kein Account?
          <router-link to="/register" class="text-nn-indigo hover:underline">
            Registriere dich hier
          </router-link>
        </p>
      </div>
    </header>

    <!-- Hero-Section -->
    <section class="flex-grow flex flex-col items-center justify-center text-center px-4 py-20 bg-white">
      <p class="max-w-2xl text-lg mb-8">
        Willkommen bei NovaNite – deinem Partner für smartes, ortsunabhängiges Arbeiten.
      </p>
      <button
        class="px-8 py-3 border-2 border-nn-indigo text-nn-indigo font-medium rounded-lg transition-colors duration-200 hover:bg-nn-indigo hover:text-white"
      >
        Starte in 60 Sekunden
      </button>
    </section>

    <!-- weitere Sections … -->
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()
const form = reactive({ email: '', password: '' })

async function onSubmit() {
  try {
    const { data } = await axios.post('/auth/login', form)
    localStorage.setItem('token', data.access_token)
    axios.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`
    router.push('/userprofile')
  } catch {
    alert('Login fehlgeschlagen')
  }
}
</script>

<style scoped>
/* Alles läuft über Tailwind */
</style>