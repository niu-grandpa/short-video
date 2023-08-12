<template>
  <template v-if="data.length" v-for="item in data" :key="item._id">
    <VideoCommentItem
      :_id="item._id"
      :author="item.author"
      :avatar="item.avatar"
      :content="item.content"
      :likes="item.likes"
      :dislikes="item.dislikes"
      :parentId="item.parentId"
      :datetime="item.datetime"
      @reply="onOpenReply">
      <template
        v-if="item.reply?.length"
        v-for="child in item.reply"
        :key="child._id">
        <VideoCommentItem
          :_id="child._id"
          :author="child.author"
          :avatar="child.avatar"
          :content="child.content"
          :likes="child.likes"
          :dislikes="child.dislikes"
          :parentId="child.parentId"
          :datetime="child.datetime"
          @reply="onOpenReply" />
      </template> 

      <!-- 分页器、一页加载10条、只显示2条多余的收起 -->

      <AInputGroup compact v-show="isReply">
        <ATextarea
          v-model:value="content"
          :autosize="{ minRows: 3, maxRows: 3 }"
          :placeholder="`回复 @${replyData?.author} : `"
          style="width: calc(100% - 65px); font-size: 12px" />
        <AButton type="primary" class="h-[67px]" @click="onPostComment">
          发布
        </AButton>
      </AInputGroup>
    </VideoCommentItem>

    <ADivider />
  </template>

  <AEmpty v-else description="暂无评论" />
</template>

<script setup lang="ts">
import { type CommentItemType } from './VideoCommentItem.vue';

export type CommentsType = CommentItemType & {
  reply?: CommentItemType[];
};

type ReplyData = { parentId: string; id: string; author: string };

const props = defineProps<{ dataSource: CommentsType[] }>();

const data = ref(props.dataSource);
const isReply = ref(false);
const content = ref('');
const replyData = ref<ReplyData>();

const onOpenReply = (res?: ReplyData) => {
  content.value = '';
  isReply.value = !isReply.value;
  replyData.value = res;
};

const onPostComment = async () => {
  console.log(replyData.value, content);
};
</script>
