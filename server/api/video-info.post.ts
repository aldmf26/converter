import { defineEventHandler, readBody, createError } from 'h3'
import ytdl from '@distube/ytdl-core'

export default defineEventHandler(async (event) => {
  const { url } = await readBody(event)

  console.log('Received URL:', url)
  console.log('Is valid URL:', ytdl.validateURL(url))

  if (!url) {
    throw createError({ 
      statusCode: 400, 
      statusMessage: 'URL tidak boleh kosong!' 
    })
  }

  if (!ytdl.validateURL(url)) {
    console.error('Invalid YouTube URL:', url)
    throw createError({ 
      statusCode: 400, 
      statusMessage: 'Link YouTube tidak valid! Pastikan format: https://youtube.com/watch?v=...' 
    })
  }

  try {
    console.log('Fetching video info...')
    const agent = ytdl.createAgent([], { localAddress: undefined })
    const info = await ytdl.getInfo(url, { agent })

    console.log('Video info fetched:', info.videoDetails.title)

    // Get available formats
    const videoFormats = info.formats
      .filter(f => f.hasVideo && f.hasAudio && f.container === 'mp4')
      .sort((a, b) => (b.height || 0) - (a.height || 0))
      .slice(0, 4) // Top 4 qualities

    const audioFormats = info.formats
      .filter(f => f.hasAudio && !f.hasVideo)
      .sort((a, b) => (b.audioBitrate || 0) - (a.audioBitrate || 0))
      .slice(0, 3) // Top 3 audio qualities

    console.log('Video formats found:', videoFormats.length)
    console.log('Audio formats found:', audioFormats.length)

    // Map to our format
    const qualities = {
      video: videoFormats.map(f => ({
        quality: `${f.height}p`,
        format: 'MP4',
        size: f.contentLength ? `${(parseInt(f.contentLength) / 1024 / 1024).toFixed(1)} MB` : 'Auto',
        itag: f.itag
      })),
      audio: audioFormats.map(f => ({
        quality: `${f.audioBitrate || 128}kbps`,
        format: 'M4A',
        size: f.contentLength ? `${(parseInt(f.contentLength) / 1024 / 1024).toFixed(1)} MB` : 'Auto',
        itag: f.itag
      }))
    }

    return {
      success: true,
      data: {
        title: info.videoDetails.title,
        thumbnail: info.videoDetails.thumbnails[0]?.url || '',
        platform: 'youtube',
        duration: new Date(parseInt(info.videoDetails.lengthSeconds) * 1000).toISOString().substr(11, 8),
        videoId: info.videoDetails.videoId,
        url: url,
        qualities
      }
    }
  } catch (error: any) {
    console.error('ytdl error:', error.message)
    console.error('Error stack:', error.stack)
    throw createError({
      statusCode: 500,
      statusMessage: error.message.includes('private') || error.message.includes('unavailable')
        ? 'Video private, age-restricted, atau tidak tersedia'
        : `Gagal mengambil info video: ${error.message}`
    })
  }
})