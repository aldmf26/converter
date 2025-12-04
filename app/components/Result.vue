<script setup lang="ts">
import { h, resolveComponent } from "vue";
import type { TableColumn } from "@nuxt/ui";

const UButton = resolveComponent("UButton");
// -------------------------
// Types
// -------------------------
type BaseRow = {
  id: string;
  quality: string;
  format: string;
};

type Musics = BaseRow & { format: "MP3" };
type Videos = BaseRow & { format: "MP4" };

// -------------------------
// Tabs
// -------------------------
const items = [
  { label: "Music", icon: "i-heroicons-musical-note-20-solid", slot: "music" },
  { label: "Video", icon: "i-heroicons-video-camera-20-solid", slot: "video" },
];

// -------------------------
// Data
// -------------------------
const dataMusic = ref<Musics[]>([
  { id: "1", quality: "320kbps", format: "MP3" },
  { id: "2", quality: "256kbps", format: "MP3" },
  { id: "3", quality: "128kbps", format: "MP3" },
]);

const dataVideo = ref<Videos[]>([
  { id: "1", quality: "1080p", format: "MP4" },
  { id: "2", quality: "720p", format: "MP4" },
  { id: "3", quality: "480p", format: "MP4" },
]);

// -------------------------
// Reusable Columns Builder
// -------------------------
const createColumns = <T extends BaseRow>(): TableColumn<T>[] => [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "quality", header: "Quality" },
  { accessorKey: "format", header: "Format" },
  {
    id: "action",
    header: "Action",
    cell: ({ row }) =>
      h(
        UButton,
        {
          size: "xs",
          color: "primary",
          class: "cursor-pointer",
          icon: "i-heroicons-arrow-down-tray-20-solid",
          onClick: () => handleDownload(row.original),
        },
        () => "Download"
      ),
  },
];

// final columns
const columnsMusic = createColumns<Musics>();
const columnsVideo = createColumns<Videos>();

// -------------------------
// Handler
// -------------------------
const handleDownload = (row: BaseRow) => {
  alert(`Download id:${row.id} ${row.quality} ${row.format}`);
};
</script>

<template>
  <div
    class="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom duration-500"
  >
    <UCard class="shadow-2xl border-2 border-gray-200 dark:border-gray-700">
      <!-- Header -->
      <template #header>
        <div class="flex items-start gap-4">
          <div
            class="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-3xl shadow-lg"
          >
            🎥
          </div>

          <div class="flex-1 min-w-0">
            <h3 class="font-bold text-xl dark:text-white mb-1">
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
        <template #music>
          <UTable :data="dataMusic" :columns="columnsMusic" class="w-full" />
        </template>

        <template #video>
          <UTable :data="dataVideo" :columns="columnsVideo" class="w-full" />
        </template>
      </UTabs>

      <!-- Footer -->
      <template #footer>
        <UButton
          class="cursor-pointer"
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
