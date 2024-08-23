<script setup lang="ts">
import {
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionRoot,
  AccordionTrigger,
  PopoverAnchor,
  PopoverContent,
  PopoverPortal,
  PopoverRoot,
  PopoverTrigger
} from 'radix-vue'

import '@vuepic/vue-datepicker/dist/main.css'

import IconChevronDown from '../icons/IconChevronDown.vue'
import IconMoreHorizontal from '../icons/IconMoreHorizontal.vue'
import IconSchedule from '../icons/IconSchedule.vue'
import IconEdit from '../icons/IconEdit.vue'
import { onMounted } from 'vue'
import { useTaskStore } from '@/stores/taskStore'
import { differenceInDays, format } from 'date-fns'
import DatePicker from '../DatePicker.vue'
import { toDate } from 'radix-vue/date'

const taskStore = useTaskStore()

onMounted(() => {
  const textareaInput = document.getElementById('textareaInput')

  textareaInput?.addEventListener('input', function () {
    // Reset the height to ensure shrinking works
    this.style.height = 'auto'

    // Calculate the new height
    this.style.height = this.scrollHeight + 'px'
  })
})

// function toggleEditDescription() {
//   isEditDescription.value = !isEditDescription.value
// }

function diffForHumans(date: string) {
  const targetDate = new Date(date)
  const today = new Date()

  const daysLeft = differenceInDays(targetDate, today)

  let message

  if (daysLeft > 1) {
    message = `${daysLeft} days left`
  } else if (daysLeft === 1) {
    message = `1 day left`
  } else if (daysLeft === 0) {
    message = `Today is the day`
  } else {
    message = `The date has passed`
  }

  return message
}

function editDescription(item: any) {
  if (item.id === taskStore.selectedTask?.id) {
    taskStore.selectedTask = null
  } else {
    taskStore.selectedTask = item
  }
}
</script>

<template>
  <AccordionRoot class="w-full" type="multiple" ref="taskListElement">
    <template v-for="item in taskStore.tasks" :key="item.value">
      <AccordionItem :value="String(item.id)" class="w-full py-[22px] border-b border-primary-300">
        <AccordionHeader class="flex items-center w-full space-x-4 text-sm">
          <input
            type="checkbox"
            class="w-4 h-4 border border-primary-300"
            @change="item.isCompleted = !item.isCompleted"
            :checked="item.isCompleted"
          />
          <div class="flex items-center justify-between flex-1">
            <div class="flex-1">
              <div class="text-left">
                <!-- <p
                  :class="[item.isCompleted ? 'line-through text-primary-300' : 'text-primary-300']"
                >
                  {{ item.title || 'Untitle Task' }}
                </p> -->
                <input
                  type="text"
                  v-model="item.title"
                  placeholder="Untitled Task"
                  class="w-[80%] truncate focus:outline-primary-200 focus:border-primary-300 focus:no-underline"
                  :class="[item.isCompleted ? 'line-through text-primary-300' : 'text-primary-300']"
                />
              </div>
            </div>
            <div class="flex items-center space-x-2 text-xs">
              <p class="text-chats-red-accent">
                <!-- Example: 2 Days Left -->
                {{ diffForHumans(item.date) }}
              </p>
              <p>
                {{ format(item.date, 'dd/MM/yyyy') }}
              </p>
            </div>
          </div>
          <AccordionTrigger class="group">
            <button type="button" class="group-data-[state=open]:rotate-180">
              <IconChevronDown class="w-2 text-primary-300" />
            </button>
          </AccordionTrigger>
          <PopoverRoot>
            <PopoverTrigger>
              <IconMoreHorizontal class="w-3 text-primary-300" />
            </PopoverTrigger>
            <PopoverAnchor />
            <PopoverPortal>
              <PopoverContent
                align="end"
                side="bottom"
                :side-offset="5"
                class="w-24 bg-white border rounded shadow-md border-primary-100"
              >
                <div>
                  <button
                    type="button"
                    @click="taskStore.removeTask(item.id)"
                    class="w-full px-3 py-2 text-xs text-left text-chats-red-accent hover:bg-chats-red"
                  >
                    Delete
                  </button>
                </div>
              </PopoverContent>
            </PopoverPortal>
          </PopoverRoot>
        </AccordionHeader>
        <AccordionContent class="mt-2 space-y-4 text-sm text-primary-300">
          <div class="flex items-center space-x-4">
            <IconSchedule
              class="w-4 h-4"
              :class="[item.date ? 'text-primary' : 'text-primary-300']"
            />
            <DatePicker
              :model-value="item.date"
              @update:model-value="
                ($event) => {
                  const createDate = toDate($event)
                  item.date = format(createDate, 'yyyy-MM-dd')
                }
              "
            />
          </div>

          <div class="flex items-center space-x-4">
            <button @click="editDescription(item)">
              <IconEdit
                class="w-4 h-4"
                :class="[
                  taskStore.selectedTask?.id === item.id ? 'text-primary' : 'text-primary-300'
                ]"
              />
            </button>
            <div class="w-full">
              <!-- <p class="text-xs" v-if="!isEditDescription">{{ item.description }}</p> -->
              <textarea
                :readonly="!taskStore.selectedTask || taskStore.selectedTask?.id !== item.id"
                id="textareaInput"
                placeholder="Add a description"
                v-model="item.description"
                class="text-xs focus:outline-none"
                :class="[
                  taskStore.selectedTask && taskStore.selectedTask.id === item.id
                    ? 'focus:ring-primary-200 focus:border focus:border-primary-200'
                    : ''
                ]"
              ></textarea>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </template>
  </AccordionRoot>
</template>

<style scoped>
textarea {
  width: 100%;
  min-height: 50px;
  max-height: 300px;
  overflow-y: hidden;
  padding: 8px;
  box-sizing: border-box;
  border-radius: 5px;
  resize: none; /* Disables manual resizing */
}
</style>
