<template>
  <div
    :class="[
      'max-w-xs md:max-w-md p-3 my-2 rounded-lg flex flex-col',
      isMine ? 'bg-black text-white ml-auto' : 'bg-gray-200 text-black mr-auto'
    ]"
    :style="{
      borderTopRightRadius: isMine ? '0.75rem' : '1.5rem',
      borderTopLeftRadius: isMine ? '1.5rem' : '0.75rem'
    }"
  >
    <!-- Show sender only if it's not the current user's message -->
    <p v-if="!isMine" class="text-xs font-semibold mb-1">{{ message.sender }}</p>
    <p class="text-sm">{{ message.content }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

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

<style scoped></style>
