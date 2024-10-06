<!-- src/components/ChatWindow.vue -->
<template>
  <div class="flex-grow overflow-y-auto p-4 bg-neutral-50">
    <MessageBubble
      v-for="(message, index) in messages"
      :key="index"
      :message="message"
      :isMine="message.sender_id === userStore.user?.id"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, watch } from 'vue'
import MessageBubble from '@/components/MessageBubble.vue'
import { useUserStore } from '@/stores/user'
import { useChatStore } from '@/stores/chat'

export default defineComponent({
  name: 'ChatWindow',
  components: {
    MessageBubble
  },
  setup() {
    const userStore = useUserStore()
    const chatStore = useChatStore()

    const selectedUserId = computed(() => chatStore.selectedUser?.id || 0)

    const messages = computed(() => chatStore.messages)

    watch(selectedUserId, (newUserId) => {
      if (newUserId) {
        chatStore.fetchMessages(newUserId) // Fetch messages from the API or socket
      }
    })

    onMounted(() => {
      if (selectedUserId.value) {
        chatStore.fetchMessages(selectedUserId.value)
      }
    })

    return {
      messages,
      userStore
    }
  }
})
</script>
