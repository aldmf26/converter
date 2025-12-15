<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
<script setup lang="ts">
useSeoMeta({
  titleTemplate: "%s - JeneryMF Tools",
  description: "",
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
