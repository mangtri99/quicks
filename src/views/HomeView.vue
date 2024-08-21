<script setup lang="ts">
import {
  PopoverArrow,
  PopoverClose,
  PopoverContent,
  PopoverPortal,
  PopoverRoot,
  PopoverTrigger
} from 'radix-vue'
import ButtonInbox from '@/components/ButtonInbox.vue'
import ButtonTask from '@/components/ButtonTask.vue'
import IconZap from '@/components/icons/IconZap.vue'
import { ref } from 'vue'
import CardInbox from '@/components/CardInbox.vue'

type ActiveMenu = 'task' | 'inbox' | null

const isOpenQuickAction = ref(false)
const openPopover = ref(false)
const currentActiveMenu = ref<ActiveMenu>(null)

function toggleQuickAction() {
  isOpenQuickAction.value = !isOpenQuickAction.value
}

function setActiveMenu(menu: ActiveMenu) {
  if (currentActiveMenu.value === menu) {
    currentActiveMenu.value = null
    openPopover.value = false
    isOpenQuickAction.value = false
    return
  }
  currentActiveMenu.value = menu
  openPopover.value = true
}
</script>

<template>
  <div class="absolute flex items-center right-4 bottom-4 !font-lato">
    <!-- Transition slide to left -->
    <Transition
      enter-active-class="transition-opacity transition-transform duration-300 ease-out"
      enter-from-class="transform translate-x-4 opacity-0"
      enter-to-class="transform translate-x-0 opacity-100"
      leave-active-class="transition transition-opacity duration-300 ease-out transform"
      leave-from-class="transform translate-x-0 opacity-100"
      leave-to-class="transform translate-x-4 opacity-0"
    >
      <div class="flex items-center transition" v-show="isOpenQuickAction">
        <PopoverRoot :open="openPopover">
          <PopoverTrigger class="flex items-center transition">
            <div :class="['mx-2', currentActiveMenu === 'task' ? 'order-last' : '']">
              <ButtonTask
                label="Task"
                :is-open="currentActiveMenu === 'task'"
                @click="setActiveMenu('task')"
              />
            </div>

            <div :class="['mx-2', currentActiveMenu === 'inbox' ? 'order-last' : '']">
              <ButtonInbox
                label="Inbox"
                :is-open="currentActiveMenu === 'inbox'"
                @click="setActiveMenu('inbox')"
              />
            </div>
          </PopoverTrigger>
          <PopoverPortal>
            <PopoverContent
              align="end"
              side="bottom"
              :side-offset="5"
              class="mb-8 bg-white rounded w-[512px] max-w-[512px] h-[512px] shadow-sm"
            >
              <div class="flex flex-col h-full">
                <CardInbox v-if="currentActiveMenu === 'inbox'" @close="setActiveMenu('inbox')" />
                <p v-if="currentActiveMenu === 'task'">Task</p>
              </div>
            </PopoverContent>
          </PopoverPortal>
        </PopoverRoot>
      </div>
    </Transition>

    <button
      v-show="currentActiveMenu === null"
      @click="toggleQuickAction"
      class="p-5 mx-2 text-center transition-all rounded-full bg-primary hover:bg-primary/80"
    >
      <IconZap class="text-white w-7 h-7" />
    </button>
  </div>
</template>
