// This function is executed before instantiating the app
// only in client-side.
// document: https://nuxtjs.org/docs/2.x/directory-structure/plugins

// import NPM version LIFF JS SDK
import liff from '@line/liff';
import { LiffMockPlugin } from '@line/liff-mock';
import { MockData } from '@line/liff-mock/dist/store/MockDataStore';
import { getMockProfile } from '../liff-mock';

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  // LIFF ID
  const liffId = config.public.LIFF_ID!;
  // is development mode
  const isDevelopment = process.env.NODE_ENV === 'development';
  // Use LiffMockPlugin when development
  if (isDevelopment) {
    // get Test user ID
    const testUserId = config.public.TEST_USER_ID || 'U0000001';
    liff.use(new LiffMockPlugin());
    // set Mock data
    liff.$mock.set((data: Partial<MockData>) => ({
      ...data,
      isInClient: true,
      getProfile: getMockProfile(testUserId),
    }));
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
