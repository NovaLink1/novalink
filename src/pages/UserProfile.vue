<template>
  <div class="min-h-screen bg-gray-100 relative">
    <!-- Header -->
    <div class="relative h-64 bg-nn-indigo">
      <div class="absolute bottom-0 left-0 p-6 text-white">
        <h1 class="text-3xl font-bold">Profilübersicht</h1>
      </div>
      <!-- Avatar -->
      <div class="absolute left-1/2 transform -translate-x-1/2 -bottom-20">
        <div
          class="h-40 w-40 rounded-full bg-gray-300 border-4 border-white flex items-center justify-center text-4xl text-white font-semibold"
        >
          {{ user.name ? user.name.charAt(0).toUpperCase() : '?' }}
        </div>
      </div>
    </div>

    <!-- Hauptlayout -->
    <div class="flex">
      <!-- Sidebar -->
      <aside
        :class="[
          'h-[calc(100vh-16rem)] bg-white shadow-lg p-4 transition-all duration-300 flex flex-col justify-between overflow-y-auto',
          collapsed ? 'w-20' : 'w-64'
        ]"
      >
        <!-- Toggle & App Buttons -->
        <div>
          <button
            @click="collapsed = !collapsed"
            class="mb-4 px-2 py-1 bg-nn-indigo text-white rounded w-full hover:bg-nn-neon-teal transition text-sm"
          >
            {{ collapsed ? '▶' : '◀ Sidebar' }}
          </button>

          <!-- Expandierte Sidebar -->
          <ul class="space-y-2" v-if="!collapsed">
            <li><button class="w-full text-left px-4 py-2 bg-gray-100 rounded hover:bg-nn-indigo hover:text-white transition">NovaLead</button></li>
            <li><button class="w-full text-left px-4 py-2 bg-gray-100 rounded hover:bg-nn-indigo hover:text-white transition">NovaFinance</button></li>
            <li><button class="w-full text-left px-4 py-2 bg-gray-100 rounded hover:bg-nn-indigo hover:text-white transition">NovaAI</button></li>
            <li><button class="w-full text-left px-4 py-2 bg-gray-100 rounded hover:bg-nn-indigo hover:text-white transition">NovaMail</button></li>
          </ul>

          <!-- Collapsed Sidebar mit Initialen -->
          <ul class="space-y-2" v-else>
            <li><button class="w-full h-10 bg-gray-100 rounded-full text-sm font-bold hover:bg-nn-indigo hover:text-white transition" title="NovaLead">L</button></li>
            <li><button class="w-full h-10 bg-gray-100 rounded-full text-sm font-bold hover:bg-nn-indigo hover:text-white transition" title="NovaFinance">F</button></li>
            <li><button class="w-full h-10 bg-gray-100 rounded-full text-sm font-bold hover:bg-nn-indigo hover:text-white transition" title="NovaAI">A</button></li>
            <li><button class="w-full h-10 bg-gray-100 rounded-full text-sm font-bold hover:bg-nn-indigo hover:text-white transition" title="NovaMail">M</button></li>
          </ul>
        </div>

        <!-- Screensaver Button -->
        <div class="mb-4" v-if="!collapsed">
          <button
            @click="toggleScreensaver"
            class="w-full px-4 py-2 bg-gray-100 text-gray-800 rounded hover:bg-nn-indigo hover:text-white transition"
          >
            Screensaver {{ screensaverActive ? 'deaktivieren' : 'aktivieren' }}
          </button>
        </div>

        <!-- Logout -->
        <div class="pt-4 border-t border-gray-200" v-if="!collapsed">
          <button
            class="w-full px-4 py-2 bg-red-100 text-red-600 rounded hover:bg-red-600 hover:text-white transition"
            @click="() => {}"
          >
            Logout
          </button>
        </div>
      </aside>

      <!-- Hauptinhalt -->
      <main class="flex-1 px-6 mt-32">
        <!-- Toggle für Profil-Anzeige -->
        <div class="flex justify-end mb-4">
          <button
            @click="showProfile = !showProfile"
            class="px-4 py-2 bg-nn-indigo text-white rounded-lg hover:bg-nn-neon-teal transition"
          >
            {{ showProfile ? 'Profil verbergen' : 'Profil anzeigen' }}
          </button>
        </div>

        <!-- Collapsable Profil-Datenblock -->
        <div
          v-if="showProfile"
          class="bg-white p-6 rounded-lg shadow-lg space-y-6"
        >
          <!-- Kontaktdaten -->
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
          </div>

          <!-- Über mich -->
          <div>
            <h3 class="text-sm font-medium text-gray-500 uppercase mb-2">Über mich</h3>
            <p class="text-gray-700 leading-relaxed">{{ user.bio || 'Keine Biografie vorhanden.' }}</p>
          </div>

          <!-- Bearbeiten -->
          <div class="flex justify-end">
            <button
              @click="goToEdit"
              class="px-4 py-2 bg-nn-indigo text-white rounded-lg hover:bg-nn-neon-teal transition"
            >
              Profil bearbeiten
            </button>
          </div>
        </div>
      </main>
    </div>

    <!-- Screensaver Overlay -->
    <div
      v-if="screensaverActive"
      class="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center cursor-pointer"
      @click="toggleScreensaver"
    >
      <img src="/Screensaver.png" alt="Screensaver" class="max-h-full max-w-full object-contain" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/api.js'

const router = useRouter()
const user = ref({
  name: '',
  position: '',
  company: '',
  location: '',
  bio: '',
})

const collapsed = ref(false)
const showProfile = ref(true)
const screensaverActive = ref(false)

function toggleScreensaver() {
  screensaverActive.value = !screensaverActive.value
}

onMounted(async () => {
  try {
    const { data } = await api.get('/users/profile')
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
/* Styling läuft komplett über Tailwind */
</style>
