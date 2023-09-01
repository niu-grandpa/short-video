<template>
  <NuxtPage :keepalive="{ max: 3 }" />
  <ClientOnly>
    <AuthOverlay />
  </ClientOnly>
</template>

<script setup lang="ts">
import { message } from 'ant-design-vue';

const {
  $generalStore,
  $profileStore: { getProfile },
  $userStore: { login, getToken, hasSessionExpired, getOne },
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
      await login({ token });
      await getOne();
      await getProfile();
    }
  }
});
</script>
