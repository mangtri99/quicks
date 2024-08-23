<script setup lang="ts">
import { cn } from '@/helpers/cn'

defineEmits(['click'])
</script>

<template>
  <button
    type="button"
    @click="$emit('click')"
    :class="
      cn(
        'px-3 py-2 text-xs text-center text-white rounded-md bg-primary hover:bg-primary/80 focus:ring-primary',
        $attrs.class
      )
    "
  >
    <slot />
  </button>
</template>
