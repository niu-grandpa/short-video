<template>
  <AAffix :offset-top="61">
    <ALayoutSider
      theme="light"
      :width="siderWidth"
      style="
        height: calc(100vh - 61px);
        padding-top: 8px;
        border-inline-end: 1px solid #0505050f;
      ">
      <ClientOnly>
        <AMenu v-model:selectedKeys="currentKey" style="border-inline-end: 0">
          <AMenuItem key="home">
            <div class="flex items-center text-[17px] font-semibold">
              <HomeOutlined class="mx-[4px]" style="font-size: 24px" />
              <span class="lg:block hidden">首页</span>
            </div>
          </AMenuItem>
          <AMenuItem key="friend">
            <div class="flex items-center text-[17px] font-semibold">
              <TeamOutlined class="mx-[4px]" style="font-size: 24px" />
              <span class="lg:block hidden">关注</span>
            </div>
          </AMenuItem>
          <AMenuItem key="live">
            <div class="flex items-center text-[17px] font-semibold">
              <VideoCameraOutlined class="mx-[4px]" style="font-size: 24px" />
              <span class="lg:block hidden">直播</span>
            </div>
          </AMenuItem>
        </AMenu>

        <section class="px-[24px] mt-[12px]" v-if="uid">
          <div class="border-y-[1px] pb-[12px]" v-if="recommendUsers.length">
            <p class="pt-[14px] mb-[16px] lg:block hidden">推荐用户</p>
            <RecommendUser :data-source="recommendUsers" />
            <a
              class="text-[#ef4444] hover:text-[#f87171]"
              @click="onGetRecommend">
              换一换
            </a>
          </div>
          <div class="mt-[6px] pb-[12px] border-b-[1px]" v-if="myFollowing">
            <p class="pt-[14px] mb-[16px] lg:block hidden">已关注</p>
            <RecommendUser :data-source="[myFollowing]" following />
            <a class="text-[#ef4444] hover:text-[#f87171]">查看全部</a>
          </div>
        </section>
      </ClientOnly>
    </ALayoutSider>
  </AAffix>
</template>

<script setup lang="ts">
import { IUser } from '~/services/types/user_api';

const {
  $userStore: { uid, getRecommend },
  $profileStore: { following, getProfile },
} = useNuxtApp();

const route = useRoute();
const router = useRouter();

const currentKey = ref<string[]>([]);
const siderWidth = ref<number>(220);
const myFollowing = ref<IUser>();
const recommendUsers = ref<IUser[]>([]);

const onGetRecommend = async () => {
  recommendUsers.value = await getRecommend();
};

onActivated(() => {
  const key = route.path === '/' ? 'home' : route.path.substring(1);
  currentKey.value = [key];
});

watch(
  () => currentKey.value,
  newVal => {
    const path = newVal[0];
    router.push(path === 'home' ? '/' : path);
  }
);

watchEffect(async () => {
  if (uid) {
    await onGetRecommend();
    if (following.length) {
      myFollowing.value = await getProfile(following[0]);
    }
  }
});

const onResize = () => {
  if (window.innerWidth < 1024) {
    siderWidth.value = 70;
  } else {
    siderWidth.value = 220;
  }
};

onMounted(() => {
  window.addEventListener('resize', onResize);
});

onBeforeMount(() => {
  window.removeEventListener('resize', onResize);
});
</script>
