<template>
  <div>
    <div>{{ nodeEnv }}</div>

    <div v-if="liffProfile">
      <div>Profile: {{ JSON.stringify(liffProfile) }}</div>
    </div>
    <div v-else>
      <div>LIFF Profile is not available</div>
    </div>

    <div style="padding-top: 40px">
      <button @click="scanQrCode">Scan QR Code</button>
      <div v-if="showScanCodeResult">
        {{ scanCodeResult }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Profile } from '@liff/get-profile';

const { $liff } = useNuxtApp();
// NODE_ENV
const nodeEnv = useRuntimeConfig().public.NODE_ENV;
// LIFF Profile
const liffProfile = ref<Profile | null>(null);
// show QR code result
const showScanCodeResult = ref<boolean>(false);
// Scan code result
const scanCodeResult = ref<string | null>(null);

onMounted(async () => {
  if (!$liff.isLoggedIn()) {
    $liff.login();
    const profile = await $liff.getProfile();
    liffProfile.value = profile;
  }
});

const scanQrCode = async () => {
  try {
    const result = await $liff.scanCodeV2();
    console.log(result);
    showScanCodeResult.value = true;
    scanCodeResult.value = result.value;
  } catch (error) {
    console.error(error);
  }
};
</script>
