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

const router = useRouter();

onMounted(async () => {
  if (token.value) {
    // 检查session是否过期
    if (await $userStore.hasSessionExpired()) {
      router.replace('/');
      $generalStore.restData();
      $userStore.restData();
      $profileStore.restData();
      $generalStore.isLoginOpen = true;
      message.info('登录已过期');
      // 自动登录
    } else if (!uid.value && $generalStore.isAutoLogin) {
      await $userStore.login({ token: token.value });
    }
  }
});
</script>
