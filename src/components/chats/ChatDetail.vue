<script setup lang="ts">
import { useChatStore } from '@/stores/chatStore'
import IconArrowLeft from '../icons/IconArrowLeft.vue'
import IconX from '../icons/IconX.vue'
import IconMoreHorizontal from '../icons/IconMoreHorizontal.vue'
import { computed, onMounted } from 'vue'

defineEmits(['close', 'back'])

const chatStore = useChatStore()

onMounted(() => {
  // scroll to bottom
  const chatContainer = document.querySelector('#chats-content')
  chatContainer?.scrollTo(0, chatContainer.scrollHeight)
})

const countParticipant = computed(() => {
  // group by userId
  const groupByUserId = chatStore.chatDetails.converations.reduce((acc, chat) => {
    if (!acc[chat.userId]) {
      acc[chat.userId] = 0
    }
    acc[chat.userId]++
    return acc
  }, {})
  return Object.keys(groupByUserId).length
})
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
        <p class="text-sm font-medium text-primary">Lorem Ipsum Dolor Sit Amet</p>
        <p class="text-xs text-primary-300">{{ countParticipant }} Participant</p>
      </div>

      <div>
        <button type="button" @click="$emit('close')">
          <IconX class="w-4 h-4 text-[#333333]" />
        </button>
      </div>
    </div>

    <hr />

    <div class="flex-1 w-full h-full px-4 py-2 overflow-auto" id="chats-content">
      <div
        class="flex w-full mb-3"
        v-for="chat in chatStore.chatDetails.converations"
        :key="chat.id"
      >
        <div class="w-full" :class="[chat.isMe ? 'order-1' : 'order-2']"></div>
        <div class="flex flex-col max-w-[70%]" :class="[chat.isMe ? 'order-2' : 'order-1']">
          <p class="mb-2 text-xs" :class="[chat.isMe ? 'text-right' : 'text-left', chat.textClass]">
            {{ chat.name }}
          </p>
          <div class="flex items-start">
            <button
              type="button"
              class="mt-1"
              :class="[chat.isMe ? 'order-1 pr-2' : 'order-2 pl-2']"
            >
              <IconMoreHorizontal class="w-3 text-[#333333]" />
            </button>
            <div
              class="p-2 text-xs rounded-md text-primary-300"
              :class="[chat.isMe ? 'order-2' : 'order-1', chat.bgClass]"
            >
              {{ chat.message }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="px-4 py-2">
      <div class="flex items-center space-x-3">
        <input
          placeholder="Type to text"
          class="w-full px-3 py-1 text-sm border rounded-md border-primary-200 text-primary-300 focus:ring-primary-300 focus:outline-primary-300"
          type="text"
          name=""
          id=""
        />
        <button
          class="px-3 py-2 text-xs text-center text-white rounded-md bg-primary hover:bg-primary/80 focus:ring-primary"
        >
          Send
        </button>
      </div>
    </div>
  </div>
</template>
