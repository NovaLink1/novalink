<template>
  <div class="confirm-container">
    <h1>E-Mail Bestätigung</h1>
    <p v-if="message" class="success">{{ message }}</p>
    <p v-if="error" class="error">{{ error }}</p>
    <router-link to="/login">Zum Login</router-link>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const message = ref('')
const error = ref('')

onMounted(async () => {
  const token = route.query.token // ✅ Korrekte Stelle für Token aus Query
  if (!token) {
    error.value = '❌ Kein Token in der URL gefunden.'
    return
  }

  try {
    const res = await axios.get(`/auth/confirm?token=${token}`)
    message.value = res.data.message || '✅ Bestätigung erfolgreich.'
  } catch (err) {
    error.value = err.response?.data?.detail || '❌ Fehler bei der Bestätigung.'
  }
})
</script>

<style scoped>
.confirm-container {
  max-width: 400px;
  margin: 2rem auto;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  text-align: center;
}
.error {
  color: red;
  margin-top: 1rem;
}
.success {
  color: green;
  margin-top: 1rem;
}
</style>
