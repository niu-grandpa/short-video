<template>
  <NuxtPage />
  <!-- 权鉴登录 -->
  <ClientOnly>
    <AuthOverlay />
    <!-- <EditProfileOverlay  /> -->
  </ClientOnly>
</template>

<script setup>
const { $generalStore, $userStore } = useNuxtApp();

// 检查session是否过期
onMounted(async () => {
  //
});
</script>
