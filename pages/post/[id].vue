<template>
  <Head>
    <Title>视频详情_short video</Title>
  </Head>

  <ARow class="overflow-hidden">
    <ACol :span="16" class="relative">
      <ASpace
        direction="vertical"
        class="absolute top-[28px] right-[28px] z-20">
        <AButton
          ghost
          shape="circle"
          :icon="h(UpOutlined)"
          class="flex items-center justify-center" />
        <AButton
          ghost
          shape="circle"
          :icon="h(DownOutlined)"
          class="flex items-center justify-center" />
      </ASpace>

      <section class="absolute z-20 opacity-80 top-[18px] left-[28px]">
        <ATypographyTitle :level="3" style="color: white">
          这是视频标题
        </ATypographyTitle>
      </section>

      <video
        loop
        controls
        autoplay
        ref="videoRef"
        src="~/public/video.mp4"
        class="object-cover w-full h-[100vh]" />
    </ACol>

    <ACol :span="8" class="pt-[14px] px-[20px] overflow-auto max-h-[100vh]">
      <APageHeader
        title="评论区"
        class="p-[0] pb-[16px]"
        :sub-title="commentLen"
        @back="() => router.push($generalStore.backUrl)" />
      <ClientOnly>
        <VideoComments :data-source="comments" />
      </ClientOnly>
    </ACol>
  </ARow>
</template>

<script setup lang="ts">
import { type CommentsType } from '@/components/VideoComments.vue';
import { DownOutlined, UpOutlined } from '@ant-design/icons-vue';

const { $generalStore } = useNuxtApp();

const router = useRouter();

const videoRef = ref<HTMLVideoElement | null>(null);
const comments = ref<CommentsType[]>([
  {
    _id: 'string',
    author: 'Jshon',
    avatar: '',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently. ',
    likes: 164,
    dislikes: 0,
    datetime: 1691722553102,
    reply: [
      {
        _id: 'string2',
        parentId: 'string',
        author: 'Jshon2',
        avatar: '',
        content: 'We supply a series of design principles',
        likes: 164,
        dislikes: 0,
        datetime: 1691722553102,
      },
      {
        _id: 'string3',
        parentId: 'string',
        author: 'Jshon2',
        avatar: '',
        content: 'We supply a series of design principles',
        likes: 164,
        dislikes: 0,
        datetime: 1691722553102,
      },
      {
        _id: 'string4',
        parentId: 'string',
        author: 'Jshon2',
        avatar: '',
        content: 'We supply a series of design principles',
        likes: 164,
        dislikes: 0,
        datetime: 1691722553102,
      },
      {
        _id: 'string5',
        parentId: 'string',
        author: 'Jshon2',
        avatar: '',
        content: 'We supply a series of design principles',
        likes: 164,
        dislikes: 0,
        datetime: 1691722553102,
      },
      {
        _id: 'string6',
        parentId: 'string',
        author: 'Jshon2',
        avatar: '',
        content: 'We supply a series of design principles',
        likes: 164,
        dislikes: 0,
        datetime: 1691722553102,
      },
      {
        _id: 'string7',
        parentId: 'string',
        author: 'Jshon2',
        avatar: '',
        content: 'We supply a series of design principles',
        likes: 164,
        dislikes: 0,
        datetime: 1691722553102,
      },
      {
        _id: 'string8',
        parentId: 'string',
        author: 'Jshon2',
        avatar: '',
        content: 'We supply a series of design principles',
        likes: 164,
        dislikes: 0,
        datetime: 1691722553102,
      },
      {
        _id: 'string9',
        parentId: 'string',
        author: 'Jshon2',
        avatar: '',
        content: 'We supply a series of design principles',
        likes: 164,
        dislikes: 0,
        datetime: 1691722553102,
      },
      {
        _id: 'string10',
        parentId: 'string',
        author: 'Jshon2',
        avatar: '',
        content: 'We supply a series of design principles',
        likes: 164,
        dislikes: 0,
        datetime: 1691722553102,
      },
      {
        _id: 'string11',
        parentId: 'string',
        author: 'Jshon2',
        avatar: '',
        content: 'We supply a series of design principles',
        likes: 164,
        dislikes: 0,
        datetime: 1691722553102,
      },
    ],
  },
]);

const commentLen = computed(() => {
  const c = comments.value;
  return c.length + c.reduce((a, b) => a + (b.reply?.length ?? 0), 0);
});
</script>
