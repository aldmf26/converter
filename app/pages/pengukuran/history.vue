<script setup lang="ts">
definePageMeta({
  middleware: "auth",
  layout: "dashboard",
});

const supabase = useSupabaseClient();

const historyData = ref<any[]>([]);
const loading = ref(false);

const fetchHistory = async () => {
  loading.value = true;
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session?.user) return;

    const { data, error } = await supabase
      .from("activity_logs")
      .select("*")
      .eq("user_id", session.user.id)
      .order("created_at", { ascending: false })
      .limit(50);

    if (!error) historyData.value = data || [];
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchHistory);

const getActionIcon = (type: string) => {
  const icons: Record<string, string> = {
    create: "i-lucide-plus-circle",
    update: "i-lucide-pencil",
    delete: "i-lucide-trash-2",
  };
  return icons[type] || "i-lucide-activity";
};

const getActionColor = (type: string) => {
  const colors: Record<string, string> = {
    create: "info",
    update: "primary",
    delete: "error",
  };
  return colors[type] || "info";
};

const getActionText = (type: string) => {
  const texts: Record<string, string> = {
    create: "Menambah pengukuran baru",
    update: "Mengedit pengukuran",
    delete: "Menghapus pengukuran",
  };
  return texts[type] || "Aktivitas";
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

useHead({
  title: "Riwayat - Pengukuran Badan",
});
</script>

<template>
  <div class="w-full max-w-4xl space-y-6">
    <UCard variant="subtle" class="shadow-lg">
      <template #header>
        <div class="flex items-center justify-between">
          <h2
            class="text-2xl sm:text-3xl font-bold text-pink-600 dark:text-pink-400"
          >
            📜 Riwayat Aktivitas
          </h2>
          <UBadge color="pink" variant="soft" size="lg">
            {{ historyData.length }} Aktivitas
          </UBadge>
        </div>
      </template>

      <!-- Loading -->
      <div v-if="loading" class="text-center py-12">
        <div class="text-4xl mb-2">⏳</div>
        <p class="text-sm text-gray-500">Memuat riwayat...</p>
      </div>

      <div v-else class="space-y-3">
        <!-- Timeline -->
        <div v-if="historyData.length > 0" class="relative">
          <div
            class="absolute left-6 top-0 bottom-0 w-0.5 bg-pink-300 dark:bg-pink-700"
          ></div>

          <div
            v-for="(item, index) in historyData"
            :key="item.id"
            class="relative pl-16 pb-8"
            :class="{ 'pb-0': index === historyData.length - 1 }"
          >
            <!-- Icon -->
            <div
              class="absolute left-0 w-12 h-12 rounded-full flex items-center justify-center border-4 border-white dark:border-gray-900"
              :class="`bg-${getActionColor(
                item.action_type
              )}-100 dark:bg-${getActionColor(item.action_type)}-900`"
            >
              <UIcon
                :name="getActionIcon(item.action_type)"
                :class="`w-6 h-6 text-${getActionColor(item.action_type)}-600`"
              />
            </div>

            <!-- Content -->
            <div
              class="bg-pink-50 dark:bg-pink-950/20 rounded-lg p-4 border-2 border-pink-200 dark:border-pink-800 hover:border-pink-300 dark:hover:border-pink-700 transition-all"
            >
              <div class="flex items-start justify-between gap-4">
                <div class="flex-1">
                  <h4 class="font-bold text-gray-800 dark:text-gray-200 mb-1">
                    {{ getActionText(item.action_type) }}
                  </h4>
                  <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Client: <strong>{{ item.client_name }}</strong>
                  </p>
                  <p class="text-xs text-gray-500">
                    {{ formatDate(item.created_at) }}
                  </p>
                </div>
                <UBadge
                  :color="getActionColor(item.action_type)"
                  variant="soft"
                  size="sm"
                >
                  {{ item.action_type }}
                </UBadge>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-12 space-y-4">
          <div class="text-6xl">📭</div>
          <h3 class="text-xl font-bold text-gray-800 dark:text-gray-200">
            Belum ada riwayat
          </h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Aktivitas kamu akan muncul di sini
          </p>
        </div>
      </div>
    </UCard>
  </div>
</template>
