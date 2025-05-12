<template>
  <div class="min-h-screen bg-gray-100 dark:bg-nn-darkgray relative text-black dark:text-white">
    <!-- Header -->
    <div class="relative h-64 bg-nn-indigo">
      <div class="absolute bottom-0 left-0 p-6 text-white">
        <h1 class="text-3xl font-bold">
        {{ user?.company || 'Profilübersicht' }}
        </h1>
      </div>
      <!-- Avatar -->
      <div class="absolute left-1/2 transform -translate-x-1/2 -bottom-20">
        <div
          class="h-40 w-40 rounded-full bg-gray-300 border-4 border-white flex items-center justify-center text-4xl text-white font-semibold"
        >
          {{ user?.name?.charAt(0)?.toUpperCase() || '?' }}
        </div>
      </div>
    </div>

    <!-- Hauptlayout -->
    <div class="flex">
      <!-- Sidebar -->
      <aside
        :class="[
          'h-[calc(100vh-16rem)] bg-white dark:bg-nn-darkgray dark:text-white shadow-lg p-4 transition-all duration-300 flex flex-col justify-between overflow-y-auto',
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
            <li><button class="w-full text-left px-4 py-2 bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded hover:bg-nn-indigo hover:text-white transition">NovaLead</button></li>
            <li><button class="w-full text-left px-4 py-2 bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded hover:bg-nn-indigo hover:text-white transition">NovaFinance</button></li>
            <li><button class="w-full text-left px-4 py-2 bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded hover:bg-nn-indigo hover:text-white transition">NovaAI</button></li>
            <li><button class="w-full text-left px-4 py-2 bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded hover:bg-nn-indigo hover:text-white transition">NovaMail</button></li>
            <li>
              <button @click="toggleDarkMode" class="w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded hover:bg-nn-indigo hover:text-white transition">
                {{ darkMode ? '☀ Hellmodus' : '🌙 Dunkelmodus' }}
              </button>
            </li>
          </ul>

          <!-- Collapsed Sidebar mit Initialen und Utility Buttons -->
          <ul class="space-y-2" v-else>
            <li><button class="w-full h-10 bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded-full text-sm font-bold hover:bg-nn-indigo hover:text-white transition" title="NovaLead">L</button></li>
            <li><button class="w-full h-10 bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded-full text-sm font-bold hover:bg-nn-indigo hover:text-white transition" title="NovaFinance">F</button></li>
            <li><button class="w-full h-10 bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded-full text-sm font-bold hover:bg-nn-indigo hover:text-white transition" title="NovaAI">A</button></li>
            <li><button class="w-full h-10 bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded-full text-sm font-bold hover:bg-nn-indigo hover:text-white transition" title="NovaMail">M</button></li>
            <li><button @click="toggleScreensaver" class="w-full h-10 bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded-full text-sm font-bold hover:bg-nn-indigo hover:text-white transition" title="Screensaver aktivieren">🌙</button></li>
            <li><button  @click="logout"class="w-full h-10 bg-red-100 text-red-600 rounded-full text-sm font-bold hover:bg-red-600 hover:text-white transition" title="Logout">⎋</button></li>
            <li><button @click="toggleDarkMode" class="w-full h-10 bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded-full text-sm font-bold hover:bg-nn-indigo hover:text-white transition" :title="darkMode ? 'Hellmodus' : 'Dunkelmodus'">{{ darkMode ? '☀' : '🌙' }}</button></li>
          </ul>
        </div>

        <!-- Screensaver Button -->
        <div class="mb-4" v-if="!collapsed">
          <button
            @click="toggleScreensaver"
            class="w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded hover:bg-nn-indigo hover:text-white transition"
          >
            Screensaver {{ screensaverActive ? 'deaktivieren' : 'aktivieren' }}
          </button>
        </div>

        <!-- Logout -->
        <div class="pt-4 border-t border-gray-200 dark:border-gray-600" v-if="!collapsed">
          <button
            class="w-full px-4 py-2 bg-red-100 text-red-600 rounded hover:bg-red-600 hover:text-white transition"
            @click="logout"

          >
            Logout
          </button>
        </div>
      </aside>

      <!-- Hauptinhalt -->
      <main class="flex-1 px-6 mt-32 bg-white dark:bg-nn-darkgray text-black dark:text-white">
        <!-- Toggle für Profil-Anzeige -->
        <div class="flex justify-end mb-4">
          <button
            @click="showProfile = !showProfile"
            class="px-4 py-2 bg-nn-indigo text-white rounded-lg hover:bg-nn-neon-teal transition dark:bg-gray-700 dark:hover:bg-nn-neon-teal"
          >
            {{ showProfile ? 'Profil verbergen' : 'Profil anzeigen' }}
          </button>
        </div>

        <!-- Collapsable Profil-Datenblock -->
        <div v-if="showProfile" class="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg space-y-6">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><h3 class="text-sm font-medium text-gray-500 uppercase dark:text-gray-300">Position</h3><p class="text-gray-800 dark:text-white">{{ user.position || 'nicht angegeben' }}</p></div>
            <div><h3 class="text-sm font-medium text-gray-500 uppercase dark:text-gray-300">Unternehmen</h3><p class="text-gray-800 dark:text-white">{{ user.company || 'nicht angegeben' }}</p></div>
            <div><h3 class="text-sm font-medium text-gray-500 uppercase dark:text-gray-300">Wohnort</h3><p class="text-gray-800 dark:text-white">{{ user.location || 'nicht angegeben' }}</p></div>
          </div>
          <div><h3 class="text-sm font-medium text-gray-500 uppercase mb-2 dark:text-gray-300">Über mich</h3><p class="text-gray-700 leading-relaxed dark:text-white">{{ user.bio || 'Keine Biografie vorhanden.' }}</p></div>
          <div class="flex justify-end">
            <button @click="goToEdit" class="px-4 py-2 bg-nn-indigo text-white rounded-lg hover:bg-nn-neon-teal transition dark:bg-gray-700 dark:hover:bg-nn-neon-teal">Profil bearbeiten</button>
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
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/api.js'

