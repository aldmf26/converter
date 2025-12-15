<script setup lang="ts">
definePageMeta({
  middleware: "auth",
  layout: "dashboard",
});

// Dummy data
const measurements = ref([
  {
    id: 1,
    name: "Ibu Siti",
    lingkar_dada: 90,
    lingkar_pinggang: 75,
    lingkar_pinggul: 95,
    panjang_badan: 65,
    date: "15 Des 2024",
  },
  {
    id: 2,
    name: "Ibu Ani",
    lingkar_dada: 88,
    lingkar_pinggang: 70,
    lingkar_pinggul: 92,
    panjang_badan: 63,
    date: "13 Des 2024",
  },
  {
    id: 3,
    name: "Ibu Dewi",
    lingkar_dada: 92,
    lingkar_pinggang: 78,
    lingkar_pinggul: 98,
    panjang_badan: 67,
    date: "10 Des 2024",
  },
]);

const searchQuery = ref("");

const filteredMeasurements = computed(() => {
  if (!searchQuery.value) return measurements.value;
  return measurements.value.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

useHead({
  title: "Data Pengukuran - Pengukuran Badan",
});
</script>

<template>
  <div class="w-full max-w-6xl space-y-6">
    <UCard variant="subtle" class="shadow-lg">
      <template #header>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <h2
              class="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent"
            >
              📊 Data Pengukuran
            </h2>
            <NuxtLink to="/pengukuran-badan/create">
              <UButton
                color="pink"
                icon="i-lucide-plus-circle"
                class="bg-gradient-to-r from-pink-500 to-purple-600"
              >
                Tambah Baru
              </UButton>
            </NuxtLink>
          </div>

          <!-- Search -->
          <UInput
            v-model="searchQuery"
            placeholder="Cari nama..."
            icon="i-lucide-search"
            size="lg"
          >
            <template v-if="searchQuery" #trailing>
              <UButton
                color="neutral"
                variant="link"
                size="sm"
                icon="i-lucide-circle-x"
                @click="searchQuery = ''"
              />
            </template>
          </UInput>
        </div>
      </template>

      <div class="space-y-4">
        <!-- Data Cards -->
        <div
          v-for="item in filteredMeasurements"
          :key="item.id"
          class="bg-gradient-to-br from-pink-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-lg p-4 sm:p-6 border-2 border-pink-200 dark:border-pink-900 hover:border-pink-300 dark:hover:border-pink-700 transition-all"
        >
          <div class="flex items-start justify-between mb-4">
            <div class="flex items-center gap-4">
              <div
                class="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg"
              >
                {{ item.name.charAt(0) }}
              </div>
              <div>
                <h3 class="text-lg font-bold text-gray-800 dark:text-gray-200">
                  {{ item.name }}
                </h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  {{ item.date }}
                </p>
              </div>
            </div>
            <div class="flex gap-2">
              <UTooltip text="Edit">
                <UButton
                  variant="soft"
                  color="info"
                  icon="i-lucide-pencil"
                  size="sm"
                  class="cursor-pointer"
                />
              </UTooltip>
              <UTooltip text="Hapus">
                <UButton
                  variant="soft"
                  color="error"
                  icon="i-lucide-trash-2"
                  size="sm"
                  class="cursor-pointer"
                />
              </UTooltip>
            </div>
          </div>

          <!-- Measurements Grid -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div class="bg-white dark:bg-gray-800 rounded-lg p-3">
              <p class="text-xs text-gray-600 dark:text-gray-400 mb-1">
                Lingkar Dada
              </p>
              <p class="text-xl font-bold text-pink-600">
                {{ item.lingkar_dada }} cm
              </p>
            </div>
            <div class="bg-white dark:bg-gray-800 rounded-lg p-3">
              <p class="text-xs text-gray-600 dark:text-gray-400 mb-1">
                Lingkar Pinggang
              </p>
              <p class="text-xl font-bold text-purple-600">
                {{ item.lingkar_pinggang }} cm
              </p>
            </div>
            <div class="bg-white dark:bg-gray-800 rounded-lg p-3">
              <p class="text-xs text-gray-600 dark:text-gray-400 mb-1">
                Lingkar Pinggul
              </p>
              <p class="text-xl font-bold text-indigo-600">
                {{ item.lingkar_pinggul }} cm
              </p>
            </div>
            <div class="bg-white dark:bg-gray-800 rounded-lg p-3">
              <p class="text-xs text-gray-600 dark:text-gray-400 mb-1">
                Panjang Badan
              </p>
              <p class="text-xl font-bold text-pink-600">
                {{ item.panjang_badan }} cm
              </p>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div
          v-if="filteredMeasurements.length === 0"
          class="text-center py-12 space-y-4"
        >
          <div class="text-6xl">📭</div>
          <h3 class="text-xl font-bold text-gray-800 dark:text-gray-200">
            Tidak ada data
          </h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            {{
              searchQuery
                ? "Tidak ditemukan hasil pencarian"
                : "Belum ada data pengukuran"
            }}
          </p>
        </div>
      </div>
    </UCard>
  </div>
</template>
