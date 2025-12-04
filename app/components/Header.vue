<template>
  <div
    class="text-center mb-16 space-y-6 animate-in fade-in slide-in-from-top duration-700"
  >
    <!-- Logo Badge -->
    <div
      class="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-lg border border-gray-200 dark:border-gray-700"
    >
      <span class="text-2xl">📦</span>
      <span class="font-bold text-gray-900 dark:text-white">VidBox</span>
      <UBadge color="primary" size="xs">v1.0</UBadge>
    </div>

    <!-- Main Title -->
    <!-- <h1 class="text-5xl md:text-7xl font-black mb-6">
      <span
        class="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
      >
        Download Video
      </span>
      <br />
      <span class="text-gray-900 dark:text-white"> Tanpa Watermark </span>
    </h1> -->

    <!-- Subtitle -->
    <p
      class="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-light"
    >
      Convert & download dari
      <strong class="font-semibold">YouTube, TikTok, Instagram</strong> ke MP3
      atau MP4.
      <br class="hidden md:block" />
      Gratis, cepat, tanpa iklan.
    </p>

    <!-- Platform Badges -->
    <div class="flex gap-3 justify-center flex-wrap pt-4">
      <UBadge color="error" variant="soft" size="lg" class="px-4 py-2">
        <span class="mr-2">🎥</span> YouTube
      </UBadge>
      <UBadge color="neutral" variant="soft" size="lg" class="px-4 py-2">
        <span class="mr-2">🎵</span> TikTok
      </UBadge>
      <UBadge color="success" variant="soft" size="lg" class="px-4 py-2">
        <span class="mr-2">📸</span> Instagram
      </UBadge>
    </div>
  </div>
</template>
