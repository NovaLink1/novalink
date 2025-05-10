<template>
  <div class="auth-container">
    <h1>Login</h1>
    <form @submit.prevent="onSubmit">
      <input v-model="form.email" type="email" placeholder="E-Mail" required />
      <input v-model="form.password" type="password" placeholder="Passwort" required />
      <button type="submit">Einloggen</button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
    <router-link to="/register">Noch keinen Account? Registrieren</router-link>
  </div>
</template>

  

<script setup>
import { reactive, ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()
const form = reactive({ email: '', password: '' })
const error = ref('')

async function onSubmit() {
  error.value = ''
  try {
    const { data } = await axios.post('/auth/login', form)
    // Store token
    localStorage.setItem('token', data.access_token)
    // Set default Authorization header for future requests
    axios.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`
    // Redirect to profile
    router.push('/userprofile')
  } catch (err) {
    error.value = err.response?.data?.detail || 'Fehler beim Login.'
  }
}
</script>

<style scoped>
.auth-container {
  max-width: 400px;
  margin: 2rem auto;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
}
input {
  display: block;
  width: 100%;
  margin: 0.5rem 0;
  padding: 0.5rem;
}
button {
  padding: 0.5rem 1rem;
  margin-top: 1rem;
}
.error {
  color: red;
  margin-top: 0.5rem;
}
</style>