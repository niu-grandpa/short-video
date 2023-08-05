<template>
  <NuxtPage />
  <!-- 权鉴登录状态 -->
  <AuthOverlay v-if="isLoginOpen" />
  <EditProfileOverlay v-if="isEditProfileOpen" />
</template>

<script setup>
import { storeToRefs } from 'pinia';

const { $generalStore, $userStore } = useNuxtApp();
const { isLoginOpen, isEditProfileOpen } = storeToRefs($generalStore);

// 检查session是否过期
onMounted(async () => {
  $generalStore.bodySwitch(false);
  isLoginOpen.value = false;
  isEditProfileOpen.value = false;

  try {
    await $generalStore.hasSessionExpired();
    await $generalStore.getRandomUsers('suggested');
    await $generalStore.getRandomUsers('following');

    $userStore.id && $userStore.getUser();
  } catch (error) {
    console.log(error);
  }
});

// 防止打开登录框, 页面依然可以滚动
watch(
  () => isLoginOpen.value,
  val => $generalStore.bodySwitch(val)
);
watch(
  () => isEditProfileOpen.value,
  val => $generalStore.bodySwitch(val)
);
</script>
