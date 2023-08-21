<template>
  <ASpin :spinning="spinning" :delay="800">
    <section
      @contextmenu.prevent=""
      @mouseenter="() => onVideoHover(true)"
      @mouseleave="() => onVideoHover(false)"
      class="relative w-[260px] h-[480px] min-h-[480px] max-h-[580px] max-w-[260px] bg-black rounded-xl">
      <section class="absolute w-full top-[12px] px-[6px] text-white z-20">
        <ARow justify="center">
          <ACol :span="5">
            <NuxtLink to="/profile/1">
              <AAvatar
                :size="42"
                :src="data.avatar"
                class="border-3 border-white" />
            </NuxtLink>
          </ACol>

          <ACol :span="18">
            <section class="font-extrabold">
              <p
                class="inline-block max-w-100px w-[100px] overflow-hidden whitespace-nowrap overflow-ellipsis">
                {{ data.author }}
              </p>
              <button
                @click="onFollow"
                :class="isFollow ? 'bg-gray-500' : ''"
                class="ml-[8px] py-[2px] px-[8px] rounded-xl bg-[#ff4d4f] text-[10px]">
                <span class="mr-[4px]">
                  <PlusOutlined v-if="!isFollow" />
                  <CheckOutlined v-else />
                </span>
                <span>{{ !isFollow ? '' : '已' }}关注</span>
              </button>
            </section>

            <small class="relative top-[-5px]">{{ authorFollowers }}粉丝</small>
          </ACol>
        </ARow>

        <div
          class="p-[4px] max-w-235px w-[235px] overflow-hidden whitespace-nowrap overflow-ellipsis">
          <ATypographyText
            strong
            :class="{ 'w-[150px]': ellipsis }"
            class="text-white"
            :content="data.title" />
          <small class="block">{{ data.watched }} 播放</small>
        </div>
      </section>

      <video
        loop
        muted
        ref="videoRef"
        :src="data.url"
        @click="() => $router.push(`/post/${data._id}`)"
        class="object-cover mx-auto h-full cursor-pointer rounded-xl" />

      <VideoActionBar
        :postId="data._id!"
        :likes="data.likes.length"
        :comments="0"
        :star="data.favorites.length" />

      <PlayCircleOutlined
        v-show="!isHover"
        class="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-[3.5rem] text-white" />
    </section>
  </ASpin>
</template>

<script setup lang="ts">
import { useASDCallback, useDebounce } from '@/hooks';
import { message } from 'ant-design-vue';
import { IVideo } from '~/services/types/video_api';

const { $userStore, $profileStore, $generalStore } = useNuxtApp();

const props = defineProps<{ dataSource: object }>();

const data = ref<IVideo>(props.dataSource as IVideo);
const videoRef = ref<HTMLVideoElement | null>(null);
const isFollow = ref($profileStore.following.includes(data.value.uid));

const isHover = ref(false);
const ellipsis = ref(true);
const spinning = ref(true);
const authorFollowers = ref(0);

onMounted(async () => {
  try {
    const { following } = await $profileStore.getProfile(data.value.uid);
    authorFollowers.value = following.length;
  } catch (error) {
    console.warn('user not found');
  }
});

onMounted(() => {
  if (videoRef.value) {
    videoRef.value.addEventListener(
      'loadeddata',
      () => (spinning.value = false)
    );
  }
});

const onVideoHover = useDebounce((flag: boolean) => {
  isHover.value = flag;
  videoRef.value![flag ? 'play' : 'pause']();
}, 500);

const onFollow = useASDCallback(async () => {
  try {
    const flag = !isFollow.value;
    await $generalStore.following({
      uid: $userStore.uid,
      someone: data.value.uid,
      flag,
    });
    isFollow.value = flag;
    flag && message.success('关注成功');
  } catch (error) {
    message.error('关注失败');
  }
});
</script>
