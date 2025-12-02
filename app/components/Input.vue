<script setup lang="ts">
defineProps<{
  url: string;
  format: string;
}>();
</script>
<template>
    <div
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
                </div>

                <UInput
                  v-model="url"
                  size="xl"
                  placeholder="https://youtube.com/watch?v=dQw4w9WgXcQ"
                  icon="i-heroicons-link"
                  :ui="{
                    icon: { trailing: { pointer: '' } },
                    base: 'text-lg',
                  }"
                  class="text-lg shadow-lg w-full"
                >
                  <template #trailing>
                    <UButton
                      v-if="url"
                      color="success"
                      variant="link"
                      icon="i-heroicons-x-mark-20-solid"
                      :padded="false"
                      @click="url = ''"
                    />
                  </template>
                </UInput>
              </div>

              <!-- Step 2 -->
              <div class="hidden space-y-4">
                <div class="flex items-center gap-3">
                  <div
                    class="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 text-white font-bold shadow-lg"
                  >
                    2
                  </div>
                  <h3
                    class="text-lg font-semibold text-gray-900 dark:text-white"
                  >
                    Pilih format output
                  </h3>
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <!-- MP4 Option -->
                  <button
                    class="group relative p-6 rounded-2xl border-2 transition-all duration-300"
                    :class="
                      format === 'mp4'
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30 shadow-lg scale-105'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:scale-102'
                    "
                    @click="format = 'mp4'"
                  >
                    <div class="flex flex-col items-center gap-3">
                      <div class="text-4xl">🎬</div>
                      <div class="text-center">
                        <div
                          class="font-bold text-lg text-gray-900 dark:text-white"
                        >
                          MP4
                        </div>
                        <div class="text-sm text-gray-600 dark:text-gray-400">
                          Video Full HD
                        </div>
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
                    :class="
                      format === 'mp3'
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30 shadow-lg scale-105'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:scale-102'
                    "
                    @click="format = 'mp3'"
                  >
                    <div class="flex flex-col items-center gap-3">
                      <div class="text-4xl">🎵</div>
                      <div class="text-center">
                        <div
                          class="font-bold text-lg text-gray-900 dark:text-white"
                        >
                          MP3
                        </div>
                        <div class="text-sm text-gray-600 dark:text-gray-400">
                          Audio Only
                        </div>
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
</template>