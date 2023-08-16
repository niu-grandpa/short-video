<template>
  <NuxtPage />
  <ClientOnly>
    <AuthOverlay />
  </ClientOnly>
</template>

<script setup>
import { message } from 'ant-design-vue';

const { $generalStore, $userStore, $profileStore } = useNuxtApp();

// 检查session是否过期
onMounted(async () => {
  if ($userStore.token) {
    const res = await $generalStore.hasSessionExpired();
    if (res) {
      message.info('登录已过期');
      $generalStore.restData();
      $userStore.restData();
      $profileStore.restData();
      $generalStore.isLoginOpen = true;
    }
  }
});
</script>
