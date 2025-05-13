
<template>
  <div class="space-y-4">
    <h2 class="text-2xl font-bold text-nn-indigo">💰 NovaFinance Übersicht</h2>
    <p class="text-gray-700 dark:text-gray-300">
      Diese Ansicht ist das Grundgerüst für deine Finanzübersicht. Hier können zukünftig Rechnungen, Angebote,
      Zahlungseingänge und Finanzstatistiken dargestellt werden.
    </p>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div class="p-4 bg-white dark:bg-gray-700 rounded shadow">
        <h3 class="font-semibold text-lg">Letzte Rechnung</h3>
        <p class="text-sm text-gray-500">#2025-001 · 03.05.2025 · 1.320,00 €</p>
      </div>
      <div class="p-4 bg-white dark:bg-gray-700 rounded shadow">
        <h3 class="font-semibold text-lg">Offene Zahlungen</h3>
        <p class="text-sm text-gray-500">2 Rechnungen offen · 2.800,00 €</p>
      </div>
      <div class="p-4 bg-white dark:bg-gray-700 rounded shadow">
        <h3 class="font-semibold text-lg">Letzter Zahlungseingang</h3>
        <p class="text-sm text-gray-500">30.04.2025 · 960,00 €</p>
      </div>
    </div>
  </div>
</template>

<script setup>
// Später mit echtem Backend verbinden
</script>

<style scoped>
</style>