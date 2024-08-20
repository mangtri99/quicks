<script setup lang="ts">
import { cn } from '@/helpers/cn'
import IconQuestionAnswer from './icons/IconQuestionAnswer.vue'

interface ButtonTaskProps {
  label: string
  isOpen?: boolean
}

const { label = 'Inbox', isOpen = false } = defineProps<ButtonTaskProps>()
defineEmits(['click'])
</script>

<template>
  <div :class="cn('relative rounded-full bg-primary-300')">
    <p class="absolute top-0 text-center text-white -translate-x-1/2 -translate-y-7 left-1/2">
      {{ label }}
    </p>
    <button
      :class="
        cn(
          'p-5 text-center transition-all rounded-full',
          isOpen
            ? 'ml-4 bg-indicator-purple hover:bg-indicator-purple/80'
            : 'bg-white hover:bg-white/80'
        )
      "
      @click="$emit('click')"
    >
      <IconQuestionAnswer
        :class="cn('w-7 h-7 transition-all', isOpen ? 'text-white' : 'text-indicator-purple')"
      />
    </button>
  </div>
</template>
