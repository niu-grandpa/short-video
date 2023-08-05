<template>
  <div class="w-[100%] relative flex justify-center">
    <div
      class="absolute top-6 z-50 mx-auto bg-black bg-opacity-70 text-white px-14 py-3 rounded-sm"
      :class="errorType ? 'visible' : 'invisible'">
      {{ error }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['errorType']);
const { errorType } = toRefs(props);

const error = ref('');

watch(
  () => errorType.value,
  () => {
    switch (errorType.value) {
      case 'caption':
        error.value = '标题长度限150';
        break;
      case 'bio':
        error.value = '视频过大';
        break;
      case 'file':
        error.value = '请上传mp4格式';
        break;
      default:
        error.value = '';
        break;
    }
  }
);
</script>
