<template>
  <NuxtPage />
  <ClientOnly>
    <AuthOverlay />
  </ClientOnly>
</template>

<script setup lang="ts">
import { message } from 'ant-design-vue';

const { $generalStore, $userStore, $profileStore } = useNuxtApp();

const router = useRouter();

// 同步本地数据
onMounted(async () => {
  const token = await $userStore.getToken();
  if (token && $generalStore.getAutoLogin()) {
    if (await $userStore.hasSessionExpired()) {
      router.replace('/');
      $generalStore.restData();
      $userStore.restData();
      $profileStore.restData();
      $generalStore.isLoginOpen = true;
      message.info('登录已过期');
    } else {
      // @ts-ignore
      await $userStore.login({ token });
      await $generalStore.getUserData();
    }
  }
});
</script>
