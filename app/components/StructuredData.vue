<script setup lang="ts">
const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "JeneryMF Tools",
  applicationCategory: "UtilitiesApplication",
  description:
    "Tools gratis untuk penjahit: Kalkulator Armhole dan Pengukuran Badan. Hitung TP, Bisep, Kerung dengan mudah dan akurat.",
  url: "https://jenerym.vercel.app",
  author: {
    "@type": "Person",
    name: "JeneryMF",
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "IDR",
  },
  featureList: [
    "Kalkulator Armhole",
    "Pengukuran Badan",
    "Hitung TP, Bisep, Kerung",
    "Database Pengukuran",
  ],
  keywords:
    "JeneryMF, kalkulator armhole, pengukuran badan, tools jahit, alat penjahit",
  inLanguage: "id-ID",
  operatingSystem: "Any",
  browserRequirements: "Requires JavaScript. Requires HTML5.",
};
useHead({
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify(structuredData),
    },
  ],
});
</script>

<template>
  <div></div>
</template>