const router = useRouter()

const user = ref({})
const collapsed = ref(false)
const showProfile = ref(true)
const screensaverActive = ref(false)
const darkMode = ref(false)
let inactivityTimer = null

function toggleScreensaver() {
  screensaverActive.value = !screensaverActive.value
  resetInactivityTimer()
}

function toggleDarkMode() {
  darkMode.value = !darkMode.value
  const root = document.documentElement
  if (darkMode.value) {
    root.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    root.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
}

function resetInactivityTimer() {
  clearTimeout(inactivityTimer)
  if (!screensaverActive.value) {
    inactivityTimer = setTimeout(() => {
      screensaverActive.value = true
    }, 60000)
  }
}

function setupInactivityDetection() {
  const events = ['mousemove', 'mousedown', 'keydown', 'touchstart']
  events.forEach(evt => window.addEventListener(evt, resetInactivityTimer))
  resetInactivityTimer()
}

function removeInactivityDetection() {
  const events = ['mousemove', 'mousedown', 'keydown', 'touchstart']
  events.forEach(evt => window.removeEventListener(evt, resetInactivityTimer))
  clearTimeout(inactivityTimer)
}

onMounted(async () => {
  try {
    const { data } = await api.get('/users/profile')
    user.value = data
  } catch (e) {
    console.error('Profil-Ladefehler:', e)
  }

  setupInactivityDetection()

  if (localStorage.getItem('theme') === 'dark') {
    darkMode.value = true
    document.documentElement.classList.add('dark')
  }
})

onBeforeUnmount(() => {
  removeInactivityDetection()
})

function goToEdit() {
  router.push({ name: 'EditProfile' })
}

function logout() {
  localStorage.removeItem('token')
  router.push('/') // oder dein Login-Routenname
}

</script>

