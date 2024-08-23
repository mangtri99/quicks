<script setup lang="ts">
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuRoot,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from 'radix-vue'
import ButtonPrimary from './ButtonPrimary.vue'
import { ref } from 'vue'
import IconChevronDown from './icons/IconChevronDown.vue'
import TaskList from './tasks/TaskList.vue'

const accordionItems = ref([
  {
    value: 1,
    title: 'Is it accessible?',
    content: 'Yes. It adheres to the WAI-ARIA design pattern.',
    completed: false
  },
  {
    value: 2,
    title: 'Is it unstyled?',
    content: "Yes. It's unstyled by default, giving you freedom over the look and feel.",
    completed: false
  },
  {
    value: 3,
    title: 'Can it be animated?',
    content: 'Yes! You can use the transition prop to configure the animation.',
    completed: false
  }
])
</script>

<template>
  <div class="flex flex-col h-full px-8 py-6">
    <div class="flex items-center justify-between">
      <div>
        <DropdownMenuRoot>
          <DropdownMenuTrigger
            class="flex items-center px-2 py-1 space-x-2 text-sm border rounded focus:outline-none border-primary-300"
          >
            <p>My Task</p>
            <IconChevronDown class="w-2 text-[#333333] rotate-180" />
          </DropdownMenuTrigger>

          <DropdownMenuPortal>
            <DropdownMenuContent
              align="start"
              :side-offset="5"
              class="text-primary-300 outline-none bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
            >
              <DropdownMenuItem value="personal">
                <button
                  type="button"
                  class="w-full px-3 py-2 text-xs text-left rounded hover:cursor-pointer hover:outline-none hover:bg-primary-100"
                >
                  Personal Errands
                </button>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <button
                  type="button"
                  class="w-full px-3 py-2 text-xs text-left rounded hover:cursor-pointer hover:outline-none hover:bg-primary-100"
                >
                  Urgent To-Do
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenuPortal>
        </DropdownMenuRoot>
      </div>

      <div>
        <ButtonPrimary> Add Task </ButtonPrimary>
      </div>
    </div>
    <div class="flex-1 w-full h-full overflow-auto">
      <TaskList :items="accordionItems" />
    </div>
  </div>
</template>
