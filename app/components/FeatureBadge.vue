<template>
  <div class="text-center space-y-1">
    <div class="text-3xl">{{ emoji }}</div>
    <div class="font-medium text-sm">{{ title }}</div>
    <div class="text-xs text-gray-500 dark:text-gray-400">{{ desc }}</div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  emoji: string
  title: string
  desc: string
}>()
</script>