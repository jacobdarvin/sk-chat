import ChatView from '@/views/ChatView.vue'
import LoginView from '@/views/LoginView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/chat',
      name: 'chat',
      component: ChatView,
      meta: { requiresAuth: true }
    },
  ]
})

router.beforeEach((to, from, next) => {
  const isAuthetincated = !!localStorage.getItem('user');
  if (to.meta.requiresAuth && !isAuthetincated) {
    next('/')
  } else {
    next()
  }
})

export default router
