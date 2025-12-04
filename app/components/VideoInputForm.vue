<template>
  <UCard
    class="shadow-2xl border-2 border-gray-200/80 dark:border-gray-700/80 backdrop-blur-sm bg-white/95 dark:bg-gray-900/95"
  >
    <div class="p-6 md:p-10 space-y-8">
      <!-- Step 1 -->
      <div class="flex items-center gap-4">
        <!-- INI YANG BENAR: semua class langsung di template -->
        <div
          class="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white font-bold shadow-lg text-lg"
        >
          1
        </div>

        <h3 class="text-xl font-semibold">Paste link video</h3>

        <UButton
          variant="soft"
          color="primary"
          icon="i-heroicons-clipboard"
          :padded="false"
          @click="$emit('paste')"
        >
          Paste
        </UButton>

        <UButton
          v-if="url"
          variant="soft"
          color="error"
          icon="i-heroicons-x-mark"
          :padded="false"
          @click="$emit('clear')"
        />
      </div>

      <!-- Input dengan defineModel (Vue 3.5+) -->
      <UInput
        v-model="url"
        size="xl"
        placeholder="https://youtube.com/watch?v=... atau TikTok/Instagram"
        icon="i-heroicons-link"
        class="text-lg shadow-lg w-full"
        autofocus
      />

      <UButton
        size="xl"
        block
        color="primary"
        :loading="loading"
        :disabled="!url || loading"
        class="font-bold text-lg cursor-pointer shadow-lg hover:shadow-xl transition-shadow"
        @click="$emit('submit')"
      >
        <span class="i-heroicons-sparkles w-6 h-6 mr-2" />
        {{ loading ? "Sedang memproses..." : "Download Sekarang" }}
      </UButton>

      <!-- Mini Features -->
      <div
        class="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200 dark:border-gray-700"
      >
        <FeatureBadge emoji="⚡" title="Super Cepat" desc="Proses instan" />
        <FeatureBadge emoji="🚫" title="Tanpa Watermark" desc="100% bersih" />
        <FeatureBadge emoji="🎁" title="Gratis Selamanya" desc="Tanpa batas" />
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
// Vue 3.5+ → defineModel = super clean!
const url = defineModel<string>("url", { required: true });
defineProps<{ loading: boolean }>();

defineEmits<{
  paste: [];
  clear: [];
  submit: [];
}>();
</script>

<!-- HAPUS SEMUA <style scoped> yang pakai @apply Tailwind! -->
