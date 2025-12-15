// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/ui','@nuxtjs/supabase'],
  supabase: {
    redirect: false, // Kita handle redirect manual
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'id'
      },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'JeneryMF - Tools Kalkulator Jahit & Pengukuran Badan',
      meta: [
        { 
          name: 'description', 
          content: 'JeneryMF menyediakan tools gratis untuk penjahit: Kalkulator Armhole (TP, Bisep, Kerung) dan Pengukuran Badan. Alat bantu jahit menjahit yang mudah dan akurat untuk pola baju.' 
        },
        { 
          name: 'keywords', 
          content: 'jenerym,JeneryM,jenery project,Jenery Project, JeneryMF, jenerymf, kalkulator armhole, pengukuran badan, tools jahit, alat penjahit, kalkulator jahit, pola baju, TP bisep kerung, ukuran badan jahit, armhole calculator' 
        },
        // Open Graph / Facebook
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'JeneryMF' },
        { property: 'og:title', content: 'JeneryMF - Tools Kalkulator Jahit & Pengukuran Badan' },
        { property: 'og:description', content: 'Tools gratis untuk penjahit: Kalkulator Armhole dan Pengukuran Badan. Hitung TP, Bisep, Kerung dengan mudah dan akurat.' },
        { property: 'og:image', content: '/og-image.png' }, // Nanti buat gambar ini
        { property: 'og:url', content: 'https://jenerym.vercel.app' }, // Ganti dengan domain kamu
        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'JeneryMF - Tools Kalkulator Jahit & Pengukuran Badan' },
        { name: 'twitter:description', content: 'Tools gratis untuk penjahit: Kalkulator Armhole dan Pengukuran Badan.' },
        { name: 'twitter:image', content: '/og-image.png' },
        // Additional SEO
        { name: 'author', content: 'JeneryMF' },
        { name: 'robots', content: 'index, follow' },
        { name: 'googlebot', content: 'index, follow' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'canonical', href: 'https://jenerym.vercel.app' }, // Ganti dengan domain kamu
      ]
    }
  },

  // Nitro prerendering for better SEO
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: [
        '/',
        '/armhole',
        '/login',
      ]
    }
  },
    css: ['~/assets/css/main.css']

})