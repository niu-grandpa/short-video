<template>
  <ATypographyTitle :level="4">
    评论
    <ATypographyText type="secondary">{{ comments.length }}</ATypographyText>
  </ATypographyTitle>

  <AList
    v-if="comments.length"
    size="small"
    :data-source="comments"
    item-layout="horizontal">
    <template #renderItem="{ item }">
      <AListItem>
        <AComment
          :author="item.author"
          :avatar="item.avatar"
          :content="item.content"
          :datetime="item.datetime">
          <template #actions>
            <a class="flex items-center w-[72px]">
              <LikeOutlined class="mr-[4px]" />164
            </a>
            <a class="flex items-center w-[72px]">
              <DislikeOutlined class="mr-[4px]" />1264
            </a>
            <a class="relative top-[1px] text-[12px]">回复</a>
          </template>
        </AComment>
      </AListItem>
    </template>
  </AList>

  <AComment class="post-comment">
    <template #avatar><AAvatar /></template>
    <template #content>
      <AFormItem>
        <ATextarea v-model:value="content" :rows="4" />
      </AFormItem>
      <AFormItem>
        <AButton
          html-type="submit"
          :loading="submitting"
          type="primary"
          @click="handleSubmit">
          发布评论
        </AButton>
      </AFormItem>
    </template>
  </AComment>
</template>

<script lang="ts" setup>
import { DislikeOutlined, LikeOutlined } from '@ant-design/icons-vue';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import relativeTime from 'dayjs/plugin/relativeTime';

type Comment = Record<string, string>;

dayjs.locale('zh-cn');
dayjs.extend(relativeTime);

const comments = ref<Comment[]>([
  {
    author: 'Han Solo',
    avatar: '',
    content: '11111',
    datetime: dayjs().fromNow(),
  },
]);
const submitting = ref<boolean>(false);
const content = ref<string>('');

const handleSubmit = () => {
  if (!content.value) {
    return;
  }
};
</script>

<style>
.post-comment .ant-comment-inner {
  padding: 0;
}
</style>
