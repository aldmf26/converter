export default defineNuxtRouteMiddleware((to) => {
  const user = useSupabaseUser();

  // Jika user belum login, redirect ke halaman login
  if (!user.value) {
    return navigateTo({
      path: "/login",
      query: { redirect: to.fullPath },
    });
  }
});