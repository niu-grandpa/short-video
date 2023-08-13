<template>
  <template
    v-if="$props.dataSource.length"
    v-for="item in $props.dataSource"
    :key="item._id">
    <VideoCommentItem
      :_id="item._id"
      :author="item.author"
      :avatar="item.avatar"
      :content="item.content"
      :likes="item.likes"
      :dislikes="item.dislikes"
      :parentId="item.parentId"
      :datetime="item.datetime"
      @reply="res => $emit('reply', res)">
      <a
        v-if="item.reply?.length"
        class="text-[#1677ff]"
        @click="() => $emit('loadSubReply', item._id)">
        {{ item.reply?.length }} 条回复
      </a>
    </VideoCommentItem>
  </template>

  <AEmpty v-else description="暂无评论" />
</template>

<script setup lang="ts">
import { type CommentData, type CommentItemType } from './VideoCommentItem.vue';

export type CommentsType = CommentItemType & {
  reply?: CommentItemType[];
};

defineEmits<{
  (e: 'reply', res: CommentData): void;
  (e: 'loadSubReply', id: string): void;
}>();

defineProps<{ dataSource: CommentsType[] }>();
</script>
