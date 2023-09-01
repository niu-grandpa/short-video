<template>
  <Head>
    <Title>{{ videoData?.title }}_short video</Title>
  </Head>

  <ARow>
    <ACol :span="15" class="relative bg-[black] h-[100vh]">
      <ASpace
        direction="vertical"
        class="absolute top-[48px] right-[16px] z-20">
        <AButton ghost shape="circle" :icon="h(UpOutlined)" @click="onSwitch" />
        <AButton
          ghost
          shape="circle"
          :icon="h(DownOutlined)"
          @click="() => onSwitch(true)" />
      </ASpace>

      <video
        loop
        controls
        ref="videoRef"
        preload="metadata"
        :src="videoData?.url"
        class="w-full h-full" />
    </ACol>

    <ACol :span="9" class="pt-[14px]" ref="commentsRef">
      <APageHeader
        :title="`${videoData?.title} - ${videoData?.author}`"
        class="py-[0]"
        @back="() => $router.push($generalStore.backUrl)" />

      <ADivider class="px-[18px]" style="margin: 0; margin-top: 12px">
        评论区 ({{ videoData?.comments }})
      </ADivider>

      <VideoComments
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
      <VideoComments
        :belong="cpId"
        is-secondary
        :level="CommentLevel.TOW"
        max-height="calc(100vh - 151px)" />
    </ADrawer>
  </ClientOnly>
</template>

<script setup lang="ts">
import { DownOutlined, UpOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { useAdjustVideoBuffering } from '~/hooks';
import { CommentLevel } from '~/services/types/comment_api';
import { IVideo } from '~/services/types/video_api';

const {
  $generalStore: { getRandomVideo, getOneVideo },
} = useNuxtApp();

const route = useRoute();

const cpId = ref(''); // 隶属于子评论的父级id
const vid = ref(route.params.id as string);

const openDrawer = ref(false);
const commentsRef = ref(null);

const drawerWidth = computed(
  () => commentsRef.value?.['$el']['offsetWidth']! - 54
);

const videoArr = ref<IVideo[]>([]);
const videoData = ref<IVideo>();

const videoRef = ref<HTMLVideoElement | null>(null);

useAsyncData(async () => {
  try {
    return (videoData.value = await getOneVideo(vid.value));
  } catch (error) {
    console.log('视频不存在');
  }
});

onMounted(() => {
  const velm = videoRef.value;
  if (velm) {
    const adjustBuffering = useAdjustVideoBuffering(velm);
    velm.onloadeddata = () => {
      velm.play();
      adjustBuffering();
      console.log('视频加载完成');
    };
    velm.load();
  }
});

const onSwitch = async (next = false) => {
  // 数组缓存优化
  const arr = videoArr.value;
  const curIdx = 0;
  try {
    if (next) {
      const lastIdx = curIdx + 1;
      // 如果找不到栈中的下一个视频，说明是在末尾位置需要请求新视频并入栈
      if (!arr[lastIdx]) {
        const data = (await getRandomVideo(1))[0];
        arr.push(data);
      }
      // 在当前位置找到下一个
      videoData.value = arr[lastIdx];
    } else {
      const prevIdx = curIdx - 1;
      // 如果找不到栈中的上一个视频，说明是在首位需要请求新视频并压入首部
      if (!arr[prevIdx]) {
        const data = (await getRandomVideo(1))[0];
        arr.unshift(data);
      }
      // 在当前位置找到上一个
      videoData.value = arr[prevIdx];
    }
    vid.value = videoData.value.vid;
  } catch (error) {
    message.error('切换视频失败');
    console.log(error);
  }
};

// 加载子评论
const onLoadSecondary = (pId: string) => {
  cpId.value = pId;
  openDrawer.value = true;
};
</script>
