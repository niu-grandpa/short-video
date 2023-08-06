<template>
  <section
    id="SideNavMain"
    class="lg:w-[220px] z-20 bg-white pt-[70px] h-full lg:border-r-0 border-r w-[75px]">
    <div class="lg:w-[220px] w-[75px] h-full mx-auto fixed border-r">
      <NuxtLink to="/">
        <MenuItem title="首页" icon="For You" color="#F02C56" size="30" />
      </NuxtLink>
      <MenuItem title="好友" icon="Following" color="#000000" size="27" />
      <NuxtLink to="/live">
        <MenuItem title="直播" icon="LIVE" color="#000000" size="27" />
      </NuxtLink>

      <div class="border-b lg:ml-2 mt-2" />

      <div
        class="lg:block hidden text-xs text-gray-600 font-semibold pt-4 pb-2 px-2">
        推荐用户
      </div>

      <div class="lg:hidden block pt-3" />

      <template
        v-if="$generalStore.suggested"
        v-for="sug in $generalStore.suggested"
        key="sug.id"
        :key="index">
        <div class="cursor-pointer" @click="() => onIsLoggedIn(sug)">
          <MenuItemFollow :user="sug" />
        </div>
      </template>

      <button class="lg:block hidden text-[#F02C56] pt-1.5 pl-2 text-[13px]">
        查看全部
      </button>

      <template v-if="$userStore.id">
        <div class="border-b lg:ml-2 mt-2" />

        <div
          class="lg:block hidden text-xs text-gray-600 font-semibold pt-4 pb-2 px-2">
          Following accounts
        </div>

        <div class="lg:hidden block pt-3" />

        <template
          v-if="$generalStore.following"
          v-for="fol in $generalStore.following">
          <div @click="() => isLoggedIn(fol)" class="cursor-pointer">
            <MenuItemFollow :user="fol" />
          </div>
        </template>

        <button class="lg:block hidden text-[#F02C56] pt-1.5 pl-2 text-[13px]">
          查看更多
        </button>
      </template>

      <div class="lg:block hidden border-b lg:ml-2 mt-2" />

      <div class="pb-14" />
    </div>
  </section>
</template>

<script setup>
const { $generalStore, $userStore, $useAuthCallback } = useNuxtApp();

const route = useRoute();
const router = useRouter();

const onIsLoggedIn = $useAuthCallback(params => {
  setTimeout(() => router.push(`/profile/${params.id}`), 200);
});
</script>
