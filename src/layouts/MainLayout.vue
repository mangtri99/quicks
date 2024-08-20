<script setup lang="ts">
import IconSearch from '@/components/icons/IconSearch.vue'
</script>
<template>
  <div class="flex w-full min-h-screen bg-background font-lato">
    <aside class="block w-64 p-4 border-r border-white">Aside</aside>
    <div class="flex flex-col flex-1">
      <header class="w-full">
        <div class="relative">
          <input
            type="text"
            class="w-full px-10 py-4 text-white bg-primary-300 focus:outline-none"
          />
          <IconSearch class="absolute w-4 -translate-y-1/2 top-1/2 left-4" />
        </div>
      </header>
      <main class="relative flex-1 w-full p-4">
        <slot />
      </main>
    </div>
  </div>
</template>
