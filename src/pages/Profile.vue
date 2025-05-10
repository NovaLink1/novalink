<template>
  <div class="min-h-screen bg-white p-8">
    <div class="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 class="text-2xl font-semibold mb-6 text-nn-indigo">Profil bearbeiten</h2>
      <form @submit.prevent="saveProfile" class="space-y-5">
        <!-- Name -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Name</label>
          <input
            v-model="user.name"
            type="text"
            placeholder="Dein Name"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-nn-indigo"
          />
        </div>
        <!-- Unternehmensname -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Unternehmensname</label>
          <input
            v-model="user.company"
            type="text"
            placeholder="Firma"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-nn-indigo"
          />
        </div>
        <!-- Position -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Position</label>
          <input
            v-model="user.position"
            type="text"
            placeholder="z.B. Produktmanager"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-nn-indigo"
          />
        </div>
        <!-- Freiwillige Angaben -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Biografie</label>
          <textarea
            v-model="user.bio"
            rows="3"
            placeholder="Erzähl ein wenig über dich"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-nn-indigo"
          ></textarea>
        </div>
        <!-- Speichern Button -->
        <div class="pt-4 flex justify-end">
          <button
            type="submit"
            class="px-5 py-2 bg-nn-indigo text-white font-semibold rounded-lg hover:bg-nn-neon-teal transition-colors duration-200"
          >
            Speichern
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import axios from 'axios'

const user = reactive({
  name: '',
  company: '',
  position: '',
  bio: ''
})

onMounted(async () => {
  try {
    const { data } = await axios.get('/user/profile')
    Object.assign(user, data)
  } catch (error) {
    console.error('Fehler beim Laden des Profils', error)
  }
})

async function saveProfile() {
  try {
    await axios.put('/user/profile', user)
    alert('Profil erfolgreich gespeichert')
  } catch (error) {
    alert('Fehler beim Speichern des Profils')
    console.error(error)
  }
}
</script>

<style scoped>
/* Alle Styles laufen über Tailwind */
</style>