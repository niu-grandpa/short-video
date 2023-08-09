<template>
  <AAffix :offset-top="61">
    <ALayoutSider
      theme="light"
      :width="siderWidth"
      style="height: calc(100vh - 61px); padding-top: 8px">
      <ClientOnly>
        <AMenu v-model:selectedKeys="currentKey" @click="onChangeView">
          <AMenuItem key="home">
            <div class="flex items-center text-[17px] font-semibold">
              <HomeOutlined class="mx-[4px]" style="font-size: 24px" />
              <span class="lg:block hidden">首页</span>
            </div>
          </AMenuItem>
          <AMenuItem key="following">
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
      </ClientOnly>
    </ALayoutSider>
  </AAffix>
</template>

<script setup lang="ts">
const route = useRoute();
const router = useRouter();

const currentKey = ref<string[]>([]);
const siderWidth = ref<number>(220);

watchEffect(() => {
  const key = route.fullPath === '/' ? 'home' : route.fullPath.substring(1);
  currentKey.value = [key];
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

const onChangeView = ({ key }: { key: string }) => {
  const path = key === 'home' ? '/' : key;
  router.push(path);
};
</script>
