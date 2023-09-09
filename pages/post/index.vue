<template>
  <Head>
    <Title>{{ currentVideo?.title }}_short video</Title>
  </Head>

  <ARow style="overflow: hidden">
    <ACol :span="15" class="relative bg-[black] h-[100vh]">
      <VideoSwiper
        v-if="initVideoData.length"
        :default-data="initVideoData"
        @change="(data) => (currentVideo = data as IVideo)" />
    </ACol>

    <ACol :span="9" class="pt-[14px]" ref="commentsRef">
      <APageHeader
        :title="`${currentVideo?.title} - ${currentVideo?.author}`"
        class="py-[0]"
        @back="() => $router.push($generalStore.backUrl)" />
      <ADivider class="px-[18px]" style="margin: 0; margin-top: 12px">
        评论区 ({{ currentVideo?.comments }})
      </ADivider>
      <LazyVideoComments
        :belong="vid"
        :level="CommentLevel.ONE"
        max-height="calc(100vh - 188px)"
        @get-secondary="onLoadSecondary" />
    </ACol>
  </ARow>

  <ClientOnly>
    <ADrawer
      title="回复"
      destroyOnClose
      :mask="false"
      v-model:open="openDrawer"
      :keyboard="false"
      :bodyStyle="{ padding: 0 }"
      :width="drawerWidth">
      <LazyVideoComments
        :belong="cpId"
        is-secondary
        :level="CommentLevel.TOW"
        max-height="calc(100vh - 151px)" />
    </ADrawer>
  </ClientOnly>
</template>

<script setup lang="ts">
import { CommentLevel } from '~/services/types/comment_api';
import { IVideo } from '~/services/types/video_api';

const {
  $generalStore: { getOneVideo },
} = useNuxtApp();

const {
  query: { id },
} = useRoute();

const vid = id as string;

// 隶属于子评论的父级id
const cpId = ref('');
const openDrawer = ref(false);
const commentsRef = ref(null);
const currentVideo = ref<IVideo>();
const initVideoData = ref<IVideo[]>([]);

const drawerWidth = computed(
  () => commentsRef.value?.['$el']['offsetWidth']! - 54
);

onMounted(async () => {
  try {
    const data = await getOneVideo(vid);
    currentVideo.value = data;
    // 多加的一个用于初始轮播数据，才能显示箭头
    const init = [data, data];
    initVideoData.value = init;
  } catch (error) {
    console.log('视频不存在');
  }
});

// 加载子评论
const onLoadSecondary = (pId: string) => {
  cpId.value = pId;
  openDrawer.value = true;
};
</script>
