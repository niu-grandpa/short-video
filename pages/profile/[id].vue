<template>
  <Head>
    <title>{{ profile.nickname }}的个人空间_short-viedo</title>
  </Head>

  <ClientOnly>
    <AModal
      title="游客访问权限设置"
      :open="open"
      :width="380"
      :closable="false"
      okText="保存"
      cancelText="取消"
      @ok="onSetPermission"
      @cancel="() => (open = false)">
      <p class="my-[18px]">
        不允许任何人看:
        <ASwitch v-model:checked="noAccess" class="ml-[18px] bg-[#00000040]" />
      </p>
      <p class="mb-[18px]">
        不允许查看个人:
        <ASwitch v-model:checked="lockPosts" class="ml-[18px] bg-[#00000040]" />
      </p>
      不允许查看收藏:
      <ASwitch
        v-model:checked="lockFavorited"
        class="ml-[18px] bg-[#00000040]" />
    </AModal>
  </ClientOnly>

  <MainLayout>
    <AResult
      v-if="!isSelf && noAccess"
      status="403"
      title="该用户不允许任何人查看" />
    <template v-else>
      <ACard class="w-[95%] m-auto border-0">
        <ARow>
          <ACol :span="2" class="relative">
            <AvatarWithUpload
              :hidden="isSelf"
              :src="profile.avatar"
              @change="onImgChange" />
          </ACol>

          <ACol :span="22">
            <section class="flex">
              <ClientOnly>
                <ATypographyTitle
                  v-if="isSelf"
                  :level="3"
                  :editable="{ maxlength: 36 }"
                  v-model:content="profile.nickname">
                  {{ profile.nickname }}
                </ATypographyTitle>
                <ATypographyTitle v-else :level="3">
                  {{ profile.nickname }}
                </ATypographyTitle>
              </ClientOnly>
              <span
                v-if="profile.gender"
                class="ml-[18px] text-[18px]"
                :style="{ color: isMan ? '#1890ff' : 'red' }">
                <ManOutlined v-if="isMan" />
                <WomanOutlined v-else />
              </span>
            </section>

            <section class="flex w-full items-center justify-between">
              <template v-if="isSelf">
                <AInput
                  v-model:value="profile.user_sign"
                  placeholder="编辑个性签名"
                  class="w-[60%] ml-[-8px] border-0 hover:border" />
                <AButton class="flex items-center" @click="() => (open = true)">
                  <SettingOutlined />设置
                </AButton>
              </template>

              <template v-else>
                <ATypographyText class="text-gray-500">
                  {{ profile.user_sign || '该用户很懒，没有留下任何签名' }}
                </ATypographyText>
                <ASpace>
                  <AButton
                    class="px-[24px]"
                    @click="onFollow"
                    :type="isFollowing ? 'default' : 'primary'">
                    <template v-if="isFollowing">
                      <CheckOutlined /> 已关注
                    </template>
                    <span v-else>关注</span>
                  </AButton>
                  <AButton>发消息</AButton>
                </ASpace>
              </template>
            </section>
          </ACol>
        </ARow>

        <ARow class="mt-[14px]">
          <ACol :span="2">
            <strong>{{ fomartter(profile.followers) }}</strong> 粉丝
          </ACol>
          <ACol :span="2">
            <strong>{{ fomartter(profile.following) }}</strong> 已关注
          </ACol>
          <ACol>
            <strong>{{ fomartter(profile.favorites) }}</strong> 收藏
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
                  <LockFilled
                    v-if="!isSelf && permissions.lock_posts" />个人视频
                </p>
              </template>
              <AResult status="403" v-if="!isSelf && permissions.lock_posts" />
              <UserVideo v-else />
            </ATabPane>
            <ATabPane key="following">
              <template #tab>
                <p
                  class="w-[180px] text-center flex items-center justify-center">
                  <LockFilled
                    v-if="!isSelf && permissions.lock_favorited" />已收藏
                </p>
              </template>
              <AResult status="403" v-if="!isSelf && permissions.lock_posts" />
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
import { IUser, UserGender } from '~/services/types/user_api';

definePageMeta({ middleware: 'auth' });

const {
  $userStore: { uid, permissions, setUserPermissions },
  $profileStore,
  $generalStore: { following },
} = useNuxtApp();

const {
  params: { id },
} = useRoute();

const isSelf = uid === id;

const fomartter = (nums: string[]): string | number => {
  const len = nums.length;
  if (len < 1000) return len;
  return computed(() => (len / 1000).toFixed(1)) + 'K';
};

const open = ref(false);
const isMan = ref(true);
const noAccess = ref(false);
const lockPosts = ref(false);
const lockFavorited = ref(false);
const isFollowing = ref(false);
const isEditName = ref(false);
const activeKey = ref('video');
const nameInputRef = ref<HTMLSpanElement | null>(null);
const profile = ref<IUser>({ ...$profileStore.$state } as any);

onMounted(async () => {
  if (!isSelf) {
    // get other
    profile.value = await $profileStore.getProfile(id as string);
    isFollowing.value = $profileStore.following.includes(id as string);
  } else {
    // get myself
    profile.value = await $profileStore.getProfile();
  }
  initData(profile.value);
});

const initData = ({
  gender,
  permissions: { no_access, lock_posts, lock_favorited },
}: IUser) => {
  noAccess.value = no_access;
  lockPosts.value = lock_posts;
  lockFavorited.value = lock_favorited;
  isMan.value = gender === UserGender.Man;
  activeKey.value = lock_posts ? '' : 'video';
};

const onRename = (e: any) => {
  if (!e.target.contains(nameInputRef.value)) {
    isEditName.value = false;
    $profileStore.nickname = profile.value!.nickname;
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

const onSetPermission = async () => {
  try {
    await setUserPermissions(profile.value!.permissions);
    open.value = false;
    message.success('修改成功');
  } catch (error) {
    profile.value!.permissions = permissions;
    message.error('修改失败');
  }
};

const onFollow = async () => {
  const flag = !isFollowing.value;
  await following({ uid, someone: id as string, flag });
  if (flag) {
    profile.value.followers.push(uid);
    message.success('关注成功');
  } else {
    const { followers } = profile.value;
    profile.value.followers = followers.filter(item => item !== uid);
    message.info('已取消关注');
  }
  isFollowing.value = flag;
};
</script>
