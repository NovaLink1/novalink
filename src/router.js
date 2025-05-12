import { createRouter, createWebHistory } from 'vue-router'
import LandingPage  from './pages/LandingPage.vue'
import Login        from './pages/Login.vue'
import Register     from './pages/Register.vue'
// Alte Profile-Komponente, kann optional bleiben oder entfernt werden
import Profile      from './pages/Profile.vue'
// Neue Profilseiten
import EditProfile  from './pages/EditProfile.vue'
import UserProfile  from './pages/UserProfile.vue'
import EmailConfirm from './pages/ConfirmEmail.vue' // Neue Komponente importieren

const routes = [
  { path: '/',            component: LandingPage, name: 'Landing' },
  { path: '/login',       redirect: '/' },
  { path: '/register',    component: Register,    name: 'Register' },
  { path: '/auth/confirm', component: EmailConfirm, name: 'EmailConfirm' }, // <-- NEU
  // Profil-Ansicht, Anzeige der Daten
  { path: '/userprofile',  component: UserProfile, name: 'UserProfile', meta: { requiresAuth: true } },
  // Profil bearbeiten (optional)
  { path: '/edit-profile', component: EditProfile,  name: 'EditProfile', meta: { requiresAuth: true } },
  // Legacy Routen (können entfernt werden)
  { path: '/profile',     component: Profile,      name: 'Profile_old', meta: { requiresAuth: true } },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Globale Navigation Guard
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.meta.requiresAuth && !token) {
    next({ name: 'Landing' })
  } else next()
})

export default router
