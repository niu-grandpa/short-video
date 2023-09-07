<template>
  <ALayoutHeader
    style="background-color: white"
    class="flex w-full h-[61px] fixed z-30 border-b">
    <nav
      class="max-w-[1340px] flex items-center justify-between w-full px-8 mx-auto">
      <NuxtLink to="/" class="lg:w-[20%] w-[70%]">
        <img width="115" src="~/assets/images/logo.png" />
      </NuxtLink>

      <div class="hidden md:flex items-center max-w-[380px] w-full">
        <ClientOnly>
          <ASelect
            size="large"
            allowClear
            show-search
            style="width: 100%"
            label-in-value
            :filter-option="false"
            placeholder="搜索用户"
            @select="onToProfile"
            @search="onFindUsers"
            v-model:value="searchVal"
            :not-found-content="fetching ? undefined : null">
            <template v-if="fetching" #notFoundContent>
              <ASpin size="small" />
            </template>
            <ASelectOption
              v-for="item in searchUsers"
              :value="item.uid"
              :key="item.uid">
              <div class="flex items-center">
                <Avatar :src="item.avatar" class="mr-[16px]" />
                <span>{{ item.nickname }}</span>
              </div>
            </ASelectOption>
          </ASelect>
        </ClientOnly>
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
                      target="_blank"
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
import { message } from 'ant-design-vue';
import { useASDCallback, useDebounce } from '~/hooks';
import { IUser } from '~/services/types/user_api';

const { $generalStore, $userStore, $profileStore } = useNuxtApp();

const router = useRouter();

const fetching = ref(false);
const searchVal = ref<undefined | string>(undefined);
const searchUsers = ref<IUser[]>([]);

const onToUpload = useASDCallback(() => {
  const { href } = router.resolve('/upload');
  window.open(href, '_blank');
});

const onToProfile = ({ value }: any) => {
  const { href } = router.resolve({ path: '/profile', query: { id: value } });
  window.open(href, '_blank');
  searchVal.value = '';
};

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

const onFindUsers = useDebounce(async (val: string) => {
  try {
    fetching.value = true;
    searchUsers.value = await $userStore.getAll({
      word: val,
      page: 0,
      size: 10,
    });
  } catch (error) {
    searchUsers.value = [];
    console.log(error);
  } finally {
    fetching.value = false;
  }
}, 200);

watch(
  () => searchVal.value,
  () => {
    searchUsers.value = [];
    fetching.value = false;
  }
);
</script>
