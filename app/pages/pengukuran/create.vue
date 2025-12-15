<script setup lang="ts">
definePageMeta({
  middleware: "auth",
  layout: "dashboard",
});

const router = useRouter();

const formData = ref({
  name: "",
  lingkar_dada: "",
  lingkar_pinggang: "",
  lingkar_pinggul: "",
  panjang_badan: "",
  lebar_bahu: "",
  panjang_lengan: "",
});

const loading = ref(false);

const handleSubmit = async () => {
  loading.value = true;

  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // TODO: Implement Supabase save here
  console.log("Data yang akan disimpan:", formData.value);

  loading.value = false;

  // Redirect to data page
  await router.push("/pengukuran-badan/data");
};

const handleReset = () => {
  formData.value = {
    name: "",
    lingkar_dada: "",
    lingkar_pinggang: "",
    lingkar_pinggul: "",
    panjang_badan: "",
    lebar_bahu: "",
    panjang_lengan: "",
  };
};

useHead({
  title: "Tambah Pengukuran - Pengukuran Badan",
});
</script>

<template>
  <div class="w-full max-w-4xl space-y-6">
    <UCard variant="subtle" class="shadow-lg">
      <template #header>
        <div class="flex items-center gap-3">
          <NuxtLink to="/pengukuran-badan/data">
            <UButton variant="ghost" icon="i-lucide-arrow-left" size="sm">
              Kembali
            </UButton>
          </NuxtLink>
          <h2
            class="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent"
          >
            ➕ Tambah Pengukuran Baru
          </h2>
        </div>
      </template>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Info Section -->
        <div
          class="bg-gradient-to-br from-pink-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-4 border-2 border-pink-200 dark:border-pink-900"
        >
          <p class="text-sm text-gray-700 dark:text-gray-300">
            💡 <strong>Tips:</strong> Ukur dengan teliti untuk hasil yang
            akurat. Semua ukuran dalam satuan centimeter (cm).
          </p>
        </div>

        <!-- Nama Client -->
        <div class="space-y-2">
          <label
            class="block text-sm font-semibold text-gray-700 dark:text-gray-300"
          >
            👤 Nama Client <span class="text-red-500">*</span>
          </label>
          <UInput
            v-model="formData.name"
            placeholder="Contoh: Ibu Siti"
            size="lg"
            required
          />
        </div>

        <!-- Measurements Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <!-- Lingkar Dada -->
          <div class="space-y-2">
            <label
              class="block text-sm font-semibold text-gray-700 dark:text-gray-300"
            >
              📏 Lingkar Dada (cm) <span class="text-red-500">*</span>
            </label>
            <UInput
              v-model="formData.lingkar_dada"
              type="number"
              step="0.1"
              placeholder="Contoh: 90"
              size="lg"
              required
            />
          </div>

          <!-- Lingkar Pinggang -->
          <div class="space-y-2">
            <label
              class="block text-sm font-semibold text-gray-700 dark:text-gray-300"
            >
              📏 Lingkar Pinggang (cm) <span class="text-red-500">*</span>
            </label>
            <UInput
              v-model="formData.lingkar_pinggang"
              type="number"
              step="0.1"
              placeholder="Contoh: 75"
              size="lg"
              required
            />
          </div>

          <!-- Lingkar Pinggul -->
          <div class="space-y-2">
            <label
              class="block text-sm font-semibold text-gray-700 dark:text-gray-300"
            >
              📏 Lingkar Pinggul (cm) <span class="text-red-500">*</span>
            </label>
            <UInput
              v-model="formData.lingkar_pinggul"
              type="number"
              step="0.1"
              placeholder="Contoh: 95"
              size="lg"
              required
            />
          </div>

          <!-- Panjang Badan -->
          <div class="space-y-2">
            <label
              class="block text-sm font-semibold text-gray-700 dark:text-gray-300"
            >
              📏 Panjang Badan (cm) <span class="text-red-500">*</span>
            </label>
            <UInput
              v-model="formData.panjang_badan"
              type="number"
              step="0.1"
              placeholder="Contoh: 65"
              size="lg"
              required
            />
          </div>

          <!-- Lebar Bahu -->
          <div class="space-y-2">
            <label
              class="block text-sm font-semibold text-gray-700 dark:text-gray-300"
            >
              📏 Lebar Bahu (cm)
            </label>
            <UInput
              v-model="formData.lebar_bahu"
              type="number"
              step="0.1"
              placeholder="Contoh: 38"
              size="lg"
            />
          </div>

          <!-- Panjang Lengan -->
          <div class="space-y-2">
            <label
              class="block text-sm font-semibold text-gray-700 dark:text-gray-300"
            >
              📏 Panjang Lengan (cm)
            </label>
            <UInput
              v-model="formData.panjang_lengan"
              type="number"
              step="0.1"
              placeholder="Contoh: 55"
              size="lg"
            />
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-3 pt-4">
          <UButton
            type="submit"
            block
            size="lg"
            :loading="loading"
            :disabled="loading"
            class="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
          >
            <template v-if="!loading">
              <UIcon name="i-lucide-save" class="mr-2" />
              Simpan Pengukuran
            </template>
            <template v-else> Menyimpan... </template>
          </UButton>

          <UButton
            type="button"
            @click="handleReset"
            block
            size="lg"
            variant="outline"
            color="gray"
            :disabled="loading"
          >
            <UIcon name="i-lucide-rotate-ccw" class="mr-2" />
            Reset Form
          </UButton>
        </div>
      </form>
    </UCard>
  </div>
</template>
