<template>
  <NuxtPage />
  <AuthOverlay />
</template>

<script setup>
const { $userStore } = useNuxtApp();

// 检查session是否过期
onMounted(async () => {
  //
});
</script>
