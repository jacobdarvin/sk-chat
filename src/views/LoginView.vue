<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="w-full max-w-md p-6 bg-white rounded-lg border shadow-md">
      <h1 class="text-4xl font-medium text-center text-black mb-6">Staykay Chat</h1>
      <form @submit.prevent="login" class="space-y-4">
        <input
          v-model="username"
          type="text"
          placeholder="Username"
          class="w-full px-4 py-2 text-black border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          required
        />
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="w-full px-4 py-2 text-black border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          required
        />
        <button
          type="submit"
          class="w-full py-2 text-white bg-black rounded-md hover:bg-neutral-800 transition-colors"
        >
          Enter Chat
        </button>
      </form>
      <p class="mt-2 underline">
        <router-link to="/register">No account? Register here.</router-link>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { useUserStore } from '@/stores/user'
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api'

export default defineComponent({
  name: 'LoginView',

  setup() {
    const username = ref('')
    const password = ref('')
    const router = useRouter()
    const userStore = useUserStore()
    const errorMessage = ref('')

    const login = async () => {
      try {
        const response = await api.login({
          username: username.value,
          password: password.value
        })

        const { user, token } = response.data
        userStore.setUser(user, token)
        router.push('/chat')
      } catch (error: any) {
        console.error('Login failed:', error)
        errorMessage.value = error.message || 'Invalid Request'
      }
    }

    return { username, password, login, errorMessage }
  }
})
</script>

<style lang=""></style>
