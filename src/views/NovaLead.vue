<template>
  <div class="space-y-4">
    <h2 class="text-2xl font-bold text-nn-indigo">📋 NovaLead Übersicht</h2>
    <ul class="space-y-2">
      <li
        v-for="lead in leads"
        :key="lead.id"
        class="p-4 rounded-lg shadow bg-white dark:bg-gray-700"
      >
        <p class="font-semibold text-lg">{{ lead.name }}</p>
        <p class="text-sm text-gray-500 dark:text-gray-300">{{ lead.company }} – {{ lead.status }}</p>
      </li>
    </ul>
  </div>
</template>

<script setup>
const leads = [
  { id: 1, name: 'Max Mustermann', company: 'Musterfirma GmbH', status: 'Anfrage' },
  { id: 2, name: 'Anna Beispiel', company: 'Beispiel AG', status: 'Verhandlung' },
  { id: 3, name: 'Lukas Test', company: 'Test KG', status: 'Abgeschlossen' }
]
</script>

<style scoped>
</style>
