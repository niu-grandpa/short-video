<template>
  <ul class="absolute bottom-[64px] right-[10px] text-white z-20">
    <li class="text-center cursor-pointer mb-[16px]" @click="onLike">
      <LikeTwoTone
        class="text-2xl"
        :two-tone-color="isLike ? '#ff4d4f' : '#ffffff'" />
      <p>{{ props.likes }}</p>
    </li>
    <li class="text-center cursor-pointer mb-[16px]" @click="onComment">
      <MessageTwoTone class="text-2xl" two-tone-color="#ffffff" />
      <p>{{ props.comments }}</p>
    </li>
    <li class="text-center cursor-pointer mb-[16px]" @click="onFollow">
      <StarTwoTone
        class="text-2xl"
        :two-tone-color="isStar ? '#ff4d4f' : '#ffffff'" />
      <p>{{ props.star }}</p>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { useASDCallback } from '@/hooks';

const props = defineProps<{
  postId: string;
  likes: number;
  comments: number;
  star: number;
}>();

const route = useRoute();
const router = useRouter();

const isLike = ref(false);
const isStar = ref(false);

const onLike = useASDCallback(() => {
  isLike.value = !isLike.value;
});

const onComment = useASDCallback(() => {
  if (route.fullPath === '/') {
    router.push(`/post-video/${props.postId}`);
  }
});

const onFollow = useASDCallback(() => {
  isStar.value = !isStar.value;
});
</script>
