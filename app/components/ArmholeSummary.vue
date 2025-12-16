<!-- components/ArmholeSummary.vue -->
<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  armhole: number
}>()

// Hitung ulang di komponen (biar mandiri, tetap pakai format)
const formatNumber = (num: number) => {
  if (num === 0) return 0
  return parseFloat(num.toFixed(2))
}

const tp = computed(() => formatNumber(props.armhole / 4))
const bisep = computed(() => formatNumber(props.armhole / 2))
const kerung = computed(() => formatNumber(bisep.value / 4))
</script>

<template>
  <div class="space-y-4">
   

    <!-- Box Ringkasan -->
    <div
      class="bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-950 dark:to-purple-950 rounded-xl p-4 sm:p-6 border-2 border-pink-300 dark:border-pink-700"
    >
      <h5
        class="font-bold text-base sm:text-lg mb-3 sm:mb-4 text-gray-800 dark:text-gray-200 flex items-center gap-2"
      >
        <span class="text-xl sm:text-2xl">📌</span> Ringkasan Ukuran Armhole
      </h5>
      <div class="grid grid-cols-2 gap-3 sm:gap-4">
        <div>
          <div class="text-xs text-gray-600 dark:text-gray-400 mb-1">Armhole</div>
          <div class="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100">
            {{ armhole }}
          </div>
        </div>
        <div>
          <div class="text-xs text-gray-600 dark:text-gray-400 mb-1">TP</div>
          <div class="text-lg sm:text-xl font-bold text-pink-600 dark:text-pink-400">
            {{ tp }}
          </div>
        </div>
        <div>
          <div class="text-xs text-gray-600 dark:text-gray-400 mb-1">Bisep</div>
          <div class="text-lg sm:text-xl font-bold text-purple-600 dark:text-purple-400">
            {{ bisep }}
          </div>
        </div>
        <div>
          <div class="text-xs text-gray-600 dark:text-gray-400 mb-1">Kerung</div>
          <div class="text-lg sm:text-xl font-bold text-indigo-600 dark:text-indigo-400">
            {{ kerung }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>