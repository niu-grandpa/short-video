<template>
  <Comment>
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
      <p>{{ props.content }}</p>
    </template>

    <template #datetime>
      <ATooltip :title="dayjs(props.datetime).format('YYYY-MM-DD HH:mm:ss')">
        <span>{{ dayjs(props.datetime).fromNow() }}</span>
      </ATooltip>
    </template>

    <slot />
  </Comment>
</template>

<script lang="ts" setup>
import { Comment } from 'ant-design-vue';
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

dayjs.locale('zh-cn');
dayjs.extend(relativeTime);

const emit = defineEmits(['reply']);
const props = defineProps<CommentItemType>();

const likes = ref<number>(props.likes);
const dislikes = ref<number>(props.dislikes);
const action = ref<'liked' | 'disliked' | ''>('');

const repetitiveAction = computed(
  () => (type: string, v1: Ref<number>, v2: number) => {
    if (action.value === type) {
      if (v1.value > v2) {
        v1.value--;
        action.value = '';
        return true;
      }
    }
  }
);

const onLike = async () => {
  if (repetitiveAction.value('liked', likes, props.likes)) {
    return;
  }
  likes.value++;
  dislikes.value = props.dislikes;
  action.value = 'liked';
};

const onDislike = async () => {
  if (repetitiveAction.value('disliked', dislikes, props.dislikes)) {
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
    parentId: props.parentId,
  });
</script>
