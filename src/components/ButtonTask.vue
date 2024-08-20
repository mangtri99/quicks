<script setup lang="ts">
import IconReader from './icons/IconReader.vue'
import { cn } from '@/helpers/cn'

interface ButtonTaskProps {
  label: string
  isOpen?: boolean
}

const { label = 'Task', isOpen = false } = defineProps<ButtonTaskProps>()
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
            ? 'ml-4 bg-indicator-orange hover:bg-indicator-orange/80'
            : 'bg-white hover:bg-white/80'
        )
      "
      @click="$emit('click')"
    >
      <IconReader
        :class="cn('w-7 h-7 transition-all', isOpen ? 'text-white' : 'text-indicator-orange')"
      />
    </button>
  </div>
</template>
