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

    <!-- Expanded Sidebar -->
    <ul class="space-y-2" v-if="!collapsed">
      <li v-for="app in [
          { key: 'lead', label: 'NovaLead' },
          { key: 'finance', label: 'NovaFinance' },
          { key: 'ai', label: 'NovaAI' },
          { key: 'mail', label: 'NovaMail' }
        ]" :key="app.key">
        <button
          @click="currentApp = app.key"
          :class="[
            'w-full text-left px-4 py-2 rounded transition',
            currentApp === app.key
              ? 'bg-nn-indigo text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-black dark:text-white hover:bg-nn-indigo hover:text-white'
          ]"
        >
          {{ app.label }}
        </button>
      </li>

      <!-- Theme Dropdown -->
      <li class="relative">
        <button
          @click="showThemeDropdown = !showThemeDropdown"
          class="w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded hover:bg-nn-indigo hover:text-white transition text-left"
        >
          <span v-if="theme === 'light'">☀ Hellmodus</span>
          <span v-else-if="theme === 'dark'">🌙 Dunkelmodus</span>
          <span v-else>🖥️ Systemmodus</span>
        </button>
        <ul
          v-if="showThemeDropdown"
          class="absolute z-50 mt-1 left-0 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded shadow text-sm"
        >
          <li><button @click="setTheme('light')" class="w-full text-left px-4 py-2 hover:bg-nn-neon-teal">☀ Hellmodus</button></li>
          <li><button @click="setTheme('dark')" class="w-full text-left px-4 py-2 hover:bg-nn-neon-teal">🌙 Dunkelmodus</button></li>
          <li><button @click="setTheme('system')" class="w-full text-left px-4 py-2 hover:bg-nn-neon-teal">🖥️ Systemmodus</button></li>
        </ul>
      </li>
    </ul>

    <!-- Collapsed Sidebar -->
    <ul class="space-y-2" v-else>
      <li v-for="app in [
          { key: 'lead', label: 'L' },
          { key: 'finance', label: 'F' },
          { key: 'ai', label: 'A' },
          { key: 'mail', label: 'M' }
        ]" :key="app.key">
        <button
          @click="currentApp = app.key"
          :class="[
            'w-full h-10 rounded-full text-sm font-bold transition',
            currentApp === app.key
              ? 'bg-nn-indigo text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-black dark:text-white hover:bg-nn-indigo hover:text-white'
          ]"
          :title="`Nova${app.label === 'L' ? 'Lead' : app.label === 'F' ? 'Finance' : app.label === 'A' ? 'AI' : 'Mail'}`"
        >
          {{ app.label }}
        </button>
      </li>
      <li>
        <button
          @click="toggleScreensaver"
          class="w-full h-10 bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded-full text-sm font-bold hover:bg-nn-indigo hover:text-white transition"
          title="Screensaver aktivieren"
        >🌙</button>
      </li>
      <li>
        <button
          @click="logout"
          class="w-full h-10 bg-red-100 text-red-600 rounded-full text-sm font-bold hover:bg-red-600 hover:text-white transition"
          title="Logout"
        >⎋</button>
      </li>
      <li>
        <button
          @click="toggleDarkMode"
          class="w-full h-10 rounded-full text-sm font-bold transition"
          :class="[
            'transition',
            theme === 'dark'
              ? 'bg-nn-indigo text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-black dark:text-white hover:bg-nn-indigo hover:text-white'
          ]"
          :title="theme === 'dark' ? 'Hellmodus' : 'Dunkelmodus'"
        >
          <span v-if="theme === 'dark'">☀</span>
          <span v-else>🌙</span>
        </button>
      </li>
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

  <!-- Logout Button -->
  <div class="pt-4 border-t border-gray-200 dark:border-gray-600" v-if="!collapsed">
    <button
      @click="logout"
      class="w-full px-4 py-2 bg-red-100 text-red-600 rounded hover:bg-red-600 hover:text-white transition"
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
        <!-- Arbeitsbereich: hier werden die Apps eingeblendet -->
        <div v-else class="mt-6">
          <component :is="currentComponent" />
        </div>
      </main>
    </div>
    <!-- Screensaver Overlay -->
  <div
    v-if="screensaverActive"
    class="fixed inset-0 z-50 bg-black flex items-center justify-center"
    @click="screensaverActive = false"
  >
    <img src="/Screensaver.png" alt="Screensaver" class="max-w-full max-h-full object-contain" />
   </div>


  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/api.js'

import NovaLead    from '@/views/NovaLead.vue'
import NovaFinance from '@/views/NovaFinance.vue'
import NovaMail    from '@/views/NovaMail.vue'
// import NovaAI      from '@/views/NovaAI.vue'  // nur, wenn du NovaAI brauchst

const router = useRouter()

// **1. Aktuelle App definieren**
const currentApp = ref('lead')

// **2. Mapping von Schlüssel zu Komponente**
const appComponents = {
  lead:    NovaLead,
  finance: NovaFinance,
  mail:    NovaMail,
  // ai:      NovaAI,  // falls benötigt
}

// **3. Computed, das die richtige Komponente liefert**
const currentComponent = computed(() => appComponents[currentApp.value] || null)


const user = ref({})
const collapsed = ref(false)
const showProfile = ref(true)
const screensaverActive = ref(false)
const theme = ref('system') // system, light, dark
const showThemeDropdown = ref(false)
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
    })

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

function applyTheme() {
  const root = document.documentElement
  if (theme.value === 'dark') {
    root.classList.add('dark')
  } else if (theme.value === 'light') {
    root.classList.remove('dark')
  } else {
    root.classList.toggle('dark', window.matchMedia('(prefers-color-scheme: dark)').matches)
  }
}

function setTheme(value) {
  theme.value = value
  showThemeDropdown.value = false

  if (value === 'dark') {
    localStorage.setItem('theme', 'dark')
    document.documentElement.classList.add('dark')
  } else if (value === 'light') {
    localStorage.setItem('theme', 'light')
    document.documentElement.classList.remove('dark')
  } else {
    localStorage.removeItem('theme')
    applyTheme()
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

  const saved = localStorage.getItem('theme')
  if (saved === 'dark' || saved === 'light') {
    theme.value = saved
  } else {
    theme.value = 'system'
  }
  applyTheme()
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
