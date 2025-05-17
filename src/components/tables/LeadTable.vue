<template>
  <div class="p-4 space-y-4 h-full flex flex-col">
    <!-- Suchfeld -->
    <input
      v-model="search"
      type="text"
      placeholder="Suche nach Firma oder Ansprechpartner..."
      class="w-full p-2 border rounded"
    />

    <!-- Lead-Liste -->
    <div class="flex-1 overflow-y-auto space-y-2">
      <div
        v-for="lead in filteredLeads"
        :key="lead.id"
        @click="openModal(lead)"
        class="border p-3 rounded hover:bg-gray-50 dark:hover:bg-nn-dark cursor-pointer"
      >
        <div class="font-semibold">{{ lead.firma }}</div>
        <div class="text-sm text-gray-600">{{ lead.adresse }}</div>
      </div>
    </div>

    <!-- Modal -->
    <div
      v-if="selectedLead"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white dark:bg-nn-darkgray p-6 rounded shadow-lg max-w-2xl w-full space-y-4">
        <h2 class="text-xl font-bold">Lead bearbeiten</h2>

        <!-- Firmendaten -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            v-model="selectedLead.firma"
            class="p-2 border rounded"
            placeholder="Firmenname"
          />
          <input
            v-model="selectedLead.adresse"
            class="p-2 border rounded"
            placeholder="Adresse"
          />
          <input
            v-model="selectedLead.email"
            class="p-2 border rounded"
            placeholder="E-Mail"
          />
          <input
            v-model="selectedLead.telefon"
            class="p-2 border rounded"
            placeholder="Telefon"
          />
        </div>

        <!-- Ansprechpartner -->
        <div class="space-y-2">
          <h3 class="font-semibold">Ansprechpartner</h3>
          <div
            v-for="(kontakt, i) in selectedLead.ansprechpartner"
            :key="i"
            class="grid grid-cols-1 sm:grid-cols-4 gap-2"
          >
            <input
              v-model="kontakt.name"
              class="p-2 border rounded"
              placeholder="Name"
            />
            <input
              v-model="kontakt.position"
              class="p-2 border rounded"
              placeholder="Position"
            />
            <input
              v-model="kontakt.email"
              class="p-2 border rounded"
              placeholder="E-Mail"
            />
            <input
              v-model="kontakt.telefon"
              class="p-2 border rounded"
              placeholder="Telefon"
            />
          </div>
          <button
            @click="addContact"
            class="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
          >
            + Ansprechpartner hinzufügen
          </button>
        </div>

        <!-- Aktionen -->
        <div class="flex justify-end space-x-2 pt-4">
          <button
            @click="closeModal"
            class="px-4 py-2 bg-gray-300 rounded"
          >
            Abbrechen
          </button>
          <button
            @click="saveLead"
            class="px-4 py-2 bg-green-600 text-white rounded"
          >
            Speichern
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '@/api.js'  // dein Axios-Instance mit baseURL='/api'

// State
const leads = ref([])
const search = ref('')
const selectedLead = ref(null)

// Beim Mounten Leads vom Backend holen
onMounted(async () => {
  try {
    const { data } = await api.get('/leads')
    leads.value = data
  } catch (error) {
    console.error(
      'Leads laden fehlgeschlagen:',
      error.response?.status,
      error.response?.data ?? error.message
    )
  }
})

// Gefilterte Liste (ohne gelöschte Einträge)
const filteredLeads = computed(() =>
  leads.value.filter(
    (lead) =>
      !lead.gelöscht &&
      (lead.firma.toLowerCase().includes(search.value.toLowerCase()) ||
        lead.ansprechpartner.some((a) =>
          a.name.toLowerCase().includes(search.value.toLowerCase())
        ))
  )
)

// Modal-Funktionen
function openModal(lead) {
  selectedLead.value = JSON.parse(JSON.stringify(lead))
}
function closeModal() {
  selectedLead.value = null
}

// Ansprechpartner dynamisch hinzufügen
function addContact() {
  selectedLead.value.ansprechpartner.push({
    name: '',
    position: '',
    email: '',
    telefon: '',
  })
}

// Speichern: POST (neu) oder PUT (update)
async function saveLead() {
  try {
    if (selectedLead.value.id) {
      const { data } = await api.put(
        `/leads/${selectedLead.value.id}`,
        selectedLead.value
      )
      // lokal updaten
      const idx = leads.value.findIndex((l) => l.id === data.id)
      if (idx > -1) leads.value[idx] = data
    } else {
      const { data } = await api.post('/leads', selectedLead.value)
      leads.value.push(data)
    }
  } catch (error) {
    console.error(
      'Lead speichern fehlgeschlagen:',
      error.response?.status,
      error.response?.data ?? error.message
    )
  } finally {
    closeModal()
  }
}
</script>

<style scoped>
/* Du nutzt Tailwind Utilities, daher hier keine zusätzlichen Styles nötig */
</style>