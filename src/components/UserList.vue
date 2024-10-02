<template>
  <div class="w-56 border-r border-gray-300">
    <h3 class="text-lg font-medium p-4">Online Users</h3>
    <ul class="list-none p-0 m-0">
      <li
        v-for="user in users"
        :key="user.id"
        :class="[
          'p-4 cursor-pointer',
          user.id === selectedUserId ? 'bg-neutral-200 font-bold' : 'hover:bg-neutral-100'
        ]"
        @click="selectUser(user)"
      >
        {{ user.name }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { useChatStore } from '@/stores/chat'
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'UserList',
  setup() {
    const chatStore = useChatStore()

    // Get the list of online users from the chat store
    const users = computed(() => chatStore.onlineUsers)

    // Get the ID of the currently selected user
    const selectedUserId = computed(() => chatStore.selectedUser?.id)

    // Function to handle user selection
    const selectUser = (user: { id: number; name: string }) => {
      chatStore.setSelectedUser(user)
      // Optionally, fetch the chat history with the selected user
      chatStore.fetchMessages(user.id)
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
