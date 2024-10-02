<template>
  <div class="flex flex-col min-h-screen bg-white">
    <!-- Chat Header -->
    <ChatHeader :title="headerTitle" />

    <!-- Main Chat Content -->
    <div class="flex flex-grow overflow-hidden">
      <UserList />
      <ChatWindow />
    </div>

    <!-- Message Input -->
    <MessageInput />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { useChatStore } from '@/stores/chat'
import ChatHeader from '@/components/ChatHeader.vue'
import ChatWindow from '@/components/ChatWindow.vue'
import UserList from '@/components/UserList.vue'
import MessageInput from '@/components/MessageInput.vue'

export default defineComponent({
  name: 'ChatView',
  components: {
    ChatHeader,
    ChatWindow,
    UserList,
    MessageInput
  },
  setup() {
    const chatStore = useChatStore()

    // Fetch online users and messages when the component is mounted
    onMounted(() => {
      chatStore.fetchOnlineUsers()
      chatStore.fetchMessages()
    })

    // Compute the header title based on the selected user
    const headerTitle = computed(() => {
      return chatStore.selectedUser?.name || 'Group Chat'
    })

    return {
      headerTitle
    }
  }
})
</script>

<style scoped>
/* Scoped styles if needed */
</style>
