<template>
  <section
    class="relative w-[260px] h-[480px] min-h-[480px] max-h-[580px] max-w-[260px] bg-black rounded-xl">
    <section class="absolute w-full top-[12px] px-[6px] text-white z-20">
      <ARow justify="center" >
        <ACol :span="5">
          <AAvatar :size="42" :src="UserIcon" class="border-3 border-white" />
        </ACol>
        <ACol :span="18">
          <p class="font-extrabold">
            <p
              class="inline-block max-w-100px w-[100px] overflow-hidden whitespace-nowrap overflow-ellipsis"
              >
              用户名用户名用户名
              </p>
            <button
              @click="onFollow"
              :class="isFollow ? 'bg-gray-500' : ''"
              class="ml-[8px] py-[2px] px-[8px] rounded-xl bg-[#ff4d4f] text-[10px]">
              <span class="relative top-[-3px]">
                <PlusOutlined v-if="!isFollow" />
              <CheckOutlined v-else />
              </span>
              {{ !isFollow ? '' : '已' }}关注
            </button>
          </p>
          <small class="relative top-[-5px]">33粉丝</small>
        </ACol>
      </ARow>
      <p class="pt-[4px] font-extrabold max-w-235px w-[235px] overflow-hidden whitespace-nowrap overflow-ellipsis" title="顶针《抽不起》 1567 播放">
        顶针《抽不起》 1567 播放
      </p>
    </section>

    <video
      loop
      muted
      ref="videoRef"
      src="~/public/video.mp4"
      class="object-cover mx-auto h-full cursor-pointer rounded-xl" />

    <VideoActionBar :likes="0" :comments="0" :star="0" />
  </section>
</template>

<script setup lang="ts">
import UserIcon from '@/assets/images/user-placeholder.jpg';

const props = defineProps<{
  //
}>();

const videoRef = ref<HTMLVideoElement | null>(null);
const isFollow = ref(false);

let observer: IntersectionObserver;

onMounted(() => {
  if (videoRef.value !== null) {
    // 观察视频元素是否在可视区域内，如果是则播放，反之暂停
    observer = new IntersectionObserver(([interl]) => {
      if (interl.isIntersecting) {
        videoRef.value!.play();
      } else {
        videoRef.value!.pause();
      }
    });
    observer.observe(videoRef.value);
  }
});

onBeforeUnmount(() => {
  observer.disconnect();
});

const onFollow = () => {
  isFollow.value = !isFollow.value;
  
};
</script>
