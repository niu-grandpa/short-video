<template>
  <SrcollLoading
    :request="{ url }"
    :reload="reload"
    class="px-[18px]"
    :style="{ maxHeight: props.maxHeight }"
    @load-more="onLoadComments">
    <template v-if="props.isSecondary && fatherComment">
      <VideoCommentItem
        :data-source="fatherComment"
        @reply="() => onGetReplyData(fatherComment)">
        <VideoCommentItem
          v-for="child in comments.slice(0, comments.length - 1)"
          :key="child.cid"
          :data-source="child"
          @reply="() => onGetReplyData(child)" />
      </VideoCommentItem>
    </template>

    <template v-else>
      <VideoCommentItem
        v-if="comments.length"
        v-for="item in comments"
        :key="item.cid"
        :data-source="item"
        @reply="() => onGetReplyData(item)">
        <a
          v-if="item.replies"
          class="text-[#1677ff]"
          @click="() => $emit('get-secondary', item.cid)">
          共{{ item.replies }}条回复
        </a>
      </VideoCommentItem>
      <AEmpty v-else description="暂无评论" />
    </template>
  </SrcollLoading>

  <VideoCommentsPost
    :loading="loading"
    :placeholder="placeholder"
    @post="onPostComment" />
</template>

<script setup lang="ts">
import { message } from 'ant-design-vue';
import { useASDCallback } from '~/hooks';
import { CommentLevel, IComment } from '~/services/types/comment_api';

export type ReplyTo = {
  belong: string;
  level: CommentLevel;
  content: string;
};

type Props = {
  belong: string;
  maxHeight?: string | number;
  isSecondary?: boolean;
  level: CommentLevel;
};

defineEmits<{
  (e: 'get-secondary', id: string): void;
}>();

const {
  $userStore: { uid },
  $generalStore: { postComment },
} = useNuxtApp();

const props = defineProps<Props>();

const url = computed(
  () => `/comments/list?belong=${props.belong}&level=${props.level}`
);

const loading = ref(false);
const reload = ref(false);

const comments = ref<IComment[]>([]);
const placeholder = ref('添加评论...');

const curBelong = ref(props.belong);
const curLevel = ref(props.level);

const fatherComment = computed(() => comments.value[comments.value.length - 1]);

const restData = () => {
  placeholder.value = '添加评论...';
  curBelong.value = props.belong;
  curLevel.value = props.level;
};

const onLoadComments = (res: IComment[]) => {
  if (reload.value) {
    comments.value.length = 0;
  }
  comments.value.push(...res);
};

// 点击评论回复
const onGetReplyData = ({ cid, author }: IComment) => {
  curBelong.value = cid;
  curLevel.value = CommentLevel.TOW; // 只要是回复的，层级都属于2
  placeholder.value = `回复 @${author}: `;
};

const onPostComment = useASDCallback(async (content: string) => {
  if (!content) {
    message.info('不能发送空白评论!');
    return;
  }
  loading.value = true;
  try {
    await postComment({
      uid,
      content,
      level: curLevel.value,
      belong: curBelong.value,
    });
    reload.value = true;
    message.success('评论成功');
    restData();
  } catch (error) {
    message.error('评论发送失败');
    console.log(error);
  } finally {
    loading.value = false;
    setTimeout(() => (reload.value = false), 200);
  }
});
</script>
