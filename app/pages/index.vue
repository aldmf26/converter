<script setup lang="ts">
const url = ref('')
const format = ref<'mp3' | 'mp4'>('mp4')
const showResult = ref(false)

// Dummy action untuk demo UI
const handleConvert = () => {
  showResult.value = true
}

const reset = () => {
  showResult.value = false
  url.value = ''
}

useSeoMeta({
  title: 'VidBox - Download YouTube, TikTok, Instagram',
  description: 'Download video & audio dari YouTube, TikTok, Instagram tanpa watermark. Gratis selamanya.'
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950">
    
    <!-- Hero Section -->
    <div class="relative overflow-hidden">
      <!-- Background Decoration -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30 animate-blob"></div>
        <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-300 dark:bg-pink-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <UContainer class="relative py-16 md:py-24 px-4">
        
        <!-- Header -->
        <div class="text-center mb-16 space-y-6 animate-in fade-in slide-in-from-top duration-700">
          <!-- Logo Badge -->
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-lg border border-gray-200 dark:border-gray-700">
            <span class="text-2xl">📦</span>
            <span class="font-bold text-gray-900 dark:text-white">VidBox</span>
            <UBadge color="primary" size="xs">v1.0</UBadge>
          </div>

          <!-- Main Title -->
          <h1 class="text-5xl md:text-7xl font-black mb-6">
            <span class="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Download Video
            </span>
            <br>
            <span class="text-gray-900 dark:text-white">
              Tanpa Watermark
            </span>
          </h1>

          <!-- Subtitle -->
          <p class="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-light">
            Convert & download dari <strong class="font-semibold">YouTube, TikTok, Instagram</strong> ke MP3 atau MP4.
            <br class="hidden md:block">
            Gratis, cepat, tanpa iklan.
          </p>

          <!-- Platform Badges -->
          <div class="flex gap-3 justify-center flex-wrap pt-4">
            <UBadge color="red" variant="soft" size="lg" class="px-4 py-2">
              <span class="mr-2">🎥</span> YouTube
            </UBadge>
            <UBadge color="gray" variant="soft" size="lg" class="px-4 py-2">
              <span class="mr-2">🎵</span> TikTok
            </UBadge>
            <UBadge color="pink" variant="soft" size="lg" class="px-4 py-2">
              <span class="mr-2">📸</span> Instagram
            </UBadge>
          </div>
        </div>

        <!-- Main Card - Input Section -->
        <div v-if="!showResult" class="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom duration-700 delay-100">
          <UCard class="shadow-2xl border-2 border-gray-200 dark:border-gray-700 backdrop-blur-sm bg-white/95 dark:bg-gray-900/95">
            <div class="space-y-8 p-4 md:p-8">
              
              <!-- Step 1 -->
              <div class="space-y-4">
                <div class="flex items-center gap-3">
                  <div class="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white font-bold shadow-lg">
                    1
                  </div>
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                    Paste link video
                  </h3>
                </div>
                
                <UInput
                  v-model="url"
                  size="xl"
                  placeholder="https://youtube.com/watch?v=dQw4w9WgXcQ"
                  icon="i-heroicons-link"
                  :ui="{ 
                    icon: { trailing: { pointer: '' } },
                    base: 'text-lg'
                  }"
                  class="text-lg"
                >
                  <template #trailing>
                    <UButton
                      v-if="url"
                      color="gray"
                      variant="link"
                      icon="i-heroicons-x-mark-20-solid"
                      :padded="false"
                      @click="url = ''"
                    />
                  </template>
                </UInput>
              </div>

              <!-- Step 2 -->
              <div class="space-y-4">
                <div class="flex items-center gap-3">
                  <div class="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 text-white font-bold shadow-lg">
                    2
                  </div>
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                    Pilih format output
                  </h3>
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <!-- MP4 Option -->
                  <button
                    class="group relative p-6 rounded-2xl border-2 transition-all duration-300"
                    :class="format === 'mp4' 
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30 shadow-lg scale-105' 
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:scale-102'"
                    @click="format = 'mp4'"
                  >
                    <div class="flex flex-col items-center gap-3">
                      <div class="text-4xl">🎬</div>
                      <div class="text-center">
                        <div class="font-bold text-lg text-gray-900 dark:text-white">MP4</div>
                        <div class="text-sm text-gray-600 dark:text-gray-400">Video Full HD</div>
                      </div>
                      <UBadge 
                        v-if="format === 'mp4'" 
                        color="primary" 
                        size="xs"
                        class="absolute top-3 right-3"
                      >
                        ✓ Dipilih
                      </UBadge>
                    </div>
                  </button>

                  <!-- MP3 Option -->
                  <button
                    class="group relative p-6 rounded-2xl border-2 transition-all duration-300"
                    :class="format === 'mp3' 
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30 shadow-lg scale-105' 
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:scale-102'"
                    @click="format = 'mp3'"
                  >
                    <div class="flex flex-col items-center gap-3">
                      <div class="text-4xl">🎵</div>
                      <div class="text-center">
                        <div class="font-bold text-lg text-gray-900 dark:text-white">MP3</div>
                        <div class="text-sm text-gray-600 dark:text-gray-400">Audio Only</div>
                      </div>
                      <UBadge 
                        v-if="format === 'mp3'" 
                        color="primary" 
                        size="xs"
                        class="absolute top-3 right-3"
                      >
                        ✓ Dipilih
                      </UBadge>
                    </div>
                  </button>
                </div>
              </div>

              <!-- Convert Button -->
              <UButton
                size="xl"
                block
                color="primary"
                class="text-lg font-semibold shadow-lg hover:shadow-xl transition-shadow"
                :disabled="!url"
                @click="handleConvert"
              >
                <span class="i-heroicons-sparkles w-6 h-6 mr-2" />
                Convert & Download
              </UButton>

              <!-- Features Grid -->
              <div class="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200 dark:border-gray-800">
                <div class="text-center space-y-2">
                  <div class="text-3xl">⚡</div>
                  <div class="text-sm font-medium text-gray-900 dark:text-white">Super Cepat</div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">Proses instan</div>
                </div>
                <div class="text-center space-y-2">
                  <div class="text-3xl">🚫</div>
                  <div class="text-sm font-medium text-gray-900 dark:text-white">No Watermark</div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">100% bersih</div>
                </div>
                <div class="text-center space-y-2">
                  <div class="text-3xl">🎁</div>
                  <div class="text-sm font-medium text-gray-900 dark:text-white">Gratis</div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">Selamanya</div>
                </div>
              </div>
            </div>
          </UCard>
        </div>

        <!-- Result Section (Demo) -->
        <div v-else class="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom duration-500">
          <UCard class="shadow-2xl border-2 border-gray-200 dark:border-gray-700">
            <template #header>
              <div class="flex items-start gap-4">
                <div class="flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-3xl shadow-lg">
                  🎥
                </div>
                <div class="flex-1 min-w-0">
                  <h3 class="font-bold text-xl text-gray-900 dark:text-white mb-1">
                    Never Gonna Give You Up
                  </h3>
                  <div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <UBadge color="red" variant="subtle" size="xs">YouTube</UBadge>
                    <span>•</span>
                    <span class="font-medium">{{ format.toUpperCase() }}</span>
                    <span>•</span>
                    <span>4.2 MB</span>
                  </div>
                </div>
              </div>
            </template>

            <!-- Thumbnail Preview -->
            <div class="mb-6 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 aspect-video">
              <div class="w-full h-full flex items-center justify-center text-gray-400">
                <div class="text-center space-y-2">
                  <div class="text-6xl">🖼️</div>
                  <div class="text-sm">Video Preview</div>
                </div>
              </div>
            </div>

            <!-- Download Actions -->
            <div class="space-y-4">
              <div class="flex gap-3">
                <UButton
                  size="xl"
                  color="primary"
                  class="flex-1 shadow-lg"
                >
                  <span class="i-heroicons-arrow-down-tray w-5 h-5 mr-2" />
                  Download {{ format.toUpperCase() }}
                </UButton>
                
                <UButton
                  size="xl"
                  color="gray"
                  variant="soft"
                  @click="reset"
                >
                  <span class="i-heroicons-arrow-path w-5 h-5" />
                </UButton>
              </div>

              <!-- Success Message -->
              <div class="p-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border border-green-200 dark:border-green-900">
                <div class="flex items-center gap-3">
                  <div class="flex-shrink-0 w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white">
                    <span class="i-heroicons-check w-6 h-6" />
                  </div>
                  <div>
                    <div class="font-semibold text-green-900 dark:text-green-100">
                      Siap didownload!
                    </div>
                    <div class="text-sm text-green-700 dark:text-green-300">
                      Tanpa watermark • Kualitas maksimal • 100% gratis
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </UCard>
        </div>

      </UContainer>
    </div>

    <!-- Features Section -->
    <div class="py-16 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
      <UContainer class="px-4">
        <h2 class="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          Kenapa Pilih VidBox?
        </h2>
        
        <div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <!-- Feature 1 -->
          <div class="text-center space-y-4 p-6 rounded-2xl hover:bg-white/80 dark:hover:bg-gray-800/80 transition-colors">
            <div class="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-3xl shadow-lg">
              ⚡
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white">Lightning Fast</h3>
            <p class="text-gray-600 dark:text-gray-400">
              Proses convert dalam hitungan detik. Tidak ada antrian, langsung download.
            </p>
          </div>

          <!-- Feature 2 -->
          <div class="text-center space-y-4 p-6 rounded-2xl hover:bg-white/80 dark:hover:bg-gray-800/80 transition-colors">
            <div class="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-3xl shadow-lg">
              🎯
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white">HD Quality</h3>
            <p class="text-gray-600 dark:text-gray-400">
              Download video hingga 1080p dan audio dengan bitrate tertinggi.
            </p>
          </div>

          <!-- Feature 3 -->
          <div class="text-center space-y-4 p-6 rounded-2xl hover:bg-white/80 dark:hover:bg-gray-800/80 transition-colors">
            <div class="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center text-3xl shadow-lg">
              🔒
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white">Privacy First</h3>
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
  0%, 100% {
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