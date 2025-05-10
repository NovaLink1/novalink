<template>
  <div class="confirm-container">
    <h1>E-Mail Bestätigung</h1>

    <p v-if="loading">⏳ Bestätigung wird verarbeitet...</p>
    <p v-if="message" class="success">{{ message }}</p>
    <p v-if="error" class="error">{{ error }}</p>

    <router-link v-if="!loading && !message" to="/login">Zum Login</router-link>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/api.js'

const route = useRoute()
const router = useRouter()

const message = ref('')
const error = ref('')
const loading = ref(true)

onMounted(async () => {
  const token = route.query.token
  if (!token) {
    error.value = '❌ Kein Token in der URL gefunden.'
    loading.value = false
    return
  }

  try {
    const res = await api.get(`/auth/confirm?token=${token}`)
    message.value = res.data.message || '✅ Deine E-Mail wurde erfolgreich bestätigt.'

    // ➤ Auto-Redirect nach 3 Sekunden
    setTimeout(() => {
      router.push('/login')
    }, 3000)
  } catch (err) {
    error.value = err.response?.data?.detail || '❌ Fehler bei der Bestätigung.'
  } finally {
    loading.value = false
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
