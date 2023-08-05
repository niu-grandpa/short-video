<template>
  <div
    @click="() => onDisplayPost(post)"
    @mouseenter="() => onIsHover(true)"
    @mouseleave="() => onIsHover(false)"
    class="relative brightness-90 hover:brightness-[1.1] cursor-pointer">
    <div
      v-if="!isLoaded"
      class="absolute flex items-center justify-center top-0 left-0 aspect-[3/4] w-full object-cover rounded-md bg-black">
      <Icon
        class="animate-spin ml-1"
        name="mingcute:loading-line"
        size="100"
        color="#FFFFFF" />
    </div>
    <div>
      <video
        ref="video"
        muted
        loop
        class="aspect-[3/4] object-cover rounded-md"
        :src="post.video" />
    </div>
    <div class="px-1">
      <div class="text-gray-700 text-[15px] pt-1 break-words">
        {{ post.text }}
      </div>
      <div class="flex items-center -ml-1 text-gray-600 font-bold text-xs">
        <Icon name="gg:loadbar-sound" size="20" />
        3%
        <Icon class="ml-1" name="tabler:alert-circle" size="16" />
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps(['post']);

const { $generalStore } = useNuxtApp();

const route = useRoute();
const router = useRouter();

const video = ref(null);
const isLoaded = ref(false);

// 监听视频数据加载状态
onMounted(() => {
  if (video.value) {
    video.value.addEventListener('loadeddata', e => {
      if (e.target) {
        setTimeout(() => {
          isLoaded.value = true;
        }, 200);
      }
    });
  }
});

onBeforeUnmount(() => {
  video.value.pause();
  video.value.currentTime = 0;
  video.value.src = '';
});

const onDisplayPost = post => {
  $generalStore.setBackUrl(`/profile${route.params.id}`);
  $generalStore.selectedPos = null;
  setTimeout(() => router.push(`/post/${post.id}`), 300);
};

const onIsHover = bool => {
  if (bool) {
    video.value.play();
  } else {
    video.value.pause();
  }
};
</script>
