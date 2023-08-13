<template>
  <Head>
    <Title>视频详情_short video</Title>
  </Head>

  <ARow class="overflow-hidden">
    <ACol :span="16" class="relative pl-[12px] py-[44px] bg-[black]">
      <ASpace
        direction="vertical"
        class="absolute top-[64px] right-[34px] z-20">
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

      <section class="absolute z-20 opacity-80 top-[8px] left-[12px]">
        <ATypographyTitle :level="4" style="color: white">
          这是视频标题
        </ATypographyTitle>
      </section>

      <video
        loop
        controls
        autoplay
        ref="videoRef"
        src="~/public/video.mp4"
        class="object-cover w-full h-[90vh]" />
    </ACol>

    <ACol :span="8" class="pt-[14px]" ref="commentsRef">
      <APageHeader
        title="评论"
        class="py-[0] border-b"
        :sub-title="commentLen"
        @back="() => router.push($generalStore.backUrl)" />

      <section
        class="overflow-auto h-[calc(100vh-148px)] max-h-[calc(100vh-148px)] px-[26px] pb-[24px]">
        <ClientOnly>
          <VideoComments
            :data-source="parentComments"
            @reply="onGetReplyObj"
            @load-sub-reply="onLoadSubComments" />
        </ClientOnly>
      </section>

      <VideoCommentsPost :placeholder="placeholder" @post="onPostComment" />
    </ACol>
  </ARow>

  <ClientOnly>
    <ADrawer
      title="回复"
      destroyOnClose
      :mask="false"
      v-model:open="open"
      :keyboard="false"
      :width="commentsRef?.['$el']['offsetWidth']">
      //
    </ADrawer>
  </ClientOnly>
</template>

<script setup lang="ts">
import { DownOutlined, UpOutlined } from '@ant-design/icons-vue';
import { type CommentData } from '~/components/VideoCommentItem.vue';
import { type CommentsType } from '~/components/VideoComments.vue';

const { $generalStore, $userStore } = useNuxtApp();

const route = useRoute();
const router = useRouter();

const commentsRef = ref(null);
const videoRef = ref<HTMLVideoElement | null>(null);

const open = ref(false);
const placeholder = ref('添加评论...');

const commentObj = ref<CommentData>();
const parentComments = ref<CommentsType[]>([
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
const currenParentComment = ref<CommentsType>();
const subComments = ref<CommentsType['reply']>([]);

const commentLen = computed(() => {
  const list = parentComments.value;
  return list.length + list.reduce((p, c) => p + (c.reply?.length ?? 0), 0);
});

watch(
  () => open.value,
  newVal => {
    if (!newVal) {
      placeholder.value = '';
      commentObj.value = undefined;
    }
  }
);

// 获取要回复的父评论数据
const onGetReplyObj = (res: CommentData) => {
  commentObj.value = res;
  placeholder.value = `回复 @${res.author}: `;
};

// 加载子评论列表
const onLoadSubComments = (id: string) => {
  open.value = true;
  currenParentComment.value = parentComments.value.filter(
    ({ _id }) => id === _id
  )[0];
  subComments.value = currenParentComment.value.reply;
};

const onPostComment = () => {
  $userStore.setReplyData({
    postId: route.params.id as string,
    isReplySub: open.value,
    commentObj: commentObj.value,
  });
  commentObj.value = undefined;
};
</script>
