<!-- src/components/UserList.vue -->
<template>
  <div class="w-56 border-r border-neutral-300">
    <h3 class="text-lg font-medium p-4 flex items-center">
      <span class="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
      Online Users ({{ users.length }})
    </h3>
    <ul class="list-none p-0 m-0">
      <li
        v-for="user in users"
        :key="user.id"
        :class="[
          'p-4 cursor-pointer',
          user.id === selectedUserId ? 'bg-neutral-200 font-medium' : 'hover:bg-neutral-100'
        ]"
        @click="selectUser(user)"
      >
        {{ user.username }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useChatStore } from '@/stores/chat'

export default defineComponent({
  name: 'UserList',
  setup() {
    const chatStore = useChatStore()

    // Get the list of online users from the chat store
    const users = computed(() => chatStore.onlineUsers)

    // Get the ID of the currently selected user
    const selectedUserId = computed(() => chatStore.selectedUser?.id)

    // Function to handle user selection
    const selectUser = (user: { id: number; username: string; email: string }) => {
      chatStore.setSelectedUser(user)
    }

    return {
      users,
      selectedUserId,
      selectUser
    }
  }
})
</script>

<style scoped></style>
