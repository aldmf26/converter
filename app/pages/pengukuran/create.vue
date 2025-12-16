<script setup lang="ts">
definePageMeta({
  middleware: "auth",
  layout: "dashboard",
});

const router = useRouter();
const { user } = useAuth();
const supabase = useSupabaseClient();

// Default fields sesuai gambar
const defaultFields = [
  { id: 1, name: "Bust", value: "", order: 1 },
  { id: 2, name: "Waist", value: "", order: 2 },
  { id: 3, name: "Hip", value: "", order: 3 },
  { id: 4, name: "Waist to hip", value: "", order: 4 },
  { id: 5, name: "C. Front", value: "", order: 5 },
  { id: 6, name: "Chest I", value: "", order: 6 },
  { id: 7, name: "Chest II", value: "", order: 7 },
  { id: 8, name: "B.P.L (Bust Point Length)", value: "", order: 8 },
  { id: 9, name: "B.P.W (Bust Point Width)", value: "", order: 9 },
  { id: 10, name: "Shoulder", value: "", order: 10 },
  { id: 11, name: "B. Width I", value: "", order: 11 },
  { id: 12, name: "B. Width II", value: "", order: 12 },
  { id: 13, name: "B. Length", value: "", order: 13 },
  { id: 14, name: "Armhole", value: "", order: 14 },
  { id: 15, name: "Elbow Length", value: "", order: 15 },
  { id: 16, name: "Elbow Circle", value: "", order: 16 },
  { id: 17, name: "Sleeve", value: "", order: 17 },
  { id: 18, name: "Wrist", value: "", order: 18 },
  { id: 19, name: "Bicep", value: "", order: 19 },
  { id: 20, name: "Skirt", value: "", order: 20 },
  { id: 21, name: "Neck", value: "", order: 21 },
];

const clientName = ref("");
const measurementDate = ref(new Date().toISOString().split("T")[0]);
const fields = ref([...defaultFields]);
const notes = ref(""); // Catatan tambahan
const loading = ref(false);
const errorMessage = ref("");

// Modal untuk tambah field custom
const showAddFieldModal = ref(false);
const newFieldName = ref("");

let fieldIdCounter = defaultFields.length + 1;

const addCustomField = () => {
  if (!newFieldName.value.trim()) return;

  fields.value.push({
    id: fieldIdCounter++,
    name: newFieldName.value.trim(),
    value: "",
    order: fields.value.length + 1,
  });

  newFieldName.value = "";
  showAddFieldModal.value = false;
};

const removeField = (id: number) => {
  // Tidak bisa hapus jika hanya tersisa 1 field
  if (fields.value.length <= 1) return;
  fields.value = fields.value.filter((f) => f.id !== id);
};

const handleSubmit = async () => {
  if (!clientName.value.trim()) {
    errorMessage.value = "Nama client harus diisi!";
    return;
  }

  loading.value = true;
  errorMessage.value = "";

  try {
    // Convert fields array to object for JSONB
    const measurementsData: Record<string, string> = {};
    fields.value.forEach((field) => {
      if (field.value.trim()) {
        measurementsData[field.name] = field.value.trim();
      }
    });

    const { data, error } = await supabase
      .from("measurements")
      .insert({
        user_id: user.value?.id,
        client_name: clientName.value.trim(),
        date: measurementDate.value,
        measurements: measurementsData,
        notes: notes.value.trim() || null,
      })
      .select()
      .single();

    if (error) throw error;

    // Redirect ke data page
    await router.push("/pengukuran/data");
  } catch (error: any) {
    errorMessage.value = error.message || "Gagal menyimpan data";
    console.error("Error saving measurement:", error);
  } finally {
    loading.value = false;
  }
};

