<template>
  <Head>
    <title>short-video 首页</title>
  </Head>

  <MainLayout
    ref="containerRef"
    class="height-[100vh] overflow-y-auto overflow-x-hidden">
    <AAffix :offset-top="56">
      <AButton
        v-if="videos.length"
        :loading="loading"
        @click="onChange"
        class="relative left-[90%] top-[16px] bg-[white]">
        <template #icon><ReloadOutlined /></template>
        换一批
      </AButton>
    </AAffix>

    <ARow v-if="videos.length" :gutter="[48, 64]" class="py-[42px]">
      <ACol :span="6" v-for="item in videos" :key="item.vid">
        <VideoPreview :data-source="item" />
      </ACol>
    </ARow>

    <AEmpty
      v-else
      :image="simpleImage"
      description="暂无数据"
      class="pt-[160px]" />
  </MainLayout>
</template>

<script setup lang="ts">
import { Empty, message } from 'ant-design-vue';
import { IVideo } from 'services/types/video_api';
import { MainLayout } from '~/layouts';

const { $generalStore } = useNuxtApp();

const simpleImage = Empty.PRESENTED_IMAGE_SIMPLE;

const videos = ref<IVideo[]>([]);
const loading = ref(false);

const getVideoData = async () => {
  try {
    loading.value = true;
    const data = await $generalStore.getRandomVideo(8);
    videos.value = data;
  } catch (error) {
    message.error('请求数据失败');
    console.log(error);
  } finally {
    loading.value = false;
  }
};

onMounted(getVideoData);

const onChange = async () => {
  window.scrollTo(0, 0);
  await getVideoData();
};
</script>
