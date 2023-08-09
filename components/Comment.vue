<template>
  <ATypographyTitle :level="4">
    评论区 ( {{ comments.length }} )
  </ATypographyTitle>

  <AList
    v-if="comments.length"
    :data-source="comments"
    item-layout="horizontal">
    <template #renderItem="{ item }">
      <AListItem>
        <AComment
          :author="item.author"
          :avatar="item.avatar"
          :content="item.content"
          :datetime="item.datetime" />
      </AListItem>
    </template>
  </AList>

  <AComment class="post-comment">
    <template #avatar> <AAvatar /></template>
    <template #content>
      <AFormItem>
        <ATextarea v-model:value="value" :rows="4" />
      </AFormItem>
      <AFormItem>
        <AButton
          html-type="submit"
          :loading="submitting"
          type="primary"
          class="bg-[#1677ff]"
          @click="handleSubmit">
          发布评论
        </AButton>
      </AFormItem>
    </template>
  </AComment>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { ref } from 'vue';
dayjs.extend(relativeTime);

type Comment = Record<string, string>;

const comments = ref<Comment[]>([]);
const submitting = ref<boolean>(false);
const value = ref<string>('');
const handleSubmit = () => {
  if (!value.value) {
    return;
  }

  submitting.value = true;

  setTimeout(() => {
    submitting.value = false;
    comments.value = [
      {
        author: 'Han Solo',
        avatar: '',
        content: value.value,
        datetime: dayjs().fromNow(),
      },
      ...comments.value,
    ];
    value.value = '';
  }, 1000);
};
</script>

<style>
.post-comment .ant-comment-inner {
  padding: 0;
}
</style>
