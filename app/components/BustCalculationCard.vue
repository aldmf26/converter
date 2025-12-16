<script setup lang="ts">
const props = defineProps<{
  bust: number;
}>();

// Format angka
const formatNumber = (num: number) => {
  if (num === 0) return 0;
  const fixed = num.toFixed(2);
  return parseFloat(fixed);
};

// Kalkulasi Bust (contoh rumus - sesuaikan dengan kebutuhan Anda)
const bustValue = computed(() => props.bust);

// Contoh perhitungan dari bust
const lingkarDada = computed(() => bustValue.value);

const setengahLingkar = computed(() => {
  return formatNumber(bustValue.value / 2);
});

const seperempatLingkar = computed(() => {
  return formatNumber(bustValue.value / 4);
});

// Lebar Dada (contoh: 1/4 dari bust - 1.5)
const lebarDada = computed(() => {
  return formatNumber(bustValue.value / 4 - 1.5);
});

// Lebar Punggung (contoh: 1/4 dari bust - 1)
const lebarPunggung = computed(() => {
  return formatNumber(bustValue.value / 4 - 1);
});

const hasData = computed(() => bustValue.value > 0);
</script>

<template>
  <div
    v-if="hasData"
    class="bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-950 dark:to-cyan-950 rounded-xl p-4 sm:p-6 border-2 border-blue-300 dark:border-blue-700"
  >
    <h5
      class="font-bold text-base sm:text-lg mb-3 sm:mb-4 text-gray-800 dark:text-gray-200 flex items-center gap-2"
    >
      <span class="text-xl sm:text-2xl">👚</span> Ringkasan Ukuran Bust
    </h5>
    <div class="grid grid-cols-2 gap-3 sm:gap-4">
      <div>
        <div class="text-xs text-gray-600 dark:text-gray-400 mb-1">
          Lingkar Dada
        </div>
        <div
          class="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100"
        >
          {{ lingkarDada }}
        </div>
        <div class="text-xs text-gray-400 mt-1">dari data</div>
      </div>
      <div>
        <div class="text-xs text-gray-600 dark:text-gray-400 mb-1">
          ½ Lingkar
        </div>
        <div
          class="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400"
        >
          {{ setengahLingkar }}
        </div>
        <div class="text-xs text-gray-400 mt-1">{{ lingkarDada }} ÷ 2</div>
      </div>
      <div>
        <div class="text-xs text-gray-600 dark:text-gray-400 mb-1">
          ¼ Lingkar
        </div>
        <div
          class="text-lg sm:text-xl font-bold text-cyan-600 dark:text-cyan-400"
        >
          {{ seperempatLingkar }}
        </div>
        <div class="text-xs text-gray-400 mt-1">{{ lingkarDada }} ÷ 4</div>
      </div>
      <div>
        <div class="text-xs text-gray-600 dark:text-gray-400 mb-1">
          Lebar Dada
        </div>
        <div
          class="text-lg sm:text-xl font-bold text-teal-600 dark:text-teal-400"
        >
          {{ lebarDada }}
        </div>
        <div class="text-xs text-gray-400 mt-1">¼ - 1.5</div>
      </div>
      <div>
        <div class="text-xs text-gray-600 dark:text-gray-400 mb-1">
          Lebar Punggung
        </div>
        <div
          class="text-lg sm:text-xl font-bold text-sky-600 dark:text-sky-400"
        >
          {{ lebarPunggung }}
        </div>
        <div class="text-xs text-gray-400 mt-1">¼ - 1</div>
      </div>
    </div>
  </div>
</template>