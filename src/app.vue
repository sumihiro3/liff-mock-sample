<template>
  <div>
    <div>{{ nodeEnv }}</div>

    <div v-if="liffProfile">
      <div>Profile: {{ JSON.stringify(liffProfile) }}</div>
    </div>
    <div v-else>
      <div>LIFF Profile is not available</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Profile } from '@liff/get-profile';
import liff from '@line/liff';

const { $liff } = useNuxtApp();
// NODE_ENV
const nodeEnv = useRuntimeConfig().public.NODE_ENV;
// LIFF Profile
const liffProfile = ref<Profile | null>(null);

onMounted(async () => {
  if (!$liff.isInClient()) liff.login();
  // if ($liff.isLoggedIn()) {
  const profile = await $liff.getProfile();
  liffProfile.value = profile;
  // }
});
</script>
