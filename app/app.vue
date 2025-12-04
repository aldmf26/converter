<template>
  <UApp>
    <NuxtPage />
  </UApp>
</template>
<script setup lang="ts">
// app.vue atau layout/default.vue
useSeoMeta({
  titleTemplate: '%s • VidBox',
  description: 'Download video YouTube, TikTok, Instagram tanpa watermark. Cepat, gratis, HD.',
  ogImage: '/og-image.jpg',
  twitterCard: 'summary_large_image',
})
</script>