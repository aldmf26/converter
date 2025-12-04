<script setup lang="ts">
const url = ref("");
const format = ref<"mp3" | "mp4">("mp4");
const showResult = ref(false);

// Dummy action untuk demo UI
const handleConvert = () => {
  showResult.value = true;
};

const reset = () => {
  showResult.value = false;
  url.value = "";
};

useSeoMeta({
  title: "VidBox - Download YouTube, TikTok, Instagram",
  description:
    "Download video & audio dari YouTube, TikTok, Instagram tanpa watermark. Gratis selamanya.",
});

const pasteFromClipboard = async () => {
  try {
    const text = await navigator.clipboard.readText();
    url.value = text;
  } catch (err) {
    alert("Tidak bisa paste, izin clipboard ditolak.");
  }
};
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950"
  >
    <!-- Hero Section -->
    <div class="relative overflow-hidden">
      <!-- Background Decoration -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          class="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30 animate-blob"
        ></div>
        <div
          class="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30 animate-blob animation-delay-2000"
        ></div>
        <div
          class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-300 dark:bg-pink-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30 animate-blob animation-delay-4000"
        ></div>
      </div>

      <UContainer class="relative py-16 md:py-24 px-4">
        <!-- Header -->
        <Header />

        <!-- Main Card - Input Section -->
        <div
          v-if="!showResult"
          class="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom duration-700 delay-100"
        >
          <UCard
            class="shadow-2xl border-2 border-gray-200 dark:border-gray-700 backdrop-blur-sm bg-white/95 dark:bg-gray-900/95"
          >
            <div class="space-y-8 p-4 md:p-8">
              <!-- Step 1 -->
              <div class="space-y-4">
                <div class="flex items-center gap-3">
                  <div
                    class="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white font-bold shadow-lg"
                  >
                    1
                  </div>
                  <h3
                    class="text-lg font-semibold text-gray-900 dark:text-white"
                  >
                    Paste link video
                  </h3>
                  <!-- TOMBOL CLEAR -->
                  <UButton
                    variant="soft"
                    color="primary"
                    icon="i-heroicons-clipboard-20-solid"
                    :padded="false"
                    class="ms-2 cursor-pointer"
                    @click="pasteFromClipboard"
                    >Paste</UButton
                  >
                  <UButton
                    v-if="url"
                    variant="soft"
                    color="error"
                    class="cursor-pointer"
                    icon="i-heroicons-x-mark-20-solid"
                    :padded="false"
                    @click="url = ''"
                  />
                </div>

                <UInput
                  v-model="url"
                  size="xl"
                  placeholder="https://youtube.com/watch?v=dQw4w9WgXcQ"
                  icon="i-heroicons-link"
                  :ui="{
                    base: 'text-lg',
                  }"
                  class="text-lg shadow-lg w-full"
                >
                </UInput>
              </div>

              <!-- Convert Button -->
              <UButton
                size="xl"
                block
                color="primary"
                class="text-lg cursor-pointer font-semibold shadow-lg hover:shadow-xl transition-shadow"
                :disabled="!url"
                @click="handleConvert"
              >
                <span class="i-heroicons-sparkles w-6 h-6 mr-2" />
                Search
              </UButton>

              <!-- Features Grid -->
              <div
                class="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200 dark:border-gray-800"
              >
                <div class="text-center space-y-2">
                  <div class="text-3xl">⚡</div>
                  <div
                    class="text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Super Cepat
                  </div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">
                    Proses instan
                  </div>
                </div>
                <div class="text-center space-y-2">
                  <div class="text-3xl">🚫</div>
                  <div
                    class="text-sm font-medium text-gray-900 dark:text-white"
                  >
                    No Watermark
                  </div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">
                    100% bersih
                  </div>
                </div>
                <div class="text-center space-y-2">
                  <div class="text-3xl">🎁</div>
                  <div
                    class="text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Gratis
                  </div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">
                    Selamanya
                  </div>
                </div>
              </div>
            </div>
          </UCard>
        </div>

        <!-- Result Section (Demo) -->
        <div
          v-else
          class="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom duration-500"
        >
          <Result :format="format" @reset="reset" />
        </div>
      </UContainer>
    </div>

    <!-- Features Section -->
    <div class="py-16 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
      <UContainer class="px-4">
        <h2
          class="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white"
        >
          Kenapa Pilih VidBox?
        </h2>

        <div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <!-- Feature 1 -->
          <div
            class="text-center space-y-4 p-6 rounded-2xl hover:bg-white/80 dark:hover:bg-gray-800/80 transition-colors"
          >
            <div
              class="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-3xl shadow-lg"
            >
              ⚡
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white">
              Lightning Fast
            </h3>
            <p class="text-gray-600 dark:text-gray-400">
              Proses convert dalam hitungan detik. Tidak ada antrian, langsung
              download.
            </p>
          </div>

          <!-- Feature 2 -->
          <div
            class="text-center space-y-4 p-6 rounded-2xl hover:bg-white/80 dark:hover:bg-gray-800/80 transition-colors"
          >
            <div
              class="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-3xl shadow-lg"
            >
              🎯
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white">
              HD Quality
            </h3>
            <p class="text-gray-600 dark:text-gray-400">
              Download video hingga 1080p dan audio dengan bitrate tertinggi.
            </p>
          </div>

          <!-- Feature 3 -->
          <div
            class="text-center space-y-4 p-6 rounded-2xl hover:bg-white/80 dark:hover:bg-gray-800/80 transition-colors"
          >
            <div
              class="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center text-3xl shadow-lg"
            >
              🔒
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white">
              Privacy First
            </h3>
            <p class="text-gray-600 dark:text-gray-400">
              Tidak menyimpan data atau riwayat download. 100% private & secure.
            </p>
          </div>
        </div>
      </UContainer>
    </div>

    <!-- Footer -->
    <div class="py-8 border-t border-gray-200 dark:border-gray-800">
      <UContainer class="px-4">
        <div class="text-center text-sm text-gray-600 dark:text-gray-400">
          <p>© 2025 VidBox Converter • Made with ❤️ for creators</p>
        </div>
      </UContainer>
    </div>
  </div>
</template>

<style scoped>
@keyframes blob {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  25% {
    transform: translate(20px, -50px) scale(1.1);
  }
  50% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  75% {
    transform: translate(50px, 50px) scale(1.05);
  }
}

.animate-blob {
  animation: blob 20s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

.hover\:scale-102:hover {
  transform: scale(1.02);
}
</style>
