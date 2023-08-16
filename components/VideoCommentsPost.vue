<template>
  <ARow class="px-[8px] border-t border-solid" align="middle">
    <ACol :span="3">
      <AAvatar size="large" />
    </ACol>
    <ACol :span="21">
      <AInputGroup compact class="mt-[8px]">
        <ATextarea
          v-model:value="content"
          :autosize="{ minRows: 3, maxRows: 3 }"
          :placeholder="$props.placeholder || '添加评论...'"
          style="width: calc(100% - 65px)" />
        <AButton type="primary" class="h-[75px]" @click="onPostComment">
          发布
        </AButton>
      </AInputGroup>
    </ACol>
  </ARow>
</template>

<script setup lang="ts">
import { message } from 'ant-design-vue';
import { type CommentData } from './VideoCommentItem.vue';

export type ReplyData = {
  postId: string;
  isReplySub: boolean;
  commentObj?: CommentData;
};

defineProps<{ placeholder: string }>();

const { $generalStore } = useNuxtApp();

const emit = defineEmits<{
  (e: 'post'): void;
}>();

const content = ref('');

const onPostComment = async () => {
  if (!content.value) {
    message.info('不能发送空白评论!');
    return;
  }

  emit('post');

  const { postId, isReplySub, commentObj } = $generalStore.replyData;
  // 增加新评论
  if (!isReplySub && !commentObj) {
  } else {
    // 回复某条评论
  }

  content.value = '';
};
</script>
