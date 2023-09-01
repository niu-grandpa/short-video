<template>
  <ALayoutHeader
    style="background-color: white"
    class="flex w-full h-[61px] fixed z-30 border-b">
    <nav
      class="max-w-[1340px] flex items-center justify-between w-full px-8 mx-auto">
      <NuxtLink to="/" class="lg:w-[20%] w-[70%]">
        <img width="115" src="~/assets/images/tiktok-logo.png" />
      </NuxtLink>

      <div class="hidden md:flex items-center max-w-[380px] w-full">
        <AInputSearch placeholder="搜索用户" size="large" />
      </div>

      <ASpace>
        <AButton
          size="large"
          @click="onToUpload"
          style="height: 36px; padding: 0 22px">
          <VideoCameraAddOutlined class="text-[20px]" />
          上传
        </AButton>

        <AButton
          type="primary"
          size="large"
          v-if="!$userStore.uid"
          style="height: 36px; padding: 0 33px"
          @click="() => ($generalStore.isLoginOpen = true)">
          登录
        </AButton>

        <template v-else>
          <Avatar class="ml-[8px] mb-[1px]">
            <template #icon><UserOutlined /></template>
          </Avatar>
          <ClientOnly>
            <ADropdown trigger="click" placement="bottom">
              <MoreOutlined
                style="font-size: 24px"
                class="flex items-center justify-center" />
              <template #overlay>
                <AMenu>
                  <AMenuItem key="my">
                    <NuxtLink
                      :to="`/profile/${$userStore.uid}`"
                      class="flex items-center">
                      <UserOutlined class="mr-[3px]" /> 个人信息
                    </NuxtLink>
                  </AMenuItem>
                  <AMenuItem @click="onLogout" key="out">
                    <a href="javascript:;" class="flex items-center">
                      <PoweroffOutlined class="mr-[3px]" /> 退出登录
                    </a>
                  </AMenuItem>
                </AMenu>
              </template>
            </ADropdown>
          </ClientOnly>
        </template>
      </ASpace>
    </nav>
  </ALayoutHeader>

  <div class="h-[61px]" />
</template>

<script setup lang="ts">
import { useASDCallback } from '@/hooks';
import { message } from 'ant-design-vue';

const { $generalStore, $userStore, $profileStore } = useNuxtApp();

const router = useRouter();

const onToUpload = useASDCallback(() => {
  router.push('/upload');
});

const onLogout = async () => {
  try {
    await $userStore.logout();
    router.replace('/');
    $userStore.restData();
    $profileStore.restData();
    $generalStore.restData();
  } catch (error) {
    message.error('退出登录失败');
  }
};
</script>
