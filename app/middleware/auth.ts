export default defineNuxtRouteMiddleware((to) => {
  const user = useSupabaseUser();

  // ⏳ TUNGGU dulu state auth siap
  if (user.value === undefined) {
    return;
  }

  if (!user.value) {
    return navigateTo({
      path: "/login",
      query: { redirect: to.fullPath },
    });
  }
});
