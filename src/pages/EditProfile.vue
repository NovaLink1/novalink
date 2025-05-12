<template>
    <div class="min-h-screen bg-gray-100 p-8">
      <div class="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 class="text-2xl font-bold mb-6">Profil bearbeiten</h1>
        <form @submit.prevent="saveProfile" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Name</label>
            <input
              v-model="form.name"
              type="text"
              placeholder="Name"
              class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nn-indigo outline-none"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Unternehmensname</label>
            <input
              v-model="form.company"
              type="text"
              placeholder="Unternehmen"
              class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nn-indigo outline-none"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Position</label>
            <input
              v-model="form.position"
              type="text"
              placeholder="Position"
              class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nn-indigo outline-none"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Wohnort</label>
            <input
              v-model="form.location"
              type="text"
              placeholder="Wohnort"
              class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nn-indigo outline-none"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Kurz-Biografie</label>
            <textarea
              v-model="form.bio"
              rows="3"
              placeholder="Über mich"
              class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nn-indigo outline-none"
            ></textarea>
          </div>
          <button
            type="submit"
            class="mt-4 w-full py-2 bg-nn-indigo text-white font-semibold rounded-lg transition-colors duration-200 hover:bg-nn-neon-teal"
          >
            Speichern
          </button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { reactive, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import api from '@/api.js'
  
  const router = useRouter()
  const form = reactive({
    name: '',
    company: '',
    position: '',
    location: '',
    bio: '',
    
  })
  
  onMounted(async () => {
    try {
      const { data } = await api.get('/users/profile')
      Object.assign(form, data)
    } catch (e) {
      if (!(e.response && e.response.status === 404)) 
        console.error('Fehler beim Laden der Profildaten', e)
    }
  })
  
  async function saveProfile() {
    try {
      // PUT statt POST
      await api.put('/users/profile', form)
      router.push({ name: 'UserProfile' })
    } catch (e) {
      console.error('Fehler beim Speichern des Profils', e)
    }
  }
  </script>
  
  <style scoped>
  /* Läuft über Tailwind */
  </style>
  