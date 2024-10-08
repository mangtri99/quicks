<script setup lang="ts">
import { useChatStore } from '@/stores/chatStore'
import IconArrowLeft from '../icons/IconArrowLeft.vue'
import IconX from '../icons/IconX.vue'
import { computed, onMounted, ref } from 'vue'
import ChatBubble from './ChatBubble.vue'
import { format } from 'date-fns'
import { useScroll } from '@vueuse/core'

interface Props {
  chatId: number
}

const { chatId } = defineProps<Props>()

defineEmits(['close', 'back'])

const chatStore = useChatStore()

const chatContent = ref<HTMLElement | null>(null)
const { y } = useScroll(chatContent)

onMounted(() => {
  // scroll to bottom
  y.value = chatContent.value?.scrollHeight || 0
})

const getChatById = computed(() => {
  return chatStore.chats.find((chat) => chat.id === chatId)
})

const getChatDetailsById = computed(() => {
  return chatStore.chatDetails.find((chat) => chat.chat_id === chatId)
})

const countParticipant = computed(() => {
  // group by userId
  const groupByUserId = getChatDetailsById.value?.converations.reduce((acc: any, chat) => {
    if (!acc[chat.userId]) {
      acc[chat.userId] = 0
    }
    acc[chat.userId]++
    return acc
  }, {})
  return Object.keys(groupByUserId || {}).length
})

const groupByDate = computed(() => {
  return getChatDetailsById.value?.converations.reduce((acc: any, conversation) => {
    const date = conversation.date.split('T')[0] // Extract the date part (YYYY-MM-DD)

    if (!acc[date]) {
      acc[date] = []
    }

    acc[date].push(conversation)

    return acc
  }, {}) as Record<string, any[]>
})

function sendChat(chatId: number) {
  chatStore.sendChat(chatId, chatStore.message)
  chatStore.message = ''
  chatStore.clearSelectedChat()
  // scroll to bottom
  setTimeout(() => {
    y.value = chatContent.value?.scrollHeight || 0
  }, 100)
}
</script>

<template>
  <div class="relative flex flex-col h-full">
    <div class="flex items-center justify-between px-6 py-4 space-x-3">
      <div>
        <button type="button" @click="$emit('back')">
          <IconArrowLeft class="w-4 h-4 text-[#333333]" />
        </button>
      </div>

      <div class="flex-1 space-y-2">
        <p class="text-sm font-medium text-primary">
          {{ getChatById?.title }}
        </p>
        <p v-if="getChatById?.isGroup" class="text-xs text-primary-300">
          {{ countParticipant }} Participant
        </p>
      </div>

      <div>
        <button type="button" @click="$emit('close')">
          <IconX class="w-4 h-4 text-[#333333]" />
        </button>
      </div>
    </div>

    <hr />

    <div class="flex-1 w-full h-full px-4 py-2 overflow-auto" ref="chatContent">
      <template v-for="group in groupByDate" :key="group">
        <div class="relative w-full my-3 border-b border-primary-300">
          <p
            class="absolute px-4 text-xs text-black -translate-x-1/2 -translate-y-1/2 bg-white top-1/2 left-1/2"
          >
            <!-- Example: June 09, 2024 -->
            {{ format(new Date(group[0].date), 'MMMM dd, yyyy') }}
          </p>
        </div>
        <template v-for="(chat, index) in group" :key="index">
          <ChatBubble
            :id="chat.id"
            :chat-id="chatId"
            :bg-class="chat.bgClass"
            :is-me="chat.isMe"
            :message="chat.message"
            :name="chat.name"
            :text-class="chat.textClass"
          />
        </template>
      </template>
    </div>

    <div class="px-4 py-2">
      <form @submit.prevent="sendChat(chatId)">
        <div
          class="flex items-center justify-between px-2 py-1 text-xs bg-sticker-400"
          v-if="chatStore.selectedChat"
        >
          <div>
            <p>Edit</p>
            <p class="truncate text-primary-200">{{ chatStore.selectedChat.message }}</p>
          </div>
          <button type="button" @click="chatStore.clearSelectedChat">
            <IconX class="w-2 h-2 text-primary-300" />
          </button>
        </div>
        <div class="flex items-center space-x-3">
          <input
            placeholder="Type to text"
            class="w-full px-3 py-1 text-sm border rounded-md border-primary-200 text-primary-300 focus:ring-primary focus:outline-primary"
            type="text"
            v-model="chatStore.message"
          />
          <button
            type="submit"
            class="px-3 py-2 text-xs text-center text-white rounded-md bg-primary hover:bg-primary/80 focus:ring-primary"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
