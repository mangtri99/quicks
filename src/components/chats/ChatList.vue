<script setup lang="ts">
import { format } from 'date-fns'
import IconPerson from '../icons/IconPerson.vue'
import { useChatStore } from '@/stores/chatStore'
import { computed, ref } from 'vue'
import IconSearch from '../icons/IconSearch.vue'

const emit = defineEmits<{
  click: [id: number]
}>()

const chatStore = useChatStore()
const search = ref('')

const filteredSearch = computed(() => {
  return chatStore.chats.filter((chat) => {
    return chat.title.toLowerCase().includes(search.value.toLowerCase())
  })
})
</script>

<template>
  <div class="flex flex-col h-full px-8 py-6">
    <div class="relative">
      <input
        v-model="search"
        class="w-full px-10 py-2 text-black border rounded-sm focus:outline-none focus:ring-blue placeholder:text-black"
        type="text"
        placeholder="Search"
      />
      <button class="absolute py-1 top-2 right-8 text-primary-300">
        <IconSearch class="w-4 h-4" />
      </button>
    </div>
    <div class="flex flex-col flex-1 overflow-y-auto scroll-smooth">
      <a
        @click="emit('click', chat.id)"
        role="button"
        class="py-[22px] block w-full border-b border-primary-200 last:border-0"
        v-for="chat in filteredSearch"
        :key="chat.id"
      >
        <div class="flex items-center w-full space-x-3">
          <div class="relative flex items-center w-16" v-if="chat.isGroup">
            <div class="rounded-full flex items-center p-3 justify-center bg-[#E0E0E0]">
              <IconPerson class="w-3 h-3 text-primary-300" />
            </div>
            <div
              class="flex items-center justify-center p-3 -translate-x-1/2 rounded-full bg-primary"
            >
              <IconPerson class="w-3 h-3 text-white" />
            </div>
          </div>
          <div class="flex items-center justify-center w-20" v-else>
            <div
              class="relative flex items-center justify-center p-4 text-center rounded-full bg-primary"
            >
              <p class="absolute text-white -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                {{ chat.name.charAt(0) }}
              </p>
            </div>
          </div>
          <div class="w-full">
            <div class="flex items-start justify-between">
              <p class="text-sm font-medium text-primary line-clamp-2">{{ chat.title }}</p>
              <p class="ml-2 text-xs font-normal text-primary-300 text-nowrap">
                <!-- 29 January 2024, 19:10 -->
                {{ format(chat.updatedAt, 'd MMMM yyyy, HH:mm') }}
              </p>
            </div>
            <p class="text-xs font-medium text-primary-300">
              {{ chat.name }}
            </p>
            <p class="text-xs text-primary-300">
              {{ chat.description }}
            </p>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>
