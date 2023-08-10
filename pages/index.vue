<template>
  <Head>
    <title>short-video 首页</title>
  </Head>
  <MainLayout>
    <ARow class="my-[18px]" :gutter="[48, 48]" style="margin-right: 0">
      <ACol :span="6"><VideoPreview /></ACol>
    </ARow>
  </MainLayout>
</template>

<script setup>
import { MainLayout } from '~/layouts';

const { $generalStore } = useNuxtApp();

onMounted(async () => {
  try {
    await $generalStore.getAllUsersAndPosts();
  } catch (error) {
    console.log(error);
  }
});
</script>
