<template>
  <div>
    <!-- Page title -->
    <h1 id="page-title">ENV: {{ nodeEnv }}</h1>
    <div v-if="liffProfile" style="padding-top: 20px">
      <!-- User ID -->
      <div>
        User ID:
        <span id="user-id">{{ liffProfile.userId }}</span>
      </div>
      <!-- User Name -->
      <div>
        User Name:
        <span id="user-name">{{ liffProfile.displayName }}</span>
      </div>
      <!-- User Picture -->
      <div v-if="liffProfile.pictureUrl">
        <img
          id="user-picture"
          :src="liffProfile.pictureUrl"
          alt="Profile Picture"
        />
      </div>
      <!-- Scan QR Code -->
      <div style="padding-top: 40px">
        <button id="scan-button" @click="scanQrCode">Scan QR Code</button>
        <div id="scan-code-result" v-if="showScanCodeResult">
          {{ scanCodeResult }}
        </div>
      </div>
    </div>
    <div v-else>
      <div>Profile is not available</div>
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
