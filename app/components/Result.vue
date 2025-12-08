<script setup lang="ts">
import { h, resolveComponent } from "vue";
import type { TableColumn } from "@nuxt/ui";

const UButton = resolveComponent("UButton");

// Get data from composable
const { videoInfo } = useVideoDownloader();

// -------------------------
// Types
// -------------------------
type QualityRow = {
  id: string;
  quality: string;
  format: string;
  size: string;
  downloadUrl: string;
};

// -------------------------
// Tabs
// -------------------------
const items = [
  { label: "Audio", icon: "i-heroicons-musical-note-20-solid", slot: "music" },
  { label: "Video", icon: "i-heroicons-video-camera-20-solid", slot: "video" },
];

// -------------------------
// Computed Data dari API
// -------------------------
const dataMusic = computed<QualityRow[]>(() => {
  if (!videoInfo.value?.qualities.audio) return [];

  return videoInfo.value.qualities.audio.map((item, index) => ({
    id: `audio-${index}`,
    quality: item.quality,
    format: item.format,
    size: item.size,
    downloadUrl: item.downloadUrl,
  }));
});

const dataVideo = computed<QualityRow[]>(() => {
  if (!videoInfo.value?.qualities.video) return [];

  return videoInfo.value.qualities.video.map((item, index) => ({
    id: `video-${index}`,
    quality: item.quality,
    format: item.format,
    size: item.size,
    downloadUrl: item.downloadUrl,
  }));
});

// -------------------------
// Columns
// -------------------------
const createColumns = (): TableColumn<QualityRow>[] => [
  { accessorKey: "quality", header: "Quality" },
  { accessorKey: "format", header: "Format" },
  { accessorKey: "size", header: "Size" },
  {
    id: "action",
    header: "Action",
    cell: ({ row }) =>
      h(
        UButton,
        {
          size: "sm",
          color: "primary",
          class: "cursor-pointer",
          icon: "i-heroicons-arrow-down-tray-20-solid",
          onClick: () => handleDownload(row.original),
        },
        () => "Download"
      ),
  },
];

const columnsMusic = createColumns();
const columnsVideo = createColumns();

// -------------------------
// Platform Badge Color
// -------------------------
const platformColor = computed(() => {
  const colors: Record<string, string> = {
    youtube: "error",
    tiktok: "success",
    instagram: "neutral",
  };
  return colors[videoInfo.value?.platform || ""] || "gray";
});

// -------------------------
// Platform Icon
// -------------------------
const platformIcon = computed(() => {
  const icons: Record<string, string> = {
    youtube: "🎥",
    tiktok: "🎵",
    instagram: "📸",
  };
  return icons[videoInfo.value?.platform || ""] || "🎬";
});

// -------------------------
// Handler - Download REAL
// -------------------------
const isDownloading = ref(false);

const handleDownload = async (row: QualityRow) => {
  if (isDownloading.value || !videoInfo.value) return;

  isDownloading.value = true;

  try {
    // Trigger download dengan itag specific
    const downloadUrl = row.downloadUrl;

    // Open in new window to trigger download
    window.open(downloadUrl, "_blank");

    console.log("Downloading:", {
      title: videoInfo.value.title,
      quality: row.quality,
      format: row.format,
    });
  } catch (error: any) {
    alert("Gagal download. Coba lagi.");
    console.error("Download error:", error);
  } finally {
    // Reset setelah 2 detik
    setTimeout(() => {
      isDownloading.value = false;
    }, 2000);
  }
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
          <!-- Info -->
          <div class="flex-1 min-w-0">
            <h3 class="font-bold text-xl dark:text-white mb-1">
              {{ videoInfo?.title || "Loading..." }}
            </h3>
            <div
              class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
            >
              <UBadge :color="platformColor" size="xs">
                {{ videoInfo?.platform?.toUpperCase() }}
              </UBadge>
              <span v-if="videoInfo?.duration">•</span>
              <span v-if="videoInfo?.duration">{{ videoInfo.duration }}</span>
            </div>
          </div>
        </div>
      </template>

      <!-- Thumbnail (Optional) -->
      <div v-if="videoInfo?.thumbnail" class="mb-6 rounded-xl overflow-hidden">
        <img
          :src="videoInfo.thumbnail"
          :alt="videoInfo.title"
          class="w-full h-auto"
        />
      </div>

      <!-- Tabs -->
      <UTabs :items="items" class="w-full">
        <template #music>
          <UTable
            v-if="dataMusic.length > 0"
            :data="dataMusic"
            :columns="columnsMusic"
            class="w-full"
          />
          <div v-else class="text-center py-8 text-gray-500">
            No audio qualities available
          </div>
        </template>

        <template #video>
          <UTable
            v-if="dataVideo.length > 0"
            :data="dataVideo"
            :columns="columnsVideo"
            class="w-full"
          />
          <div v-else class="text-center py-8 text-gray-500">
            No video qualities available
          </div>
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