const handleReset = () => {
  clientName.value = "";
  measurementDate.value = new Date().toISOString().split("T")[0];
  fields.value = defaultFields.map((f) => ({ ...f, value: "" }));
  notes.value = "";
  errorMessage.value = "";
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
          <NuxtLink to="/pengukuran/data">
            <UButton variant="ghost" icon="i-lucide-arrow-left" size="sm">
              Kembali
            </UButton>
          </NuxtLink>
          <h2
            class="text-2xl sm:text-3xl font-bold text-pink-600 dark:text-pink-400"
          >
            ➕ Tambah Pengukuran Baru
          </h2>
        </div>
      </template>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Alert Error -->
        <UAlert
          v-if="errorMessage"
          color="error"
          variant="soft"
          :title="errorMessage"
          icon="i-lucide-circle-x"
          :close-button="{
            icon: 'i-lucide-x',
            color: 'error',
            variant: 'link',
          }"
          @close="errorMessage = ''"
        />

        <!-- Client Info -->
        <div
          class="bg-pink-50 dark:bg-pink-950/20 rounded-xl p-4 border-2 border-pink-200/60 dark:border-pink-800/60 space-y-4"
        >
          <h3
            class="font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2"
          >
            <span>👤</span> Informasi Client
          </h3>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="space-y-2">
              <label
                class="block text-sm font-semibold text-gray-700 dark:text-gray-300"
              >
                Nama Client <span class="text-red-500">*</span>
              </label>
              <UInput
                v-model="clientName"
                placeholder="Contoh: Ibu Siti"
                size="lg"
                required
              />
            </div>

            <div class="space-y-2">
              <label
                class="block text-sm font-semibold text-gray-700 dark:text-gray-300"
              >
                Tanggal Pengukuran
              </label>
              <UInput v-model="measurementDate" type="date" size="lg" />
            </div>
          </div>
        </div>

        <!-- Measurements Fields -->
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <h3
              class="font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2"
            >
              <span>📏</span> Ukuran (cm)
            </h3>
            <UButton
              type="button"
              @click="showAddFieldModal = true"
              variant="ghost"
              size="sm"
              icon="i-lucide-plus"
              color="neutral"
            >
              Tambah Field
            </UButton>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div
              v-for="field in fields"
              :key="field.id"
              class="relative bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700"
            >
              <div class="flex items-start justify-between gap-2 mb-2">
                <label
                  class="text-xs font-medium text-gray-700 dark:text-gray-300 flex-1"
                >
                  {{ field.name }}
                </label>
                <button
                  v-if="fields.length > 1"
                  type="button"
                  @click="removeField(field.id)"
                  class="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <UIcon name="i-lucide-x" class="w-4 h-4" />
                </button>
              </div>
              <UInput
                v-model="field.value"
                type="text"
                placeholder="0"
                size="md"
              />
            </div>
          </div>
        </div>

        <!-- Notes Section -->
        <div class="space-y-2">
          <label
            class="block text-sm font-semibold text-gray-700 dark:text-gray-300"
          >
            📝 Catatan Tambahan
          </label>
          <UTextarea
            v-model="notes"
            placeholder="Contoh: A.line, Tangan balon, Veil, Payet simpel"
            :rows="4"
            size="lg"
          />
          <p class="text-xs text-gray-500 dark:text-gray-400">
            Tulis catatan khusus seperti model, bahan, atau detail lainnya
          </p>
        </div>

        <!-- Action Buttons -->
        <div
          class="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200 dark:border-gray-700"
        >
          <UButton
            type="submit"
            block
            size="lg"
            :loading="loading"
            :disabled="loading"
            class="bg-pink-500 hover:bg-pink-600"
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
            color="neutral"
            :disabled="loading"
          >
            <UIcon name="i-lucide-rotate-ccw" class="mr-2" />
            Reset Form
          </UButton>
        </div>
      </form>
    </UCard>

    <!-- Modal Add Custom Field -->
    <UModal v-model="showAddFieldModal">
      <UCard>
        <template #header>
          <h3 class="text-lg font-bold">Tambah Field Custom</h3>
        </template>

        <div class="space-y-4">
          <div class="space-y-2">
            <label class="block text-sm font-semibold">Nama Field</label>
            <UInput
              v-model="newFieldName"
              placeholder="Contoh: Panjang Rok"
              size="lg"
              @keyup.enter="addCustomField"
            />
          </div>
        </div>

        <template #footer>
          <div class="flex gap-2 justify-end">
            <UButton variant="ghost" @click="showAddFieldModal = false">
              Batal
            </UButton>
            <UButton
              @click="addCustomField"
              :disabled="!newFieldName.trim()"
              class="bg-pink-500 hover:bg-pink-600"
            >
              Tambah
            </UButton>
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</template>
