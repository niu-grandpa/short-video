<template>
  <section
    @contextmenu.prevent=""
    @mouseenter="() => onHover(true)"
    @mouseleave="() => onHover(false)"
    class="relative w-[260px] h-[480px] min-h-[480px] max-h-[580px] max-w-[260px] bg-black cursor-pointer rounded-xl">
    <AAlert
      v-if="isFail"
      banner
      type="error"
      message="资源加载失败"
      class="z-[50] absolute top-[6px] w-full" />

    <section class="absolute w-full top-[12px] px-[6px] text-white z-20">
      <ARow justify="center">
        <ACol :span="5">
          <NuxtLink target="_blank" :to="`/profile/${data.uid}`">
            <Avatar
              :size="42"
              :src="avatar"
              class="border-3 border-white ml-[0]" />
          </NuxtLink>
        </ACol>

        <ACol :span="18">
          <section class="font-extrabold">
            <p
              :title="data.author"
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

    <div @click="onToDetail" class="w-full h-full">
      <img
        v-if="!isHover"
        loading="eager"
        ref="imgRef"
        class="w-full h-full rounded-xl"
        :src="baseURL + data.poster" />
      <img
        v-else
        loading="lazy"
        ref="imgRef"
        class="w-full h-full rounded-xl"
        :src="baseURL + data.gif" />
    </div>

    <VideoActionBar
      :post-id="data.vid"
      :author-id="data.uid"
      :likes="data.likes"
      :comments="data.comments"
      :favorites="data.favorites" />

    <PlayCircleOutlined
      v-show="!isHover"
      class="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-[3.5rem] text-white" />
  </section>
</template>

<script setup lang="ts">
import { message } from 'ant-design-vue';
import { useASDCallback, useDebounce } from '~/hooks';
import { baseURL } from '~/hooks/useRequest';
import { IVideo } from '~/services/types/video_api';

const {
  $userStore: { uid },
  $profileStore: { following, getProfile },
  $generalStore: { watched, following: onFollowing },
} = useNuxtApp();

const props = defineProps<{ dataSource: object }>();

const router = useRouter();

const data = ref<IVideo>(props.dataSource as IVideo);
const imgRef = ref<HTMLImageElement>();
const isFollow = ref(following.includes(data.value.uid));

const isHover = ref(false);
const ellipsis = ref(true);
const isFail = ref(false);
const avatar = ref('');
const authorFollowers = ref(0);

onMounted(() => {
  imgRef.value!.onerror = () => {
    isFail.value = true;
    console.error(`"${data.value.title}" 的资源加载失败`);
  };
});

onMounted(async () => {
  try {
    const { avatar: ava, following } = await getProfile(data.value.uid);
    avatar.value = ava;
    authorFollowers.value = following.length;
  } catch (error) {
    console.warn('user not found');
  }
});

const onHover = useDebounce((flag: boolean) => {
  isHover.value = flag;
}, 500);

const onFollow = useASDCallback(async () => {
  try {
    const flag = !isFollow.value;
    await onFollowing({
      uid,
      someone: data.value.uid,
      flag,
    });
    isFollow.value = flag;
    flag && message.success('已成功');
  } catch (error) {
    message.error('关注失败');
  }
});

const onToDetail = async () => {
  const { vid } = data.value;
  await watched(vid);
  const { href } = router.resolve({ path: '/post', query: { id: vid } });
  window.open(href, '_blank');
};
</script>
