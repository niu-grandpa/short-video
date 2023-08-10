<template>
   <section  @mouseenter="() => onVideoHover(true)" @mouseleave="() => onVideoHover(false)"
    class="relative w-[260px] h-[480px] min-h-[480px] max-h-[580px] max-w-[260px] bg-black rounded-xl">
  
    <section class="absolute w-full top-[12px] px-[6px] text-white z-20" >
      <ARow justify="center">
        <ACol :span="5">
          <AAvatar :size="42" :src="UserIcon" class="border-3 border-white" />
        </ACol>

        <ACol :span="18">
          <p class="font-extrabold">
          <p class="inline-block max-w-100px w-[100px] overflow-hidden whitespace-nowrap overflow-ellipsis">
            用户名用户名用户名
          </p>

          <button @click="onFollow" :class="isFollow ? 'bg-gray-500' : ''"
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
      <p class="pt-[4px] font-extrabold max-w-235px w-[235px] overflow-hidden whitespace-nowrap overflow-ellipsis"
        title="顶针《抽不起》 1567 播放">
        顶针《抽不起》 1567 播放
      </p>
    </section>

    <video 
      loop 
      muted 
      ref="videoRef" 
      @click="onToPost"
      src="~/public/video.mp4"
      class="object-cover mx-auto h-full cursor-pointer rounded-xl"
     />

    <VideoActionBar :postId="1" :likes="0" :comments="0" :star="0" />

    <PlayCircleOutlined class="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-[3.5rem] text-white" v-if="!isHover" />
  </section>
</template>

<script setup lang="ts">
import UserIcon from '@/assets/images/user-placeholder.jpg';
import { useASDCallback, useDebounce } from '@/hooks';

const props = defineProps<{
  //
}>();

const router = useRouter()

const videoRef = ref<HTMLVideoElement | null>(null);
const isFollow = ref(false);
const isHover = ref(false);

const onVideoHover = useDebounce((flag: boolean) => {
  isHover.value = flag;
  videoRef.value?.[flag ? 'play' : 'pause']();
},300)

const onFollow = useASDCallback(() => {
  isFollow.value = !isFollow.value;
});

const onToPost = useASDCallback(() => {
  router.push(`/post/${1}`)
})
</script>
