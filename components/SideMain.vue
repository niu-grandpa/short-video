<template>
  <AAffix :offset-top="61">
    <ALayoutSider
      theme="light"
      :width="siderWidth"
      style="height: calc(100vh - 61px); padding-top: 8px">
      <ClientOnly>
        <a-menu v-model:selectedKeys="currentKey" @click="onChangeView">
          <a-menu-item key="home">
            <div class="flex items-center text-[17px] font-semibold">
              <Icon name="mdi:home" :color="color1" size="30" />
              <span class="lg:block hidden pl-[9px]" :class="`text-[${color1}]`"
                >首页</span
              >
            </div>
          </a-menu-item>
          <a-menu-item key="following">
            <div class="flex items-center text-[17px] font-semibold">
              <Icon name="ci:group" :color="color2" size="30" />
              <span class="lg:block hidden pl-[9px]" :class="`text-[${color2}]`"
                >关注</span
              >
            </div>
          </a-menu-item>
          <a-menu-item key="live">
            <div class="flex items-center text-[17px] font-semibold">
              <Icon name="ri:live-line" :color="color3" size="30" />
              <span class="lg:block hidden pl-[9px]" :class="`text-[${color3}]`"
                >直播</span
              >
            </div>
          </a-menu-item>
        </a-menu>
      </ClientOnly>
    </ALayoutSider>
  </AAffix>
</template>

<script setup lang="ts">
const route = useRoute();
const router = useRouter();

const currentKey = ref<string[]>([]);
const siderWidth = ref<number>(220);

const color1 = computed(() =>
  currentKey.value[0] === 'home' ? '#F02C56' : '#000000'
);
const color2 = computed(() =>
  currentKey.value[0] === 'following' ? '#F02C56' : '#000000'
);
const color3 = computed(() =>
  currentKey.value[0] === 'live' ? '#F02C56' : '#000000'
);

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
