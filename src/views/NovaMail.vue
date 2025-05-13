// frontend/src/views/NovaMail.vue
<template>
  <div class="space-y-4">
    <h2 class="text-2xl font-bold text-nn-indigo">📬 NovaMail Übersicht</h2>
    <p class="text-gray-700 dark:text-gray-300">
      Hier entsteht dein intelligenter E-Mail-Client mit Fokus auf Business-Kommunikation.
    </p>
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      <div class="bg-white dark:bg-gray-700 rounded shadow p-4">
        <h3 class="font-semibold text-lg">Letzte E-Mail</h3>
        <p class="text-sm text-gray-500">Betreff: Projektupdate · Absender: info@firma.at</p>
      </div>
      <div class="bg-white dark:bg-gray-700 rounded shadow p-4">
        <h3 class="font-semibold text-lg">Ungelesene Nachrichten</h3>
        <p class="text-sm text-gray-500">4 neue E-Mails seit gestern</p>
      </div>
      <div class="bg-white dark:bg-gray-700 rounded shadow p-4">
        <h3 class="font-semibold text-lg">Nächste Antwort fällig</h3>
        <p class="text-sm text-gray-500">An: kunde@beispiel.de · Frist: 14.05.2025</p>
      </div>
    </div>
  </div>
</template>

<script setup>
// Backend-Integration für Mails folgt in einem späteren Schritt
</script>

<style scoped>
</style>