<template>
  <div class="flex-grow overflow-y-auto p-4 bg-neutral-50">
    <MessageBubble
      v-for="(message, index) in messages"
      :key="index"
      :message="message"
      :isMine="message.sender === userStore.user?.name"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, watch } from 'vue'
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

    const messages = computed(() => chatStore.messages)

    // Watch for changes in the selected user
    watch(
      () => chatStore.selectedUser,
      (newUser, oldUser) => {
        if (newUser?.id !== oldUser?.id) {
          chatStore.fetchMessages(newUser?.id)
        }
      },
      { immediate: true }
    )

    return { messages, userStore }
  }
})
</script>

<style scoped></style>
