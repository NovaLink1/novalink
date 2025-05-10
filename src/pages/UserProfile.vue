<template>
    <div class="min-h-screen bg-gray-100">
      <!-- Header Bereich -->
      <div class="relative h-64 bg-nn-indigo">
        <div class="absolute bottom-0 left-0 p-6 text-white">
          <h1 class="text-3xl font-bold">Profilübersicht</h1>
        </div>
        <!-- Avatar-Platzhalter -->
        <div class="absolute left-1/2 transform -translate-x-1/2 -bottom-20">
          <div
            class="h-40 w-40 rounded-full bg-gray-300 border-4 border-white flex items-center justify-center text-4xl text-white font-semibold"
          >
            {{ user.name ? user.name.charAt(0).toUpperCase() : '?' }}
          </div>
        </div>
      </div>
  
      <!-- Name -->
      <div class="mt-24 text-center">
        <h2 class="text-2xl font-semibold text-nn-indigo">{{ user.name || 'Nutzername' }}</h2>
      </div>
  
      <!-- Profil-Details -->
      <div class="mt-6 max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg space-y-6">
        <!-- Kontaktdaten & Position -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <h3 class="text-sm font-medium text-gray-500 uppercase">Position</h3>
            <p class="text-gray-800">{{ user.position || 'nicht angegeben' }}</p>
          </div>
          <div>
            <h3 class="text-sm font-medium text-gray-500 uppercase">Unternehmen</h3>
            <p class="text-gray-800">{{ user.company || 'nicht angegeben' }}</p>
          </div>
          <div>
            <h3 class="text-sm font-medium text-gray-500 uppercase">Wohnort</h3>
            <p class="text-gray-800">{{ user.location || 'nicht angegeben' }}</p>
          </div>
          <div>
            <h3 class="text-sm font-medium text-gray-500 uppercase">Geburtstag</h3>
            <p class="text-gray-800">{{ user.birthday || 'nicht angegeben' }}</p>
          </div>
        </div>
  
        <!-- Über mich -->
        <div>
          <h3 class="text-sm font-medium text-gray-500 uppercase mb-2">Über mich</h3>
          <p class="text-gray-700 leading-relaxed">{{ user.bio || 'Keine Biografie vorhanden.' }}</p>
        </div>
  
        <!-- Action-Buttons -->
        <div class="flex justify-end">
          <button
            @click="goToEdit"
            class="px-4 py-2 bg-nn-indigo text-white rounded-lg hover:bg-nn-neon-teal transition"
          >
            Profil bearbeiten
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import axios from 'axios'
  
  const router = useRouter()
  const user = ref({
    name: '',
    position: '',
    company: '',
    location: '',
    bio: '',
    birthday: ''
  })
  
  onMounted(async () => {
    try {
      const { data } = await axios.get('/users/profile')
      user.value = data
    } catch (e) {
      if (!(e.response && e.response.status === 404)) console.error('Profil-Ladefehler:', e)
    }
  })
  
  function goToEdit() {
    router.push({ name: 'EditProfile' })
  }
  </script>
  
  <style scoped>
  /* Styling via Tailwind */
  </style>
  