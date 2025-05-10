<template>
  <header class="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-200">
    <img src="/Logo NN.png" alt="NovaLink Logo" class="h-8" />

    <div class="w-80 bg-white p-6 rounded-xl shadow-lg">
      <h2 class="text-2xl font-semibold mb-4 text-nn-indigo">Login</h2>
      <form @submit.prevent="onSubmit" class="space-y-4">
        <input v-model="form.email" type="email" placeholder="E-Mail"
               class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-nn-indigo outline-none" required />
        <input v-model="form.password" type="password" placeholder="Passwort"
               class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-nn-indigo outline-none" required />
        <button type="submit"
                class="w-full py-2 bg-nn-indigo text-white font-medium rounded-lg hover:bg-nn-indigo/90 transition">
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
