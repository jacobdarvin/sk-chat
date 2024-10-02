<!-- src/components/ChatHeader.vue -->
<template>
  <header class="chat-header">
    <h2>{{ title }}</h2>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ChatHeader',
  props: {
    title: {
      type: String,
      default: 'Chat Room'
    }
  }
})
</script>

<style scoped>
/* Add your styles here */
</style>
