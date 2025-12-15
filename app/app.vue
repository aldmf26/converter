<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
<script setup lang="ts">
useSeoMeta({
  titleTemplate:
    "Convert & Download YouTube, TikTok, Instagram • Converter Aldi",
  description:
    "Download video YouTube, TikTok, Instagram tanpa watermark. Cepat, gratis, HD.",
  ogImage: "/og-image.jpg",
  twitterCard: "summary_large_image",
});

useHead({
  link: [
    { rel: "icon", type: "image/x-icon", href: "/img/logo.png" },
    // { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
    // { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
    // { rel: 'manifest', href: '/manifest.webmanifest' }, // kalau pakai PWA
  ],
});
</script>
