<template>
  <div class="flex flex-col min-h-screen bg-white">
    <!-- Chat Header -->
    <ChatHeader />

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
import { defineComponent } from 'vue'
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
  }
})
</script>

<style scoped>
/* Scoped styles if needed */
</style>
