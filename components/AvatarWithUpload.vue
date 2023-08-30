<template>
  <Avatar
    class="mt-[2px]"
    :src="$props.src"
    :size="{ xs: 24, sm: 32, md: 40, lg: 56, xl: 70, xxl: 90 }" />
  <CameraTwoTone
    v-if="$props.hidden"
    @click="onClick"
    class="absolute bottom-[6px] right-[24px] cursor-pointer"
    title="更改头像" />
  <input
    v-if="show"
    type="file"
    accept=".png,.jpg,.jpeg"
    hidden
    ref="inputRef"
    @change="onChange" />
</template>

<script setup lang="ts">
import { message } from 'ant-design-vue';

defineProps(['src', 'hidden']);

const suffix = ['png', 'jpg', 'jpeg'];

const imgSrc = ref('');
const show = ref(false);
const inputRef = ref<HTMLInputElement | null>(null);

const onClick = () => {
  show.value = true;
  inputRef.value?.click();
};

const onChange = ({ target }: any) => {
  const data = target.files[0];
  const idx = data.name.lastIndexOf('.') + 1;

  if (!suffix.includes(data.name.substring(idx))) {
    message.error('请上传png | jpg | jpeg图片格式');
    return;
  }
  show.value = false;
  imgSrc.value = URL.createObjectURL(data);
  // todo
};
</script>
