<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="w-full max-w-md p-6 bg-white rounded-lg border shadow-md">
      <h1 class="text-4xl font-medium text-center text-black mb-6">Staykay Chat</h1>
      <form @submit.prevent="login" class="space-y-4">
        <input
          v-model="username"
          type="text"
          placeholder="Enter your username"
          class="w-full px-4 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          required
        />
        <button
          type="submit"
          class="w-full py-2 text-white bg-black rounded-md hover:bg-gray-800 transition-colors"
        >
          Enter Chat
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { useUserStore } from '@/stores/user'
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'LoginView',
  setup() {
    const username = ref('')
    const userStore = useUserStore()
    const router = useRouter()

    const login = () => {
      if (username.value) {
        userStore.setUser({ name: username.value })
        localStorage.setItem('user', JSON.stringify(userStore.user))
        router.push('/chat')
      }
    }

    return { username, login }
  }
})
</script>

<style lang=""></style>
