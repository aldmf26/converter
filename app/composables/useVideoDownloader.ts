// composables/useVideoDownloader.ts

type Platform = 'youtube' | 'tiktok' | 'instagram' | null

type VideoInfo = {
  title: string
  thumbnail: string
  platform: string
  duration: string
  qualities: {
    video: Array<{ quality: string; format: string; size: string }>
    audio: Array<{ quality: string; format: string; size: string }>
  }
}

export const useVideoDownloader = () => {
  const url = ref("")
  const showResult = ref(false)
  const isLoading = ref(false)
  const detectedPlatform = ref<Platform>(null)
  const videoInfo = ref<VideoInfo | null>(null)
  const error = ref<string | null>(null)

  // Deteksi platform dari URL
  const detectPlatform = (videoUrl: string): Platform => {
    const urlLower = videoUrl.toLowerCase()
    
    if (urlLower.includes('youtube.com') || urlLower.includes('youtu.be')) {
      return 'youtube'
    }
    
    if (urlLower.includes('tiktok.com')) {
      return 'tiktok'
    }
    
    if (urlLower.includes('instagram.com')) {
      return 'instagram'
    }
    
    return null
  }

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
    detectedPlatform.value = null
        error.value = null

  }

  const handleConvert = async () => {
    if (!url.value.trim()) {
      alert("Masukkan link video terlebih dahulu!")
      return
    }

    // Deteksi platform
    const platform = detectPlatform(url.value)
    detectedPlatform.value = platform

    if (!platform) {
      alert("Link tidak valid! Hanya support YouTube, TikTok, dan Instagram.")
      return
    }

    // Alert platform yang terdeteksi
    const platformNames = {
      youtube: 'YouTube',
      tiktok: 'TikTok',
      instagram: 'Instagram'
    }
    
    alert(`Platform terdeteksi: ${platformNames[platform]}`)

    isLoading.value = true
    error.value = null
    
    try {
      // Call API untuk fetch video info
      const response: { success: boolean; data: VideoInfo | null } = await $fetch('api/download', { 
        method: 'POST', 
        body: { url: url.value, platform } 
      })
      
      if (response.success && response.data) {
        videoInfo.value = response.data
        showResult.value = true
      }
    } catch (err: any) {
      error.value = err.data?.message || "Link tidak valid atau server error. Coba lagi nanti."
      alert(error.value)
      console.error(err)
    } finally {
      isLoading.value = false
    }
  }

  const reset = () => {
    showResult.value = false
    url.value = ""
    detectedPlatform.value = null
    videoInfo.value = null
    error.value = null
  }

  return {
    url,
    showResult: readonly(showResult),
    isLoading: readonly(isLoading),
    detectedPlatform: readonly(detectedPlatform),
    videoInfo: readonly(videoInfo),
    error: readonly(error),
    pasteFromClipboard,
    clearUrl,
    handleConvert,
    reset,
  }
}