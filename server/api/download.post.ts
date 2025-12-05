export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  const { url, platform } = body

  // Validasi input
  if (!url || !platform) {
    throw createError({
      statusCode: 400,
      message: 'URL dan platform harus diisi'
    })
  }

  // Validasi platform
  if (!['youtube', 'tiktok', 'instagram'].includes(platform)) {
    throw createError({
      statusCode: 400,
      message: 'Platform tidak didukung'
    })
  }

  try {
    // TODO: Nanti kita akan fetch video info dari external API
    // Untuk sekarang, return dummy data dulu
    
    return {
      success: true,
      data: {
        title: 'Demo Video Title',
        thumbnail: 'https://via.placeholder.com/640x360',
        platform,
        duration: '3:45',
        qualities: {
          video: [
            { quality: '1080p', format: 'MP4', size: '25.5 MB' },
            { quality: '720p', format: 'MP4', size: '15.2 MB' },
            { quality: '480p', format: 'MP4', size: '8.5 MB' },
          ],
          audio: [
            { quality: '320kbps', format: 'MP3', size: '4.2 MB' },
            { quality: '256kbps', format: 'MP3', size: '3.5 MB' },
            { quality: '128kbps', format: 'MP3', size: '2.1 MB' },
          ]
        }
      }
    }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      message: error.message || 'Gagal mengambil info video'
    })
  }
})