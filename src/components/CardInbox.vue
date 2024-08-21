<script setup lang="ts">
import ChatDetail from './chats/ChatDetail.vue'
import ChatList from './chats/ChatList.vue'
import { ref } from 'vue'

defineEmits(['close'])

const chatDetail = ref(false)

function showChatDetail(id: number) {
  console.log('show chat detail', id)
  chatDetail.value = true
}

function hideChatDetail() {
  chatDetail.value = false
}
</script>

<template>
  <div class="flex flex-col h-full">
    <ChatList v-if="!chatDetail" @click="showChatDetail" />
    <ChatDetail v-else @back="hideChatDetail" @close="$emit('close')" />
  </div>
</template>
