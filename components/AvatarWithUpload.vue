<template>
  <AAvatar
    class="mt-[2px] flex items-center justify-center"
    :src="$props.src"
    :size="{ xs: 24, sm: 32, md: 40, lg: 56, xl: 70, xxl: 90 }">
    <template #icon><UserOutlined /></template>
  </AAvatar>
  <CameraTwoTone
    @click="() => inputRef?.click()"
    class="absolute bottom-[6px] right-[24px] cursor-pointer"
    title="更改头像" />
  <input
    type="file"
    v-if="!openCropper"
    accept=".png,.jpg,.jpeg"
    hidden
    ref="inputRef"
    @change="onChooseImage" />

  <AModal
    destroyOnClose
    :open="openCropper"
    okText="确定"
    :closable="false"
    cancelText="取消"
    @ok="onConfirm"
    @cancel="onCloseCropper">
    <Cropper
      boundariesClass="w-[472px] h-[427px]"
      :src="imgSrc"
      @change="data => (imgCoordinates = data.coordinates)" />
  </AModal>
</template>

<script setup lang="ts">
import { message } from 'ant-design-vue';
import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';

type Coordinates = {
  width?: number;
  height?: number;
  top?: number;
  left?: number;
};

defineProps(['src']);

const emits = defineEmits(['change']);

const suffix = ['png', 'jpg', 'jpeg'];

const imgSrc = ref('');
const imgCoordinates = ref<Coordinates>({});
const openCropper = ref(false);
const inputRef = ref<HTMLInputElement | null>(null);

const onChooseImage = ({ target }: any) => {
  try {
    const data = target.files[0];
    const idx = data.name.lastIndexOf('.') + 1;

    if (!suffix.includes(data.name.substring(idx))) {
      message.error('请上传png | jpg | jpeg图片格式');
      return;
    }

    openCropper.value = true;
    imgSrc.value = URL.createObjectURL(data);
  } catch (error) {
    message.error('无效的文件格式');
  }
};

const onCloseCropper = () => {
  openCropper.value = false;
  imgSrc.value = '';
};

const onConfirm = () => {
  emits('change', imgCoordinates.value);
  onCloseCropper();
};
</script>
