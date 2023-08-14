<template>
  <template
    v-if="$props.dataSource.length"
    v-for="parent in $props.dataSource"
    :key="parent._id">
    <VideoCommentItem
      :_id="parent._id"
      :author="parent.author"
      :avatar="parent.avatar"
      :content="parent.content"
      :likes="parent.likes"
      :dislikes="parent.dislikes"
      :parentId="parent.parentId"
      :datetime="parent.datetime"
      @reply="res => $emit('reply', res)">
      <template v-if="!$props.loadSub">
        <a
          v-if="parent.reply?.length"
          class="text-[#1677ff]"
          @click="() => $emit('loadSubReply', parent._id)">
          {{ parent.reply?.length }} 条回复
        </a>
      </template>
      <template v-else v-for="sub in parent.reply" :key="sub._id">
        <VideoCommentItem
          :_id="sub._id"
          :author="sub.author"
          :avatar="sub.avatar"
          :content="sub.content"
          :likes="sub.likes"
          :dislikes="sub.dislikes"
          :parentId="sub.parentId"
          :datetime="sub.datetime"
          @reply="res => $emit('reply', res)" />
      </template>
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

defineProps<{ dataSource: CommentsType[]; loadSub?: boolean }>();
</script>
