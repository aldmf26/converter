// composables/useVideoDownloader.ts
export const useVideoDownloader = () => {
  const url = ref("")
  const showResult = ref(false)
  const isLoading = ref(false)

  const pasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText()
      url.value = text.trim()
    } catch {
      alert("Gagal paste dari clipboard. Pastikan kamu sudah mengizinkan akses clipboard.")
    }
  }

  const clearUrl = () => {
    url.value = ""
  }

  const handleConvert = async () => {
    if (!url.value.trim()) return

    isLoading.value = true
    try {
      // Nanti ganti dengan API real
      // await $fetch('/api/download', { method: 'POST', body: { url: url.value } })
      await new Promise(resolve => setTimeout(resolve, 1200)) // Fake delay
      showResult.value = true
    } catch (error) {
      alert("Link tidak valid atau server error. Coba lagi nanti.")
      console.error(error)
    } finally {
      isLoading.value = false
    }
  }

  const reset = () => {
    showResult.value = false
    url.value = ""
  }

  return {
    url,
    showResult: readonly(showResult),
    isLoading: readonly(isLoading),
    pasteFromClipboard,
    clearUrl,
    handleConvert,
    reset,
  }
}