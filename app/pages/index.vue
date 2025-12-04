<script setup lang="ts">
const {
  url,
  showResult,
  isLoading,
  pasteFromClipboard,
  clearUrl,
  handleConvert,
  reset,
} = useVideoDownloader();
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950"
  >
    <!-- Animated Background Blobs -->
    <BackgroundBlobs />

    <!-- Main Content -->
    <UContainer class="relative py-16 md:py-24">
      <Header />

      <!-- Input Form or Result -->
      <Transition name="fade-slide" mode="out-in">
        <div v-if="!showResult" key="form" class="max-w-4xl mx-auto">
          <VideoInputForm
            v-model:url="url"
            :loading="isLoading"
            @paste="pasteFromClipboard"
            @clear="clearUrl"
            @submit="handleConvert"
          />
        </div>

        <Result v-else key="result" @reset="reset" class="max-w-3xl mx-auto" />
      </Transition>
    </UContainer>

    <!-- Features & Footer -->
    <Features />
    <Footer />
  </div>
</template>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s ease-out;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
