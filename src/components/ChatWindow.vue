<!-- src/components/ChatWindow.vue -->
<template>
  <div class="chat-window">
    <MessageBubble
      v-for="(message, index) in messages"
      :key="index"
      :message="message"
      :isMine="message.sender === userStore.user?.name"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import MessageBubble from '@/components/MessageBubble.vue'
import { useUserStore } from '@/stores/user'
import { useChatStore } from '@/stores/chat'

export default defineComponent({
  name: 'ChatWindow',
  components: {
    MessageBubble
  },
  setup() {
    const chatStore = useChatStore()
    const userStore = useUserStore()
    const messages = ref(chatStore.messages)

    // Load messages from the backend or mock data
    onMounted(() => {
      chatStore.fetchMessages()
    })

    return { messages, userStore }
  }
})
</script>

<style scoped>
/* Add your styles here */
</style>
