<!-- src/views/LoginView.vue -->

<template>
  <div class="login-container">
    <h1>Welcome to sk-chat</h1>
    <form @submit.prevent="login">
      <input v-model="username" type="text" placeholder="Username" required />
      <button type="submit">Enter Chat</button>
    </form>
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
