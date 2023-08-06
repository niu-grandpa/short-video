<template>
  <Head>
    <title>short-video 个人空间</title>
  </Head>

  <MainLayout v-if="$profileStore.name">
    <div class="flex">
      <img class="max-w-[120px] rounded-full" :src="$profileStore.image" />
      <div class="ml-5 w-full">
        <div class="text-[30px] font-bold truncate">
          {{ $profileStore.name }}
        </div>
        <div class="text-[18px] truncate">{{ $profileStore.bio }}</div>
        <button
          v-if="$profileStore.id === $userStore.id"
          @click="$generalStore.isEditProfileOpen = true"
          class="flex item-center rounded-md py-1.5 px-3.5 mt-3 text-[15px] font-semibold border hover:bg-gray-100">
          <Icon class="mt-0.5 mr-1" name="mdi:pencil" size="18" />
          <div>编辑个人信息</div>
        </button>

        <button
          v-else
          class="flex item-center rounded-md py-1.5 px-8 mt-3 text-[15px] text-white font-semibold bg-[#F02C56]">
          关注
        </button>
      </div>
    </div>

    <div class="flex items-center pt-4">
      <div class="mr-4">
        <span class="font-bold">10K</span>
        <span class="text-gray-500 font-light text-[15px] pl-1.5">已关注</span>
      </div>
      <div class="mr-4">
        <span class="font-bold">44K</span>
        <span class="text-gray-500 font-light text-[15px] pl-1.5"
          >我的关注</span
        >
      </div>
      <div class="mr-4">
        <span class="font-bold">{{ allLikes }}</span>
        <span class="text-gray-500 font-light text-[15px] pl-1.5">点赞</span>
      </div>
    </div>

    <div
      class="pt-4 mr-4 text-gray-500 font-light text-[15px] pl-1.5 max-w-[500px]">
      {{ $profileStore.bio }}
    </div>

    <div class="w-full flex items-center pt-4 border-b">
      <div
        class="w-60 text-center py-2 text-[17px] font-semibold border-b-2 border-b-black">
        视频
      </div>
      <div
        class="w-60 text-gray-500 text-center py-2 text-[17px] font-semibold">
        <Icon name="material-symbols:lock-open" class="mb-0.5" /> 已点赞
      </div>
    </div>

    <section
      class="mt-4 grid 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-3">
      <template v-if="show" v-for="post in $profileStore.posts" key="post.id">
        <!-- todo 滚动加载优化 -->
        <PostUser :post="post" />
      </template>
    </section>
  </MainLayout>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import MainLayout from '~/layouts/MainLayout.vue';

const { $profileStore, $userStore, $generalStore } = useNuxtApp();
const { posts, allLikes } = storeToRefs($profileStore);

const route = useRoute();

const show = ref(false);

definePageMeta({ middleware: 'auth' });

onMounted(async () => {
  try {
    await $profileStore.getProfile(route.params.id);
  } catch (error) {
    console.log(error);
  }
});

watch(
  () => posts.value,
  () => setTimeout(() => (show.value = true), 300)
);
</script>
