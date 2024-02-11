// This function is executed before instantiating the app
// only in client-side.
// document: https://nuxtjs.org/docs/2.x/directory-structure/plugins

// import NPM version LIFF JS SDK
import liff from '@line/liff';
import { LiffMockPlugin } from '@line/liff-mock';

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  // LIFF ID
  const liffId = config.public.LIFF_ID!;
  // is Local
  const isDevelopment = process.env.NODE_ENV === 'development';
  console.log(`isDevelopment: ${isDevelopment}`);
  console.log(`liffId: ${liffId}`);
  // Use LiffMockPlugin when development
  if (isDevelopment) {
    liff.use(new LiffMockPlugin());
  }
  // execute liff.init()
  liff
    .init({ liffId, mock: isDevelopment })
    .then(() => {
      console.log('LIFF init succeeded.');
    })
    .catch((error: Error) => {
      console.log('LIFF init failed.');
      return Promise.reject(error);
    });

  return {
    provide: {
      liff,
    },
  };
});
