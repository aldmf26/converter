<script setup lang="ts">
definePageMeta({
  middleware: "auth",
  layout: "dashboard",
});

// Dummy data (nanti ganti Supabase)
const measurements = ref([
  { id: 1, name: "Ibu Siti", lingkar_dada: 90, date: "15 Des 2024" },
  { id: 2, name: "Ibu Ani", lingkar_dada: 88, date: "13 Des 2024" },
  { id: 3, name: "Ibu Dewi", lingkar_dada: 92, date: "10 Des 2024" },
  { id: 4, name: "Ibu Rina", lingkar_dada: 89, date: "08 Des 2024" },
]);

const latestData = computed(() => measurements.value.slice(0, 3));

useHead({
  title: "Dashboard Pengukuran Badan",
});
</script>

<template>
  <div class="w-full max-w-6xl space-y-8">
    <!-- Title -->
    <h2
      class="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent"
    >
      📊 Dashboard Pengukuran
    </h2>

    <!-- Statistics -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <UCard>
        <p class="text-sm text-gray-500">Total Data</p>
        <p class="text-3xl font-bold text-pink-600">
          {{ measurements.length }}
        </p>
      </UCard>

      <UCard>
        <p class="text-sm text-gray-500">Data Bulan Ini</p>
        <p class="text-3xl font-bold text-purple-600">3</p>
      </UCard>

      <UCard>
        <p class="text-sm text-gray-500">Terakhir Update</p>
        <p class="text-lg font-semibold">15 Des 2024</p>
      </UCard>
    </div>

    <!-- Quick Actions -->
    <div class="flex gap-3">
      <NuxtLink to="/pengukuran/create">
        <UButton icon="i-lucide-plus-circle" color="info">
          Tambah Data
        </UButton>
      </NuxtLink>

      <NuxtLink to="/pengukuran/data">
        <UButton variant="soft" icon="i-lucide-database"> Lihat Semua </UButton>
      </NuxtLink>
    </div>

    <!-- Latest Data Preview -->
    <UCard>
      <template #header>
        <div class="flex justify-between items-center">
          <h3 class="font-bold text-lg">📌 Data Terbaru</h3>
          <NuxtLink to="/pengukuran/data">
            <UButton size="sm" variant="link">Lihat Semua</UButton>
          </NuxtLink>
        </div>
      </template>

      <div class="space-y-3">
        <div
          v-for="item in latestData"
          :key="item.id"
          class="flex justify-between items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-800"
        >
          <div>
            <p class="font-semibold">{{ item.name }}</p>
            <p class="text-xs text-gray-500">{{ item.date }}</p>
          </div>
          <p class="font-bold text-pink-600">{{ item.lingkar_dada }} cm</p>
        </div>
      </div>
    </UCard>
  </div>
</template>
