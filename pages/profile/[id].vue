<template>
  <Head>
    <title>{{ $profileStore.nickname }}的个人空间_short-viedo</title>
  </Head>

  <MainLayout>
    <ACard class="w-[95%] m-auto border-0">
      <ARow>
        <ACol :span="2" class="relative">
          <AvatarWithUpload :src="$profileStore.icon" @change="onImgChange" />
        </ACol>

        <ACol :span="22">
          <div class="flex">
            <ClientOnly>
              <ATypographyTitle
                :level="3"
                :editable="{ maxlength: 36 }"
                v-model:content="nickname">
                {{ nickname }}
              </ATypographyTitle>
            </ClientOnly>
            <span
              v-if="$profileStore.gender !== -1"
              class="relative left-[18px] top-[-6px] text-[22px]"
              :class="`text-[${isMan ? ' #1890ff' : 'red'}]`">
              <ManOutlined v-if="isMan" />
              <WomanOutlined v-else />
            </span>
          </div>

          <section class="flex w-full items-center justify-between">
            <template v-if="isSelf">
              <AInput
                v-model:value="user_sign"
                placeholder="编辑个性签名"
                class="w-[60%] ml-[-8px] border-0 hover:border" />
              <AButton class="flex items-center">
                <SettingOutlined />设置
              </AButton>
            </template>

            <template v-else>
              <ATypographyText class="text-gray-500">
                {{ user_sign || '该用户很懒，没有留下任何签名' }}
              </ATypographyText>
              <ASpace>
                <AButton :disabled="false" type="primary" class="px-[24px]">
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
            <UserVideo />
          </ATabPane>

          <ATabPane key="following" disabled>
            <template #tab>
              <p class="w-[180px] text-center flex items-center justify-center">
                <LockFilled />已收藏
              </p>
            </template>
            <UserVideo />
          </ATabPane>
        </ATabs>
      </section>
    </ClientOnly>
  </MainLayout>
</template>

<script setup lang="ts">
import MainLayout from '~/layouts/MainLayout.vue';

// definePageMeta({ middleware: 'auth' });

const { $userStore, $profileStore } = useNuxtApp();

const route = useRoute();

const isMan = computed(() => $profileStore.gender === 0);
const isSelf = computed(() => $userStore.uid === route.params.id);

const activeKey = ref<'video' | 'following'>('video');
const nameInputRef = ref<HTMLSpanElement | null>(null);

const user_sign = ref($profileStore.user_sign);
const nickname = ref($profileStore.nickname || '用户名');

const isEditName = ref(false);

const onRename = (e: any) => {
  if (!e.target.contains(nameInputRef.value)) {
    isEditName.value = false;
    $profileStore.nickname = nickname.value;
  }
};

watch(
  () => isEditName.value,
  newVal => {
    if (newVal) {
      document.body.addEventListener('click', onRename);
    } else {
      document.body.removeEventListener('click', onRename);
    }
  }
);

const onImgChange = (coordinates: {
  top: number;
  left: number;
  width: number;
  height: number;
}) => {
  console.log(coordinates);
};
</script>
