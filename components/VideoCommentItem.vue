<template>
  <AComment>
    <template #actions>
      <span key="comment-basic-like" class="flex items-center" @click="onLike">
        <LikeFilled v-if="action === 'liked'" />
        <LikeOutlined v-else />
        <span class="pl-[8px]">
          {{ likes }}
        </span>
      </span>
      <span
        key="comment-basic-dislike"
        class="flex items-center"
        @click="onDislike">
        <DislikeFilled v-if="action === 'disliked'" />
        <DislikeOutlined v-else />
        <span class="pl-[8px]">
          {{ dislikes }}
        </span>
      </span>
      <span
        key="comment-basic-reply-to"
        class="relative top-[2px] select-none"
        @click="onReply">
        回复
      </span>
    </template>

    <template #author>
      <a>{{ props.author }}</a>
    </template>

    <template #avatar>
      <AAvatar :src="props.avatar" />
    </template>

    <template #content>
      <ATypographyParagraph
        :content="props.content"
        :ellipsis="{ rows: 5, expandable: true, symbol: '展开' }" />
    </template>

    <template #datetime>
      <ATooltip :title="dayjs(props.datetime).format('YYYY-MM-DD HH:mm:ss')">
        <span>{{ dayjs(props.datetime).fromNow() }}</span>
      </ATooltip>
    </template>

    <slot />
  </AComment>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import relativeTime from 'dayjs/plugin/relativeTime';

export type CommentItemType = {
  _id: string;
  parentId?: string;
  author: string;
  avatar: string;
  content: string;
  likes: number;
  dislikes: number;
  datetime: number;
};

export type CommentData = { parentId: string; id: string; author: string };

dayjs.locale('zh-cn');
dayjs.extend(relativeTime);

const emit = defineEmits<{ (e: 'reply', res: CommentData): void }>();
const props = defineProps<CommentItemType>();

const likes = ref<number>(props.likes);
const dislikes = ref<number>(props.dislikes);
const action = ref<'liked' | 'disliked' | ''>('');

const repetitiveAction = (type: string, v1: Ref<number>, v2: number) => {
  if (action.value === type) {
    if (v1.value > v2) {
      v1.value--;
      action.value = '';
      return true;
    }
  }
};

const onLike = async () => {
  if (repetitiveAction('liked', likes, props.likes)) {
    return;
  }
  likes.value++;
  dislikes.value = props.dislikes;
  action.value = 'liked';
};

const onDislike = async () => {
  if (repetitiveAction('disliked', dislikes, props.dislikes)) {
    return;
  }
  dislikes.value++;
  likes.value = props.likes;
  action.value = 'disliked';
};

const onReply = () =>
  emit('reply', {
    id: props._id,
    author: props.author,
    parentId: props.parentId || '',
  });
</script>
