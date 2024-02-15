// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: './src',
  app: {
    head: {
      title: 'LIFF mock sample',
      htmlAttrs: {
        lang: 'ja',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: '' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      NODE_ENV: process.env.NODE_ENV,
      LIFF_ID: process.env.LIFF_ID || 'TEST-1234567890',
      TEST_USER_ID: process.env.TEST_USER_ID,
    },
  },
});
