<script setup lang="ts">
definePageMeta({
  middleware: "auth",
  layout: "dashboard",
});

const supabase = useSupabaseClient();

// state
const measurements = ref<any[]>([]);
const searchQuery = ref("");
const loading = ref(false);
const errorMessage = ref("");

// Helper untuk ambil nilai Armhole dengan aman
const getArmholeValue = (measurements: any[]) => {
  if (!Array.isArray(measurements)) return null;
  const item = measurements.find(m => m.name === 'Armhole' || m.name === 'armhole');
  if (!item || !item.value) return null;
  const num = Number(item.value);
  return isNaN(num) ? null : num;
};

const getArmholeDisplay = (measurements: any[]) => {
  if (!Array.isArray(measurements)) return null;
  const item = measurements.find(m => m.name === 'Armhole' || m.name === 'armhole');
  return item ? item.value : null;
};

// ambil data dari supabase
const fetchMeasurements = async () => {
  loading.value = true;
  errorMessage.value = "";

  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) {
      throw new Error("User belum login");
    }

    const { data, error } = await supabase
      .from("measurements")
      .select("*")
      .eq("user_id", session.user.id)
      .order("created_at", { ascending: false });

    if (error) throw error;

    measurements.value = data || [];
  } catch (err: any) {
    errorMessage.value = err.message || "Gagal mengambil data";
  } finally {
    loading.value = false;
  }
};

onMounted(fetchMeasurements);

// search filter
const filteredMeasurements = computed(() => {
  if (!searchQuery.value) return measurements.value;
  return measurements.value.filter((item) =>
    item.client_name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// format tanggal
const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

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

            <NuxtLink to="/pengukuran/create">
              <UButton
                icon="i-lucide-plus-circle"
                class="cursor-pointer bg-gradient-to-r from-pink-500 to-purple-600"
              >
                Tambah Baru
              </UButton>
            </NuxtLink>
          </div>

          <!-- Search -->
          <UInput
            v-model="searchQuery"
            placeholder="Cari nama client..."
            icon="i-lucide-search"
            size="lg"
          >
            <template v-if="searchQuery" #trailing>
              <UButton
                variant="link"
                size="sm"
                icon="i-lucide-circle-x"
                @click="searchQuery = ''"
              />
            </template>
          </UInput>
        </div>
      </template>

      <!-- ERROR -->
      <UAlert
        v-if="errorMessage"
        color="error"
        variant="soft"
        :title="errorMessage"
        icon="i-lucide-circle-x"
      />

      <!-- LOADING -->
      <div v-if="loading" class="text-center py-12">
        <div class="text-4xl mb-2">⏳</div>
        <p class="text-sm text-gray-500">Memuat data...</p>
      </div>

      <!-- DATA -->
      <div v-else class="space-y-4">
        <div
          v-for="item in filteredMeasurements"
          :key="item.id"
          class="bg-gradient-to-br from-pink-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-lg p-4 sm:p-6 border-2 border-pink-200 dark:border-pink-900"
        >
          <!-- Header Card -->
          <div class="flex items-start justify-between mb-4">
            <div class="flex items-center gap-4">
              <div
                class="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg"
              >
                {{ item.client_name.charAt(0).toUpperCase() }}
              </div>
              <div>
                <h3 class="text-lg font-bold text-gray-800 dark:text-gray-200">
                  {{ item.client_name }}
                </h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  {{ formatDate(item.date) }}
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

          <!-- Measurements -->
          <div
            v-if="
              item.measurements &&
              Array.isArray(item.measurements) &&
              item.measurements.length
            "
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"
          >
            <div
              v-for="(meas, index) in item.measurements"
              :key="index"
              class="bg-white dark:bg-gray-800 rounded-md px-3 py-2 flex items-center justify-between"
            >
              <p class="text-xs text-gray-600 dark:text-gray-400 capitalize">
                {{ meas.name }}
              </p>
              <p class="text-sm font-semibold text-pink-600">
                {{ meas.value }} <span class="text-xs">cm</span>
              </p>
            </div>
          </div>

          <!-- Jika measurements kosong -->
          <div v-else class="text-sm text-gray-500 dark:text-gray-400 italic">
            Tidak ada data ukuran
          </div>

          <!-- Notes -->
          <div v-if="item.notes" class="mt-4">
            <p class="text-xs text-gray-500 mb-1">Catatan</p>
            <p class="text-sm text-gray-700 dark:text-gray-300">
              {{ item.notes }}
            </p>
          </div>
          <hr class="my-4" />
          <!-- Ringkasan Armhole -->
          <details
            v-if="getArmholeDisplay(item.measurements)"
            class="md:w-1/2 w-full sm:w-1/4"
          >
            <summary
              class="cursor-pointer text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2 hover:text-pink-600 transition-colors select-none list-none"
            >
              <span class="group-open:rotate-90 transition-transform text-pink-500">▶</span>
              💪 Ringkasan Armhole ({{ getArmholeDisplay(item.measurements) }} cm)
            </summary>

            <div class="mt-4">
              <ArmholeSummary :armhole="getArmholeValue(item.measurements)!" />
            </div>
          </details>
        </div>

        <!-- EMPTY STATE -->
        <div
          v-if="filteredMeasurements.length === 0"
          class="text-center py-12 space-y-4"
        >
          <div class="text-6xl">📭</div>
          <h3 class="text-xl font-bold">Tidak ada data</h3>
          <p class="text-sm text-gray-500">
            {{ searchQuery ? "Data tidak ditemukan" : "Belum ada pengukuran" }}
          </p>
        </div>
      </div>
    </UCard>
  </div>
</template>