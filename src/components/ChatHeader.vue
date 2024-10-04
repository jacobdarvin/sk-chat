<template>
  <header class="p-4 flex items-center border-b border-neutral-300 justify-between">
    <h2 class="text-2xl">{{ title }}</h2>
    <button @click="logout">Logout</button>
  </header>
</template>

<script lang="ts">
import { useUserStore } from '@/stores/user'
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'ChatHeader',
  props: {
    title: {
      type: String,
      default: 'sk-chat-v2'
    }
  },
  setup() {
    const userStore = useUserStore()
    const router = useRouter()

    const logout = () => {
      userStore.logout()
      router.push('/')
    }

    return { logout }
  }
})
</script>

<style scoped></style>
