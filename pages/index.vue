<template>
  <Head>
    <title>short-video 首页</title>
  </Head>
  <MainLayout>
    <section class="w-[100%] flex flex-wrap">
      121

      <!-- todo 滚动加载优化 -->
      <template v-for="post in $generalStore.posts" :key="post">
        <PostMain v-if="post" :post="post" />
      </template>
    </section>
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
