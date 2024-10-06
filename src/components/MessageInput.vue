<template>
  <div class="flex items-center p-4 bg-white border-t border-neutral-300">
    <input
      v-model="messageContent"
      @keyup.enter="send"
      type="text"
      placeholder="Type your message..."
      class="flex-grow px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
    />
    <button
      @click="send"
      class="ml-4 px-4 py-2 bg-black text-white rounded-lg hover:bg-neutral-800 transition-colors"
    >
      Send
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useChatStore } from '@/stores/chat'

export default defineComponent({
  name: 'MessageInput',
  setup() {
    const messageContent = ref('')
    const chatStore = useChatStore()

    const send = () => {
      if (messageContent.value.trim()) {
        chatStore.sendMessage(messageContent.value.trim())
        messageContent.value = ''
      }
    }

    return { messageContent, send }
  }
})
</script>

<style scoped></style>
