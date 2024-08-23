<script setup lang="ts">
import {
  PopoverAnchor,
  PopoverContent,
  PopoverPortal,
  PopoverRoot,
  PopoverTrigger
} from 'radix-vue'
import IconMoreHorizontal from '../icons/IconMoreHorizontal.vue'
import { useChatStore } from '@/stores/chatStore'

interface Props {
  id: number
  chatId: number
  isMe: boolean
  name: string
  message: string
  textClass: string
  bgClass: string
}

const { id, chatId, isMe, name, message, textClass, bgClass } = defineProps<Props>()
defineEmits(['click'])

const chatStore = useChatStore()

function edit(msg: string, msgId: number) {
  chatStore.editChat(chatId, msgId)
  chatStore.message = msg
}
</script>
<template>
  <div class="flex w-full mb-3">
    <div class="w-full" :class="[isMe ? 'order-1' : 'order-2']"></div>
    <div class="flex flex-col min-w-[30%] max-w-[70%]" :class="[isMe ? 'order-2' : 'order-1']">
      <p class="mb-2 text-xs" :class="[isMe ? 'text-right' : 'text-left', textClass]">
        {{ name }}
      </p>
      <div class="flex items-start">
        <button
          type="button"
          class="mt-1"
          :class="[isMe ? 'order-1 pr-2' : 'order-2 pl-2']"
          @click="$emit('click')"
        >
          <PopoverRoot>
            <PopoverTrigger>
              <IconMoreHorizontal class="w-3 text-[#333333]" />
            </PopoverTrigger>
            <PopoverAnchor />
            <PopoverPortal>
              <PopoverContent
                align="end"
                side="bottom"
                class="w-24 bg-white border rounded shadow-md border-primary-100"
              >
                <div>
                  <button
                    type="button"
                    @click="edit(message, id)"
                    class="w-full px-3 py-2 text-xs text-left text-chats-blue-accent hover:bg-chats-blue"
                  >
                    Edit
                  </button>
                  <hr />
                  <button
                    type="button"
                    class="w-full px-3 py-2 text-xs text-left text-chats-red-accent hover:bg-chats-red"
                  >
                    Delete
                  </button>
                </div>
              </PopoverContent>
            </PopoverPortal>
          </PopoverRoot>
        </button>
        <div
          class="w-full p-2 text-xs rounded-md text-primary-300"
          :class="[isMe ? 'order-2' : 'order-1', bgClass]"
        >
          {{ message }}
        </div>
      </div>
    </div>
  </div>
</template>
