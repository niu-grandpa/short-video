<template>
  <Head>
    <title>Microdio</title>
    <Meta
      name="description"
      content="microdio (microdio.vercel.app) 是一个刷短视频的网站" />
    <Meta
      name="keywords"
      content="Microdio,microdio,short-video,short video,短视频,在线视频网,刷短视频网站,短视频平台,有趣视频,生活视频,热点视频,人物视频,搞笑视频,娱乐视频" />
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

const {
  $generalStore: { getRandomVideo },
} = useNuxtApp();

const simpleImage = Empty.PRESENTED_IMAGE_SIMPLE;

const videos = ref<IVideo[]>([]);
const loading = ref(false);

useAsyncData(async () => {
  try {
    const data = await getRandomVideo(8);
    videos.value = data;
  } catch (err) {
    console.log(err);
  }
});

const getVideoData = async () => {
  try {
    loading.value = true;
    const data = await getRandomVideo(8);
    videos.value = data;
  } catch (error) {
    message.error('请求数据失败');
    console.log(error);
  } finally {
    loading.value = false;
  }
};

const onChange = async () => {
  window.scrollTo(0, 0);
  await getVideoData();
};
</script>
