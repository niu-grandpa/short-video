<template>
  <Head>
    <title>{{ $userStore.nickname }}的个人空间_short-viedo</title>
  </Head>

  <MainLayout>
    <ACard class="w-[95%] m-auto border-0">
      <ARow>
        <ACol :span="2">
          <AAvatar
            class="mt-[3px]"
            :src="$userStore.icon"
            :size="{ xs: 24, sm: 32, md: 40, lg: 56, xl: 70, xxl: 90 }" />
        </ACol>

        <ACol :span="22">
          <ATypographyTitle :level="3">
            {{ $userStore.nickname || '用户名' }}
            <sup
              v-if="$userStore.gender !== -1"
              :class="`text-[${isMan ? ' #1890ff' : 'red'}]`">
              <ManOutlined v-if="isMan" />
              <WomanOutlined v-else />
            </sup>
          </ATypographyTitle>

          <section class="flex w-full items-center justify-between">
            <template v-if="isSelf">
              <AInput
                v-model:value="user_sign"
                placeholder="编辑个性签名"
                class="w-[60%] ml-[-8px] border-0 hover:border" />
              <ASpace>
                <AButton class="flex items-center">
                  <SettingOutlined />设置
                </AButton>
                <AButton
                  class="flex items-center"
                  @click="() => ($generalStore.isEditOpen = true)">
                  <EditOutlined />编辑个人信息
                </AButton>
              </ASpace>
            </template>

            <template v-else>
              <ATypographyText class="text-gray-500">
                {{ user_sign || '该用户很懒，没有留下任何签名' }}
              </ATypographyText>
              <ASpace>
                <AButton
                  :disabled="false"
                  type="primary"
                  class="px-[24px] bg-[#1677ff]">
                  关注
                </AButton>
                <AButton>发消息</AButton>
              </ASpace>
            </template>
          </section>
        </ACol>
      </ARow>

      <ARow class="mt-[14px]">
        <ACol :span="2"><strong>10K</strong> 粉丝</ACol>
        <ACol :span="2"><strong>44K</strong> 已关注</ACol>
        <ACol><strong>10k</strong> 收藏</ACol>
      </ARow>
    </ACard>

    <ClientOnly>
      <section class="w-[95%] m-auto">
        <ATabs v-model:activeKey="activeKey" size="large">
          <ATabPane key="video" disabled>
            <template #tab>
              <p class="w-[180px] text-center flex items-center justify-center">
                <LockFilled />视频
              </p>
            </template>

            Content of Tab Pane 1
          </ATabPane>

          <ATabPane key="following" disabled>
            <template #tab>
              <p class="w-[180px] text-center flex items-center justify-center">
                <LockFilled />已收藏
              </p>
            </template>

            Content of Tab Pane 2
          </ATabPane>
        </ATabs>
      </section>
    </ClientOnly>
  </MainLayout>
</template>

<script setup lang="ts">
import MainLayout from '~/layouts/MainLayout.vue';

// definePageMeta({ middleware: 'auth' });

const { $userStore, $generalStore } = useNuxtApp();

$generalStore.isEditOpen = true;

const route = useRoute();

const isMan = computed(() => $userStore.gender === 0);
const isSelf = computed(() => $userStore.uid === route.params.id);

const user_sign = ref($userStore.user_sign);
const activeKey = ref<'video' | 'following'>('video');
</script>
