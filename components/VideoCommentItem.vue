<template>
  <AComment>
    <template #actions>
      <span key="comment-basic-like" class="flex items-center" @click="onLike">
        <LikeFilled v-if="action === 'liked'" />
        <LikeOutlined v-else />
        <span class="pl-[12px]">
          {{ likes }}
        </span>
      </span>

      <span
        key="comment-basic-dislike"
        class="flex items-center"
        @click="onDislike">
        <DislikeFilled v-if="action === 'disliked'" />
        <DislikeOutlined v-else />
        <span class="pl-[12px]">
          {{ dislikes }}
        </span>
      </span>

      <span key="comment-basic-reply-to" @click="() => $emit('reply')">
        回复
      </span>
    </template>

    <template #author>
      <NuxtLink :to="`/profile/${data.uid}`">{{ data.author }}</NuxtLink>
    </template>

    <template #avatar>
      <Avatar :src="data.avatar" />
    </template>

    <template #content>
      <ATypographyParagraph
        :content="data.content"
        :ellipsis="{ rows: 5, expandable: true, symbol: '展开' }" />
    </template>

    <template #datetime>
      <span :title="dayjs(data.created_at).format('YYYY-MM-DD HH:mm:ss')">
        {{ dayjs(data.created_at).fromNow() }}
      </span>
    </template>
    <slot />
  </AComment>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import relativeTime from 'dayjs/plugin/relativeTime';
import { IComment } from '~/services/types/comment_api';

dayjs.locale('zh-cn');
dayjs.extend(relativeTime);

defineEmits(['reply']);

const {
  $userStore: { uid },
  $generalStore: { likeComment },
} = useNuxtApp();

const props = defineProps<{ dataSource: object }>();

const data = reactive<IComment>(props.dataSource as IComment);

const defaultLikes = data.likes.length;
const defaultDislikes = data.dislikes.length;

const likes = ref(defaultLikes);
const dislikes = ref(defaultDislikes);
const action = ref<'liked' | 'disliked' | ''>('');

onMounted(() => {
  if (data.likes.includes(uid)) {
    action.value = 'liked';
  } else if (data.dislikes.includes(uid)) {
    action.value = 'disliked';
  }
});

const repetitiveAction = (type: string, val: Ref<number>) => {
  if (action.value === type) {
    action.value = '';
    val.value > 0 && val.value--;
    return true;
  }
};

const likeParams = { uid, flag: true, cid: data.cid };
const dislikeParams = { uid, flag: false, cid: data.cid };

const onLike = async () => {
  if (repetitiveAction('liked', likes)) {
    await likeComment({ ...likeParams, reset: true });
    return;
  }
  await likeComment(likeParams);
  likes.value++;
  action.value = 'liked';
  dislikes.value = defaultDislikes;
};

const onDislike = async () => {
  if (repetitiveAction('disliked', dislikes)) {
    await likeComment({ ...dislikeParams, reset: true });
    return;
  }
  await likeComment(dislikeParams);
  dislikes.value++;
  action.value = 'disliked';
  likes.value = defaultLikes;
};
</script>
