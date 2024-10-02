<!-- src/components/MessageBubble.vue -->
<template>
  <div :class="['message-bubble', { mine: isMine }]">
    <p class="sender">{{ message.sender }}</p>
    <p class="content">{{ message.content }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

interface Message {
  sender: string
  content: string
  timestamp: string
}

export default defineComponent({
  name: 'MessageBubble',
  props: {
    message: {
      type: Object as PropType<Message>,
      required: true
    },
    isMine: {
      type: Boolean,
      default: false
    }
  }
})
</script>

<style scoped>
.message-bubble {
  /* Add styles for message bubble */
}
.message-bubble.mine {
  /* Add styles for your own messages */
}
</style>
