<script setup lang="ts">
definePageMeta({
  middleware: "auth",
  layout: "dashboard",
});

const route = useRoute();
const router = useRouter();
const supabase = useSupabaseClient();
const toast = useToast();

const id = route.params.id as string;

const clientName = ref("");
const measurementDate = ref("");
const fields = ref<any[]>([]);
const notes = ref("");
const loading = ref(false);
const loadingData = ref(true);
const errorMessage = ref("");

const isAddingField = ref(false);
const quickAddFieldName = ref("");
let fieldIdCounter = 100;

// Fetch data untuk di-edit
const fetchMeasurement = async () => {
  loadingData.value = true;
  try {
    const { data, error } = await supabase
      .from("measurements")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    clientName.value = data.client_name;
    measurementDate.value = data.date;
    notes.value = data.notes || "";

    // Convert measurements (bisa array atau object)
    if (Array.isArray(data.measurements)) {
      fields.value = data.measurements.map((item: any, index: number) => ({
        id: index + 1,
        name: item.name,
        value: item.value,
        order: index + 1,
      }));
    } else if (typeof data.measurements === "object") {
      fields.value = Object.entries(data.measurements).map(
        ([name, value], index) => ({
          id: index + 1,
          name,
          value: value as string,
          order: index + 1,
        })
      );
    }

    fieldIdCounter = fields.value.length + 1;
  } catch (err: any) {
    errorMessage.value = err.message || "Gagal memuat data";
    toast.add({
      title: "Error",
      description: "Gagal memuat data",
      color: "red",
    });
  } finally {
    loadingData.value = false;
  }
};

onMounted(fetchMeasurement);

const addCustomField = () => {
  if (!quickAddFieldName.value.trim()) return;

  fields.value.push({
    id: fieldIdCounter++,
    name: quickAddFieldName.value.trim(),
    value: "",
    order: fields.value.length + 1,
  });

  quickAddFieldName.value = "";
  isAddingField.value = false;

  nextTick(() => {
    const lastInput = document.querySelector(
      `input[data-field-id="${fieldIdCounter - 1}"]`
    ) as HTMLInputElement;
    lastInput?.focus();
  });
};

const removeField = (id: number) => {
  if (fields.value.length <= 1) return;
  fields.value = fields.value.filter((f) => f.id !== id);
};

const handleKeydown = (event: KeyboardEvent, currentIndex: number) => {
  if (event.key === "Enter") {
    event.preventDefault();
    const nextInput = document.querySelector(
      `input[data-index="${currentIndex + 1}"]`
    ) as HTMLInputElement;
    if (nextInput) {
      nextInput.focus();
    } else {
      const notesTextarea = document.querySelector(
        'textarea[name="notes"]'
      ) as HTMLTextAreaElement;
      notesTextarea?.focus();
    }
  }
};

const handleSubmit = async () => {
  if (!clientName.value.trim()) {
    errorMessage.value = "Nama client harus diisi!";
    return;
  }

  loading.value = true;
  errorMessage.value = "";

  try {
    const orderedMeasurements: { name: string; value: string }[] = [];
    fields.value.forEach((field) => {
      if (field.value.trim()) {
        orderedMeasurements.push({
          name: field.name,
          value: field.value.trim(),
        });
      }
    });

    const { error } = await supabase
      .from("measurements")
      .update({
        client_name: clientName.value.trim(),
        date: measurementDate.value,
        measurements: orderedMeasurements,
        notes: notes.value.trim() || null,
      })
      .eq("id", id);

    if (error) throw error;

    toast.add({
      title: "Berhasil!",
      description: "Pengukuran berhasil diupdate",
      color: "success",
    });

    await router.push("/pengukuran/data");
  } catch (error: any) {
    errorMessage.value = error.message || "Gagal menyimpan data";
  } finally {
    loading.value = false;
  }
};

useHead({
  title: "Edit Pengukuran - Pengukuran Badan",
});
</script>

