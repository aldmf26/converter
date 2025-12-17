<script setup lang="ts">
definePageMeta({
  middleware: "auth",
  layout: "dashboard",
});

const supabase = useSupabaseClient();

const measurements = ref<any[]>([]);
const loading = ref(false);

const fetchMeasurements = async () => {
  loading.value = true;
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) return;

    const { data, error } = await supabase
      .from("measurements")
      .select("*")
      .eq("user_id", session.user.id)
      .order("created_at", { ascending: false })
      .limit(10);

    if (!error) measurements.value = data || [];
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchMeasurements);

const latestData = computed(() => measurements.value.slice(0, 3));
const totalCount = computed(() => measurements.value.length);

const thisMonthCount = computed(() => {
  const now = new Date();
  return measurements.value.filter(m => {
    const date = new Date(m.date);
    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
  }).length;
});

const lastUpdate = computed(() => {
  if (!measurements.value.length) return "-";
  const latest = measurements.value[0];
  return new Date(latest.date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
});

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

useHead({
  title: "Dashboard Pengukuran Badan",
});
</script>

<template>
  <div class="w-full max-w-6xl space-y-8">
    <h2 class="text-3xl font-bold text-pink-600 dark:text-pink-400">
      📊 Dashboard Pengukuran
    </h2>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-8">
      <div class="text-4xl mb-2">⏳</div>
      <p class="text-sm text-gray-500">Memuat data...</p>
    </div>

    <template v-else>
      <!-- Statistics -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <UCard>
          <p class="text-sm text-gray-500">Total Data</p>
          <p class="text-3xl font-bold text-pink-600">{{ totalCount }}</p>
        </UCard>

        <UCard>
          <p class="text-sm text-gray-500">Data Bulan Ini</p>
          <p class="text-3xl font-bold text-purple-600">{{ thisMonthCount }}</p>
        </UCard>

        <UCard>
          <p class="text-sm text-gray-500">Terakhir Update</p>
          <p class="text-lg font-semibold">{{ lastUpdate }}</p>
        </UCard>
      </div>

      <!-- Quick Actions -->
      <div class="flex gap-3">
        <NuxtLink to="/pengukuran/create">
          <UButton icon="i-lucide-plus-circle" class="bg-pink-500 hover:bg-pink-600">
            Tambah Data
          </UButton>
        </NuxtLink>

        <NuxtLink to="/pengukuran/data">
          <UButton variant="soft" icon="i-lucide-database">Lihat Semua</UButton>
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

        <div v-if="latestData.length > 0" class="space-y-3">
          <div
            v-for="item in latestData"
            :key="item.id"
            class="flex justify-between items-center p-3 rounded-lg bg-pink-50 dark:bg-pink-950/20 border border-pink-200 dark:border-pink-800"
          >
            <div>
              <p class="font-semibold text-gray-800 dark:text-gray-200">{{ item.client_name }}</p>
              <p class="text-xs text-gray-500">{{ formatDate(item.date) }}</p>
            </div>
            <div class="text-right">
              <p class="text-xs text-gray-500">{{ Object.keys(item.measurements || {}).length }} ukuran</p>
            </div>
          </div>
        </div>

        <div v-else class="text-center py-8 text-gray-500">
          <p class="text-sm">Belum ada data pengukuran</p>
        </div>
      </UCard>
    </template>
  </div>
</template>