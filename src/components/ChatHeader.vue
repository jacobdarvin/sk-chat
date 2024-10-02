<template>
  <header class="p-4 flex items-center border-b border-gray-300">
    <h2 class="text-2xl">{{ title }}</h2>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ChatHeader',
  props: {
    title: {
      type: String,
      default: 'sk-chat-v2'
    }
  }
})
</script>

<style scoped></style>
