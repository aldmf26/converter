<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const value = ref("");

// Computed properties untuk kalkulasi
const armhole = computed(() => parseFloat(value.value) || 0);

// Fungsi untuk format angka: hapus .00 dan trailing zero
const formatNumber = (num: number) => {
  if (num === 0) return 0;
  const fixed = num.toFixed(2);
  return parseFloat(fixed);
};

const tp = computed(() => {
  if (!armhole.value) return 0;
  return formatNumber(armhole.value / 4);
});

const bisep = computed(() => {
  if (!armhole.value) return 0;
  return formatNumber(armhole.value / 2);
});

const kerung = computed(() => {
  if (!armhole.value) return 0;
  const bisepValue = armhole.value / 2;
  return formatNumber(bisepValue / 4);
});

const hasResult = computed(() => armhole.value > 0);

useHead({
  title: "Kalkulator Armhole - Hitung TP, Bisep, Kerung | JeneryMF",
  meta: [
    {
      name: "description",
      content: "Kalkulator Armhole gratis untuk menghitung TP (Titik Puncak), Bisep, dan Kerung. Tool akurat untuk penjahit dalam membuat pola lengan baju.",
    },
    {
      name: "keywords",
      content: "kalkulator armhole, hitung TP, bisep, kerung, armhole calculator, pola lengan, ukuran armhole, JeneryMF",
    },
  ],
});
</script>

<template>
 
    <UCard variant="subtle" class="mb-8 w-full max-w-2xl shadow-lg">
      <template #header>
        <div class="text-center space-y-2 sm:space-y-3">
          <h2
            class="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent leading-tight"
          >
            💖 Arm Hole Calculator
          </h2>
          <p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            by JeneryMF
          </p>
        </div>
      </template>

      <!-- Urutan: 1. Rumus, 2. Input, 3. Hasil -->
      <div class="space-y-4 sm:space-y-6">
        <!-- Rumus Section - Collapsed jadi lebih clean -->
        <details class="group">
          <summary
            class="cursor-pointer text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2 hover:text-pink-600 transition-colors"
          >
            <span class="group-open:rotate-90 transition-transform">▶</span>
            📖 Lihat Rumus
          </summary>
          <div
            class="mt-3 pl-4 sm:pl-6 space-y-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400"
          >
            <div class="flex justify-between border-b pb-1">
              <span>TP</span>
              <span class="font-mono text-xs sm:text-sm">= Armhole ÷ 4</span>
            </div>
            <div class="flex justify-between border-b pb-1">
              <span>Bisep</span>
              <span class="font-mono text-xs sm:text-sm">= Armhole ÷ 2</span>
            </div>
            <div class="flex justify-between border-b pb-1">
              <span>Kerung</span>
              <span class="font-mono text-xs sm:text-sm">= Bisep ÷ 4</span>
            </div>
          </div>
        </details>

        <!-- Input Section dengan styling lebih menarik -->
        <div
          class="bg-gradient-to-br from-pink-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-4 sm:p-6 space-y-3 sm:space-y-4"
        >
          <label
            class="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300"
          >
            📏 Masukkan Ukuran Armhole
          </label>
          <UInput
            class="w-full"
            size="xl"
            v-model="value"
            type="number"
            step="0.1"
            placeholder="Contoh: 42"
          >
            <template v-if="value?.length" #trailing>
              <UButton
                color="neutral"
                variant="link"
                size="sm"
                icon="i-lucide-circle-x"
                aria-label="Clear input"
                @click="value = ''"
              />
            </template>
          </UInput>
          <p class="text-xs text-gray-500 dark:text-gray-400">
            💡 Tip: Masukkan angka dalam cm atau inch sesuai kebutuhan
          </p>
        </div>

        <!-- Hasil Section - Only show when there's input -->
        <div
          v-if="hasResult"
          class="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500"
        >
          <div
            class="h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent"
          ></div>

          <!-- Hasil Perhitungan dengan card masing-masing -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div
              class="bg-white dark:bg-gray-800 rounded-lg p-3 sm:p-4 border-2 border-pink-200 dark:border-pink-900 shadow-sm hover:shadow-md transition-shadow"
            >
              <div class="text-xs text-gray-500 dark:text-gray-400 mb-1">
                TP
              </div>
              <div
                class="text-xl sm:text-2xl font-bold text-pink-600 dark:text-pink-400"
              >
                {{ tp }}
              </div>
              <div class="text-xs text-gray-400 mt-1">{{ armhole }} ÷ 4</div>
            </div>

            <div
              class="bg-white dark:bg-gray-800 rounded-lg p-3 sm:p-4 border-2 border-purple-200 dark:border-purple-900 shadow-sm hover:shadow-md transition-shadow"
            >
              <div class="text-xs text-gray-500 dark:text-gray-400 mb-1">
                Bisep
              </div>
              <div
                class="text-xl sm:text-2xl font-bold text-purple-600 dark:text-purple-400"
              >
                {{ bisep }}
              </div>
              <div class="text-xs text-gray-400 mt-1">{{ armhole }} ÷ 2</div>
            </div>

            <div
              class="bg-white dark:bg-gray-800 rounded-lg p-3 sm:p-4 border-2 border-indigo-200 dark:border-indigo-900 shadow-sm hover:shadow-md transition-shadow"
            >
              <div class="text-xs text-gray-500 dark:text-gray-400 mb-1">
                Kerung
              </div>
              <div
                class="text-xl sm:text-2xl font-bold text-indigo-600 dark:text-indigo-400"
              >
                {{ kerung }}
              </div>
              <div class="text-xs text-gray-400 mt-1">{{ bisep }} ÷ 4</div>
            </div>
          </div>

          <!-- Pakai komponen -->
  <ArmholeSummary :armhole="armhole" />
        </div>

        <!-- Empty state ketika belum ada input -->
        <div v-else class="text-center py-8 sm:py-12 space-y-3">
          <div class="text-5xl sm:text-6xl">✂️</div>
          <p class="text-sm sm:text-base text-gray-500 dark:text-gray-400 px-4">
            Masukkan ukuran armhole untuk mulai menghitung
          </p>
        </div>
      </div>
    </UCard>
</template>
