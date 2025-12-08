import { defineEventHandler, getQuery, createError } from 'h3'
import ytdl from '@distube/ytdl-core'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const url = query.url as string
  const itag = query.itag ? parseInt(query.itag as string) : undefined

  if (!url || !ytdl.validateURL(url)) {
    throw createError({ 
      statusCode: 400, 
      statusMessage: 'Link YouTube tidak valid!' 
    })
  }

  try {
    const agent = ytdl.createAgent([], { localAddress: undefined })
    const info = await ytdl.getInfo(url, { agent })

    // Pilih format berdasarkan itag atau default
    const format = itag 
      ? ytdl.chooseFormat(info.formats, { quality: itag })
      : ytdl.chooseFormat(info.formats, { 
          quality: 'highestvideo',
          filter: format => format.hasVideo && format.hasAudio
        }) || ytdl.chooseFormat(info.formats, { quality: 'highest' })

    const title = info.videoDetails.title
      .replace(/[^\w\s-]/gi, '_')
      .replace(/\s+/g, '_')
      .substring(0, 100)

    const extension = format.container || 'mp4'

    event.node.res.setHeader('Content-Type', format.mimeType || 'video/mp4')
    event.node.res.setHeader(
      'Content-Disposition',
      `attachment; filename="${title}.${extension}"`
    )
    event.node.res.setHeader('Cache-Control', 'no-store, max-age=0')

    // Stream langsung!
    const stream = ytdl.downloadFromInfo(info, { format, agent })
    stream.pipe(event.node.res)

    // Cleanup saat selesai/aborted
    event.node.res.on('close', () => {
      stream.destroy()
      event.node.res.end()
    })

  } catch (error: any) {
    console.error('ytdl error:', error.message)
    throw createError({
      statusCode: 500,
      statusMessage: error.message.includes('private') || error.message.includes('unavailable')
        ? 'Video private, age-restricted, atau tidak tersedia'
        : 'Gagal download. Coba link lain atau refresh.'
    })
  }
})