<template>
  <div class="w-full max-w-6xl space-y-6">
    <!-- Loading State -->
    <div v-if="loadingData" class="text-center py-12">
      <div class="text-5xl mb-3">⏳</div>
      <p class="text-sm text-gray-500">Memuat data...</p>
    </div>

    <UCard v-else variant="subtle" class="shadow-lg">
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
            ✏️ Edit Pengukuran
          </h2>
        </div>
      </template>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <UAlert
          v-if="errorMessage"
          color="neutral"
          variant="soft"
          :title="errorMessage"
          icon="i-lucide-circle-x"
          :close-button="{ icon: 'i-lucide-x', color: 'red', variant: 'link' }"
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

        <!-- Table Grid -->
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <h3
              class="font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2"
            >
              <span>📏</span> Ukuran (cm)
              <span class="text-xs font-normal text-gray-500"
                >- Tekan Enter untuk loncat</span
              >
            </h3>
          </div>

          <div
            class="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
          >
            <table class="w-full">
              <thead class="bg-pink-100 dark:bg-pink-950/30">
                <tr>
                  <th
                    class="text-left p-3 text-sm font-semibold text-gray-700 dark:text-gray-300"
                  >
                    No
                  </th>
                  <th
                    class="text-left p-3 text-sm font-semibold text-gray-700 dark:text-gray-300 w-2/5"
                  >
                    Nama Ukuran
                  </th>
                  <th
                    class="text-left p-3 text-sm font-semibold text-gray-700 dark:text-gray-300"
                  >
                    Nilai (cm)
                  </th>
                  <th class="w-12"></th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(field, index) in fields"
                  :key="field.id"
                  class="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                >
                  <td class="p-3">
                    <span
                      class="text-sm font-medium text-gray-800 dark:text-gray-200"
                    >
                      {{ index + 1 }}
                    </span>
                  </td>
                  <td class="p-3">
                    <span
                      class="text-sm font-medium text-gray-800 dark:text-gray-200"
                    >
                      {{ field.name }}
                    </span>
                  </td>
                  <td class="p-3">
                    <input
                      v-model="field.value"
                      type="text"
                      :data-index="index"
                      :data-field-id="field.id"
                      placeholder="Masukkan nilai"
                      @keydown="handleKeydown($event, index)"
                      @focus="($event.target as HTMLInputElement).select()"
                      class="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-pink-500 outline-none"
                    />
                  </td>
                  <td class="p-3 text-center">
                    <button
                      v-if="fields.length > 1"
                      type="button"
                      @click="removeField(field.id)"
                      class="text-gray-400 hover:text-red-500 p-1"
                      title="Hapus field"
                    >
                      <UIcon name="i-lucide-x" class="w-4 h-4" />
                    </button>
                  </td>
                </tr>

                <!-- Quick Add Field Row -->
                <tr
                  v-if="isAddingField"
                  class="border-t border-gray-200 dark:border-gray-700 bg-pink-50 dark:bg-pink-950/20"
                >
                  <td class="p-3" colspan="2">
                    <input
                      v-model="quickAddFieldName"
                      type="text"
                      placeholder="Nama field baru..."
                      @keyup.enter="addCustomField"
                      @keyup.esc="isAddingField = false"
                      class="w-full px-3 py-2 text-sm border border-pink-300 dark:border-pink-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-pink-500 outline-none"
                      autofocus
                    />
                  </td>
                  <td class="p-3" colspan="2">
                    <div class="flex gap-2">
                      <button
                        type="button"
                        @click="addCustomField"
                        class="px-3 py-1 text-sm bg-pink-500 text-white rounded-md hover:bg-pink-600"
                      >
                        Tambah
                      </button>
                      <button
                        type="button"
                        @click="isAddingField = false"
                        class="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
                      >
                        Batal
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div> 

          <!-- Button Tambah Field -->
          <button
            v-if="!isAddingField"
            type="button"
            @click="isAddingField = true"
            class="text-sm text-pink-600 dark:text-pink-400 hover:text-pink-700 font-medium flex items-center gap-2"
          >
            <UIcon name="i-lucide-plus" class="w-4 h-4" />
            Tambah Field Custom
          </button>
        </div>

        <!-- Notes Section -->
        <div class="space-y-2">
          <label
            class="block text-sm font-semibold text-gray-700 dark:text-gray-300"
          >
            📝 Catatan Tambahan
          </label>
          <textarea
            v-model="notes"
            name="notes"
            placeholder="Contoh: A.line, Tangan balon, Veil, Payet simpel"
            rows="4"
            class="w-full px-4 py-3 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-pink-500 outline-none resize-none"
          ></textarea>
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
              Update Pengukuran
            </template>
            <template v-else> Menyimpan... </template>
          </UButton>

          <NuxtLink to="/pengukuran/data" class="block">
            <UButton
              type="button"
              block
              size="lg"
              variant="outline"
              color="neutral"
              :disabled="loading"
            >
              <UIcon name="i-lucide-x" class="mr-2" />
              Batal
            </UButton>
          </NuxtLink>
        </div>
      </form>
    </UCard>
  </div>
</template>
