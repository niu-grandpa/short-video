<template>
  <Head>
    <title>{{ nickname }}的个人空间_short-viedo</title>
  </Head>

  <ClientOnly>
    <AModal
      title="游客访问权限设置"
      :open="open"
      :width="380"
      :closable="false"
      okText="保存"
      cancelText="取消"
      @ok="handlePermission"
      @cancel="() => (open = false)">
      <p class="my-[18px]">
        不允许任何人看:
        <ASwitch
          v-model:checked="permissions.no_access"
          class="ml-[18px] bg-[#00000040]" />
      </p>
      <p class="mb-[18px]">
        不允许查看个人:
        <ASwitch
          v-model:checked="permissions.lock_posts"
          class="ml-[18px] bg-[#00000040]" />
      </p>
      不允许查看收藏:
      <ASwitch
        v-model:checked="permissions.lock_favorited"
        class="ml-[18px] bg-[#00000040]" />
    </AModal>
  </ClientOnly>

  <MainLayout>
    <AResult
      v-if="!isSelf && no_access"
      status="403"
      title="该用户不允许任何人查看" />
    <template v-else>
      <ACard class="w-[95%] m-auto border-0">
        <ARow>
          <ACol :span="2" class="relative">
            <AvatarWithUpload :src="icon" @change="onImgChange" />
          </ACol>

          <ACol :span="22">
            <section class="flex">
              <ClientOnly>
                <ATypographyTitle
                  v-if="isSelf"
                  :level="3"
                  :editable="{ maxlength: 36 }"
                  v-model:content="nickname">
                  {{ nickname }}
                </ATypographyTitle>
                <ATypographyTitle v-else :level="3">
                  {{ nickname }}
                </ATypographyTitle>
              </ClientOnly>
              <span
                v-if="gender"
                class="relative left-[18px] top-[-6px] text-[22px]"
                :class="`text-[${isMan ? ' #1890ff' : 'red'}]`">
                <ManOutlined v-if="isMan" />
                <WomanOutlined v-else />
              </span>
            </section>

            <section class="flex w-full items-center justify-between">
              <template v-if="isSelf">
                <AInput
                  v-model:value="user_sign"
                  placeholder="编辑个性签名"
                  class="w-[60%] ml-[-8px] border-0 hover:border" />
                <AButton class="flex items-center" @click="() => (open = true)">
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
          <ACol :span="2">
            <strong>{{ fomartter(followers.length) }}</strong> 粉丝
          </ACol>
          <ACol :span="2">
            <strong>{{ fomartter(following.length) }}</strong> 已关注
          </ACol>
          <ACol>
            <strong>{{ fomartter(favorites.length) }}</strong> 收藏
          </ACol>
        </ARow>
      </ACard>

      <ClientOnly>
        <section class="w-[95%] m-auto">
          <ATabs v-model:activeKey="activeKey" size="large">
            <ATabPane key="video">
              <template #tab>
                <p
                  class="w-[180px] text-center flex items-center justify-center">
                  <LockFilled v-if="!isSelf && lock_posts" />个人视频
                </p>
              </template>
              <AResult status="403" v-if="!isSelf && lock_posts" />
              <UserVideo v-else />
            </ATabPane>
            <ATabPane key="following">
              <template #tab>
                <p
                  class="w-[180px] text-center flex items-center justify-center">
                  <LockFilled v-if="!isSelf && lock_favorited" />已收藏
                </p>
              </template>
              <AResult status="403" v-if="!isSelf && lock_posts" />
              <UserVideo v-else />
            </ATabPane>
          </ATabs>
        </section>
      </ClientOnly>
    </template>
  </MainLayout>
</template>

<script setup lang="ts">
import { message } from 'ant-design-vue';
import MainLayout from '~/layouts/MainLayout.vue';
import { IUser } from '~/services/types/user_api';

definePageMeta({ middleware: 'auth' });

const { $userStore, $profileStore } = useNuxtApp();

const {
  uid,
  permissions: {
    value: { no_access, lock_posts, lock_favorited },
  },
} = toRefs($userStore);

const { icon, gender, user_sign, nickname, favorites, followers, following } =
  toRefs($profileStore);

const route = useRoute();

const fomartter = (num: number): string | number => {
  if (num < 1000) return num;
  return computed(() => (num / 1000).toFixed(1)) + 'K';
};

const open = ref(false);
const isEditName = ref(false);
const isMan = ref(gender.value === 1);
const isSelf = ref(uid.value === route.params.id);

const activeKey = ref(!lock_posts ? 'video' : '');
const nameInputRef = ref<HTMLSpanElement | null>(null);

const permissions = ref<IUser['permissions']>({
  no_access,
  lock_posts,
  lock_favorited,
});

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

const handlePermission = async () => {
  try {
    await $userStore.setUserPermissions(permissions.value);
    open.value = false;
    message.success('修改成功');
  } catch (error) {
    permissions.value = $userStore.permissions;
    message.error('修改失败');
  }
};
</script>
