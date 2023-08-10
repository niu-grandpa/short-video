<template>
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

    <ACol :span="8" class="p-[12px] overflow-auto max-h-[calc(100vh-44px)]">
      <Comment />
    </ACol>
  </ARow>
</template>

<script setup lang="ts">
import { DownOutlined, UpOutlined } from '@ant-design/icons-vue';

const videoRef = ref<HTMLVideoElement | null>(null);

onMounted(() => {
  const elm = videoRef.value;
  if (elm) {
    elm.onloadeddata = () => {
      elm.play();
    };
  }
});
</script>
