<template>
  <Head>
    <title>short-video 首页</title>
  </Head>
  <SrcollLoading @load-more="onLoadMore">
    <MainLayout>
      <ARow class="my-[18px]" :gutter="[48, 48]" style="margin-right: 0">
        <ACol :span="6"><VideoPreview /></ACol>
        <ACol :span="6"><VideoPreview /></ACol>
        <ACol :span="6"><VideoPreview /></ACol>
        <ACol :span="6"><VideoPreview /></ACol>
        <ACol :span="6"><VideoPreview /></ACol>
        <ACol :span="6"><VideoPreview /></ACol>
        <ACol :span="6"><VideoPreview /></ACol>
      </ARow>
    </MainLayout>
  </SrcollLoading>
</template>

<script setup lang="ts">
import { MainLayout } from '~/layouts';

const { $generalStore } = useNuxtApp();

const onLoadMore = (data: any) => {
  console.log('loaded more: ', data);
};
</script>

<style>
body {
  overflow: hidden;
}
</style>
