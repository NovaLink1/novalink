<template>
  <div class="min-h-screen bg-gray-100 dark:bg-nn-darkgray relative text-black dark:text-white">
    <!-- Header -->
    <div class="relative h-20 bg-nn-indigo">
      <!-- Title -->
      <div class="absolute bottom-0 left-0 p-6 text-white">
        <h1 class="text-3xl font-bold">
          {{ user?.company || 'Profilübersicht' }}
        </h1>
      </div>
      <!-- Avatar -->
      <div class="absolute left-1/2 transform -translate-x-1/2 -bottom-12">
  <div
    class="h-24 w-24 rounded-full border-4 border-white overflow-hidden shadow cursor-pointer"
    @click="triggerFileSelect"
  >
    <img
    v-if="user.avatar_url"
    :src="uploadsBase + user.avatar_url"
    alt="Avatar"
  />


    <div
      v-else
      class="bg-gray-300 h-full w-full flex items-center justify-center text-4xl text-white font-semibold"
    >
      {{ user?.name?.charAt(0)?.toUpperCase() || '?' }}
    </div>
  </div>

  <!-- Verstecktes File-Input für den Upload -->
  <input
    type="file"
    ref="fileInput"
    class="hidden"
    accept="image/*"
    @change="handleFileChange"
  />
</div>

    </div>

    <!-- Flex-Container für Sidebar und Main-Bereich -->
      <div class="flex"> <!-- pt-12 um Platz für Avatar zu berücksichtigen -->
      <!-- Sidebar -->
      <aside
        :class="[
          'h-[calc(100vh-5rem)] bg-white dark:bg-nn-darkgray dark:text-white shadow-lg p-4 flex-shrink-0 transition-all duration-300 flex flex-col justify-between overflow-y-auto',
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
            <li v-for="app in ['lead','finance','ai','mail']" :key="app">
              <button
                @click="currentApp = app"
                :class="[
                  'w-full text-left px-4 py-2 rounded transition',
                  currentApp === app
                    ? 'bg-nn-indigo text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-black dark:text-white hover:bg-nn-indigo hover:text-white'
                ]"
              >
                {{ {
                  lead: 'NovaLead',
                  finance: 'NovaFinance',
                  ai: 'NovaAI',
                  mail: 'NovaMail'
                }[app] }}
              </button>
            </li>
            <!-- Theme-Dropdown bleibt unverändert -->
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

          <!-- Kollabierte Sidebar -->
          <ul class="space-y-2" v-else>
            <li v-for="item in [
              { key:'lead',    icon:'L', title:'NovaLead'    },
              { key:'finance', icon:'F', title:'NovaFinance' },
              { key:'ai',      icon:'A', title:'NovaAI'      },
              { key:'mail',    icon:'M', title:'NovaMail'    }
            ]" :key="item.key">
              <button
                @click="currentApp = item.key"
                :class="[
                  'w-full h-10 rounded-full text-sm font-bold transition',
                  currentApp === item.key
                    ? 'bg-nn-indigo text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-black dark:text-white hover:bg-nn-indigo hover:text-white'
                ]"
                :title="item.title"
              >
                {{ item.icon }}
              </button>
            </li>
            <!-- Screensaver & Logout & Darkmode Buttons -->
            <li><button @click="toggleScreensaver" class="...">🌙</button></li>
            <li><button @click="logout" class="...">⎋</button></li>
            <li><button @click="toggleDarkMode" class="...">{{ theme === 'dark' ? '☀' : '🌙' }}</button></li>
          </ul>
        </div>

        <!-- Screensaver Button ganz unten -->
        <div class="mb-4" v-if="!collapsed">
          <button
            @click="toggleScreensaver"
            class="w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded hover:bg-nn-indigo hover:text-white transition"
          >
            Screensaver {{ screensaverActive ? 'deaktivieren' : 'aktivieren' }}
          </button>
        </div>

        <!-- Logout Button unten -->
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
      <main class="flex-1 px-6 mt-12 bg-white dark:bg-nn-darkgray text-black dark:text-white">
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
  <!-- Avatar-Upload Modal -->
<div
  v-if="showAvatarModal"
  class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
>
  <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
    <h2 class="mb-4 text-lg font-bold dark:text-white">Avatar hochladen</h2>
    <img
      v-if="previewUrl"
      :src="previewUrl"
      alt="Vorschau"
      class="w-32 h-32 rounded-full mb-4 object-cover"
    />
    <div class="flex space-x-4">
      <button
        @click="confirmUpload"
        class="px-4 py-2 bg-nn-indigo text-white rounded hover:bg-nn-neon-teal transition"
      >
        Bestätigen
      </button>
      <button
        @click="showAvatarModal = false"
        class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
      >
        Abbrechen
      </button>
    </div>
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
// Basispfad für alle statischen Uploads (Avatare), ohne das /api-Segment
const uploadsBase = import.meta.env.VITE_API_URL.replace('/api', '')
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
    showAvatarModal.value = true      // Modal jetzt anzeigen!
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

    const response = await api.post('/users/upload-avatar', formData)

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
