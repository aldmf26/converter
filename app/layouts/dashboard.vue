<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const route = useRoute();
const { user, signOut } = useAuth();
const router = useRouter();

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: "Dashboard",
    to: "/pengukuran",
    icon: "i-lucide-layout-dashboard",
    active: route.path === "/pengukuran",
  },
  {
    label: "Data Pengukuran",
    to: "/pengukuran/data",
    icon: "i-lucide-database",
    active: route.path.startsWith("/pengukuran/data"),
  },
  {
    label: "Tambah Pengukuran",
    to: "/pengukuran/create",
    icon: "i-lucide-plus-circle",
    active: route.path === "/pengukuran/create",
  },
  {
    label: "Riwayat",
    to: "/pengukuran/history",
    icon: "i-lucide-history",
    active: route.path === "/pengukuran/history",
  },
]);

const handleLogout = async () => {
  const { error } = await signOut();
  if (!error) {
    await router.push("/");
  }
};
</script>

<template>
  <UHeader>
    <template #title>
      <NuxtLink to="/" class="flex items-center gap-2">
        <div class="text-2xl">✂️</div>
        <h1
          class="font-bold text-lg bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent"
        >
          JeneryMF
        </h1>
      </NuxtLink>
    </template>
    <UNavigationMenu :items="items" />

    <template #right>
      <div class="flex items-center gap-2">
        <!-- User Info -->
        <div class="hidden sm:block text-right mr-2">
          <p class="text-xs text-gray-600 dark:text-gray-400">Logged in as</p>
          <p class="text-sm font-semibold text-gray-800 dark:text-gray-200">
            {{ user?.email }}
          </p>
        </div>

        <UColorModeButton />

        <UTooltip text="Instagram">
          <UButton
            color="neutral"
            variant="ghost"
            to="https://instagram.com/@aldiiimf"
            target="_blank"
            icon="i-simple-icons-instagram"
            aria-label="Instagram"
          />
        </UTooltip>

        <UTooltip text="Logout">
          <UButton
            @click="handleLogout"
            color="error"
            variant="ghost"
            class="cursor-pointer"
            icon="i-lucide-log-out"
            aria-label="Logout"
          />
        </UTooltip>
      </div>
    </template>

    <template #body>
      <UNavigationMenu :items="items" orientation="vertical" class="-mx-2.5" />
    </template>
  </UHeader>

  <UContainer
    class="sm:mt-8 flex flex-col items-center justify-center w-full px-3 sm:px-4"
  >
    <slot />
  </UContainer>
</template>
