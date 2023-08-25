<template>
  <NuxtPage />
  <ClientOnly>
    <AuthOverlay />
  </ClientOnly>
</template>

<script setup lang="ts">
import { message } from 'ant-design-vue';

const {
  $generalStore,
  $userStore: { login, getToken, hasSessionExpired },
} = useNuxtApp();

const router = useRouter();

// 同步本地数据
onMounted(async () => {
  const token = await getToken();
  if (token && $generalStore.getAutoLogin()) {
    if (await hasSessionExpired()) {
      router.replace('/');
      $generalStore.restAll();
      $generalStore.isLoginOpen = true;
      message.info('登录已过期');
    } else {
      // @ts-ignore
      await login({ token });
      await $generalStore.getUserData();
    }
  }
});
</script>
