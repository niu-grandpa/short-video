<template>
  <section
    :id="`PostMain-${post.id}`"
    class="w-full lg:w-[33.33%] md:w-[50%] flex py-6">
    <div
      @click="() => onIsLoggedIn(post.user)"
      class="w-[60px] h-[60px] cursor-pointer">
      <img class="w-full h-full rounded-[100%]" :src="post.user.image" />
    </div>

    <div class="pl-3 px-4">
      <div class="flex items-center justify-between pb-0.5">
        <button @click="() => onIsLoggedIn(post.user)">
          <span class="font-bold hover:underline cursor-pointer">
            {{ $generalStore.allLowerCaseNoCaps(post.user.name) }}</span
          >
          <span> {{ post.user.name }}</span>
        </button>

        <button
          class="border text-[15px] px-[21px] py-0.5 border-[#F02C56] text-[#F02C56] hover:bg-[#ffeef2] font-semibold rounded-md">
          关注
        </button>
      </div>

      <div class="text-[14px] text-gray-500 pb-0.5">{{ post.text }}</div>
      <div
        class="text-[15px] pb-0.5 break-words md:max-w-[400px] max-w-[300px]">
        一些内容描述
      </div>
      <div class="text-[14px] pb-0.5 flex items-center font-semibold">
        <Icon name="mdi:music" size="17" />
        <div class="px-1">音乐来源- AWESOME</div>
        <Icon name="mdi:heart" size="20" />
      </div>

      <div class="mt-2.5 flex">
        <div
          @click="() => onDisplayPost(post)"
          class="relative min-h-[480px] max-h-[580px] max-w-[260px] flex items-center bg-black rounded-xl cursor-pointer">
          <video
            v-if="post.video"
            ref="video"
            loop
            muted
            class="rounded-xl object-cover mx-auto h-full"
            :src="post.video" />
          <img
            class="absolute right-2 bottom-14"
            width="90"
            src="~/assets/images/tiktok-logo-white.png" />
        </div>

        <div class="relative mr-[75px]">
          <div class="absolute bottom-0 pl-2">
            <div class="pb-4 text-center">
              <button
                @click="isLiked ? unlikePost(post) : likePost(post)"
                class="rounded-full bg-gray-200 p-2 cursor-pointer">
                <Icon
                  name="mdi:heart"
                  size="25"
                  :color="isLiked ? '#F02C56' : ''" />
              </button>
              <span class="text-xs text-gray-800 font-semibold">{{
                post.likes.length
              }}</span>
            </div>

            <div class="pb-4 text-center">
              <div class="rounded-full bg-gray-200 p-2 cursor-pointer">
                <Icon name="bx:bxs-message-rounded-dots" size="25" />
              </div>
              <span class="text-xs text-gray-800 font-semibold">43</span>
            </div>

            <div class="text-center">
              <div class="rounded-full bg-gray-200 p-2 cursor-pointer">
                <Icon name="ri:share-forward-fill" size="25" />
              </div>
              <span class="text-xs text-gray-800 font-semibold">55</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps(['post']);
const { post } = toRefs(props);

const { $generalStore, $userStore } = useNuxtApp();

const router = useRouter();

const video = ref(null);

onMounted(() => {
  // 监听处于可视范围的元素，视频自动播放，反之暂停播放
  const observer = new IntersectionObserver(
    function (entries) {
      if (entries[0].isIntersecting) {
        console.log('Element is playing' + post.value.id);
        video.value.play();
      } else {
        console.log('Element is paused' + post.value.id);
        video.value.pause();
      }
    },
    { threshold: [0.6] }
  );

  observer.observe(document.getElementById(`PostMain-${post.value.id}`));
});

onBeforeUnmount(() => {
  video.value.pause();
  video.value.currentTime = 0;
  video.value.src = '';
});

const onIsLoggedIn = params => {
  if (!$userStore.id) {
    $generalStore.isLoginOpen = true;
    return;
  }
  setTimeout(() => router.push(`/profile/${params.id}`), 200);
};

const isLiked = computed(() => {
  const res = post.value.likes.find(like => like.user_id === $userStore.id);
  if (res) {
    return true;
  }
  return false;
});

const likePost = async post => {
  if (!$userStore.id) {
    $generalStore.isLoginOpen = true;
    return;
  }
  try {
    await $userStore.likePost(post);
  } catch (error) {
    console.log(error);
  }
};

const onDisplayPost = () => {
  if (!$userStore.id) {
    $generalStore.isLoginOpen = true;
    return;
  }
  $generalStore.setBackUrl('/');
  $generalStore.selectedPos = null;
  setTimeout(() => router.push(`/post/${post.id}`), 200);
};
</script>
