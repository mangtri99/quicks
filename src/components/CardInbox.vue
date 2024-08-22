<script setup lang="ts">
import ChatDetail from './chats/ChatDetail.vue'
import ChatList from './chats/ChatList.vue'
import { ref } from 'vue'

defineEmits(['close'])

const selectedChatId = ref<number | null>(null)

function showChatDetail(id: number) {
  console.log('show chat detail', id)
  selectedChatId.value = id
}

function hideChatDetail() {
  selectedChatId.value = null
}
</script>

<template>
  <div class="flex flex-col h-full">
    <ChatList v-if="!selectedChatId" @click="showChatDetail" />
    <ChatDetail v-else @back="hideChatDetail" @close="$emit('close')" :chat-id="selectedChatId" />
  </div>
</template>
