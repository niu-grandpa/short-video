<template>
  <Head>
    <title>我的关注_short-video</title>
  </Head>
  <MainLayout>
    <SrcollLoading :request="{ url }" @load-more="onLoadData">
      <VideoPreview v-if="data.length" :data-source="data" />
      <AResult v-else title="好友未发布任何视频">
        <template #icon>
          <SmileTwoTone />
        </template>
      </AResult>
    </SrcollLoading>
  </MainLayout>
</template>

<script setup lang="ts">
import { message } from 'ant-design-vue';
import { MainLayout } from '~/layouts';
import { IVideo } from '~/services/types/video_api';

const {
  $profileStore: { following },
} = useNuxtApp();

const url = `/videos/get-by-uid?uid=${JSON.stringify(following)}`;

const data = ref<IVideo[]>([]);

const onLoadData = (res: IVideo[]) => {
  if (!res.length) {
    message.success('没有更多了');
    return;
  }
  data.value.concat(res);
};
</script>
