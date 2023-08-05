<template>
  <MainLayout>
    <section class="w-[100%] flex flex-wrap pt-[80px] ml-[48px]">
      <!-- todo 滚动加载优化 -->
      <PostMain />
      <!-- <template v-for="post in $generalStore.posts" :key="post">
        <PostMain v-if="post" :post="post" />
      </template> -->
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
