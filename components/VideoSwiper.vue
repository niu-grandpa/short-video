<template>
  <ACarousel :dots="false" dot-position="right" ref="carouselRef">
    <div v-for="item in list" :key="item.vid" class="h-[100vh]">
      <video
        loop
        controls
        autoplay
        ref="videoRef"
        preload="metadata"
        :src="item.url"
        class="w-full h-full" />
    </div>
  </ACarousel>
  <div
    class="custom-slick-arrow rotate-90 top-[54px] left-[93%]"
    @click="onPrev">
    <left-circle-outlined />
  </div>
  <div
    class="custom-slick-arrow rotate-90 top-[100px] right-[30px]"
    @click="onNext">
    <right-circle-outlined />
  </div>
</template>

<script setup lang="ts">
import { CarouselRef } from 'ant-design-vue/es/carousel';
import { IVideo } from '~/services/types/video_api';

const {
  $generalStore: { getRandomVideo },
} = useNuxtApp();

const emit = defineEmits<{
  (e: 'change', data: object): void;
}>();

const props = defineProps<{
  defaultData: any[];
}>();

const first = ref(true);
const currentIdx = ref(0);
const carouselRef = ref<CarouselRef>();
const videoRef = ref<HTMLVideoElement[]>();
const list = ref<IVideo[]>(props.defaultData);

onMounted(() => {
  if (videoRef.value?.length) {
    videoRef.value.forEach(elem => {
      // 暂停播放不在可视区域的视频
      const obsever = new IntersectionObserver(([isIntersecting]) => {
        !isIntersecting ? elem.pause() : elem.play();
      });
      obsever.observe(elem);
    });
  }
});

watch(
  () => currentIdx.value,
  newVal => {
    emit('change', list.value[newVal]);
  }
);

const onNext = async () => {
  try {
    const arr = list.value;
    // 首次切换移除相同的占位视频
    if (first.value) {
      arr.pop();
      first.value = false;
    }
    if (currentIdx.value + 1 >= arr.length) {
      const [data] = await getRandomVideo(1);
      arr.push(data);
    }
    ++currentIdx.value;
    carouselRef.value?.next();
  } catch (error) {
    console.log(error);
  }
};

const onPrev = async () => {
  try {
    const arr = list.value;
    if (currentIdx.value - 1 < 0) {
      const [data] = await getRandomVideo(1);
      arr.unshift(data);
      currentIdx.value = 0;
    } else {
      --currentIdx.value;
    }
    carouselRef.value?.prev();
  } catch (error) {
    console.log(error);
  }
};

// 执行淘汰算法，控制轮播项元素的最大数量，8个
</script>

<style scoped>
.custom-slick-arrow {
  width: 34px;
  height: 34px;
  position: absolute;
  font-size: 34px;
  color: #fff;
  background-color: #1f2d3d1c;
  transition: ease all 0.3s;
  opacity: 0.3;
  z-index: 1;
  cursor: pointer;
}
.custom-slick-arrow:before {
  display: none;
}
.custom-slick-arrow:hover {
  color: #fff;
  opacity: 0.5;
}

:deep(.slick-slide h3) {
  color: #fff;
}
</style>
