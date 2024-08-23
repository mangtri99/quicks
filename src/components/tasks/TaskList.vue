<script setup lang="ts">
import {
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionRoot,
  AccordionTrigger
} from 'radix-vue'
import IconChevronDown from '../icons/IconChevronDown.vue'
import IconMoreHorizontal from '../icons/IconMoreHorizontal.vue'
import IconSchedule from '../icons/IconSchedule.vue'
import IconEdit from '../icons/IconEdit.vue'
import { onMounted, ref } from 'vue'
interface Props {
  items: any[]
}

defineProps<Props>()

onMounted(() => {
  const textareaInput = document.getElementById('textareaInput')

  textareaInput?.addEventListener('input', function () {
    // Reset the height to ensure shrinking works
    this.style.height = 'auto'

    // Calculate the new height
    this.style.height = this.scrollHeight + 'px'
  })
})

const isEditDescription = ref(false)

function toggleEditDescription() {
  isEditDescription.value = !isEditDescription.value
}
</script>

<template>
  <AccordionRoot class="w-full" type="multiple">
    <template v-for="item in items" :key="item.value">
      <AccordionItem
        :value="String(item.value)"
        class="w-full py-[22px] border-b border-primary-300"
      >
        <AccordionHeader class="flex items-center w-full space-x-4 text-sm">
          <input
            type="checkbox"
            class="w-4 h-4 border border-primary-300"
            @change="item.completed = !item.completed"
            :checked="item.completed"
          />
          <div class="flex items-center justify-between flex-1">
            <div class="flex-1">
              <div class="text-left">
                <p :class="[item.completed ? 'line-through text-primary-300' : 'text-primary-300']">
                  {{ item.title }}
                </p>
                <!-- <input
                  type="text"
                  v-model="item.title"
                  class="truncate focus:outline-none"
                  readonly
                /> -->
              </div>
            </div>
            <div class="flex items-center space-x-2 text-xs">
              <p class="text-chats-red-accent">2 Days Left</p>
              <p>12/06/2021</p>
            </div>
          </div>
          <AccordionTrigger class="group">
            <button type="button" class="group-data-[state=open]:rotate-180">
              <IconChevronDown class="w-2 text-primary-300" />
            </button>
          </AccordionTrigger>
          <button type="button">
            <IconMoreHorizontal class="w-2 text-primary-300" />
          </button>
        </AccordionHeader>
        <AccordionContent class="mt-2 space-y-4 text-sm text-primary-300">
          <div class="flex items-center space-x-4">
            <IconSchedule class="w-4 h-4" />
            <div>Date</div>
          </div>

          <div class="flex items-center space-x-4">
            <button @click="toggleEditDescription">
              <IconEdit
                class="w-4 h-4"
                :class="[isEditDescription ? 'text-primary' : 'text-primary-300']"
              />
            </button>
            <div class="w-full">
              <p class="text-xs" v-if="!isEditDescription">{{ item.content }}</p>
              <textarea
                id="textareaInput"
                v-else
                v-model="item.content"
                class="text-xs focus:outline-none focus:ring-primary-200 focus:border focus:border-primary-200"
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
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: none; /* Disables manual resizing */
}
</style>
