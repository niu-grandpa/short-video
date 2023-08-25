<template>
  <ul class="absolute bottom-[64px] right-[10px] text-white z-20">
    <li class="text-center cursor-pointer mb-[16px]" @click="onLike">
      <LikeTwoTone
        class="text-2xl"
        :two-tone-color="isLike ? '#ff4d4f' : '#ffffff'" />
      <p>{{ props.likes.length }}</p>
    </li>
    <li class="text-center cursor-pointer mb-[16px]" @click="onComment">
      <MessageTwoTone class="text-2xl" two-tone-color="#ffffff" />
      <p>{{ props.comments }}</p>
    </li>
    <li class="text-center cursor-pointer mb-[16px]" @click="onFavorite">
      <StarTwoTone
        class="text-2xl"
        :two-tone-color="isStar ? '#ff4d4f' : '#ffffff'" />
      <p>{{ props.favorites.length }}</p>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { useASDCallback } from '@/hooks';
import { message } from 'ant-design-vue';

const {
  $userStore: { uid },
  $generalStore: { favorites, likeVideo },
} = useNuxtApp();

const props = defineProps<{
  postId: string;
  authorId: string;
  likes: string[];
  comments: number;
  favorites: string[];
}>();

const router = useRouter();

const isLike = ref(props.likes.includes(uid));
const isStar = ref(props.favorites.includes(uid));

const onLike = useASDCallback(async () => {
  try {
    const flag = !isLike.value;
    await likeVideo({ vid: props.postId, uid, flag });
    isLike.value = flag;
  } catch (error) {
    message.error('点赞失败');
  }
});

const onComment = useASDCallback(() => {
  router.push(`/post-video/${props.postId}`);
});

const onFavorite = useASDCallback(async () => {
  try {
    const flag = isStar.value;
    await favorites({ uid, flag, vid: props.postId });
    isStar.value = flag;
  } catch (error) {
    message.error('收藏失败');
  }
});
</script>
