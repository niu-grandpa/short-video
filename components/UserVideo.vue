<template>
  <ARow :gutter="[24, 94]">
    <ACol :span="6" @click="() => onPostVideo(1)">
      <section class="relative w-[250px] h-[150px] bg-black rounded-xl">
        <PlayCircleOutlined
          style="font-size: 48px; color: #ffffff"
          class="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]" />

        <video
          muted
          ref="videoRef"
          src="~/public/video.mp4"
          class="object-cover w-full h-full cursor-pointer rounded-xl" />

        <section
          class="w-[250px] px-[8px] flex absolute bottom-[4px] text-[white] font-medium">
          <div class="w-[120px] flex items-center">
            <PlaySquareOutlined class="mr-[6px]" /> 112.4万
          </div>
          <div class="w-[250px] flex justify-between">
            <div class="flex items-center">
              <ProfileOutlined class="mr-[6px]" /> 237万
            </div>
            <div>39:32</div>
          </div>
        </section>

        <ATypographyParagraph
          strong
          title="xxx"
          class="pt-[8px] pr-[14px] h-[52px]"
          style="margin-bottom: 2px"
          :ellipsis="{ rows: 2, symbol: '...' }"
          content="流水的BGM，铁打的奥德彪！男人减速带之奥德家族全系列下饭解说" />

        <ATypographyText type="secondary" class="flex items-center">
          <UserOutlined class="mr-[4px]" /> 大魔王 · 8-2
        </ATypographyText>
      </section>
    </ACol>
  </ARow>
</template>

<script setup lang="ts">
const { $generalStore } = useNuxtApp();

const route = useRoute();
const router = useRouter();

const videoRef = ref<HTMLVideoElement | null>(null);

const onPostVideo = (id: number) => {
  router.push(`/post/${id}`);
  $generalStore.setBackUrl(`/profile/${route.params.id}`);
};
</script>
