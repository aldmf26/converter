<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const route = useRoute();

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: "Pengukuran Badan",
    to: "/pengukuran-badan",
    icon: "i-lucide-box",
    active: route.path.startsWith("/pengukuran-badan"),
  },
  {
    label: "Armhole Calculator",
    to: "/armhole",
    icon: "i-lucide-shirt",
    active: route.path.startsWith("/armhole"),
  },
]);

useHead({
  title: "Home - Sewing Tools by JeneryMF",
});
</script>

<template>
  <div class="min-h-screen flex items-center justify-center p-4">
    <UCard variant="subtle" class="w-full max-w-3xl shadow-lg">
      <template #header>
        <div class="text-center space-y-3 sm:space-y-4">
          <div class="text-5xl sm:text-6xl md:text-7xl mb-2">✨👗✂️</div>
          <h1
            class="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent leading-tight"
          >
            JeneryMF Tools
          </h1>
          <p class="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Alat bantu perhitungan untuk menjahit yang lebih mudah dan akurat
          </p>
          <p class="text-xs text-gray-500 dark:text-gray-500">by JeneryMF</p>
        </div>
      </template>

      <div class="space-y-6 sm:space-y-8">
        <!-- Welcome Message -->
        <div
          class="bg-gradient-to-br from-pink-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-4 sm:p-6 text-center"
        >
          <p
            class="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed"
          >
            💖 Selamat datang! Pilih tool yang ingin kamu gunakan untuk membantu
            perhitungan pola jahitanmu
          </p>
        </div>

        <!-- Tools Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <!-- Pengukuran Badan Card -->
          <NuxtLink
            to="/pengukuran-badan"
            class="group block transform transition-all duration-300 hover:scale-105"
          >
            <div
              class="bg-gradient-to-br from-pink-100 to-pink-200 dark:from-pink-950 dark:to-pink-900 rounded-xl p-6 sm:p-8 border-2 border-pink-300 dark:border-pink-700 hover:border-pink-400 dark:hover:border-pink-600 shadow-md hover:shadow-xl transition-all"
            >
              <div class="text-center space-y-4">
                <div
                  class="text-5xl sm:text-6xl group-hover:scale-110 transition-transform"
                >
                  📏
                </div>
                <h3
                  class="text-xl sm:text-2xl font-bold text-pink-700 dark:text-pink-300"
                >
                  Pengukuran Badan
                </h3>
                <p
                  class="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed"
                >
                  Hitung ukuran tubuh untuk pola dasar jahitan
                </p>
                <div
                  class="flex items-center justify-center gap-2 text-pink-600 dark:text-pink-400 text-sm font-semibold group-hover:gap-3 transition-all"
                >
                  <span>Mulai</span>
                  <span class="text-lg">→</span>
                </div>
              </div>
            </div>
          </NuxtLink>

          <!-- Armhole Calculator Card -->
          <NuxtLink
            to="/armhole"
            class="group block transform transition-all duration-300 hover:scale-105"
          >
            <div
              class="bg-gradient-to-br from-purple-100 to-indigo-200 dark:from-purple-950 dark:to-indigo-900 rounded-xl p-6 sm:p-8 border-2 border-purple-300 dark:border-purple-700 hover:border-purple-400 dark:hover:border-purple-600 shadow-md hover:shadow-xl transition-all"
            >
              <div class="text-center space-y-4">
                <div
                  class="text-5xl sm:text-6xl group-hover:scale-110 transition-transform"
                >
                  👚
                </div>
                <h3
                  class="text-xl sm:text-2xl font-bold text-purple-700 dark:text-purple-300"
                >
                  Armhole Calculator
                </h3>
                <p
                  class="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed"
                >
                  Hitung ukuran TP, Bisep, dan Kerung dari armhole
                </p>
                <div
                  class="flex items-center justify-center gap-2 text-purple-600 dark:text-purple-400 text-sm font-semibold group-hover:gap-3 transition-all"
                >
                  <span>Mulai</span>
                  <span class="text-lg">→</span>
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>

        <!-- Footer Note -->
        <div
          class="text-center space-y-2 pt-4 border-t border-gray-200 dark:border-gray-700"
        >
          <p class="text-xs text-gray-500 dark:text-gray-400">
            Dibuat dengan 💖 untuk memudahkan pekerjaan menjahitmu
          </p>
        </div>
      </div>
    </UCard>
  </div>
</template>
