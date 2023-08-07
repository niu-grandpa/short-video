<template>
  <Head>
    <title>short-video 首页</title>
  </Head>
  <MainLayout>
    <PostVideo />
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
