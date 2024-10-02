<!-- src/components/MessageInput.vue -->
<template>
  <div class="message-input">
    <input
      v-model="message"
      @keyup.enter="sendMessage"
      type="text"
      placeholder="Type your message..."
    />
    <button @click="sendMessage">Send</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useChatStore } from '@/stores/chat'

export default defineComponent({
  name: 'MessageInput',
  setup() {
    const message = ref('')
    const chatStore = useChatStore()

    const sendMessage = () => {
      if (message.value.trim()) {
        chatStore.sendMessage(message.value.trim())
        message.value = ''
      }
    }

    return { message, sendMessage }
  }
})
</script>

<style scoped>
/* Add your styles here */
</style>
