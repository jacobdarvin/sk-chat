<template>
  <div
    :class="[
      'py-2 px-4 mb-3 rounded-3xl flex flex-col',
      isMine ? 'bg-neutral-800 text-white ml-auto' : 'bg-neutral-200 text-black mr-auto'
    ]"
    :style="{
      maxWidth: 'fit-content'
    }"
  >
    <!-- Show sender only if it's not the current user's message -->
    <!-- <p v-if="!isMine" class="text-xs font-semibold mb-1">{{ message.sender }}</p> -->
    <p class="text-sm">{{ message.content }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

interface Message {
  sender_id: number
  receiver_id: number
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
