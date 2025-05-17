<template>
  <div class="p-6 space-y-6">
    <!-- 4 Kacheln im Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <!-- Kachel 1: LeadTable -->
      <div class="bg-white dark:bg-nn-darkgray rounded-lg shadow p-4 flex flex-col h-80 border-2 border-nn-indigo dark:border-nn-neon-teal">
        <h3 class="text-lg font-semibold mb-2">Leads</h3>
        <div class="flex-1 overflow-y-auto mb-4">
          <LeadTable />
        </div>
      </div>
      <!-- Kachel 2 -->
      <div class="bg-white dark:bg-nn-darkgray rounded-lg shadow p-4 flex flex-col h-80 border-2 border-nn-indigo dark:border-nn-neon-teal">
        <h3 class="text-lg font-semibold mb-2">Kachel 2</h3>
        <div class="flex-1 overflow-y-auto mb-4">
          <p class="text-gray-700 dark:text-gray-300">
            Inhalt für Kachel 2...
          </p>
        </div>
        <button class="px-3 py-1 bg-nn-indigo text-white rounded hover:bg-nn-neon-teal transition">
          Details
        </button>
      </div>
      <!-- Kachel 3 -->
      <div class="bg-white dark:bg-nn-darkgray rounded-lg shadow p-4 flex flex-col h-80 border-2 border-nn-indigo dark:border-nn-neon-teal">
        <h3 class="text-lg font-semibold mb-2">Kachel 3</h3>
        <div class="flex-1 overflow-y-auto mb-4">
          <p class="text-gray-700 dark:text-gray-300">
            Inhalt für Kachel 3...
          </p>
        </div>
        <button class="px-3 py-1 bg-nn-indigo text-white rounded hover:bg-nn-neon-teal transition">
          Anzeigen
        </button>
      </div>
      <!-- Kachel 4 -->
      <div class="bg-white dark:bg-nn-darkgray rounded-lg shadow p-4 flex flex-col h-80 border-2 border-nn-indigo dark:border-nn-neon-teal">
        <h3 class="text-lg font-semibold mb-2">Kachel 4</h3>
        <div class="flex-1 overflow-y-auto mb-4">
          <p class="text-gray-700 dark:text-gray-300">
            Inhalt für Kachel 4...
          </p>
        </div>
        <button class="px-3 py-1 bg-nn-indigo text-white rounded hover:bg-nn-neon-teal transition">
          Öffnen
        </button>
      </div>
    </div>

    <!-- Notizenbereich -->
    <div class="bg-white dark:bg-nn-darkgray rounded-lg shadow p-4 flex flex-col h-56">
      <h3 class="text-lg font-semibold mb-2">Notizen</h3>
      <textarea
        v-model="notes"
        placeholder="Hier Notizen eingeben..."
        class="flex-1 w-full p-2 border-2 border-gray-300 dark:border-gray-600 rounded resize-none overflow-y-auto focus:outline-none focus:ring-2 focus:ring-nn-indigo"
      ></textarea>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import LeadTable from '@/components/tables/LeadTable.vue'

const notes = ref('')
</script>

<style scoped>
/* Tailwind-Utilities verwenden */
</style>