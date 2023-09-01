<template>
  <section
    class="flex mb-[16px] relative"
    v-for="item in dataSource"
    :key="item.uid">
    <button
      v-if="!props.following"
      @click="() => onFollowing(item.uid)"
      class="lg:block hidden absolute right-[0] top-[5px] text-[#ef4444]"
      size="small">
      {{ flag ? '已关注' : '关注' }}
    </button>
    <CheckCircleTwoTone
      v-else
      class="lg:block hidden absolute left-[100px] top-[3px]" />

    <NuxtLink :to="`/profile/${item.uid}`">
      <Avatar style="margin-left: 0" />
    </NuxtLink>

    <div class="ml-[12px] lg:block hidden">
      <h3 class="font-semibold">{{ item.nickname }}</h3>
      <span class="text-gray-500 text-xs">{{ item.user_sign }}</span>
    </div>
  </section>
</template>

<script setup lang="ts">
import { message } from 'ant-design-vue';
import { useASDCallback } from '~/hooks';

const props = defineProps<{
  dataSource: any[];
  following?: boolean;
}>();

const {
  $userStore: { uid },
  $generalStore: { following },
} = useNuxtApp();

const flag = ref(false);

const onFollowing = useASDCallback(async (someone: string) => {
  const val = !flag.value;
  await following({ uid, someone, flag: val });
  flag.value = val;
  val && message.success('关注成功');
});
</script>
