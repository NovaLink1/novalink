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
          class="h-40 w-40 rounded-full border-4 border-white overflow-hidden shadow cursor-pointer"
          @click="showAvatarModal = true"
        >
          <img
            v-if="user?.avatar_url"
            :src="user.avatar_url"
            alt="Avatar"
            class="w-full h-full object-cover"
          />
          <div
            v-else
            class="bg-gray-300 h-full w-full flex items-center justify-center text-4xl text-white font-semibold"
          >
            {{ user?.name?.charAt(0)?.toUpperCase() || '?' }}
          </div>
        </div>
      </div>
    </div>

    <!-- Avatar Upload Modal -->
    <div v-if="showAvatarModal" class="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full relative">
        <button @click="showAvatarModal = false" class="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-xl">×</button>
        <h2 class="text-xl font-semibold mb-4 text-center">Avatar hochladen</h2>
        <div
          class="border-2 border-dashed border-gray-400 dark:border-gray-600 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
          @click="triggerFileSelect"
        >
          <p v-if="!previewUrl">Klicke hier oder ziehe eine Datei hinein</p>
          <img v-if="previewUrl" :src="previewUrl" class="mx-auto max-h-40 rounded" />
        </div>
        <input ref="fileInput" type="file" accept="image/*" class="hidden" @change="handleFileChange" />
        <button
          class="mt-4 w-full bg-nn-indigo text-white py-2 px-4 rounded hover:bg-nn-neon-teal transition"
          @click="confirmUpload"
        >
          Speichern
        </button>
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
          <ul class="space-y-2" v-if="!collapsed">
            <li><button class="w-full text-left px-4 py-2 bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded hover:bg-nn-indigo hover:text-white transition">NovaLead</button></li>
            <li><button class="w-full text-left px-4 py-2 bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded hover:bg-nn-indigo hover:text-white transition">NovaFinance</button></li>
            <li><button class="w-full text-left px-4 py-2 bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded hover:bg-nn-indigo hover:text-white transition">NovaAI</button></li>
            <li><button class="w-full text-left px-4 py-2 bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded hover:bg-nn-indigo hover:text-white transition">NovaMail</button></li>
            <li><button @click="toggleDarkMode" class="w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded hover:bg-nn-indigo hover:text-white transition">{{ darkMode ? '☀ Hellmodus' : '🌙 Dunkelmodus' }}</button></li>
          </ul>
          <ul class="space-y-2" v-else>
            <li><button class="w-full h-10 bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded-full text-sm font-bold hover:bg-nn-indigo hover:text-white transition" title="NovaLead">L</button></li>
            <li><button class="w-full h-10 bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded-full text-sm font-bold hover:bg-nn-indigo hover:text-white transition" title="NovaFinance">F</button></li>
            <li><button class="w-full h-10 bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded-full text-sm font-bold hover:bg-nn-indigo hover:text-white transition" title="NovaAI">A</button></li>
            <li><button class="w-full h-10 bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded-full text-sm font-bold hover:bg-nn-indigo hover:text-white transition" title="NovaMail">M</button></li>
            <li><button @click="toggleScreensaver" class="w-full h-10 bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded-full text-sm font-bold hover:bg-nn-indigo hover:text-white transition" title="Screensaver aktivieren">🌙</button></li>
            <li><button @click="logout" class="w-full h-10 bg-red-100 text-red-600 rounded-full text-sm font-bold hover:bg-red-600 hover:text-white transition" title="Logout">⎋</button></li>
            <li><button @click="toggleDarkMode" class="w-full h-10 bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded-full text-sm font-bold hover:bg-nn-indigo hover:text-white transition" :title="darkMode ? 'Hellmodus' : 'Dunkelmodus'">{{ darkMode ? '☀' : '🌙' }}</button></li>
          </ul>
        </div>
        <div class="mb-4" v-if="!collapsed">
          <button
            @click="toggleScreensaver"
            class="w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded hover:bg-nn-indigo hover:text-white transition"
          >
            Screensaver {{ screensaverActive ? 'deaktivieren' : 'aktivieren' }}
          </button>
        </div>
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
        <div class="flex justify-end mb-4">
          <button
            @click="showProfile = !showProfile"
            class="px-4 py-2 bg-nn-indigo text-white rounded-lg hover:bg-nn-neon-teal transition dark:bg-gray-700 dark:hover:bg-nn-neon-teal"
          >
            {{ showProfile ? 'Profil verbergen' : 'Profil anzeigen' }}
          </button>
        </div>
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
const showAvatarModal = ref(false)
const previewUrl = ref(null)
const selectedFile = ref(null)
const fileInput = ref(null)
let inactivityTimer = null

function triggerFileSelect() {
  fileInput.value?.click()
}

function handleFileChange(e) {
  const file = e.target.files[0]
  if (file) {
    selectedFile.value = file
    previewUrl.value = URL.createObjectURL(file)
  }
}

async function confirmUpload() {
  if (!selectedFile.value) {
    alert('Bitte wähle eine Datei aus.')
    return
  }

  try {
    const formData = new FormData()
    formData.append('file', selectedFile.value)

    const response = await api.post('/users/upload-avatar', formData, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});



    // Avatar-URL setzen + Cache umgehen
    user.value.avatar_url = `${response.data.avatar_url}?t=${Date.now()}`

    alert('Avatar wurde erfolgreich hochgeladen.')
    showAvatarModal.value = false
  } catch (error) {
    console.error('Fehler beim Hochladen:', error)
    alert('Fehler beim Hochladen des Avatars.')
  }
}

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
  router.push('/')
}
</script>


<style scoped>
/* Tailwind Styling */
</style>
