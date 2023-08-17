<template>
  <NuxtPage />
  <ClientOnly>
    <AuthOverlay />
  </ClientOnly>
</template>

<script setup>
import { message } from 'ant-design-vue';

const { $generalStore, $userStore, $profileStore } = useNuxtApp();

const { token, uid } = toRefs($userStore);

// 检查session是否过期
onMounted(async () => {
  if (token) {
    const expired = await $generalStore.hasSessionExpired();
    if (expired) {
      message.info('登录已过期');
      $generalStore.restData();
      $userStore.restData();
      $profileStore.restData();
      $generalStore.isLoginOpen = true;
    } else if (!uid) {
      await $userStore.login(token);
    }
  }
});
</script>
