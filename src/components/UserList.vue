<!-- src/components/UserList.vue -->
<template>
  <div class="user-list">
    <h3>Online Users</h3>
    <ul>
      <li
        v-for="user in users"
        :key="user.id"
        :class="{ active: user.id === selectedUserId }"
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

<style scoped>
.user-list {
  width: 200px;
  border-right: 1px solid #ccc;
}

.user-list h3 {
  margin: 0;
  padding: 16px;
  background-color: #f5f5f5;
}

.user-list ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.user-list li {
  padding: 12px 16px;
  cursor: pointer;
}

.user-list li:hover {
  background-color: #e9e9e9;
}

.user-list li.active {
  background-color: #d9d9d9;
  font-weight: bold;
}
</style>
