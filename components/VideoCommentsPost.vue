<template>
  <ARow class="px-[8px] border-t border-solid" align="middle">
    <ACol :span="3">
      <Avatar />
    </ACol>
    <ACol :span="21">
      <AInputGroup compact class="mt-[8px]">
        <ATextarea
          autofocus
          v-model:value="content"
          :autoSize="{ minRows: 3, maxRows: 3 }"
          :placeholder="$props.placeholder || '添加评论...'"
          style="width: calc(100% - 65px)" />
        <AButton
          type="primary"
          class="h-[75px]"
          :loading="$props.loading"
          @click="
            () => {
              $emit('post', content);
              content = '';
            }
          ">
          发布
        </AButton>
      </AInputGroup>
    </ACol>
  </ARow>
</template>

<script setup>
defineEmits(['post']);
defineProps(['placeholder', 'loading']);
const content = ref('');
</script>
