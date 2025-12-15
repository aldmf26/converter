<script setup lang="ts">
definePageMeta({
  middleware: "auth",
  layout: "dashboard",
});

// Dummy history data
const historyData = ref([
  {
    id: 1,
    action: "Menambah pengukuran baru",
    name: "Ibu Siti",
    date: "15 Des 2024 14:30",
    type: "create",
  },
  {
    id: 2,
    action: "Mengedit pengukuran",
    name: "Ibu Ani",
    date: "13 Des 2024 10:15",
    type: "update",
  },
  {
    id: 3,
    action: "Menghapus pengukuran",
    name: "Ibu Rina",
    date: "12 Des 2024 16:45",
    type: "delete",
  },
  {
    id: 4,
    action: "Menambah pengukuran baru",
    name: "Ibu Dewi",
    date: "10 Des 2024 09:20",
    type: "create",
  },
  {
    id: 5,
    action: "Mengedit pengukuran",
    name: "Ibu Siti",
    date: "08 Des 2024 11:00",
    type: "update",
  },
]);

const getActionIcon = (type: string) => {
  switch (type) {
    case "create":
      return "i-lucide-plus-circle";
    case "update":
      return "i-lucide-pencil";
    case "delete":
      return "i-lucide-trash-2";
    default:
      return "i-lucide-activity";
  }
};

const getActionColor = (type: string) => {
  switch (type) {
    case "create":
      return "green";
    case "update":
      return "blue";
    case "delete":
      return "red";
    default:
      return "gray";
  }
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
            class="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent"
          >
            📜 Riwayat Aktivitas
          </h2>
          <UBadge color="neutral" variant="soft" size="lg">
            {{ historyData.length }} Aktivitas
          </UBadge>
        </div>
      </template>

      <div class="space-y-3">
        <!-- Timeline -->
        <div class="relative">
          <div
            class="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-pink-300 to-purple-300 dark:from-pink-700 dark:to-purple-700"
          ></div>

          <div
            v-for="(item, index) in historyData"
            :key="item.id"
            class="relative pl-16 pb-8"
            :class="{ 'pb-0': index === historyData.length - 1 }"
          >
            <!-- Icon -->
            <div
              class="absolute left-0 w-12 h-12 rounded-full flex items-center justify-center"
              :class="`bg-${getActionColor(
                item.type
              )}-100 dark:bg-${getActionColor(
                item.type
              )}-900 border-4 border-white dark:border-gray-900`"
            >
              <UIcon
                :name="getActionIcon(item.type)"
                :class="`w-6 h-6 text-${getActionColor(item.type)}-600`"
              />
            </div>

            <!-- Content -->
            <div
              class="bg-gradient-to-br from-pink-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-lg p-4 border-2 border-pink-200 dark:border-pink-900 hover:border-pink-300 dark:hover:border-pink-700 transition-all"
            >
              <div class="flex items-start justify-between gap-4">
                <div class="flex-1">
                  <h4 class="font-bold text-gray-800 dark:text-gray-200 mb-1">
                    {{ item.action }}
                  </h4>
                  <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Client: <strong>{{ item.name }}</strong>
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-500">
                    {{ item.date }}
                  </p>
                </div>
                <UBadge
                  :color="getActionColor(item.type)"
                  variant="soft"
                  size="sm"
                >
                  {{ item.type }}
                </UBadge>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div
          v-if="historyData.length === 0"
          class="text-center py-12 space-y-4"
        >
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
