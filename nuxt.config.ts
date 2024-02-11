// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: './src',
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      NODE_ENV: process.env.NODE_ENV,
      LIFF_ID: process.env.LIFF_ID,
    },
  },
});
