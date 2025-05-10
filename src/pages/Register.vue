
<template>
  <div class="auth-container">
    <h1>Registrieren</h1>
    <form @submit.prevent="onSubmit">
      <input v-model="form.name" type="text" placeholder="Name" required />
      <input v-model="form.email" type="email" placeholder="E-Mail" required />
      <input v-model="form.password" type="password" placeholder="Passwort" required minlength="6" />
      <input v-model="form.password_confirm" type="password" placeholder="Passwort bestätigen" required />
      <p v-if="passwordMismatch" class="error">Passwörter stimmen nicht überein</p>
      <button type="submit" :disabled="passwordMismatch">Registrieren</button>
    </form>
    <p v-if="message" class="success">{{ message }}</p>
    <p v-if="error" class="error">{{ error }}</p>
    <router-link to="/login">Bereits registriert? Einloggen</router-link>
  </div>
</template>

<script setup>
import { reactive, computed, ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()
const form = reactive({ name: '', email: '', password: '', password_confirm: '' })
const message = ref('')
const error = ref('')

const passwordMismatch = computed(
  () => form.password && form.password !== form.password_confirm
)

async function onSubmit() {
  message.value = ''
  error.value = ''
  try {
    const res = await axios.post('/auth/register', form)
    message.value = 'Registrierung erfolgreich! Bitte prüfe deine Mail.'
  } catch (err) {
    error.value = err.response?.data?.detail || 'Fehler bei der Registrierung.'
  }
}
</script>

<style scoped>
.auth-container { max-width: 400px; margin: 2rem auto; padding: 1rem; border: 1px solid #ccc; border-radius: 8px; }
input { display: block; width: 100%; margin: 0.5rem 0; padding: 0.5rem; }
button { padding: 0.5rem 1rem; margin-top: 1rem; }
.error { color: red; }
.success { color: green; }
</style>

