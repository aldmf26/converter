<script setup lang="ts">
defineProps<{
  format: string;
}>();

const items = [
  {
    label: "Music",
    icon: "i-heroicons-musical-note-20-solid",
    slot: "music",
  },
  {
    label: "Video",
    icon: "i-heroicons-video-camera-20-solid",
    slot: "video",
  },
];

const dataMusic = ref([
  {
    quality: "320kbps",
    format: "MP3",
    action: "Download",
  },
  {
    quality: "256kbps",
    format: "MP3",
    action: "Download",
  },
  {
    quality: "128kbps",
    format: "MP3",
    action: "Download",
  },
]);
const dataVideo = ref([
  {
    quality: "1080p",
    format: "MP4",
    action: "Download",
  },
  {
    quality: "720p",
    format: "MP4",
    action: "Download",
  },
  {
    quality: "480p",
    format: "MP4",
    action: "Download",
  },
]);

const columnsMusic = [
  { key: "quality", label: "Quality" },
  { key: "format", label: "Format" },
  { key: "action", label: "Action" },
  // kolom tombol
];

const columnsVideo = [
  { key: "quality", label: "Quality" },
  { key: "format", label: "Format" },
  { key: "action", label: "Action" },
  // kolom tombol
];

const handleDownload = (item: any) => {
  console.log("Download:", item);
  // Nanti ini akan trigger download logic
  alert(`Download ${item.quality} ${item.format}`);
};
</script>
<template>
  <div
    class="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom duration-500"
  >
    <UCard class="shadow-2xl border-2 border-gray-200 dark:border-gray-700">
      <template #header>
        <div class="flex items-start gap-4">
          <div
            class="flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-3xl shadow-lg"
          >
            🎥
          </div>
          <div class="flex-1 min-w-0">
            <h3 class="font-bold text-xl text-gray-900 dark:text-white mb-1">
              Never Gonna Give You Up
            </h3>
            <div
              class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
            >
              <UBadge color="error" variant="subtle" size="xs">YouTube</UBadge>
              <span>•</span>
              <span>Rick Astley</span>
            </div>
          </div>
        </div>
      </template>

      <!-- Tabs -->
      <UTabs :items="items" class="w-full">
        <!-- Tab Music -->
        <template #music>
          <UTable :data="dataMusic" class="w-full"> </UTable>
        </template>

        <!-- Tab Video -->
        <template #video>
          <UTable :data="dataVideo" class="w-full"> </UTable>
        </template>
      </UTabs>

      <!-- Button Reset -->
      <template #footer>
        <UButton
          size="lg"
          color="success"
          variant="soft"
          block
          icon="i-heroicons-arrow-path"
          @click="$emit('reset')"
        >
          Convert Video Lain
        </UButton>
      </template>
    </UCard>
  </div>
</template>
