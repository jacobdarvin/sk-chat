<!-- src/views/ChatView.vue -->
<template>
  <div class="chat-container">
    <ChatHeader />
    <div class="chat-content">
      <UserList />
      <ChatWindow />
    </div>
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
/* Add your styles here */
</style>
